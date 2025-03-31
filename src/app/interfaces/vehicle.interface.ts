export interface Vehicle {
  _id: string; // ID único del vehículo (MongoDB)
  identificador: string; // Identificador interno del vehículo
  matricula: string; // Matrícula del vehículo
  vin: string; // VIN del vehículo
  createdAt: string; // Fecha de creación
  updatedAt: string; // Fecha de actualización
  tenant: string; // Tenant (opcional, según tu base de datos)
}
