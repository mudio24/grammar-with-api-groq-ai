import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonLabel, IonIcon, IonMenuToggle, IonListHeader, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, personOutline, logOutOutline } from 'ionicons/icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonItem,
    IonLabel,
    IonIcon,
    IonMenuToggle,
    RouterLink,
    RouterLinkActive
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Grammar Checker', url: '/home', icon: 'home-outline' },
    { title: 'Random User', url: '/random-user', icon: 'person-outline' },
  ];
  constructor(private authService: AuthService, private router: Router) {
    addIcons({ homeOutline, personOutline, logOutOutline });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
