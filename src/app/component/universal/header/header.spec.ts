import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inject, provideAppInitializer } from '@angular/core';
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
        provideAppInitializer(() => inject(LanguageService).init()),
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

  it('closes both menus and mobile bottom sheet on Escape', () => {
    const toggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
    toggle.click();
    component.toggleLangMenu();
    component.openMobileLangSheet();
    fixture.detectChanges();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.isMobileMenuOpen).toBe(false);
    expect(component.isLangMenuOpen).toBe(false);
    expect(component.isMobileLangSheetOpen).toBe(false);
  });

  it('switches language and keeps mobile navigation open when selected on desktop', () => {
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

  it('renders flag emojis for supported languages and updates selected flag in desktop dropdown', () => {
    const langToggle = fixture.nativeElement.querySelector('.hidden.md\\:flex button[aria-expanded]') as HTMLButtonElement;
    expect(langToggle.textContent).toContain('🇬🇧');
    expect(langToggle.textContent).toContain('EN');

    langToggle.click();
    fixture.detectChanges();

    const menuItems = fixture.nativeElement.querySelectorAll('.hidden.md\\:flex ul li button');
    expect(menuItems.length).toBe(5);
    expect(menuItems[0].textContent).toContain('🇬🇧');
    expect(menuItems[0].textContent).toContain('English');
    expect(menuItems[1].textContent).toContain('🇮🇩');
    expect(menuItems[1].textContent).toContain('Bahasa Indonesia');

    (menuItems[1] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(component.selectedLang.code).toBe('ID');
    expect(component.selectedLang.flag).toBe('🇮🇩');
    expect(langToggle.textContent).toContain('🇮🇩');
    expect(langToggle.textContent).toContain('ID');
  });

  it('closes the desktop language menu when clicking outside the component', () => {
    const langToggle = fixture.nativeElement.querySelector('.hidden.md\\:flex button[aria-expanded]') as HTMLButtonElement;
    langToggle.click();
    fixture.detectChanges();
    expect(component.isLangMenuOpen).toBe(true);

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    outsideElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(component.isLangMenuOpen).toBe(false);
    document.body.removeChild(outsideElement);
  });

  it('opens and closes mobile bottom sheet from mobile language button and backdrop', () => {
    const mobileMenuToggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
    mobileMenuToggle.click();
    fixture.detectChanges();

    const mobileLangBtn = fixture.nativeElement.querySelector('#mobile-menu button[aria-haspopup="dialog"]') as HTMLButtonElement;
    expect(mobileLangBtn).toBeTruthy();
    expect(component.isMobileLangSheetOpen).toBe(false);

    mobileLangBtn.click();
    fixture.detectChanges();

    expect(component.isMobileLangSheetOpen).toBe(true);
    const dialog = fixture.nativeElement.querySelector('div[role="dialog"]');
    expect(dialog).toBeTruthy();

    const backdrop = dialog.querySelector('.bg-\\[\\#0f0f19\\]\\/40') as HTMLElement;
    expect(backdrop).toBeTruthy();

    backdrop.click();
    fixture.detectChanges();

    expect(component.isMobileLangSheetOpen).toBe(false);
  });

  it('switches language and auto-closes mobile bottom sheet after delay', async () => {
    const mobileMenuToggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
    mobileMenuToggle.click();
    fixture.detectChanges();

    const mobileLangBtn = fixture.nativeElement.querySelector('#mobile-menu button[aria-haspopup="dialog"]') as HTMLButtonElement;
    mobileLangBtn.click();
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('div[role="dialog"] button[role="option"]');
    expect(options.length).toBe(5);

    // Tap Bahasa Indonesia
    (options[1] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(component.selectedLang.code).toBe('ID');
    expect(component.isMobileLangSheetOpen).toBe(true);

    await new Promise((resolve) => setTimeout(resolve, 250));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.isMobileLangSheetOpen).toBe(false);
    expect(mobileLangBtn.textContent).toContain('🇮🇩');
    expect(mobileLangBtn.textContent).toContain('ID');
  });

  it('traps focus with Tab and Shift+Tab inside the bottom sheet', async () => {
    const mobileMenuToggle = fixture.nativeElement.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
    mobileMenuToggle.click();
    fixture.detectChanges();

    const mobileLangBtn = fixture.nativeElement.querySelector('#mobile-menu button[aria-haspopup="dialog"]') as HTMLButtonElement;
    mobileLangBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = fixture.nativeElement.querySelector('div[role="dialog"]');
    const buttons = dialog.querySelectorAll('button:not([disabled])');
    const closeBtn = buttons[0] as HTMLButtonElement;
    const lastOption = buttons[buttons.length - 1] as HTMLButtonElement;

    // Simulate Tab on last button -> focus first
    lastOption.focus();
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    component.onSheetKeyDown(tabEvent);
    expect(tabEvent.defaultPrevented).toBe(true);

    // Simulate Shift+Tab on first button -> focus last
    closeBtn.focus();
    const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    component.onSheetKeyDown(shiftTabEvent);
    expect(shiftTabEvent.defaultPrevented).toBe(true);
  });
});
