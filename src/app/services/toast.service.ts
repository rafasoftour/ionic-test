import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastController = inject(ToastController);

  async showMessage(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration: number = 3000
  ) {
    const colorMap = {
      success: 'success',
      error: 'danger',
      info: 'primary',
      warning: 'warning',
    };

    const toast = await this.toastController.create({
      message,
      duration,
      color: colorMap[type] || 'primary',
      position: 'middle',
      buttons: [{ text: 'Cerrar', role: 'cancel' }],
    });

    await toast.present();
  }
}
