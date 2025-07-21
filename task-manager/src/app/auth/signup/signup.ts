import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSignup(event: Event) {
    event.preventDefault();

    this.http.post('http://localhost:5000/api/users/signup', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        console.log('✅ Signup successful');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('⛔ Signup error:', err.error);
      }
    });
  }
}
