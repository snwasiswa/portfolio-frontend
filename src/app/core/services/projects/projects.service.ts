import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Project } from '../../models/projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    // Load API URL dynamically from config.json
    this.http.get<{ apiUrl: string }>('/config.json').subscribe(config => {
      this.apiUrl = config.apiUrl + 'api/projects/';
    });
  }

  // This function returns an Observable of Project array
  getProjects(): Observable<Project[]> {
    // Ensure apiUrl is loaded before sending request
    return from(new Promise<void>((resolve) => {
      if (this.apiUrl) {
        resolve();
      } else {
        this.http.get<{ apiUrl: string }>('/config.json').subscribe(config => {
          this.apiUrl = config.apiUrl + 'api/projects/';
          resolve();
        });
      }
    })).pipe(
      switchMap(() => this.http.get<Project[]>(this.apiUrl))
    );
  }
}
