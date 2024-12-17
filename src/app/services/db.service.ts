import { Injectable } from '@angular/core';

export interface User {
  email: string;
  password: string;
}

export interface Contact {
  name: string;
  phone: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly USERS_KEY = 'users';
  private readonly CONTACTS_KEY = 'contacts';
  private currentUser: User | null = null;

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage() {
    // Inicializar usuarios si no existe
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }

    // Inicializar contactos si no existe
    if (!localStorage.getItem(this.CONTACTS_KEY)) {
      const defaultContacts = [
        { name: 'Seguridad DUOC', phone: '1111111111', type: 'Seguridad' },
        { name: 'Ambulancia', phone: '131', type: 'Médico' },
        { name: 'Bomberos', phone: '132', type: 'Emergencia' },
        { name: 'Carabineros', phone: '133', type: 'Policía' },
        { name: 'PDI', phone: '134', type: 'Policía' }
      ];
      localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(defaultContacts));
    }
  }

  // Autenticación
  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    
    if (users.some(u => u.email === email)) {
      return false;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Gestión de contactos
  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.CONTACTS_KEY) || '[]');
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
  }

  deleteContact(index: number): void {
    const contacts = this.getContacts();
    contacts.splice(index, 1);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
  }
}