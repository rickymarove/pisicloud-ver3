import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMockupComponent } from './ui-mockup';

describe('UiMockupComponent', () => {
  let component: UiMockupComponent;
  let fixture: ComponentFixture<UiMockupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMockupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders top bar with PISICloud logo, "Management Overview" badge, and info icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('header img[alt="PISICloud logo"]') as HTMLImageElement;
    expect(logo).toBeTruthy();
    expect(logo.getAttribute('src')).toBe('/images/pisicloud-logo.svg');

    const badge = compiled.querySelector('header .rounded-full');
    expect(badge).toBeTruthy();
    expect(badge?.textContent?.trim()).toBe('Management Overview');

    const info = compiled.querySelector('header [aria-label="Info"]');
    expect(info).toBeTruthy();
    expect(info?.textContent?.trim()).toBe('i');
  });

  it('renders sidebar with all 9 navigation items and Dashboard active state', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sidebar = compiled.querySelector('aside');
    expect(sidebar).toBeTruthy();

    const items = sidebar?.querySelectorAll(':scope > div');
    expect(items?.length).toBe(9);

    const expectedNames = [
      'Home',
      'Dashboard',
      'Finance',
      'Sales',
      'Purchasing',
      'Inventory',
      'Production',
      'Project',
      'Analytics',
    ];

    expectedNames.forEach((name, index) => {
      expect(items?.[index]?.textContent?.trim()).toContain(name);
    });

    const activeItem = items?.[1];
    expect(activeItem?.classList.contains('bg-[#E3F5EE]')).toBe(true);
    expect(activeItem?.textContent?.trim()).toContain('Dashboard');
  });

  it('renders "All Active Employee" stats with Temporary, Permanent, and Total counts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (el) => el.textContent?.trim() === 'All Active Employee'
    );
    expect(cardTitle).toBeTruthy();

    const card = cardTitle?.closest('.bg-white');
    expect(card?.textContent).toContain('17');
    expect(card?.textContent).toContain('Temporary');
    expect(card?.textContent).toContain('20');
    expect(card?.textContent).toContain('Permanent');
    expect(card?.textContent).toContain('37');
    expect(card?.textContent).toContain('Total');
  });

  it('renders "New Hire" metric with count 0', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (el) => el.textContent?.trim() === 'New Hire'
    );
    expect(cardTitle).toBeTruthy();

    const card = cardTitle?.closest('.bg-white');
    expect(card?.textContent).toContain('0');
  });

  it('renders "Employees" gender stats (Male 28, Female 37) and "Resign" metric (0)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const empTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (el) => el.textContent?.trim() === 'Employees'
    );
    expect(empTitle).toBeTruthy();
    const empCard = empTitle?.closest('.bg-white');
    expect(empCard?.textContent).toContain('28');
    expect(empCard?.textContent).toContain('Male');
    expect(empCard?.textContent).toContain('37');
    expect(empCard?.textContent).toContain('Female');

    const resignTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (el) => el.textContent?.trim() === 'Resign'
    );
    expect(resignTitle).toBeTruthy();
    const resignCard = resignTitle?.closest('.bg-white');
    expect(resignCard?.textContent).toContain('0');
  });

  it('renders "Eoc (End Of Contract)" table with dark header and 3 data rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (el) => el.textContent?.trim() === 'Eoc (End Of Contract)'
    );
    expect(cardTitle).toBeTruthy();

    const card = cardTitle?.closest('.bg-white');
    const table = card?.querySelector('table');
    expect(table).toBeTruthy();

    const headers = table?.querySelectorAll('thead th');
    expect(headers?.length).toBe(3);
    expect(headers?.[0]?.textContent?.trim()).toBe('ID');
    expect(headers?.[1]?.textContent?.trim()).toBe('Name');
    expect(headers?.[2]?.textContent?.trim()).toBe('Resign Date');

    const rows = table?.querySelectorAll('tbody tr');
    expect(rows?.length).toBe(3);
    expect(rows?.[0]?.textContent).toContain('12345');
    expect(rows?.[0]?.textContent).toContain('Zafran');
    expect(rows?.[0]?.textContent).toContain('11 / 16 / 2026');
  });

  it('renders "Document Expired" table with 5 rows and proper doc types', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (el) => el.textContent?.trim() === 'Document Expired'
    );
    expect(cardTitle).toBeTruthy();

    const card = cardTitle?.closest('.bg-white');
    const table = card?.querySelector('table');
    const rows = table?.querySelectorAll('tbody tr');
    expect(rows?.length).toBe(5);
    expect(table?.textContent).toContain('BPJS');
    expect(table?.textContent).toContain('KITAS');
  });

  it('renders "Consecutive Absences with Notice (Days)" table with 5 rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (el) => el.textContent?.trim() === 'Consecutive Absences with Notice (Days)'
    );
    expect(cardTitle).toBeTruthy();

    const card = cardTitle?.closest('.bg-white');
    const table = card?.querySelector('table');
    const rows = table?.querySelectorAll('tbody tr');
    expect(rows?.length).toBe(5);
    expect(table?.textContent).toContain('Zafran');
    expect(table?.textContent).toContain('Dzikri');
    expect(table?.textContent).toContain('Gery');
  });

  it('applies responsive classes for mobile scrollable navigation and tables', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aside = compiled.querySelector('aside');
    expect(aside?.classList.contains('overflow-x-auto')).toBe(true);
    expect(aside?.classList.contains('md:flex-col')).toBe(true);

    const tables = compiled.querySelectorAll('table');
    tables.forEach((table) => {
      const parent = table.parentElement;
      expect(parent?.classList.contains('overflow-x-auto')).toBe(true);
    });
  });
});
