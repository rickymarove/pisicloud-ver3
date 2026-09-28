import { Injectable } from '@angular/core';
import { TranslateLoader, Translation } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { APP_TRANSLATIONS } from './translations';

@Injectable()
export class TranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Translation> {
    const data = APP_TRANSLATIONS[lang] || APP_TRANSLATIONS['en'] || {};
    return of(data);
  }
}
