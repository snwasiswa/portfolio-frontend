import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

// Fetch runtime config before bootstrapping
fetch('/config.json')
  .then(response => response.json())
  .then(config => {
    environment.apiUrl = config.apiUrl; // set API URL dynamically

    bootstrapApplication(AppComponent, appConfig)
      .catch(err => console.error(err));
  })
  .catch(err => {
    console.error('Could not load config.json', err);

    // Fallback bootstrap even if config.json fails
    bootstrapApplication(AppComponent, appConfig)
      .catch(err => console.error(err));
  });
