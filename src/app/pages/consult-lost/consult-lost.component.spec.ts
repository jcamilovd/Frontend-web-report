import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultLostComponent } from './consult-lost.component';

describe('ConsultLostComponent', () => {
  let component: ConsultLostComponent;
  let fixture: ComponentFixture<ConsultLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultLostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
