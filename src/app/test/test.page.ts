import { Component } from '@angular/core';
import {
  AlertController,
  ToastController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: 'test.page.html',
  styleUrls: ['test.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class TestPage {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  // ALERTAS
  async showBasicAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta Simple',
      message: 'Esta es una alerta básica de Ionic',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showConfirmAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Estás seguro de realizar esta acción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.showBasicToast('Operación cancelada');
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.showBasicToast('Acción confirmada');
          },
        },
      ],
    });
    await alert.present();
  }

  // TOASTS
  async showBasicToast(message?: string) {
    const toast = await this.toastCtrl.create({
      message: message || 'Este es un toast básico',
      duration: 2000,
      position: 'middle',
    });
    await toast.present();
  }

  async showToastWithButton() {
    const toast = await this.toastCtrl.create({
      message: 'Toast con botón de acción',
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Toast cerrado manualmente');
          },
        },
      ],
    });
    await toast.present();
  }

  irALogin() {
    this.navCtrl.navigateForward('/login');
  }
}
