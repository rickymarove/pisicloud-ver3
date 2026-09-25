import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './hero.html',
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
