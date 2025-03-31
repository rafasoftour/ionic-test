import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, carOutline } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonList,
    IonIcon,
    IonLabel,
  ],
})
export class MenuComponent implements AfterViewInit {
  constructor(private menuCtrl: MenuController) {
    addIcons({
      homeOutline,
      carOutline,
    });
  }
  ngAfterViewInit() {
    // Asegurarse de que el menú esté habilitado cuando la vista esté cargada
    this.menuCtrl.enable(true, 'main-menu');
  }
}
