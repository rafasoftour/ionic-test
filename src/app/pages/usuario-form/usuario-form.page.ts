import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
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
} from '@ionic/angular/standalone';
import { UsuarioService } from '../../services/usuario.service';
import { ToastService } from '../../services/toast.service';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { UsuarioHeaderComponent } from '../../components/usuario-header/usuario-header.component';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.page.html',
  styleUrls: ['./usuario-form.page.scss'],
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
    UsuarioHeaderComponent,
  ],
})
export class UsuarioFormPage implements OnInit {
  usuarioForm: FormGroup;
  isEdit = false;
  private usuarioService = inject(UsuarioService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(private fb: FormBuilder) {
    addIcons({ closeOutline });

    this.usuarioForm = this.fb.group(
      {
        _id: [''],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        password2: [''],
        role: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cargarUsuario(id);
    } else {
      // Si es un nuevo usuario, se requieren las contraseñas
      this.usuarioForm.get('password')?.setValidators([Validators.required]);
      this.usuarioForm.get('password2')?.setValidators([Validators.required]);
    }
  }

  cargarUsuario(id: string) {
    this.usuarioService.getUserByEmail(id).subscribe((usuario) => {
      if (usuario) {
        // Eliminamos la password para que no se visualice
        delete usuario.password;
        this.usuarioForm.patchValue(usuario);
      }
    });
  }

  guardarUsuario() {
    if (this.usuarioForm.invalid) {
      return;
    }

    const usuarioData = this.usuarioForm.value;

    if (this.isEdit) {
      this.usuarioService.updateUser(usuarioData).subscribe(() => {
        this.toastService.showMessage('Usuario actualizado', 'success');
        this.router.navigate(['/usuario']);
      });
    } else {
      if (!usuarioData.password) delete usuarioData.password;
      this.usuarioService.createUser(usuarioData).subscribe(() => {
        this.toastService.showMessage('Usuario creado', 'success');
        this.router.navigate(['/usuario']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/usuario']);
  }

  // Validador personalizado para asegurar que las contraseñas coincidan
  passwordsMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const password2 = control.get('password2');
    if (
      password?.value &&
      password2?.value &&
      password.value !== password2.value
    ) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}
