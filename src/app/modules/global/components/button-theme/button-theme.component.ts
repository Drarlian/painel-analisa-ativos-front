import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-button-theme',
  standalone: true,
  imports: [ToggleButtonModule, FormsModule, CommonModule],
  templateUrl: './button-theme.component.html',
  styleUrl: './button-theme.component.scss'
})
export class ButtonThemeComponent implements OnInit {
  themeService = inject(ThemeService);

  themeData!: string;
  isDarkTheme: boolean = true;

  ngOnInit() {
    this.themeService.themeInformation.subscribe(data => {
      this.themeData = data;

      if (data == 'dark'){
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    });
  }

  toggleLightDark(){
    this.themeService.toggleDarkMode();
  }
}
