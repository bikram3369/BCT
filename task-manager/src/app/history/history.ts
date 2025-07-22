import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header';
import { FooterComponent } from '../layout/footer/footer';
import { HttpClient } from '@angular/common/http';

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
export class HistoryComponent implements OnInit {
  historyTasks: HistoryTask[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('⛔ No token found. User may not be logged in.');
      return;
    }

    this.http.get<HistoryTask[]>('http://localhost:5000/api/history', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.historyTasks = data; // ✅ No transformation needed
      },
      error: (err) => console.error('⛔ Failed to load history:', err)
    });
  }

  clearHistory(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('⛔ No token found.');
      return;
    }

    this.http.delete('http://localhost:5000/api/history/clear', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.historyTasks = [];
        console.log('✅ History cleared');
      },
      error: (err) => {
        console.error('⛔ Failed to clear history:', err);
      }
    });
  }
}
