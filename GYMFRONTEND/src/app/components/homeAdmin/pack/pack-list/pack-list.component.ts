import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Router } from '@angular/router';
import { Pack } from '../../../../core/interfaces/pack/pack';
/**** Pack services block ******/
import { PackService } from '../../../../core/services/pack/pack.service';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pack-list',
  standalone: true,
  imports: [ FormsModule,
             CommonModule,
             NgIcon,
             NgxPaginationModule,
],
providers: [provideIcons({ bootstrapTrash3, 
                           bootstrapPersonLinesFill }), 
                           ToastrService],
  templateUrl: './pack-list.component.html',
  styleUrl: './pack-list.component.css'
})
export class PackListComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpoint;
  messagePack:any="";
  DataPack:any = [];
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

  private readonly packService = inject(PackService);
  private readonly router = inject(Router);

  ngOnInit(): void { 
                    this.getDataPack();
                    /*this.filteredItems = this.DataPack; 
                    this.items = this.DataPack.Pack; */
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Pack list ************************/
  getDataPack() {
                  
    //alert("Estoy en listpack-component - line 74 - getDataPack");
    
    this.packService.getpackList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.DataPack = response;
        this.filteredItems = this.DataPack; 
        this.items = this.DataPack; 

       //alert("Estoy en listPacks-component - line 85 - this.DataPack.packs.nameplan="+ this.DataPack[0].nameplan);
       //alert("Estoy en listPacks-component - line 86 - this.DataPack.Pack[0].image="+ this.DataPack[0].image);

        this.messagePack = this.DataPack.err

        /*** if there is any error, show it */
        if (this.messagePack){

          this.toast.error(this.messagePack);
          
      }
   /*** End block of the function to get from backend the Pack list *****/


    } // next: (response) => {
  }) // end of subscribe({
} // end of getDataPack
/************************************************************** */

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}

// function to delete Pack
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();

  //alert("EStoy en listPacks - line 109 - Data.image: "+Data.image);

  this.packService.deleteImage(Data.image).subscribe((data) => {

        // alert("Data: "+data);
  });


  this.packService.deletepack(Data.id).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['listPack'])); // then I go to /pack-List page

})}

// end of block of function to delete Pack

// function to edit Pack
editDetails(id:any){

  /***alert("Estoy en listPacks component - line 103 - to ediPack Comp ..");
  alert("Estoy en listPacks component - line 104 - to ediPack Comp .. id: "+id);*/

  this.router.navigate(['/editPack',id]);

}

// end of block of function to edit Pack

// function to handle search in Pack list *************

get filteredPack(): Pack[] {
  return this.items.filter((item:any) => 
    item.code.toLowerCase().includes(this.searchTerm.toLowerCase())
    ??
    item.nameplan.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
// End of function Block  to handle search in Pack list
}






