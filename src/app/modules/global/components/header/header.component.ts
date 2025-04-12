import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
// import { SidebarComponent } from '../sidebar/sidebar.component';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { ThemeService } from '../../../../services/theme/theme.service';
import { RippleModule } from 'primeng/ripple';
import { InputSearchService } from '../../services/input-search/input-search.service';
import { ActivesService } from '../../services/actives/actives.service';
import { InitialConfigurationsService } from '../../services/initial-configurations/initial-configurations.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, ButtonModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  private router = inject(Router);
  inputSearchService = inject(InputSearchService);
  activesService = inject(ActivesService);
  initialConfigurationsService = inject(InitialConfigurationsService);

  actualTheme!: string;

  items: MenuItem[] | undefined;

  acoesSegmentsItems: any = [];
  fiisSegmentsItems: any = [];
  acoesSectorsItems: any = [];
  fiisTipoDeFundoItems: any = [];

  acoesViewedItems: any = [];
  fiisViewedItems: any = [];

  visible: boolean = false;

  async ngOnInit() {
    this.themeService.themeInformation.subscribe(data => this.actualTheme = data);

    // const responseSectors = await this.activesService.getAllSectors('all', 4);
    this.initialConfigurationsService.filtersInformations.subscribe(data => {
      // SEGMENTO:
      if (typeof(data) == 'object' && data?.acoes.segmento && data?.fiis.segmento){
        // Segmento das Ações:
        data.acoes.segmento.map((segmento: any) => {
          this.acoesSegmentsItems.push({
            label: segmento,
            icon: 'pi pi-building',
            command: () => this.navigateToWithQuery('all/acoes', 'segmento', segmento)
          })
        });
        this.acoesSegmentsItems.push({
          label: 'Ver Mais',
          icon: 'pi pi-building',
          command: () => this.navigateTo('all/acoes')
        })

        // Segmento dos Fiis:
        data.fiis.segmento.map((segmento: any) => {
          this.fiisSegmentsItems.push({
            label: segmento,
            icon: 'pi pi-building',
            command: () => this.navigateToWithQuery('all/fiis', 'segmento', segmento)
          })
        });
        this.fiisSegmentsItems.push({
          label: 'Ver Mais',
          icon: 'pi pi-building',
          command: () => this.navigateTo('all/fiis')
        })
      } else {
        this.initialConfigurationsService.getFilters();
      }

      // SETOR/TIPO DE FUNDO:
      if (typeof(data) == 'object' && data?.acoes.setor && data?.fiis.tipo_de_fundo){
        // Setor das Ações:
        data.acoes.setor.map((setor: any) => {
          this.acoesSectorsItems.push({
            label: setor,
            icon: 'pi pi-building',
            command: () => this.navigateToWithQuery('all/acoes', 'setor', setor)
          })
        });
        this.acoesSectorsItems.push({
          label: 'Ver Mais',
          icon: 'pi pi-building',
          command: () => this.navigateTo('all/acoes')
        })

        // Tipo de Fundo dos Fiis:
        data.fiis.tipo_de_fundo.map((tipo_de_fundo: any) => {
          this.fiisTipoDeFundoItems.push({
            label: tipo_de_fundo,
            icon: 'pi pi-building',
            command: () => this.navigateToWithQuery('all/fiis', 'tipo_de_fundo', tipo_de_fundo)
          })
        });
        this.fiisTipoDeFundoItems.push({
          label: 'Ver Mais',
          icon: 'pi pi-building',
          command: () => this.navigateTo('all/fiis')
        })
      }
    });

    // const responseViewed = await this.activesService.getMostViewed('all', 4);
    this.initialConfigurationsService.mostViewedInformations.subscribe(data => {
      if (typeof(data) == 'object' && data.acoes && data.fiis){
        // Ações Mais Vistas:
        data.acoes.map((acao: any) => {
          this.acoesViewedItems.push({
            label: acao.ticker,
            icon: 'pi pi-eye',
            command: () => this.navigateTo('analitic/acoes/' + acao.ticker)
          })
        });
        this.acoesViewedItems.push({
            label: 'Ver Mais',
            icon: 'pi pi-eye',
            command: () => this.navigateTo('all/acoes')
          })

        // Fiis Mais Vistos:
        data.fiis.map((fii: any) => {
          this.fiisViewedItems.push({
            label: fii.ticker,
            icon: 'pi pi-eye',
            command: () => this.navigateTo('analitic/fiis/' + fii.ticker)
          })
        });
        this.fiisViewedItems.push({
          label: 'Ver Mais',
          icon: 'pi pi-eye',
          command: () => this.navigateTo('all/fiis')
        })

        this.createItems();
      } else {
        this.initialConfigurationsService.getMostViewed();
      }
    });

    // if (this.acoesSegmentsItems && this.fiisSegmentsItems && this.acoesSectorsItems && this.fiisTipoDeFundoItems && this.acoesViewedItems && this.fiisViewedItems){
      // this.createItems();
    // }
  }

  createItems(){
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.navigateTo('home')
      },
      {
        label: 'Ações',
        icon: 'pi pi-chart-line',
        items: [
          {
            label: 'Todas',
            icon: 'pi pi-asterisk',
            command: () => this.navigateTo('all/acoes')
          },
          {
            label: 'Setores',
            icon: 'pi pi-server',
            items: this.acoesSectorsItems
          },
          {
            label: 'Segmentos',
            icon: 'pi pi-server',
            items: this.acoesSegmentsItems
          },
          {
            label: 'Mais Vistas',
            icon: 'pi pi-eye',
            items: this.acoesViewedItems
          },
          {
            separator: true
          },
          // {
          //   label: 'Templates',
          //   icon: 'pi pi-palette',
          //   items: [
          //       {
          //         label: 'Apollo',
          //         icon: 'pi pi-palette',
          //         badge: '2'
          //       },
          //       {
          //         label: 'Ultima',
          //         icon: 'pi pi-palette',
          //         badge: '3'
          //       }
          //   ]
          // }
        ]
      },
      {
        label: 'Fiis',
        icon: 'pi pi-chart-bar',
        items: [
          {
            label: 'Todos',
            icon: 'pi pi-asterisk',
            command: () => this.navigateTo('all/fiis')
          },
          {
            label: 'Tipos',
            icon: 'pi pi-server',
            items: this.fiisTipoDeFundoItems
          },
          {
            label: 'Segmentos',
            icon: 'pi pi-server',
            items: this.fiisSegmentsItems
          },
          {
            label: 'Mais Vistos',
            icon: 'pi pi-eye',
            items: this.fiisViewedItems
          },
        ]
      },
      {
        label: 'Tesouro Direto',
        icon: 'pi pi-chart-pie',
        items: [
          {
            label: 'Pré Fixado',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S'
          },
          {
            label: 'Pós Fixado',
            icon: 'pi pi-server',
            shortcut: '⌘+B'
          },
        ]
      },
      {
        label: 'Sobre Nós',
        icon: 'pi pi-users',
        command: () => this.navigateTo('about-us')
      },
    ];
  }

  toggleTheme(){
    this.themeService.toggleDarkMode();
  }

  checkTheme(){
    if (this.actualTheme == 'dark'){
      return 'pi pi-moon'
    } else {
      return 'pi pi-sun'
    }
  }

  openInputSearchDialog(){
    this.inputSearchService.openInputSearchDialog();
  }

  openNotification(){
    // this.notificationsService.toggleVisibility();
  }

  openDialog() {
    this.visible = true;
  }

  closeDiaog(){
    this.visible = false;
  }

  navigateTo(route: string){
    // this.sidebarVisible = false;
    this.router.navigate([route]);
  }

  navigateToWithQuery(route: string, filterName: string, filter: string){
    // this.sidebarVisible = false;
    this.router.navigate([route], { queryParams: { [`${filterName}`]: filter } });
  }
}
