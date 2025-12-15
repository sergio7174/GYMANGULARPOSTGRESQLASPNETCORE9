import { Component } from '@angular/core';
import { IntroComponent } from '../intro/intro.component';
import { LatestnewsComponent } from '../latestnews/latestnews.component';
import { AboutusComponent } from '../aboutus/aboutus.component'; 
import { FooterComponent } from '../../layout/footer/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
              IntroComponent, 
              AboutusComponent, 
              LatestnewsComponent, 
              FooterComponent],
              
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
