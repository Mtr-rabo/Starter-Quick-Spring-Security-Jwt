import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../model/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private url = 'http://localhost:8089';
  constructor(private http: HttpClient) {}
  getProfileData(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.url}/api/profiles`);
  }
  updateProfile(profile: Profile, id: number): Observable<Profile> {
    return this.http.put<Profile>(`${this.url}/api/profiles/${id}`, profile);
  }
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.url}/api/profiles`, profile);
  }
  getProfileById(profileId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.url}/api/profiles/${profileId}`);
  }
  getProfileByUsername(username: string): Observable<Profile> {
    return this.http.get<Profile>(
      `${this.url}/api/profiles/username/${username}`
    );
  }
  deleteProfile(profileId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/api/profiles/${profileId}`);
  }
}
