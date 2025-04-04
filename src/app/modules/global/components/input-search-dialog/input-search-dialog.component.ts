import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { InputSearchService } from '../../services/input-search/input-search.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AutoComplete } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ActivesService } from '../../services/actives/actives.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-search-dialog',
  imports: [CommonModule, Dialog, ButtonModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, RippleModule, AutoComplete, FormsModule],
  templateUrl: './input-search-dialog.component.html',
  styleUrl: './input-search-dialog.component.scss'
})
export class InputSearchDialogComponent implements OnInit {
  inputSearchService = inject(InputSearchService);
  activesService = inject(ActivesService);
  private router = inject(Router);

  visible!: boolean;

  inputValue: string = '';

  topAcoes: any;
  topFiis: any;

  async ngOnInit() {
    this.inputSearchService.statusInputSearchDialogInformation.subscribe((status) => {
      this.visible = status;
    });

    const responseAcoes = await this.activesService.getTopAcoes(4);

    if (responseAcoes){
      this.topAcoes = responseAcoes;
    }
    const responseFiis = await this.activesService.getTopFiis(4);

    if (responseFiis){
      this.topFiis = responseFiis;
    }
  }

  toggleDialog() {
    this.inputSearchService.toggleStatusInputSearchDialog();
  }

  closeDiaog(){
    this.inputSearchService.closeInputSearchDialog();
  }

  navigateTo(route: string){
    // this.sidebarVisible = false;
    this.router.navigate([route]);
    this.inputSearchService.closeInputSearchDialog();
  }
}
