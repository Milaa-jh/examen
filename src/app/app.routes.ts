import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-selection',
    pathMatch: 'full',
  },
  {
    path: 'user-selection',
    loadComponent: () =>
      import('./user-selection/user-selection.page').then((m) => m.UserSelectionPage),
  },
  {
    path: 'user-login',
    loadComponent: () =>
      import('./user-login/user-login.page').then((m) => m.UserLoginPage),
  },
  {
    path: 'security-login',
    loadComponent: () =>
      import('./security-login/security-login.page').then((m) => m.SecurityLoginPage),
  },
  {
    path: 'user-home',
    loadComponent: () =>
      import('./user-home/user-home.page').then((m) => m.UserHomePage),
  },
  {
    path: 'security-home',
    loadComponent: () =>
      import('./security-home/security-home.page').then((m) => m.SecurityHomePage),
  },
  {
    path: 'user-chat',
    loadComponent: () =>
      import('./user-chat/user-chat.page').then((m) => m.ChatUsuarioPage),
  },
  {
    path: 'security-chat',
    loadComponent: () =>
      import('./security-chat/security-chat.page').then((m) => m.ChatSeguridadPage),
  },
  {
    path: 'security-map',
    loadComponent: () =>
      import('./security-map/security-map.page').then((m) => m.SecurityMapPage),
  },
  {
    path: 'security-emergency-list', // Nueva ruta para la lista de emergencias
    loadComponent: () =>
      import('./security-emergency-list/security-emergency-list.page').then(
        (m) => m.SecurityEmergencyListPage
      ),
  },
  {
    path: 'boton-sos',
    loadComponent: () => import('./boton-sos/boton-sos.page').then( m => m.BotonSosPage)
  },
  
  
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto.page').then( m => m.ContactoPage)
  },
  
];
