import { Component, inject,  DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { PackService } from '../../../../core/services/pack/pack.service';
import { MemberService } from '../../../../core/services/member/member.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPersonCircle, 
         bootstrapHouseAddFill, 
         bootstrapTelephoneForwardFill  } from '@ng-icons/bootstrap-icons';


import { environment } from '../../../../environments/environments';
import { bootstrapChevronRight} from '@ng-icons/bootstrap-icons';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [    CommonModule,
                NgIcon, 
                ReactiveFormsModule,
                CardModule,
                InputTextModule,
                ButtonModule,
                NgIcon,
                
      ],
  providers: [provideIcons({ bootstrapPersonCircle, 
                             bootstrapHouseAddFill, 
                             bootstrapTelephoneForwardFill, 
                             bootstrapChevronRight }),
                             ToastrService],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

/********** trying to save image new procedure */
selectedFile: File | null = null;
// var to handle preview image
imagePreviewUrl: string = "";

// getting data from localstore

UserName = sessionStorage.getItem('name');
email = sessionStorage.getItem('email');
image = sessionStorage.getItem('image');

 /*** form to get some data from new member */

 membersForm = new FormGroup(
  {
  client_CI:  new FormControl('', [Validators.required, Validators.min(5)]),
  phone:  new FormControl('', [Validators.required, Validators.min(5)]),
  
    
  },
);

// Data that I want to get from URL sended by login component
ItemClassId: string | null = null;

// vars to handle the data from backend
DataMember:any = [];
Newmember: any = [];
DataPack:any = [];
mensajeBackend:any="";
messageBackend:any="";

// var to handle backend url
baseUrl = environment.endpoint;

private readonly packService = inject(PackService);
private readonly memberService = inject(MemberService);
private readonly router = inject(Router);
private readonly routerParam = inject(ActivatedRoute);
private readonly toast = inject (ToastrService);
// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);


ngOnInit(): void {
  
  this.routerParam.paramMap.subscribe(params =>{this.ItemClassId = params.get('id')})

  const id= this.ItemClassId;
  
 // alert ("Estoy en ngOnInit - classdetails.component - line 45 - id: "+id);


  this.getPackData(id);
}

// function to get class data from backend
getPackData(id:any): void {

  //alert("Estoy en class details component - line 45 - getClassData - id: "+ id);

  // get the data, to fill the form 
  this.packService.getpackById(id).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {

     /*alert("Estoy en classdetails component - line 60 - data.classname: "+data.clase.classname); 
     alert("Estoy en classdetails component - line 61 - data.classname: "+data.clase.classname);  alert("Estoy en classdetails component - line 60 - data.clase.image: "+data.clase.image); */      

           //objectb from backend answer to request
        this.DataPack = data;
    
 
  }); } // End of GetProduct Data

// function to go back to homeAdmin
back() {this.router.navigate(['packs'],)}

onCreateBill() {

  /**** for testing purposes ************/
  try{
    if(this.membersForm.valid){
      alert('Profile form is valid');
    } else {
      this.toast.error('Error','Please complete all required fields.');
      return;
    }
  } catch(error){console.log('error: '+error)};
 
  const client_CI:any = this.membersForm?.value.client_CI; // Client CI
  const phone: any = this.membersForm?.value.phone; // Client phone
 
  const namemember: any = this.UserName;
  const email: any = this.email;
  const nameplan: any = this.DataPack.nameplan;
  const timedays:any = this.DataPack.timedays;
  const code:any = this.DataPack.code;
  const cost: any = this.DataPack.cost;
  const image:any = this.image;

  const postData: any = { client_CI, phone, namemember, email,
                          nameplan, timedays,code,cost, image };


  this.memberService.createmember(postData).pipe(
 
   takeUntilDestroyed(this.destroyRef)).subscribe({
     next: (response) => {
                                
          
              this.DataMember = response;       
              // var to get if new member was created
              this.Newmember = this.DataMember.member;
              // var to handle if there is an mistake in backend 
              this.messageBackend = this.DataMember.message;
              
//alert("Estoy en bill.component - line 166 - this.messageBackend:  " + this.messageBackend);
                          
//alert("Estoy en bill.component - line 168 - this.newsale:  " +this.Newmember.namemember);

   
if (this.messageBackend != null)
  { 
    this.toast.error(this.messageBackend);
  }

if (this.Newmember ) {
this.toast.success('Create supply component - line 177 -Create Member successfully');

// reset form: reactiveFurnitureForm
this.membersForm.reset();

// go to home /Sales to update listProducts view

this.router.navigate(['/home'],{skipLocationChange: true}).then(() => this.router.navigate(['/packs'])); // then I go to sales /

                            
}

}}

)}

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



