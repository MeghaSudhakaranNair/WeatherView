import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) { }

  getCurrentCityName(): Observable<string> {
    // Directly calling the new API without using geolocation to fetch the city name based on the client's IP address.
    return this.getCityName();
  }

  private getCityName(): Observable<string> {
    // Updated URL to directly fetch information based on the client's IP address
    // Make sure to use HTTPS in production for security reasons and include any necessary API key if required by the service.
    const url = 'http://ip-api.com/json/';
    return this.http.get<any>(url).pipe(
      // Map the API response directly to extract the city or region name.
      // No need to use switchMap or from since we are directly extracting the value.
      map((response: { status: string; city: any; }) => {
        if (response.status === 'success') {
          // Extracting the city name directly from the API response.
          return response.city; // Or use response.regionName if you want the region's name instead.
        } else {
          throw new Error('Failed to get city name from API');
        }
      })
    );
  }
}
