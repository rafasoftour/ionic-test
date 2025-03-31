import { Component, inject, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonMenuToggle,
  ],
})
export class HomePage implements OnInit {
  private storageService = inject(StorageService);
  constructor(private router: Router) {
    addIcons({
      logOutOutline,
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  async logout() {
    await this.storageService.clear();
    this.router.navigate(['/login']);
  }
}
