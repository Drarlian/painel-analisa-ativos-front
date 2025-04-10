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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, ButtonModule],
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

  acoesSectorsItems: any = [];
  fiisSectorsItems: any = [];

  acoesViewedItems: any = [];
  fiisViewedItems: any = [];

  async ngOnInit() {
    this.themeService.themeInformation.subscribe(data => this.actualTheme = data);

    // const responseSectors = await this.activesService.getAllSectors('all', 4);
    this.initialConfigurationsService.sectorsInformations.subscribe(data => {
      if (typeof(data) == 'object' && data.acoes && data.fiis){
        data.acoes.map((sector: any) => {
          this.acoesSectorsItems.push({
            label: sector,
            icon: 'pi pi-building',
            command: () => this.navigateToWithQuery('all/acoes', sector)
          })
        });

        data.fiis.map((sector: any) => {
          this.fiisSectorsItems.push({
            label: sector,
            icon: 'pi pi-building',
            command: () => this.navigateToWithQuery('all/fiis', sector)
          })
        });
      } else {
        this.initialConfigurationsService.getSectors();
      }
    })

    // const responseViewed = await this.activesService.getMostViewed('all', 4);
    this.initialConfigurationsService.mostViewedInformations.subscribe(data => {
      if (typeof(data) == 'object' && data.acoes && data.fiis){
        data.acoes.map((acao: any) => {
          this.acoesViewedItems.push({
            label: acao.ticker,
            icon: 'pi pi-eye',
            command: () => this.navigateTo('analitic/acoes/' + acao.ticker)
          })
        });

        data.fiis.map((fii: any) => {
          this.fiisViewedItems.push({
            label: fii.ticker,
            icon: 'pi pi-eye',
            command: () => this.navigateTo('analitic/fiis/' + fii.ticker)
          })
        });

        this.createItems();
      } else {
        this.initialConfigurationsService.getMostViewed();
      }
    })
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
            label: 'Mais Vistas',
            icon: 'pi pi-eye',
            items: this.acoesViewedItems
          },
          {
            separator: true
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
                {
                  label: 'Apollo',
                  icon: 'pi pi-palette',
                  badge: '2'
                },
                {
                  label: 'Ultima',
                  icon: 'pi pi-palette',
                  badge: '3'
                }
            ]
          }
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
            label: 'Setores',
            icon: 'pi pi-server',
            items: this.fiisSectorsItems
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
      }
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

  navigateTo(route: string){
    // this.sidebarVisible = false;
    this.router.navigate([route]);
  }

  navigateToWithQuery(route: string, filter: string){
    // this.sidebarVisible = false;
    this.router.navigate([route], { queryParams: { filter } });
  }
}
