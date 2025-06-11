import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../model/role.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = 'http://localhost:8089';

  constructor(private http: HttpClient) {}
  getRoleData(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.url}/api/roles`);
  }
}
