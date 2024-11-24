import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDistributorComponent } from './reward-distributor.component';

describe('RewardDistributorComponent', () => {
  let component: RewardDistributorComponent;
  let fixture: ComponentFixture<RewardDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
