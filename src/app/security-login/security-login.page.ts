import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DbService } from '../services/db.service';
import { NgIf } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-security-login',
  templateUrl: './security-login.page.html',
  styleUrls: ['./security-login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSpinner,
    IonIcon
  ]
})
export class SecurityLoginPage {
  loginData = {
    username: '',
    password: ''
  };
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private dbService: DbService,
    private toastController: ToastController
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  async login() {
    if (!this.loginData.username || !this.loginData.password) {
      await this.showToast('Por favor, complete todos los campos');
      return;
    }

    this.isLoading = true;
    try {
      // Verificar si el usuario existe en la lista de usuarios normales
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const isRegularUser = users.some((u: any) => 
        u.email === this.loginData.username || u.username === this.loginData.username
      );

      if (isRegularUser) {
        await this.showToast('Este usuario no tiene permisos de seguridad');
        return;
      }

      // Obtener lista de usuarios de seguridad
      const securityUsers = JSON.parse(localStorage.getItem('security_users') || '[]');
      const securityUser = securityUsers.find((u: any) => 
        u.username === this.loginData.username
      );

      if (securityUser) {
        // Usuario de seguridad existe, verificar contraseña
        if (securityUser.password === this.loginData.password) {
          await this.showToast('¡Bienvenido al Panel de Seguridad!', 'success');
          this.router.navigate(['/security-home']);
        } else {
          await this.showToast('Contraseña incorrecta');
        }
      } else {
        // Si el usuario no existe, lo registramos automáticamente
        const registered = this.registerSecurityUser(this.loginData.username, this.loginData.password);
        if (registered) {
          await this.showToast('Usuario de seguridad registrado exitosamente', 'success');
          this.router.navigate(['/security-home']);
        } else {
          await this.showToast('Error al registrar el usuario de seguridad');
        }
      }
    } catch (error) {
      console.error('Error durante el proceso de login:', error);
      await this.showToast('Error en el proceso de login');
    } finally {
      this.isLoading = false;
    }
  }

  private registerSecurityUser(username: string, password: string): boolean {
    try {
      const securityUsers = JSON.parse(localStorage.getItem('security_users') || '[]');
      
      // Verificar si ya existe
      const userExists = securityUsers.some((u: any) => u.username === username);
      
      if (userExists) {
        return false;
      }

      // Agregar nuevo usuario de seguridad
      securityUsers.push({
        username,
        password,
        role: 'security',
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('security_users', JSON.stringify(securityUsers));
      return true;
    } catch (error) {
      console.error('Error registering security user:', error);
      return false;
    }
  }
}