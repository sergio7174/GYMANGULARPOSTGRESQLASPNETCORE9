import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './core/services/auth/auth.service';
import { TopbarComponent } from './components/layout/topbar/topbar.component';
import { TopusermenuComponent } from './components/layout/topusermenu/topusermenu.component';
import { TopadminmenuComponent } from "./components/layout/topadminmenu/topadminmenu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
              RouterOutlet,
              TopbarComponent,
              TopusermenuComponent, 
              TopadminmenuComponent],
providers: [provideAnimations(), ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 
 
  UserName:string | null ='';
  IsAdmin: string | null  = 'false';
  isAuthenticated: any = false;

private readonly authService = inject(AuthService);
private readonly router =  inject(Router);

   ngOnInit(){

    if (typeof window !== 'undefined') {
      // Access sessionStorage here
      this.UserName = sessionStorage.getItem('name');
      this.isAuthenticated = this.authService.isAuthenticated();
      this.IsAdmin = sessionStorage.getItem('isAdmin');
    }
    

   }


}

 



