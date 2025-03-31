// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient) {}

  // Método para realizar login y guardar los tokens en memoria
  login(email: string, password: string): Observable<any> {
    const apiUrl = `${environment.apiBaseUrl}/usuarios/login`;
    return this.http.post<any>(apiUrl, { email, password }).pipe(
      switchMap((res) => {
        this.accessToken = res.accessToken;
        this.refreshToken = res.refreshToken;
        return of(res);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  // Método para refrescar el accessToken usando el refreshToken
  refreshAccessToken(refreshToken: string): Observable<any> {
    const apiUrl = `${environment.apiBaseUrl}/usuarios/refresh-token`;
    return this.http.post<any>(apiUrl, { refreshToken }).pipe(
      switchMap((res) => {
        this.accessToken = res.accessToken;
        return of(res);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  // Métodos para guardar los tokens (puedes acceder a los valores en memoria)
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
  }

  // Métodos para obtener los tokens (puedes acceder a los valores en memoria)
  getAccessToken(): string | null {
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }
}
