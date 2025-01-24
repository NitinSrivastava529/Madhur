import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeUploadComponent } from './subscribe-upload.component';

describe('SubscribeUploadComponent', () => {
  let component: SubscribeUploadComponent;
  let fixture: ComponentFixture<SubscribeUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
