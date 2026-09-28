import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavItem {
  name: string;
  active?: boolean;
}

export interface ActiveEmployeeStats {
  temporary: number;
  permanent: number;
  total: number;
}

export interface GenderStats {
  male: number;
  female: number;
}

export interface ContractEndRecord {
  id: string;
  name: string;
  resignDate: string;
}

export interface ExpiredDocumentRecord {
  employeeId: string;
  docType: string;
  expiredDate: string;
}

export interface AbsenceRecord {
  id: string;
  name: string;
  resignDate: string;
}

@Component({
  selector: 'app-ui-mockup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-mockup.html',
})
export class UiMockupComponent {
  readonly navItems: NavItem[] = [
    { name: 'Home' },
    { name: 'Dashboard', active: true },
    { name: 'Finance' },
    { name: 'Sales' },
    { name: 'Purchasing' },
    { name: 'Inventory' },
    { name: 'Production' },
    { name: 'Project' },
    { name: 'Analytics' },
  ];

  readonly activeEmployeeStats: ActiveEmployeeStats = {
    temporary: 17,
    permanent: 20,
    total: 37,
  };

  readonly genderStats: GenderStats = {
    male: 28,
    female: 37,
  };

  readonly newHiresCount = 0;
  readonly resignCount = 0;

  readonly contractEndData: ContractEndRecord[] = [
    { id: '12345', name: 'Zafran', resignDate: '11 / 16 / 2026' },
    { id: '12346', name: 'Dzikri', resignDate: '11 / 16 / 2026' },
    { id: '12347', name: 'Gery', resignDate: '11 / 16 / 2026' },
  ];

  readonly documentExpiredData: ExpiredDocumentRecord[] = [
    { employeeId: '12345', docType: 'BPJS', expiredDate: '11 / 16 / 2026' },
    { employeeId: '12346', docType: 'BPJS', expiredDate: '11 / 16 / 2026' },
    { employeeId: '12347', docType: 'BPJS', expiredDate: '11 / 16 / 2026' },
    { employeeId: '12347', docType: 'KITAS', expiredDate: '11 / 16 / 2026' },
    { employeeId: '12347', docType: 'KITAS', expiredDate: '11 / 16 / 2026' },
  ];

  readonly consecutiveAbsencesData: AbsenceRecord[] = [
    { id: '12345', name: 'Zafran', resignDate: '11 / 16 / 2026' },
    { id: '12346', name: 'Dzikri', resignDate: '11 / 16 / 2026' },
    { id: '12347', name: 'Gery', resignDate: '11 / 16 / 2026' },
    { id: '12347', name: 'Gery', resignDate: '11 / 16 / 2026' },
    { id: '12347', name: 'Gery', resignDate: '11 / 16 / 2026' },
  ];
}
