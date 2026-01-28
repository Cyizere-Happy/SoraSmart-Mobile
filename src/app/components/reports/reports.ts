import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="reports-container">
      <!-- Header -->
      <div class="header">
        <button class="back-btn" (click)="goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 class="page-title">Submit Report</h1>
        <div class="spacer"></div>
      </div>

      <!-- Progress Steps -->
      <div class="progress-steps">
        <div class="step" [class.active]="currentStep >= 1" [class.completed]="currentStep > 1">
          <div class="step-circle">
            <span *ngIf="currentStep <= 1">1</span>
            <svg *ngIf="currentStep > 1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="step-label">Issue Type</span>
        </div>
        <div class="step-line" [class.active]="currentStep >= 2"></div>
        <div class="step" [class.active]="currentStep >= 2" [class.completed]="currentStep > 2">
          <div class="step-circle">
            <span *ngIf="currentStep <= 2">2</span>
            <svg *ngIf="currentStep > 2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="step-label">Details</span>
        </div>
        <div class="step-line" [class.active]="currentStep >= 3"></div>
        <div class="step" [class.active]="currentStep >= 3">
          <div class="step-circle">3</div>
          <span class="step-label">Review</span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Step 1: Select Issue Type -->
        <div *ngIf="currentStep === 1" class="form-step">
          <h2>Select Issue Type</h2>
          <p class="subtitle">Choose the category that best describes your problem</p>

          <div class="issue-cards">
            <button class="issue-card" 
                    [class.selected]="reportData.issueType === 'technical'"
                    (click)="reportData.issueType = 'technical'">
              <div class="card-icon">⚙️</div>
              <div class="card-content">
                <h3>Technical Issue</h3>
                <p>App crashes, bugs, or errors</p>
              </div>
              <div class="radio-indicator" [class.checked]="reportData.issueType === 'technical'"></div>
            </button>

            <button class="issue-card" 
                    [class.selected]="reportData.issueType === 'data'"
                    (click)="reportData.issueType = 'data'">
              <div class="card-icon">📊</div>
              <div class="card-content">
                <h3>Data Problem</h3>
                <p>Incorrect or missing survey data</p>
              </div>
              <div class="radio-indicator" [class.checked]="reportData.issueType === 'data'"></div>
            </button>

            <button class="issue-card" 
                    [class.selected]="reportData.issueType === 'access'"
                    (click)="reportData.issueType = 'access'">
              <div class="card-icon">🔒</div>
              <div class="card-content">
                <h3>Access Issue</h3>
                <p>Login or permission problems</p>
              </div>
              <div class="radio-indicator" [class.checked]="reportData.issueType === 'access'"></div>
            </button>

            <button class="issue-card" 
                    [class.selected]="reportData.issueType === 'other'"
                    (click)="reportData.issueType = 'other'">
              <div class="card-icon">💬</div>
              <div class="card-content">
                <h3>Other</h3>
                <p>General feedback or suggestions</p>
              </div>
              <div class="radio-indicator" [class.checked]="reportData.issueType === 'other'"></div>
            </button>
          </div>
        </div>

        <!-- Step 2: Issue Details -->
        <div *ngIf="currentStep === 2" class="form-step">
          <h2>Describe the Issue</h2>
          <p class="subtitle">Provide details to help us resolve the problem</p>

          <div class="form-group">
            <label>Issue Title</label>
            <input type="text" [(ngModel)]="reportData.title" class="form-input" placeholder="Brief summary of the issue">
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="reportData.description" class="form-textarea" rows="5" placeholder="Describe what happened and what you expected..."></textarea>
          </div>

          <div class="form-group">
            <label>Location (Optional)</label>
            <input type="text" [(ngModel)]="reportData.location" class="form-input" placeholder="Where did this occur?">
          </div>

          <div class="form-group">
            <label>Priority Level</label>
            <div class="priority-options">
              <button class="priority-btn low" 
                      [class.active]="reportData.priority === 'low'"
                      (click)="reportData.priority = 'low'">
                Low
              </button>
              <button class="priority-btn medium" 
                      [class.active]="reportData.priority === 'medium'"
                      (click)="reportData.priority = 'medium'">
                Medium
              </button>
              <button class="priority-btn high" 
                      [class.active]="reportData.priority === 'high'"
                      (click)="reportData.priority = 'high'">
                High
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Review & Submit -->
        <div *ngIf="currentStep === 3" class="form-step">
          <h2>Review Your Report</h2>
          <p class="subtitle">Please confirm the details before submitting</p>

          <div class="review-card">
            <div class="review-row">
              <span class="label">Issue Type:</span>
              <span class="value">{{getIssueTypeLabel()}}</span>
            </div>
            <div class="review-row">
              <span class="label">Title:</span>
              <span class="value">{{reportData.title}}</span>
            </div>
            <div class="review-row">
              <span class="label">Priority:</span>
              <span class="value priority-badge" [class]="reportData.priority">{{reportData.priority | titlecase}}</span>
            </div>
            <div class="review-row full">
              <span class="label">Description:</span>
              <p class="description-text">{{reportData.description}}</p>
            </div>
            <div class="review-row" *ngIf="reportData.location">
              <span class="label">Location:</span>
              <span class="value">{{reportData.location}}</span>
            </div>
          </div>

          <div class="info-note">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <p>You will receive a confirmation email once your report is submitted. Our team typically responds within 24-48 hours.</p>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="button-group">
        <button *ngIf="currentStep > 1" class="btn-secondary" (click)="previousStep()">Back</button>
        <button *ngIf="currentStep < 3" class="btn-primary" (click)="nextStep()">Continue</button>
        <button *ngIf="currentStep === 3" class="btn-primary" (click)="submitReport()">Submit Report</button>
      </div>
    </div>
  `,
  styles: `
    .reports-container {
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

    /* Progress Steps */
    .progress-steps {
      display: flex;
      align-items: center;
      padding: 30px 20px;
      background: white;
      margin-bottom: 20px;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .step-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #E8E8E8;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s;
    }

    .step.active .step-circle {
      background: #1a1a1a;
      color: white;
    }

    .step.completed .step-circle {
      background: #4CAF50;
    }

    .step-label {
      font-size: 11px;
      color: #999;
      font-weight: 500;
    }

    .step.active .step-label {
      color: #1a1a1a;
      font-weight: 600;
    }

    .step-line {
      height: 2px;
      flex: 1;
      background: #E8E8E8;
      margin: 0 -10px;
      margin-bottom: 20px;
    }

    .step-line.active {
      background: #1a1a1a;
    }

    /* Content Area */
    .content-area {
      flex: 1;
      padding: 0 20px 20px;
      overflow-y: auto;
    }

    .form-step h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 14px;
      color: #999;
      margin-bottom: 25px;
    }

    /* Issue Cards */
    .issue-cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .issue-card {
      background: white;
      border: 2px solid #E8E8E8;
      border-radius: 16px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 15px;
      text-align: left;
      transition: all 0.3s;
    }

    .issue-card.selected {
      border-color: #1a1a1a;
      background: #FAFAFA;
    }

    .card-icon {
      font-size: 32px;
      width: 50px;
      height: 50px;
      background: #F5F5F5;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-content {
      flex: 1;
    }

    .card-content h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #1a1a1a;
    }

    .card-content p {
      font-size: 13px;
      color: #999;
      margin: 0;
    }

    .radio-indicator {
      width: 22px;
      height: 22px;
      border: 2px solid #E8E8E8;
      border-radius: 50%;
      position: relative;
    }

    .radio-indicator.checked {
      border-color: #1a1a1a;
    }

    .radio-indicator.checked::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: #1a1a1a;
      border-radius: 50%;
    }

    /* Form Elements */
    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1a1a1a;
    }

    .form-input, .form-textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid #E8E8E8;
      border-radius: 12px;
      font-size: 14px;
      background: white;
      transition: all 0.3s;
    }

    .form-input:focus, .form-textarea:focus {
      border-color: #1a1a1a;
      outline: none;
      box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.05);
    }

    .form-textarea {
      resize: vertical;
      font-family: 'Jost', sans-serif;
    }

    /* Priority Buttons */
    .priority-options {
      display: flex;
      gap: 10px;
    }

    .priority-btn {
      flex: 1;
      padding: 12px;
      border: 1.5px solid #E8E8E8;
      border-radius: 10px;
      background: white;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.3s;
    }

    .priority-btn.low.active {
      border-color: #4CAF50;
      background: #4CAF50;
      color: white;
    }

    .priority-btn.medium.active {
      border-color: #FF9800;
      background: #FF9800;
      color: white;
    }

    .priority-btn.high.active {
      border-color: #F44336;
      background: #F44336;
      color: white;
    }

    /* Review Card */
    .review-card {
      background: white;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .review-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      align-items: flex-start;
    }

    .review-row.full {
      flex-direction: column;
    }

    .review-row .label {
      font-size: 13px;
      color: #999;
      font-weight: 500;
    }

    .review-row .value {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      text-align: right;
    }

    .description-text {
      margin-top: 8px;
      font-size: 14px;
      color: #666;
      line-height: 1.6;
    }

    .priority-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
    }

    .priority-badge.low {
      background: #E8F5E9;
      color: #4CAF50;
    }

    .priority-badge.medium {
      background: #FFF3E0;
      color: #FF9800;
    }

    .priority-badge.high {
      background: #FFEBEE;
      color: #F44336;
    }

    /* Info Note */
    .info-note {
      display: flex;
      gap: 12px;
      padding: 15px;
      background: #E3F2FD;
      border-radius: 12px;
      margin-bottom: 20px;
    }

    .info-note svg {
      flex-shrink: 0;
      color: #2196F3;
    }

    .info-note p {
      font-size: 13px;
      color: #1976D2;
      margin: 0;
      line-height: 1.5;
    }

    /* Navigation Buttons */
    .button-group {
      padding: 20px;
      background: white;
      display: flex;
      gap: 12px;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
    }

    .btn-primary, .btn-secondary {
      flex: 1;
      padding: 15px;
      border-radius: 25px;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.3s;
    }

    .btn-primary {
      background: #1a1a1a;
      color: white;
    }

    .btn-secondary {
      background: #F5F5F5;
      color: #666;
    }
  `
})
export class Reports {
  constructor(private router: Router) { }

  currentStep = 1;

  reportData = {
    issueType: '',
    title: '',
    description: '',
    location: '',
    priority: 'medium'
  };

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

  getIssueTypeLabel(): string {
    const labels: any = {
      'technical': 'Technical Issue',
      'data': 'Data Problem',
      'access': 'Access Issue',
      'other': 'Other'
    };
    return labels[this.reportData.issueType] || '';
  }

  submitReport() {
    alert('Report submitted successfully! Our team will review it shortly.');
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
