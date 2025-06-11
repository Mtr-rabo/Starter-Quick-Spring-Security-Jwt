import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: string = '';
  user!: User;
  roles: string = '';
  isAuthenticated: boolean = false;
  private url = 'http://localhost:8089';
  constructor(private http: HttpClient, private router: Router) {}
  login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    let params: HttpParams = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(`${this.url}/api/auth/login`, params, options);
  }
  loadUserProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let jwtdecoded = jwtDecode(this.accessToken) as any;
    this.user = {
      username: jwtdecoded.sub,
      profile: { roles: jwtdecoded['scope'] },
    };
    this.roles = jwtdecoded['scope'];
    window.localStorage.setItem('access-token', this.accessToken);
  }
  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.user = {} as User;
    window.localStorage.removeItem('access-token');
  }
  loadUserProfileFromLocalStorage() {
    let accessToken = window.localStorage.getItem('access-token') || '';
    if (accessToken) {
      this.loadUserProfile({
        'access-token': accessToken,
      });
      const previousUrl = sessionStorage.getItem('previousUrl') || '/admin';
      this.router.navigateByUrl(previousUrl);
    }
  }
  saveCurrentUrl(url: string): void {
    sessionStorage.setItem('previousUrl', url);
  }
}
