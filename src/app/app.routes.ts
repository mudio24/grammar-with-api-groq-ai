import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Import AuthGuard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirect default ke login
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard] // Lindungi route home dengan AuthGuard
  },
  {
    path: 'random-user',
    loadComponent: () => import('./random-user/random-user.page').then(m => m.RandomUserPage),
    canActivate: [AuthGuard] // Lindungi route random-user juga (opsional, tapi disarankan)
  },
];
