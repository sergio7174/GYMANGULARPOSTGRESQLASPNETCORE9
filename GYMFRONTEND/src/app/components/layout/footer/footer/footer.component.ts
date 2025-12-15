import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapTwitter, 
         bootstrapFacebook, 
         bootstrapInstagram,
         bootstrapLinkedin,
         bootstrapEnvelope,
         bootstrapPhoneVibrateFill,
         bootstrapSendFill,
         bootstrapCollectionFill,
         bootstrapTelephoneInboundFill,
         bootstrapPinMapFill
   } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon,],
  providers: [provideIcons({ bootstrapTwitter, 
    bootstrapFacebook, 
    bootstrapInstagram,
    bootstrapLinkedin,
    bootstrapEnvelope,
    bootstrapPhoneVibrateFill,
    bootstrapSendFill,
    bootstrapCollectionFill,
    bootstrapTelephoneInboundFill,
    bootstrapPinMapFill })],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
