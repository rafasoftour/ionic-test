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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { MensajeService } from '../../services/mensaje.service';
import { ToastService } from '../../services/toast.service';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { UsuarioService } from '../../services/usuario.service';

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
    IonSelect,
    IonSelectOption,
  ],
})
export class MensajeFormPage implements OnInit {
  mensajeForm: FormGroup;
  isEdit = false;
  users: any[] = []; // Lista de usuarios

  private mensajeService = inject(MensajeService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usuarioService = inject(UsuarioService);

  constructor(private fb: FormBuilder) {
    addIcons({ closeOutline });

    this.mensajeForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      audience: ['all', Validators.required],
      receiverId: [''],
    });
  }

  ngOnInit() {
    this.loadUsers(); // Cargar usuarios al iniciar
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cargarMensaje(id);
    }
  }

  loadUsers() {
    this.usuarioService.getAllUsers().subscribe((users) => {
      console.log('Users', users);
      this.users = users;
    });
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
