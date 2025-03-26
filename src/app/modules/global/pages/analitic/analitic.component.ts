import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-analitic',
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './analitic.component.html',
  styleUrl: './analitic.component.scss'
})
export class AnaliticComponent {

}
