import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuController } from '@ionic/angular/standalone';
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
import { homeOutline, carOutline } from 'ionicons/icons';
import { MenuItem } from './interfaces/menu.interface';

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
export class AppComponent {
  menuList: MenuItem[] = [
    { link: '/home', icon: 'home-outline', label: 'Inicio' },
    { link: '/vehiculo', icon: 'car-outline', label: 'Vehiculos' },
  ];
  constructor(private menuCtrl: MenuController) {
    addIcons({
      homeOutline,
      carOutline,
    });
  }
  closeMenu() {
    console.log('Cierra menu');
    this.menuCtrl.close('main-menu');
  }
}
