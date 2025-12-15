import { Component, inject , DestroyRef, PLATFORM_ID, Inject, OnInit } from '@angular/core';
// to handle the subscribe method to the service, I have to use it to unsubscribe to the subscribe service call
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgIcon, provideIcons} from '@ng-icons/core';
import { LoginPostData } from '../../../core/interfaces/auth/auth';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { bootstrapMailbox2Flag,
         bootstrapKeyFill,
 } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,
             ReactiveFormsModule,
             NgIcon,
             RouterLink,
             PasswordModule,
],
providers: [provideIcons({ bootstrapMailbox2Flag, bootstrapKeyFill })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

// var to handle subscription and unsubscription to service  
private readonly destroyRef = inject(DestroyRef);
private readonly authTokenKey = 'token'; // Usar el mismo nombre de clave en localStorage
private readonly loggedInUserKey = 'loggedInUser';

haveAdmin: any = '';


form: FormGroup;
hidePassword: boolean = true;

/*** vars to handle login req user data */

mensajeBackend:any='';
dataUser:any=[];
token: any = '';
userisAdmin:string | null ='';
userNameLogin:string='';
user:string | undefined ='';
image:string  ='';



private readonly authService= inject(AuthService);
private readonly router = inject(Router);
private readonly fb =  inject (FormBuilder);
private readonly toast = inject (ToastrService);

constructor( @Inject (PLATFORM_ID) private readonly platformId: Object,
   ) {

  this.form = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
    ]],
    password: ['', [Validators.required]],
  });
}

ngOnInit(): void { }

login() {
if (this.form.invalid) {
  this.toast.error('Error','Por favor, completa todos los campos requeridos.');
  return;
}

//alert ("EStoy en login() - login component - line 77");
this.authService.login(this.form.value).pipe(
  takeUntilDestroyed(this.destroyRef)).subscribe({
    next: ( response:any ) => {
    // Manejo de respuesta exitosa
  
      this.dataUser = response;
      this.token = this.dataUser.token

      alert("Estoy en login.component login() - line 88: this.dataUser.user.isAdmin: "+this.dataUser.user.isAdmin);
      /*alert ("EStoy en login() - login component - line 189: - this.dataUser.token :" + this.dataUser.token);
       alert ("EStoy en login() - login component - line 123: - this.dataUser.username :" + this.dataUser.user.fullName);
       alert ("EStoy en login() - login component - line 124: - this.dataUser.user.image :" + this.dataUser.user.image);*/

      if (this.dataUser.token){
      this.token = this.dataUser.token;
      //alert("Estoy en login.component login() - line 84: this.token: "+this.token);
      }
      
      if (this.dataUser.user){
      this.user = this.dataUser.user;
      alert("Estoy en login.component login() - line 100: this.user: "+this.user);
      } else {

        //alert("Estoy en login.component login() - line 93: this.user: No user")
        this.toast.error("User Not Found ..");
        
      }

      if (this.dataUser.user.isAdmin == 'true'){
      this.userisAdmin = this.dataUser.user.isAdmin;
      alert("Estoy en login.component login() - line 110: this.dataUser.user.isAdmin: "+this.dataUser.user.isAdmin);
      }

      if (this.dataUser.user.isAdmin == 'false'){
      this.userisAdmin = this.dataUser.user.isAdmin;
      alert("Estoy en login.component login() - line 115: this.useruserisAdmin: "+this.dataUser.user.isAdmin);
      }
     
      if(this.dataUser.user.fullName){ 
      this.userNameLogin = this.dataUser.user.fullName;
      //alert("Estoy en login.component login() - line 98: this.userNameLogin: "+this.userNameLogin);
      }

       if(this.dataUser.user.image){ 
      this.image = this.dataUser.user.image;
      //alert("Estoy en login.component login() - line 98: this.userNameLogin: "+this.userNameLogin);
      }

      if (this.user && this.token) {
        
        alert ("EStoy en login() - login component - line 131: - response.token:" + this.token);
        this.setToken(this.token);
        this.setLoggedInUser(this.dataUser.user);
        //return response; // Puedes devolver cualquier otra cosa que necesites
      }
          if (this.userisAdmin=='true') {
            //alert("Estoy en login-component - line 139 - this.userisAdmin='true ..: "+ this.userisAdmin);
        
              // save the information that you need to get it in mean menu component
              sessionStorage.setItem('name', this.userNameLogin);
              sessionStorage.setItem('isAdmin', this.userisAdmin);
              sessionStorage.setItem('image', this.image);
        
              alert("EStoy en login.component - line 161 - antes de router.navigate to homeAdmin: ");
              
            
              this.toast.success(this.mensajeBackend);
              //window.location.replace('/homeAdmin');
              this.router.navigateByUrl('homeAdmin');
              
              
              return;
        
            } 
            
          /*** if user its an admin End of block  *****/

          /*** if user its not an admin block  ***********************/
          if (this.userisAdmin=='false') {
            
            alert("EStoy en login.component - line 163 - this.userisAdmin - false: "+this.userisAdmin);
          
            sessionStorage.setItem('name', this.userNameLogin);
            sessionStorage.setItem('email',  this.dataUser.user.email);
            sessionStorage.setItem('isAdmin', this.userisAdmin);
            sessionStorage.setItem('image', this.image);
            
            //window.location.reload();
            this.toast.success(this.mensajeBackend);
            //window.location.replace('/home');
            this.router.navigateByUrl('/home');
          }
    }});
}

setToken(token: string): void {
console.log('Guardando token en el almacenamiento local:', token);
localStorage.setItem(this.authTokenKey, token);
}

setLoggedInUser(user: any): void {
alert('Guardando usuario autenticado en el almacenamiento local:'+ user);
localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
}
}


