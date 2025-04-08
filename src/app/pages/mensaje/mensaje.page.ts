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
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  LoadingController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/standalone';
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
import { UsuarioHeaderComponent } from '../../components/usuario-header/usuario-header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: ['./mensaje.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonItemOption,
    IonItemOptions,
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
    FooterComponent,
  ],
})
export class MensajePage {
  searchQuery: string = ''; // Valor del campo de búsqueda
  mensajes: Mensaje[] = []; // Lista completa de mensajes
  filteredVehiculos: Mensaje[] = []; // Lista filtrada según la búsqueda

  private mensajeService = inject(MensajeService);
  private toastService = inject(ToastService);

  constructor(
    private router: Router,
    private alertController: AlertController,
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
    this.mensajeService.getAllMensajes().subscribe({
      next: (data) => {
        this.mensajes = data;
        this.filteredVehiculos = data;
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
      this.filteredVehiculos = this.mensajes; // Si no hay texto de búsqueda, mostramos todos los mensajes
    } else {
      // Filtramos la lista de mensajes por matrícula
      this.filteredVehiculos = this.mensajes.filter((mensaje) =>
        mensaje.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  editMensaje(mensaje: Mensaje) {
    this.router.navigate(['/mensaje/editar', mensaje._id]);
  }

  async deleteMensaje(mensaje: Mensaje) {
    const alert = await this.alertController.create({
      header: 'Eliminar Vehículo',
      message: `¿Estás seguro de que deseas eliminar el mensaje con titulo '${mensaje.title}'?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive', // Rojo en iOS
          handler: () => {
            this.mensajeService.deleteMensaje(mensaje).subscribe(() => {
              this.toastService.showMessage('Mensaje eliminado', 'warning');
              this.obtenerMensajes(); // Recargar la lista tras eliminar
            });
          },
        },
      ],
    });

    await alert.present();
  }
  createMensaje() {
    this.router.navigate(['/mensaje/nuevo']);
  }

  goToDetalle(mensaje: Mensaje) {
    this.router.navigate(['/mensaje-detalle', mensaje._id]);
  }

  trackByFn(index: number, item: any): any {
    return item._id; // Puedes usar cualquier identificador único en el objeto
  }
}
