import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../local-storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private localStorage = inject(StorageService);

  private theme = new BehaviorSubject<string>('dark');
  themeInformation = this.theme.asObservable();

  constructor() {
    const localTheme = this.localStorage.getLocalStorage('THEME-PAA');

    if (localTheme){
      this.theme.next(localTheme);

      const linkElement = document.querySelector('html');
      if (linkElement !== null){
        if (localTheme == 'dark'){
          linkElement.classList.add('my-app-dark');
          document.documentElement.style.setProperty('--main-color', 'white');
        } else {
          linkElement.classList.add('my-app-light');
          document.documentElement.style.setProperty('--main-color', 'black');
        }
      }
    }
  }

  toggleDarkMode() {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.classList.contains('my-app-dark');

    if (isDarkMode) {
      htmlElement.classList.remove('my-app-dark');
      htmlElement.classList.add('my-app-light');
      document.documentElement.style.setProperty('--main-color', 'black');

      this.theme.next('light');

      this.localStorage.setLocalStorage('THEME-PAA', 'light');
    } else {
      htmlElement.classList.remove('my-app-light');
      htmlElement.classList.add('my-app-dark');
      document.documentElement.style.setProperty('--main-color', 'white');

      this.theme.next('dark');

      this.localStorage.setLocalStorage('THEME-PAA', 'dark');
    }
  }
}
