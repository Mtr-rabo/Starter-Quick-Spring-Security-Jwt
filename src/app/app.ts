import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'user-management';
  constructor(private authService: AuthService, private router: Router) {}
  // Injecting AuthService to manage authentication state
  ngOnInit(): void {
    // Enregistre la navigation pour le rafraîchissement
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.authService.saveCurrentUrl((event as NavigationEnd).url);
      });

    this.authService.loadUserProfileFromLocalStorage();
  }
}
