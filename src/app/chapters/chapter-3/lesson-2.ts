import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, press, spring } from 'motion';

@Component({
  selector: 'app-chapter3-lesson2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="3"
      title="Press Animations"
      description="Create satisfying click/tap feedback with press() animations. Essential for buttons, cards, and interactive elements.">
      
      <!-- Demo 1: Basic Press -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Press Scale</h2>
        <p class="section-desc">Classic button press with scale animation.</p>
        
        <div class="demo-area">
          <button class="press-btn primary" #pressBasic>
            Press Me
          </button>
        </div>

        <div class="code-block">
          <pre>press(button, (element) => {{ '{' }}
  animate(element, {{ '{' }} scale: 0.95 {{ '}' }})
  return () => animate(element, {{ '{' }} scale: 1 {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Spring Press -->
      <section class="demo-section">
        <h2 class="section-title">2. Spring Bounce Press</h2>
        <p class="section-desc">Bouncy spring physics on release.</p>
        
        <div class="demo-area">
          <button class="press-btn spring-btn" #pressSpring>
            <span class="btn-icon">🎯</span>
            <span>Bouncy Press</span>
          </button>
        </div>

        <div class="code-block">
          <pre>press(button, () => {{ '{' }}
  animate(button, {{ '{' }} scale: 0.9 {{ '}' }}, {{ '{' }} duration: 0.1 {{ '}' }})
  return () => animate(button, {{ '{' }} scale: 1 {{ '}' }}, {{ '{' }} 
    type: spring, stiffness: 500, damping: 15 
  {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: 3D Press -->
      <section class="demo-section">
        <h2 class="section-title">3. 3D Button Press</h2>
        <p class="section-desc">Simulate physical button depth.</p>
        
        <div class="demo-area">
          <div class="btn-3d-wrapper">
            <button class="btn-3d" #press3D>
              <span class="btn-3d-text">Click</span>
            </button>
          </div>
        </div>

        <div class="code-block">
          <pre>press(button, () => {{ '{' }}
  animate(button, {{ '{' }} 
    y: 4,
    boxShadow: '0 2px 0 #4338ca'
  {{ '}' }})
  return () => animate(button, {{ '{' }}
    y: 0,
    boxShadow: '0 6px 0 #4338ca'
  {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 4: Card Press -->
      <section class="demo-section">
        <h2 class="section-title">4. Interactive Cards</h2>
        <p class="section-desc">Cards that respond to press with subtle animations.</p>
        
        <div class="demo-area">
          <div class="press-cards">
            @for (card of pressCards(); track card.id) {
              <div class="press-card">
                <div class="press-card-icon">{{ card.icon }}</div>
                <div class="press-card-title">{{ card.title }}</div>
                <div class="press-card-value">{{ card.value }}</div>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>press('.card', (element) => {{ '{' }}
  animate(element, {{ '{' }} 
    scale: 0.98,
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)'
  {{ '}' }})
  return () => animate(element, {{ '{' }} scale: 1, boxShadow: 'none' {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 5: Toggle Press -->
      <section class="demo-section">
        <h2 class="section-title">5. Toggle Switch</h2>
        <p class="section-desc">Animated toggle switch with press feedback.</p>
        
        <div class="demo-area">
          <div class="toggle-group">
            <button 
              class="toggle-switch" 
              [class.active]="toggleState()"
              (click)="toggle()"
              #toggleSwitch>
              <div class="toggle-thumb" #toggleThumb></div>
            </button>
            <span class="toggle-label">{{ toggleState() ? 'Enabled' : 'Disabled' }}</span>
          </div>
        </div>

        <div class="code-block">
          <pre>// Toggle with spring animation
animate(thumb, {{ '{' }} x: isActive ? 28 : 0 {{ '}' }}, {{ '{' }} 
  type: spring, stiffness: 500, damping: 30 
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 6: Ripple Effect -->
      <section class="demo-section">
        <h2 class="section-title">6. Ripple Press Effect</h2>
        <p class="section-desc">Material-style ripple animation on press.</p>
        
        <div class="demo-area">
          <button class="ripple-btn" #rippleBtn (click)="createRipple($event)">
            Ripple Effect
          </button>
        </div>

        <div class="code-block">
          <pre>button.addEventListener('click', (e) => {{ '{' }}
  const ripple = document.createElement('span')
  ripple.style.left = e.offsetX + 'px'
  ripple.style.top = e.offsetY + 'px'
  button.appendChild(ripple)
  animate(ripple, {{ '{' }} scale: [0, 4], opacity: [0.5, 0] {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 7: Button States -->
      <section class="demo-section">
        <h2 class="section-title">7. Loading Button</h2>
        <p class="section-desc">Button with loading state animation.</p>
        
        <div class="demo-area">
          <button 
            class="loading-btn"
            [class.loading]="isLoading()"
            (click)="simulateLoading()"
            #loadingBtn>
            @if (isLoading()) {
              <div class="spinner" #spinner></div>
              <span>Loading...</span>
            } @else {
              <span>Submit</span>
            }
          </button>
        </div>

        <div class="code-block">
          <pre>async function handleClick() {{ '{' }}
  animate(button, {{ '{' }} width: 150 {{ '}' }})
  setLoading(true)
  await delay(2000)
  setLoading(false)
  animate(button, {{ '{' }} width: 'auto' {{ '}' }})
{{ '}' }}</pre>
        </div>
      </section>

      <!-- Demo 8: Icon Buttons -->
      <section class="demo-section">
        <h2 class="section-title">8. Icon Button Grid</h2>
        <p class="section-desc">Action buttons with icon animations.</p>
        
        <div class="demo-area">
          <div class="icon-btn-grid">
            @for (btn of iconButtons(); track btn.id) {
              <button class="icon-btn" [attr.data-color]="btn.color">
                <span class="icon-btn-icon">{{ btn.icon }}</span>
              </button>
            }
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
      min-height: 150px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
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

    /* Press Buttons */
    .press-btn {
      padding: 14px 32px;
      border-radius: var(--radius-lg);
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .press-btn.primary {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      color: white;
    }

    .spring-btn {
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: white;
    }

    .btn-icon {
      font-size: 18px;
    }

    /* 3D Button */
    .btn-3d-wrapper {
      padding-bottom: 6px;
    }

    .btn-3d {
      padding: 16px 48px;
      background: var(--accent-primary);
      color: white;
      font-weight: 600;
      font-size: 16px;
      border-radius: var(--radius-lg);
      cursor: pointer;
      box-shadow: 0 6px 0 #4338ca;
      transition: none;
    }

    /* Press Cards */
    .press-cards {
      display: flex;
      gap: 16px;
    }

    .press-card {
      width: 140px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      cursor: pointer;
      text-align: center;
    }

    .press-card-icon {
      font-size: 28px;
      margin-bottom: 8px;
    }

    .press-card-title {
      font-size: 12px;
      color: var(--text-tertiary);
      margin-bottom: 4px;
    }

    .press-card-value {
      font-size: 20px;
      font-weight: 700;
    }

    /* Toggle */
    .toggle-group {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .toggle-switch {
      width: 56px;
      height: 28px;
      background: var(--bg-hover);
      border-radius: var(--radius-full);
      padding: 2px;
      cursor: pointer;
      position: relative;
    }

    .toggle-switch.active {
      background: var(--accent-primary);
    }

    .toggle-thumb {
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 50%;
      box-shadow: var(--shadow-sm);
    }

    .toggle-label {
      font-size: 14px;
      color: var(--text-secondary);
    }

    /* Ripple Button */
    .ripple-btn {
      padding: 14px 32px;
      background: var(--accent-primary);
      color: white;
      font-weight: 600;
      border-radius: var(--radius-lg);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .ripple-btn :global(.ripple) {
      position: absolute;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
    }

    /* Loading Button */
    .loading-btn {
      min-width: 140px;
      padding: 14px 32px;
      background: var(--accent-primary);
      color: white;
      font-weight: 600;
      border-radius: var(--radius-lg);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .loading-btn.loading {
      pointer-events: none;
      opacity: 0.8;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Icon Buttons */
    .icon-btn-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .icon-btn {
      width: 56px;
      height: 56px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-btn-icon {
      font-size: 24px;
    }

    .icon-btn[data-color="red"]:active { background: #ef444420; }
    .icon-btn[data-color="blue"]:active { background: #3b82f620; }
    .icon-btn[data-color="green"]:active { background: #22c55e20; }
    .icon-btn[data-color="purple"]:active { background: #8b5cf620; }
  `]
})
export class Chapter3Lesson2 implements OnDestroy {
  readonly pressBasic = viewChild<ElementRef<HTMLElement>>('pressBasic');
  readonly pressSpring = viewChild<ElementRef<HTMLElement>>('pressSpring');
  readonly press3D = viewChild<ElementRef<HTMLElement>>('press3D');
  readonly toggleThumb = viewChild<ElementRef<HTMLElement>>('toggleThumb');
  readonly rippleBtn = viewChild<ElementRef<HTMLElement>>('rippleBtn');
  readonly loadingBtn = viewChild<ElementRef<HTMLElement>>('loadingBtn');

  readonly toggleState = signal(false);
  readonly isLoading = signal(false);

  readonly pressCards = signal([
    { id: 1, icon: '📊', title: 'Revenue', value: '$12.4k' },
    { id: 2, icon: '👥', title: 'Users', value: '1,234' },
    { id: 3, icon: '📈', title: 'Growth', value: '+24%' }
  ]);

  readonly iconButtons = signal([
    { id: 1, icon: '❤️', color: 'red' },
    { id: 2, icon: '💬', color: 'blue' },
    { id: 3, icon: '🔄', color: 'green' },
    { id: 4, icon: '⭐', color: 'purple' }
  ]);

  private cleanupFns: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.setupPressEffects();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  toggle(): void {
    this.toggleState.update(v => !v);
    const thumb = this.toggleThumb()?.nativeElement;
    if (thumb) {
      animate(thumb, { x: this.toggleState() ? 28 : 0 }, { 
        type: spring, stiffness: 500, damping: 30 
      });
    }
  }

  createRipple(event: MouseEvent): void {
    const btn = this.rippleBtn()?.nativeElement;
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = event.offsetX + 'px';
    ripple.style.top = event.offsetY + 'px';
    btn.appendChild(ripple);

    animate(ripple, { scale: [0, 4], opacity: [0.5, 0] }, { duration: 0.6 });
    
    setTimeout(() => ripple.remove(), 600);
  }

  simulateLoading(): void {
    if (this.isLoading()) return;
    
    const btn = this.loadingBtn()?.nativeElement;
    if (btn) {
      animate(btn, { scale: 0.98 }, { duration: 0.1 });
    }
    
    this.isLoading.set(true);
    
    setTimeout(() => {
      this.isLoading.set(false);
      if (btn) {
        animate(btn, { scale: [0.98, 1] }, { type: spring, stiffness: 400, damping: 20 });
      }
    }, 2000);
  }

  private setupPressEffects(): void {
    // Demo 1: Basic Press
    const basic = this.pressBasic()?.nativeElement;
    if (basic) {
      const stop = press(basic, () => {
        animate(basic, { scale: 0.95 }, { duration: 0.1 });
        return () => animate(basic, { scale: 1 }, { duration: 0.1 });
      });
      this.cleanupFns.push(stop);
    }

    // Demo 2: Spring Press
    const springBtn = this.pressSpring()?.nativeElement;
    if (springBtn) {
      const stop = press(springBtn, () => {
        animate(springBtn, { scale: 0.9 }, { duration: 0.1 });
        return () => animate(springBtn, { scale: 1 }, { type: spring, stiffness: 500, damping: 15 });
      });
      this.cleanupFns.push(stop);
    }

    // Demo 3: 3D Button
    const btn3D = this.press3D()?.nativeElement;
    if (btn3D) {
      const stop = press(btn3D, () => {
        animate(btn3D, { y: 4, boxShadow: '0 2px 0 #4338ca' }, { duration: 0.1 });
        return () => animate(btn3D, { y: 0, boxShadow: '0 6px 0 #4338ca' }, { duration: 0.1 });
      });
      this.cleanupFns.push(stop);
    }

    // Demo 4: Press Cards
    const cards = document.querySelectorAll('.press-card');
    cards.forEach((card) => {
      const stop = press(card, () => {
        animate(card, { scale: 0.98 }, { duration: 0.1 });
        return () => animate(card, { scale: 1 }, { type: spring, stiffness: 400, damping: 20 });
      });
      this.cleanupFns.push(stop);
    });

    // Demo 8: Icon Buttons
    const iconBtns = document.querySelectorAll('.icon-btn');
    iconBtns.forEach((btn) => {
      const icon = btn.querySelector('.icon-btn-icon');
      const stop = press(btn, () => {
        animate(btn, { scale: 0.9 }, { duration: 0.1 });
        if (icon) animate(icon, { scale: 1.2 }, { duration: 0.1 });
        return () => {
          animate(btn, { scale: 1 }, { type: spring, stiffness: 400, damping: 20 });
          if (icon) animate(icon, { scale: 1 }, { type: spring, stiffness: 400, damping: 20 });
        };
      });
      this.cleanupFns.push(stop);
    });
  }
}
