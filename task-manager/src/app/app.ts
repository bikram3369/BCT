import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f9f9f9;
      min-height: 100vh;
      padding: 2rem;
    }
  `]
})
export class AppComponent {}
