import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private platform: Platform, private router: Router) {}

  async initialize() {
    console.log('Initialize', this.platform.is('capacitor'));
    if (this.platform.is('capacitor')) {
      console.log('OneSignal setupPush');
      // Remove this method to stop OneSignal Debugging
      OneSignal.Debug.setLogLevel(6);

      // Replace YOUR_ONESIGNAL_APP_ID with your OneSignal App ID
      OneSignal.initialize(environment.oneSignal.appId);
      console.log('OneSignal Init');

      OneSignal.Notifications.addEventListener('click', async (e) => {
        let clickData: any = await e.notification;
        console.log('Mensaje ID:', clickData.additionalData.messageId);
        // Navegar a la página de detalles del mensaje
        const messageId = clickData.additionalData.messageId;
        if (messageId) {
          // Navegar a la página de detalles pasando el ID del mensaje como parámetro
          this.router.navigate(['/mensaje-detalle', messageId]);
        }
      });

      OneSignal.Notifications.requestPermission(true).then(
        (success: Boolean) => {
          console.log('Notification permission granted ' + success);
        }
      );

      // Obtener el OneSignal ID
      this.getOneSignalId();
    }
  }

  async getOneSignalId(): Promise<string | null> {
    try {
      const userId = await OneSignal.User.getOnesignalId();
      console.log('OneSignal User ID:', userId);
      return userId;
    } catch (error) {
      console.error('Error obteniendo el OneSignal User ID:', error);
      return null;
    }
  }

  async setAliasOneSignal(alias: string) {
    try {
      await OneSignal.User.addAlias('Nombre IONIC', alias);
    } catch (error) {
      console.error('Error actualizando alias:', error);
    }
  }

  async setExternalId(externalId: string) {
    try {
      await OneSignal.login(externalId);
      console.log('External ID asignado en OneSignal:', externalId);
    } catch (error) {
      console.error('Error asignando el External ID en OneSignal:', error);
    }
  }
}
