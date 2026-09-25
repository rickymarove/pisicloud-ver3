import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inject, provideAppInitializer } from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { HeroComponent } from './hero';
import { LanguageService } from '../../core/services/language.service';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        provideTranslateService({ fallbackLang: 'id', lang: 'id' }),
        LanguageService,
        provideAppInitializer(() => inject(LanguageService).init()),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      HERO: {
        TITLE_LINE1: 'Manajemen SDM Efisien bersama',
        BRAND: 'PISICloud',
        TITLE_LINE2_SUFFIX: 'HRM',
        SUBTITLE: 'Kelola seluruh proses pengelolaan karyawan dalam satu sistem yang terhubung, dari kehadiran hingga penggajian.',
        CTA_PRIMARY: 'Kontak Kami',
        CTA_SECONDARY: 'Lihat Video',
      },
    });
    translateService.setTranslation('en', {
      HERO: {
        TITLE_LINE1: 'Efficient HR Management with',
        BRAND: 'PISICloud',
        TITLE_LINE2_SUFFIX: 'HRM',
        SUBTITLE: 'Manage the entire employee lifecycle in one connected system, from attendance to payroll.',
        CTA_PRIMARY: 'Contact Us',
        CTA_SECONDARY: 'Watch Video',
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders headline with Inter font (font-sans) in 2 distinct line blocks', () => {
    const heading = fixture.nativeElement.querySelector('h1') as HTMLElement;
    expect(heading).toBeTruthy();
    expect(heading.classList.contains('font-sans')).toBe(true);
    expect(
      heading.classList.contains('font-bold') ||
      heading.classList.contains('font-extrabold') ||
      heading.classList.contains('font-[700]') ||
      heading.classList.contains('font-[800]')
    ).toBe(true);
    
    const lineSpans = heading.querySelectorAll(':scope > span');
    expect(lineSpans.length).toBe(2);
    expect(lineSpans[0].textContent).toContain('Manajemen SDM Efisien bersama');
    expect(lineSpans[1].textContent).toContain('PISICloud HRM');

    const brandHighlight = heading.querySelector('.text-\\[\\#0E6C5E\\]') as HTMLElement;
    expect(brandHighlight).toBeTruthy();
    expect(brandHighlight.textContent).toContain('PISICloud');
  });

  it('renders subtitle with DM Sans font (font-display) and regular 400 weight with wide single-line layout', () => {
    const subtitle = fixture.nativeElement.querySelector('p') as HTMLElement;
    expect(subtitle).toBeTruthy();
    expect(subtitle.classList.contains('font-display')).toBe(true);
    expect(subtitle.classList.contains('font-normal') || subtitle.classList.contains('font-[400]')).toBe(true);
    expect(subtitle.classList.contains('lg:whitespace-nowrap')).toBe(true);
    expect(subtitle.textContent).toContain('Kelola seluruh proses pengelolaan karyawan dalam satu sistem yang terhubung, dari kehadiran hingga penggajian.');
  });

  it('renders primary CTA button "Kontak Kami" with DM Sans, SemiBold, shorter padding, gradient background, and emits contactUs event on click', () => {
    const primaryBtn = fixture.nativeElement.querySelector('a[href="#contact"]') as HTMLAnchorElement;
    expect(primaryBtn).toBeTruthy();
    expect(primaryBtn.textContent?.trim()).toBe('Kontak Kami');
    expect(primaryBtn.classList.contains('font-display')).toBe(true);
    expect(primaryBtn.classList.contains('font-semibold')).toBe(true);
    expect(primaryBtn.classList.contains('py-2.5')).toBe(true);
    expect(primaryBtn.classList.contains('bg-linear-to-r')).toBe(true);

    const spy = vi.spyOn(component.contactUs, 'emit');
    primaryBtn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('renders secondary CTA button "Lihat Video" with DM Sans, SemiBold, shorter padding, gradient border/text, and emits watchVideo event on click', () => {
    const secondaryBtn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(secondaryBtn).toBeTruthy();
    expect(secondaryBtn.textContent?.trim()).toBe('Lihat Video');
    expect(secondaryBtn.classList.contains('font-display')).toBe(true);
    expect(secondaryBtn.classList.contains('font-semibold')).toBe(true);
    expect(secondaryBtn.classList.contains('py-2.5')).toBe(true);
    const gradientSpan = secondaryBtn.querySelector('span.bg-linear-to-r') as HTMLElement;
    expect(gradientSpan).toBeTruthy();

    const spy = vi.spyOn(component.watchVideo, 'emit');
    secondaryBtn.click();
    expect(spy).toHaveBeenCalled();
  });

  it('switches translations dynamically when language changes', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const heading = fixture.nativeElement.querySelector('h1') as HTMLElement;
    const subtitle = fixture.nativeElement.querySelector('p') as HTMLElement;
    const primaryBtn = fixture.nativeElement.querySelector('a[href="#contact"]') as HTMLAnchorElement;
    const secondaryBtn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(heading.textContent).toContain('Efficient HR Management with');
    expect(subtitle.textContent).toContain('Manage the entire employee lifecycle');
    expect(primaryBtn.textContent?.trim()).toBe('Contact Us');
    expect(secondaryBtn.textContent?.trim()).toBe('Watch Video');
  });

  it('renders the UI mockup component within the hero section', () => {
    const mockup = fixture.nativeElement.querySelector('app-ui-mockup');
    expect(mockup).toBeTruthy();
  });
});
