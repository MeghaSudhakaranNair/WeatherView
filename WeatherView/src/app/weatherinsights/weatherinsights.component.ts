import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexTooltip
} from 'ng-apexcharts';

import { WeatherData,CurrentWeatherData } from '../../../src/app/models/weather-data.model';

type ChartType = 'line' | 'bar' | 'area'; // add more types as needed
type WeatherParameter = 'temperature' | 'pressure' | 'humidity'; // add more parameters as needed

@Component({
  selector: 'app-weatherinsights',
  templateUrl: './weatherinsights.component.html',
  styleUrls: ['./weatherinsights.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherinsightsComponent implements OnInit {
  // public chartOptions: Partial<ChartOptions>;
  public chartType: ChartType = 'line';
  public selectedParameter: WeatherParameter = 'temperature';
  searchLocation: string = '';
  availableParameters: WeatherParameter[] = ['temperature', 'pressure', 'humidity'];
  public chartOptions: any;
  selectedChartType: any;
  weatherData: any;
  wholeRec:any;
  currentWeather: any;
  location: any;
  showWeatherData: boolean = false;
  constructor(private weatherService: WeatherService, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.initializeChart();
    this.getWeatherData();
  }

  initializeChart(): void {
    this.chartOptions = {
      series: [],
      chart: {
        type: this.chartType,
        height: 350
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: this.selectedParameter
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      }
    };
  }


// getWeatherData(): void {
//   if (this.searchLocation.trim()) {
//     this.weatherService.getWeather(this.searchLocation).subscribe(data => {
//       if (data && data.length) {
//         this.currentWeather = data[data.length - 1];
//         this.updateChartData(data);
//       } else {
//         console.warn('Invalid or empty response for the location:', this.searchLocation);
//         this.showInvalidLocationToast();
//       }
//       console.log(data)
//     }, error => {
//       console.error('Error fetching weather data:', error);
//       this.showInvalidLocationToast();
//     });
//   }
// }

getWeatherData(): void {
  if (this.searchLocation.trim()) {
    this.showWeatherData = true;
    this.location=this.searchLocation
    // Fetch forecast weather data
    this.weatherService.getWeather(this.searchLocation).subscribe(forecastData => {
      if (forecastData && forecastData.length) {
        this.updateChartData(forecastData);
      } else {
        console.warn('Invalid or empty response for the forecast of location:', this.searchLocation);
        this.showInvalidLocationToast();
      }
      console.log('Forecast Data:', forecastData);
    }, error => {
      console.error('Error fetching forecast weather data:', error);
      this.showInvalidLocationToast();
    });

    // Fetch current weather data
    this.weatherService.getCurrentWeather(this.searchLocation).subscribe(currentData => {
      if (currentData) {
        
        this.currentWeather = currentData;
      } else {
        console.warn('Invalid or empty response for the current weather of location:', this.searchLocation);
        this.showInvalidLocationToast();
      }
      console.log('Current Weather Data:', currentData);
    }, error => {
      console.error('Error fetching current weather data:', error);
      
      // this.showWeatherData = true;
      this.showInvalidLocationToast();
    });
  }else {
    this.showWeatherData = false; // Reset showWeatherData if there's no search location
  }
}

updateChartData(weatherData: WeatherData[]): void {
  console.log(this.selectedParameter)
  // console.log(weatherData.map((item) =>  item.date))
  const chartData = weatherData.map(item => {
    return {
      x: item.date,
      y: item[this.selectedParameter] // Use the selectedParameter to access the correct property
    };
    
  });
  console.log(chartData)

  this.chartOptions.series = [{
    name: this.selectedParameter,
    data: chartData
  }];
}
showInvalidLocationToast(): void {
      console.log("toatr")
      this.snackBar.open('Invalid Location', 'Close', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    }


    onParameterChange(): void {
          console.log('Selected parameter:', this.selectedParameter);
          // this.selectedParameter = newParameter;
        
          this.getWeatherData(); // Fetch data with the new parameter
        }

        onChartTypeChange(): void {
              // The selectedChartType is automatically updated by [(ngModel)]
              console.log('Selected chart type:', this.selectedChartType);
            
              // Update chart type in chartOptions
              this.chartOptions.chart = {
                ...this.chartOptions.chart,
                type: this.selectedChartType
              };
            }
}
