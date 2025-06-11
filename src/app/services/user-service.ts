import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8089';
  constructor(private http: HttpClient) {}
  getUserData(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/users`);
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/api/users/${userId}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/api/users/${user.id}`, user);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/api/users`, user);
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/api/users/${userId}`);
  }
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}/api/users/username/${username}`);
  }
}
