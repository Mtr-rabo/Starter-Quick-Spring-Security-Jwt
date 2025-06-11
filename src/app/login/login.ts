import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formlogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formlogin = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onSubmit() {
    console.log(this.formlogin.value);
    this.authService
      .login(this.formlogin.value.username, this.formlogin.value.password)
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          this.authService.loadUserProfile(response);
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }
}
