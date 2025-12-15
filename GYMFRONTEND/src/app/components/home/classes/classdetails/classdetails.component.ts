import { Component, inject,  DestroyRef } from '@angular/core';
/**** The takeUntilDestroyed artifact is an operator that unsubscribes
from an observable when the component is destroyed. */
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesService } from '../../../../core/services/classes/classes.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { environment } from '../../../../environments/environments';
import { bootstrapChevronRight} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-classdetails',
  standalone: true,
  imports: [ CommonModule,
             NgIcon ],
providers: [provideIcons({bootstrapChevronRight }),
              ToastrService],
  templateUrl: './classdetails.component.html',
  styleUrl: './classdetails.component.css'
})
export class ClassdetailsComponent {

// Data that I want to get from URL sended by login component
ItemClassId: string | null = null;

// vars to handle the data from backend
DataClass:any = [];

// var to handle backend url
baseUrl = environment.endpoint;

private readonly classesService = inject(ClassesService);
private readonly router = inject(Router);
private readonly routerParam = inject(ActivatedRoute);
// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  
  this.routerParam.paramMap.subscribe(params =>{this.ItemClassId = params.get('id')})

  const id= this.ItemClassId;
  
 // alert ("Estoy en ngOnInit - classdetails.component - line 45 - id: "+id);


  this.getClassData(id);
}

// function to get class data from backend
getClassData(id:any): void {

  //alert("Estoy en class details component - line 45 - getClassData - id: "+ id);

  // get the data, to fill the form 
  this.classesService.getclassById(id).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe((data:any) => {

     /*alert("Estoy en classdetails component - line 60 - data.classname: "+data.clase.classname); 
     alert("Estoy en classdetails component - line 61 - data.classname: "+data.clase.classname);  alert("Estoy en classdetails component - line 60 - data.clase.image: "+data.clase.image); */      

           //objectb from backend answer to request
        this.DataClass = data.clase;
    
 
  }); } // End of GetProduct Data

// function to go back to homeAdmin
back() {this.router.navigate(['classes'],)}

}
