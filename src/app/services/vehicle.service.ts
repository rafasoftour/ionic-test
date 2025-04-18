// src/app/services/vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehicle } from '../interfaces/vehicle.interface'; // Asegúrate de tener esta interfaz

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = environment.apiBaseUrl + '/vehiculos'; // La URL de tu API de vehículos

  constructor(private http: HttpClient) {}

  // Método para obtener todos los vehículos
  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl); // La petición GET para obtener los vehículos
  }

  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  updateVehicle(vehiculo: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(
      `${this.apiUrl}/${vehiculo.matricula}`,
      vehiculo
    );
  }

  createVehicle(vehiculo: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehiculo);
  }

  deleteVehicle(vehiculo: Vehicle): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.apiUrl}/${vehiculo.matricula}`);
  }
}
