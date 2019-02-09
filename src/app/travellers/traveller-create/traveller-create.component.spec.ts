import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerCreateComponent } from './traveller-create.component';

describe('TravellerCreateComponent', () => {
  let component: TravellerCreateComponent;
  let fixture: ComponentFixture<TravellerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
