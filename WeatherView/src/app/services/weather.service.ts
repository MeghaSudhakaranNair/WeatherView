


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
    console.log(location)
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

  
//   getCurrentWeather(location: string): Observable<CurrentWeatherData> {
//     const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${environment.apiKey}&units=metric`;
    
//     return this.http.get<any>(currentWeatherUrl).pipe(
//       map(response => {
//         // Calculate the correct local time of sunrise and sunset
//         const timezoneOffset = response.timezone; // Offset in seconds from UTC
//         const localSunriseDate = new Date((response.sys.sunrise+timezoneOffset) * 1000);
//         const localSunsetDate = new Date((response.sys.sunset+timezoneOffset) * 1000);
        
//         return {
//           maxTemperature: response.main.temp_max,
//           minTemperature: response.main.temp_min,
//           windSpeed: response.wind.speed,
//           currentTemperature: response.main.temp,
//           humidity: response.main.humidity,
//           pressure: response.main.pressure,
//           sunrise: localSunriseDate,
//           sunset: localSunsetDate,
//           visibility: response.visibility,
//           condition: response.weather[0].main
//         };
//       })
//     );
//   }
private formatTimeFromTimestampAndOffset(unixTimestamp: number, offsetInSeconds: number): string {
  // Convert everything to milliseconds for consistency
  const localTimeInMillis = (unixTimestamp + offsetInSeconds) * 1000;

  // Create a new date object in UTC with the adjusted local time
  const date = new Date(localTimeInMillis);

  // Format the date as a UTC string, then extract the time part
  const timeString = date.toISOString().split('T')[1].substring(0, 5);
  console.log("timeString",timeString)
  return timeString;
}

getCurrentWeather(location: string): Observable<CurrentWeatherData> {
  const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${environment.apiKey}&units=metric`;
  
  return this.http.get<any>(currentWeatherUrl).pipe(
    map(response => {
      console.log("to convert")
      // Use the helper function to calculate the correct local time of sunrise and sunset
      const timezoneOffset = response.timezone; // Offset in seconds from UTC
      const localSunriseTimeString = this.formatTimeFromTimestampAndOffset(response.sys.sunrise, timezoneOffset);
      const localSunsetTimeString = this.formatTimeFromTimestampAndOffset(response.sys.sunset, timezoneOffset);
      
      return {
        maxTemperature: response.main.temp_max,
        minTemperature: response.main.temp_min,
        windSpeed: response.wind.speed,
        currentTemperature: response.main.temp,
        humidity: response.main.humidity,
        pressure: response.main.pressure,
        sunrise: localSunriseTimeString,
        sunset: localSunsetTimeString,
        visibility: response.visibility,
        condition: response.weather[0].main
      };
    })
  );
}
}

