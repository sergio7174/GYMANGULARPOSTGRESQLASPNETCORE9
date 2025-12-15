import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapColumnsGap,
         bootstrapCalculator,
         bootstrapClipboardPlusFill,
         bootstrapDatabaseFillCheck,
         bootstrapArrowDownLeftSquare,
         bootstrapPersonFillGear        
 } from '@ng-icons/bootstrap-icons';

import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topadminmenu',
  standalone: true,
  imports: [RouterLink,
            NgIcon],
providers: [provideIcons({ 
                            bootstrapColumnsGap,
                            bootstrapCalculator,
                            bootstrapClipboardPlusFill,
                            bootstrapArrowDownLeftSquare,
                            bootstrapDatabaseFillCheck,
                            bootstrapPersonFillGear}),
  ],
  templateUrl: './topadminmenu.component.html',
  styleUrl: './topadminmenu.component.css'
})
export class TopadminmenuComponent implements OnInit{

  UserName:string | null ='';
  IsAdmin:string  | null='';
  isAuthenticated: boolean | void = false;


  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toast =  inject(ToastrService);

  
      ngOnInit(){

        if (typeof window !== 'undefined') {
          // Access sessionStorage here
          this.UserName = sessionStorage.getItem('name');
          this.IsAdmin = sessionStorage.getItem('isAdmin');
        }}

}



