import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardMemberComponent } from './reward-member.component';

describe('RewardMemberComponent', () => {
  let component: RewardMemberComponent;
  let fixture: ComponentFixture<RewardMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
