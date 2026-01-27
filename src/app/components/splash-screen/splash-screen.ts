import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  template: `
    <div class="splash-container">
      <div class="circle top-right"></div>
      <div class="circle bottom-left"></div>
      
      <div class="logo-container">
        <div class="app-icon">
          <!-- Survey/Clipboard Icon -->
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <path d="M9 14l2 2 4-4"></path>
          </svg>
        </div>
        <h1 class="brand-name">soraSmart</h1>
        <p class="brand-subtitle">SURVEY DATA COLLECTION</p>
      </div>
    </div>
  `,
  styles: `
    .splash-container {
      width: 100vw;
      height: 100vh;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    .circle {
      position: absolute;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background-color: var(--primary);
      opacity: 0;
      animation: circleReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .top-right {
      top: -100px;
      right: -100px;
      animation-delay: 0.1s;
    }

    .bottom-left {
      bottom: -100px;
      left: -150px;
      animation-delay: 0.3s;
    }

    .logo-container {
      text-align: center;
      z-index: 10;
    }

    .app-icon {
      color: var(--primary);
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      opacity: 0;
      transform: scale(0.5);
      animation: iconPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      animation-delay: 0.5s;
    }

    .brand-name {
      font-size: 48px;
      font-weight: 700;
      color: var(--primary);
      margin: 0;
      line-height: 1;
      opacity: 0;
      transform: translateY(20px);
      animation: slideFadeUp 0.6s ease-out forwards;
      animation-delay: 0.8s;
    }

    .brand-subtitle {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 4px;
      color: var(--text-muted);
      margin: 10px 0 0 0;
      text-transform: uppercase;
      opacity: 0;
      transform: translateY(10px);
      animation: slideFadeUp 0.6s ease-out forwards;
      animation-delay: 1s;
    }

    @keyframes circleReveal {
      from { 
        opacity: 0;
        transform: scale(0.2);
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes iconPop {
      from { 
        opacity: 0;
        transform: scale(0.5);
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes slideFadeUp {
      from { 
        opacity: 0;
        transform: translateY(20px);
      }
      to { 
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export class SplashScreen implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/welcome']);
    }, 3500); // Extended slightly to let animations finish
  }
}
