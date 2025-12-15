import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-staff-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
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
  templateUrl: './staff-edit.component.html',
  styleUrl: './staff-edit.component.css'
})
export class StaffEditComponent {

// Data that I want to get from URL sended by login component
ItemStaffId: string | null = null; 
selectedFile: File | null = null; // var to handle the image
mensajeBackend:any=""; // var to handle ok messages
dataStaff:any=[];
newStaff:any=[];
AddModel: any = {image:[]};
otherparam :string="";
param :string="";
element:any={};
OldImage: string = '';

// var to handle preview image
imagePreviewUrl: string = "";

private readonly staffService = inject(StaffService);
private readonly router = inject(Router);
private readonly routerParam = inject(ActivatedRoute);
public fb = inject (FormBuilder);
private readonly toast =  inject(ToastrService);
// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  // When the component starts call the function updateStaffData

  this.updateStaffData();
  // get the id, sended by the URL, routerParam, in app.routes.ts -> editPack/:id
  this.routerParam.paramMap.subscribe(params =>{this.ItemStaffId = params.get('id')})
  const id= this.ItemStaffId
  
  alert ("Estoy en ngOnInit - staff-edit.component - line 86 - id: "+id);


  this.getStaffData(id);
}

/**** editeditStaffForm  */
editStaffForm = new FormGroup({
    name:  new FormControl('', [Validators.required, Validators.min(5)]),
    email:  new FormControl('', [Validators.required ]),
    age:  new FormControl('', [Validators.required ]),
    field:  new FormControl('', [Validators.required ]),
    id_card:  new FormControl('', [Validators.required ]),
    phone:  new FormControl('', [Validators.required ]),
    address:  new FormControl('', [Validators.required ]),
    gender:  new FormControl('', [Validators.required ]),
    image: new FormControl(this.selectedFile, [Validators.required,])
});

// delete all fields in form
updateStaffData(){

  this.editStaffForm = new FormGroup({

    name:  new FormControl('', [Validators.required, Validators.min(5)]),
    email:  new FormControl('', [Validators.required ]),
    age:  new FormControl('', [Validators.required ]),
    field:  new FormControl('', [Validators.required ]),
    id_card:  new FormControl('', [Validators.required ]),
    phone:  new FormControl('', [Validators.required ]),
    address:  new FormControl('', [Validators.required ]),
    gender:  new FormControl('', [Validators.required ]),
    image: new FormControl(this.selectedFile, [Validators.required,])
      
  }); 
}
/**** function to get the data to fill form  from backend - old values*/

getStaffData(id:any): void {
    //alert("Estoy en editcategory - line 101 - getCategoryData - id: "+ id);

    // get the data, to fill the form 
    this.staffService.getstaffById(id).pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {

       //alert("Estoy en staff-edit.component - line 131 - data.name: "+data.name);
       //alert("Estoy en staff-edit.component - line 132 - data.email: "+data.email);
       
      this.OldImage = data.image;
      
      this.editStaffForm.patchValue({

    name:    data.name,
    email:   data.email,
    age:     data.age,
    field:   data.field,
    id_card: data.id_card,
    phone:   data.phone,
    address: data.address,
    gender:  data.gender,
   
      });
    
    this.otherparam = data;
   
    }); } // End of Get Staff Data

/***** End of Block to function to get the data to fill form  from backend - old values - */
/**** function to edit pack  **************************************************************/

EditStaff(): void{
   
      /** If the form is not valid */  
      if (!this.editStaffForm.valid) {
      
        // Send a message to complete the data in form    
        this.toast.error('Please Fill all Form Fields.!');
    
     } else {
    
      if (window.confirm('Are you sure?')) {
        
      alert("Estoy en editstaff - line 167 - image: " + this.OldImage);

      /*** service to erase old image  ****************************************/

       this.staffService.deleteImage(this.OldImage).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
      /* alert ("Estoy en EditStaff - line - 183 -selectedFile:"+this.selectedFile)
       alert ("Estoy en EditStaff - line - 184 - this.editForm.value: "+this.editStaffForm.value['name'])*/
      }

       this.routerParam.paramMap.subscribe(params =>{this.ItemStaffId = params.get('id')});
       const id = this.ItemStaffId;
    
       //alert ("Estoy en EditStaff - line - 190 - id: "+ id)
      
       this.staffService.editstaff(this.editStaffForm.value,this.selectedFile,id ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        complete: () => {
    
      //alert ("Estoy en editstaff - line - 195 - servicio completado ... !")
    
  // reset form: editeditStaffForm
    this.editStaffForm.reset();
    
    
  // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
    .then(() => this.router.navigate(['/listStaff'])); // then I go to /listStaff page
    
    // Send a message to complete the data in form    
    this.toast.success('Content updated successfully!');
    
        },
        error: (e) => {
          console.log(e);
          alert ("Estoy en staff-edit -line 211 - hubo error")
        }
        ,});
      
      }
      
      }// End Block function to edit an Staff 
/****  end of function to edit staff ***************************************************** */

get name() { return this.editStaffForm.controls['name'];}
get email() { return this.editStaffForm.controls['email'];}
get age() { return this.editStaffForm.controls['age'];}
get field() { return this.editStaffForm.controls['field'];}
get id_card() { return this.editStaffForm.controls['id_card'];}
get phone() { return this.editStaffForm.controls['phone'];}
get address() { return this.editStaffForm.controls['address'];}
get gender() { return this.editStaffForm.controls['gender'];}
get image() { return this.editStaffForm.controls['image'];}

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
