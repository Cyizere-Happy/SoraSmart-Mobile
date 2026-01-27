import { Routes } from '@angular/router';
import { SplashScreen } from './components/splash-screen/splash-screen';
import { Welcome } from './components/welcome/welcome';
import { SignIn } from './components/sign-in/sign-in';
import { Register } from './components/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'splash', pathMatch: 'full' },
    { path: 'splash', component: SplashScreen },
    { path: 'welcome', component: Welcome },
    { path: 'signin', component: SignIn },
    { path: 'register', component: Register },
    { path: '**', redirectTo: 'splash' }
];
