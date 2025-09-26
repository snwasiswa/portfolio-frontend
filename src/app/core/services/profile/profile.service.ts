import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile/profile.model';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = '';
  private resumeUrl = '';

  constructor(private http: HttpClient) {
    // Load API URLs dynamically from config.json
    this.http.get<{ apiUrl: string }>('/config.json').subscribe(config => {
      this.apiUrl = config.apiUrl + 'api/profiles/';
      this.resumeUrl = config.apiUrl + 'api/download-resume/';
    });
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  downloadResumeWithPassword(password: string): Observable<Blob> {
    // Ensure resumeUrl is loaded before sending request
    return from(new Promise<void>((resolve) => {
      if (this.resumeUrl) {
        resolve();
      } else {
        this.http.get<{ apiUrl: string }>('/config.json').subscribe(config => {
          this.resumeUrl = config.apiUrl + 'api/download-resume/';
          resolve();
        });
      }
    })).pipe(
      switchMap(() => this.http.post(this.resumeUrl, { password }, { responseType: 'blob' }))
    );
  }
}
