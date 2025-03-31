import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { MenuComponent } from '../../components/menu/menu.component';
import { NavigationEnd, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ToastService } from 'src/app/services/toast.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
    IonMenuToggle,
  ],
})
export class VehiculoPage implements OnInit {
  searchQuery: string = ''; // Valor del campo de búsqueda
  vehiculos: Vehicle[] = []; // Lista completa de vehículos
  filteredVehiculos: Vehicle[] = []; // Lista filtrada según la búsqueda

  private vehicleService = inject(VehicleService);
  private toastService = inject(ToastService);
  constructor(private router: Router) {
    addIcons({
      homeOutline,
    });
  }

  ngOnInit() {
    this.obtenerVehiculos();
  }

  ngAfterViewInit() {}

  obtenerVehiculos() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.filteredVehiculos = data;
      },
      error: (error) => {
        console.error('Error al obtener vehículos:', error);
        let message = 'Error en la obtención de vehículos';
        if (error.error && error.error.message) message = error.error.message;
        this.toastService.showMessage(message, 'warning');
      },
    });
  }

  // Función que se llama cuando el usuario hace una búsqueda
  searchVehicle() {
    console.log('SearchVehicle');
    if (this.searchQuery.trim() === '') {
      this.filteredVehiculos = this.vehiculos; // Si no hay texto de búsqueda, mostramos todos los vehículos
    } else {
      // Filtramos la lista de vehículos por matrícula
      this.filteredVehiculos = this.vehiculos.filter((vehiculo) =>
        vehiculo.matricula
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
