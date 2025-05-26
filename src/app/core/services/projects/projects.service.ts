import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiUrl = 'http://127.0.0.1:8000/api/projects/';

  constructor(private http: HttpClient) {}

  // This function returns an Observable of Project array
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}
