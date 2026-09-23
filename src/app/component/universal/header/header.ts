import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'universal-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Resources', href: '#resources' },
    { label: 'Support', href: '#support' },
  ];

  isLangMenuOpen = false;

  languages = [
    { code: 'EN', label: 'English', flag: '🇬🇧' },
    { code: 'ID', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  ];

  selectedLang = this.languages[0];

  toggleLangMenu(): void {
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  selectLang(lang: (typeof this.languages)[number]): void {
    this.selectedLang = lang;
    this.isLangMenuOpen = false;
  }

  onScheduleDemo(): void {
    // TODO: hook up to actual demo scheduling flow
  }
}
