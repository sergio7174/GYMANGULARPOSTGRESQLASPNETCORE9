import { Component, inject, DestroyRef } from '@angular/core';
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
import { bootstrapMailbox2Flag, 
         bootstrapCalendar2DayFill, 
         bootstrapKeyFill,
         bootstrapBack,
         bootstrapFileEarmarkSpreadsheet,
         bootstrapFiletypeKey,
         bootstrapCoin,
         bootstrapReceipt,
         bootstrapChevronRight,
         bootstrapCheckCircle

         } from '@ng-icons/bootstrap-icons';

import { PackService } from '../../../../core/services/pack/pack.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pack-create',
  standalone: true,
  imports: [ ReactiveFormsModule,
             CardModule,
             InputTextModule,
             ButtonModule,
             NgIcon],
providers: [provideIcons({ bootstrapMailbox2Flag, 
                           bootstrapKeyFill, 
                           bootstrapBack,
                           bootstrapCalendar2DayFill,
                           bootstrapFileEarmarkSpreadsheet,
                           bootstrapFiletypeKey,
                           bootstrapCoin,
                           bootstrapReceipt,
                           bootstrapChevronRight,
                           bootstrapCheckCircle }),
                           
                           ToastrService],
  templateUrl: './pack-create.component.html',
  styleUrl: './pack-create.component.css'
})
export class PackCreateComponent {

// Declare the following property to inject the DestroyRef service:
private readonly destroyRef = inject(DestroyRef);

/********** trying to save image new procedure */
selectedFile: File | null = null;
/***************end block new procedure ****** */


// var to handle messages from backend about the pack process
mensajeBackend:any=[];
datapack:any=[];
newpack:any=[];
AddModel: any = {image:[]};

// var to handle preview image

imagePreviewUrl: string = "";


// inject services dependecies 
private readonly packService = inject(PackService);
private readonly router = inject(Router);
private readonly toast = inject (ToastrService);


packForm = new FormGroup(
  {
    nameplan:  new FormControl('', [Validators.required, Validators.min(5)]),
    trialdays:  new FormControl('', [Validators.required ]),
    features:  new FormControl('', [Validators.required ]),
    timedays:  new FormControl('', [Validators.required ]),
    cost:  new FormControl('', [Validators.required ]),
    code:  new FormControl('', [Validators.required ]),
    status:  new FormControl('', [Validators.required ]),
    description:  new FormControl('', [Validators.required]),
    image: new FormControl(this.selectedFile, [Validators.required,])
    
  },
);

onpack() {

  /**** for testing purposes ************/
  try{
    if(this.packForm.valid){
      alert('Profile form is valid');
    } else {
      alert('Profile form invalid');
    }
  } catch(error){}

 /**** End block for testing purposes */ 
 /**** Check if the form is invalid ****/

 if (this.packForm.invalid) {
  this.toast.error('Error','Please complete all required fields.');
  return;
}

  const postData = { ...this.packForm.value };
  
  this.packService.createpack(postData , (this.selectedFile)).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe({
    next: (response) => {
        
        this.datapack = response;
        this.mensajeBackend = this.datapack.message;
        this.newpack = this.datapack.pack;

       
        //alert("Estoy en pack.component - line 124 - this.newpack:  " + this.mensajeBackend);
       
        //alert("Estoy en pack.component - line 125 - this.datapack.package.code:  "+this.newpack.code);
        

      if (!this.newpack) { this.toast.error(this.mensajeBackend) };

      if (this.newpack) {
                           this.toast.success('create pack successfully');
      // reset form: packForm
      this.packForm.reset();

      // go to /createpack page
      
      this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /home
      .then(() => this.router.navigate(['/createPack'])); // then I go to /createpack page

      console.log(response);
    }},
    error: (err) => {
      console.log(err);
  
      this.toast.error('Something went wrong');
    },
  });
}

get nameplan() { return this.packForm.controls['nameplan'];}
get trialdays() { return this.packForm.controls['trialdays'];}
get features() { return this.packForm.controls['features'];}
get timedays() { return this.packForm.controls['timedays'];}
get cost() { return this.packForm.controls['cost'];}
get code() { return this.packForm.controls['code'];}
get status() { return this.packForm.controls['status'];}
get description() { return this.packForm.controls['description'];}
get image() { return this.packForm.controls['image'];}

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







