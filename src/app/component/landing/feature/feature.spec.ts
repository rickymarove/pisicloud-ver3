import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { Feature } from './feature';
import { vi } from 'vitest';

describe('Feature', () => {
  let component: Feature;
  let fixture: ComponentFixture<Feature>;
  let translateService: TranslateService;

  const mockIdTranslations = {
    FEATURE: {
      TITLE_PREFIX: '12 Fitur Utama',
      TITLE_BRAND: 'PISICloud',
      SUBTITLE: 'Kapabilitas yang saling terhubung untuk menjalankan proses operasional SDM dan menghasilkan informasi management yang konsisten.',
      LEARN_MORE: 'Pelajari Selengkapnya',
      ITEMS: {
        ATTENDANCE_MACHINE: {
          TITLE: 'Mesin Absensi & Biometrik',
          DESC: 'Integrasi langsung dengan mesin absensi sidik jari, face recognition, dan RFID.',
        },
        ATTENDANCE: {
          TITLE: 'Manajemen Kehadiran & Shift',
          DESC: 'Pantau kehadiran karyawan dan pengaturan jadwal kerja fleksibel.',
        },
        COLLECTIVE_LEAVE: {
          TITLE: 'Pengelolaan Cuti Bersama',
          DESC: 'Pengaturan jadwal libur nasional dan cuti bersama.',
        },
        PERSONAL_LEAVE: {
          TITLE: 'Pengajuan Cuti Pribadi',
          DESC: 'Pengajuan cuti tahunan, cuti sakit, dan izin khusus.',
        },
        PERSONAL_ATTENDANCE: {
          TITLE: 'Absensi Mandiri & GPS Mobile',
          DESC: 'Kemudahan absensi mandiri karyawan melalui aplikasi mobile.',
        },
        RECRUITMENT: {
          TITLE: 'Rekrutmen & Onboarding',
          DESC: 'Kelola seluruh proses rekrutmen hingga onboarding.',
        },
        COLLECTIVE_OVERTIME: {
          TITLE: 'Lembur Bersama (Kolektif)',
          DESC: 'Pembuatan Surat Perintah Lembur massal per divisi.',
        },
        DATABASE_MANAGEMENT: {
          TITLE: 'Database & Profil Karyawan',
          DESC: 'Sentralisasi data master karyawan dalam satu database.',
        },
        EMPLOYEE_DATA_UPDATE: {
          TITLE: 'Pembaruan Data Mandiri (ESS)',
          DESC: 'Berdayakan karyawan untuk memperbarui informasi personal.',
        },
        PAYROLL: {
          TITLE: 'Penggajian & Payroll Otomatis',
          DESC: 'Hitung gaji pokok, tunjangan, dan insentif secara otomatis.',
        },
        PERSONAL_OVERTIME: {
          TITLE: 'Pengajuan Lembur Pribadi',
          DESC: 'Pengajuan jam kerja lembur mandiri oleh karyawan.',
        },
        YEARLY_TAX: {
          TITLE: 'Pajak Tahunan & PPh 21',
          DESC: 'Kalkulasi otomatis pajak penghasilan karyawan skema TER terbaru.',
        },
      },
    },
  };

  const mockEnTranslations = {
    FEATURE: {
      TITLE_PREFIX: '12 Key Features of',
      TITLE_BRAND: 'PISICloud',
      SUBTITLE: 'Interconnected capabilities to streamline HR operations.',
      LEARN_MORE: 'Learn More',
      ITEMS: {
        ATTENDANCE_MACHINE: {
          TITLE: 'Attendance Machine & Biometrics',
          DESC: 'Direct integration with biometric machines.',
        },
        ATTENDANCE: {
          TITLE: 'Attendance & Shift Management',
          DESC: 'Monitor employee attendance and shift rosters.',
        },
        COLLECTIVE_LEAVE: {
          TITLE: 'Collective Leave Management',
          DESC: 'Manage national holidays and collective company leave.',
        },
        PERSONAL_LEAVE: {
          TITLE: 'Personal Leave & Balance',
          DESC: 'Submit annual and sick leave requests online.',
        },
        PERSONAL_ATTENDANCE: {
          TITLE: 'Mobile Self-Clocking & GPS',
          DESC: 'Convenient mobile attendance with GPS geolocation.',
        },
        RECRUITMENT: {
          TITLE: 'Recruitment & Onboarding',
          DESC: 'End-to-end recruitment management.',
        },
        COLLECTIVE_OVERTIME: {
          TITLE: 'Collective Overtime Orders',
          DESC: 'Issue bulk overtime work orders per department.',
        },
        DATABASE_MANAGEMENT: {
          TITLE: 'Employee Database & Profiles',
          DESC: 'Centralize employee master data securely.',
        },
        EMPLOYEE_DATA_UPDATE: {
          TITLE: 'Employee Self-Service (ESS)',
          DESC: 'Empower employees to update personal details.',
        },
        PAYROLL: {
          TITLE: 'Automated Payroll Calculation',
          DESC: 'Automatically calculate base salary and deductions.',
        },
        PERSONAL_OVERTIME: {
          TITLE: 'Personal Overtime Requests',
          DESC: 'Self-service overtime submission by employees.',
        },
        YEARLY_TAX: {
          TITLE: 'Yearly Tax & PPh 21 Calculation',
          DESC: 'Automate employee income tax withholding calculations.',
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feature],
      providers: [
        provideTranslateService({ fallbackLang: 'id', lang: 'id' }),
        provideRouter([]),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', mockIdTranslations);
    translateService.setTranslation('en', mockEnTranslations);
    translateService.use('id');

    fixture = TestBed.createComponent(Feature);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders section title and subtitle correctly', () => {
    const heading = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain('12 Fitur Utama');
    expect(heading.textContent).toContain('PISICloud');

    const subtitle = fixture.nativeElement.querySelector('p') as HTMLElement;
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent).toContain('Kapabilitas yang saling terhubung');
  });

  it('renders all 12 feature cards in the responsive grid', () => {
    const cards = fixture.nativeElement.querySelectorAll('.group');
    expect(cards.length).toBe(12);

    const grid = fixture.nativeElement.querySelector('.grid') as HTMLElement;
    expect(grid).toBeTruthy();
    expect(grid.classList.contains('grid-cols-1')).toBe(true);
    expect(grid.classList.contains('md:grid-cols-2')).toBe(true);
    expect(grid.classList.contains('lg:grid-cols-3')).toBe(true);
  });

  it('renders image, title, description, and action button on each card', () => {
    const firstCard = fixture.nativeElement.querySelector('.group') as HTMLElement;
    expect(firstCard).toBeTruthy();

    const img = firstCard.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/images/features/attendance-machine.webp');
    expect(img.getAttribute('alt')).toBe('Mesin Absensi & Biometrik');

    const cardTitle = firstCard.querySelector('h3') as HTMLElement;
    expect(cardTitle.textContent?.trim()).toBe('Mesin Absensi & Biometrik');

    const cardDesc = firstCard.querySelector('p') as HTMLElement;
    expect(cardDesc.textContent?.trim()).toContain('Integrasi langsung dengan mesin absensi');

    const actionBtn = firstCard.querySelector('a') as HTMLAnchorElement;
    expect(actionBtn.textContent?.trim()).toBe('Pelajari Selengkapnya');
    expect(actionBtn.getAttribute('href')).toContain('/feature');
  });

  it('emits learnMore event when onLearnMore is called', () => {
    const spy = vi.spyOn(component.learnMore, 'emit');
    component.onLearnMore(component.features[0]);
    expect(spy).toHaveBeenCalledWith(component.features[0]);
  });

  it('switches translations dynamically when language is changed to en', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const heading = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(heading.textContent).toContain('12 Key Features of');

    const firstCard = fixture.nativeElement.querySelector('.group') as HTMLElement;
    const cardTitle = firstCard.querySelector('h3') as HTMLElement;
    expect(cardTitle.textContent?.trim()).toBe('Attendance Machine & Biometrics');

    const actionBtn = firstCard.querySelector('a') as HTMLAnchorElement;
    expect(actionBtn.textContent?.trim()).toBe('Learn More');
  });
});
