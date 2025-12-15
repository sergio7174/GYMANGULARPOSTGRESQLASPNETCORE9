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
         bootstrapBack,
         bootstrapPhone,
         bootstrapFiletypeKey,
         bootstrapPersonWorkspace,
         bootstrapReceipt,
         bootstrapChevronRight,
         bootstrapCheckCircle } from '@ng-icons/bootstrap-icons';

import { StaffService } from '../../../../core/services/staff/staff.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-staff-create',
  standalone: true,
  imports: [ ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon],
providers: [provideIcons({

                  bootstrapMailbox2Flag, 
                  bootstrapPersonCircle, 
                  bootstrapBack,
                  bootstrapHouseAddFill,
                  bootstrapPhone,
                  bootstrapFiletypeKey,
                  bootstrapPersonWorkspace,
                  bootstrapReceipt,
                  bootstrapChevronRight,
                  bootstrapCheckCircle }),
                  ToastrService],
  templateUrl: './staff-create.component.html',
  styleUrl: './staff-create.component.css'
})
export class StaffCreateComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/********** trying to save image new procedure */
selectedFile: File | null = null;
/***************end block new procedure ****** */


// var to handle messages from backend about the staff process
mensajeBackend:any=[];
datastaff:any=[];
newstaff:any=[];
AddModel: any = {image:[]};

// var to handle preview image

imagePreviewUrl: string = "";


// inject services dependecies 
private readonly staffService = inject(StaffService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);


staffForm = new FormGroup(
  {
    name:  new FormControl('', [Validators.required, Validators.min(5)]),
    email:  new FormControl('', [Validators.required ]),
    age:  new FormControl('', [Validators.required ]),
    field:  new FormControl('', [Validators.required ]),
    id_card:  new FormControl('', [Validators.required ]),
    phone:  new FormControl('', [Validators.required ]),
    address:  new FormControl('', [Validators.required ]),
    gender:  new FormControl('', [Validators.required ]),
    image: new FormControl(this.selectedFile, [Validators.required,])
    
  },
);


onstaff() {

  /**** for testing purposes ************/
  try{
    if(this.staffForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/

 if (this.staffForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData = { ...this.staffForm.value };
  
  this.staffService.createstaff(postData , (this.selectedFile)).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.datastaff = response;
        this.mensajeBackend = this.datastaff.message;
        this.newstaff = this.datastaff.trainer;

        alert("Estoy en staff.component - line 124 - this.         mensajeBackend:  "+this.mensajeBackend);
        alert("Estoy en staff.component - line 125 - this.newstaff:  "
           +this.newstaff.email);

      if (!this.newstaff) {     
        if (this.mensajeBackend){

          this.toast.error(this.mensajeBackend);
        }}

 if (this.newstaff) {
      this.toast.success('Created Trainer successfully');
      
      //window.location.reload();

      // reset form: staffForm
      this.staffForm.reset();

      // go to /createstaff page
      
      this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /home
      .then(() => this.router.navigate(['/createStaff'])); // then I go to /createstaff page

      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get name() { return this.staffForm.controls['name'];}
get email() { return this.staffForm.controls['email'];}
get age() { return this.staffForm.controls['age'];}
get field() { return this.staffForm.controls['field'];}
get id_card() { return this.staffForm.controls['id_card'];}
get phone() { return this.staffForm.controls['phone'];}
get address() { return this.staffForm.controls['address'];}
get gender() { return this.staffForm.controls['gender'];}
get image() { return this.staffForm.controls['image'];}

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








