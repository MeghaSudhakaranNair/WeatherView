import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../services/weather.service';
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

type ChartType = 'line' | 'bar' | 'area'; // add more types as needed
type WeatherParameter = 'temperature' | 'pressure' | 'humidity'; // add more parameters as needed

@Component({
  selector: 'app-weatherinsights',
  templateUrl: './weatherinsights.component.html',
  styleUrls: ['./weatherinsights.component.css']
})
export class WeatherinsightsComponent implements OnInit {
  // public chartOptions: Partial<ChartOptions>;
  public chartType: ChartType = 'line';
  public selectedParameter: WeatherParameter = 'temperature';
  searchLocation: string = '';
  availableParameters: WeatherParameter[] = ['temperature', 'pressure', 'humidity'];
  public chartOptions: any;
  selectedChartType: any;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.initializeChart();
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

  getWeatherData(): void {
    if (this.searchLocation) {
      this.weatherService.getWeather(this.searchLocation).subscribe(response => {
        if (response && response.list) {
          const data = response.list.map((item: any) => {
            let yValue;
  
            switch (this.selectedParameter) {
              case 'temperature':
                // Convert Kelvin to Celsius if needed
                yValue = item.main.temp - 273.15;
                break;
              case 'pressure':
                yValue = item.main.pressure;
                break;
              case 'humidity':
                yValue = item.main.humidity;
                break;
              default:
                yValue = item.main[this.selectedParameter];
            }
  
            return {
              x: new Date(item.dt * 1000), // Convert Unix timestamp to Date
              y: yValue
            };
          });
          console.log(data)
          this.updateChartData(data);
        }
      }, error => {
        console.error('Error fetching weather data:', error);
      });
    }
  }

  updateChartData(data: any[]): void {
    this.chartOptions.series = [{
      name: this.selectedParameter,
      data: data
    }];
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
