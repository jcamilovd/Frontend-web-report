import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultFoundComponent } from './consult-found.component';

describe('ConsultFoundComponent', () => {
  let component: ConsultFoundComponent;
  let fixture: ComponentFixture<ConsultFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
