import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripHubComponent } from './trip-hub.component';

describe('TripHubComponent', () => {
  let component: TripHubComponent;
  let fixture: ComponentFixture<TripHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
