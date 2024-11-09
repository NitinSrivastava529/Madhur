import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayMemberComponent } from './today-member.component';

describe('TodayMemberComponent', () => {
  let component: TodayMemberComponent;
  let fixture: ComponentFixture<TodayMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
