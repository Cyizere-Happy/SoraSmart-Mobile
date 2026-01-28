import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySurveys } from './my-surveys';

describe('MySurveys', () => {
  let component: MySurveys;
  let fixture: ComponentFixture<MySurveys>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySurveys]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySurveys);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
