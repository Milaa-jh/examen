import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Component({
  standalone: true,
  selector: 'app-security-emergency-list',
  templateUrl: './security-emergency-list.page.html',
  styleUrls: ['./security-emergency-list.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class SecurityEmergencyListPage implements OnInit, OnDestroy {
  emergencies: { location: string; attended: boolean; timestamp: Date }[] = [];
  emergencySubscription: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Suscribirse para obtener las emergencias
    this.emergencySubscription = this.notificationService.getEmergencies().subscribe((data) => {
      this.emergencies = data;
    });
  }

  // Marcar emergencia como atendida
  attendEmergency(index: number) {
    this.notificationService.attendEmergency(index);
  }

  ngOnDestroy() {
    if (this.emergencySubscription) {
      this.emergencySubscription.unsubscribe();
    }
  }
}