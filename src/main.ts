import { bootstrapApplication } from '@angular/platform-browser';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import { appConfig } from './app/app.config';
import { App } from './app/app';

polyfillCountryFlagEmojis();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

