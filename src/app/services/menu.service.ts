import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../interfaces/menu.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuListSubject = new BehaviorSubject<MenuItem[]>([]);
  menuList$ = this.menuListSubject.asObservable(); // Observable para suscribirse

  constructor(private storageService: StorageService) {
    this.cargarMenus(); // Cargar el menú al iniciar el servicio
  }

  async cargarMenus() {
    const user = await this.storageService.get('plannerstats-user');
    const role = user?.role || 'user';

    const menu =
      role === 'admin'
        ? [
            { link: '/home', icon: 'home-outline', label: 'Inicio' },
            { link: '/vehiculo', icon: 'car-outline', label: 'Vehiculos' },
            { link: '/usuario', icon: 'people-outline', label: 'Usuarios' },
          ]
        : [
            { link: '/home', icon: 'home-outline', label: 'Inicio' },
            { link: '/vehiculo', icon: 'car-outline', label: 'Vehiculos' },
          ];

    this.menuListSubject.next(menu);
  }
}
