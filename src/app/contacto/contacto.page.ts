import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';

export interface EmergencyContact {
  id?: string;
  name: string;
  phone: string;
  type: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule
  ]
})
export class ContactoPage implements OnInit {
  searchTerm: string = '';
  contacts: EmergencyContact[] = [
    { id: '1', name: 'Seguridad DUOC', phone: '1111111111', type: 'Seguridad' },
    { id: '2', name: 'Ambulancia', phone: '131', type: 'Médico' },
    { id: '3', name: 'Bomberos', phone: '132', type: 'Emergencia' },
    { id: '4', name: 'Carabineros', phone: '133', type: 'Policía' },
    { id: '5', name: 'PDI', phone: '134', type: 'Policía' },
  ];
  
  filteredContacts: EmergencyContact[] = [];

  constructor(private alertController: AlertController) {
    this.filteredContacts = [...this.contacts];
  }

  ngOnInit() {}

  // Alerta para agregar un nuevo contacto
  async presentAddContactAlert() {
    const alert = await this.alertController.create({
      header: 'Agregar Contacto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Teléfono'
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Seguridad',
          value: 'Seguridad',
          checked: true
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Médico',
          value: 'Médico'
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Emergencia',
          value: 'Emergencia'
        },
        {
          name: 'type',
          type: 'radio',
          label: 'Policía',
          value: 'Policía'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (this.validateContactData(data)) {
              this.addContact(data);
              return true;
            }
            return false;
          }
        }
      ]
    });

    await alert.present();
  }

  // Validación de los datos ingresados
  private validateContactData(data: any): boolean {
    return !!(data.name && data.phone && data.type);
  }

  // Agregar un nuevo contacto a la lista
  private addContact(contactData: EmergencyContact) {
    const newContact = {
      ...contactData,
      id: this.generateUniqueId()
    };

    this.contacts.push(newContact);
    this.filteredContacts = [...this.contacts];
  }

  // Generar ID único para el nuevo contacto
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Filtrar contactos según el término de búsqueda
  filterContacts(event: any) {
    const searchValue = event.detail.value?.toLowerCase() || '';
    
    if (!searchValue.trim()) {
      this.filteredContacts = [...this.contacts];
      return;
    }

    this.filteredContacts = this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchValue) ||
      contact.phone.includes(searchValue) ||
      contact.type.toLowerCase().includes(searchValue)
    );
  }

  // Llamar al número del contacto
  callNumber(phone: string) {
    window.open(`tel:${phone.replace(/[^0-9]/g, '')}`);
  }

  // Obtener el icono adecuado según el tipo de contacto
  getContactIcon(type: string): string {
    switch(type.toLowerCase()) {
      case 'seguridad': return 'shield-outline';
      case 'médico': return 'medical-outline';
      case 'emergencia': return 'alert-circle-outline';
      case 'policía': return 'lock-closed-outline';
      default: return 'call-outline';
    }
  }
}
