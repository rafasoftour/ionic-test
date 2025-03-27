import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { IonicModule, NavController } from '@ionic/angular';
import {
  AuthService,
  LoginData,
  LoginResponse,
} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonButton,
    IonText,
  ],
})
export class LoginPage implements OnInit {
  loginData: LoginData = {
    email: '',
    password: '',
  };
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response: LoginResponse) => {
        // Maneja la respuesta exitosa (guarda el token, redirige, etc.)
        console.log('Login exitoso', response);
        this.errorMessage = ''; // Limpia el mensaje de error
        this.navCtrl.navigateForward('/home'); // Redirige a la página principal
      },
      error: (error) => {
        // Maneja el error (muestra un mensaje de error, etc.)
        console.error('Error en el login', error);
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      },
    });
  }
}
