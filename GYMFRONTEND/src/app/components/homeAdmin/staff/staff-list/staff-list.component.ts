import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Router } from '@angular/router';
import { Staff } from '../../../../core/interfaces/staff/staff';
/**** Staff services block ******/
import { StaffService } from '../../../../core/services/staff/staff.service';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [ FormsModule,
             CommonModule,
             NgIcon,
             NgxPaginationModule,
  
],
providers: [provideIcons({ bootstrapTrash3, 
bootstrapPersonLinesFill }), ToastrService],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.css'
})
export class StaffListComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpoint;
  messageStaff:any="";
  DataStaff:any = [];
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

  private readonly staffService = inject(StaffService);
  private readonly router = inject(Router);

  ngOnInit(): void { 
                    this.getDataStaff();
                    this.filteredItems = this.DataStaff; 
                    this.items = this.DataStaff.Staff; 
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Staff list ************************/
  getDataStaff() {
                  
    //alert("Estoy en listStaffs-component - line 74 - getDataStaff");
    
    this.staffService.getstaffList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.DataStaff = response;
        this.filteredItems = this.DataStaff; 
        this.items = this.DataStaff; 

       /*alert("Estoy en listStaffs-component - line 85 - this.DataStaff.Categories.name="+ this.DataStaff.Categories[0].name);
       alert("Estoy en listStaffs-component - line 86 - this.DataStaff.Staff.image="+ this.DataStaff.Categories[0].image);*/

        /*** alert("Estoy en listStaffs-component - line 45 - this.DataStaff.Staffs.name="+ this.DataStaff.Staffs);*/

        this.messageStaff = this.DataStaff.err

        /*** if there is any error, show it */
        if (this.messageStaff){

          this.toast.error(this.messageStaff);
          
      }
   /*** End block of the function to get from backend the Staff list *****/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataStaff
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}

// function to delete Staff
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();

  alert("EStoy en listStaffs - line 113 - Data.image: "+Data.image);
  alert("EStoy en listStaffs - line 114 - Data.id: "+Data.id);

  this.staffService.deleteImage(Data.image).subscribe((data) => {

        // alert("Data: "+data);
  });


  this.staffService.deletestaff(Data.id).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['listStaff'])); // then I go to /furnitureList page

})}

// end of block of function to delete Staff

// function to edit Staff
editDetails(id:any){

  /***alert("Estoy en listStaffs component - line 103 - to ediStaff Comp ..");
  alert("Estoy en listStaffs component - line 104 - to ediStaff Comp .. id: "+id);*/

  this.router.navigate(['/editStaff',id]);

}

// end of block of function to edit Staff

// function to handle search in Staff list *************

get filteredStaff(): Staff[] {
  return this.items.filter((item:any) => 
    item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  ??
  item.email.toLowerCase().includes(this.searchTerm.toLowerCase())
  )
}
// End of function Block  to handle search in Staff list
}





