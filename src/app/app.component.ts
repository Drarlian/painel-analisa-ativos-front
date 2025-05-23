import { InitialConfigurationsService } from './modules/global/services/initial-configurations/initial-configurations.service';
import { HeaderComponent } from './modules/global/components/header/header.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ThemeService } from './services/theme/theme.service';
import { ToastModule } from 'primeng/toast';
import { PrimeNG } from 'primeng/config';
import { InputSearchDialogComponent } from './modules/global/components/input-search-dialog/input-search-dialog.component';
import { InputSearchService } from './modules/global/services/input-search/input-search.service';
import { FooterComponent } from './modules/global/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CardModule, ToastModule, InputSearchDialogComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'painel-analisa-ativos';

  visibleInputSearchDialog: boolean = false;

  constructor ( private primeng: PrimeNG, private themeService: ThemeService, private inputSearchService: InputSearchService, private initialConfigurationsService: InitialConfigurationsService ) { }

  ngOnInit(): void {
    this.primeng.ripple.set(true);

    this.inputSearchService.statusInputSearchDialogInformation.subscribe((status) => {
      this.visibleInputSearchDialog = status;
    });

    this.initializationServices();
  }

  async initializationServices() {
    await this.initialConfigurationsService.getFilters();
    await this.initialConfigurationsService.getMostViewed();
    await this.initialConfigurationsService.getTopActives();
  }
}
