import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

export interface FeatureItem {
  id: string;
  image: string;
  titleKey: string;
  descKey: string;
  slug: string;
}

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './feature.html',
  styleUrl: './feature.css',
  host: {
    class: 'block relative z-10',
  },
})
export class Feature {
  @Output() learnMore = new EventEmitter<FeatureItem>();

  features: FeatureItem[] = [
    {
      id: 'attendance-machine',
      image: '/images/features/attendance-machine.webp',
      titleKey: 'FEATURE.ITEMS.ATTENDANCE_MACHINE.TITLE',
      descKey: 'FEATURE.ITEMS.ATTENDANCE_MACHINE.DESC',
      slug: 'attendance-machine',
    },
    {
      id: 'attendance',
      image: '/images/features/attendance.webp',
      titleKey: 'FEATURE.ITEMS.ATTENDANCE.TITLE',
      descKey: 'FEATURE.ITEMS.ATTENDANCE.DESC',
      slug: 'attendance',
    },
    {
      id: 'collective-leave',
      image: '/images/features/collective-leave.webp',
      titleKey: 'FEATURE.ITEMS.COLLECTIVE_LEAVE.TITLE',
      descKey: 'FEATURE.ITEMS.COLLECTIVE_LEAVE.DESC',
      slug: 'collective-leave',
    },
    {
      id: 'personal-leave',
      image: '/images/features/personal-leave.webp',
      titleKey: 'FEATURE.ITEMS.PERSONAL_LEAVE.TITLE',
      descKey: 'FEATURE.ITEMS.PERSONAL_LEAVE.DESC',
      slug: 'personal-leave',
    },
    {
      id: 'personal-attendance',
      image: '/images/features/personal-attendance.webp',
      titleKey: 'FEATURE.ITEMS.PERSONAL_ATTENDANCE.TITLE',
      descKey: 'FEATURE.ITEMS.PERSONAL_ATTENDANCE.DESC',
      slug: 'personal-attendance',
    },
    {
      id: 'recruitment',
      image: '/images/features/recruitment.webp',
      titleKey: 'FEATURE.ITEMS.RECRUITMENT.TITLE',
      descKey: 'FEATURE.ITEMS.RECRUITMENT.DESC',
      slug: 'recruitment',
    },
    {
      id: 'collective-overtime',
      image: '/images/features/collective-overtime.webp',
      titleKey: 'FEATURE.ITEMS.COLLECTIVE_OVERTIME.TITLE',
      descKey: 'FEATURE.ITEMS.COLLECTIVE_OVERTIME.DESC',
      slug: 'collective-overtime',
    },
    {
      id: 'database-management',
      image: '/images/features/database-management.webp',
      titleKey: 'FEATURE.ITEMS.DATABASE_MANAGEMENT.TITLE',
      descKey: 'FEATURE.ITEMS.DATABASE_MANAGEMENT.DESC',
      slug: 'database-management',
    },
    {
      id: 'employee-data-update',
      image: '/images/features/employee-data-update.webp',
      titleKey: 'FEATURE.ITEMS.EMPLOYEE_DATA_UPDATE.TITLE',
      descKey: 'FEATURE.ITEMS.EMPLOYEE_DATA_UPDATE.DESC',
      slug: 'employee-data-update',
    },
    {
      id: 'payroll',
      image: '/images/features/payroll.webp',
      titleKey: 'FEATURE.ITEMS.PAYROLL.TITLE',
      descKey: 'FEATURE.ITEMS.PAYROLL.DESC',
      slug: 'payroll',
    },
    {
      id: 'personal-overtime',
      image: '/images/features/personal-overtime.webp',
      titleKey: 'FEATURE.ITEMS.PERSONAL_OVERTIME.TITLE',
      descKey: 'FEATURE.ITEMS.PERSONAL_OVERTIME.DESC',
      slug: 'personal-overtime',
    },
    {
      id: 'yearly-tax',
      image: '/images/features/yearly-tax.webp',
      titleKey: 'FEATURE.ITEMS.YEARLY_TAX.TITLE',
      descKey: 'FEATURE.ITEMS.YEARLY_TAX.DESC',
      slug: 'yearly-tax',
    },
  ];

  onLearnMore(item: FeatureItem): void {
    this.learnMore.emit(item);
  }
}
