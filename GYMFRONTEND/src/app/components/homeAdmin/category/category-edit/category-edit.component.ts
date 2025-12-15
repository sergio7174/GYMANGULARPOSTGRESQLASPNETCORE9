import { Category } from './../../../../core/interfaces/category/category';
import { Component, inject,  DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../core/services/category/category.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapMailbox2Flag } from '@ng-icons/bootstrap-icons';
import { bootstrapKeyFill } from '@ng-icons/bootstrap-icons';
import { bootstrapBack } from '@ng-icons/bootstrap-icons';


@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [     CommonModule,
                 ReactiveFormsModule,
                 InputTextModule,
                 InputNumberModule,
                 ButtonModule,
                 NgIcon ],
  providers: [provideIcons({ bootstrapMailbox2Flag, 
                             bootstrapKeyFill, 
                             bootstrapBack }),
                             ToastrService],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {


// Data that I want to get from URL sended by login component
ItemCategoryId: string | null = null; 

selectedFile: File | null = null; // var to handle the image
mensajeBackend:any=""; // var to handle ok messages
dataCategory:any=[];
newCategory:any=[];
AddModel: any = {image:[]};
otherparam :string="";
param :string="";
element:any={};
OldImage: string = '';

// var to handle preview image

imagePreviewUrl: string = "";
 
private readonly categoryService = inject(CategoryService);
private readonly router = inject(Router);
private readonly routerParam = inject(ActivatedRoute);
public fb = inject (FormBuilder);
private readonly toast =  inject(ToastrService);
// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  // When the component starts call the function updateCategoryData

  this.updateCategoryData();
  // get the id, sended by the URL, routerParam, in app.routes.ts -> editcategory/:id
  this.routerParam.paramMap.subscribe(params =>{this.ItemCategoryId = params.get('id')})
  const id= this.ItemCategoryId
  
  //alert ("Estoy en ngOnInit - category-edit.component - line 69 - id: "+id);


  this.getCategoryData(id);
}

editCategoryForm = new FormGroup({

  name:  new FormControl('', [Validators.required, Validators.min(5)]),
  description:  new FormControl('', [Validators.required]),
  image: new FormControl(this.selectedFile, [Validators.required,])
  
}); 

// delete all fields in form
updateCategoryData(){
  this.editCategoryForm = new FormGroup({
    name:  new FormControl('', [Validators.required, Validators.min(5)]),
    description:  new FormControl('', [Validators.required]),
    image: new FormControl(this.selectedFile, [Validators.required,])
      
  }); 
}


  getCategoryData(id:any): void {

    //alert("Estoy en editcategory - line 101 - getCategoryData - id: "+ id);

    // get the data, to fill the form 
    this.categoryService.getCategoryById(id).pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {

       //alert("Estoy en editproduct - line 107 - data.name: "+data.category.name);
       
      this.OldImage = data.category.image;
      
      this.editCategoryForm.patchValue({
        name: data.category.name,
        description : data.category.description,
        image: data.category.image
      });

    //this.param = data['image'];
    //this.param = data.category.image;
    
    this.otherparam = data;
   
    }); } // End of GetCategory Data
 
EditCategory(): void{
   
      /** If the form is not valid */  
      if (!this.editCategoryForm.valid) {
      
        // Send a message to complete the data in form    
        this.toast.error('Please Fill all Form Fields.!');
    
     } else {
    
      if (window.confirm('Are you sure?')) {
        
      alert("Estoy en editproduct - line 137 - image: " + this.OldImage);

      /*** service to erase old image  ****************************************/

       this.categoryService.deleteImage(this.OldImage).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response) => {

          const DataResponseFromBackend: any = response;
          const messageFromBackend: any = DataResponseFromBackend.message;

          alert ("Estoy en EditCategory - line - 144 - message from backend: " + messageFromBackend );
        }
      
      })

      /*** end of service to erase old image block ************************** */
      /* alert ("Estoy en EditProduct - line - 135 -selectedFile:"+this.selectedFile)
      
       alert ("Estoy en EditProduct - line - 137 - this.editForm.value: "+this.editCategoryForm.value['name'])*/
      
      }
       

       this.routerParam.paramMap.subscribe(params =>{this.ItemCategoryId = params.get('id')});
       const id = this.ItemCategoryId;
    
       //alert ("Estoy en EditCategory - line - 142 - id: "+ id)
      
       this.categoryService.editcategory(this.editCategoryForm.value,this.selectedFile,id ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        complete: () => {
    
      //alert ("Estoy en editcategory - line - 147 - servicio completado ... !")
    
  // reset form: editCategoryForm
    this.editCategoryForm.reset();
    
    
  // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
    .then(() => this.router.navigate(['/listCategories'])); // then I go to /furnitureList page
    
    // Send a message to complete the data in form    
    this.toast.success('Content updated successfully!');
    
        },
        error: (e) => {
          console.log(e);
          alert ("Estoy en category-edit -line 164 - hubo error")
        }
        ,});
      
      }
      
      }// End Block function to edit category
    
// Getter to access form control
get myForm() { return this.editCategoryForm.controls;}

get name() {return this.editCategoryForm.controls['name'];}
  
get description() { return this.editCategoryForm.controls['description'];}

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

} // End of the class CategoryEditComponent
