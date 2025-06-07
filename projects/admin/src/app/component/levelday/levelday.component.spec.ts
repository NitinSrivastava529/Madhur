import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeveldayComponent } from './levelday.component';

describe('LeveldayComponent', () => {
  let component: LeveldayComponent;
  let fixture: ComponentFixture<LeveldayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeveldayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeveldayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
