import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, stagger } from 'motion';

@Component({
  selector: 'app-chapter4-lesson1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="4"
      title="Animation Sequences"
      description="Chain multiple animations together using motion.dev's declarative sequence syntax. Create complex, coordinated animations.">
      
      <!-- Demo 1: Basic Sequence -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Sequence</h2>
        <p class="section-desc">Animations play one after another automatically.</p>
        
        <div class="demo-area">
          <div class="sequence-boxes">
            <div class="seq-box" #seqBox1>1</div>
            <div class="seq-box" #seqBox2>2</div>
            <div class="seq-box" #seqBox3>3</div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playBasicSequence()">Play Sequence</button>
          <button class="btn btn-secondary" (click)="resetBasicSequence()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate([
  [box1, {{ '{' }} opacity: 1, scale: 1 {{ '}' }}],
  [box2, {{ '{' }} opacity: 1, scale: 1 {{ '}' }}],
  [box3, {{ '{' }} opacity: 1, scale: 1 {{ '}' }}]
])</pre>
        </div>
      </section>

      <!-- Demo 2: Overlapping Sequence -->
      <section class="demo-section">
        <h2 class="section-title">2. Overlapping with 'at'</h2>
        <p class="section-desc">Use the 'at' option to overlap or offset animations.</p>
        
        <div class="demo-area">
          <div class="overlap-demo">
            <div class="overlap-bar" #overlapBar1></div>
            <div class="overlap-bar" #overlapBar2></div>
            <div class="overlap-bar" #overlapBar3></div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playOverlapSequence()">Play Overlap</button>
          <button class="btn btn-secondary" (click)="resetOverlapSequence()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate([
  [bar1, {{ '{' }} scaleX: 1 {{ '}' }}],
  [bar2, {{ '{' }} scaleX: 1 {{ '}' }}, {{ '{' }} at: '-0.3' {{ '}' }}],  // Start 0.3s before bar1 ends
  [bar3, {{ '{' }} scaleX: 1 {{ '}' }}, {{ '{' }} at: '-0.3' {{ '}' }}]
])</pre>
        </div>
      </section>

      <!-- Demo 3: Absolute Timing -->
      <section class="demo-section">
        <h2 class="section-title">3. Absolute Timing</h2>
        <p class="section-desc">Start animations at specific times in the sequence.</p>
        
        <div class="demo-area">
          <div class="timing-demo">
            <div class="timing-item" #timingA>A</div>
            <div class="timing-item" #timingB>B</div>
            <div class="timing-item" #timingC>C</div>
            <div class="timeline-track">
              <div class="timeline-marker" style="left: 0">0s</div>
              <div class="timeline-marker" style="left: 33%">0.5s</div>
              <div class="timeline-marker" style="left: 66%">1s</div>
              <div class="timeline-marker" style="left: 100%">1.5s</div>
            </div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playAbsoluteTiming()">Play Timeline</button>
          <button class="btn btn-secondary" (click)="resetAbsoluteTiming()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate([
  [itemA, {{ '{' }} y: 0, opacity: 1 {{ '}' }}, {{ '{' }} at: 0 {{ '}' }}],    // Starts at 0s
  [itemB, {{ '{' }} y: 0, opacity: 1 {{ '}' }}, {{ '{' }} at: 0.5 {{ '}' }}],  // Starts at 0.5s
  [itemC, {{ '{' }} y: 0, opacity: 1 {{ '}' }}, {{ '{' }} at: 1 {{ '}' }}]     // Starts at 1s
])</pre>
        </div>
      </section>

      <!-- Demo 4: Mixed Sequence -->
      <section class="demo-section">
        <h2 class="section-title">4. Mixed Element Types</h2>
        <p class="section-desc">Animate different elements with different properties.</p>
        
        <div class="demo-area">
          <div class="mixed-demo" #mixedContainer>
            <h3 class="mixed-title">Hello World</h3>
            <p class="mixed-subtitle">Welcome to motion.dev</p>
            <button class="mixed-btn">Get Started</button>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playMixedSequence()">Play Mixed</button>
          <button class="btn btn-secondary" (click)="resetMixedSequence()">Reset</button>
        </div>

        <div class="code-block">
          <pre>animate([
  [title, {{ '{' }} opacity: 1, y: 0 {{ '}' }}, {{ '{' }} duration: 0.5 {{ '}' }}],
  [subtitle, {{ '{' }} opacity: 1, y: 0 {{ '}' }}, {{ '{' }} at: '-0.3' {{ '}' }}],
  [button, {{ '{' }} opacity: 1, scale: 1 {{ '}' }}, {{ '{' }} at: '-0.2' {{ '}' }}]
])</pre>
        </div>
      </section>

      <!-- Demo 5: Looping Sequence -->
      <section class="demo-section">
        <h2 class="section-title">5. Sequence with Repeat</h2>
        <p class="section-desc">Loop the entire sequence for continuous animation.</p>
        
        <div class="demo-area">
          <div class="loop-demo">
            <div class="loop-dot" #loopDot1></div>
            <div class="loop-dot" #loopDot2></div>
            <div class="loop-dot" #loopDot3></div>
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playLoopSequence()">
            {{ isLooping() ? 'Playing...' : 'Start Loop' }}
          </button>
          <button class="btn btn-secondary" (click)="stopLoopSequence()">Stop</button>
        </div>

        <div class="code-block">
          <pre>const controls = animate([
  [dots, {{ '{' }} scale: 1.5 {{ '}' }}, {{ '{' }} delay: stagger(0.1) {{ '}' }}],
  [dots, {{ '{' }} scale: 1 {{ '}' }}, {{ '{' }} delay: stagger(0.1), at: '+0.2' {{ '}' }}]
], {{ '{' }} repeat: Infinity {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 6: Card Reveal Sequence -->
      <section class="demo-section">
        <h2 class="section-title">6. Card Reveal Sequence</h2>
        <p class="section-desc">Practical example: Reveal cards with coordinated animations.</p>
        
        <div class="demo-area">
          <div class="card-reveal-demo" #cardRevealContainer>
            @for (card of revealCards(); track card.id) {
              <div class="reveal-card">
                <div class="card-image"></div>
                <div class="card-content">
                  <div class="card-tag">{{ card.tag }}</div>
                  <h4 class="card-heading">{{ card.title }}</h4>
                  <p class="card-text">{{ card.desc }}</p>
                </div>
              </div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="playCardReveal()">Reveal Cards</button>
          <button class="btn btn-secondary" (click)="resetCardReveal()">Reset</button>
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

    /* Sequence Boxes */
    .sequence-boxes {
      display: flex;
      gap: 20px;
    }

    .seq-box {
      width: 70px;
      height: 70px;
      background: var(--accent-primary);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 24px;
      opacity: 0;
      transform: scale(0.5);
    }

    /* Overlap Demo */
    .overlap-demo {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .overlap-bar {
      height: 24px;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-full);
      transform-origin: left;
      transform: scaleX(0);
    }

    /* Timing Demo */
    .timing-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
    }

    .timing-item {
      width: 60px;
      height: 60px;
      background: var(--accent-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      opacity: 0;
      transform: translateY(20px);
    }

    .timeline-track {
      width: 100%;
      max-width: 300px;
      height: 4px;
      background: var(--bg-hover);
      border-radius: var(--radius-full);
      position: relative;
      margin-top: 16px;
    }

    .timeline-marker {
      position: absolute;
      transform: translateX(-50%);
      top: 12px;
      font-size: 11px;
      color: var(--text-tertiary);
    }

    /* Mixed Demo */
    .mixed-demo {
      text-align: center;
    }

    .mixed-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      opacity: 0;
      transform: translateY(20px);
    }

    .mixed-subtitle {
      color: var(--text-secondary);
      margin-bottom: 20px;
      opacity: 0;
      transform: translateY(20px);
    }

    .mixed-btn {
      padding: 12px 24px;
      background: var(--accent-primary);
      color: white;
      font-weight: 600;
      border-radius: var(--radius-lg);
      cursor: pointer;
      opacity: 0;
      transform: scale(0.8);
    }

    /* Loop Demo */
    .loop-demo {
      display: flex;
      gap: 16px;
    }

    .loop-dot {
      width: 20px;
      height: 20px;
      background: var(--accent-primary);
      border-radius: 50%;
    }

    /* Card Reveal */
    .card-reveal-demo {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      width: 100%;
    }

    .reveal-card {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      opacity: 0;
      transform: translateY(30px);
    }

    .card-image {
      height: 80px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    }

    .card-content {
      padding: 16px;
    }

    .card-tag {
      font-size: 10px;
      color: var(--accent-primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }

    .card-heading {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .card-text {
      font-size: 12px;
      color: var(--text-tertiary);
    }
  `]
})
export class Chapter4Lesson1 {
  readonly seqBox1 = viewChild<ElementRef<HTMLElement>>('seqBox1');
  readonly seqBox2 = viewChild<ElementRef<HTMLElement>>('seqBox2');
  readonly seqBox3 = viewChild<ElementRef<HTMLElement>>('seqBox3');
  readonly overlapBar1 = viewChild<ElementRef<HTMLElement>>('overlapBar1');
  readonly overlapBar2 = viewChild<ElementRef<HTMLElement>>('overlapBar2');
  readonly overlapBar3 = viewChild<ElementRef<HTMLElement>>('overlapBar3');
  readonly timingA = viewChild<ElementRef<HTMLElement>>('timingA');
  readonly timingB = viewChild<ElementRef<HTMLElement>>('timingB');
  readonly timingC = viewChild<ElementRef<HTMLElement>>('timingC');
  readonly mixedContainer = viewChild<ElementRef<HTMLElement>>('mixedContainer');
  readonly loopDot1 = viewChild<ElementRef<HTMLElement>>('loopDot1');
  readonly loopDot2 = viewChild<ElementRef<HTMLElement>>('loopDot2');
  readonly loopDot3 = viewChild<ElementRef<HTMLElement>>('loopDot3');
  readonly cardRevealContainer = viewChild<ElementRef<HTMLElement>>('cardRevealContainer');

  readonly isLooping = signal(false);
  private loopControls: { stop: () => void } | null = null;

  readonly revealCards = signal([
    { id: 1, tag: 'Design', title: 'UI Components', desc: 'Beautiful elements' },
    { id: 2, tag: 'Motion', title: 'Animations', desc: 'Smooth transitions' },
    { id: 3, tag: 'Code', title: 'Clean Code', desc: 'Best practices' }
  ]);

  playBasicSequence(): void {
    const box1 = this.seqBox1()?.nativeElement;
    const box2 = this.seqBox2()?.nativeElement;
    const box3 = this.seqBox3()?.nativeElement;
    if (!box1 || !box2 || !box3) return;

    animate([
      [box1, { opacity: 1, scale: 1 }, { duration: 0.3 }],
      [box2, { opacity: 1, scale: 1 }, { duration: 0.3 }],
      [box3, { opacity: 1, scale: 1 }, { duration: 0.3 }]
    ]);
  }

  resetBasicSequence(): void {
    const boxes = [this.seqBox1(), this.seqBox2(), this.seqBox3()];
    boxes.forEach(box => {
      const el = box?.nativeElement;
      if (el) animate(el, { opacity: 0, scale: 0.5 }, { duration: 0.2 });
    });
  }

  playOverlapSequence(): void {
    const bar1 = this.overlapBar1()?.nativeElement;
    const bar2 = this.overlapBar2()?.nativeElement;
    const bar3 = this.overlapBar3()?.nativeElement;
    if (!bar1 || !bar2 || !bar3) return;

    animate([
      [bar1, { scaleX: 1 }, { duration: 0.5 }],
      [bar2, { scaleX: 1 }, { duration: 0.5, at: '-0.3' }],
      [bar3, { scaleX: 1 }, { duration: 0.5, at: '-0.3' }]
    ]);
  }

  resetOverlapSequence(): void {
    const bars = [this.overlapBar1(), this.overlapBar2(), this.overlapBar3()];
    bars.forEach(bar => {
      const el = bar?.nativeElement;
      if (el) animate(el, { scaleX: 0 }, { duration: 0.2 });
    });
  }

  playAbsoluteTiming(): void {
    const a = this.timingA()?.nativeElement;
    const b = this.timingB()?.nativeElement;
    const c = this.timingC()?.nativeElement;
    if (!a || !b || !c) return;

    animate([
      [a, { y: 0, opacity: 1 }, { duration: 0.4, at: 0 }],
      [b, { y: 0, opacity: 1 }, { duration: 0.4, at: 0.5 }],
      [c, { y: 0, opacity: 1 }, { duration: 0.4, at: 1 }]
    ]);
  }

  resetAbsoluteTiming(): void {
    const items = [this.timingA(), this.timingB(), this.timingC()];
    items.forEach(item => {
      const el = item?.nativeElement;
      if (el) animate(el, { y: 20, opacity: 0 }, { duration: 0.2 });
    });
  }

  playMixedSequence(): void {
    const container = this.mixedContainer()?.nativeElement;
    if (!container) return;

    const title = container.querySelector('.mixed-title');
    const subtitle = container.querySelector('.mixed-subtitle');
    const btn = container.querySelector('.mixed-btn');

    if (title && subtitle && btn) {
      animate([
        [title, { opacity: 1, y: 0 }, { duration: 0.5 }],
        [subtitle, { opacity: 1, y: 0 }, { duration: 0.4, at: '-0.3' }],
        [btn, { opacity: 1, scale: 1 }, { duration: 0.3, at: '-0.2' }]
      ]);
    }
  }

  resetMixedSequence(): void {
    const container = this.mixedContainer()?.nativeElement;
    if (!container) return;

    const title = container.querySelector('.mixed-title');
    const subtitle = container.querySelector('.mixed-subtitle');
    const btn = container.querySelector('.mixed-btn');

    [title, subtitle].forEach(el => {
      if (el) animate(el, { opacity: 0, y: 20 }, { duration: 0.2 });
    });
    if (btn) animate(btn, { opacity: 0, scale: 0.8 }, { duration: 0.2 });
  }

  playLoopSequence(): void {
    if (this.isLooping()) return;

    const dots = [this.loopDot1(), this.loopDot2(), this.loopDot3()]
      .map(d => d?.nativeElement)
      .filter(Boolean) as HTMLElement[];
    
    if (!dots.length) return;

    this.isLooping.set(true);

    const playLoop = () => {
      if (!this.isLooping()) return;
      
      animate(dots, { scale: 1.5 }, { delay: stagger(0.1), duration: 0.2 })
        .then(() => {
          if (!this.isLooping()) return;
          return animate(dots, { scale: 1 }, { delay: stagger(0.1), duration: 0.2 });
        })
        .then(() => {
          if (this.isLooping()) {
            setTimeout(playLoop, 200);
          }
        });
    };

    playLoop();
  }

  stopLoopSequence(): void {
    this.isLooping.set(false);
    
    const dots = [this.loopDot1(), this.loopDot2(), this.loopDot3()];
    dots.forEach(dot => {
      const el = dot?.nativeElement;
      if (el) animate(el, { scale: 1 }, { duration: 0.2 });
    });
  }

  playCardReveal(): void {
    const container = this.cardRevealContainer()?.nativeElement;
    if (!container) return;

    const cards = container.querySelectorAll('.reveal-card');
    animate(cards, { opacity: 1, y: 0 }, { delay: stagger(0.15), duration: 0.5 });
  }

  resetCardReveal(): void {
    const container = this.cardRevealContainer()?.nativeElement;
    if (!container) return;

    const cards = container.querySelectorAll('.reveal-card');
    animate(cards, { opacity: 0, y: 30 }, { duration: 0.2 });
  }
}
