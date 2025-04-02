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
    });
  }
}
