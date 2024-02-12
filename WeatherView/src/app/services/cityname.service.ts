// src/app/services/city-name.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityNameService {
  private cityNameSubject = new BehaviorSubject<string | null>(null);
  cityName$ = this.cityNameSubject.asObservable();

  constructor() { }

  setCityName(cityName: string) {
    this.cityNameSubject.next(cityName);
  }
}

