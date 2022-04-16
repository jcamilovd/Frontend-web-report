import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLostComponent } from './report-lost.component';

describe('ReportLostComponent', () => {
  let component: ReportLostComponent;
  let fixture: ComponentFixture<ReportLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
