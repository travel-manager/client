import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOptionsComponent } from './trip-options.component';

describe('TripOptionsComponent', () => {
  let component: TripOptionsComponent;
  let fixture: ComponentFixture<TripOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
