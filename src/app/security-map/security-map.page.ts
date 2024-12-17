import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  standalone: true,
  selector: 'app-security-map',
  templateUrl: './security-map.page.html',
  styleUrls: ['./security-map.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class SecurityMapPage implements OnInit {
  currentPosition: any = null;

  constructor(private alertController: AlertController) {}

  // Implement the ngOnInit method
  ngOnInit(): void {
    // Optional: Any initialization logic you want to run when the component loads
    console.log('SecurityMapPage initialized');
  }

  async getCurrentLocation() {
    try {
      // Solicitar permisos de ubicación
      const permissionResult = await Geolocation.checkPermissions();
      
      if (permissionResult.location !== 'granted') {
        const requestResult = await Geolocation.requestPermissions();
        
        if (requestResult.location !== 'granted') {
          await this.showAlert(
            'Permisos Denegados', 
            'No se pueden obtener los permisos de ubicación.'
          );
          return;
        }
      }

      // Obtener ubicación actual
      const coordinates = await Geolocation.getCurrentPosition();
      
      this.currentPosition = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy
      };

      await this.showAlert(
        'Ubicación Actual', 
        `Latitud: ${this.currentPosition.latitude}\nLongitud: ${this.currentPosition.longitude}\nPrecisión: ${this.currentPosition.accuracy} metros`
      );

      // Aquí podrías llamar a una función para actualizar el mapa
      this.updateMap();

    } catch (error) {
      console.error('Error al obtener la ubicación', error);
      await this.showAlert(
        'Error', 
        'No se pudo obtener la ubicación actual.'
      );
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  updateMap() {
    // Lógica para actualizar el mapa con la ubicación actual
    // Podrías usar librerías como Leaflet o Google Maps para renderizar
    console.log('Actualizando mapa con ubicación:', this.currentPosition);
  }
}