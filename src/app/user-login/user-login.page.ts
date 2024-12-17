import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DbService } from '../services/db.service';
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
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
  standalone: true,
  imports: [
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
    FormsModule
  ]
})
export class UserLoginPage implements OnInit {
  loginData = { email: '', password: '' };
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private dbService: DbService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  async login() {
    if (!this.loginData.email || !this.loginData.password) {
      await this.showToast('Por favor, complete todos los campos');
      return;
    }

    this.isLoading = true;
    try {
      // Intentar hacer login primero
      const loginSuccess = this.dbService.login(this.loginData.email, this.loginData.password);
      
      if (loginSuccess) {
        // Usuario existe y contraseña correcta
        await this.showToast('¡Bienvenido!');
        this.router.navigate(['/boton-sos']);
      } else {
        // Verificar si el usuario existe
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((u: any) => u.email === this.loginData.email);

        if (userExists) {
          // Usuario existe pero contraseña incorrecta
          await this.showToast('Contraseña incorrecta');
        } else {
          // Usuario no existe, registrar automáticamente
          const registerSuccess = this.dbService.register(this.loginData.email, this.loginData.password);
          if (registerSuccess) {
            // Login automático después del registro
            this.dbService.login(this.loginData.email, this.loginData.password);
            await this.showToast('Usuario registrado y conectado automáticamente. ¡Bienvenido!');
            this.router.navigate(['/boton-sos']);
          } else {
            await this.showToast('Error al registrar el usuario');
          }
        }
      }
    } catch (error) {
      console.error('Error during login process:', error);
      await this.showToast('Error en el proceso de login');
    } finally {
      this.isLoading = false;
    }
  }
}