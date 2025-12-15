import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Classes } from '../../../../core/interfaces/classes/classes';
/**** Class services block ******/
import { ClassesService } from '../../../../core/services/classes/classes.service';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classes-list',
  standalone: true,
  imports: [ FormsModule,
             CommonModule,
             NgIcon,
             NgxPaginationModule,
],
providers: [provideIcons({ bootstrapTrash3, 
                  bootstrapPersonLinesFill }), 
                  ToastrService],
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.css'
})
export class ClassesListComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpoint;
  messageclass:any="";
  Dataclass:any = [];
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
                    this.getDataclass();
                    /*this.filteredItems = this.Dataclass; 
                    this.items = this.Dataclass.class; */
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the class list ************************/
  getDataclass() {
                  
    //alert("Estoy en listclass-component - line 74 - getDataclass");
    
    this.classService.getclassesList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.Dataclass = response;
        this.filteredItems = this.Dataclass; 
        this.items = this.Dataclass; 

       /*alert("Estoy en listclasss-component - line 85 - this.Dataclass.classes.nameplan="+ this.Dataclass.classes[0].classname);
       alert("Estoy en listclasss-component - line 86 - this.Dataclass.classes[0].image="+ this.Dataclass.classes[0].image);*/

        this.messageclass = this.Dataclass.err

        /*** if there is any error, show it */
        if (this.messageclass){

          this.toast.error(this.messageclass);
          
      }
   /*** End block of the function to get from backend the class list *****/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataclass
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}

// function to delete class
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();

  alert("EStoy en listclasss - line 110 - Data.image: "+Data.image);
  alert("EStoy en listclasss - line 111 - Data.id: "+Data.id);

  this.classService.deleteImage(Data.image).subscribe((data) => {

        // alert("Data: "+data);
  });


  this.classService.deleteclasses(Data.id).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['listclass'])); // then I go to /furnitureList page

})}

// end of block of function to delete class

// function to edit class
editDetails(id:any){

  /***alert("Estoy en listclasss component - line 103 - to ediclass Comp ..");
  alert("Estoy en listclasss component - line 104 - to ediclass Comp .. id: "+id);*/

  this.router.navigate(['/editclass',id]);

}

// end of block of function to edit class

// function to handle search in class list *************

get filteredclass(): Classes[] {
  return this.items.filter((item:any) => 
    /*item.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    ??*/
    item.code.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
// End of function Block  to handle search in class list
}







