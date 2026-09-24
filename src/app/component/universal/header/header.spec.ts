import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header';
import { LanguageService } from '../../../core/services/language.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideTranslateService({ fallbackLang: 'en', lang: 'en' }),
        LanguageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains 5 supported languages', () => {
    expect(component.languages.length).toBe(5);
    const codes = component.languages.map((l) => l.code);
    expect(codes).toEqual(['EN', 'ID', 'JA', 'KO', 'ZH']);
  });

  it('opens and closes the mobile navigation from its toggle', () => {
    const toggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;

    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('#mobile-menu').hidden).toBe(false);

    toggle.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen).toBe(false);
    expect(fixture.nativeElement.querySelector('#mobile-menu').hidden).toBe(true);
  });

  it('closes the mobile navigation when a link is selected', () => {
    const toggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('#mobile-menu a') as HTMLAnchorElement;
    link.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('closes both menus on Escape', () => {
    const toggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
    toggle.click();
    component.toggleLangMenu();
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.isMobileMenuOpen).toBe(false);
    expect(component.isLangMenuOpen).toBe(false);
  });

  it('switches language and keeps mobile navigation open when selected', () => {
    const toggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
    toggle.click();
    component.toggleLangMenu();
    fixture.detectChanges();

    const japanese = component.languages.find((l) => l.code === 'JA')!;
    component.selectLang(japanese);
    fixture.detectChanges();

    expect(component.selectedLang.code).toBe('JA');
    expect(component.selectedLang.langKey).toBe('ja');
    expect(component.isLangMenuOpen).toBe(false);
    expect(component.isMobileMenuOpen).toBe(true);
  });
});
