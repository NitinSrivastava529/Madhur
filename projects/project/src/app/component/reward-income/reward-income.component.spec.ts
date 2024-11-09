import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardIncomeComponent } from './reward-income.component';

describe('RewardIncomeComponent', () => {
  let component: RewardIncomeComponent;
  let fixture: ComponentFixture<RewardIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
