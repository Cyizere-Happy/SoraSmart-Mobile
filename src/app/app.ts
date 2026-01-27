import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('soraSmart');

  constructor(private router: Router) { }

  ngOnInit() {
    // Force splash screen on every reload/initialization
    this.router.navigate(['/splash'], { replaceUrl: true });
  }
}
