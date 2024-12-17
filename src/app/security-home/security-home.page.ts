import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-security-home',
  templateUrl: './security-home.page.html',
  styleUrls: ['./security-home.page.scss'],
  imports: [IonicModule, RouterModule, CommonModule],
})
export class SecurityHomePage {
  constructor() {}
}