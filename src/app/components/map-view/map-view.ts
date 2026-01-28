import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Property {
  id: number;
  lat: string;
  lng: string;
  address: string;
  status: 'registered' | 'pending' | 'unregistered';
  owner?: string;
  monthlyRent?: number;
}

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="map-container">
      <!-- Improved Map Background -->
      <div class="map-layer">
        <!-- Grid pattern for realistic map look -->
        <svg class="map-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2a2a2a" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          <!-- Roads -->
          <path d="M 0 30 L 100 30" stroke="#3a3a3a" stroke-width="2"/>
          <path d="M 0 60 L 100 60" stroke="#3a3a3a" stroke-width="2"/>
          <path d="M 30 0 L 30 100" stroke="#3a3a3a" stroke-width="2"/>
          <path d="M 70 0 L 70 100" stroke="#3a3a3a" stroke-width="2"/>
        </svg>

        <!-- Property Pins -->
        <div *ngFor="let property of properties" 
             class="property-pin" 
             [class.registered]="property.status === 'registered'"
             [class.pending]="property.status === 'pending'"
             [class.unregistered]="property.status === 'unregistered'"
             [style.top.%]="property.lat"
             [style.left.%]="property.lng"
             (click)="selectProperty(property)">
          <div class="pin-marker">
            <svg width="32" height="40" viewBox="0 0 24 30">
              <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 14 8 14s8-8.75 8-14c0-4.42-3.58-8-8-8z" 
                    [attr.fill]="getPinColor(property.status)"/>
              <circle cx="12" cy="8" r="3" fill="white"/>
            </svg>
          </div>
          
          <!-- Hover Tooltip -->
          <div class="pin-tooltip">
            <div class="tooltip-header">{{property.address}}</div>
            <div class="tooltip-body">
              <div class="tooltip-row">
                <span class="label">Status:</span>
                <span class="value">{{property.status | titlecase}}</span>
              </div>
              <div class="tooltip-row" *ngIf="property.owner">
                <span class="label">Owner:</span>
                <span class="value">{{property.owner}}</span>
              </div>
              <div class="tooltip-row" *ngIf="property.monthlyRent">
                <span class="label">Rent:</span>
                <span class="value">{{property.monthlyRent | number}} RWF/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Header -->
      <div class="map-header">
        <button class="back-btn" (click)="goToDashboard()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <div class="header-title">Property Survey Map</div>
        <div class="profile-pic">MJ</div>
      </div>

      <!-- Survey Form (Multi-step) -->
      <div *ngIf="selectedProperty && showSurveyForm" class="survey-sheet">
        <div class="sheet-handle"></div>
        
        <!-- Step 1: Property Details -->
        <div *ngIf="currentStep === 1" class="form-step">
          <h2>Let's Start..</h2>
          <p class="step-subtitle">Property Information</p>
          
          <div class="form-group">
            <label>Property Address</label>
            <input type="text" [(ngModel)]="surveyData.address" class="form-input" readonly>
          </div>

          <div class="form-group">
            <label>Property Type</label>
            <div class="radio-options">
              <button class="radio-btn" 
                      [class.active]="surveyData.propertyType === 'residential'"
                      (click)="surveyData.propertyType = 'residential'">
                Residential
              </button>
              <button class="radio-btn" 
                      [class.active]="surveyData.propertyType === 'commercial'"
                      (click)="surveyData.propertyType = 'commercial'">
                Commercial
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>Number of Rooms</label>
            <input type="number" [(ngModel)]="surveyData.numberOfRooms" class="form-input" placeholder="e.g., 3">
          </div>

          <button class="btn-next" (click)="nextStep()">
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- Step 2: Rental Income -->
        <div *ngIf="currentStep === 2" class="form-step">
          <h2>One More..</h2>
          <p class="step-subtitle">Rental Income Details</p>

          <div class="form-group">
            <label>Monthly Rental Income (RWF)</label>
            <input type="number" [(ngModel)]="surveyData.monthlyRent" class="form-input" placeholder="e.g., 500,000">
          </div>

          <div class="form-group">
            <label>Owner's Name</label>
            <input type="text" [(ngModel)]="surveyData.ownerName" class="form-input" placeholder="Full name">
          </div>

          <div class="form-group">
            <label>Owner's Phone</label>
            <input type="tel" [(ngModel)]="surveyData.ownerPhone" class="form-input" placeholder="+250...">
          </div>

          <div class="btn-group">
            <button class="btn-back" (click)="previousStep()">Back</button>
            <button class="btn-next" (click)="nextStep()">Next</button>
          </div>
        </div>

        <!-- Step 3: Tax Calculation -->
        <div *ngIf="currentStep === 3" class="form-step">
          <h2>And we are done..</h2>
          <p class="step-subtitle">Tax Assessment</p>

          <div class="tax-summary">
            <div class="summary-row">
              <span>Gross Annual Rent:</span>
              <span class="value">{{getAnnualRent() | number}} RWF</span>
            </div>
            <div class="summary-row">
              <span>Deduction (50%):</span>
              <span class="value">-{{getDeduction() | number}} RWF</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row">
              <span>Taxable Income:</span>
              <span class="value">{{getTaxableIncome() | number}} RWF</span>
            </div>
            <div class="summary-row highlight">
              <span>Annual Tax Due:</span>
              <span class="value">{{getCalculatedTax() | number}} RWF</span>
            </div>
            <div class="tax-breakdown">
              <small>Tax Rate: {{getTaxRate()}}%</small>
            </div>
          </div>

          <div class="form-group">
            <label>Payment Method</label>
            <div class="payment-options">
              <button class="payment-btn" 
                      [class.active]="surveyData.paymentMethod === 'cash'"
                      (click)="surveyData.paymentMethod = 'cash'">
                <span>💵</span> Cash
              </button>
              <button class="payment-btn" 
                      [class.active]="surveyData.paymentMethod === 'momo'"
                      (click)="surveyData.paymentMethod = 'momo'">
                <span>📱</span> Mobile Money
              </button>
              <button class="payment-btn" 
                      [class.active]="surveyData.paymentMethod === 'bank'"
                      (click)="surveyData.paymentMethod = 'bank'">
                <span>🏦</span> Bank
              </button>
            </div>
          </div>

          <div class="btn-group">
            <button class="btn-back" (click)="previousStep()">Back</button>
            <button class="btn-submit" (click)="submitSurvey()">Submit Survey</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .map-container {
      width: 100vw;
      height: 100vh;
      background: #1a1a1a;
      position: relative;
      overflow: hidden;
    }

    .map-layer {
      position: absolute;
      inset: 0;
    }

    .map-svg {
      width: 100%;
      height: 100%;
      opacity: 0.6;
    }

    /* Property Pins */
    .property-pin {
      position: absolute;
      transform: translate(-50%, -100%);
      cursor: pointer;
      z-index: 10;
      transition: transform 0.2s;
    }

    .property-pin:hover {
      transform: translate(-50%, -100%) scale(1.1);
      z-index: 20;
    }

    .property-pin:hover .pin-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .pin-marker {
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    }

    .pin-tooltip {
      position: absolute;
      bottom: 45px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: white;
      border-radius: 12px;
      padding: 12px;
      min-width: 180px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      pointer-events: none;
    }

    .tooltip-header {
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .tooltip-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      margin-bottom: 4px;
    }

    .tooltip-row .label {
      color: #666;
    }

    .tooltip-row .value {
      font-weight: 600;
      color: #1a1a1a;
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
      z-index: 15;
      background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
    }

    .back-btn {
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      color: #333;
    }

    .header-title {
      font-weight: 600;
      color: white;
      font-size: 16px;
    }

    .profile-pic {
      width: 40px;
      height: 40px;
      background: #FFB800;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      color: white;
    }

    /* Survey Sheet */
    .survey-sheet {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      padding: 15px 20px 25px;
      max-height: 85vh;
      overflow-y: auto;
      z-index: 50;
      animation: slideUp 0.4s ease-out;
    }

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .sheet-handle {
      width: 40px;
      height: 4px;
      background: #E0E0E0;
      border-radius: 2px;
      margin: 0 auto 20px;
    }

    .form-step h2 {
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .step-subtitle {
      font-size: 13px;
      color: #999;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 18px;
    }

    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid #E8E8E8;
      border-radius: 10px;
      font-size: 14px;
      transition: all 0.3s;
      background: #FAFAFA;
    }

    .form-input:focus {
      border-color: #FFB800;
      box-shadow: 0 0 0 3px rgba(255, 184, 0, 0.08);
      background: white;
      outline: none;
    }

    .radio-options, .payment-options {
      display: flex;
      gap: 10px;
    }

    .radio-btn, .payment-btn {
      flex: 1;
      padding: 11px;
      border: 1.5px solid #E8E8E8;
      border-radius: 10px;
      background: #FAFAFA;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.3s;
      color: #666;
    }

    .radio-btn.active, .payment-btn.active {
      border-color: #1a1a1a;
      background: #1a1a1a;
      color: white;
    }

    .payment-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      padding: 10px 8px;
    }

    .payment-btn span {
      font-size: 22px;
    }

    .tax-summary {
      background: #FAFAFA;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 13px;
      color: #333;
    }

    .summary-row.highlight {
      font-weight: 700;
      font-size: 15px;
      color: #FFB800;
      margin-top: 4px;
    }

    .summary-row .value {
      font-weight: 600;
    }

    .summary-divider {
      height: 1px;
      background: #E0E0E0;
      margin: 12px 0;
    }

    .tax-breakdown {
      margin-top: 8px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }

    .btn-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .btn-next, .btn-submit {
      padding: 13px 20px;
      background: #1a1a1a;
      color: white;
      border-radius: 25px;
      font-weight: 600;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      min-width: 100px;
      align-self: flex-end;
    }

    .btn-back {
      padding: 13px 20px;
      background: #F5F5F5;
      color: #666;
      border-radius: 25px;
      font-weight: 600;
      font-size: 14px;
      min-width: 80px;
    }
  `
})
export class MapView {
  constructor(private router: Router) { }

  properties: Property[] = [
    { id: 1, lat: '35', lng: '25', address: 'KG 123 St, Kigali', status: 'pending', owner: 'Jean Mukasa', monthlyRent: 450000 },
    { id: 2, lat: '55', lng: '45', address: 'KN 45 Ave, Kigali', status: 'registered', owner: 'Marie Uwase', monthlyRent: 600000 },
    { id: 3, lat: '42', lng: '68', address: 'KK 78 Rd, Kigali', status: 'unregistered' },
    { id: 4, lat: '68', lng: '35', address: 'KG 234 St, Kigali', status: 'pending', owner: 'Paul Nkunda', monthlyRent: 350000 },
    { id: 5, lat: '25', lng: '55', address: 'KN 89 Ave, Kigali', status: 'registered', owner: 'Grace Imena', monthlyRent: 800000 },
  ];

  selectedProperty: Property | null = null;
  showSurveyForm = false;
  currentStep = 1;

  surveyData = {
    address: '',
    propertyType: 'residential',
    numberOfRooms: 0,
    monthlyRent: 0,
    ownerName: '',
    ownerPhone: '',
    paymentMethod: 'cash'
  };

  getPinColor(status: string): string {
    switch (status) {
      case 'registered': return '#4CAF50';
      case 'pending': return '#FFB800';
      case 'unregistered': return '#FF5252';
      default: return '#999';
    }
  }

  selectProperty(property: Property) {
    this.selectedProperty = property;
    this.showSurveyForm = true;
    this.currentStep = 1;
    this.surveyData.address = property.address;
    this.surveyData.monthlyRent = property.monthlyRent || 0;
    this.surveyData.ownerName = property.owner || '';
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getAnnualRent(): number {
    return this.surveyData.monthlyRent * 12;
  }

  getDeduction(): number {
    return this.getAnnualRent() * 0.5;
  }

  getTaxableIncome(): number {
    return this.getAnnualRent() - this.getDeduction();
  }

  getCalculatedTax(): number {
    const taxable = this.getTaxableIncome();
    if (taxable <= 180000) return 0;
    if (taxable <= 1000000) return (taxable - 180000) * 0.2;
    return ((1000000 - 180000) * 0.2) + ((taxable - 1000000) * 0.3);
  }

  getTaxRate(): string {
    const taxable = this.getTaxableIncome();
    if (taxable <= 180000) return '0';
    if (taxable <= 1000000) return '20';
    return '30';
  }

  submitSurvey() {
    // Save survey data
    alert('Survey submitted successfully!');
    this.showSurveyForm = false;
    this.selectedProperty = null;
    this.currentStep = 1;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
