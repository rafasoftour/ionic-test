import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  private apiUrl = environment.apiBaseUrl + '/mensajes';
  constructor(private http: HttpClient) {}

  getAllMensajes(): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(this.apiUrl);
  }

  getMensajeById(id: string): Observable<Mensaje> {
    return this.http.get<Mensaje>(`${this.apiUrl}/${id}`);
  }

  getMensajeToUser(userId: string): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.put<Mensaje>(`${this.apiUrl}/${mensaje._id}`, mensaje);
  }

  createMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(this.apiUrl, mensaje);
  }

  deleteMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.delete<Mensaje>(`${this.apiUrl}/${mensaje._id}`);
  }

  sendOneSignal(id: string): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.apiUrl}/onesignal/${id}`, {});
  }
}
