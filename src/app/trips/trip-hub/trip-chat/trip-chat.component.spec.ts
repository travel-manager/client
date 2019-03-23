import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripChatComponent } from './trip-chat.component';

describe('TripChatComponent', () => {
  let component: TripChatComponent;
  let fixture: ComponentFixture<TripChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
