import { Component } from '@angular/core';
import { TaskListComponent } from '../tasks/task-list/task-list';
import { FooterComponent } from '../layout/footer/footer';
import { HeaderComponent } from '../layout/header/header'; // ⬅️ Imported Header
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskListComponent, FooterComponent, HeaderComponent], // ⬅️ Added Header here
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // ⬅️ Clear token
    this.router.navigate(['/login']);
  }
}
