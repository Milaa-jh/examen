import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Emergency {
  location: string;
  attended: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private emergenciesSubject = new BehaviorSubject<Emergency[]>([
    { location: 'Piso 1', attended: false, timestamp: new Date() },
    { location: 'Piso 2', attended: false, timestamp: new Date() }
  ]);

  constructor() {}

  // Método para obtener emergencias
  getEmergencies(): Observable<Emergency[]> {
    return this.emergenciesSubject.asObservable();
  }

  // Método para agregar emergencias
  addEmergency(location: string) {
    const currentEmergencies = this.emergenciesSubject.value;
    const newEmergency: Emergency = { 
      location: location, 
      attended: false, 
      timestamp: new Date() 
    };
    const updatedEmergencies = [newEmergency, ...currentEmergencies];
    this.emergenciesSubject.next(updatedEmergencies);
    console.log('Nueva emergencia agregada:', newEmergency);
  }

  // Método para marcar emergencia como atendida
  attendEmergency(index: number) {
    const currentEmergencies = this.emergenciesSubject.value;
    currentEmergencies[index].attended = true;
    this.emergenciesSubject.next([...currentEmergencies]);
  }
}