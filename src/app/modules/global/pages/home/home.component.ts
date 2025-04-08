import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { ActivesService } from '../../services/actives/actives.service';
import { Acoes } from '../../interfaces/Acoes';
import { Fiis } from '../../interfaces/Fiis';
import { LoadingComponent } from '../../components/loading/loading.component';
import { InputSearchService } from '../../services/input-search/input-search.service';
import { InitialConfigurationsService } from '../../services/initial-configurations/initial-configurations.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, InputTextModule, RippleModule, FloatLabelModule, IconFieldModule, InputIconModule, ButtonModule, CardModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private activesService = inject(ActivesService);
  inputSearchService = inject(InputSearchService);
  initialConfigurations = inject(InitialConfigurationsService);

  topAcoes!: Acoes[];
  topFiis!: Fiis[];

  isLoadingTopAcoes: boolean = true;
  isLoadingTopFiis: boolean = true;

  async ngOnInit() {
    this.isLoadingTopAcoes = true;
    this.isLoadingTopFiis = true;

    // const responseAcoes = await this.activesService.getTopAcoes(4);
    // const responseFiis = await this.activesService.getTopFiis(4);

    this.initialConfigurations.topActivesInformations.subscribe(data => {
      if (typeof(data) == 'object' && data.acoes && data.fiis){
        this.topAcoes = data.acoes;
        this.isLoadingTopAcoes = false;

        this.topFiis = data.fiis;
        this.isLoadingTopFiis = false;
      } else {
        this.initialConfigurations.getTopActives();
      }
    });
  }

  openInputSearchDialog(){
    this.inputSearchService.openInputSearchDialog();
  }

  navigateTo(route: string){
    // this.sidebarVisible = false;
    this.router.navigate([route]);
  }
}
