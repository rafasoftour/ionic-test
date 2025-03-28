import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.storageService.get('plannerstats-user');
    console.log('Usuario', user);

    if (user) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login si no hay usuario
      return false;
    }
  }
}
