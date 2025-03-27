import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBar } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

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
  imports: [CommonModule, CardModule, TableModule, InputTextModule, TagModule, SelectModule, MultiSelectModule, ProgressBar, ButtonModule, IconFieldModule, InputIconModule],
  templateUrl: './actives-list.component.html',
  styleUrl: './actives-list.component.scss'
})
export class ActivesListComponent implements OnInit{
  actives!: any[];

  isLoading: boolean = true;

  searchValue: string | undefined;

  ngOnInit(): void {
    this.actives = mockData;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

  // Método de filtro:
  filterGlobal(event: Event, table: Table): void {
    const inputElement = event.target as HTMLInputElement; // Fazendo a verificação de tipo
    const value = inputElement?.value || ''; // Obtendo o valor do input

    // Chama o método de filtro
    table.filterGlobal(value, 'contains');
  }

  getSeverity(status: string) {
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
}
