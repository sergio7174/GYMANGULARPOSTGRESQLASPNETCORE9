import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
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
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-classes-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon],
  providers: [provideIcons({ 
                           bootstrapMailbox2Flag, 
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
  templateUrl: './classes-edit.component.html',
  styleUrl: './classes-edit.component.css'
})
export class ClassesEditComponent {

// Data that I want to get from URL sended by login component
ItemClassId: string | null = null; 
selectedFile: File | null = null; // var to handle the image
mensajeBackend:any=""; // var to handle ok messages
dataClass:any=[];
newClass:any=[];
AddModel: any = {image:[]};
otherparam :string="";
param :string="";
element:any={};
OldImage: string = '';

// var to handle preview image
imagePreviewUrl: string = "";

private readonly classesService = inject(ClassesService);
private readonly router = inject(Router);
private readonly routerParam = inject(ActivatedRoute);
public fb = inject (FormBuilder);
private readonly toast =  inject(ToastrService);
// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  // When the component starts call the function updateCategoryData

  this.updateClassData();
  // get the id, sended by the URL, routerParam, in app.routes.ts -> editcategory/:id
  this.routerParam.paramMap.subscribe(params =>{this.ItemClassId = params.get('id')})
  const id= this.ItemClassId
  
  //alert ("Estoy en ngOnInit - category-edit.component - line 69 - id: "+id);


  this.getClassData(id);
}

/**** editClassForm  */
editClassForm = new FormGroup({

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
  
}); 

// delete all fields in form
updateClassData(){

  this.editClassForm = new FormGroup({

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
      
  }); 
}

getClassData(id:any): void {
    //alert("Estoy en editcategory - line 101 - getCategoryData - id: "+ id);

    // get the data, to fill the form 
    this.classesService.getclassById(id).pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {

       alert("Estoy en classes-edit.component - line 140 - data.name: "+data.classname);
       
      this.OldImage = data.image;
      
      this.editClassForm.patchValue({

    classname:    data.classname,
    code:         data.code,
    classday:     data.classday,
    classtime:    data.classtime,
    classlevel:   data.classname,
    session_time: data.session_time,
    price:        data.price,
    trainer:        data.trainer,
    dateBegin:      data.dateBegin,
    key_benefits:   data.key_benefits,
    expert_trainer: data.expert_trainer,
    class_overview: data.class_overview,
    why_matters:    data.why_matters,
      });
    
    this.otherparam = data;
   
    }); } // End of GetClass Data

   EditClass(): void{
   
      /** If the form is not valid */  
      if (!this.editClassForm.valid) {
      
        // Send a message to complete the data in form    
        this.toast.error('Please Fill all Form Fields.!');
    
     } else {
    
      if (window.confirm('Are you sure?')) {
        
      alert("Estoy en editclass - line 184 - image: " + this.OldImage);

      /*** service to erase old image  ****************************************/

       this.classesService.deleteImage(this.OldImage).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response) => {

          const DataResponseFromBackend: any = response;
          const messagefound: any = DataResponseFromBackend.message;
          const messageNotfound: any = DataResponseFromBackend.messageNotFound;

          if (messagefound){
           
            alert ("Image Deleted Succesfully .... " );
          }
          if (messageNotfound){
           
            alert ("Image Not Found .... " );
          }
        }
      
      })

      /*** end of service to erase old image block ************************** */
      /* alert ("Estoy en EditClass - line - 200 -selectedFile:"+this.selectedFile)
       alert ("Estoy en EditClass - line - 201 - this.editForm.value: "+this.editClassForm.value['name'])*/
      }

       this.routerParam.paramMap.subscribe(params =>{this.ItemClassId = params.get('id')});
       const id = this.ItemClassId;
    
       //alert ("Estoy en EditClass - line - 207 - id: "+ id)
      
       this.classesService.editclasses(this.editClassForm.value,this.selectedFile,id ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        complete: () => {
    
      //alert ("Estoy en editclass - line - 212 - servicio completado ... !")
    
  // reset form: editCategoryForm
    this.editClassForm.reset();
    
    
  // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
    .then(() => this.router.navigate(['/listClasses'])); // then I go to /furnitureList page
    
    // Send a message to complete the data in form    
    this.toast.success('Content updated successfully!');
    
        },
        error: (e) => {
          console.log(e);
          alert ("Estoy en classes-edit -line 228 - hubo error")
        }
        ,});
      
      }
      
      }// End Block function to edit a class 

// Getter to access form control
get myForm() { return this.editClassForm.controls;}
get classname() {return this.editClassForm.controls['classname'];}
get code() { return this.editClassForm.controls['code'];}
get classday() { return this.editClassForm.controls['classday'];}

get classtime() { return this.editClassForm.controls['classtime'];}
get classlevel() { return this.editClassForm.controls['classlevel'];}
get session_time() { return this.editClassForm.controls['session_time'];}
get price() { return this.editClassForm.controls['price'];}
get trainer() { return this.editClassForm.controls['trainer'];}
get dateBegin() { return this.editClassForm.controls['dateBegin'];}
get key_benefits() { return this.editClassForm.controls['key_benefits'];}
get expert_trainer() { return this.editClassForm.controls['expert_trainer'];}
get class_overview() { return this.editClassForm.controls['class_overview'];}
get why_matters() { return this.editClassForm.controls['why_matters'];}
   // function to get the image
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

