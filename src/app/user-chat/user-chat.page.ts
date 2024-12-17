import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioChatService, Mensaje } from '../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-usuario',
  templateUrl: './user-chat.page.html',
  styleUrls: ['./user-chat.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChatUsuarioPage implements OnInit, OnDestroy {
  mensajes: Mensaje[] = [];
  mensaje: string = '';
  private suscripcionMensajes: Subscription | null = null;

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

  enviarMensaje() {
    if (this.mensaje.trim()) {
      // Enviar mensaje como usuario
      this.servicioChat.enviarMensaje('Usuario', this.mensaje);
      
      // Limpiar el input
      this.mensaje = '';
    }
  }
}