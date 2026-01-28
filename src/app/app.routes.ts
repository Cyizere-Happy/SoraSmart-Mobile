import { Routes } from '@angular/router';
import { SplashScreen } from './components/splash-screen/splash-screen';
import { Welcome } from './components/welcome/welcome';
import { SignIn } from './components/sign-in/sign-in';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { MapView } from './components/map-view/map-view';

export const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full' },
    { path: 'splash', component: SplashScreen },
    { path: 'welcome', component: Welcome },
    { path: 'signin', component: SignIn },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: 'map-view', component: MapView },
    { path: '**', redirectTo: 'splash' }
];
