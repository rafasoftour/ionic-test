import { Component, inject } from '@angular/core';
import { IonToolbar, IonTitle, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { addIcons } from 'ionicons';
import { personCircleOutline, shieldCheckmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-usuario-header',
  templateUrl: './usuario-header.component.html',
  styleUrls: ['./usuario-header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonToolbar, IonTitle, IonIcon],
})
export class UsuarioHeaderComponent {
  private storageService = inject(StorageService);
  userName: string | null = null;
  role: string | null = null;
  iconName: string = 'person-circle-outline';

  constructor() {
    addIcons({
      personCircleOutline,
      shieldCheckmarkOutline,
    });
  }

  ngOnInit() {
    // Nos suscribimos al BehaviorSubject del servicio
    this.storageService.getUser().subscribe((user) => {
      if (user) {
        this.userName = user.name || null;
        this.role = user.role || null;

        // Personalizar el icono según el rol
        if (this.role === 'admin') {
          this.iconName = 'shield-checkmark-outline';
        } else {
          this.iconName = 'person-circle-outline';
        }
      }
    });
  }
}
