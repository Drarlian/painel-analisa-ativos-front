import { Component } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-basic-layout',
  imports: [HomeComponent, HeaderComponent],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.scss'
})
export class BasicLayoutComponent {

}
