import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UiMockupComponent } from './ui-mockup/ui-mockup';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe, UiMockupComponent],
  templateUrl: './hero.html',
  host: {
    class: 'block relative z-10',
  },
})
export class HeroComponent {
  @Output() contactUs = new EventEmitter<void>();
  @Output() watchVideo = new EventEmitter<void>();

  onContactUs(): void {
    this.contactUs.emit();
  }

  onWatchVideo(): void {
    this.watchVideo.emit();
  }
}
