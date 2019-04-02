import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFeedComponent } from './trip-feed.component';

describe('TripFeedComponent', () => {
  let component: TripFeedComponent;
  let fixture: ComponentFixture<TripFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
