import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

// Componentes específicos de IONIC
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
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonInput,
} from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage.service';
import { LoginResponse } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  private toastService = inject(ToastService);
  private storageService = inject(StorageService);

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) return; // Evita envíos si el formulario es inválido

    this.authService.login(this.loginForm.value).subscribe({
      next: async (response: LoginResponse) => {
        console.log('Login exitoso', response);
        await this.storageService.set('plannerstats-user', response);
        this.navCtrl.navigateForward('/home'); // Redirige a la página principal
      },
      error: (error) => {
        console.error('Error en el login', error);
        this.toastService.showMessage(
          'Credenciales incorrectas. Inténtalo de nuevo.',
          'warning'
        );
      },
    });
  }
}
