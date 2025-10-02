import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // Read API URL from runtime config
  private apiUrl = (window as any).__env?.apiUrl + 'api/profiles/';
  private readonly resumeUrl = (window as any).__env?.apiUrl + 'api/download-resume/';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  downloadResumeWithPassword(password: string): Observable<Blob> {
    return this.http.post(this.resumeUrl,
      { password },
      { responseType: 'blob' }
    );
  }
}
