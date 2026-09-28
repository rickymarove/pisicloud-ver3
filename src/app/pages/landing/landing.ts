import { Component } from '@angular/core';
import { HeroComponent } from '../../component/landing/hero/hero';
import { UiIntegratedComponent } from '../../component/landing/hero/ui-integrated/ui-integrated';
import { Feature } from '../../component/landing/feature/feature';

@Component({
  selector: 'app-landing',
  imports: [HeroComponent, UiIntegratedComponent, Feature],
  templateUrl: './landing.html',
})
export class Landing {}
