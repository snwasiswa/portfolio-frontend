import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config'; // Assuming appConfig is used for other config
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// Bootstrapping the app with routing and HttpClientModule
bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, // Use your existing appConfig for other settings
    HttpClientModule, // Add HttpClientModule to the providers
  ],
}).catch((err) => console.error(err));
