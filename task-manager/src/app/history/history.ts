import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header';
import { FooterComponent } from '../layout/footer/footer';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

interface HistoryTask {
  _id?: string;
  title: string;
  completed: boolean;
  date: string;
  time: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './history.html',
  styleUrls: ['./history.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  historyTasks: HistoryTask[] = [];
  routerSub?: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Listen for route changes
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.includes('/history')) {
        this.loadHistory();
      }
    });

    // Initial load
    this.loadHistory();
  }

  loadHistory(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get<HistoryTask[]>('http://localhost:5000/api/history', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.historyTasks = data,
      error: err => console.error('⛔ Failed to load history:', err)
    });
  }

  clearHistory(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.delete('http://localhost:5000/api/history/clear', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => this.historyTasks = [],
      error: err => console.error('⛔ Failed to clear history:', err)
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
