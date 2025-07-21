import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin(event: Event) {
    event.preventDefault();

    this.http.post<{ token: string }>('http://localhost:5000/api/users/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('✅ Login successful');
        localStorage.setItem('token', response.token); // ✅ Save JWT
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('⛔ Login failed:', err.error);
      }
    });
  }
}
