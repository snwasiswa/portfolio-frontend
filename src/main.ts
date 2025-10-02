import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

// Load runtime config from public/config.json
fetch('/config.json')
  .then(response => response.json())
  .then(config => {
    (window as any).__env = config;      // runtime global
    environment.apiUrl = config.apiUrl;   // optional override

    bootstrapApplication(AppComponent, appConfig)
      .catch(err => console.error(err));
  })
  .catch(err => {
    console.error('Could not load config.json', err);

    bootstrapApplication(AppComponent, appConfig)
      .catch(err => console.error(err));
  });
