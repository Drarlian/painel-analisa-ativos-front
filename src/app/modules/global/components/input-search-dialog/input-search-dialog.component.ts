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
import { LoadingComponent } from '../loading/loading.component';
import { TagModule } from 'primeng/tag';
import { InitialConfigurationsService } from '../../services/initial-configurations/initial-configurations.service';

@Component({
  selector: 'app-input-search-dialog',
  imports: [CommonModule, Dialog, ButtonModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, RippleModule, FormsModule, LoadingComponent, TagModule],
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

  // Verificando se o usuário ainda esta digitando para poder mostrar a mensagem de ativos não encontrados:
  debounceTimeout: any;
  isTyping: boolean = false;

  // Verificando se a busca esta sendo feita para impedir que o usuário digite durante a busta: (Talvez cancelar a pesquisa possa ser mais interessante no futuro)
  isBlockedInput: boolean = false;

  async ngOnInit() {
    this.inputSearchService.statusInputSearchDialogInformation.subscribe((status) => {
      this.visible = status;
    });

    this.searchSubject.subscribe(() => {
      this.isTyping = true; // <-- Usuário começou a digitar

      // Sempre que um novo valor chegar, limpa o timeout anterior
      clearTimeout(this.debounceTimeout);

      // Marca o final da digitação (fim do debounce)
      this.debounceTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 500);
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
    this.isBlockedInput = true;

    // Lógica para realizar a requisição com o termo de busca
    const response = await this.activesService.SearchActives(searchTerm);

    if (response) {
      this.searchResponseActives = response;
    }
    // Exemplo: this.meuServico.buscarDados(searchTerm).subscribe(...)

    this.isLoadingSearching = false;
    this.isBlockedInput = false;
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
