import { Component, inject, DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Members } from '../../../../core/interfaces/members/members';
/**** Member services block ******/
import { MemberService } from '../../../../core/services/member/member.service';
import { environment } from '../../../../environments/environments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTrash3, bootstrapPersonLinesFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgxPaginationModule } from 'ngx-pagination'; // Import the module
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [ FormsModule,
             CommonModule,
             NgIcon,
             NgxPaginationModule,],
  providers: [provideIcons({ bootstrapTrash3, 
              bootstrapPersonLinesFill }), 
              ToastrService],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);
private readonly toast =  inject(ToastrService);
  
  baseUrl = environment.endpoint;
  messagemember:any="";

  Datamembers:any = [];
  DataUpdatedmembers:any = [];
  messageUpdatedmember:any="";

  Data:any = [];
 
  /*** vars to handle search ******************/

  items: any = [];
  filteredItems: any = [];
  searchTerm: string = '';

   /*** End Block to vars to handle search ****/
    /****** vars to handle daysleft calc */
   currentDate: Date = new Date();
   today:any = (this.currentDate).getTime();

   daysLeft:any[]=[];
   minisecondsLeft:any[]=[];
   Finish_day:any=[];
   daysLeft_mathFloor:any=[];
   memberStatus: boolean[] = [];
/**** vars to handle pagination  NgxPagination  ********/

page: number = 1; // Current page

/***** End of vars to handle pagination  */

  private readonly memberService = inject(MemberService);
  private readonly router = inject(Router);

  ngOnInit(): void { 
                    this.getDatamembers();
                    /*this.filteredItems = this.Dataclass; 
                    this.items = this.Dataclass.class; */
                    //alert("today: "+this.today)
   } // End of ngOnInit

/*** function to get from backend the members list ************************/
getDatamembers() {
                  
  //alert("Estoy en listmembers-component - line 70 - getDatamembers");
  
  this.memberService.getmemberList().pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {

        //objectb from backend answer to request
      this.Datamembers = response;
      this.filteredItems = this.Datamembers; 
      this.items = this.Datamembers; 
      this.messagemember = this.Datamembers.message;

     /*alert("Estoy en listmembers-component - line 84 - this.Datamembers.Members.namemember="+ this.Datamembers.Members[0].namemember);
     alert("Estoy en listmembers-component - line 85 - this.Datamembers.Members[0].email="+ this.Datamembers.Members[0].email);*/
     alert("Estoy en listmembers-component - line 86 - this.Datamembers.length="+ this.Datamembers.length);
   
     // For loop to get all members in database
     for (let index = 0; index < this.Datamembers.length; index++) {
      
      alert("this.Datamembers.Members.length: "+this.Datamembers.length);

      /*alert ("Estoy en el loop for- line 92 - this.Datamembers.Members[index].finishAt)  "+ this.Datamembers.Members[index].finishAt);
      alert ("Estoy en el loop for- line 93 - today:  "+ this.today);*/
    
      this.Finish_day[index]= new Date(this.Datamembers[index].finishAt).getTime();

      this.minisecondsLeft[index]= [(this.Finish_day[index] - this.today)];
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      this.daysLeft[index] = this.minisecondsLeft[index]/millisecondsPerDay
      this.daysLeft_mathFloor[index] = Math.floor(this.daysLeft[index]);

      

      // get the status of the members

      this.memberStatus[index] = this.Datamembers[index].status


      /*alert ("Line-100 - Finish_day: "+ this.Finish_day[index]);
      alert (" Line 101 - this.Finish_day_mathFloor[index]: "+ this.Finish_day_mathFloor[index]);*/
      
      if (this.daysLeft_mathFloor[index] <=0){
          
        this.memberService.editmemberStatus(this.Datamembers[index].id).pipe(
          takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (response) => {

          this.DataUpdatedmembers = response;
          this.messageUpdatedmember = this.DataUpdatedmembers.message;
          
        
        }
        })
         
        alert("this.daysLeft_mathFloor[index]: "+this.daysLeft_mathFloor[index]);
        return this.daysLeft_mathFloor[index];
      }

     // return this.daysLeft_mathFloor[index];
     }



      /*** if there is any error, show it */
      if (!this.items){
      if (this.messagemember){

        this.toast.error(this.messagemember);
        
    }}
 /*** End block of the function to get from backend the class list *****/


  } // next: (response) => {
}) // end of subscribe({
} // end of getDatamembers
/************************************************************** */

// function to handle search in class list *************

get filteredmembers(): Members[] {
  return this.items.filter((item:any) => 
    item.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    ??
    item.namemember.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}
// End of function Block  to handle search in class list

// function to go back to homeAdmin
back() {this.router.navigate(['homeAdmin'],)}


// function to delete Pack
deleteDetails (Data:any,index:any,event:any) {
  event.preventDefault();

  //alert("EStoy en listMembers - line 177 - Data.imageUser: "+Data.imageUser);

  this.memberService.deleteImage(Data.image).subscribe((data) => {

        // alert("Data: "+data);
  });
  this.memberService.deletemember(Data._id).subscribe((data) => {
    this.Data.splice(index, 1);

    // to reload page - I go to another page and later to the one that I want To go
    this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['listMembers'])); // then I go to /furnitureList page
  }

)}
  }