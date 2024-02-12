import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { LocationService } from '../services/location.service';
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
import { CityNameService } from '../services/cityname.service';
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
  selectedChartType: any='line';
  weatherData: any;
  wholeRec:any;
  currentWeather: any;
  searchedWeather:any;
  location: any;
  showWeatherData: boolean = false;
  defaultLocation: any; // Set a default location
  currLocation: any;
  constructor(private weatherService: WeatherService, private snackBar: MatSnackBar, private CityNameService: CityNameService, ) {}

  ngOnInit(): void {
    this.initializeChart();
    this.CityNameService.cityName$.subscribe(cityName => {
      this.defaultLocation = cityName;
    });
    console.log(this.defaultLocation)
      this.getWeatherData(this.defaultLocation, true);
    
    
    
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




getWeatherData(location: string, isDefault: boolean = false): void {
  
  if (location.trim()) {
    // this.showWeatherData = true;
    
    
    this.location=location
    
    // Fetch forecast weather data
    this.weatherService.getWeather(this.location).subscribe(forecastData => {
      console.log("for",forecastData,this.location)
      if (forecastData && forecastData.length) {
        
        this.showWeatherData = true;
        this.updateChartData(forecastData);
        console.log("updated")
      } else {
        
        this.showInvalidLocationToast();
      }
      
    }, error => {
      
      this.showInvalidLocationToast();
    });

    // Fetch current weather data
    this.weatherService.getCurrentWeather(location).subscribe(currentData => {
      
      if (currentData) {
        if (isDefault) {
          // On initialization, both currentWeather and searchedWeather should have the default location's data
          this.currLocation=this.location
          this.currentWeather = currentData;
          this.searchedWeather = currentData;
          
          
        } else {
          // Upon user search, only searchedWeather is updated
          this.searchedWeather = currentData;
          this.searchLocation = location; // Update searchLocation with the searched location
          
        }
        console.log(this.currentWeather.condition)
        console.log(this.searchedWeather.condition)
      } else {
        console.warn('Invalid or empty response for the weather of location:', location);
      }

      console.log('Weather Data:', currentData);
    }, error => {
      console.error('Error fetching weather data:', error);
      // Implement showInvalidLocationToast to provide user feedback
    });
  
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
          const locationToFetch = this.searchLocation.trim() ? this.searchLocation : this.defaultLocation;
          this.getWeatherData(locationToFetch); // Fetch data with the new parameter
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
