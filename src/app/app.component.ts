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
import { homeOutline, carOutline, peopleOutline } from 'ionicons/icons';
import { MenuItem } from './interfaces/menu.interface';
import { StorageService } from './services/storage.service';

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
  private storageService = inject(StorageService);
  menuList: MenuItem[] = [
    { link: '/home', icon: 'home-outline', label: 'Inicio' },
    { link: '/vehiculo', icon: 'car-outline', label: 'Vehiculos' },
  ];
  constructor() {
    addIcons({
      homeOutline,
      carOutline,
      peopleOutline,
    });
  }

  async ngOnInit() {
    await this.cargarMenus(); // Llamamos a la función async aquí
  }

  async cargarMenus() {
    const user = await this.storageService.get('plannerstats-user');
    const role = user?.role || 'user';
    this.menuList =
      role === 'admin'
        ? [
            { link: '/home', icon: 'home-outline', label: 'Inicio' },
            { link: '/vehiculo', icon: 'car-outline', label: 'Vehiculos' },
            { link: '/usuario', icon: 'people-outline', label: 'Usuarios' },
          ]
        : [
            { link: '/home', icon: 'home-outline', label: 'Inicio' },
            { link: '/vehiculo', icon: 'car-outline', label: 'Vehiculos' },
          ];
  }
}
