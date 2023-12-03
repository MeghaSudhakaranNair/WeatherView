import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherinsightsComponent } from './weatherinsights.component';

describe('WeatherinsightsComponent', () => {
  let component: WeatherinsightsComponent;
  let fixture: ComponentFixture<WeatherinsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherinsightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
