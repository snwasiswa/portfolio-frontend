import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  // Read API URL dynamically from runtime config
  private apiUrl = (window as any).__env?.apiUrl + 'api/projects/';

  constructor(private http: HttpClient) {}

  // Returns an Observable of Project array
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}
