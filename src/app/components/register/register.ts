import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: `
    <div class="register-container">
      <div class="header-section">
        <div class="nav-bar">
          <button class="back-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button class="signin-link" (click)="goToSignIn()">Sign In</button>
        </div>
        
        <div class="title-container">
          <h2 class="register-title">Register</h2>
          <p class="register-subtitle">
            Create an account to start collecting field data with soraSmart.
          </p>
        </div>
      </div>
      
      <div class="form-section">
        <div class="form-card">
          <div class="input-group">
            <input type="text" placeholder="Username" class="form-input">
          </div>
          <div class="input-group">
            <input type="email" placeholder="Email Address" class="form-input">
          </div>
          <div class="input-group">
            <input type="password" placeholder="Password" class="form-input">
          </div>
          <div class="input-group">
            <input type="password" placeholder="Confirm Password" class="form-input">
          </div>
          
          <button class="btn-register">Register</button>
        </div>
        
        <div class="terms-container">
          <p class="terms-text">
            By registering, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: `
    .register-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--primary);
    }

    .header-section {
      height: 25%;
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .back-btn {
      color: var(--white);
    }

    .signin-link {
      font-weight: 500;
      font-size: 14px;
      color: var(--white);
    }

    .register-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 5px;
    }

    .register-subtitle {
      font-size: 14px;
      color: var(--white);
      opacity: 0.8;
      max-width: 85%;
    }

    .form-section {
      flex: 1;
      background-color: white;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      padding: 40px 30px;
      box-shadow: 0 -10px 20px rgba(0,0,0,0.1);
    }

    .form-card {
      background-color: white;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
    }

    .form-input {
      width: 100%;
      padding: 16px 25px;
      background-color: var(--gray-light);
      border-radius: 30px;
      border: 1px solid var(--gray-medium);
      font-size: 14px;
      color: var(--primary);
      transition: all 0.3s ease;
    }

    .form-input:focus {
      border-color: var(--primary);
      background-color: var(--white);
      box-shadow: 0 0 0 4px rgba(26, 26, 26, 0.05);
    }

    .form-input::placeholder {
      color: #999;
    }

    .btn-register {
      background-color: var(--primary);
      color: var(--white);
      padding: 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 16px;
      margin-top: 5px;
      transition: all 0.2s;
    }

    .btn-register:active {
      transform: scale(0.98);
    }

    .terms-container {
      text-align: center;
      padding: 0 10px;
    }

    .terms-text {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .terms-text b {
      color: var(--primary);
    }
  `,
})
export class Register {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  goToSignIn() {
    this.router.navigate(['/signin']);
  }

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
