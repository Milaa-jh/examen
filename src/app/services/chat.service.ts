import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Mensaje {
  remitente: string;
  contenido: string;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioChatService {
  // Subject para almacenar y transmitir mensajes
  private mensajesSubject = new BehaviorSubject<Mensaje[]>([]);

  // Método para obtener los mensajes como Observable
  obtenerMensajes(): Observable<Mensaje[]> {
    return this.mensajesSubject.asObservable();
  }

  // Método para enviar un mensaje
  enviarMensaje(remitente: string, contenido: string) {
    const nuevoMensaje: Mensaje = {
      remitente,
      contenido,
      fecha: new Date()
    };

    // Obtener mensajes actuales y agregar el nuevo
    const mensajesActuales = this.mensajesSubject.value;
    this.mensajesSubject.next([...mensajesActuales, nuevoMensaje]);
  }

  // Método para limpiar todos los mensajes
  limpiarChat() {
    this.mensajesSubject.next([]);
  }
}