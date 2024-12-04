import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPlanComponent } from './company-plan.component';

describe('CompanyPlanComponent', () => {
  let component: CompanyPlanComponent;
  let fixture: ComponentFixture<CompanyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
