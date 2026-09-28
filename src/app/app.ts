import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/universal/header/header';
import { HeroComponent } from './component/landing/hero/hero';
import { Feature } from './component/feature/feature';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pisicloud-v3');
}
