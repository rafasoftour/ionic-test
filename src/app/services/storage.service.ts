import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private isReady = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    this.isReady = true; // Marcar como listo
  }

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
