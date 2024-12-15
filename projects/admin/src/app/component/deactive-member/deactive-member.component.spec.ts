import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveMemberComponent } from './deactive-member.component';

describe('DeactiveMemberComponent', () => {
  let component: DeactiveMemberComponent;
  let fixture: ComponentFixture<DeactiveMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeactiveMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
