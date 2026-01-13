import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

/**
 * @REVIEW Chapter 9 Lesson 1 - Click & Button Feedback
 * Micro-interactions for immediate click feedback in CRM/ERP/dashboard apps
 */
@Component({
  selector: 'app-chapter9-lesson1',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      chapter="9"
      title="Click & Button Feedback"
      description="Micro-interactions for immediate click feedback. These subtle animations make enterprise dashboards feel responsive and alive.">

      <!-- Demo 1: Button Pulse -->
      <section class="demo-section">
        <h2 class="section-title">1. Button Pulse on Click</h2>
        <p class="section-desc">A subtle scale bounce that acknowledges user interaction.</p>

        <div class="demo-area">
          <button #pulseBtn class="btn-demo primary" (click)="animatePulse()">
            Click Me
          </button>
        </div>

        <div class="code-block">
          <pre>animate(button, {{ '{' }} scale: [1, 1.1, 1] {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Ripple Effect -->
      <section class="demo-section">
        <h2 class="section-title">2. Ripple Effect</h2>
        <p class="section-desc">Material-style click ripple that expands from the click point.</p>

        <div class="demo-area">
          <button #rippleBtn class="btn-demo ripple-container" (click)="animateRipple($event)">
            <span class="btn-text">Ripple Button</span>
            <span #rippleEl class="ripple"></span>
          </button>
        </div>

        <div class="code-block">
          <pre>animate(ripple, {{ '{' }} scale: [0, 4], opacity: [0.5, 0] {{ '}' }}, {{ '{' }} duration: 0.6 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: Success/Error States -->
      <section class="demo-section">
        <h2 class="section-title">3. Success/Error Button States</h2>
        <p class="section-desc">Color morph with icon swap for form submission feedback.</p>

        <div class="demo-area state-buttons">
          <button #successBtn class="btn-demo state-btn" [class.success]="successState()" (click)="animateSuccess()">
            <span class="btn-icon">{{ successState() ? '✓' : '💾' }}</span>
            <span>{{ successState() ? 'Saved!' : 'Save' }}</span>
          </button>

          <button #errorBtn class="btn-demo state-btn" [class.error]="errorState()" (click)="animateError()">
            <span class="btn-icon">{{ errorState() ? '✗' : '🗑️' }}</span>
            <span>{{ errorState() ? 'Failed!' : 'Delete' }}</span>
          </button>
        </div>

        <div class="code-block">
          <pre>// Success: scale bounce + color transition
animate(button, {{ '{' }} scale: [1, 1.05, 1] {{ '}' }}, spring({{ '{' }} stiffness: 400 {{ '}' }}))</pre>
        </div>
      </section>

      <!-- Demo 4: Icon Button Rotation -->
      <section class="demo-section">
        <h2 class="section-title">4. Icon Button Rotation</h2>
        <p class="section-desc">Satisfying rotation animation for icon-only buttons.</p>

        <div class="demo-area icon-buttons">
          <button #refreshBtn class="icon-btn" (click)="animateRefresh()">
            <span class="icon">⟳</span>
          </button>
          <button #settingsBtn class="icon-btn" (click)="animateSettings()">
            <span class="icon">⚙️</span>
          </button>
          <button #plusBtn class="icon-btn" (click)="animatePlus()">
            <span class="icon">+</span>
          </button>
        </div>

        <div class="code-block">
          <pre>animate(icon, {{ '{' }} rotate: 360 {{ '}' }}, {{ '{' }} duration: 0.5 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 5: Toggle Switch -->
      <section class="demo-section">
        <h2 class="section-title">5. Toggle Switch Animation</h2>
        <p class="section-desc">Smooth toggle with spring physics for settings panels.</p>

        <div class="demo-area toggles">
          <div class="toggle-group">
            <label class="toggle-wrapper" (click)="toggleSwitch1()">
              <div #toggle1 class="toggle" [class.active]="toggle1Active()">
                <div #knob1 class="toggle-knob"></div>
              </div>
              <span class="toggle-label">Notifications</span>
            </label>
          </div>

          <div class="toggle-group">
            <label class="toggle-wrapper" (click)="toggleSwitch2()">
              <div #toggle2 class="toggle" [class.active]="toggle2Active()">
                <div #knob2 class="toggle-knob"></div>
              </div>
              <span class="toggle-label">Dark Mode</span>
            </label>
          </div>
        </div>

        <div class="code-block">
          <pre>animate(knob, {{ '{' }} x: active ? 24 : 0 {{ '}' }}, spring({{ '{' }} stiffness: 500, damping: 30 {{ '}' }}))</pre>
        </div>
      </section>

      <!-- Demo 6: Checkbox with Spring -->
      <section class="demo-section">
        <h2 class="section-title">6. Checkbox with Spring Animation</h2>
        <p class="section-desc">Bouncy checkmark that feels satisfying to click.</p>

        <div class="demo-area checkboxes">
          @for (item of checkboxItems(); track item.id) {
            <label class="checkbox-wrapper" (click)="toggleCheckbox(item.id)">
              <div class="custom-checkbox" [class.checked]="item.checked">
                <span #checkmark class="checkmark" [attr.data-id]="item.id">✓</span>
              </div>
              <span class="checkbox-label">{{ item.label }}</span>
            </label>
          }
        </div>

        <div class="code-block">
          <pre>animate(checkmark, {{ '{' }} scale: [0, 1.2, 1] {{ '}' }}, spring({{ '{' }} stiffness: 400 {{ '}' }}))</pre>
        </div>
      </section>

      <!-- Demo 7: Copy to Clipboard -->
      <section class="demo-section">
        <h2 class="section-title">7. Copy-to-Clipboard Feedback</h2>
        <p class="section-desc">Icon swap with tooltip confirmation for copy actions.</p>

        <div class="demo-area">
          <div class="copy-container">
            <code class="copy-text">npm install motion</code>
            <button #copyBtn class="copy-btn" [class.copied]="copied()" (click)="animateCopy()">
              <span class="copy-icon">{{ copied() ? '✓' : '📋' }}</span>
              @if (copied()) {
                <span #tooltip class="copy-tooltip">Copied!</span>
              }
            </button>
          </div>
        </div>

        <div class="code-block">
          <pre>animate(tooltip, {{ '{' }} opacity: [0, 1], y: [-10, 0] {{ '}' }}, {{ '{' }} duration: 0.2 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 8: Submit Button Loading -->
      <section class="demo-section">
        <h2 class="section-title">8. Submit Button Loading State</h2>
        <p class="section-desc">Smooth transition to loading state with spinner.</p>

        <div class="demo-area">
          <button #submitBtn class="btn-demo submit-btn" [class.loading]="isLoading()" (click)="animateSubmit()">
            @if (isLoading()) {
              <span #spinner class="spinner"></span>
              <span>Processing...</span>
            } @else if (submitSuccess()) {
              <span class="success-icon">✓</span>
              <span>Done!</span>
            } @else {
              <span>Submit Form</span>
            }
          </button>
        </div>

        <div class="code-block">
          <pre>// Width collapse + spinner fade in
animate(button, {{ '{' }} width: [180, 140] {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2 class="section-title">📋 Click Feedback Cheat Sheet</h2>
        <div class="cheat-grid">
          <div class="cheat-item">
            <h4>Pulse</h4>
            <code>scale: [1, 1.1, 1]</code>
          </div>
          <div class="cheat-item">
            <h4>Ripple</h4>
            <code>scale + opacity spread</code>
          </div>
          <div class="cheat-item">
            <h4>Success</h4>
            <code>spring scale + color</code>
          </div>
          <div class="cheat-item">
            <h4>Rotate</h4>
            <code>rotate: 360</code>
          </div>
        </div>
      </section>
    </app-lesson-layout>
  `,
  styles: [`
    .demo-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .section-desc {
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .demo-area {
      min-height: 120px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
      padding: 24px;
    }

    .code-block {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 13px;
      overflow-x: auto;
    }

    .code-block pre {
      margin: 0;
      color: var(--text-secondary);
    }

    /* Button Styles */
    .btn-demo {
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: background-color 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-demo.primary {
      background: var(--accent-primary);
      color: white;
    }

    .btn-demo.primary:hover {
      background: var(--accent-hover);
    }

    /* Ripple */
    .ripple-container {
      position: relative;
      overflow: hidden;
      background: var(--accent-primary);
      color: white;
    }

    .ripple {
      position: absolute;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
    }

    .btn-text {
      position: relative;
      z-index: 1;
    }

    /* State Buttons */
    .state-buttons {
      flex-wrap: wrap;
    }

    .state-btn {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      min-width: 120px;
      justify-content: center;
    }

    .state-btn.success {
      background: #22c55e;
      border-color: #22c55e;
      color: white;
    }

    .state-btn.error {
      background: #ef4444;
      border-color: #ef4444;
      color: white;
    }

    .btn-icon {
      font-size: 16px;
    }

    /* Icon Buttons */
    .icon-buttons {
      gap: 24px;
    }

    .icon-btn {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .icon-btn:hover {
      background: var(--bg-hover);
    }

    .icon-btn .icon {
      font-size: 20px;
    }

    /* Toggle Switch */
    .toggles {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .toggle-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    .toggle {
      width: 52px;
      height: 28px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      position: relative;
      transition: background-color 0.2s;
    }

    .toggle.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
    }

    .toggle-knob {
      width: 22px;
      height: 22px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-label {
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Checkboxes */
    .checkboxes {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    .custom-checkbox {
      width: 24px;
      height: 24px;
      border: 2px solid var(--border-color);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      background: var(--bg-secondary);
    }

    .custom-checkbox.checked {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
    }

    .checkmark {
      color: white;
      font-size: 14px;
      font-weight: bold;
      transform: scale(0);
    }

    .custom-checkbox.checked .checkmark {
      transform: scale(1);
    }

    .checkbox-label {
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Copy to Clipboard */
    .copy-container {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-secondary);
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .copy-text {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 14px;
      color: var(--text-primary);
    }

    .copy-btn {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      background: var(--bg-hover);
    }

    .copy-btn.copied {
      background: #22c55e;
      border-color: #22c55e;
    }

    .copy-icon {
      font-size: 16px;
    }

    .copy-btn.copied .copy-icon {
      color: white;
    }

    .copy-tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-primary);
      color: var(--text-primary);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* Submit Button */
    .submit-btn {
      background: var(--accent-primary);
      color: white;
      min-width: 160px;
      justify-content: center;
    }

    .submit-btn.loading {
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--border-color);
      border-top-color: var(--accent-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .success-icon {
      color: #22c55e;
      font-size: 16px;
    }

    /* Cheat Sheet */
    .cheat-sheet {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px;
    }

    .cheat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .cheat-item {
      background: var(--bg-tertiary);
      padding: 16px;
      border-radius: 8px;
    }

    .cheat-item h4 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--accent-primary);
    }

    .cheat-item code {
      font-size: 12px;
      color: var(--text-secondary);
    }
  `]
})
export class Chapter9Lesson1 {
  // Element refs
  readonly pulseBtn = viewChild<ElementRef<HTMLElement>>('pulseBtn');
  readonly rippleEl = viewChild<ElementRef<HTMLElement>>('rippleEl');
  readonly successBtn = viewChild<ElementRef<HTMLElement>>('successBtn');
  readonly errorBtn = viewChild<ElementRef<HTMLElement>>('errorBtn');
  readonly refreshBtn = viewChild<ElementRef<HTMLElement>>('refreshBtn');
  readonly settingsBtn = viewChild<ElementRef<HTMLElement>>('settingsBtn');
  readonly plusBtn = viewChild<ElementRef<HTMLElement>>('plusBtn');
  readonly knob1 = viewChild<ElementRef<HTMLElement>>('knob1');
  readonly knob2 = viewChild<ElementRef<HTMLElement>>('knob2');
  readonly copyBtn = viewChild<ElementRef<HTMLElement>>('copyBtn');
  readonly submitBtn = viewChild<ElementRef<HTMLElement>>('submitBtn');

  // State signals
  readonly successState = signal(false);
  readonly errorState = signal(false);
  readonly toggle1Active = signal(false);
  readonly toggle2Active = signal(true);
  readonly copied = signal(false);
  readonly isLoading = signal(false);
  readonly submitSuccess = signal(false);

  readonly checkboxItems = signal([
    { id: 1, label: 'Enable notifications', checked: false },
    { id: 2, label: 'Auto-save drafts', checked: true },
    { id: 3, label: 'Show tooltips', checked: false }
  ]);

  // Demo 1: Pulse
  animatePulse(): void {
    const el = this.pulseBtn()?.nativeElement;
    if (el) {
      animate(el, { scale: [1, 1.1, 1] }, { duration: 0.3 });
    }
  }

  // Demo 2: Ripple
  animateRipple(event: MouseEvent): void {
    const ripple = this.rippleEl()?.nativeElement;
    const button = event.currentTarget as HTMLElement;
    if (ripple && button) {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - 25;
      const y = event.clientY - rect.top - 25;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      animate(ripple, { scale: [0, 4], opacity: [0.5, 0] }, { duration: 0.6 });
    }
  }

  // Demo 3: Success/Error States
  animateSuccess(): void {
    const el = this.successBtn()?.nativeElement;
    if (el) {
      this.successState.set(true);
      animate(el, { scale: [1, 1.05, 1] } as any, {
        type: spring,
        stiffness: 400,
        damping: 20
      });

      setTimeout(() => this.successState.set(false), 2000);
    }
  }

  animateError(): void {
    const el = this.errorBtn()?.nativeElement;
    if (el) {
      this.errorState.set(true);
      animate(el, { x: [0, -8, 8, -8, 8, 0] }, { duration: 0.4 });

      setTimeout(() => this.errorState.set(false), 2000);
    }
  }

  // Demo 4: Icon Rotations
  animateRefresh(): void {
    const el = this.refreshBtn()?.nativeElement?.querySelector('.icon');
    if (el) {
      animate(el, { rotate: [0, 360] }, { duration: 0.5 });
    }
  }

  animateSettings(): void {
    const el = this.settingsBtn()?.nativeElement?.querySelector('.icon');
    if (el) {
      animate(el, { rotate: [0, 180] }, { duration: 0.4 });
    }
  }

  animatePlus(): void {
    const el = this.plusBtn()?.nativeElement?.querySelector('.icon');
    if (el) {
      animate(el, { rotate: [0, 90], scale: [1, 1.2, 1] }, { duration: 0.3 });
    }
  }

  // Demo 5: Toggle Switches
  toggleSwitch1(): void {
    const knob = this.knob1()?.nativeElement;
    const newState = !this.toggle1Active();
    this.toggle1Active.set(newState);

    if (knob) {
      animate(knob, { x: newState ? 24 : 0 } as any, {
        type: spring,
        stiffness: 500,
        damping: 30
      });
    }
  }

  toggleSwitch2(): void {
    const knob = this.knob2()?.nativeElement;
    const newState = !this.toggle2Active();
    this.toggle2Active.set(newState);

    if (knob) {
      animate(knob, { x: newState ? 24 : 0 } as any, {
        type: spring,
        stiffness: 500,
        damping: 30
      });
    }
  }

  // Demo 6: Checkbox Toggle
  toggleCheckbox(id: number): void {
    this.checkboxItems.update(items =>
      items.map(item => {
        if (item.id === id) {
          const newChecked = !item.checked;

          // Find and animate the checkmark
          setTimeout(() => {
            const checkmark = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
            if (checkmark && newChecked) {
              animate(checkmark, { scale: [0, 1.2, 1] } as any, {
                type: spring,
                stiffness: 400,
                damping: 20
              });
            }
          }, 10);

          return { ...item, checked: newChecked };
        }
        return item;
      })
    );
  }

  // Demo 7: Copy to Clipboard
  animateCopy(): void {
    const btn = this.copyBtn()?.nativeElement;
    if (btn) {
      this.copied.set(true);
      animate(btn, { scale: [1, 0.9, 1] }, { duration: 0.2 });

      // Animate tooltip after render
      setTimeout(() => {
        const tooltip = btn.querySelector('.copy-tooltip') as HTMLElement;
        if (tooltip) {
          animate(tooltip, { opacity: [0, 1], y: [-10, 0] }, { duration: 0.2 });
        }
      }, 10);

      setTimeout(() => this.copied.set(false), 2000);
    }
  }

  // Demo 8: Submit Loading
  animateSubmit(): void {
    if (this.isLoading() || this.submitSuccess()) return;

    const btn = this.submitBtn()?.nativeElement;
    if (btn) {
      this.isLoading.set(true);

      // Simulate async operation
      setTimeout(() => {
        this.isLoading.set(false);
        this.submitSuccess.set(true);

        if (btn) {
          animate(btn, { scale: [1, 1.05, 1] }, { duration: 0.3 });
        }

        setTimeout(() => this.submitSuccess.set(false), 2000);
      }, 2000);
    }
  }
}
