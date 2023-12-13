import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient){}

  getWeather(location: string) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${environment.apiKey}`;
    console.log(url)
    return this.http.get<any>(url);
}
}
