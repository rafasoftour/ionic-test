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
  IonList,
} from '@ionic/angular/standalone';
import { MensajeService } from '../../services/mensaje.service';
import { ToastService } from '../../services/toast.service';
import { addIcons } from 'ionicons';
import { closeOutline, personCircleOutline } from 'ionicons/icons';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';
import { Usuario } from '../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-mensaje-form',
  templateUrl: './mensaje-form.page.html',
  styleUrls: ['./mensaje-form.page.scss'],
  standalone: true,
  imports: [
    IonList,
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
    FormsModule,
  ],
})
export class MensajeFormPage implements OnInit {
  mensajeForm: FormGroup;
  isEdit = false;
  intId = '';
  users: any[] = []; // Lista de usuarios

  usuariosFiltrados = [...this.users];

  private mensajeService = inject(MensajeService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usuarioService = inject(UsuarioService);
  private storageService = inject(StorageService);

  constructor(private fb: FormBuilder) {
    addIcons({ closeOutline, personCircleOutline });

    this.mensajeForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      audience: ['all', Validators.required],
      receiverId: [''],
      searchTerm: [''],
      sentAt: [null],
    });
  }

  ngOnInit() {
    this.loadUsers(); // Cargar usuarios al iniciar
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.intId = id;
      this.isEdit = true;
      this.cargarMensaje(id);
    }
  }

  loadUsers() {
    this.usuarioService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  filtrarUsuarios() {
    const searchTerm =
      this.mensajeForm.get('searchTerm')?.value?.toLowerCase() || ''; // Obtener el valor de searchTerm desde el formulario
    this.usuariosFiltrados = this.users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
  }

  seleccionarUsuario(user: Usuario) {
    this.mensajeForm.patchValue({
      receiverId: user._id,
      searchTerm: user.name, // Actualizar searchTerm en el formulario
    });
    this.usuariosFiltrados = []; // Ocultar la lista tras selección
  }

  cargarMensaje(id: string) {
    this.mensajeService.getMensajeById(id).subscribe((mensaje) => {
      console.log('Cargar mensaje', mensaje);
      if (mensaje) {
        this.mensajeForm.patchValue(mensaje);

        if (mensaje.audience === 'single' && mensaje.receiverId) {
          const usuario = this.users.find((u) => u._id === mensaje.receiverId);
          if (usuario) {
            this.mensajeForm.patchValue({ searchTerm: usuario.name });
          }
        }
      }
    });
  }

  async guardarMensaje(send: boolean = false) {
    if (this.mensajeForm.invalid) {
      return;
    }
    const senderId = await this.obtenerSenderId();
    const { searchTerm, ...mensajeData } = this.mensajeForm.value;
    const mensaje = { ...mensajeData, senderId };

    if (this.isEdit) {
      mensaje._id = this.intId;
      this.mensajeService.updateMensaje(mensaje).subscribe((data) => {
        this.toastService.showMessage('Mensaje actualizado', 'success');
        this.procesarEnvio(send);
      });
    } else {
      this.mensajeService
        .createMensaje(mensaje)
        .pipe(take(1))
        .subscribe((data: any) => {
          this.intId = data.createdMessage._id;
          this.toastService.showMessage('Mensaje creado', 'success');
          this.procesarEnvio(send);
        });
    }
  }
  private procesarEnvio(send: boolean) {
    if (send) {
      this.mensajeService.sendOneSignal(this.intId).subscribe(() => {
        this.toastService.showMessage('Mensaje notificado', 'success');
        this.router.navigate(['/mensaje']);
      });
    } else {
      this.router.navigate(['/mensaje']);
    }
  }

  async obtenerSenderId() {
    const usuario = await this.storageService.get('plannerstats-user');
    return usuario ? usuario._id : null;
  }

  cancelar() {
    this.router.navigate(['/mensaje']);
  }
}
