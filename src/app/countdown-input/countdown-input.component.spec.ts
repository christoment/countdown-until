import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownInputComponent } from './countdown-input.component';

describe('CountdownInputComponent', () => {
  let component: CountdownInputComponent;
  let fixture: ComponentFixture<CountdownInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
