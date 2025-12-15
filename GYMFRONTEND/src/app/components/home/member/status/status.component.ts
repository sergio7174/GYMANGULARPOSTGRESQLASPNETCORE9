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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule,
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
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {

/********** trying to save image new procedure */
selectedFile: File | null = null;
// var to handle preview image
imagePreviewUrl: string = "";

// getting data from localstore

UserName = sessionStorage.getItem('name');
email = sessionStorage.getItem('email');

// vars to handle daysleft
currentDate: Date = new Date();
today:any = (this.currentDate).getTime();
daysLeft:any=[];
minisecondsLeft:any=[];
Finish_day:any=[];
daysLeft_mathFloor:any=[];
memberStatus: boolean[] = [];

 

// Data that I want to get from URL sended by login component
ItemClassId: string | null = null;

// vars to handle the data from backend
MemberByEmail:any = [];
DataMember:any = [];
Newmember: any = [];
mensajeBackend:any="";

// var to handle backend url
baseUrl = environment.endpointI;

private readonly packService = inject(PackService);
private readonly memberService = inject(MemberService);
private readonly router = inject(Router);
private readonly routerParam = inject(ActivatedRoute);
private readonly toast = inject (ToastrService);
//private datePipe= inject(DatePipe);
// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);



ngOnInit(): void {   this.getPackData(this.email); }

// function to get class data from backend
getPackData(email:any): void {

  //alert("Estoy en class details component - line 45 - getClassData - id: "+ id);

  // get the data, to fill the form 
  this.memberService.getmemberByEmail(email).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {

     //alert("Estoy en status component - line 104 - data.member.namemember: "+data[0]);

     /*alert("Estoy en classdetails component - line 61 - data.classname: "+data.clase.classname);  alert("Estoy en classdetails component - line 60 - data.clase.image: "+data.clase.image); */      

           //objectb from backend answer to request
        this.DataMember = data;
        this.MemberByEmail = this.DataMember;
        //alert("Estoy en classdetails component - line 113 - data.clase.image: "+ this.MemberByEmail.code); 
        
  // calc daysleft section 

  this.Finish_day= new Date(this.DataMember.finishAt).getTime();
  this.minisecondsLeft= [(this.Finish_day - this.today)];
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
  this.daysLeft = this.minisecondsLeft/millisecondsPerDay
  this.daysLeft_mathFloor = Math.floor(this.daysLeft);



  // finish calc daysleft section 
 
  }); } // End of GetProduct Data

// function to go back to home
back() {this.router.navigate(['home'],)}


}




