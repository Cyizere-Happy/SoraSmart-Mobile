import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Survey {
  id: number;
  propertyAddress: string;
  ownerName: string;
  propertyType: string;
  monthlyRent: number;
  taxDue: number;
  status: 'completed' | 'pending' | 'verified';
  date: string;
  numberOfRooms: number;
}

@Component({
  selector: 'app-my-surveys',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="surveys-container">
      <!-- Header -->
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 class="page-title">My Surveys</h1>
        <div class="spacer"></div>
      </div>

      <!-- Stats Summary -->
      <div class="stats-summary">
        <div class="stat-item">
          <div class="stat-value">{{surveys.length}}</div>
          <div class="stat-label">Total Surveys</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{getCompletedCount()}}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{getTotalTax() | number}}</div>
          <div class="stat-label">Total Tax (RWF)</div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button class="tab" [class.active]="activeFilter === 'all'" (click)="activeFilter = 'all'">
          All ({{surveys.length}})
        </button>
        <button class="tab" [class.active]="activeFilter === 'completed'" (click)="activeFilter = 'completed'">
          Completed ({{getCompletedCount()}})
        </button>
        <button class="tab" [class.active]="activeFilter === 'pending'" (click)="activeFilter = 'pending'">
          Pending ({{getPendingCount()}})
        </button>
      </div>

      <!-- Surveys List -->
      <div class="surveys-list">
        <div *ngFor="let survey of getFilteredSurveys()" class="survey-card" (click)="viewDetails(survey)">
          <div class="card-header">
            <div class="property-info">
              <div class="property-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div class="property-details">
                <h3>{{survey.propertyAddress}}</h3>
                <p>{{survey.ownerName}}</p>
              </div>
            </div>
            <span class="status-badge" [class]="survey.status">
              {{survey.status | titlecase}}
            </span>
          </div>

          <div class="card-body">
            <div class="info-row">
              <div class="info-item">
                <span class="label">Type</span>
                <span class="value">{{survey.propertyType | titlecase}}</span>
              </div>
              <div class="info-item">
                <span class="label">Rooms</span>
                <span class="value">{{survey.numberOfRooms}}</span>
              </div>
              <div class="info-item">
                <span class="label">Monthly Rent</span>
                <span class="value">{{survey.monthlyRent | number}} RWF</span>
              </div>
            </div>

            <div class="tax-info">
              <div class="tax-label">Annual Tax Due</div>
              <div class="tax-value">{{survey.taxDue | number}} RWF</div>
            </div>
          </div>

          <div class="card-footer">
            <span class="date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {{survey.date}}
            </span>
            <button class="view-btn">
              View Details
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="getFilteredSurveys().length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h3>No surveys found</h3>
          <p>Start surveying properties from the Map Scan page</p>
          <button class="btn-primary" (click)="goToMap()">Go to Map</button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .surveys-container {
      width: 100vw;
      min-height: 100vh;
      background: #F8F9FA;
      display: flex;
      flex-direction: column;
    }

    .header {
      padding: 50px 20px 20px;
      background: white;
      display: flex;
      align-items: center;
      gap: 15px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .back-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #F5F5F5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
    }

    .page-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      flex: 1;
    }

    .spacer {
      width: 40px;
    }

    /* Stats Summary */
    .stats-summary {
      background: white;
      padding: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 15px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: #E8E8E8;
    }

    /* Filter Tabs */
    .filter-tabs {
      display: flex;
      gap: 10px;
      padding: 0 20px 15px;
      background: white;
      margin-bottom: 15px;
    }

    .tab {
      flex: 1;
      padding: 10px;
      background: #F5F5F5;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      color: #666;
      transition: all 0.3s;
    }

    .tab.active {
      background: #1a1a1a;
      color: white;
    }

    /* Surveys List */
    .surveys-list {
      flex: 1;
      padding: 0 20px 100px;
      overflow-y: auto;
    }

    .survey-card {
      background: white;
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 15px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      cursor: pointer;
      transition: all 0.3s;
    }

    .survey-card:active {
      transform: scale(0.98);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #F5F5F5;
    }

    .property-info {
      display: flex;
      gap: 12px;
      flex: 1;
    }

    .property-icon {
      width: 45px;
      height: 45px;
      background: #F5F5F5;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a1a1a;
      flex-shrink: 0;
    }

    .property-details h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #1a1a1a;
    }

    .property-details p {
      font-size: 13px;
      color: #999;
      margin: 0;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }

    .status-badge.completed {
      background: #E8F5E9;
      color: #4CAF50;
    }

    .status-badge.pending {
      background: #FFF9E6;
      color: #FFB800;
    }

    .status-badge.verified {
      background: #E3F2FD;
      color: #2196F3;
    }

    .card-body {
      margin-bottom: 15px;
    }

    .info-row {
      display: flex;
      gap: 15px;
      margin-bottom: 12px;
    }

    .info-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item .label {
      font-size: 11px;
      color: #999;
      font-weight: 500;
    }

    .info-item .value {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .tax-info {
      background: #FAFAFA;
      padding: 12px;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tax-label {
      font-size: 13px;
      color: #666;
      font-weight: 500;
    }

    .tax-value {
      font-size: 15px;
      font-weight: 700;
      color: #1a1a1a;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid #F5F5F5;
    }

    .date {
      font-size: 12px;
      color: #999;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .view-btn {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }

    .empty-state h3 {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #1a1a1a;
    }

    .empty-state p {
      font-size: 14px;
      color: #999;
      margin: 0 0 25px 0;
    }

    .btn-primary {
      padding: 13px 30px;
      background: #1a1a1a;
      color: white;
      border-radius: 25px;
      font-weight: 600;
      font-size: 14px;
    }
  `
})
export class MySurveys {
  constructor(private router: Router) { }

  activeFilter: 'all' | 'completed' | 'pending' = 'all';

  surveys: Survey[] = [
    {
      id: 1,
      propertyAddress: 'KN 45 Ave, Kigali',
      ownerName: 'Marie Uwase',
      propertyType: 'residential',
      monthlyRent: 600000,
      taxDue: 720000,
      status: 'completed',
      date: 'Jan 26, 2024',
      numberOfRooms: 4
    },
    {
      id: 2,
      propertyAddress: 'KN 89 Ave, Kigali',
      ownerName: 'Grace Imena',
      propertyType: 'residential',
      monthlyRent: 800000,
      taxDue: 960000,
      status: 'verified',
      date: 'Jan 25, 2024',
      numberOfRooms: 5
    },
    {
      id: 3,
      propertyAddress: 'KG 123 St, Kigali',
      ownerName: 'Jean Mukasa',
      propertyType: 'commercial',
      monthlyRent: 450000,
      taxDue: 540000,
      status: 'pending',
      date: 'Jan 24, 2024',
      numberOfRooms: 3
    },
    {
      id: 4,
      propertyAddress: 'KG 234 St, Kigali',
      ownerName: 'Paul Nkunda',
      propertyType: 'residential',
      monthlyRent: 350000,
      taxDue: 420000,
      status: 'completed',
      date: 'Jan 23, 2024',
      numberOfRooms: 2
    }
  ];

  getFilteredSurveys(): Survey[] {
    if (this.activeFilter === 'all') {
      return this.surveys;
    }
    return this.surveys.filter(s => s.status === this.activeFilter);
  }

  getCompletedCount(): number {
    return this.surveys.filter(s => s.status === 'completed' || s.status === 'verified').length;
  }

  getPendingCount(): number {
    return this.surveys.filter(s => s.status === 'pending').length;
  }

  getTotalTax(): number {
    return this.surveys.reduce((sum, s) => sum + s.taxDue, 0);
  }

  viewDetails(survey: Survey) {
    // Could navigate to a detail page or show a modal
    console.log('View details for:', survey);
  }

  goToMap() {
    this.router.navigate(['/map-view']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
