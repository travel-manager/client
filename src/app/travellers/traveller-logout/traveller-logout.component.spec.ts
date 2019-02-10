import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerLogoutComponent } from './traveller-logout.component';

describe('TravellerLogoutComponent', () => {
  let component: TravellerLogoutComponent;
  let fixture: ComponentFixture<TravellerLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
