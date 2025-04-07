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
import { FormsModule } from '@angular/forms';
import { ActivesService } from '../../services/actives/actives.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AutoFocus } from 'primeng/autofocus';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-input-search-dialog',
  imports: [CommonModule, Dialog, ButtonModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, RippleModule, FormsModule, AutoFocus,
    LoadingComponent
  ],
  templateUrl: './input-search-dialog.component.html',
  styleUrl: './input-search-dialog.component.scss'
})
export class InputSearchDialogComponent implements OnInit {
  inputSearchService = inject(InputSearchService);
  activesService = inject(ActivesService);
  private router = inject(Router);

  private searchSubject: Subject<string> = new Subject<string>();

  visible!: boolean;

  inputValue: string = '';
  searchResponseActives: any;

  isLoadingSearching: boolean = false;
  isLoadingTopActives: boolean = true;

  topAcoes: any;
  topFiis: any;

  async ngOnInit() {
    this.inputSearchService.statusInputSearchDialogInformation.subscribe((status) => {
      this.visible = status;
    });

    this.searchSubject
      .pipe(
        debounceTime(500), // Aguarda 500ms após o último evento
        distinctUntilChanged() // Ignora se o valor for o mesmo do anterior
      )
      .subscribe((searchTerm) => {
        if (searchTerm.trim() === '') {
          this.searchResponseActives = []
        } else {
          this.isLoadingSearching = true;
          this.realizarBusca(searchTerm);
          this.isLoadingSearching = false;
        }
      });


    this.isLoadingTopActives = true;
    const response = await this.activesService.getMostViewed('all', 4);

    if (typeof(response) == 'object'){
      this.topAcoes = [...response.acoes];
      this.topFiis = [...response.fiis];

      this.isLoadingTopActives = false;
    }
  }

  onInputChange(searchTerm: string): void {
    this.searchSubject.next(searchTerm);
  }

  async realizarBusca(searchTerm: string){
    // Lógica para realizar a requisição com o termo de busca
    const response = await this.activesService.SearchActives(searchTerm);

    if (response) {
      this.searchResponseActives = response;
    }
    // Exemplo: this.meuServico.buscarDados(searchTerm).subscribe(...)
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
