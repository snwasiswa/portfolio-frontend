import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = environment.apiUrl + 'api/contacts/';

  constructor(private http: HttpClient) { }

  // Method to submit the contact form data to the backend API
  submitContactForm(contactData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }
}
