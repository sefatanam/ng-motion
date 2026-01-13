import { Component, ChangeDetectionStrategy, signal, afterNextRender, ElementRef, viewChild } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate } from 'motion';

@Component({
  selector: 'app-chapter1-lesson1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="1"
      title="Basic Animate"
      description="Learn the core animate() function - the foundation of all motion.dev animations. Master opacity, scale, translate, and rotate transforms.">
      
      <!-- Demo 1: Opacity -->
      <section class="demo-section">
        <h2 class="section-title">1. Opacity Animation</h2>
        <p class="section-desc">The simplest animation - fading elements in and out.</p>
        
        <div class="demo-area">
          <div #opacityBox class="demo-box">Fade</div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateOpacity()">Animate Opacity</button>
          <button class="btn btn-secondary" (click)="resetOpacity()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate(element, {{ '{' }} opacity: [0, 1] {{ '}' }}, {{ '{' }} duration: 0.5 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Scale -->
      <section class="demo-section">
        <h2 class="section-title">2. Scale Animation</h2>
        <p class="section-desc">Scale elements up or down with smooth transitions.</p>
        
        <div class="demo-area">
          <div #scaleBox class="demo-box">Scale</div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateScale()">Scale Up</button>
          <button class="btn btn-secondary" (click)="animateScaleDown()">Scale Down</button>
          <button class="btn btn-secondary" (click)="resetScale()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate(element, {{ '{' }} scale: 1.5 {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: Translate -->
      <section class="demo-section">
        <h2 class="section-title">3. Translate Animation</h2>
        <p class="section-desc">Move elements along X and Y axes independently.</p>
        
        <div class="demo-area translate-area">
          <div #translateBox class="demo-box">Move</div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateTranslate('right')">→ Right</button>
          <button class="btn btn-primary" (click)="animateTranslate('left')">← Left</button>
          <button class="btn btn-primary" (click)="animateTranslate('up')">↑ Up</button>
          <button class="btn btn-primary" (click)="animateTranslate('down')">↓ Down</button>
          <button class="btn btn-secondary" (click)="resetTranslate()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate(element, {{ '{' }} x: 100, y: 50 {{ '}' }}, {{ '{' }} duration: 0.4 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 4: Rotate -->
      <section class="demo-section">
        <h2 class="section-title">4. Rotate Animation</h2>
        <p class="section-desc">Rotate elements with customizable angles.</p>
        
        <div class="demo-area">
          <div #rotateBox class="demo-box">Spin</div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateRotate(90)">90°</button>
          <button class="btn btn-primary" (click)="animateRotate(180)">180°</button>
          <button class="btn btn-primary" (click)="animateRotate(360)">360°</button>
          <button class="btn btn-secondary" (click)="resetRotate()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate(element, {{ '{' }} rotate: 360 {{ '}' }}, {{ '{' }} duration: 0.6 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 5: Combined -->
      <section class="demo-section">
        <h2 class="section-title">5. Combined Transforms</h2>
        <p class="section-desc">Combine multiple transform properties for complex animations.</p>
        
        <div class="demo-area">
          <div #combinedBox class="demo-box">All</div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateCombined()">Animate All</button>
          <button class="btn btn-secondary" (click)="resetCombined()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate(element, {{ '{' }}
  scale: 1.2,
  rotate: 180,
  x: 50,
  opacity: 0.8
{{ '}' }}, {{ '{' }} duration: 0.5 {{ '}' }})</pre>
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
    }

    .translate-area {
      min-height: 250px;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
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
  `]
})
export class Chapter1Lesson1 {
  readonly opacityBox = viewChild<ElementRef<HTMLElement>>('opacityBox');
  readonly scaleBox = viewChild<ElementRef<HTMLElement>>('scaleBox');
  readonly translateBox = viewChild<ElementRef<HTMLElement>>('translateBox');
  readonly rotateBox = viewChild<ElementRef<HTMLElement>>('rotateBox');
  readonly combinedBox = viewChild<ElementRef<HTMLElement>>('combinedBox');

  animateOpacity(): void {
    const el = this.opacityBox()?.nativeElement;
    if (el) {
      animate(el, { opacity: [0, 1] }, { duration: 0.5 });
    }
  }

  resetOpacity(): void {
    const el = this.opacityBox()?.nativeElement;
    if (el) {
      animate(el, { opacity: 1 }, { duration: 0.2 });
    }
  }

  animateScale(): void {
    const el = this.scaleBox()?.nativeElement;
    if (el) {
      animate(el, { scale: 1.5 }, { duration: 0.3 });
    }
  }

  animateScaleDown(): void {
    const el = this.scaleBox()?.nativeElement;
    if (el) {
      animate(el, { scale: 0.5 }, { duration: 0.3 });
    }
  }

  resetScale(): void {
    const el = this.scaleBox()?.nativeElement;
    if (el) {
      animate(el, { scale: 1 }, { duration: 0.2 });
    }
  }

  animateTranslate(direction: 'left' | 'right' | 'up' | 'down'): void {
    const el = this.translateBox()?.nativeElement;
    if (el) {
      const transforms: Record<string, { x?: number; y?: number }> = {
        right: { x: 100 },
        left: { x: -100 },
        up: { y: -80 },
        down: { y: 80 }
      };
      animate(el, transforms[direction], { duration: 0.4 });
    }
  }

  resetTranslate(): void {
    const el = this.translateBox()?.nativeElement;
    if (el) {
      animate(el, { x: 0, y: 0 }, { duration: 0.3 });
    }
  }

  animateRotate(degrees: number): void {
    const el = this.rotateBox()?.nativeElement;
    if (el) {
      animate(el, { rotate: degrees }, { duration: 0.6 });
    }
  }

  resetRotate(): void {
    const el = this.rotateBox()?.nativeElement;
    if (el) {
      animate(el, { rotate: 0 }, { duration: 0.3 });
    }
  }

  animateCombined(): void {
    const el = this.combinedBox()?.nativeElement;
    if (el) {
      animate(
        el,
        { scale: 1.2, rotate: 180, x: 50, opacity: 0.8 },
        { duration: 0.5 }
      );
    }
  }

  resetCombined(): void {
    const el = this.combinedBox()?.nativeElement;
    if (el) {
      animate(
        el,
        { scale: 1, rotate: 0, x: 0, opacity: 1 },
        { duration: 0.3 }
      );
    }
  }
}
