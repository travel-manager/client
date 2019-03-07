import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTripsComponent } from './public-trips.component';

describe('PublicTripsComponent', () => {
  let component: PublicTripsComponent;
  let fixture: ComponentFixture<PublicTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
