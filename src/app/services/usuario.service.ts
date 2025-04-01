import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = environment.apiBaseUrl + '/usuarios';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUserByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${email}`);
  }

  createUser(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  updateUser(usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuario._id}`, usuario);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${email}`);
  }
}
