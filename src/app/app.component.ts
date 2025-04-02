import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonIcon,
  IonLabel,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  carOutline,
  peopleOutline,
  notifications,
  notificationsCircleOutline,
  notificationsOutline,
} from 'ionicons/icons';
import { MenuItem } from './interfaces/menu.interface';

import { Platform } from '@ionic/angular';
import { NotificationService } from './services/notification.service';
import { MenuService } from './services/menu.service';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterModule,
    IonApp,
    IonRouterOutlet,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonList,
    IonIcon,
    IonLabel,
    IonMenuToggle,
  ],
})
export class AppComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private menuService = inject(MenuService);

  menuList: MenuItem[] = [];
  constructor(private platform: Platform) {
    this.initializeApp();
    addIcons({
      homeOutline,
      carOutline,
      peopleOutline,
      notifications,
      notificationsOutline,
    });
  }

  async ngOnInit() {
    console.log('App OnInit');
    this.menuService.menuList$.subscribe((menu) => {
      this.menuList = menu;
    });
  }

  // IONIC Zone
  initializeApp() {
    this.platform.ready().then(() => {
      this.notificationService.initialize();
      // Evita que la StatusBar solape el header en dispositivos físicos
      // StatusBar.setOverlaysWebView({ overlay: false });
    });
  }
}
