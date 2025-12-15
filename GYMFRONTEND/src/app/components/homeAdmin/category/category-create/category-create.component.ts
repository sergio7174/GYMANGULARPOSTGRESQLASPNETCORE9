import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapMailbox2Flag } from '@ng-icons/bootstrap-icons';
import { bootstrapKeyFill } from '@ng-icons/bootstrap-icons';
import { bootstrapBack } from '@ng-icons/bootstrap-icons';
import { CategoryService } from '../../../../core/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    NgIcon],
providers: [provideIcons({ bootstrapMailbox2Flag, bootstrapKeyFill, bootstrapBack }),ToastrService],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/********** trying to save image new procedure */
selectedFile: File | null = null;
/***************end block new procedure ****** */


// var to handle messages from backend about the category process
mensajeBackend:any=[];
dataCategory:any=[];
newCategory:any=[];
AddModel: any = {image:[]};

// var to handle preview image

imagePreviewUrl: string = "";


// inject services dependecies 
private readonly categoryService = inject(CategoryService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);


categoryForm = new FormGroup(
  {
    name:  new FormControl('', [Validators.required, Validators.min(5)]),
    description:  new FormControl('', [Validators.required]),
    image: new FormControl(this.selectedFile, [Validators.required,])
    
  },
);

oncategory() {

  /**** for testing purposes ************/
  try{
    if(this.categoryForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/

 if (this.categoryForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData = { ...this.categoryForm.value };
  
  this.categoryService.createcategory(postData , (this.selectedFile)).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.dataCategory = response;
        this.mensajeBackend = this.dataCategory.message;
        this.newCategory = this.dataCategory.NewCategory;

        /*alert("Estoy en category.component - line 90 - this.         mensajeBackend:  "+this.mensajeBackend);
        alert("Estoy en category.component - line 91 - this.newCategory:  "
           +this.newCategory);*/

      if (!this.newCategory) {     
        if (this.mensajeBackend){
          this.toast.error(this.mensajeBackend);
        }}

 if (this.newCategory) {
      this.toast.success('create Category successfully');
      
      //window.location.reload();

      // reset form: categoryForm
      this.categoryForm.reset();

      // go to /createCategory page
      
      this.router.navigateByUrl('/home', {skipLocationChange: true})// first I go to /home
      .then(() => this.router.navigate(['/createCategory'])); // then I go to /createCategory page

      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get name() {
  return this.categoryForm.controls['name'];
}

get description() {
  return this.categoryForm.controls['description'];
}

get image() {
  return this.categoryForm.controls['image'];
  }
  
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






