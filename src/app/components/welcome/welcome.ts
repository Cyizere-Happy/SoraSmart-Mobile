import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  template: `
    <div class="welcome-container">
      <div class="top-section">
        <div class="logo-container">
          <div class="app-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              <path d="M9 14l2 2 4-4"></path>
            </svg>
          </div>
          <h1 class="brand-name">soraSmart</h1>
          <p class="brand-subtitle">SURVEY DATA COLLECTION</p>
        </div>
      </div>
      
      <div class="bottom-section">
        <h2 class="welcome-title">Welcome</h2>
        <p class="welcome-desc">
          Local authorities will use a mobile app to collect survey data directly from households, replacing the landlord self-declaration process.
        </p>
        
        <div class="button-group">
          <button class="btn btn-dark" (click)="goToSignIn()">Sign In</button>
          <button class="btn btn-white" (click)="goToRegister()">Sign Up</button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .welcome-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: white;
    }

    .top-section {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bottom-section {
      height: 45%;
      background-color: var(--primary);
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      padding: 40px 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .logo-container {
      text-align: center;
    }

    .app-icon {
      color: var(--primary);
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
    }

    .brand-name {
      font-size: 32px;
      font-weight: 700;
      color: var(--primary);
      margin: 0;
      line-height: 1;
    }

    .brand-subtitle {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 3px;
      color: var(--text-muted);
      margin: 2px 0 0 0;
      text-transform: uppercase;
    }

    .welcome-title {
      font-size: 28px;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 10px;
    }

    .welcome-desc {
      font-size: 14px;
      color: var(--white);
      opacity: 0.9;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .button-group {
      display: flex;
      gap: 15px;
    }

    .btn {
      flex: 1;
      padding: 15px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s;
    }

    .btn:active {
      transform: scale(0.98);
      opacity: 0.9;
    }

    .btn-dark {
      background-color: var(--white);
      color: var(--primary);
    }

    .btn-white {
      background-color: transparent;
      border: 1px solid var(--white);
      color: var(--white);
    }
  `,
})
export class Welcome {
  constructor(private router: Router) { }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
