import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ActivesService } from '../../services/actives/actives.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FilterMetadata } from 'primeng/api';
import { filter as rxFilter, distinctUntilChanged } from 'rxjs/operators';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-actives-list',
  imports: [CommonModule, CardModule, TableModule, InputTextModule, TagModule, SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule, FormsModule, LoadingComponent, TooltipModule],
  templateUrl: './actives-list.component.html',
  styleUrl: './actives-list.component.scss'
})
export class ActivesListComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private activesService = inject(ActivesService);

  actives!: any[];

  isLoading: boolean = true;

  typeActive!: any;
  segmentoFilterValue!: any;

  tableFilters: { [s: string]: FilterMetadata[] } = {};

  @ViewChild('dt1') dt1!: Table;

  searchValue: string | undefined;

  async ngOnInit() {
    this.isLoading = true;

    this.route.paramMap
    .pipe(distinctUntilChanged((prev, curr) => prev.get('tipo') === curr.get('tipo')))
    .subscribe(params => {
      const newType = params.get('tipo');

      if (newType && this.typeActive !== newType) {
        this.handleTipoChangeAsync(newType);
      }
    });

    this.route.queryParams
    .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
    .subscribe(params => {
      this.segmentoFilterValue = params['segmento'] || '';

      // Filtros padrão
      const defaultFilters: any = {
        ticker: [{ value: '', matchMode: 'contains' }],
        nome: [{ value: '', matchMode: 'contains' }],
        cotacao: [{ value: '', matchMode: 'contains' }],
        ['p/vp']: [{ value: '', matchMode: 'contains' }],
        ['p/l']: [{ value: '', matchMode: 'contains' }],
        dy_12m: [{ value: '', matchMode: 'contains' }],
        dy_12M: [{ value: '', matchMode: 'contains' }],
        nota: [{ value: '', matchMode: 'contains' }],
        setor: [{ value: '', matchMode: 'contains' }],
        tipo_de_fundo: [{ value: '', matchMode: 'contains' }],
        segmento: [{ value: '', matchMode: 'contains' }]
      };

      // Aplica filtros vindos dos query params
      for (const key in params) {
        if (params[key]) {
          defaultFilters[key] = [{
            value: params[key],
            matchMode: 'contains'
          }];
        }
      }

      if (this.dt1 && Object.keys(params).length == 0) {
        // console.log(params);
        // console.log('teste');
        this.clear(this.dt1);
      }

      this.tableFilters = defaultFilters;

      // Aplica o filtro global com base em "segmento" (ou qualquer outro critério, se quiser adaptar)
      setTimeout(() => {
        if (this.dt1 && this.segmentoFilterValue) {
          this.dt1.filterGlobal('', 'contains');
        }
      });
    });

    // await this.handleTipoChangeAsync();
  }

  async handleTipoChangeAsync(newType: string | null) {
    this.isLoading = true;

    let response: any;

    if (newType === 'acoes') {
      response = await this.activesService.getAllAcoes();
    } else if (newType === 'fiis') {
      response = await this.activesService.getAllFiis();
    }

    if (typeof response === 'object') {
      response.map((active: any) => {
        if (active.nota && active.nota != 'N/A'){
          active.nota = Number(active.nota);
        }
        active.cotacao = Number(active.cotacao.replace('R$', '').replace('.', '').replace(',', '.').trim());
        active['p/vp'] = Number(active['p/vp'].replace(',', '.'));
        
        if (newType == 'acoes'){
          active['p/l'] = Number(active['p/l'].replace('.', '').replace(',', '.'));
          active.dy_12m = Number(active.dy_12m.replace('%', '').replace('.', '').replace(',', '.'));
        } else {
          active.dy_12M = Number(active.dy_12M.replace('%', '').replace('.', '').replace(',', '.'));
        }
      });

      this.actives = [...response];
      this.typeActive = newType;
      this.isLoading = false;
    }
  }

  changeTypeFiiName(typeFii: string) {
    if (typeFii != 'Fundo de fundos') {
      let tempType: string[] | string = typeFii.split(' ');
      tempType = tempType[tempType.length-1];
      
      return tempType[0].toUpperCase() + tempType.slice(1)
    } else {
      return 'Fundo de Fundos'
    }
  }

  changeVisualToBrFormat(value: number) {
    return String(value).replace('.', ',')
  }

  hasActiveFilter(table: Table, columnKey: string): string {
    if (Object.hasOwn(table.filters, columnKey)) {
      let filter = table.filters[columnKey]
      if (!Array.isArray(filter)) {
        filter = [filter]
      }
      if (filter[0].value && filter[0].value !== 0) {
        return 'active-filter'
      }
    }
    return ''
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

  // Método de filtro:
  filterGlobal(event: Event | string, table: Table): void {
    let value;
    if (typeof(event) != 'string'){
      const inputElement = event.target as HTMLInputElement; // Fazendo a verificação de tipo
      value = inputElement?.value || ''; // Obtendo o valor do input
    } else {
      value = event;
    }

    // Chama o método de filtro
    table.filterGlobal(value, 'contains');
  }

  navigateToAnalitic(activeTitle: string){
    // this.sidebarVisible = false;
    this.router.navigate([`analitic/${this.typeActive}/${activeTitle}`]);
  }

  getSeverity(status: string) {
    status = '';
    switch (status.toLowerCase()) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return 'info';

      default:
        return 'info'
    }
  }

  getSeverityNote(nota: string) {
    if (Number(nota) > 6) {
      return 'success'
    } else if (Number(nota) > 3 && Number(nota) <= 6){
      return 'warn'
    } else {
      return 'danger'
    }
  }

  especialSeverityColor(active: any, especialTitle: string) {
    if (active.indicadores_positivos?.filter((title: string) => title == especialTitle).length > 0){
      return 'success'
    } else if (active.indicadores_medianos?.filter((title: string) => title == especialTitle).length > 0) {
      return 'warn'
    } else if (active.indicadores_negativos?.filter((title: string) => title == especialTitle).length > 0) {
      return 'danger'
    } else {
      return 'info'
    }
  }
}
