import { Component } from '@angular/core';
import { TaskListComponent } from '../tasks/task-list/task-list';
import { FooterComponent } from '../layout/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskListComponent, FooterComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}
