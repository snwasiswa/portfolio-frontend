import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://127.0.0.1:8000/api/profiles/';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }
}
