import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {   bootstrapPinMapFill,
           bootstrapChevronRight,
           bootstrapTelephoneFill,
           bootstrapClockFill

} from '@ng-icons/bootstrap-icons';
import { FooterComponent } from '../../../layout/footer/footer/footer.component';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ 
             NgIcon, 
             FooterComponent],

providers: [provideIcons({ 

                         bootstrapChevronRight,
                         bootstrapPinMapFill,
                         bootstrapTelephoneFill,
                         bootstrapClockFill

 }),],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

}
