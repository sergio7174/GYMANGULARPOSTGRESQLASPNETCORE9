import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTwitter, 
         bootstrapFacebook, 
         bootstrapInstagram,
         bootstrapLinkedin,
         bootstrapEnvelope,
         bootstrapPhoneVibrateFill,
   } from '@ng-icons/bootstrap-icons';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ CommonModule,
             NgIcon,
          ],
providers: [provideIcons({ bootstrapTwitter, 
                   bootstrapFacebook, 
                   bootstrapInstagram,
                   bootstrapLinkedin,
                   bootstrapEnvelope,
                   bootstrapPhoneVibrateFill }),ToastrService],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit{


  // Backend URL
  baseUrl = environment.endpoint;

 // I need the router lib to navigate to login in logout function
private readonly router = inject(Router);
private readonly authService = inject(AuthService);
private readonly cartService = inject(CartService);

total = computed(() => this.cartService.cart().total);
count = computed(() => this.cartService.cart().count);
 UserName: any = '';
 IsAdmin: any = '';
 image: any = '';
 photo: any = '';
 

 

ngOnInit(){

  if (typeof window !== 'undefined') {
    // Access sessionStorage here
    this.UserName = sessionStorage.getItem('name');
    this.IsAdmin = sessionStorage.getItem('isAdmin');
    this.image = sessionStorage.getItem('image');

    this.photo = this.baseUrl+this.image

    //alert("This image: "+this.image)
  }}


login(){ this.router.navigate(['login']);}
  

  logout(){
  
  alert("Estoy en topheader.component - line 58 - logout Func()")
  sessionStorage.clear();  
  this.authService.logout();
  this.router.navigateByUrl('/homeAdmin', {skipLocationChange: true})// first I go to /admin
      .then(() => this.router.navigate(['/home'])); // then I go to /furnitureList page
  
  //window.location.reload();
  }

 
}

