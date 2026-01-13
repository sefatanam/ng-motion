import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, hover } from 'motion';

@Component({
  selector: 'app-chapter3-lesson1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="3"
      title="Hover Effects"
      description="Create responsive hover animations that provide immediate feedback. Learn the hover() function for sophisticated pointer interactions.">
      
      <!-- Demo 1: Basic Hover -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Hover Scale</h2>
        <p class="section-desc">Simple scale effect on hover with smooth transitions.</p>
        
        <div class="demo-area">
          <div class="hover-box basic" #hoverBasic>
            Hover Me
          </div>
        </div>

        <div class="code-block">
          <pre>hover(element, () => {{ '{' }}
  animate(element, {{ '{' }} scale: 1.1 {{ '}' }})
  return () => animate(element, {{ '{' }} scale: 1 {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Color Transition -->
      <section class="demo-section">
        <h2 class="section-title">2. Color & Shadow Effects</h2>
        <p class="section-desc">Animate background colors and shadows on hover.</p>
        
        <div class="demo-area">
          <div class="hover-cards">
            <div class="hover-card" #hoverCard1>
              <span class="card-icon">🎨</span>
              <span class="card-label">Colors</span>
            </div>
            <div class="hover-card" #hoverCard2>
              <span class="card-icon">✨</span>
              <span class="card-label">Glow</span>
            </div>
            <div class="hover-card" #hoverCard3>
              <span class="card-icon">🌊</span>
              <span class="card-label">Wave</span>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>hover(card, () => {{ '{' }}
  animate(card, {{ '{' }} 
    backgroundColor: '#6366f1',
    boxShadow: '0 20px 40px rgba(99,102,241,0.3)'
  {{ '}' }})
  return () => animate(card, {{ '{' }} backgroundColor: '#27272a', boxShadow: 'none' {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: Multi-element Hover -->
      <section class="demo-section">
        <h2 class="section-title">3. Child Element Animation</h2>
        <p class="section-desc">Animate child elements when parent is hovered.</p>
        
        <div class="demo-area">
          <div class="feature-card" #featureCard>
            <div class="feature-icon" #featureIcon>🚀</div>
            <h3 class="feature-title" #featureTitle>Launch Ready</h3>
            <p class="feature-desc" #featureDesc>Deploy with confidence</p>
            <div class="feature-arrow" #featureArrow>→</div>
          </div>
        </div>

        <div class="code-block">
          <pre>hover(card, () => {{ '{' }}
  animate(icon, {{ '{' }} y: -5, scale: 1.1 {{ '}' }})
  animate(arrow, {{ '{' }} x: 5, opacity: 1 {{ '}' }})
  return () => {{ '{' }}
    animate(icon, {{ '{' }} y: 0, scale: 1 {{ '}' }})
    animate(arrow, {{ '{' }} x: 0, opacity: 0.5 {{ '}' }})
  {{ '}' }}
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 4: Magnetic Hover -->
      <section class="demo-section">
        <h2 class="section-title">4. Magnetic Button Effect</h2>
        <p class="section-desc">Button follows cursor position for a magnetic feel.</p>
        
        <div class="demo-area magnetic-area" #magneticArea>
          <button class="magnetic-btn" #magneticBtn>
            <span class="btn-text" #btnText>Magnetic</span>
          </button>
        </div>

        <div class="code-block">
          <pre>// Track mouse position within button bounds
element.addEventListener('mousemove', (e) => {{ '{' }}
  const rect = element.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width/2) * 0.3
  const y = (e.clientY - rect.top - rect.height/2) * 0.3
  animate(element, {{ '{' }} x, y {{ '}' }}, {{ '{' }} duration: 0.2 {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 5: Image Reveal -->
      <section class="demo-section">
        <h2 class="section-title">5. Image Reveal on Hover</h2>
        <p class="section-desc">Reveal hidden content with creative hover animations.</p>
        
        <div class="demo-area">
          <div class="reveal-grid">
            @for (item of revealItems(); track item.id) {
              <div class="reveal-item">
                <div class="reveal-overlay"></div>
                <div class="reveal-content">
                  <span class="reveal-icon">{{ item.icon }}</span>
                  <span class="reveal-label">{{ item.label }}</span>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>hover(item, () => {{ '{' }}
  animate(overlay, {{ '{' }} scaleY: 0 {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})
  animate(content, {{ '{' }} opacity: 1, y: 0 {{ '}' }})
  return () => {{ '{' }}
    animate(overlay, {{ '{' }} scaleY: 1 {{ '}' }})
    animate(content, {{ '{' }} opacity: 0, y: 10 {{ '}' }})
  {{ '}' }}
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 6: Navigation Hover -->
      <section class="demo-section">
        <h2 class="section-title">6. Navigation Menu Hover</h2>
        <p class="section-desc">Sliding indicator follows hovered menu items.</p>
        
        <div class="demo-area">
          <nav class="nav-menu" #navMenu>
            <div class="nav-indicator" #navIndicator></div>
            @for (item of navItems(); track item) {
              <a class="nav-item">{{ item }}</a>
            }
          </nav>
        </div>

        <div class="code-block">
          <pre>hover(navItem, (element) => {{ '{' }}
  const {{ '{' }} offsetLeft, offsetWidth {{ '}' }} = element
  animate(indicator, {{ '{' }} 
    x: offsetLeft, 
    width: offsetWidth 
  {{ '}' }}, {{ '{' }} duration: 0.2 {{ '}' }})
{{ '}' }})</pre>
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
      min-height: 200px;
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

    /* Basic Hover */
    .hover-box {
      padding: 24px 48px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-lg);
      color: white;
      font-weight: 600;
      cursor: pointer;
    }

    /* Hover Cards */
    .hover-cards {
      display: flex;
      gap: 16px;
    }

    .hover-card {
      width: 120px;
      height: 120px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .card-icon {
      font-size: 28px;
    }

    .card-label {
      font-size: 13px;
      font-weight: 500;
    }

    /* Feature Card */
    .feature-card {
      width: 280px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;
      cursor: pointer;
      position: relative;
    }

    .feature-icon {
      font-size: 32px;
      margin-bottom: 16px;
      display: block;
    }

    .feature-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .feature-desc {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .feature-arrow {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      opacity: 0.5;
    }

    /* Magnetic Button */
    .magnetic-area {
      min-height: 250px;
    }

    .magnetic-btn {
      padding: 16px 48px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-lg);
      color: white;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      position: relative;
    }

    /* Reveal Grid */
    .reveal-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .reveal-item {
      width: 100px;
      height: 100px;
      background: var(--bg-hover);
      border-radius: var(--radius-lg);
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .reveal-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      transform-origin: top;
    }

    .reveal-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      opacity: 0;
    }

    .reveal-icon {
      font-size: 24px;
    }

    .reveal-label {
      font-size: 12px;
      font-weight: 500;
    }

    /* Nav Menu */
    .nav-menu {
      display: flex;
      gap: 8px;
      background: var(--bg-hover);
      padding: 6px;
      border-radius: var(--radius-full);
      position: relative;
    }

    .nav-indicator {
      position: absolute;
      height: calc(100% - 12px);
      background: var(--accent-primary);
      border-radius: var(--radius-full);
      top: 6px;
      left: 6px;
      width: 0;
      opacity: 0;
    }

    .nav-item {
      padding: 10px 20px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      position: relative;
      z-index: 1;
      transition: color 0.2s;
    }

    .nav-item:hover {
      color: white;
    }
  `]
})
export class Chapter3Lesson1 implements OnDestroy {
  readonly hoverBasic = viewChild<ElementRef<HTMLElement>>('hoverBasic');
  readonly hoverCard1 = viewChild<ElementRef<HTMLElement>>('hoverCard1');
  readonly hoverCard2 = viewChild<ElementRef<HTMLElement>>('hoverCard2');
  readonly hoverCard3 = viewChild<ElementRef<HTMLElement>>('hoverCard3');
  readonly featureCard = viewChild<ElementRef<HTMLElement>>('featureCard');
  readonly featureIcon = viewChild<ElementRef<HTMLElement>>('featureIcon');
  readonly featureArrow = viewChild<ElementRef<HTMLElement>>('featureArrow');
  readonly magneticArea = viewChild<ElementRef<HTMLElement>>('magneticArea');
  readonly magneticBtn = viewChild<ElementRef<HTMLElement>>('magneticBtn');
  readonly btnText = viewChild<ElementRef<HTMLElement>>('btnText');
  readonly navMenu = viewChild<ElementRef<HTMLElement>>('navMenu');
  readonly navIndicator = viewChild<ElementRef<HTMLElement>>('navIndicator');

  readonly revealItems = signal([
    { id: 1, icon: '📸', label: 'Photo' },
    { id: 2, icon: '🎬', label: 'Video' },
    { id: 3, icon: '🎵', label: 'Audio' }
  ]);

  readonly navItems = signal(['Home', 'Features', 'Pricing', 'About']);

  private cleanupFns: (() => void)[] = [];
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  private mouseLeaveHandler: (() => void) | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupHoverEffects();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
    
    const btn = this.magneticBtn()?.nativeElement;
    if (btn && this.mouseMoveHandler) {
      btn.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    if (btn && this.mouseLeaveHandler) {
      btn.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }

  private setupHoverEffects(): void {
    // Demo 1: Basic Hover
    const basic = this.hoverBasic()?.nativeElement;
    if (basic) {
      const stop = hover(basic, () => {
        animate(basic, { scale: 1.1 }, { duration: 0.2 });
        return () => animate(basic, { scale: 1 }, { duration: 0.2 });
      });
      this.cleanupFns.push(stop);
    }

    // Demo 2: Color Cards
    const cards = [this.hoverCard1(), this.hoverCard2(), this.hoverCard3()];
    const colors = ['#6366f1', '#22c55e', '#ec4899'];
    cards.forEach((card, i) => {
      const el = card?.nativeElement;
      if (el) {
        const stop = hover(el, () => {
          animate(el, { 
            backgroundColor: colors[i],
            boxShadow: `0 20px 40px ${colors[i]}40`
          }, { duration: 0.3 });
          return () => animate(el, { 
            backgroundColor: '#1f1f23',
            boxShadow: 'none'
          }, { duration: 0.3 });
        });
        this.cleanupFns.push(stop);
      }
    });

    // Demo 3: Feature Card
    const featureCard = this.featureCard()?.nativeElement;
    const featureIcon = this.featureIcon()?.nativeElement;
    const featureArrow = this.featureArrow()?.nativeElement;
    
    if (featureCard && featureIcon && featureArrow) {
      const stop = hover(featureCard, () => {
        animate(featureIcon, { y: -5, scale: 1.1 }, { duration: 0.2 });
        animate(featureArrow, { x: 5, opacity: 1 }, { duration: 0.2 });
        animate(featureCard, { borderColor: '#6366f1' }, { duration: 0.2 });
        return () => {
          animate(featureIcon, { y: 0, scale: 1 }, { duration: 0.2 });
          animate(featureArrow, { x: 0, opacity: 0.5 }, { duration: 0.2 });
          animate(featureCard, { borderColor: '#27272a' }, { duration: 0.2 });
        };
      });
      this.cleanupFns.push(stop);
    }

    // Demo 4: Magnetic Button
    const btn = this.magneticBtn()?.nativeElement;
    const text = this.btnText()?.nativeElement;
    if (btn && text) {
      this.mouseMoveHandler = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        animate(btn, { x, y }, { duration: 0.2 });
        animate(text, { x: x * 0.5, y: y * 0.5 }, { duration: 0.2 });
      };
      
      this.mouseLeaveHandler = () => {
        animate(btn, { x: 0, y: 0 }, { duration: 0.3 });
        animate(text, { x: 0, y: 0 }, { duration: 0.3 });
      };

      btn.addEventListener('mousemove', this.mouseMoveHandler);
      btn.addEventListener('mouseleave', this.mouseLeaveHandler);
    }

    // Demo 5: Reveal Items
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach((item) => {
      const overlay = item.querySelector('.reveal-overlay') as HTMLElement;
      const content = item.querySelector('.reveal-content') as HTMLElement;
      if (overlay && content) {
        const stop = hover(item, () => {
          animate(overlay, { scaleY: 0 }, { duration: 0.3 });
          animate(content, { opacity: 1, y: 0 }, { duration: 0.3 });
          return () => {
            animate(overlay, { scaleY: 1 }, { duration: 0.3 });
            animate(content, { opacity: 0, y: 10 }, { duration: 0.3 });
          };
        });
        this.cleanupFns.push(stop);
      }
    });

    // Demo 6: Navigation
    const navMenu = this.navMenu()?.nativeElement;
    const indicator = this.navIndicator()?.nativeElement;
    if (navMenu && indicator) {
      const navItemsEls = navMenu.querySelectorAll('.nav-item');
      navItemsEls.forEach((item) => {
        const stop = hover(item, () => {
          const el = item as HTMLElement;
          animate(indicator, { 
            x: el.offsetLeft - 6,
            width: el.offsetWidth,
            opacity: 1
          }, { duration: 0.2 });
          return () => {
            animate(indicator, { opacity: 0 }, { duration: 0.2 });
          };
        });
        this.cleanupFns.push(stop);
      });
    }
  }
}
