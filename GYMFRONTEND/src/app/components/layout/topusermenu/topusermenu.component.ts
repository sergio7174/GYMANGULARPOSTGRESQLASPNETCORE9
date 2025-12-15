import { Component, inject, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTwitter, 
         bootstrapFacebook, 
         bootstrapInstagram,
         bootstrapLinkedin,
         bootstrapEnvelope,
         bootstrapPhoneVibrateFill,
   } from '@ng-icons/bootstrap-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-topusermenu',
  standalone: true,
  imports: [  CommonModule,
              RouterLink, 
           ],
providers: [provideIcons({ bootstrapTwitter, 
           bootstrapFacebook, 
           bootstrapInstagram,
           bootstrapLinkedin,
           bootstrapEnvelope,
           bootstrapPhoneVibrateFill }),ToastrService],
  templateUrl: './topusermenu.component.html',
  styleUrl: './topusermenu.component.css'
})
export class TopusermenuComponent {


  imageurl='../assets/logo/logo2.jpg';
  private readonly router = inject(Router);

  
}