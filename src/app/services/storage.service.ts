import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private isReady = false;

  // Creamos un BehaviorSubject para gestionar el estado del usuario
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicialización de Storage
  async init() {
    this._storage = await this.storage.create();
    this.isReady = true; // Marcar como listo

    // Al iniciar, intentamos cargar el usuario desde el almacenamiento
    const storedUser = await this.get('plannerstats-user');
    if (storedUser) {
      this.userSubject.next(storedUser); // Emitir el usuario cargado
    }
  }

  // Método para actualizar el usuario en el almacenamiento y en el BehaviorSubject
  async setUser(user: any) {
    await this.ensureReady();
    await this._storage?.set('plannerstats-user', user);
    this.userSubject.next(user); // Emitir el nuevo usuario
  }

  // Método para obtener el usuario desde el almacenamiento (reactivo)
  getUser(): Observable<any> {
    return this.userSubject.asObservable(); // Devolvemos el observable
  }

  // Métodos adicionales
  async set(key: string, value: any) {
    await this.ensureReady();
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    await this.ensureReady();
    return this._storage?.get(key);
  }

  async remove(key: string) {
    await this.ensureReady();
    await this._storage?.remove(key);
  }

  async clear() {
    await this.ensureReady();
    await this._storage?.clear();
  }

  private async ensureReady() {
    while (!this.isReady) {
      await new Promise((resolve) => setTimeout(resolve, 10)); // Esperar hasta que Storage esté listo
    }
  }
}
