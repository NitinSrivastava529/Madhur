import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelReportComponent } from './level-report.component';

describe('LevelReportComponent', () => {
  let component: LevelReportComponent;
  let fixture: ComponentFixture<LevelReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
