import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
/**** Staff services block ******/
import { StaffService } from '../../../../core/services/staff/staff.service';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';
import { bootstrapChevronRight,
         bootstrapTwitter, 
         bootstrapFacebook, 
         bootstrapInstagram,
         bootstrapLinkedin,
 } from '@ng-icons/bootstrap-icons';
 import { FooterComponent } from '../../../layout/footer/footer/footer.component';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [ FormsModule,
             CommonModule,
             NgxPaginationModule,
             NgIcon, 
             FooterComponent,
             ],

  providers: [provideIcons({ 
     
         bootstrapChevronRight,
         bootstrapTwitter, 
         bootstrapFacebook, 
         bootstrapInstagram,
         bootstrapLinkedin, }), ToastrService],
  
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent {

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

       /*alert("Estoy en listStaffs-component - line 85 - this.DataStaff.Staff.name="+ this.DataStaff.Staffs[0].name);
       alert("Estoy en listStaffs-component - line 86 - this.DataStaff.Staff.image="+ this.DataStaff.Staffs[0].image);

       alert("Estoy en listStaffs-component - line 87 - this.filteredItems.name="+ this.filteredItems[0].name);
       alert("Estoy en listStaffs-component - line 88 - this.filteredItems.image="+ this.filteredItems[0].image);*/

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
back() {this.router.navigate(['home'],)}


}






