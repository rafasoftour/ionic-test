import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, statsChartOutline, carOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { Menu2Component } from '../menu2/menu2.component';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.page.html',
  styleUrls: ['./test2.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton,
    RouterModule,
    Menu2Component,
  ],
})
export class Test2Page implements OnInit {
  constructor() {
    addIcons({
      homeOutline,
      statsChartOutline,
      carOutline,
    });
  }

  ngOnInit() {}
}
