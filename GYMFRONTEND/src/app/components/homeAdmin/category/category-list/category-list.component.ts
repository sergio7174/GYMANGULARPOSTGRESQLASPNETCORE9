import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
/**** Category services block ******/
import { CategoryService } from '../../../../core/services/category/category.service';
import { Router } from '@angular/router';
import { Category } from '../../../../core/interfaces/category/category';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ FormsModule,
             CommonModule,
             NgIcon,
             NgxPaginationModule,
             //NgOptimizedImage
],
providers: [provideIcons({ bootstrapTrash3, 
bootstrapPersonLinesFill }), ToastrService],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpoint;
  messageCategory:any="";
  DataCategory:any = [];
  Data:any = [];

  /*** vars to handle search ******************/

  items: any = [];
  filteredItems: any = [];
  searchTerm: string = '';

   /*** End Block to vars to handle search ****/

   imagetest : any ="";

/**** vars to handle pagination  NgxPagination  ********/

page: number = 1; // Current page

/***** End of vars to handle pagination  */

  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);

  ngOnInit(): void { 
                    this.getDataCategories();
                    this.filteredItems = this.DataCategory; 
                    this.items = this.DataCategory.Category; 
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Category list ************************/
  getDataCategories() {
                  
    //alert("Estoy en listCategorys-component - line 68 - getDataCategorys");
    
    this.categoryService.getCategoryList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.DataCategory = response;
        this.filteredItems = this.DataCategory; 
        this.items = this.DataCategory; 

       /*alert("Estoy en listCategorys-component - line 85 - this.DataCategory.Categories.name="+ this.DataCategory.Categories[0].name);
       alert("Estoy en listCategorys-component - line 86 - this.DataCategory.Categories.image="+ this.DataCategory.Categories[0].image);*/

        /*** alert("Estoy en listCategorys-component - line 45 - this.DataCategory.Categorys.name="+ this.DataCategory.Categorys);*/

        this.messageCategory = this.DataCategory.err

        /*** if there is any error, show it */
        if (this.messageCategory){

          this.toast.error(this.messageCategory);
          
      }
   /*** End block of the function to get from backend the Category list *****/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataCategory
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}

// function to delete Category
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();

  //alert("EStoy en listCategorys - line 109 - Data.image: "+Data.image);

  this.categoryService.deleteImage(Data.image).subscribe((data) => {

        // alert("Data: "+data);
  });


  this.categoryService.deleteCategory(Data._id,Data.image).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['listCategory'])); // then I go to /furnitureList page

})}

// end of block of function to delete Category

// function to edit Category
editDetails(id:any){

  /***alert("Estoy en listCategorys component - line 103 - to ediCategory Comp ..");
  alert("Estoy en listCategorys component - line 104 - to ediCategory Comp .. id: "+id);*/

  this.router.navigate(['/editCategory',id]);

}

// end of block of function to edit Category

// function to handle search in Category list *************

get filteredCategories(): Category[] {
  return this.items?.Categories?.filter((item:any) => 
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
// End of function Block  to handle search in Category list
}




