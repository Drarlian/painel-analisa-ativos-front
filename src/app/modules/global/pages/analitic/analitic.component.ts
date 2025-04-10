import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ActivesService } from '../../services/actives/actives.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Tooltip } from 'primeng/tooltip';
import { distinctUntilChanged } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputSearchService } from '../../services/input-search/input-search.service';

@Component({
  selector: 'app-analitic',
  imports: [CommonModule, CardModule, TagModule, LoadingComponent, Tooltip, ButtonModule],
  templateUrl: './analitic.component.html',
  styleUrl: './analitic.component.scss'
})
export class AnaliticComponent implements OnInit{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private activesService = inject(ActivesService);
  private inputSearchService = inject(InputSearchService);

  isLoading: boolean = true;
  isError: boolean = false;

  typeActive: string | null = null;
  nameActive: string | null = null;

  activeInfos: any = {}
  // activeInfosEntries: any = []

  grahamValue!: string;
  grahamStatus!: string;

  showAllInformations: boolean = false;

  async ngOnInit() {
    this.isLoading = true;

    this.route.paramMap.pipe(distinctUntilChanged((prev, curr) => (prev.get('tipo') === curr.get('tipo')) && (prev.get('nome') === curr.get('nome')))).subscribe(params => {
      const tempTypeActive = params.get('tipo');
      const tempNameActive = params.get('nome');

      // Verifica se existem valores na URL e se houve alteração real em pelo menos um dos valores antes de fazer a requisição.
      if ((tempTypeActive && tempNameActive) && (this.typeActive !== tempTypeActive || this.nameActive !== tempNameActive)) {
        this.handleTipoNomeChangeAsync(tempTypeActive, tempNameActive);
      }
    });
  }

  async handleTipoNomeChangeAsync(newType: string, newName: string) {
    this.isLoading = true;

    // Fazendo a requisição para obter os dados:
    if (newType == 'acoes' && newName){
      const response = await this.activesService.getAcoes([newName]);

      if (typeof(response) == 'object'){
        this.activeInfos = response[0];
        // this.activeInfosEntries = Object.entries({...this.activeInfos});

        this.calculateGrahamValue(this.activeInfos.lpa, this.activeInfos.vpa);
        this.calculateGrahamStatus(this.activeInfos.cotacao);

        // Deu tudo certo eu paro o loading e atribuo as variaveis.
        this.typeActive = newType;
        this.nameActive = newName;
        this.isLoading = false;
        this.isError = false;
      } else {
        this.isLoading = false;
        this.isError = true;
      }
    } else if (newType == 'fiis' && newName){
      const response = await this.activesService.getFiis([newName]);

      if (typeof(response) == 'object'){
        this.activeInfos = response[0];
        // this.activeInfosEntries = Object.entries({...this.activeInfos});

        // Deu tudo certo eu paro o loading e atribuo as variaveis.
        this.typeActive = newType;
        this.nameActive = newName;
        this.isLoading = false;
        this.isError = false;
      } else {
        this.isLoading = false;
        this.isError = true;
      }
    } else {
      this.router.navigate(['home']);
    }

    // Deu tudo certo eu paro o loading e atribuo as variaveis.
    // this.typeActive = newType;
    // this.nameActive = newName;
    // this.isLoading = false;
  }

  calculateGrahamValue(lpa: string, vpa: string) {
    const tempLPA = Number(lpa.replace(',', '.'));
    const tempVPA = Number(vpa.replace(',', '.'));
    const tempResult = Math.sqrt(22.5 * tempLPA * tempVPA).toFixed(2)

    if (typeof(tempResult) == 'string') {
      this.grahamValue = 'Indefinido'
    } else {
      this.grahamValue = String(tempResult).replace('.', ',')
    }

  }

  calculateGrahamStatus(cotacao: string) {
    const tempGrahamValue = parseFloat(this.grahamValue.replace(',', '.'));
    const tempCotacao = parseFloat(cotacao.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));

    if (this.activeInfos.cotacao.includes('-')){
      this.grahamStatus = 'INDEFINIDO';
    } else if (tempCotacao > tempGrahamValue) {
      this.grahamStatus = 'CARA';
    } else if (tempCotacao == tempGrahamValue) {
      this.grahamStatus = 'JUSTO';
    } else {
      this.grahamStatus = 'BARATA';
    }
  }

  normalizeTitle(title: string){
    const tempTitle = this.titleCase(title.toUpperCase().replaceAll('_', ' '))
    return tempTitle
  }

  titleCase(text: string) {
    return text
      .split(" ")  // Divide a string em palavras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza a primeira letra
      .join(" "); // Junta tudo de volta
  }

  toggleShowAllInformations(){
    this.showAllInformations = !this.showAllInformations;
  }

  openInputSearchDialog(){
    this.inputSearchService.openInputSearchDialog();
  }

  getSeverity() {
    switch (this.grahamStatus) {
      case 'CARA':
        return 'danger';
      case 'JUSTO':
        return 'info';
      case 'BARATA':
        return 'success';
      default:
        return 'warn'
    }
  }

  defineActiveNoteStamp() {
    if (Number(this.activeInfos.nota) > 6) {
      return 'pi pi-verified'
    } else {
      return 'pi pi-times-circle'
    }
  }

  defineActiveColorStamp() {
    if (Number(this.activeInfos.nota) > 6) {
      return 'green'
    } else {
      return 'red'
    }
  }

  defineCardColor(titleCard: string) {
    if (this.activeInfos.indicadores_positivos?.filter((title: string) => title == titleCard).length > 0){
      return 'good'
    } else if (this.activeInfos.indicadores_medianos?.filter((title: string) => title == titleCard).length > 0) {
      return 'warn'
    } else if (this.activeInfos.indicadores_negativos?.filter((title: string) => title == titleCard).length > 0) {
      return 'bad'
    } else {
      return ''
    }
  }

  navigateTo(route: string){
    // this.sidebarVisible = false;
    this.router.navigate([route]);
  }
}
