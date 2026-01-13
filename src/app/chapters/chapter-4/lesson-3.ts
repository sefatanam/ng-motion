import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, stagger, spring } from 'motion';

@Component({
  selector: 'app-chapter4-lesson3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="4"
      title="Complex Timelines"
      description="Master advanced timeline techniques with labels, controls, and dynamic sequences.">
      
      <!-- Demo 1: Animation Controls -->
      <section class="demo-section">
        <h2 class="section-title">1. Playback Controls</h2>
        <p class="section-desc">Control animation playback: play, pause, reverse, and seek.</p>
        
        <div class="demo-area">
          <div class="control-demo">
            <div class="control-track">
              <div class="control-ball" #controlBall></div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" #progressFill></div>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playControlDemo()">Play</button>
          <button class="btn btn-secondary" (click)="pauseControlDemo()">Pause</button>
          <button class="btn btn-secondary" (click)="reverseControlDemo()">Reverse</button>
          <button class="btn btn-secondary" (click)="resetControlDemo()">Reset</button>
        </div>
      </section>

      <!-- Demo 2: Chained Animations -->
      <section class="demo-section">
        <h2 class="section-title">2. Chained Reactions</h2>
        <p class="section-desc">One animation triggers the next in a chain reaction.</p>
        
        <div class="demo-area">
          <div class="chain-demo" #chainContainer>
            @for (i of chainItems(); track i) {
              <div class="chain-item"></div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playChainReaction()">Start Chain</button>
          <button class="btn btn-secondary" (click)="resetChain()">Reset</button>
        </div>
      </section>

      <!-- Demo 3: Parallel Groups -->
      <section class="demo-section">
        <h2 class="section-title">3. Parallel Animation Groups</h2>
        <p class="section-desc">Multiple animation groups running simultaneously.</p>
        
        <div class="demo-area">
          <div class="parallel-demo" #parallelContainer>
            <div class="parallel-group left">
              <div class="parallel-item"></div>
              <div class="parallel-item"></div>
              <div class="parallel-item"></div>
            </div>
            <div class="parallel-group right">
              <div class="parallel-item"></div>
              <div class="parallel-item"></div>
              <div class="parallel-item"></div>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playParallel()">Play Parallel</button>
          <button class="btn btn-secondary" (click)="resetParallel()">Reset</button>
        </div>
      </section>

      <!-- Demo 4: Dynamic Timeline -->
      <section class="demo-section">
        <h2 class="section-title">4. Dynamic Timeline</h2>
        <p class="section-desc">Build and modify timelines dynamically based on data.</p>
        
        <div class="demo-area">
          <div class="dynamic-demo" #dynamicContainer>
            @for (item of dynamicItems(); track item.id) {
              <div 
                class="dynamic-item"
                [style.background]="item.color">
                {{ item.label }}
              </div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playDynamicTimeline()">Play Dynamic</button>
          <button class="btn btn-secondary" (click)="addDynamicItem()">Add Item</button>
          <button class="btn btn-secondary" (click)="resetDynamic()">Reset</button>
        </div>
      </section>

      <!-- Demo 5: Morphing Sequence -->
      <section class="demo-section">
        <h2 class="section-title">5. Shape Morphing Sequence</h2>
        <p class="section-desc">Animate through multiple shape states in sequence.</p>
        
        <div class="demo-area">
          <div class="morph-demo">
            <div class="morph-shape" #morphShape></div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playMorphSequence()">Morph Sequence</button>
          <button class="btn btn-secondary" (click)="resetMorph()">Reset</button>
        </div>
      </section>

      <!-- Demo 6: Complete Page Animation -->
      <section class="demo-section">
        <h2 class="section-title">6. Page Load Animation</h2>
        <p class="section-desc">Complete page entrance animation with all elements.</p>
        
        <div class="demo-area page-demo">
          <div class="page-mock" #pageMock>
            <header class="page-header">
              <div class="page-logo"></div>
              <nav class="page-nav">
                <div class="nav-item"></div>
                <div class="nav-item"></div>
                <div class="nav-item"></div>
              </nav>
            </header>
            <div class="page-hero">
              <div class="hero-text"></div>
              <div class="hero-text short"></div>
              <div class="hero-button"></div>
            </div>
            <div class="page-cards">
              <div class="page-card"></div>
              <div class="page-card"></div>
              <div class="page-card"></div>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playPageAnimation()">Load Page</button>
          <button class="btn btn-secondary" (click)="resetPage()">Reset</button>
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

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Control Demo */
    .control-demo {
      width: 100%;
      max-width: 400px;
    }

    .control-track {
      height: 60px;
      background: var(--bg-hover);
      border-radius: var(--radius-lg);
      position: relative;
      margin-bottom: 16px;
    }

    .control-ball {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 50%;
      position: absolute;
      top: 5px;
      left: 5px;
    }

    .progress-bar {
      height: 8px;
      background: var(--bg-hover);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--accent-primary);
      transform-origin: left;
      transform: scaleX(0);
    }

    /* Chain Demo */
    .chain-demo {
      display: flex;
      gap: 12px;
    }

    .chain-item {
      width: 40px;
      height: 40px;
      background: var(--accent-primary);
      border-radius: 50%;
      transform: scale(0);
    }

    /* Parallel Demo */
    .parallel-demo {
      display: flex;
      gap: 40px;
    }

    .parallel-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .parallel-item {
      width: 80px;
      height: 30px;
      background: var(--accent-primary);
      border-radius: var(--radius-md);
      transform-origin: left;
      transform: scaleX(0);
    }

    .parallel-group.right .parallel-item {
      background: #22c55e;
      transform-origin: right;
    }

    /* Dynamic Demo */
    .dynamic-demo {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .dynamic-item {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      opacity: 0;
      transform: scale(0.5) rotate(-180deg);
    }

    /* Morph Demo */
    .morph-demo {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .morph-shape {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: 50%;
    }

    /* Page Demo */
    .page-demo {
      min-height: 350px;
    }

    .page-mock {
      width: 100%;
      max-width: 500px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 16px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      opacity: 0;
      transform: translateY(-10px);
    }

    .page-logo {
      width: 40px;
      height: 40px;
      background: var(--accent-primary);
      border-radius: var(--radius-md);
    }

    .page-nav {
      display: flex;
      gap: 8px;
    }

    .nav-item {
      width: 60px;
      height: 24px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
    }

    .page-hero {
      margin-bottom: 24px;
      opacity: 0;
      transform: translateY(20px);
    }

    .hero-text {
      height: 24px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      margin-bottom: 8px;
    }

    .hero-text.short {
      width: 60%;
    }

    .hero-button {
      width: 120px;
      height: 36px;
      background: var(--accent-primary);
      border-radius: var(--radius-md);
      margin-top: 16px;
    }

    .page-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .page-card {
      height: 80px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      opacity: 0;
      transform: translateY(20px);
    }
  `]
})
export class Chapter4Lesson3 {
  readonly controlBall = viewChild<ElementRef<HTMLElement>>('controlBall');
  readonly progressFill = viewChild<ElementRef<HTMLElement>>('progressFill');
  readonly chainContainer = viewChild<ElementRef<HTMLElement>>('chainContainer');
  readonly parallelContainer = viewChild<ElementRef<HTMLElement>>('parallelContainer');
  readonly dynamicContainer = viewChild<ElementRef<HTMLElement>>('dynamicContainer');
  readonly morphShape = viewChild<ElementRef<HTMLElement>>('morphShape');
  readonly pageMock = viewChild<ElementRef<HTMLElement>>('pageMock');

  readonly chainItems = signal(Array.from({ length: 8 }, (_, i) => i));
  
  readonly dynamicItems = signal([
    { id: 1, label: 'A', color: '#6366f1' },
    { id: 2, label: 'B', color: '#8b5cf6' },
    { id: 3, label: 'C', color: '#ec4899' }
  ]);

  private controlAnimation: any = null;
  private isReversed = false;

  playControlDemo(): void {
    const ball = this.controlBall()?.nativeElement;
    const fill = this.progressFill()?.nativeElement;
    if (!ball || !fill) return;

    this.isReversed = false;
    
    this.controlAnimation = animate([
      [ball, { x: 340 } as any, { duration: 2, ease: 'easeInOut' }],
      [fill, { scaleX: 1 } as any, { duration: 2, at: 0 }]
    ]);
  }

  pauseControlDemo(): void {
    if (this.controlAnimation) {
      this.controlAnimation.pause();
    }
  }

  reverseControlDemo(): void {
    const ball = this.controlBall()?.nativeElement;
    const fill = this.progressFill()?.nativeElement;
    if (!ball || !fill) return;

    this.isReversed = !this.isReversed;
    
    animate([
      [ball, { x: this.isReversed ? 0 : 340 } as any, { duration: 2, ease: 'easeInOut' }],
      [fill, { scaleX: this.isReversed ? 0 : 1 } as any, { duration: 2, at: 0 }]
    ]);
  }

  resetControlDemo(): void {
    const ball = this.controlBall()?.nativeElement;
    const fill = this.progressFill()?.nativeElement;
    if (!ball || !fill) return;

    animate(ball, { x: 0 } as any, { duration: 0.3 });
    animate(fill, { scaleX: 0 } as any, { duration: 0.3 });
    this.isReversed = false;
  }

  playChainReaction(): void {
    const container = this.chainContainer()?.nativeElement;
    if (!container) return;

    const items = container.querySelectorAll('.chain-item');
    
    items.forEach((item, i) => {
      setTimeout(() => {
        animate(item, { scale: [0, 1.2, 1] } as any, {
          duration: 0.4,
          type: spring,
          stiffness: 400,
          damping: 15
        });
      }, i * 100);
    });
  }

  resetChain(): void {
    const container = this.chainContainer()?.nativeElement;
    if (!container) return;

    const items = container.querySelectorAll('.chain-item');
    animate(items, { scale: 0 } as any, { duration: 0.2 });
  }

  playParallel(): void {
    const container = this.parallelContainer()?.nativeElement;
    if (!container) return;

    const leftItems = container.querySelectorAll('.left .parallel-item');
    const rightItems = container.querySelectorAll('.right .parallel-item');

    animate(leftItems, { scaleX: 1 } as any, { delay: stagger(0.1), duration: 0.4 });
    animate(rightItems, { scaleX: 1 } as any, { delay: stagger(0.1), duration: 0.4 });
  }

  resetParallel(): void {
    const container = this.parallelContainer()?.nativeElement;
    if (!container) return;

    const items = container.querySelectorAll('.parallel-item');
    animate(items, { scaleX: 0 } as any, { duration: 0.2 });
  }

  playDynamicTimeline(): void {
    const container = this.dynamicContainer()?.nativeElement;
    if (!container) return;

    const items = container.querySelectorAll('.dynamic-item');
    animate(items, { opacity: 1, scale: 1, rotate: 0 } as any, {
      delay: stagger(0.1),
      duration: 0.5,
      type: spring,
      stiffness: 300,
      damping: 20
    });
  }

  addDynamicItem(): void {
    const items = this.dynamicItems();
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e'];
    const labels = 'ABCDEFGHIJ'.split('');
    
    if (items.length < 10) {
      this.dynamicItems.update(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          label: labels[prev.length], 
          color: colors[prev.length % colors.length] 
        }
      ]);
    }
  }

  resetDynamic(): void {
    const container = this.dynamicContainer()?.nativeElement;
    if (!container) return;

    const items = container.querySelectorAll('.dynamic-item');
    animate(items, { opacity: 0, scale: 0.5, rotate: -180 } as any, { duration: 0.3 });
    
    setTimeout(() => {
      this.dynamicItems.set([
        { id: 1, label: 'A', color: '#6366f1' },
        { id: 2, label: 'B', color: '#8b5cf6' },
        { id: 3, label: 'C', color: '#ec4899' }
      ]);
    }, 300);
  }

  playMorphSequence(): void {
    const shape = this.morphShape()?.nativeElement;
    if (!shape) return;

    animate([
      [shape, { borderRadius: '20%', rotate: 45 } as any, { duration: 0.4 }],
      [shape, { borderRadius: '50%', rotate: 90, scale: 1.2 } as any, { duration: 0.4 }],
      [shape, { borderRadius: '10%', rotate: 180, scale: 0.8 } as any, { duration: 0.4 }],
      [shape, { borderRadius: '50%', rotate: 360, scale: 1 } as any, { duration: 0.4 }]
    ]);
  }

  resetMorph(): void {
    const shape = this.morphShape()?.nativeElement;
    if (shape) {
      animate(shape, { borderRadius: '50%', rotate: 0, scale: 1 } as any, { duration: 0.3 });
    }
  }

  playPageAnimation(): void {
    const page = this.pageMock()?.nativeElement;
    if (!page) return;

    const header = page.querySelector('.page-header');
    const hero = page.querySelector('.page-hero');
    const cards = page.querySelectorAll('.page-card');

    animate([
      [header!, { opacity: 1, y: 0 } as any, { duration: 0.4 }],
      [hero!, { opacity: 1, y: 0 } as any, { duration: 0.5, at: '-0.2' }],
      [cards, { opacity: 1, y: 0 } as any, { delay: stagger(0.1), duration: 0.4, at: '-0.2' }]
    ]);
  }

  resetPage(): void {
    const page = this.pageMock()?.nativeElement;
    if (!page) return;

    const header = page.querySelector('.page-header');
    const hero = page.querySelector('.page-hero');
    const cards = page.querySelectorAll('.page-card');

    animate(header!, { opacity: 0, y: -10 } as any, { duration: 0.2 });
    animate(hero!, { opacity: 0, y: 20 } as any, { duration: 0.2 });
    animate(cards, { opacity: 0, y: 20 } as any, { duration: 0.2 });
  }
}
