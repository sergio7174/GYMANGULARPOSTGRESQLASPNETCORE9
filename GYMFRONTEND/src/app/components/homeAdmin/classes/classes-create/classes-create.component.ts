import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapMailbox2Flag, 
         bootstrapHouseAddFill, 
         bootstrapPersonCircle,
         bootstrapCalendar2DayFill,
         bootstrapBack,
         bootstrapPhone,
         bootstrapFiletypeKey,
         bootstrapCoin,
         bootstrapReceipt,
         bootstrapChevronRight,
         bootstrapCheckCircle } from '@ng-icons/bootstrap-icons';
import { ClassesService } from '../../../../core/services/classes/classes.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-classes-create',
  standalone: true,
  imports: [ ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon],
providers: [provideIcons({ bootstrapMailbox2Flag, 
                           bootstrapHouseAddFill, 
                           bootstrapBack,
                           bootstrapPersonCircle,
                           bootstrapPhone,
                           bootstrapFiletypeKey,
                           bootstrapCoin,
                           bootstrapReceipt,
                           bootstrapChevronRight,
                           bootstrapCheckCircle,
                           bootstrapCalendar2DayFill }),
                  
                  ToastrService],
  templateUrl: './classes-create.component.html',
  styleUrl: './classes-create.component.css'
})
export class ClassesCreateComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/********** trying to save image new procedure */
selectedFile: File | null = null;
/***************end block new procedure ****** */


// var to handle messages from backend about the Class process
mensajeBackend:any=[];
dataClass:any=[];
newClass:any=[];
AddModel: any = {image:[]};

// var to handle preview image

imagePreviewUrl: string = "";


// inject services dependecies 
private readonly classService = inject(ClassesService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);


classForm = new FormGroup(
  {
    classname:  new FormControl('', [Validators.required, Validators.min(5)]),
    code:       new FormControl('', [Validators.required ]),
    classday:  new FormControl('', [Validators.required ]),
    classtime:  new FormControl('', [Validators.required ]),
    classlevel:  new FormControl('', [Validators.required ]),
    session_time:  new FormControl('', [Validators.required ]),
    price:  new FormControl('', [Validators.required ]),
    trainer:  new FormControl('', [Validators.required]),
    dateBegin:  new FormControl('', [Validators.required]),
    key_benefits:  new FormControl('', [Validators.required]),
    expert_trainer:  new FormControl('', [Validators.required]),
    class_overview:  new FormControl('', [Validators.required]),
    why_matters:  new FormControl('', [Validators.required]),    
    image: new FormControl(this.selectedFile, [Validators.required,])
    
  },
);

onClass() {

  /**** for testing purposes ************/
  try{
    if(this.classForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/

 if (this.classForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData = { ...this.classForm.value };
  
  this.classService.createclasses(postData , (this.selectedFile)).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.dataClass = response;
        this.mensajeBackend = this.dataClass.message;
        this.newClass = this.dataClass.classe;

        //alert("Estoy en Class.component - line 128 - this.mensajeBackend:  "+this.mensajeBackend);
        /*alert("Estoy en Class.component - line 129 - this.newClass:  "
           +this.newClass.code);*/

      if (!this.newClass) {     
        if (this.mensajeBackend){
          this.toast.error(this.mensajeBackend);
        }}

 if (this.newClass) {
      this.toast.success('create Class successfully');

      // reset form: ClassForm
      this.classForm.reset();

      // go to /createClass page
      
      this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /home
      .then(() => this.router.navigate(['/createClass'])); // then I go to /createClass page

      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get classname() { return this.classForm.controls['classname'];}
get code() { return this.classForm.controls['code'];}
get classday() { return this.classForm.controls['classday'];}
get classtime() { return this.classForm.controls['classtime'];}
get classlevel() { return this.classForm.controls['classlevel'];}
get session_time() { return this.classForm.controls['session_time'];}
get price() { return this.classForm.controls['price'];}
get trainer() { return this.classForm.controls['trainer'];}
get dateBegin() { return this.classForm.controls['dateBegin'];}
get key_benefits() { return this.classForm.controls['key_benefits'];}
get class_overview() { return this.classForm.controls['class_overview'];}
get why_matters() { return this.classForm.controls['why_matters'];}
get image() { return this.classForm.controls['image'];}
changeImg(event:any) {this.selectedFile = event.target.files[0];

    // this is to show the image preview in vomponent view
    if (this.selectedFile) {
      // The FileReader API reads the file as a data URL, which is a string representation of the image data.
      const reader = new FileReader();
        reader.onload = (event:any) => {
          this.imagePreviewUrl = event.target.result as string; };
        reader.readAsDataURL(this.selectedFile);
      }
    }


  }








