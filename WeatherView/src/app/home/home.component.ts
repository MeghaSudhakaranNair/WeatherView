import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { CityNameService } from '../services/cityname.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  slides = [
  { src: "../../assets/images/Beyond-forecast.png" },
  { src: "../../assets/images/weathercarousal.png" },
  { src: "../../assets/images/graph.png" }
  ];

  currentSlideIndex = 0;

  // Method to go to the next slide
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  // Method to go to the previous slide
  previousSlide() {
    this.currentSlideIndex = 
      this.currentSlideIndex === 0 
      ? this.slides.length - 1 
      : this.currentSlideIndex - 1;
  
}

constructor(private locationService: LocationService, private cityNameService: CityNameService, public dialog: MatDialog) {}

   
openLoginDialog(): void {
  console.log("login opened")
  this.dialog.open(LoginComponent, {
    
    // Additional configuration can be added here
  });
}

openSignUpDialog(): void {
  console.log("opened")
  this.dialog.open(SignupComponent, {
    
    
  });
}
  ngOnInit() {
    console.log("homeinit")
    this.locationService.getCurrentCityName().subscribe({
      next: cityName => {
        this.cityNameService.setCityName(cityName);
      },
      error: error => console.error('Error obtaining city name:', error)
    });
  }
  }

  


