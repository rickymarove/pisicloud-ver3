import { inject, Injectable, makeStateKey, TransferState } from '@angular/core';
import { TranslateLoader, Translation } from '@ngx-translate/core';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Observable, of } from 'rxjs';

@Injectable()
export class TranslateServerLoader implements TranslateLoader {
  private readonly transferState = inject(TransferState);

  getTranslation(lang: string): Observable<Translation> {
    const possiblePaths = [
      join(process.cwd(), 'dist/pisicloud-v3/browser/i18n', `${lang}.json`),
      join(process.cwd(), 'public/i18n', `${lang}.json`),
      join(process.cwd(), 'browser/i18n', `${lang}.json`),
    ];

    for (const filePath of possiblePaths) {
      if (existsSync(filePath)) {
        try {
          const content = readFileSync(filePath, 'utf8');
          const data = JSON.parse(content);
          const key = makeStateKey<Translation>(`pisicloud_i18n_${lang}`);
          this.transferState.set(key, data);
          return of(data);
        } catch {
          // If reading fails, try next or return empty
        }
      }
    }

    return of({});
  }
}
