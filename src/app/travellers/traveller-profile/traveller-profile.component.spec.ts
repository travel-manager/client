import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerProfileComponent } from './traveller-profile.component';

describe('TravellerProfileComponent', () => {
  let component: TravellerProfileComponent;
  let fixture: ComponentFixture<TravellerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
