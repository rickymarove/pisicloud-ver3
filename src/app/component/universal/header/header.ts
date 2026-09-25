import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
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
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('mobileSheet') mobileSheetRef?: ElementRef<HTMLElement>;

  navLinks = [
    { key: 'HEADER.NAV.FEATURES', href: '#features' },
    { key: 'HEADER.NAV.RESOURCES', href: '#resources' },
    { key: 'HEADER.NAV.SUPPORT', href: '#support' },
  ];

  isLangMenuOpen = false;
  isMobileMenuOpen = false;
  isMobileLangSheetOpen = false;

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

  openMobileLangSheet(): void {
    this.isMobileLangSheetOpen = true;
    this.cdr.markForCheck();
    setTimeout(() => {
      if (this.mobileSheetRef?.nativeElement) {
        const selectedBtn =
          (this.mobileSheetRef.nativeElement.querySelector('button[role="option"][aria-selected="true"]') as HTMLElement) ||
          (this.mobileSheetRef.nativeElement.querySelector('button[role="option"]') as HTMLElement);
        selectedBtn?.focus();
      }
    }, 50);
  }

  closeMobileLangSheet(): void {
    this.isMobileLangSheetOpen = false;
    this.cdr.markForCheck();
  }

  selectMobileLang(lang: LanguageOption): void {
    this.languageService.setLanguage(lang);
    setTimeout(() => {
      this.closeMobileLangSheet();
    }, 200);
  }

  onSheetKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab' && this.mobileSheetRef?.nativeElement) {
      const focusables = this.mobileSheetRef.nativeElement.querySelectorAll<HTMLElement>('button:not([disabled])');
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isLangMenuOpen = false;
    if (!this.isMobileMenuOpen) {
      this.isMobileLangSheetOpen = false;
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isMobileLangSheetOpen = false;
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
    this.isMobileLangSheetOpen = false;
  }

  onScheduleDemo(): void {
    // TODO: hook up to actual demo scheduling flow
  }
}

