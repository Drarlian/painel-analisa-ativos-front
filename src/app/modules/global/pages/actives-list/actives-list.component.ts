import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
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


const mockData: any[] = [
  {
    titulo: "WEGE3",
    cotacao: "R$ 48,01",
    variacao_12m: "24,97%",
    p_l: "33,35",
    p_vp: "9,08",
    dy_12m: "1,60%",
    p_receita_psr: "5,30",
    dividend_yield_wege3: "1,60%",
    payout: "52,83%",
    margem_liquida: "15,91%",
    margem_bruta: "33,73%",
    margem_ebit: "20,25%",
    margem_ebitda: "22,38%",
    ev_ebitda: "23,18",
    ev_ebit: "25,63",
    p_ebitda: "23,70",
    p_ebit: "26,20",
    p_ativo: "4,86",
    p_cap_giro: "17,13",
    p_ativo_circ_liq: "-14,12",
    vpa: "5,29",
    lpa: "1,44",
    giro_ativos: "0,92",
    roe: "27,21%",
    roic: "23,65%",
    roa: "15,23%",
    divida_liquida_patrimonio: "-0,20",
    divida_liquida_ebitda: "-0,52",
    divida_liquida_ebit: "-0,57",
    divida_bruta_patrimonio: "0,16",
    patrimonio_ativos: "0,54",
    passivos_ativos: "0,44",
    liquidez_corrente: "1,76",
    cagr_receitas_5_anos: "16,81%",
    cagr_lucros_5_anos: "21,40%",
    valor_de_mercado: "R$ 201.513.237.000",
    valor_de_firma: "R$ 197.112.398.000",
    patrimonio_liquido: "R$ 22.204.221.000",
    no_total_de_papeis: "4.197.317.000",
    ativos: "R$ 41.489.701.000",
    ativo_circulante: "R$ 27.221.359.000",
    divida_bruta: "R$ 3.595.237.000",
    divida_liquida: "R$ -4.400.839.000",
    disponibilidade: "R$ 7.996.076.000",
    segmento_de_listagem: "Novo Mercado",
    free_float: "35,30%",
    tag_along: "100,00%",
    liquidez_media_diaria: "R$ 428.730.000",
    setor: "Bens Industriais",
    segmento: "Motores, Compressores e Outros"
  },
  {
    titulo: "PETR3",
    cotacao: "R$ 48,01",
    variacao_12m: "24,97%",
    p_l: "33,35",
    p_vp: "9,08",
    dy_12m: "1,60%",
    p_receita_psr: "5,30",
    dividend_yield_wege3: "1,60%",
    payout: "52,83%",
    margem_liquida: "15,91%",
    margem_bruta: "33,73%",
    margem_ebit: "20,25%",
    margem_ebitda: "22,38%",
    ev_ebitda: "23,18",
    ev_ebit: "25,63",
    p_ebitda: "23,70",
    p_ebit: "26,20",
    p_ativo: "4,86",
    p_cap_giro: "17,13",
    p_ativo_circ_liq: "-14,12",
    vpa: "5,29",
    lpa: "1,44",
    giro_ativos: "0,92",
    roe: "27,21%",
    roic: "23,65%",
    roa: "15,23%",
    divida_liquida_patrimonio: "-0,20",
    divida_liquida_ebitda: "-0,52",
    divida_liquida_ebit: "-0,57",
    divida_bruta_patrimonio: "0,16",
    patrimonio_ativos: "0,54",
    passivos_ativos: "0,44",
    liquidez_corrente: "1,76",
    cagr_receitas_5_anos: "16,81%",
    cagr_lucros_5_anos: "21,40%",
    valor_de_mercado: "R$ 201.513.237.000",
    valor_de_firma: "R$ 197.112.398.000",
    patrimonio_liquido: "R$ 22.204.221.000",
    no_total_de_papeis: "4.197.317.000",
    ativos: "R$ 41.489.701.000",
    ativo_circulante: "R$ 27.221.359.000",
    divida_bruta: "R$ 3.595.237.000",
    divida_liquida: "R$ -4.400.839.000",
    disponibilidade: "R$ 7.996.076.000",
    segmento_de_listagem: "Novo Mercado",
    free_float: "35,30%",
    tag_along: "100,00%",
    liquidez_media_diaria: "R$ 428.730.000",
    setor: "Bens Industriais",
    segmento: "Motores, Compressores e Outros"
  }
]

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
        console.log(params);
        console.log('teste');
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
