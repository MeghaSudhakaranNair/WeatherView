export interface WeatherData {
    date: Date;
    temperature: number;
    pressure: number;
    humidity: number;
    mintemperature:number;
    maxtemperature:number;
    wind:number;
    cloudy:number;
    windspeed:number
  }

  export interface CurrentWeatherData {
    maxTemperature: number;
    minTemperature: number;
    windSpeed: number;
    currentTemperature: number;
    humidity: number;
    pressure: number;
    sunrise: Date;
    sunset: Date;
    visibility: number;
    condition: any;
}