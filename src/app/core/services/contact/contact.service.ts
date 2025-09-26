import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    // Load API URL dynamically from config.json
    this.http.get<{ apiUrl: string }>('/config.json').subscribe(config => {
      this.apiUrl = config.apiUrl + 'api/contacts/';
    });
  }

  submitContactForm(contactData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }
}
