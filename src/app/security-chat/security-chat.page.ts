import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioChatService, Mensaje } from '../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-seguridad',
  templateUrl: './security-chat.page.html',
  styleUrls: ['./security-chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatSeguridadPage implements OnInit, OnDestroy {
  mensajes: Mensaje[] = [];
  newMessage: string = '';
  private suscripcionMensajes: Subscription | null = null;

  // Respuestas predefinidas de seguridad
  private respuestasBot = [
    'Un equipo de seguridad está en camino a tu ubicación.',
    'Por favor, mantente en un lugar seguro.',
    'Estamos monitoreando tu situación.',
    'Personal de seguridad ha sido notificado.',
    'Mantén la calma y sigue nuestras instrucciones.'
  ];

  constructor(private servicioChat: ServicioChatService) {}

  ngOnInit() {
    // Suscribirse a los mensajes
    this.suscripcionMensajes = this.servicioChat.obtenerMensajes().subscribe(
      mensajes => this.mensajes = mensajes
    );
  }

  ngOnDestroy() {
    // Limpiar suscripción para evitar memory leaks
    if (this.suscripcionMensajes) {
      this.suscripcionMensajes.unsubscribe();
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Enviar mensaje como seguridad
      this.servicioChat.enviarMensaje('Seguridad', this.newMessage);
      
      // Limpiar el input
      this.newMessage = '';
    }
  }

  // Método para obtener una respuesta aleatoria de bot
  private obtenerRespuestaAleatoria(): string {
    return this.respuestasBot[Math.floor(Math.random() * this.respuestasBot.length)];
  }
}