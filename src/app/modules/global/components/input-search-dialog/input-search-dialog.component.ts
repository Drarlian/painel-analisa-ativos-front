import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { InputSearchService } from '../../services/input-search/input-search.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { ActivesService } from '../../services/actives/actives.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AutoFocus } from 'primeng/autofocus';
import { LoadingComponent } from '../loading/loading.component';
import { TagModule } from 'primeng/tag';
import { InitialConfigurationsService } from '../../services/initial-configurations/initial-configurations.service';

@Component({
  selector: 'app-input-search-dialog',
  imports: [CommonModule, Dialog, ButtonModule, InputTextModule, FloatLabelModule, RippleModule, FormsModule, LoadingComponent, TagModule],
  templateUrl: './input-search-dialog.component.html',
  styleUrl: './input-search-dialog.component.scss'
})
export class InputSearchDialogComponent implements OnInit {
  inputSearchService = inject(InputSearchService);
  activesService = inject(ActivesService);
  private router = inject(Router);
  initialConfigurationsService = inject(InitialConfigurationsService);

  private searchSubject: Subject<string> = new Subject<string>();

  visible: boolean = false;

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
    // const response = await this.activesService.getMostViewed('all', 4);
    this.initialConfigurationsService.mostViewedInformations.subscribe(data => {
      if (typeof(data) == 'object' && data.acoes && data.fiis){
        this.topAcoes = [...data.acoes];
        this.topFiis = [...data.fiis];

        this.isLoadingTopActives = false;
      }
    })
  }

  handleFocus(event: any, inputAtivo: any) {
    inputAtivo.focus();
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
