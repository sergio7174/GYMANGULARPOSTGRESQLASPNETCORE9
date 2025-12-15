import { Component } from '@angular/core';
import { HomeAdminFronttpComponent } from '../home-admin-fronttp/home-admin-fronttp.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [ HomeAdminFronttpComponent ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

}
