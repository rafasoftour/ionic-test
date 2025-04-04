import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonMenuToggle,
  IonItemSliding,
  LoadingController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Mensaje } from '../../interfaces/mensaje.interface';
import { MensajeService } from '../../services/mensaje.service';
import { ToastService } from '../../services/toast.service';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  trashOutline,
  createOutline,
  addOutline,
  hourglassOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { StorageService } from '../../services/storage.service';
import { UsuarioHeaderComponent } from '../../components/usuario-header/usuario-header.component';

@Component({
  selector: 'app-mensaje-usuario',
  templateUrl: './mensaje-usuario.page.html',
  styleUrls: ['./mensaje-usuario.page.scss'],
  standalone: true,
  imports: [
    IonItemSliding,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonMenuToggle,
    UsuarioHeaderComponent,
  ],
})
export class MensajeUsuarioPage {
  searchQuery: string = ''; // Valor del campo de búsqueda
  mensajes: Mensaje[] = []; // Lista completa de mensajes
  filteredMensajes: Mensaje[] = []; // Lista filtrada según la búsqueda

  private mensajeService = inject(MensajeService);
  private toastService = inject(ToastService);
  private storageService = inject(StorageService);

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {
    addIcons({
      homeOutline,
      hourglassOutline,
      checkmarkCircleOutline,
      createOutline,
      trashOutline,
      addOutline,
    });
  }

  // Utilizamos willEnter para que se actualice la lista al crear o eliminar
  ionViewWillEnter() {
    this.obtenerMensajes();
  }

  ngAfterViewInit() {}

  async obtenerMensajes() {
    const loading = await this.loadingController.create({
      message: 'Cargando mensajes...',
      duration: 0, // Lo dejamos indefinido para controlarlo manualmente
    });
    await loading.present();
    // Buscamos la identificación del usario logado
    const user = await this.storageService.get('plannerstats-user');

    this.mensajeService.getMensajeToUser(user._id).subscribe({
      next: (data: Mensaje[]) => {
        this.mensajes = data;
        this.filteredMensajes = data;
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error al obtener mensajes:', error);
        let message = 'Error en la obtención de mensajes';
        if (error.error && error.error.message) message = error.error.message;
        this.toastService.showMessage(message, 'warning');
        loading.dismiss();
      },
    });
  }

  // Función que se llama cuando el usuario hace una búsqueda
  searchMensaje() {
    if (this.searchQuery.trim() === '') {
      this.filteredMensajes = this.mensajes; // Si no hay texto de búsqueda, mostramos todos los mensajes
    } else {
      // Filtramos la lista de mensajes por matrícula
      this.filteredMensajes = this.mensajes.filter((mensaje) =>
        mensaje.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToDetalle(mensaje: Mensaje) {
    this.router.navigate(['/mensaje-detalle', mensaje._id]);
  }

  trackByFn(index: number, item: any): any {
    return item._id; // Puedes usar cualquier identificador único en el objeto
  }
}
