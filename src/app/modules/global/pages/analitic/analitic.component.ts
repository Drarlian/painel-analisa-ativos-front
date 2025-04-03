import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ActivesService } from '../../services/actives/actives.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-analitic',
  imports: [CommonModule, CardModule, TagModule, LoadingComponent, Tooltip],
  templateUrl: './analitic.component.html',
  styleUrl: './analitic.component.scss'
})
export class AnaliticComponent implements OnInit{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private activesService = inject(ActivesService);

  isLoading: boolean = true;

  typeActive: string | null = null;
  nameActive: string | null = null;

  activeInfos: any = {}

  grahamValue!: string;
  grahamStatus!: string;

  async ngOnInit() {
    this.isLoading = true;

    this.route.paramMap.subscribe(params => {
      this.typeActive = params.get('tipo');
      this.nameActive = params.get('nome');
    });

    // Devo fazer a requisição para obter os dados aqui.
    if (this.typeActive == 'acoes' && this.nameActive){
      const response = await this.activesService.getAcoes([this.nameActive]);
      
      if (typeof(response) == 'object'){
        this.activeInfos = response[0];

        this.calculateGrahamValue(this.activeInfos.lpa, this.activeInfos.vpa);
        this.calculateGrahamStatus(this.activeInfos.cotacao);
      } else {
        this.router.navigate(['home']);
      }
    } else if (this.typeActive == 'fiis' && this.nameActive){
      const response = await this.activesService.getFiis([this.nameActive]);

      if (typeof(response) == 'object'){
        this.activeInfos = response[0];
      } else {
        this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['home']);
    }

    // Deu tudo certo eu paro o loading.
    this.isLoading = false;
  }

  calculateGrahamValue(lpa: string, vpa: string) {
    const tempLPA = Number(lpa.replace(',', '.'));
    const tempVPA = Number(vpa.replace(',', '.'));

    this.grahamValue = String(Math.sqrt(22.5 * tempLPA * tempVPA).toFixed(2)).replace('.', ',')
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
}
