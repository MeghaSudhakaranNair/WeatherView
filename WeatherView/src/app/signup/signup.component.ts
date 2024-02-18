import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';

  constructor(
    private dialogRef: MatDialogRef<SignupComponent>,
    private router: Router

  ) { }

  signup() {
    // Here, you would implement your sign-up logic
    console.log('First Name:', this.firstName, 'Last Name:', this.lastName, 'Username:', this.username, 'Password:', this.password);
  }
  navigate(event: MouseEvent, path: string) {
    event.preventDefault(); // Prevent the default anchor tag behavior
    this.dialogRef.close(); // Close the modal
    this.router.navigate([path]); // Navigate to the specified path
  }
}
