import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
/**** Class services block ******/
import { ClassesService } from '../../../../core/services/classes/classes.service';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';
import { bootstrapChevronRight} from '@ng-icons/bootstrap-icons';
 import { FooterComponent } from '../../../layout/footer/footer/footer.component';

@Component({
  selector: 'app-classes-table',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgIcon, 
    FooterComponent,
],

providers: [provideIcons({ bootstrapChevronRight }), ToastrService],
  templateUrl: './classes-table.component.html',
  styleUrl: './classes-table.component.css'
})
export class ClassesTableComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpointI;
  messageClass:any="";
  DataClass:any = [];
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

  private readonly classService = inject(ClassesService);
  private readonly router = inject(Router);

  ngOnInit(): void { 
                    this.getDataClass();
                   
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Class list ************************/
  getDataClass() {
                  
    //alert("Estoy en listClasss-component - line 74 - getDataClass");
    
    this.classService.getclassesList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.DataClass = response;
        this.filteredItems = this.DataClass; 
       

       /*alert("Estoy en listClasss-component - line 95 - this.DataClass.Class.name="+ this.DataClass.classes[0].classname);
       alert("Estoy en listClasss-component - line 86 - this.DataClass.Class.image="+ this.DataClass.Classes[0].image);

       alert("Estoy en listClasss-component - line 87 - this.filteredItems.name="+ this.filteredItems[0].classname);
       alert("Estoy en listClasss-component - line 88 - this.filteredItems.image="+ this.filteredItems[0].image);*/

        /*** alert("Estoy en listClasss-component - line 45 - this.DataClass.Classs.name="+ this.DataClass.Classs);*/

        this.messageClass = this.DataClass.err

        /*** if there is any error, show it */
        if (this.messageClass){

          this.toast.error(this.messageClass);
          
      }
   /*** End block of the function to get from backend the Class list *****/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataClass
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['home'],)}

ClassDetails(id:any){

  /***alert("Estoy en listclasses component - line 124 - to see class details Comp ..");
  alert("Estoy en classes component - line 125 - to class details Comp .. id: "+id);*/

  this.router.navigate(['/classDetails',id]);

}



}









