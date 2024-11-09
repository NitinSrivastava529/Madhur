import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegKeyComponent } from './reg-key.component';

describe('RegKeyComponent', () => {
  let component: RegKeyComponent;
  let fixture: ComponentFixture<RegKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
