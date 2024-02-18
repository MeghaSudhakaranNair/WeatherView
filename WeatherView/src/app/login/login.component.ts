import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(

    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) { }

  login() {
    // Here, you would implement your authentication logic
    console.log('Username:', this.username, 'Password:', this.password);
  }
  navigate(event: MouseEvent, path: string) {
    event.preventDefault(); // Prevent the default anchor tag behavior
    this.dialogRef.close(); // Close the modal
    this.router.navigate([path]); // Navigate to the specified path
  }
}
