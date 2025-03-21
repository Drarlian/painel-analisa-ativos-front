import { Component, OnInit, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonThemeComponent } from '../button-theme/button-theme.component';
// import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DrawerModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, CommonModule, ButtonThemeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  // private themeService = inject(ThemeService);

  // themeData!: string;
  sidebarVisible: boolean = false;

  ngOnInit(){
  }

  navigateTo(route: string){
    // this.sidebarVisible = false;
    this.router.navigate([route]);
  }

  navigateToWithQuery(route: string, target: string){
    // this.sidebarVisible = false;
    this.router.navigate([route], { queryParams: { target } });
  }

  logOut(){
    // this.usersService.logout();
  }

  customClose(){
    this.sidebarVisible = false;
  }
}
