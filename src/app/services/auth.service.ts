import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginData, LoginResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl + '/usuarios/login';

  constructor(private http: HttpClient) {}

  login(loginData: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, loginData);
  }
}
