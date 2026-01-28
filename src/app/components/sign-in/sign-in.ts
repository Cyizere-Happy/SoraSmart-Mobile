import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  template: `
    <div class="signin-container">
      <div class="header-section">
        <div class="nav-bar anim-slide-down">
          <button class="back-btn" (click)="goBack()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button class="register-link" (click)="goToRegister()">Register</button>
        </div>
        
        <div class="title-container">
          <h2 class="signin-title anim-slide-left" style="animation-delay: 0.2s">Sign In</h2>
          <p class="signin-subtitle anim-slide-left" style="animation-delay: 0.3s">
            Enter your credentials to access the soraSmart survey portal.
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
              <input type="password" placeholder="Password" class="form-input">
            </div>
            <div class="forgot-password anim-fade-in" style="animation-delay: 0.8s">
              <a href="#">Forgot Password?</a>
            </div>
            
            <button class="btn-signin anim-slide-up" style="animation-delay: 0.9s" (click)="signIn()">Sign In</button>
          </div>
          
          <div class="social-login">
            <button class="social-btn anim-slide-up" style="animation-delay: 1.1s">
              <div class="social-content">
                <span class="social-icon google">G</span>
                <span class="social-text">Continue with Google</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            
            <button class="social-btn anim-slide-up" style="animation-delay: 1.2s">
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
    </div>
  `,
  styles: `
    .signin-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--primary);
      overflow: hidden;
      position: relative;
    }

    .header-section {
      padding: 60px 30px 30px 30px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .nav-bar {
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

    .register-link {
      font-weight: 500;
      font-size: 14px;
      color: var(--white);
    }

    .signin-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--white);
      margin-bottom: 8px;
    }

    .signin-subtitle {
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
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .form-scroll-content {
      flex: 1;
      overflow-y: auto;
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
      transform: translateY(-2px);
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
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .btn-signin:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .social-login {
      margin-top: auto;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding-bottom: 20px;
    }

    .social-btn {
      width: 100%;
      padding: 15px 25px;
      border: 1px solid var(--gray-medium);
      border-radius: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      transition: all 0.2s;
    }

    .social-btn:hover { background-color: var(--gray-light); }

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

    .google { color: #DB4437; }
    .facebook { color: #4267B2; }

    .social-text {
      font-size: 14px;
      font-weight: 500;
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
export class SignIn {
  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  signIn() {
    this.router.navigate(['/dashboard']);
  }
}
