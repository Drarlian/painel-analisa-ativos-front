import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ThemeService } from './services/theme/theme.service';
import { ToastModule } from 'primeng/toast';
import { PrimeNG } from 'primeng/config';
import { InputSearchDialogComponent } from './modules/global/components/input-search-dialog/input-search-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CardModule, ToastModule, InputSearchDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'painel-analisa-ativos';

  constructor (private primeng: PrimeNG, private themeService: ThemeService ) { }

  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }
}
