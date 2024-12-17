import { ApplicationConfig } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Storage } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    {
      provide: Storage,
      useFactory: async () => {
        const storage = new Storage({
          name: '__mydb',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await storage.create();
        return storage;
      }
    }
  ]
};