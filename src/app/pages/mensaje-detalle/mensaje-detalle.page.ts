import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../../services/mensaje.service';
import { Mensaje } from '../../interfaces/mensaje.interface';
import { ToastService } from '../../services/toast.service';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { UsuarioHeaderComponent } from '../../components/usuario-header/usuario-header.component';

@Component({
  selector: 'app-mensaje-detalle',
  templateUrl: './mensaje-detalle.page.html',
  styleUrls: ['./mensaje-detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    UsuarioHeaderComponent,
  ],
})
export class MensajeDetallePage implements OnInit {
  mensaje: Mensaje | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mensajeService: MensajeService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const mensajeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (mensajeId) {
      this.obtenerMensajeDetalle(mensajeId);
    }
  }

  obtenerMensajeDetalle(id: string) {
    this.mensajeService.getMensajeById(id).subscribe({
      next: (data) => {
        this.mensaje = data;
      },
      error: (error) => {
        console.error('Error al obtener el mensaje:', error);
        this.toastService.showMessage('Error al obtener el mensaje', 'warning');
      },
    });
  }
}
