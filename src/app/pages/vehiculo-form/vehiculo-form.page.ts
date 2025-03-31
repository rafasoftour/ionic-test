import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/angular/standalone';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';
import { VehicleService } from '../../services/vehicle.service';
import { ToastService } from '../../services/toast.service';

import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.page.html',
  styleUrls: ['./vehiculo-form.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class VehiculoFormPage implements OnInit {
  vehiculo: any = {};
  isEdit = false;

  private vehicleService = inject(VehicleService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    addIcons({ closeOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.cargarVehiculo(id);
    }
  }

  cargarVehiculo(id: string) {
    this.vehicleService.getVehicleById(id).subscribe((vehiculo) => {
      this.vehiculo = vehiculo;
    });
  }

  guardarVehiculo() {
    if (this.isEdit) {
      this.vehicleService.updateVehicle(this.vehiculo).subscribe(() => {
        this.toastService.showMessage('Vehículo actualizado', 'success');
        this.router.navigate(['/vehiculo']);
      });
    } else {
      this.vehicleService.createVehicle(this.vehiculo).subscribe(() => {
        this.toastService.showMessage('Vehículo creado', 'success');
        this.router.navigate(['/vehiculo']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/vehiculo']);
  }
}
