import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppLayout } from './layout/layout';

/**
 * @REVIEW Root application component
 * Uses AppLayout for main structure with sidebar navigation
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout>
      <router-outlet />
    </app-layout>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class App {}
