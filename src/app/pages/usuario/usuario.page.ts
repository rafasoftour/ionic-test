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
import { Usuario } from '../../interfaces/user.interface';
import { UsuarioService } from '../../services/usuario.service';
import { ToastService } from 'src/app/services/toast.service';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  trashOutline,
  createOutline,
  addOutline,
  peopleOutline,
} from 'ionicons/icons';
import { UsuarioHeaderComponent } from '../../components/usuario-header/usuario-header.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
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
  ],
})
export class UsuarioPage {
  searchQuery: string = ''; // Valor del campo de búsqueda
  usuarios: Usuario[] = []; // Lista completa de vehículos
  filteredUsuarios: Usuario[] = []; // Lista filtrada según la búsqueda

  private usuarioService = inject(UsuarioService);
  private toastService = inject(ToastService);

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    addIcons({
      peopleOutline,
      createOutline,
      trashOutline,
      addOutline,
      homeOutline,
    });
  }

  // Utilizamos willEnter para que se actualice la lista al crear o eliminar
  ionViewWillEnter() {
    this.obtenerUsuarios();
  }

  ngAfterViewInit() {}

  async obtenerUsuarios() {
    const loading = await this.loadingController.create({
      message: 'Cargando usuarios...',
      duration: 0, // Lo dejamos indefinido para controlarlo manualmente
    });
    await loading.present();
    this.usuarioService.getAllUsers().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.filteredUsuarios = data;
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        let message = 'Error en la obtención de usuarios';
        if (error.error && error.error.message) message = error.error.message;
        this.toastService.showMessage(message, 'warning');
        loading.dismiss();
      },
    });
  }

  // Función que se llama cuando el usuario hace una búsqueda
  searchUsuario() {
    if (this.searchQuery.trim() === '') {
      this.filteredUsuarios = this.usuarios; // Si no hay texto de búsqueda, mostramos todos los vehículos
    } else {
      // Filtramos la lista de vehículos por matrícula
      this.filteredUsuarios = this.usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  editUsuario(usuario: Usuario) {
    console.log('EditU', usuario);
    this.router.navigate(['/usuario/editar', usuario.email]);
  }

  async deleteUsuario(usuario: Usuario) {
    console.log('DeleteU', usuario);
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estás seguro de que deseas eliminar el usuario con nombre ${usuario.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive', // Rojo en iOS
          handler: () => {
            this.usuarioService.deleteUser(usuario.email).subscribe(() => {
              this.toastService.showMessage('Usuario eliminado', 'warning');
              this.obtenerUsuarios(); // Recargar la lista tras eliminar
            });
          },
        },
      ],
    });

    await alert.present();
  }
  createUsuario() {
    console.log('Crear usuario');
    this.router.navigate(['/usuario/nuevo']);
  }
}
