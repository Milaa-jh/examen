import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user-selection',
  templateUrl: './user-selection.page.html',
  styleUrls: ['./user-selection.page.scss'],
  imports: [IonicModule, RouterModule],
})
export class UserSelectionPage {}
