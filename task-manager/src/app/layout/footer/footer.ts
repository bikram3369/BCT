import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // ✅ Needed for standalone imports
  imports: [],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'] // ✅ Correct property name
})
export class FooterComponent {}
