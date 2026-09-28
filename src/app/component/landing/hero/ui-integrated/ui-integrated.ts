import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import {
  LucideUser,
  LucideUsers,
  LucideCalendar,
  LucideWallet,
  LucideArrowRight,
} from '@lucide/angular';

export interface MiniNavItem {
  name: string;
  active?: boolean;
}

export interface SubCardItem {
  id: 'attendance' | 'payroll' | 'hr';
  title: string;
  iconType: 'attendance' | 'payroll' | 'hr';
  bulletKeys: string[];
  actionKey: string;
}

@Component({
  selector: 'app-ui-integrated',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    LucideUser,
    LucideUsers,
    LucideCalendar,
    LucideWallet,
    LucideArrowRight,
  ],
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
      title: 'Attendance',
      iconType: 'attendance',
      bulletKeys: [
        'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.BULLET_1',
        'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.BULLET_2',
        'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.BULLET_3',
      ],
      actionKey: 'UI_INTEGRATED.SUB_CARDS.ATTENDANCE.ACTION',
    },
    {
      id: 'payroll',
      title: 'Payroll',
      iconType: 'payroll',
      bulletKeys: [
        'UI_INTEGRATED.SUB_CARDS.PAYROLL.BULLET_1',
        'UI_INTEGRATED.SUB_CARDS.PAYROLL.BULLET_2',
        'UI_INTEGRATED.SUB_CARDS.PAYROLL.BULLET_3',
      ],
      actionKey: 'UI_INTEGRATED.SUB_CARDS.PAYROLL.ACTION',
    },
    {
      id: 'hr',
      title: 'HR',
      iconType: 'hr',
      bulletKeys: [
        'UI_INTEGRATED.SUB_CARDS.HR.BULLET_1',
        'UI_INTEGRATED.SUB_CARDS.HR.BULLET_2',
        'UI_INTEGRATED.SUB_CARDS.HR.BULLET_3',
      ],
      actionKey: 'UI_INTEGRATED.SUB_CARDS.HR.ACTION',
    },
  ];

  onCtaClick(): void {
    this.ctaClick.emit();
  }

  onSubCardClick(cardId: string): void {
    this.subCardClick.emit(cardId);
  }
}
