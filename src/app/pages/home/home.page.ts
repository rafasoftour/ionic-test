import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
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
    MenuComponent,
    IonButton,
    IonIcon,
  ],
})
export class HomePage {
  private storageService = inject(StorageService);
  constructor(private router: Router) {
    addIcons({
      logOutOutline,
    });
  }
  async logout() {
    await this.storageService.clear();
    this.router.navigate(['/login']);
  }
}
