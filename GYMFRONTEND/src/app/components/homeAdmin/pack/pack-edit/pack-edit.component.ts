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
         bootstrapCalendar2DayFill, 
         bootstrapKeyFill,
         bootstrapBack,
         bootstrapFileEarmarkSpreadsheet,
         bootstrapFiletypeKey,
         bootstrapCoin,
         bootstrapReceipt,
         bootstrapChevronRight,
         bootstrapCheckCircle

         } from '@ng-icons/bootstrap-icons';

import { PackService } from '../../../../core/services/pack/pack.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-pack-edit',
  standalone: true,
  imports: [ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon],
  providers: [provideIcons({ bootstrapMailbox2Flag, 
                           bootstrapKeyFill, 
                           bootstrapBack,
                           bootstrapCalendar2DayFill,
                           bootstrapFileEarmarkSpreadsheet,
                           bootstrapFiletypeKey,
                           bootstrapCoin,
                           bootstrapReceipt,
                           bootstrapChevronRight,
                           bootstrapCheckCircle }),
                           
                           ToastrService],
  templateUrl: './pack-edit.component.html',
  styleUrl: './pack-edit.component.css'
})
export class PackEditComponent {

// Data that I want to get from URL sended by login component
ItemPackId: string | null = null; 
selectedFile: File | null = null; // var to handle the image
mensajeBackend:any=""; // var to handle ok messages
dataPack:any=[];
newPack:any=[];
AddModel: any = {image:[]};
otherparam :string="";
param :string="";
element:any={};
OldImage: string = '';

// var to handle preview image
imagePreviewUrl: string = "";

private readonly packService = inject(PackService);
private readonly router = inject(Router);
private readonly routerParam = inject(ActivatedRoute);
public fb = inject (FormBuilder);
private readonly toast =  inject(ToastrService);
// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  // When the component starts call the function updatePackData

  this.updatePackData();
  // get the id, sended by the URL, routerParam, in app.routes.ts -> editPack/:id
  this.routerParam.paramMap.subscribe(params =>{this.ItemPackId = params.get('id')})
  const id= this.ItemPackId
  
  //alert ("Estoy en ngOnInit - category-edit.component - line 69 - id: "+id);


  this.getPackData(id);
}


/**** editeditPackForm  */
editPackForm = new FormGroup({
    nameplan:  new FormControl('', [Validators.required, Validators.min(5)]),
    trialdays:  new FormControl('', [Validators.required ]),
    features:  new FormControl('', [Validators.required ]),
    timedays:  new FormControl('', [Validators.required ]),
    cost:  new FormControl('', [Validators.required ]),
    code:  new FormControl('', [Validators.required ]),
    status:  new FormControl('', [Validators.required ]),
    description:  new FormControl('', [Validators.required]),
    image: new FormControl(this.selectedFile, [Validators.required,])
}); 

// delete all fields in form
updatePackData(){

  this.editPackForm = new FormGroup({

    nameplan:  new FormControl('', [Validators.required, Validators.min(5)]),
    trialdays:  new FormControl('', [Validators.required ]),
    features:  new FormControl('', [Validators.required ]),
    timedays:  new FormControl('', [Validators.required ]),
    cost:  new FormControl('', [Validators.required ]),
    code:  new FormControl('', [Validators.required ]),
    status:  new FormControl('', [Validators.required ]),
    description:  new FormControl('', [Validators.required]),
    image: new FormControl(this.selectedFile, [Validators.required,])
      
  }); 
}
/**** function to get the data to fill form  from backend - old values*/

getPackData(id:any): void {
    alert("Estoy en editcategory - line 128 - getPackData - id: "+ id);

    // get the data, to fill the form 
    this.packService.getpackById(id).pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {

       alert("Estoy en pack-edit.component - line 118 - data.name: "+data.nameplan);
       
      this.OldImage = data.image;
      
      this.editPackForm.patchValue({

    nameplan:  data.nameplan,
    trialdays: data.trialdays,
    features:  data.features,
    timedays:  data.timedays,
    cost:      data.cost,
    code:      data.code,
    status:    data.status,
    description:  data.description,
   
      });
    
    this.otherparam = data;
   
    }); } // End of GetPack Data

/***** End of Block to function to get the data to fill form  from backend - old values - */
/**** function to edit pack  **************************************************************/

EditPack(): void{
   
      /** If the form is not valid */  
      if (!this.editPackForm.valid) {
      
        // Send a message to complete the data in form    
        this.toast.error('Please Fill all Form Fields.!');
    
     } else {
    
      if (window.confirm('Are you sure?')) {
        
      alert("Estoy en editpack - line 154 - image: " + this.OldImage);

      /*** service to erase old image  ****************************************/

       this.packService.deleteImage(this.OldImage).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response) => {

          const DataResponseFromBackend: any = response;
          const messageFromBackend: any = DataResponseFromBackend.message;

          alert ("Estoy en EditPack - line - 164 - message from backend: " + messageFromBackend );
        }
      
      })

      /*** end of service to erase old image block ************************** */
      /* alert ("Estoy en EditPack - line - 170 -selectedFile:"+this.selectedFile)
       alert ("Estoy en EditPack - line - 171 - this.editForm.value: "+this.editeditPackForm.value['name'])*/
      }

       this.routerParam.paramMap.subscribe(params =>{this.ItemPackId = params.get('id')});
       const id = this.ItemPackId;
    
       //alert ("Estoy en EditPack - line - 177 - id: "+ id)
      
       this.packService.editpack(this.editPackForm.value,this.selectedFile,id ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        complete: () => {
    
      //alert ("Estoy en editpack - line - 182 - servicio completado ... !")
    
  // reset form: editeditPackForm
    this.editPackForm.reset();
    
    
  // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
    .then(() => this.router.navigate(['/listPack'])); // then I go to /furnitureList page
    
    // Send a message to complete the data in form    
    this.toast.success('Content updated successfully!');
    
        },
        error: (e) => {
          console.log(e);
          alert ("Estoy en pack-edit -line 198 - hubo error")
        }
        ,});
      
      }
      
      }// End Block function to edit a pack 
/****  end of function to edit pack ***************************************************** */

// Getter to access form control
get myForm() { return this.editPackForm.controls;}
get nameplan() { return this.editPackForm.controls['nameplan'];}
get trialdays() { return this.editPackForm.controls['trialdays'];}
get features() { return this.editPackForm.controls['features'];}
get timedays() { return this.editPackForm.controls['timedays'];}
get cost() { return this.editPackForm.controls['cost'];}
get code() { return this.editPackForm.controls['code'];}
get status() { return this.editPackForm.controls['status'];}
get description() { return this.editPackForm.controls['description'];}
get image() { return this.editPackForm.controls['image'];}
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
