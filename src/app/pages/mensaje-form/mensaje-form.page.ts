import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { MensajeService } from '../../services/mensaje.service';
import { ToastService } from '../../services/toast.service';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mensaje-form',
  templateUrl: './mensaje-form.page.html',
  styleUrls: ['./mensaje-form.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    ReactiveFormsModule,
    IonTextarea,
  ],
})
export class MensajeFormPage implements OnInit {
  mensajeForm: FormGroup;
  isEdit = false;
  private mensajeService = inject(MensajeService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    addIcons({ closeOutline });

    this.mensajeForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cargarMensaje(id);
    }
  }

  cargarMensaje(id: string) {
    this.mensajeService.getMensajeById(id).subscribe((mensaje) => {
      if (mensaje) {
        this.mensajeForm.patchValue(mensaje);
      }
    });
  }

  guardarMensaje() {
    if (this.mensajeForm.invalid) {
      return;
    }

    const mensajeData = this.mensajeForm.value;

    if (this.isEdit) {
      this.mensajeService.updateMensaje(mensajeData).subscribe(() => {
        this.toastService.showMessage('Mensaje actualizado', 'success');
        this.router.navigate(['/mensaje']);
      });
    } else {
      this.mensajeService.createMensaje(mensajeData).subscribe(() => {
        this.toastService.showMessage('Mensaje creado', 'success');
        this.router.navigate(['/mensaje']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/mensaje']);
  }
}
