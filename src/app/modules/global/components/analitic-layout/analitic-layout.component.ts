import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AnaliticComponent } from '../../pages/analitic/analitic.component';

@Component({
  selector: 'app-analitic-layout',
  imports: [HeaderComponent, AnaliticComponent],
  templateUrl: './analitic-layout.component.html',
  styleUrl: './analitic-layout.component.scss'
})
export class AnaliticLayoutComponent {

}
