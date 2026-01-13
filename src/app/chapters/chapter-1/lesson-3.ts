import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-chapter1-lesson3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="1"
      title="Stagger Animations"
      description="Create beautiful sequential animations with stagger delays. Perfect for lists, grids, and revealing multiple elements.">
      
      <!-- Demo 1: Basic Stagger -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Stagger</h2>
        <p class="section-desc">Animate list items one after another with a fixed delay.</p>
        
        <div class="demo-area">
          <ul #basicList class="stagger-list">
            @for (i of items(); track i) {
              <li class="stagger-item">Item {{ i }}</li>
            }
          </ul>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateBasicStagger()">Stagger In</button>
          <button class="btn btn-secondary" (click)="resetBasicStagger()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate('li', 
  {{ '{' }} opacity: [0, 1], y: [20, 0] {{ '}' }},
  {{ '{' }} delay: stagger(0.1) {{ '}' }}
)</pre>
        </div>
      </section>

      <!-- Demo 2: Grid Stagger -->
      <section class="demo-section">
        <h2 class="section-title">2. Grid Stagger</h2>
        <p class="section-desc">Apply stagger to grid items for a wave-like reveal effect.</p>
        
        <div class="demo-area">
          <div #gridContainer class="stagger-grid">
            @for (i of gridItems(); track i) {
              <div class="grid-item"></div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateGridStagger()">Wave Effect</button>
          <button class="btn btn-secondary" (click)="resetGridStagger()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate('.grid-item', 
  {{ '{' }} scale: [0, 1], opacity: [0, 1] {{ '}' }},
  {{ '{' }} delay: stagger(0.05) {{ '}' }}
)</pre>
        </div>
      </section>

      <!-- Demo 3: Stagger from Center -->
      <section class="demo-section">
        <h2 class="section-title">3. Stagger from Center</h2>
        <p class="section-desc">Start animation from the center and expand outward.</p>
        
        <div class="demo-area">
          <div #centerContainer class="center-row">
            @for (i of centerItems(); track i) {
              <div class="center-item"></div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateCenterStagger()">From Center</button>
          <button class="btn btn-secondary" (click)="resetCenterStagger()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate('.item', 
  {{ '{' }} scale: [0, 1] {{ '}' }},
  {{ '{' }} delay: stagger(0.08, {{ '{' }} from: 'center' {{ '}' }}) {{ '}' }}
)</pre>
        </div>
      </section>

      <!-- Demo 4: Stagger with Easing -->
      <section class="demo-section">
        <h2 class="section-title">4. Eased Stagger</h2>
        <p class="section-desc">Apply easing to the stagger delay distribution.</p>
        
        <div class="demo-area">
          <div #easedContainer class="stagger-bars">
            @for (i of barItems(); track i) {
              <div class="bar-item"></div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateEasedStagger('easeOut')">Ease Out</button>
          <button class="btn btn-primary" (click)="animateEasedStagger('easeIn')">Ease In</button>
          <button class="btn btn-secondary" (click)="resetEasedStagger()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate('.bar', 
  {{ '{' }} scaleY: [0, 1] {{ '}' }},
  {{ '{' }} delay: stagger(0.05, {{ '{' }} ease: 'easeOut' {{ '}' }}) {{ '}' }}
)</pre>
        </div>
      </section>

      <!-- Demo 5: Cards Reveal -->
      <section class="demo-section">
        <h2 class="section-title">5. Card Reveal Animation</h2>
        <p class="section-desc">Premium card reveal with combined transforms and stagger.</p>
        
        <div class="demo-area cards-area">
          <div #cardsContainer class="cards-grid">
            @for (card of cards(); track card.id) {
              <div class="card-item">
                <div class="card-icon">{{ card.icon }}</div>
                <div class="card-title">{{ card.title }}</div>
                <div class="card-desc">{{ card.desc }}</div>
              </div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateCards()">Reveal Cards</button>
          <button class="btn btn-secondary" (click)="resetCards()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate('.card', 
  {{ '{' }} 
    opacity: [0, 1], 
    y: [40, 0], 
    scale: [0.9, 1] 
  {{ '}' }},
  {{ '{' }} delay: stagger(0.1), duration: 0.5 {{ '}' }}
)</pre>
        </div>
      </section>

      <!-- Demo 6: Text Character Stagger -->
      <section class="demo-section">
        <h2 class="section-title">6. Text Reveal</h2>
        <p class="section-desc">Animate text character by character for dramatic reveals.</p>
        
        <div class="demo-area">
          <div #textContainer class="text-reveal">
            @for (char of textChars(); track $index) {
              <span class="text-char">{{ char }}</span>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateText()">Reveal Text</button>
          <button class="btn btn-secondary" (click)="resetText()">Reset</button>
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

    .cards-area {
      min-height: 300px;
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

    /* Stagger List */
    .stagger-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 200px;
    }

    .stagger-item {
      background: var(--bg-hover);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-weight: 500;
      opacity: 0;
    }

    /* Grid Stagger */
    .stagger-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
    }

    .grid-item {
      width: 40px;
      height: 40px;
      background: var(--accent-primary);
      border-radius: var(--radius-sm);
      opacity: 0;
    }

    /* Center Stagger */
    .center-row {
      display: flex;
      gap: 8px;
    }

    .center-item {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border-radius: var(--radius-sm);
      transform: scale(0);
    }

    /* Bars Stagger */
    .stagger-bars {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      height: 120px;
    }

    .bar-item {
      width: 20px;
      height: 100%;
      background: linear-gradient(to top, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      transform-origin: bottom;
      transform: scaleY(0);
    }

    /* Cards */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      width: 100%;
    }

    .card-item {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      opacity: 0;
    }

    .card-icon {
      font-size: 24px;
      margin-bottom: 12px;
    }

    .card-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .card-desc {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    /* Text Reveal */
    .text-reveal {
      font-size: 32px;
      font-weight: 700;
      display: flex;
    }

    .text-char {
      display: inline-block;
      opacity: 0;
    }
  `]
})
export class Chapter1Lesson3 {
  readonly basicList = viewChild<ElementRef<HTMLElement>>('basicList');
  readonly gridContainer = viewChild<ElementRef<HTMLElement>>('gridContainer');
  readonly centerContainer = viewChild<ElementRef<HTMLElement>>('centerContainer');
  readonly easedContainer = viewChild<ElementRef<HTMLElement>>('easedContainer');
  readonly cardsContainer = viewChild<ElementRef<HTMLElement>>('cardsContainer');
  readonly textContainer = viewChild<ElementRef<HTMLElement>>('textContainer');

  readonly items = signal([1, 2, 3, 4, 5]);
  readonly gridItems = signal(Array.from({ length: 24 }, (_, i) => i));
  readonly centerItems = signal(Array.from({ length: 9 }, (_, i) => i));
  readonly barItems = signal(Array.from({ length: 12 }, (_, i) => i));
  
  readonly cards = signal([
    { id: 1, icon: '🚀', title: 'Fast', desc: 'Lightning quick animations' },
    { id: 2, icon: '🎨', title: 'Beautiful', desc: 'Stunning visual effects' },
    { id: 3, icon: '⚡', title: 'Powerful', desc: 'Full control over motion' }
  ]);

  readonly textChars = signal('Motion.dev'.split(''));

  animateBasicStagger(): void {
    const container = this.basicList()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.stagger-item'),
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.4 }
      );
    }
  }

  resetBasicStagger(): void {
    const container = this.basicList()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.stagger-item'),
        { opacity: 0, y: 0 },
        { duration: 0.2 }
      );
    }
  }

  animateGridStagger(): void {
    const container = this.gridContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.grid-item'),
        { scale: [0, 1], opacity: [0, 1] },
        { delay: stagger(0.03), duration: 0.3 }
      );
    }
  }

  resetGridStagger(): void {
    const container = this.gridContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.grid-item'),
        { scale: 0, opacity: 0 },
        { duration: 0.2 }
      );
    }
  }

  animateCenterStagger(): void {
    const container = this.centerContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.center-item'),
        { scale: [0, 1] },
        { delay: stagger(0.08, { from: 'center' }), duration: 0.4 }
      );
    }
  }

  resetCenterStagger(): void {
    const container = this.centerContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.center-item'),
        { scale: 0 },
        { duration: 0.2 }
      );
    }
  }

  animateEasedStagger(ease: string): void {
    const container = this.easedContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.bar-item'),
        { scaleY: [0, 1] },
        { delay: stagger(0.05, { ease: ease as any }), duration: 0.4 }
      );
    }
  }

  resetEasedStagger(): void {
    const container = this.easedContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.bar-item'),
        { scaleY: 0 },
        { duration: 0.2 }
      );
    }
  }

  animateCards(): void {
    const container = this.cardsContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.card-item'),
        { opacity: [0, 1], y: [40, 0], scale: [0.9, 1] },
        { delay: stagger(0.1), duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
      );
    }
  }

  resetCards(): void {
    const container = this.cardsContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.card-item'),
        { opacity: 0, y: 0, scale: 1 },
        { duration: 0.2 }
      );
    }
  }

  animateText(): void {
    const container = this.textContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.text-char'),
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.05), duration: 0.3 }
      );
    }
  }

  resetText(): void {
    const container = this.textContainer()?.nativeElement;
    if (container) {
      animate(
        container.querySelectorAll('.text-char'),
        { opacity: 0, y: 0 },
        { duration: 0.2 }
      );
    }
  }
}
