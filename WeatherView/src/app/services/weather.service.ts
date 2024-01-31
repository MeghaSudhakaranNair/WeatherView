


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData,CurrentWeatherData } from '../../../src/app/models/weather-data.model'; // Import the interface
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient){}

  getWeather(location: string): Observable<WeatherData[]> {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${environment.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.list.map((item: any) => ({
        date: new Date(item.dt * 1000),
        temperature: item.main.temp - 273.15,
        maxtemperature: item.main.temp_max - 273.15,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        mintemperature:item.main.temp_min - 273.15,
        windspeed:item.wind.speed,
        

      })))
    );
  }
  getCurrentWeather(location: string): Observable<CurrentWeatherData> {
    const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${environment.apiKey}&units=metric`;
    return this.http.get<any>(currentWeatherUrl).pipe(
      map(response => ({
        maxTemperature: response.main.temp_max,
        minTemperature: response.main.temp_min,
        windSpeed: response.wind.speed,
        currentTemperature: response.main.temp,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
        sunrise: new Date(response.sys.sunrise * 1000),
        sunset: new Date(response.sys.sunset * 1000),
        visibility: response.visibility,
        condition:response.weather[0].main
      }))
    );
  }
}

