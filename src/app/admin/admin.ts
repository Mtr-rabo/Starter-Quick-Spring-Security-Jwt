import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  constructor(public router: Router, public authService: AuthService) {}
  ngOnInit(): void {
    // Initialisation logic can go here if needed
  }
  // Additional methods can be added here if needed
  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
