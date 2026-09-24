import { inject, Injectable, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, Translation } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateBrowserLoader implements TranslateLoader {
  private readonly http = inject(HttpClient);
  private readonly transferState = inject(TransferState);

  getTranslation(lang: string): Observable<Translation> {
    const key = makeStateKey<Translation>(`pisicloud_i18n_${lang}`);
    if (this.transferState.hasKey(key)) {
      const data = this.transferState.get(key, null);
      this.transferState.remove(key);
      if (data) {
        return of(data);
      }
    }

    return this.http.get<Translation>(`./i18n/${lang}.json`);
  }
}
