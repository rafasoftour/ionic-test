import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular({}),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
});
