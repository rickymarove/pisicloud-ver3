import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { UiIntegratedComponent } from './ui-integrated';

describe('UiIntegratedComponent', () => {
  let component: UiIntegratedComponent;
  let fixture: ComponentFixture<UiIntegratedComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiIntegratedComponent],
      providers: [
        provideTranslateService({ fallbackLang: 'id', lang: 'id' }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      UI_INTEGRATED: {
        SECTION_TITLE: 'Kendalikan bisnis dari satu tempat',
        SECTION_SUBTITLE: 'Pilih area yang ingin dilihat. Setiap proses terhubung ke data yang sama dan selalu dapat ditelusuri.',
        FLOATING_BADGE: {
          SUBTITLE: 'Data karyawan terpusat dalam satu sistem',
        },
        SUB_CARDS: {
          ATTENDANCE: {
            BULLET_1: 'Check-in / Check-out',
            BULLET_2: 'Lembur',
            BULLET_3: 'Cuti & Izin',
            ACTION: 'Lihat Detail',
          },
          PAYROLL: {
            BULLET_1: 'Gaji Pokok',
            BULLET_2: 'Tunjangan',
            BULLET_3: 'Potongan',
            ACTION: 'Lihat Detail',
          },
          HR: {
            BULLET_1: 'Profil Karyawan',
            BULLET_2: 'Performance',
            BULLET_3: 'Dokumen',
            ACTION: 'Lihat Detail',
          },
        },
        HERO_COPY: {
          TITLE_LINE1: 'Semua Kebutuhan',
          TITLE_LINE2_PREFIX: 'SDM, ',
          TITLE_LINE2_HIGHLIGHT: 'Lebih Mudah',
          TITLE_LINE3_HIGHLIGHT: 'Dikelola',
          DESCRIPTION: 'Dari kehadiran hingga penggajian dan pengelola karyawan, PISICloud membantu menyederhanakan proses administrasi melalui sistem yang terintergrasi',
          CTA_BUTTON: 'Lihat Detail',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(UiIntegratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders section title and subtitle with correct styling and content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h2');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Kendalikan bisnis dari satu tempat');

    const subtitle = compiled.querySelector('p');
    expect(subtitle).toBeTruthy();
    expect(subtitle?.textContent?.trim()).toContain('Pilih area yang ingin dilihat');
  });

  it('renders "Integrated HR System" card header inside the outer container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const systemTitle = compiled.querySelector('h3');
    expect(systemTitle).toBeTruthy();
    expect(systemTitle?.textContent?.trim()).toBe('Integrated HR System');
  });

  it('renders floating "Employee Data" pill badge with icon and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.rounded-2xl.border-gray-100\\/90');
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain('Employee Data');
    expect(badge?.textContent).toContain('Data karyawan terpusat dalam satu sistem');
  });

  it('renders top HR card with mini-sidebar navigation having "Home" as active', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navItems = compiled.querySelectorAll('.space-y-1 > div');
    expect(navItems.length).toBe(7);

    const firstNav = navItems[0];
    expect(firstNav.textContent).toContain('Home');
    expect(firstNav.classList.contains('bg-[#E5F5EF]')).toBe(true);
    expect(firstNav.classList.contains('text-[#0B4D46]')).toBe(true);
  });

  it('renders employee profile details (Budi Marove, Software Engineer, NIK, Intern, Active)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Budi Marove');
    expect(compiled.textContent).toContain('Software Engineer');
    expect(compiled.textContent).toContain('123456789');
    expect(compiled.textContent).toContain('Intern');
    expect(compiled.textContent).toContain('Active');
  });

  it('renders SVG connector tree on desktop screens with marker arrows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const svg = compiled.querySelector('svg[viewBox="0 0 480 72"]');
    expect(svg).toBeTruthy();

    const marker = svg?.querySelector('marker#arrow-integrated');
    expect(marker).toBeTruthy();

    const directPaths = svg?.querySelectorAll(':scope > path');
    expect(directPaths?.length).toBe(5); // trunk, horizontal, 3 branches
  });

  it('renders 3 sub-cards for Attendance, Payroll, and HR with bullet points and action buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subCardHeaders = compiled.querySelectorAll('.grid-cols-1.sm\\:grid-cols-3 h4');
    expect(subCardHeaders.length).toBe(3);
    expect(subCardHeaders[0].textContent?.trim()).toBe('Attendance');
    expect(subCardHeaders[1].textContent?.trim()).toBe('Payroll');
    expect(subCardHeaders[2].textContent?.trim()).toBe('HR');

    expect(compiled.textContent).toContain('Check-in / Check-out');
    expect(compiled.textContent).toContain('Lembur');
    expect(compiled.textContent).toContain('Cuti & Izin');

    expect(compiled.textContent).toContain('Gaji Pokok');
    expect(compiled.textContent).toContain('Tunjangan');
    expect(compiled.textContent).toContain('Potongan');

    expect(compiled.textContent).toContain('Profil Karyawan');
    expect(compiled.textContent).toContain('Performance');
    expect(compiled.textContent).toContain('Dokumen');
  });

  it('emits subCardClick when a sub-card action button is clicked', () => {
    const spy = vi.spyOn(component.subCardClick, 'emit');
    const actionButtons = fixture.nativeElement.querySelectorAll('.grid-cols-1.sm\\:grid-cols-3 button') as NodeListOf<HTMLButtonElement>;
    expect(actionButtons.length).toBe(3);

    actionButtons[0].click();
    expect(spy).toHaveBeenCalledWith('attendance');

    actionButtons[1].click();
    expect(spy).toHaveBeenCalledWith('payroll');

    actionButtons[2].click();
    expect(spy).toHaveBeenCalledWith('hr');
  });

  it('renders hero copy on the right with emerald highlights and emits ctaClick on button click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heroTitle = compiled.querySelectorAll('h3')[1];
    expect(heroTitle).toBeTruthy();
    expect(heroTitle.textContent).toContain('Semua Kebutuhan');
    expect(heroTitle.textContent).toContain('SDM, Lebih Mudah');
    expect(heroTitle.textContent).toContain('Dikelola');

    const ctaButton = compiled.querySelector('button.bg-linear-to-r') as HTMLButtonElement;
    expect(ctaButton).toBeTruthy();
    expect(ctaButton.textContent?.trim()).toBe('Lihat Detail');

    const spy = vi.spyOn(component.ctaClick, 'emit');
    ctaButton.click();
    expect(spy).toHaveBeenCalled();
  });

  it('renders Lucide icons for badge, avatar, sub-cards, and action buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('svg[lucideUsers]')).toBeTruthy();
    expect(compiled.querySelector('svg[lucideUser]')).toBeTruthy();
    expect(compiled.querySelector('svg[lucideCalendar]')).toBeTruthy();
    expect(compiled.querySelector('svg[lucideWallet]')).toBeTruthy();

    const arrowIcons = compiled.querySelectorAll('svg[lucideArrowRight]');
    expect(arrowIcons.length).toBe(3);
  });
});
