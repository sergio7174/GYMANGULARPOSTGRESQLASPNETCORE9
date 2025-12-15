import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth/auth';
import { LoginPostData } from '../../interfaces/auth/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserName:string | null ='';
  IsAdmin:any ='';
  
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;
  private readonly authTokenKey = 'token'; // Usar el mismo nombre de clave en localStorage

   private readonly toast =  inject(ToastrService);

  private readonly loggedInUserKey = 'loggedInUser';
  constructor(private readonly http: HttpClient,
      @Inject (PLATFORM_ID) private readonly platformId: Object,
    private readonly router: Router,
    ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/users';
    this.checkAuthentication();
  }

    login(credentials: LoginPostData) {
      //alert ("Estoy en registerUser - authService - line 40");
      //alert ("Estoy en registerUser - authService - line 41 - {this.myAppUrl}${this.myApiUrl}:  "+`${this.myAppUrl}${this.myApiUrl}`);
      return this.http.post(`${this.myAppUrl}${this.myApiUrl}/login`, credentials)
   }


  setToken(token: string): void {
    console.log('Saving token to local storage, token');
    localStorage.setItem(this.authTokenKey, token);
  }

  setLoggedInUser(user: User): void {
    //console.log('Saving authenticated user to local storage:', user);
    localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.authTokenKey);
      //console.log('Getting token from local storage:', token);
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {

    const authToken = this.getToken();
    
    //alert('Estoy en authServices isAuthenticated() -line 93 - Verifying authentication...authToken: '+ authToken);

    console.log('It is authenticated?', !!authToken);
    return !!authToken;
  
  }

  
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.authTokenKey); // Remove token from localStorage
      localStorage.removeItem(this.loggedInUserKey); // Remove user data from localStorage
    }
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getLoggedInUserData(): Observable<User> {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem(this.loggedInUserKey);
      if (userData) {
        const user: User = JSON.parse(userData);
        console.log('Authenticated user data:', user);
        return of(user);
      } else {


        console.error('No user data found in local storage');
       
        return throwError(() => 'No user data found in local storage');
      }
    } else {

    
      console.error('The localStorage object is not defined in this environment.');
      //return throwError();
      return throwError(() => 'The localStorage object is not defined in this environment.');
    }
  }
  getUserId(): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem(this.loggedInUserKey);
      if (userData) {
        const user: User = JSON.parse(userData);
        return of(user._id);
      } else {
      
        console.error('No se encontraron datos del usuario en el almacenamiento local.');
        //return throwError();
        return throwError(() => 'No se encontraron datos del usuario en el almacenamiento local.');
        
      }
    } else {

    
      console.error('The localStorage object is not defined in this environment.');
     
      return throwError(() => 'The localStorage object is not defined in this environment.');
    }
  }

  registerUser(postData: User) {
    /*alert ("Estoy en registerUser - authService - line 152");
    alert ("Estoy en registerUser - authService - line 153 - {this.myAppUrl}${this.myApiUrl}:  "+`${this.myAppUrl}${this.myApiUrl}`);*/

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/register`, postData);
 }

 getOneAdmin(){
  
  //alert ("Estoy en getoneAdmin - authService - line 138 - ${this.myAppUrl}${this.myApiUrl}/getoneadmin: " + `${this.myAppUrl}${this.myApiUrl}/getoneadmin`);
  return this.http.get(`${this.myAppUrl}${this.myApiUrl}/getoneadmin`)
 }

 checkAuthentication(): void {
  if (!this.isAuthenticated() && isPlatformBrowser(this.platformId)) {
   // console.log('It is not authenticated. Redirecting to login.');
    
   //this.toast.error('Usuario No autenticado', '¡Please Log In!');

    //alert('Estoy en authServices checkAuthentication -line 151 - Not authenticatited');

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 0);
  } else {
    //console.log('It is authenticated.');
    //alert('Estoy en authServices checkAuthentication -line 160 - authenticatited: ');
    //this.toast.success('User authenticated successfully ', '¡Welcome Again!');
  }
}


 checkAuthenticationAdmin(): any {
  
  
    if (!this.isAuthenticated()) {
      
     this.toast.error('Usuario No autenticado', '¡Please Log In!');
  
      //alert('Estoy en authServices checkAuthentication -line 173 - Not authenticatited');

      setTimeout(() => { this.router.navigate(['/login']);}, 0);
    } else {

      //alert('Estoy en authServices checkAuthenticationAdmin -line 179 - authenticatited: '+this.isAuthenticated());

      
      //console.log('It is authenticated.');
      /*** get this data from local store if user is authenticated */

    this.UserName = sessionStorage.getItem('name');
    this.IsAdmin = sessionStorage.getItem('isAdmin');

    //alert('Estoy en authServices checkAuthenticationAdmin -line 186 - this.IsAdmin: '+ this.IsAdmin);

    if (this.IsAdmin=='false'){

    //show ('User not Admin.');

    this.toast.error('User not Admin.');
    this.router.navigate(['/home']);

  } else { // It is Admin
    //show ('Wellcome User Admin.');
    
    //alert('Estoy en authServices checkAuthenticationAdmin -line 197 - this.IsAdmin: '+ this.IsAdmin);

    this.toast.success('Wellcome User Admin.');
    this.router.navigate(['/homeAdmin']);
 
  }  // End of block Else It is Admin
} // End of the block else it is authenticated

}



  
  }// End Of checkAuthenticationAdmin
 



