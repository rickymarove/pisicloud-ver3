import { Component } from '@angular/core';
import { HeroComponent } from '../../component/landing/hero/hero';
import { Feature } from '../../component/landing/feature/feature';

@Component({
  selector: 'app-landing',
  imports: [HeroComponent, Feature],
  templateUrl: './landing.html',
})
export class Landing {}
