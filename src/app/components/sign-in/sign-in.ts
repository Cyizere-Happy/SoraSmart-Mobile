import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  template: `
    <div class="signin-container">
      <div class="header-section">
        <div class="nav-bar">
          <button class="back-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button class="register-link" (click)="goToRegister()">Register</button>
        </div>
        
        <div class="title-container">
          <h2 class="signin-title">Sign In</h2>
          <p class="signin-subtitle">
            Enter your credentials to access the soraSmart survey portal.
          </p>
        </div>
      </div>
      
      <div class="form-section">
        <div class="form-card">
          <div class="input-group">
            <input type="text" placeholder="Username" class="form-input">
          </div>
          <div class="input-group">
            <input type="password" placeholder="Password" class="form-input">
          </div>
          <div class="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          
          <button class="btn-signin">Sign In</button>
        </div>
        
        <div class="social-login">
          <button class="social-btn">
            <div class="social-content">
              <span class="social-icon google">G</span>
              <span class="social-text">Continue with Google</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          
          <button class="social-btn">
            <div class="social-content">
              <span class="social-icon facebook">f</span>
              <span class="social-text">Continue with Facebook</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .signin-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--primary);
    }

    .header-section {
      height: 30%;
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .back-btn {
      color: var(--white);
    }

    .register-link {
      font-weight: 500;
      font-size: 14px;
      color: var(--white);
    }

    .signin-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 5px;
    }

    .signin-subtitle {
      font-size: 14px;
      color: var(--white);
      opacity: 0.8;
      max-width: 80%;
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
      padding: 18px 25px;
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

    .forgot-password {
      text-align: right;
      padding-right: 10px;
    }

    .forgot-password a {
      font-size: 12px;
      font-weight: 500;
      color: var(--primary);
    }

    .btn-signin {
      background-color: var(--primary);
      color: var(--white);
      padding: 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 16px;
      margin-top: 10px;
    }

    .social-login {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .social-btn {
      width: 100%;
      padding: 12px 25px;
      border: 1px solid var(--gray-medium);
      border-radius: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
    }

    .social-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .social-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 18px;
    }

    .google {
      color: #DB4437;
    }

    .facebook {
      color: #4267B2;
    }

    .social-text {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary);
    }
  `,
})
export class SignIn {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
