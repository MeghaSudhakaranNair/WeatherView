import { BehaviorSubject } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private weatherDataSubject = new BehaviorSubject<any>(null);
  public weatherData$ = this.weatherDataSubject.asObservable();

  constructor(private weatherService: WeatherService) { }

  updateWeatherDataByCity(cityName: string): void {
    this.weatherService.getWeather(cityName).subscribe(data => {
      this.weatherDataSubject.next(data);
    }, error => {
      console.error('Failed to fetch weather data', error);
      this.weatherDataSubject.next(null); // Optionally handle errors or keep the last good state
    });
  }
}
