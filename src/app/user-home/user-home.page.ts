import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../services/notification.service'; // Importar servicio de notificaciones

@Component({
  standalone: true,
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
  imports: [IonicModule, RouterModule], // Agregar módulos de Ionic y Router
})
export class UserHomePage {
  constructor(private notificationService: NotificationService) {}

  // Método que se activa cuando el usuario presiona el botón de emergencia
 
}
