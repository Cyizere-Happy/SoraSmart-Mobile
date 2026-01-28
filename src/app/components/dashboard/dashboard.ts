import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-container">
      <div class="header">
        <h1 class="page-title">Dashboard</h1>
        <div class="header-actions">
          <button class="report-btn" (click)="goToReports()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
          <div class="profile-pic">MJ</div>
        </div>
      </div>

      <div class="scroll-content">
        <!-- Stats Grid -->
        <div class="stats-grid">
          <!-- Total Houses (Black Card) -->
          <div class="stat-card black-card anim-slide-up" style="animation-delay: 0.1s">
            <div class="stat-value">120</div>
            <div class="stat-label">Total Houses</div>
            <div class="progress-container">
              <div class="progress-bar dark">
                <div class="fill" style="width: 45%"></div>
              </div>
              <div class="progress-text">
                <span>0%</span>
                <span>45%</span>
              </div>
            </div>
          </div>

          <!-- Total Surveys (White Card) -->
          <div class="stat-card white-card anim-slide-up" style="animation-delay: 0.2s">
            <div class="stat-value">180</div>
            <div class="stat-label">Surveys Done</div>
            <div class="progress-container">
              <div class="progress-bar light">
                <div class="fill purple" style="width: 62%"></div>
              </div>
              <div class="progress-text">
                <span>0%</span>
                <span>62%</span>
              </div>
            </div>
          </div>

          <!-- Total Clients (White Card) -->
          <div class="stat-card white-card anim-slide-up" style="animation-delay: 0.3s">
            <div class="stat-value">240</div>
            <div class="stat-label">Active Agents</div>
            <div class="progress-container">
              <div class="progress-bar light">
                <div class="fill gray" style="width: 80%"></div>
              </div>
              <div class="progress-text">
                <span>0%</span>
                <span>80%</span>
              </div>
            </div>
          </div>

          <!-- Pending Tax (White Card) -->
          <div class="stat-card white-card anim-slide-up" style="animation-delay: 0.4s">
            <div class="stat-value">140</div>
            <div class="stat-label">Pending Tax</div>
            <div class="progress-container">
              <div class="progress-bar light">
                <div class="fill red" style="width: 85%"></div>
              </div>
              <div class="progress-text">
                <span>0%</span>
                <span>85%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Revenue/Activity Chart Section -->
        <div class="chart-section anim-slide-up" style="animation-delay: 0.5s">
          <div class="section-header">
            <h2>Activity</h2>
            <div class="toggle-group">
              <button class="toggle-btn">Monthly</button>
              <button class="toggle-btn active">Weekly</button>
              <button class="toggle-btn">Today</button>
            </div>
          </div>
          
          <!-- Mock Chart Visualization -->
          <div class="chart-container">
            <div class="y-axis">
              <span>20k</span>
              <span>15k</span>
              <span>10k</span>
              <span>0</span>
            </div>
            <div class="chart-bars">
              <div class="bar-group">
                <div class="bar black" style="height: 30%"></div>
                <div class="bar purple" style="height: 50%"></div>
                <span class="x-label">Jun 24</span>
              </div>
              <div class="bar-group">
                <div class="bar black" style="height: 40%"></div>
                <div class="bar purple" style="height: 60%"></div>
                <span class="x-label">Jun 25</span>
              </div>
              <div class="bar-group">
                <div class="bar black" style="height: 55%"></div>
                <div class="bar purple" style="height: 45%"></div>
                <span class="x-label">Jun 26</span>
              </div>
              <div class="bar-group">
                <div class="bar black" style="height: 35%"></div>
                <div class="bar purple" style="height: 70%"></div>
                <span class="x-label">Jun 27</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Registered Properties List -->
        <div class="list-section anim-slide-up" style="animation-delay: 0.6s">
          <div class="section-header">
            <h2>Registered Properties</h2>
            <button class="view-all-btn" (click)="goToMySurveys()">View All</button>
          </div>

          <div class="property-item" (click)="goToMySurveys()">
            <div class="property-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="property-details">
              <span class="property-address">KN 45 Ave, Kigali</span>
              <span class="property-owner">Marie Uwase</span>
            </div>
            <div class="property-rent">600,000 RWF</div>
            <span class="status-badge green">Registered</span>
          </div>

          <div class="property-item" (click)="goToMySurveys()">
            <div class="property-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="property-details">
              <span class="property-address">KN 89 Ave, Kigali</span>
              <span class="property-owner">Grace Imena</span>
            </div>
            <div class="property-rent">800,000 RWF</div>
            <span class="status-badge green">Registered</span>
          </div>
          
          <div class="property-item" (click)="goToMySurveys()">
            <div class="property-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="property-details">
              <span class="property-address">KG 123 St, Kigali</span>
              <span class="property-owner">Jean Mukasa</span>
            </div>
            <div class="property-rent">450,000 RWF</div>
            <span class="status-badge yellow">Pending</span>
          </div>

          <!-- Spacer for fixed bottom nav -->
          <div style="height: 80px"></div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="bottom-nav">
        <button class="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Dashboard</span>
        </button>
        
        <button class="nav-item" (click)="goToMap()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          <span>Map Scan</span>
        </button>
        
        <button class="nav-item" (click)="goToMySurveys()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>My Surveys</span>
        </button>
        
        <button class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span>Settings</span>
        </button>
      </div>
    </div>
  `,
  styles: `
    .analytics-container {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #F8F9FA;
      color: #1A1A1A;
    }

    .header {
      padding: 50px 25px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .page-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .report-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #EEE;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a1a1a;
    }

    .profile-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #000;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }

    .scroll-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px 25px;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 30px;
    }

    .stat-card {
      padding: 20px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }

    .black-card {
      background-color: #000;
      color: white;
    }

    .white-card {
      background-color: white;
      color: #1A1A1A;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .stat-label {
      font-size: 14px;
      opacity: 0.7;
      margin-bottom: 15px;
    }

    .progress-container {
      margin-top: auto;
    }

    .progress-bar {
      height: 6px;
      width: 100%;
      border-radius: 3px;
      margin-bottom: 8px;
      position: relative;
      overflow: hidden;
    }
    .progress-bar.dark { background: #333; }
    .progress-bar.light { background: #F0F0F0; }

    .fill { height: 100%; border-radius: 3px; }
    .black-card .fill { background: white; }
    .fill.purple { background: #E0E7FF; background-image: linear-gradient(to right, #C7D2FE, #818CF8); }
    .fill.gray { background: #E5E7EB; }
    .fill.red { background: #FECACA; }

    .progress-text {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      opacity: 0.7;
    }

    /* Chart Section */
    .chart-section {
      margin-bottom: 30px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .section-header h2 {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }

    .view-all-btn {
      font-size: 12px;
      color: #FFB800;
      font-weight: 600;
      background: transparent;
      border: none;
    }

    .toggle-group {
      background: white;
      padding: 4px;
      border-radius: 20px;
      display: flex;
      gap: 5px;
    }

    .toggle-btn {
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      background: transparent;
      color: #999;
      border: none;
    }

    .toggle-btn.active {
      background: #000;
      color: white;
    }

    .chart-container {
      background: white;
      padding: 20px;
      border-radius: 20px;
      display: flex;
      gap: 15px;
      height: 200px;
    }

    .y-axis {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 10px;
      color: #999;
      padding-bottom: 20px;
    }

    .chart-bars {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      padding-bottom: 20px;
      position: relative;
    }

    .bar-group {
      display: flex;
      gap: 6px;
      height: 100%;
      align-items: flex-end;
      position: relative;
    }

    .bar {
      width: 12px;
      border-radius: 6px;
    }

    .bar.black { background: #000; }
    .bar.purple { background: #C7D2FE; }

    .x-label {
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: #999;
      white-space: nowrap;
    }

    /* Property List */
    .property-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background: white;
      border-radius: 16px;
      gap: 12px;
      margin-bottom: 12px;
      cursor: pointer;
    }

    .property-icon {
      width: 45px;
      height: 45px;
      border-radius: 12px;
      background: #F5F5F5;
      color: #FFB800;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .property-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .property-address {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .property-owner {
      font-size: 12px;
      color: #999;
    }

    .property-rent {
      font-weight: 700;
      font-size: 13px;
      margin-right: 10px;
      color: #333;
    }

    .status-badge {
      font-size: 10px;
      padding: 6px 10px;
      border-radius: 10px;
      font-weight: 600;
    }

    .status-badge.green {
      background: #E8F5E9;
      color: #4CAF50;
    }

    .status-badge.yellow {
      background: #FFF9E6;
      color: #FFB800;
    }

    /* Bottom Nav */
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      padding: 15px 25px 25px;
      display: flex;
      justify-content: space-between;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      z-index: 100;
      box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      color: #666;
      background: transparent;
      border: none;
      cursor: pointer;
    }
    
    .nav-item.active {
      color: white;
    }

    .nav-item span {
      font-size: 10px;
      font-weight: 500;
    }

    /* Animations */
    .anim-slide-up { 
      animation: slideUp 0.6s cubic-bezier(0.2, 0.6, 0.2, 1) forwards;
      opacity: 0;
      transform: translateY(20px);
    }

    @keyframes slideUp {
      to { opacity: 1; transform: translateY(0); }
    }
  `
})
export class Dashboard {
  constructor(private router: Router) { }

  goToMap() {
    this.router.navigate(['/map-view']);
  }

  goToReports() {
    this.router.navigate(['/reports']);
  }

  goToMySurveys() {
    this.router.navigate(['/my-surveys']);
  }
}
