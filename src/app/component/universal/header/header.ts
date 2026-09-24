import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageOption, LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'universal-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.html',
})
export class HeaderComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly languageService = inject(LanguageService);

  navLinks = [
    { key: 'HEADER.NAV.FEATURES', href: '#features' },
    { key: 'HEADER.NAV.RESOURCES', href: '#resources' },
    { key: 'HEADER.NAV.SUPPORT', href: '#support' },
  ];

  isLangMenuOpen = false;
  isMobileMenuOpen = false;

  get languages(): LanguageOption[] {
    return this.languageService.languages;
  }

  get selectedLang(): LanguageOption {
    return this.languageService.currentLanguage();
  }

  toggleLangMenu(event?: MouseEvent): void {
    event?.stopPropagation();
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  selectLang(lang: LanguageOption): void {
    this.languageService.setLanguage(lang);
    this.isLangMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isLangMenuOpen = false;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isLangMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isLangMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeMenus(): void {
    this.isMobileMenuOpen = false;
    this.isLangMenuOpen = false;
  }

  onScheduleDemo(): void {
    // TODO: hook up to actual demo scheduling flow
  }
}

