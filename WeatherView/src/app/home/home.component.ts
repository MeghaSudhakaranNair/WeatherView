import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

}
