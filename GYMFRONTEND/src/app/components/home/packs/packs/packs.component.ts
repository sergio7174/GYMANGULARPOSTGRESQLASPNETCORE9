import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
/**** Pack services block ******/
import { PackService } from '../../../../core/services/pack/pack.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';
import { bootstrapChevronRight,
         bootstrapCheckCircle, 
         bootstrapArrowRight, 
       
 } from '@ng-icons/bootstrap-icons';
 import { FooterComponent } from '../../../layout/footer/footer/footer.component';
 import { MarqueeComponent } from './../marquee/marquee.component';
 import { WorkprocessComponent } from './../workprocess/workprocess.component';


@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [ FormsModule,
             CommonModule,
             NgxPaginationModule,
             NgIcon, 
             MarqueeComponent,
             WorkprocessComponent,
             FooterComponent,
    ],

providers: [provideIcons({ 

bootstrapChevronRight,
bootstrapCheckCircle, 
bootstrapArrowRight, 

 }), ToastrService],
  templateUrl: './packs.component.html',
  styleUrl: './packs.component.css'
})
export class PacksComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
private readonly cartService= inject(CartService);
  
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
                   
                     
   } // End of ngOnInit

  /****************************************** */
  
  /*** function to get from backend the Pack list ************************/
  getDataPack() {
                  
    //alert("Estoy en listPacks-component - line 74 - getDataPack");
    
    this.packService.getpackList().pipe(
      takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {

          //objectb from backend answer to request
        this.DataPack = response;
        this.filteredItems = this.DataPack; 
        this.items = this.DataPack; 

       /*alert("Estoy en listPacks-component - line 85 - this.DataPack.Pack.name="+ this.DataPack.Packs[0].name);
       alert("Estoy en listPacks-component - line 86 - this.DataPack.Pack.image="+ this.DataPack.Packs[0].image);

       alert("Estoy en listPacks-component - line 87 - this.filteredItems.name="+ this.filteredItems[0].name);
       alert("Estoy en listPacks-component - line 88 - this.filteredItems.image="+ this.filteredItems[0].image);*/

        /*** alert("Estoy en listPacks-component - line 45 - this.DataPack.Packs.name="+ this.DataPack.Packs);*/

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
back() {this.router.navigate(['home'],)}

PurchaseNow(Packid:any){

  /***alert("Estoy en packs component - line 129 - to see pack details Comp ..");
  alert("Estoy en classes component - line 125 - to class details Comp .. pack.nameclass: "+pack.nameclass);*/

  // add pack to card 
  /*this.cartService.addItem({
    id: pack._id,
    name: pack.nameplan,
    price: pack.cost,
    timedays: pack.timedays,
    code: pack.code,
    quantity: 1,
  });*/

  this.router.navigate(['/sales',Packid]);

}


}







