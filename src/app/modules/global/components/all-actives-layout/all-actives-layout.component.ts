import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivesListComponent } from '../../pages/actives-list/actives-list.component';

@Component({
  selector: 'app-all-actives-layout',
  imports: [HeaderComponent, ActivesListComponent],
  templateUrl: './all-actives-layout.component.html',
  styleUrl: './all-actives-layout.component.scss'
})
export class AllActivesLayoutComponent {

}
