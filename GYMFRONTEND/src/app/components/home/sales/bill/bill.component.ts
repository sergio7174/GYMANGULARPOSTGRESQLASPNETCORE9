import { Component, inject, DestroyRef , computed, OnInit} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPersonCircle } from '@ng-icons/bootstrap-icons';
import { bootstrapHouseAddFill } from '@ng-icons/bootstrap-icons';
import { bootstrapTelephoneForwardFill } from '@ng-icons/bootstrap-icons';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '../../../../core/services/cart/cart.service';
import { MemberService } from '../../../../core/services/member/member.service';
import { BillItemCardComponent } from '../bill-item-card/bill-item-card.component';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [  ReactiveFormsModule,
              CardModule,
              InputTextModule,
              ButtonModule,
              NgIcon,
              BillItemCardComponent,
    ],
providers: [provideIcons({ bootstrapPersonCircle, bootstrapHouseAddFill, bootstrapTelephoneForwardFill }),ToastrService],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {

// getting data from localstore

UserName = sessionStorage.getItem('name');
email = sessionStorage.getItem('email');

// var to handle messages from backend about the supplier process
mensajeBackend:any=[];
datamember:any=[];
newmember:any=[];

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

// inject services dependecies 
private readonly memberservice = inject(MemberService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);
private readonly cartService= inject(CartService);

  /** Getting all this vars from signal object cart in cartService */
  count = computed(() => this.cartService.cart().count);
  total = computed(() => this.cartService.cart().total);
  items = computed(() => this.cartService.cart().items);

 /*** form to get some data from new member */

  membersForm = new FormGroup(
    {
    client_CI:  new FormControl('', [Validators.required, Validators.min(5)]),
    phone:  new FormControl('', [Validators.required, Validators.min(5)]),
      
    },
  );

/*** function to handle cart */
onItemQuantityUpdate(quantity: number, id: string) {
  let increase = true;
  const item = this.items().find((t) => t.id === id);
  if (quantity < item!.quantity) increase = false;
  if (increase) {
    this.cartService.increaseItem(item!);
  } else {
    this.cartService.decreaseItem(item!);
  }
}

// function to remove item from cart
onRemoveItem(id: string) {
  const item = this.items().find((t) => t.id === id);
  this.cartService.removeItem(item!);
}

// function to create a new member sending the data to server

onCreateBill(count:any, items:any) {

   /**** for testing purposes ************/
  try{
    if(this.membersForm.valid){
      alert('Profile form is valid');
    } else {
      this.toast.error('Error','Please complete all required fields.');
      return;
    }
  } catch(error){console.log('error: '+error)};

    // getting the numbers of items to getData
    const itemsT = this.items().length;

  /************************ End of cart part *******************/
  
  const postData: any = { ...this.membersForm.value };
   
 
  const client_CI = this.membersForm?.value.client_CI; // Client CI
  const phone = this.membersForm?.value.phone; // Client phone
 
  
  alert ("Im in bill.component - line 148 - client_CI: "+ client_CI);
  alert ("Im in bill.component - line 149 - phone: "+ phone);
 
  const namemember: any = this.UserName;
  const email: any = this.email;   
  const cost: any = this.total();
  
  let nameplan:any = [];
  let timedays:any = [];
  let code:any = [];

  nameplan = items()[0].nameplan;
  timedays = items()[0].timedays;
  code = items()[0].code;

  const member ={ namemember, email, client_CI, phone, cost, nameplan, timedays, code    }

  



}




}
