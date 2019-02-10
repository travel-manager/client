import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerLoginComponent } from './traveller-login.component';

describe('TravellerLoginComponent', () => {
  let component: TravellerLoginComponent;
  let fixture: ComponentFixture<TravellerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
