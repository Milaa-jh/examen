import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  IonicModule,
  AlertController,
  LoadingController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  alertCircle, 
  chatbubbles, 
  location, 
  call 
} from 'ionicons/icons';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-boton-sos',
  templateUrl: './boton-sos.page.html',
  styleUrls: ['./boton-sos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule
  ]
})
export class BotonSosPage implements OnInit {
  isEmergencyActive = false;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private notificationService: NotificationService
  ) {
    addIcons({ 
      alertCircle, 
      chatbubbles, 
      location, 
      call 
    });
  }

  ngOnInit() {}

  // Método para activar la emergencia
  async activarEmergencia() {
    if (this.isEmergencyActive) {
      // Si ya está activa, desactivar
      this.desactivarEmergencia();
      return;
    }

    // Marcar emergencia como activa
    this.isEmergencyActive = true;

    // Obtener el botón SOS
    const sosButton = this.elementRef.nativeElement.querySelector('.sos-button');
    
    // Agregar clase de emergencia activa
    sosButton.classList.add('emergency-active');

    // Notificar al servicio de seguridad
    this.notificarSeguridad();

    // Mostrar mensaje de emergencia (puedes personalizar esto)
    alert('¡Emergencia activada! El equipo de seguridad ha sido notificado.');
  }

  // Método para desactivar la emergencia
  desactivarEmergencia() {
    this.isEmergencyActive = false;

    // Obtener el botón SOS
    const sosButton = this.elementRef.nativeElement.querySelector('.sos-button');
    
    // Remover clase de emergencia activa
    sosButton.classList.remove('emergency-active');
  }

  private notificarSeguridad() {
    // Agrega una nueva emergencia a la lista
    this.notificationService.addEmergency('Campus Principal');
    console.log('Notificando al equipo de seguridad...');
  }

  // Métodos de navegación
  navigateToChat() {
    this.router.navigate(['/user-chat']);
  }

  navigateToMap() {
    this.router.navigate(['/security-map']);
  }

  navigateToContacts() {
    this.router.navigate(['/contacto']); 
  }
}