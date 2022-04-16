import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFoundComponent } from './report-found.component';

describe('ReportFoundComponent', () => {
  let component: ReportFoundComponent;
  let fixture: ComponentFixture<ReportFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
