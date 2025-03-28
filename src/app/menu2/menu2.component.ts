import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, statsChartOutline, carOutline } from 'ionicons/icons';
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

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.scss'],
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
export class Menu2Component implements OnInit {
  constructor() {
    addIcons({
      homeOutline,
      statsChartOutline,
      carOutline,
    });
  }

  ngOnInit() {}
}
