import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items = [
    { content: 'Item 1 Content' },
    { content: 'Item 2 Content' },
    { content: 'Item 3 Content' }
  ];
}
