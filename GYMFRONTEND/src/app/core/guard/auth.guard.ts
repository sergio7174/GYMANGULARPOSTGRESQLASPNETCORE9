import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  let IsAdmin:any ='';

  // Implementar la lógica de autenticación aquí
  const authService = inject (AuthService);
  const router = inject (Router);

 

    /*afterNextRender(() => {
      // Code that uses sessionStorage
      IsAdmin = sessionStorage.getItem('isAdmin');
    });*/
  
if (typeof window !== 'undefined') {
  // Access sessionStorage here
  IsAdmin = sessionStorage.getItem('isAdmin');
}
   

  if (authService.isAuthenticated() && IsAdmin=='true' ){

   // alert('Estoy en authGuard -line 17 - IsAdmin: '+ IsAdmin);
    return true
       
  } else {

    //alert('Estoy en authGuard -line 28 -IsAdmin: '+ IsAdmin);
    // Usuario no autenticado, redirige a la página de inicio de sesión
    router.navigate(['/home']);
    return false; // No permite la activación de la ruta
  }

};

