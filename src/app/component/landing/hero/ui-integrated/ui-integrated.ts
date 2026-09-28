import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface MiniNavItem {
  name: string;
  active?: boolean;
}

export interface SubCardItem {
  id: 'attendance' | 'payroll' | 'hr';
  titleKey: string;
  defaultTitle: string;
  iconType: 'attendance' | 'payroll' | 'hr';
  bulletKeys: string[];
  defaultBullets: string[];
  actionKey: string;
  defaultAction: string;
}

@Component({
  selector: 'app-ui-integrated',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './ui-integrated.html',
  host: {
    class: 'block w-full',
  },
})
export class UiIntegratedComponent {
  @Output() ctaClick = new EventEmitter<void>();
  @Output() subCardClick = new EventEmitter<string>();

  readonly navItems: MiniNavItem[] = [
    { name: 'Home', active: true },
    { name: 'Dashboard' },
    { name: 'Finance' },
    { name: 'Sales' },
    { name: 'Purchasing' },
    { name: 'Inventory' },
    { name: 'Production' },
  ];

  readonly subCards: SubCardItem[] = [
    {
      id: 'attendance',
      titleKey: 'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.TITLE',
      defaultTitle: 'Attendance',
      iconType: 'attendance',
      bulletKeys: [
        'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.BULLET_1',
        'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.BULLET_2',
        'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.BULLET_3',
      ],
      defaultBullets: ['Check-in / Check-out', 'Lembur', 'Cuti & Izin'],
      actionKey: 'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.ACTION',
      defaultAction: 'Lihat Detail',
    },
    {
      id: 'payroll',
      titleKey: 'UI_INTEGRATED.SUB_CARDS.PAYROLL.TITLE',
      defaultTitle: 'Payroll',
      iconType: 'payroll',
      bulletKeys: [
        'UI_INTEGRATED.SUB_CARDS.PAYROLL.BULLET_1',
        'UI_INTEGRATED.SUB_CARDS.PAYROLL.BULLET_2',
        'UI_INTEGRATED.SUB_CARDS.PAYROLL.BULLET_3',
      ],
      defaultBullets: ['Gaji Pokok', 'Tunjangan', 'Potongan'],
      actionKey: 'UI_INTEGRATED.SUB_CARDS.PAYROLL.ACTION',
      defaultAction: 'Lihat Detail',
    },
    {
      id: 'hr',
      titleKey: 'UI_INTEGRATED.SUB_CARDS.HR.TITLE',
      defaultTitle: 'HR',
      iconType: 'hr',
      bulletKeys: [
        'UI_INTEGRATED.SUB_CARDS.HR.BULLET_1',
        'UI_INTEGRATED.SUB_CARDS.HR.BULLET_2',
        'UI_INTEGRATED.SUB_CARDS.HR.BULLET_3',
      ],
      defaultBullets: ['Profil Karyawan', 'Performance', 'Dokumen'],
      actionKey: 'UI_INTEGRATED.SUB_CARDS.HR.ACTION',
      defaultAction: 'Lihat Detail',
    },
  ];

  onCtaClick(): void {
    this.ctaClick.emit();
  }

  onSubCardClick(cardId: string): void {
    this.subCardClick.emit(cardId);
  }
}
