import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreKeyComponent } from './store-key.component';

describe('StoreKeyComponent', () => {
  let component: StoreKeyComponent;
  let fixture: ComponentFixture<StoreKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
