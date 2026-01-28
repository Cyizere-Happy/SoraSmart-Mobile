import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: `
    <div class="register-container">
      <div class="header-section">
        <div class="nav-bar anim-slide-down">
          <button class="back-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button class="signin-link" (click)="goToSignIn()">Sign In</button>
        </div>
        
        <div class="title-container">
          <h2 class="register-title anim-slide-left" style="animation-delay: 0.2s">Register</h2>
          <p class="register-subtitle anim-slide-left" style="animation-delay: 0.3s">
            Create an account to start collecting field data with soraSmart.
          </p>
        </div>
      </div>
      
      <div class="form-section anim-slide-up">
        <div class="form-scroll-content">
          <div class="form-card">
            <div class="input-group anim-slide-up" style="animation-delay: 0.5s">
              <input type="text" placeholder="Username" class="form-input">
            </div>
            <div class="input-group anim-slide-up" style="animation-delay: 0.6s">
              <input type="email" placeholder="Email Address" class="form-input">
            </div>
            <div class="input-group anim-slide-up" style="animation-delay: 0.7s">
              <input type="password" placeholder="Password" class="form-input">
            </div>
            <div class="input-group anim-slide-up" style="animation-delay: 0.8s">
              <input type="password" placeholder="Confirm Password" class="form-input">
            </div>
            
            <button class="btn-register anim-slide-up" style="animation-delay: 1s">Register</button>
          </div>
          
          <div class="terms-container anim-fade-in" style="animation-delay: 1.2s">
            <p class="terms-text">
              By registering, you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>.
            </p>
          </div>
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
      overflow: hidden;
      position: relative;
    }

    .header-section {
      padding: 60px 30px 30px 30px; /* Increased top padding to avoid overlap with device notch/status bar */
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .nav-bar {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .back-btn {
      color: var(--white);
      transition: transform 0.2s;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .back-btn:active { transform: scale(0.9); }

    .signin-link {
      font-weight: 500;
      font-size: 14px;
      color: var(--white);
    }

    .register-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 8px;
    }

    .register-subtitle {
      font-size: 14px;
      color: var(--white);
      opacity: 0.8;
      max-width: 90%;
      line-height: 1.4;
    }

    .form-section {
      flex: 1;
      background-color: white;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      box-shadow: 0 -10px 30px rgba(0,0,0,0.2);
      overflow: hidden; /* Container for the scrollable content */
      display: flex;
      flex-direction: column;
    }

    .form-scroll-content {
      flex: 1;
      overflow-y: auto; /* Enable scrolling within the white card */
      padding: 40px 30px;
      display: flex;
      flex-direction: column;
    }

    .form-card {
      display: flex;
      flex-direction: column;
      gap: 16px;
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

    .btn-register {
      background-color: var(--primary);
      color: var(--white);
      padding: 18px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 16px;
      margin-top: 5px;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .btn-register:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .terms-container {
      margin-top: auto;
      text-align: center;
      padding-top: 20px;
    }

    .terms-text {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .terms-text b {
      color: var(--primary);
    }

    /* Animations */
    .anim-fade-in { opacity: 0; animation: fadeIn 0.8s ease-out forwards; }
    .anim-slide-up { 
      opacity: 0;
      transform: translateY(30px);
      animation: slideUp 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) forwards; 
    }
    .anim-slide-down { 
      opacity: 0;
      transform: translateY(-20px);
      animation: slideDown 0.6s ease-out forwards; 
    }
    .anim-slide-left { 
      opacity: 0;
      transform: translateX(-30px);
      animation: slideLeft 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) forwards; 
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
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

  register() {
    // Navigate to dashboard after registration
    this.router.navigate(['/dashboard']);
  }
}
