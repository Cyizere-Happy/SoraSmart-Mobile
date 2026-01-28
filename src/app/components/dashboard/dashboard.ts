import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Map Background Layer -->
      <div class="map-layer">
        <!-- Placeholder for Map Visualization -->
        <div class="map-grid">
          <!-- Horizontal Streets -->
          <div class="street h-street" style="top: 20%"></div>
          <div class="street h-street" style="top: 45%"></div>
          <div class="street h-street" style="top: 70%"></div>
          
          <!-- Vertical Streets -->
          <div class="street v-street" style="left: 30%"></div>
          <div class="street v-street" style="left: 60%"></div>
          <div class="street v-street" style="left: 80%"></div>
          
          <!-- Diagonal Streets -->
          <div class="street d-street" style="top: 10%; left: 10%"></div>
          
          <!-- Buildings/Blocks (Stylized) -->
          <div class="block" style="top: 25%; left: 35%"></div>
          <div class="block" style="top: 50%; left: 10%"></div>
          <div class="block" style="top: 50%; left: 65%"></div>
          
          <!-- Interactive Pins -->
          <button class="map-pin registered" style="top: 43%; left: 58%" (click)="openRegistration()">
            <div class="pin-pulse"></div>
            <div class="pin-inner"></div>
          </button>
          
          <button class="map-pin unregistered" style="top: 28%; left: 32%">
            <div class="pin-inner"></div>
          </button>
          
          <button class="map-pin current-location" style="top: 65%; left: 45%">
            <div class="pulse-ring"></div>
            <div class="location-dot"></div>
          </button>
        </div>
      </div>

      <!-- Header Overlay -->
      <div class="map-header anim-slide-down">
        <button class="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div class="header-title">Survey Map</div>
        <div class="profile-pic"></div>
      </div>

      <!-- Logic Flow: Modal -> Registration -> Tax Details -->

      <!-- 1. Location Permission Modal -->
      <div *ngIf="showLocationModal" class="modal-overlay anim-fade-in">
        <div class="modal-card anim-scale-up">
          <div class="modal-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3>Allow Your Location</h3>
          <p>We need your location to verify house coordinates for accurate survey data collection.</p>
          <button class="btn-primary" (click)="allowLocation()">Ok, sure</button>
          <button class="btn-text" (click)="skipLocation()">Not Now</button>
        </div>
      </div>

      <!-- 2. House Registration Bottom Sheet -->
      <div *ngIf="showRegistrationSheet" class="bottom-sheet anim-slide-up">
        <div class="sheet-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title-group">
            <h3>House Registration</h3>
            <span class="status-badge">Unassessed</span>
          </div>
          <button class="close-btn" (click)="closeSheets()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="sheet-content">
          <div class="location-info">
            <div class="info-row">
              <div class="dot green"></div>
              <div class="info-text">
                <span class="label">Coordinates</span>
                <span class="value">-1.9441° S, 30.0619° E</span>
              </div>
            </div>
            <div class="info-divider"></div>
            <div class="info-row">
              <div class="dot orange"></div>
              <div class="info-text">
                <span class="label">House Tag</span>
                <span class="value">Pending Tagging</span>
              </div>
              <button class="action-icon-btn">+</button>
            </div>
          </div>

          <div class="section-title">Ownership Status</div>
          <div class="card-options">
            <div class="option-card selected">
              <div class="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div class="option-details">
                <span class="opt-title">Residential</span>
                <span class="opt-sub">Occupied</span>
              </div>
            </div>
            <div class="option-card">
              <div class="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div class="option-details">
                <span class="opt-title">Commercial</span>
                <span class="opt-sub">Business</span>
              </div>
            </div>
          </div>

          <button class="btn-primary full-width" (click)="proceedToTax()">
            Proceed to Assessment
          </button>
        </div>
      </div>

      <!-- 3. Tax Details Bottom Sheet -->
      <div *ngIf="showTaxSheet" class="bottom-sheet anim-slide-up">
        <div class="sheet-handle"></div>
        <div class="sheet-header">
          <button class="back-icon-btn" (click)="backToRegistration()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h3>Tax Assessment</h3>
        </div>

        <div class="sheet-content">
          <div class="form-group">
            <label>Payment Method</label>
            <div class="radio-card selected">
              <div class="radio-label">
                <div class="icon-circle green">$</div>
                <span>Cash Payment</span>
              </div>
              <div class="radio-indicator"></div>
            </div>
          </div>

          <div class="form-group">
            <label>More Payment Ways</label>
            <div class="radio-card">
              <div class="radio-label">
                <div class="icon-circle blue">P</div>
                <span>Mobile Money</span>
              </div>
              <div class="radio-circle"></div>
            </div>
            <div class="radio-card">
              <div class="radio-label">
                <div class="icon-circle dark">B</div>
                <span>Bank Transfer</span>
              </div>
              <div class="radio-circle"></div>
            </div>
          </div>

          <button class="btn-dashed">
            + Add New Method
          </button>

          <button class="btn-primary full-width mt-auto" (click)="confirmSubmission()">
            Confirm Assessment
          </button>
        </div>
      </div>

    </div>
  `,
  styles: `
    .dashboard-container {
      width: 100vw;
      height: 100vh;
      background-color: #121212; /* Dark map bg */
      position: relative;
      overflow: hidden;
      color: var(--primary);
    }

    /* Map Visualization */
    .map-layer {
      position: absolute;
      inset: 0;
      opacity: 0.8;
    }
    .map-grid {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .street {
      position: absolute;
      background-color: #2C2C2C;
    }
    .h-street { width: 100%; height: 20px; }
    .v-street { height: 100%; width: 20px; }
    .d-street { width: 150%; height: 20px; transform: rotate(45deg); transform-origin: 0 0; }
    
    .block {
      position: absolute;
      width: 100px;
      height: 80px;
      background-color: #1E1E1E;
      border-radius: 4px;
    }

    .map-pin {
      position: absolute;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translate(-50%, -50%);
    }

    .pin-inner {
      width: 16px;
      height: 16px;
      background-color: #4CAF50;
      border: 2px solid white;
      border-radius: 50%;
      position: relative;
      z-index: 2;
    }

    .unregistered .pin-inner {
      background-color: #FF5252;
    }

    .pin-pulse {
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: rgba(76, 175, 80, 0.3);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .current-location .location-dot {
      width: 12px;
      height: 12px;
      background-color: #2196F3;
      border: 2px solid white;
      border-radius: 50%;
      position: relative;
      z-index: 2;
    }
    .current-location .pulse-ring {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: rgba(33, 150, 243, 0.2);
      border-radius: 50%;
    }

    /* Header */
    .map-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 50px 20px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
    }
    .menu-btn {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    .header-title {
      font-weight: 600;
      color: white;
      font-size: 18px;
    }
    .profile-pic {
      width: 40px;
      height: 40px;
      background-color: #ccc;
      border-radius: 50%;
      border: 2px solid white;
    }

    /* Bottom Sheets & Modals */
    .modal-overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 40px;
      z-index: 100;
      backdrop-filter: blur(2px);
    }

    .modal-card {
      background: white;
      width: 90%;
      padding: 30px;
      border-radius: 24px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    .modal-icon {
      width: 40px;
      height: 40px;
      margin: 0 auto 15px;
      color: #4CAF50;
    }

    .modal-card h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .modal-card p {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 25px;
      line-height: 1.5;
    }

    .btn-primary {
      width: 100%;
      padding: 16px;
      background-color: #4CAF50;
      color: white;
      border-radius: 30px;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .btn-text {
      width: 100%;
      padding: 10px;
      color: var(--text-muted);
      font-weight: 500;
      font-size: 14px;
    }

    .bottom-sheet {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      padding: 20px;
      box-shadow: 0 -5px 30px rgba(0,0,0,0.2);
      z-index: 50;
      max-height: 85vh;
      overflow-y: auto;
    }

    .sheet-handle {
      width: 40px;
      height: 4px;
      background-color: #E0E0E0;
      border-radius: 2px;
      margin: 0 auto 20px;
    }

    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 25px;
    }

    .sheet-title-group h3 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .status-badge {
      font-size: 12px;
      background-color: #FFF3E0;
      color: #FF9800;
      padding: 4px 8px;
      border-radius: 12px;
      font-weight: 600;
    }

    .back-icon-btn, .close-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .location-info {
      background-color: #F9F9F9;
      border-radius: 16px;
      padding: 15px;
      margin-bottom: 25px;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .info-divider {
      height: 1px;
      background-color: #EEE;
      margin: 15px 0 15px 12px;
    }

    .dot { width: 8px; height: 8px; border-radius: 50%; }
    .green { background: #4CAF50; }
    .orange { background: #FF9800; }

    .info-text {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .label { font-size: 12px; color: #999; }
    .value { font-size: 14px; font-weight: 500; }

    .action-icon-btn {
      width: 30px;
      height: 30px;
      background: #4CAF50;
      color: white;
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .card-options {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
      overflow-x: auto;
      padding-bottom: 5px;
    }

    .option-card {
      min-width: 140px;
      border: 1px solid #EEE;
      border-radius: 16px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-card.selected {
      border-color: #4CAF50;
      background-color: #F1F8E9;
    }

    .icon-box {
      width: 40px;
      height: 40px;
      background: #F5F5F5;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .opt-title { font-weight: 600; font-size: 14px; }
    .opt-sub { font-size: 12px; color: #999; }

    .radio-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border: 1px solid #EEE;
      border-radius: 16px;
      margin-bottom: 15px;
    }
    .radio-card.selected {
      background-color: #F9F9F9;
      border-color: #EEE;
    }

    .radio-label {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .icon-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #EEE;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }
    .icon-circle.green { background: #E8F5E9; color: #4CAF50; }
    .icon-circle.blue { background: #E3F2FD; color: #2196F3; }
    .icon-circle.dark { background: #ECEFF1; color: #455A64; }

    .radio-indicator {
      width: 16px;
      height: 16px;
      border: 4px solid #4CAF50;
      border-radius: 50%;
    }

    .radio-circle {
      width: 16px;
      height: 16px;
      border: 1px solid #CCC;
      border-radius: 50%;
    }

    .btn-dashed {
      width: 100%;
      padding: 15px;
      border: 1px dashed #4CAF50;
      color: #4CAF50;
      background: #F1F8E9;
      border-radius: 16px;
      font-weight: 600;
      margin: 10px 0 25px;
    }

    .full-width { width: 100%; }
    .mt-auto { margin-top: auto; }

    /* Animations */
    .anim-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    .anim-scale-up { animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    .anim-slide-up { animation: slideUp 0.4s cubic-bezier(0.2, 0.6, 0.2, 1) forwards; }
    .anim-slide-down { animation: slideDown 0.4s ease-out forwards; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
    @keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2); opacity: 0; } }
  `
})
export class Dashboard {
  showLocationModal = true;
  showRegistrationSheet = false;
  showTaxSheet = false;

  allowLocation() {
    this.showLocationModal = false;
  }

  skipLocation() {
    this.showLocationModal = false;
  }

  openRegistration() {
    this.showRegistrationSheet = true;
  }

  closeSheets() {
    this.showRegistrationSheet = false;
    this.showTaxSheet = false;
  }

  proceedToTax() {
    this.showRegistrationSheet = false;
    this.showTaxSheet = true;
  }

  backToRegistration() {
    this.showTaxSheet = false;
    this.showRegistrationSheet = true;
  }

  confirmSubmission() {
    this.showTaxSheet = false;
    // Reset or show success
    alert('Assessment Submitted Successfully!');
  }
}
