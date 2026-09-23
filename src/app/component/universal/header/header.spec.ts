import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    component.isMobileMenuOpen = true;
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('#mobile-menu a') as HTMLAnchorElement;
    link.click();

    expect(component.isMobileMenuOpen).toBe(false);
  });

  it('closes both menus on Escape', () => {
    component.isMobileMenuOpen = true;
    component.isLangMenuOpen = true;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(component.isMobileMenuOpen).toBe(false);
    expect(component.isLangMenuOpen).toBe(false);
  });

  it('keeps the mobile navigation open when a language is selected', () => {
    component.isMobileMenuOpen = true;
    component.isLangMenuOpen = true;

    component.selectLang(component.languages[1]);

    expect(component.selectedLang.code).toBe('ID');
    expect(component.isLangMenuOpen).toBe(false);
    expect(component.isMobileMenuOpen).toBe(true);
  });
});
