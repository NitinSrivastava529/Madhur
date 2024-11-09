import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelIncomeComponent } from './level-income.component';

describe('LevelIncomeComponent', () => {
  let component: LevelIncomeComponent;
  let fixture: ComponentFixture<LevelIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
