import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSubscribeComponent } from './approve-subscribe.component';

describe('ApproveSubscribeComponent', () => {
  let component: ApproveSubscribeComponent;
  let fixture: ComponentFixture<ApproveSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveSubscribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
