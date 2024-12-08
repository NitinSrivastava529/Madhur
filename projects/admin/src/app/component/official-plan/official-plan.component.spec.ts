import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialPlanComponent } from './official-plan.component';

describe('OfficialPlanComponent', () => {
  let component: OfficialPlanComponent;
  let fixture: ComponentFixture<OfficialPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficialPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
