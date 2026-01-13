import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, scroll } from 'motion';

@Component({
  selector: 'app-chapter2-lesson3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="2"
      title="Parallax Effects"
      description="Create depth and dimension with parallax scrolling. Learn to move elements at different speeds for immersive scroll experiences.">
      
      <!-- Demo 1: Simple Parallax -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Parallax</h2>
        <p class="section-desc">Elements move at different speeds relative to scroll.</p>
        
        <div class="scroll-container tall" #parallaxContainer1>
          <div class="parallax-scene">
            <div class="parallax-layer slow" #parallaxSlow>
              <div class="parallax-shape circle"></div>
            </div>
            <div class="parallax-layer medium" #parallaxMedium>
              <div class="parallax-shape square"></div>
            </div>
            <div class="parallax-layer fast" #parallaxFast>
              <div class="parallax-shape triangle"></div>
            </div>
          </div>
          <div class="scroll-spacer tall-spacer"></div>
        </div>

        <div class="code-block">
          <pre>// Different speeds create depth perception
scroll(animate(slow, {{ '{' }} y: [0, 50] {{ '}' }}), {{ '{' }} target {{ '}' }})
scroll(animate(medium, {{ '{' }} y: [0, 150] {{ '}' }}), {{ '{' }} target {{ '}' }})
scroll(animate(fast, {{ '{' }} y: [0, 250] {{ '}' }}), {{ '{' }} target {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Hero Parallax -->
      <section class="demo-section">
        <h2 class="section-title">2. Hero Section Parallax</h2>
        <p class="section-desc">A common pattern for landing page hero sections.</p>
        
        <div class="scroll-container tall" #heroContainer>
          <div class="hero-scene">
            <div class="hero-bg" #heroBg></div>
            <div class="hero-content" #heroContent>
              <h2 class="hero-title">Welcome</h2>
              <p class="hero-subtitle">Scroll to explore</p>
            </div>
            <div class="hero-overlay" #heroOverlay></div>
          </div>
          <div class="hero-spacer"></div>
        </div>

        <div class="code-block">
          <pre>scroll(animate(bg, {{ '{' }} scale: [1, 1.2] {{ '}' }}), {{ '{' }} target {{ '}' }})
scroll(animate(content, {{ '{' }} y: [0, 100], opacity: [1, 0] {{ '}' }}), {{ '{' }} target {{ '}' }})
scroll(animate(overlay, {{ '{' }} opacity: [0, 0.8] {{ '}' }}), {{ '{' }} target {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: Floating Elements -->
      <section class="demo-section">
        <h2 class="section-title">3. Floating Elements</h2>
        <p class="section-desc">Elements float in different directions as you scroll.</p>
        
        <div class="scroll-container tall" #floatContainer>
          <div class="float-scene">
            @for (item of floatItems(); track item.id) {
              <div 
                class="float-item"
                [style.left.%]="item.x"
                [style.top.%]="item.y"
                [style.width.px]="item.size"
                [style.height.px]="item.size"
                [style.background]="item.color"
                [attr.data-speed]="item.speed"
                [attr.data-direction]="item.direction">
              </div>
            }
          </div>
          <div class="scroll-spacer tall-spacer"></div>
        </div>

        <div class="code-block">
          <pre>// Each element has its own speed and direction
floatItems.forEach(item => {{ '{' }}
  const movement = item.direction === 'up' ? -100 : 100
  scroll(animate(item.el, {{ '{' }} y: [0, movement * item.speed] {{ '}' }}))
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 4: Text Reveal Parallax -->
      <section class="demo-section">
        <h2 class="section-title">4. Text Reveal Parallax</h2>
        <p class="section-desc">Words reveal with parallax movement.</p>
        
        <div class="scroll-container tall" #textParallaxContainer>
          <div class="text-parallax-scene">
            <div class="text-line" #textLine1>Motion</div>
            <div class="text-line" #textLine2>creates</div>
            <div class="text-line" #textLine3>magic</div>
          </div>
          <div class="scroll-spacer tall-spacer"></div>
        </div>

        <div class="code-block">
          <pre>scroll(animate(line1, {{ '{' }} x: [-100, 0], opacity: [0, 1] {{ '}' }}))
scroll(animate(line2, {{ '{' }} x: [100, 0], opacity: [0, 1] {{ '}' }}))
scroll(animate(line3, {{ '{' }} x: [-100, 0], opacity: [0, 1] {{ '}' }}))</pre>
        </div>
      </section>

      <!-- Demo 5: 3D Perspective -->
      <section class="demo-section">
        <h2 class="section-title">5. Perspective Scroll</h2>
        <p class="section-desc">3D perspective effects on scroll.</p>
        
        <div class="scroll-container tall" #perspectiveContainer>
          <div class="perspective-scene">
            <div class="perspective-card" #perspCard1>
              <span>Card 1</span>
            </div>
            <div class="perspective-card" #perspCard2>
              <span>Card 2</span>
            </div>
            <div class="perspective-card" #perspCard3>
              <span>Card 3</span>
            </div>
          </div>
          <div class="scroll-spacer tall-spacer"></div>
        </div>

        <div class="code-block">
          <pre>scroll(animate(card, {{ '{' }} 
  rotateX: [45, 0], 
  z: [-200, 0],
  opacity: [0, 1] 
{{ '}' }}), {{ '{' }} offset: ['start end', 'center center'] {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 6: Scroll Zoom -->
      <section class="demo-section">
        <h2 class="section-title">6. Scroll Zoom Effect</h2>
        <p class="section-desc">Zoom into content as you scroll.</p>
        
        <div class="scroll-container tall" #zoomContainer>
          <div class="zoom-scene">
            <div class="zoom-content" #zoomContent>
              <div class="zoom-circle" #zoomCircle>
                <span class="zoom-text">Zoom</span>
              </div>
            </div>
          </div>
          <div class="scroll-spacer tall-spacer"></div>
        </div>

        <div class="code-block">
          <pre>scroll(animate(element, {{ '{' }} 
  scale: [0.5, 1.5],
  borderRadius: ['50%', '20%']
{{ '}' }}), {{ '{' }} target: container {{ '}' }})</pre>
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

    .scroll-container {
      height: 300px;
      overflow-y: auto;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      margin-bottom: 16px;
      position: relative;
    }

    .scroll-container.tall {
      height: 400px;
    }

    .scroll-spacer {
      height: 150px;
    }

    .tall-spacer {
      height: 300px;
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

    /* Parallax Scene */
    .parallax-scene {
      height: 250px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .parallax-layer {
      position: absolute;
    }

    .parallax-shape {
      width: 80px;
      height: 80px;
    }

    .parallax-shape.circle {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 50%;
    }

    .parallax-shape.square {
      background: linear-gradient(135deg, #8b5cf6, #6d28d9);
      border-radius: var(--radius-lg);
    }

    .parallax-shape.triangle {
      width: 0;
      height: 0;
      border-left: 40px solid transparent;
      border-right: 40px solid transparent;
      border-bottom: 70px solid #ec4899;
      background: transparent;
    }

    .slow { left: 20%; }
    .medium { left: 50%; transform: translateX(-50%); }
    .fast { right: 20%; }

    /* Hero Scene */
    .hero-scene {
      height: 300px;
      position: relative;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      inset: -20px;
      background: linear-gradient(135deg, #1e1b4b, #312e81);
    }

    .hero-content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    .hero-title {
      font-size: 48px;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
    }

    .hero-subtitle {
      font-size: 16px;
      color: rgba(255,255,255,0.7);
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: black;
      opacity: 0;
      z-index: 1;
    }

    .hero-spacer {
      height: 200px;
    }

    /* Float Scene */
    .float-scene {
      height: 300px;
      position: relative;
      overflow: hidden;
    }

    .float-item {
      position: absolute;
      border-radius: var(--radius-lg);
      opacity: 0.8;
    }

    /* Text Parallax */
    .text-parallax-scene {
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .text-line {
      font-size: 48px;
      font-weight: 700;
      opacity: 0;
    }

    /* Perspective */
    .perspective-scene {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      perspective: 1000px;
    }

    .perspective-card {
      width: 100px;
      height: 140px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      opacity: 0;
      transform: rotateX(45deg) translateZ(-200px);
    }

    /* Zoom Scene */
    .zoom-scene {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .zoom-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .zoom-circle {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, var(--accent-primary), #ec4899);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(0.5);
    }

    .zoom-text {
      font-size: 24px;
      font-weight: 700;
      color: white;
    }
  `]
})
export class Chapter2Lesson3 implements OnDestroy {
  readonly parallaxContainer1 = viewChild<ElementRef<HTMLElement>>('parallaxContainer1');
  readonly parallaxSlow = viewChild<ElementRef<HTMLElement>>('parallaxSlow');
  readonly parallaxMedium = viewChild<ElementRef<HTMLElement>>('parallaxMedium');
  readonly parallaxFast = viewChild<ElementRef<HTMLElement>>('parallaxFast');
  
  readonly heroContainer = viewChild<ElementRef<HTMLElement>>('heroContainer');
  readonly heroBg = viewChild<ElementRef<HTMLElement>>('heroBg');
  readonly heroContent = viewChild<ElementRef<HTMLElement>>('heroContent');
  readonly heroOverlay = viewChild<ElementRef<HTMLElement>>('heroOverlay');
  
  readonly floatContainer = viewChild<ElementRef<HTMLElement>>('floatContainer');
  
  readonly textParallaxContainer = viewChild<ElementRef<HTMLElement>>('textParallaxContainer');
  readonly textLine1 = viewChild<ElementRef<HTMLElement>>('textLine1');
  readonly textLine2 = viewChild<ElementRef<HTMLElement>>('textLine2');
  readonly textLine3 = viewChild<ElementRef<HTMLElement>>('textLine3');
  
  readonly perspectiveContainer = viewChild<ElementRef<HTMLElement>>('perspectiveContainer');
  readonly perspCard1 = viewChild<ElementRef<HTMLElement>>('perspCard1');
  readonly perspCard2 = viewChild<ElementRef<HTMLElement>>('perspCard2');
  readonly perspCard3 = viewChild<ElementRef<HTMLElement>>('perspCard3');
  
  readonly zoomContainer = viewChild<ElementRef<HTMLElement>>('zoomContainer');
  readonly zoomCircle = viewChild<ElementRef<HTMLElement>>('zoomCircle');

  readonly floatItems = signal([
    { id: 1, x: 10, y: 20, size: 60, color: '#6366f1', speed: 1.5, direction: 'up' },
    { id: 2, x: 30, y: 60, size: 40, color: '#22c55e', speed: 0.8, direction: 'down' },
    { id: 3, x: 50, y: 30, size: 50, color: '#f59e0b', speed: 1.2, direction: 'up' },
    { id: 4, x: 70, y: 50, size: 35, color: '#ec4899', speed: 0.6, direction: 'down' },
    { id: 5, x: 85, y: 25, size: 45, color: '#8b5cf6', speed: 1.0, direction: 'up' }
  ]);

  private cleanupFns: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.setupParallaxEffects();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  private setupParallaxEffects(): void {
    // Demo 1: Basic Parallax
    const container1 = this.parallaxContainer1()?.nativeElement;
    const slow = this.parallaxSlow()?.nativeElement;
    const medium = this.parallaxMedium()?.nativeElement;
    const fast = this.parallaxFast()?.nativeElement;
    
    if (container1 && slow && medium && fast) {
      this.cleanupFns.push(scroll(animate(slow, { y: [0, 50] }), { target: container1 }));
      this.cleanupFns.push(scroll(animate(medium, { y: [0, 150] }), { target: container1 }));
      this.cleanupFns.push(scroll(animate(fast, { y: [0, 250] }), { target: container1 }));
    }

    // Demo 2: Hero Parallax
    const heroC = this.heroContainer()?.nativeElement;
    const bg = this.heroBg()?.nativeElement;
    const content = this.heroContent()?.nativeElement;
    const overlay = this.heroOverlay()?.nativeElement;
    
    if (heroC && bg && content && overlay) {
      this.cleanupFns.push(scroll(animate(bg, { scale: [1, 1.2] }), { target: heroC }));
      this.cleanupFns.push(scroll(animate(content, { y: [0, 100], opacity: [1, 0] }), { target: heroC }));
      this.cleanupFns.push(scroll(animate(overlay, { opacity: [0, 0.8] }), { target: heroC }));
    }

    // Demo 3: Floating Elements
    const floatC = this.floatContainer()?.nativeElement;
    if (floatC) {
      const items = floatC.querySelectorAll('.float-item');
      items.forEach((item) => {
        const speed = parseFloat(item.getAttribute('data-speed') || '1');
        const direction = item.getAttribute('data-direction');
        const movement = direction === 'up' ? -100 * speed : 100 * speed;
        this.cleanupFns.push(scroll(animate(item, { y: [0, movement] }), { target: floatC }));
      });
    }

    // Demo 4: Text Parallax
    const textC = this.textParallaxContainer()?.nativeElement;
    const line1 = this.textLine1()?.nativeElement;
    const line2 = this.textLine2()?.nativeElement;
    const line3 = this.textLine3()?.nativeElement;
    
    if (textC && line1 && line2 && line3) {
      this.cleanupFns.push(scroll(animate(line1, { x: [-100, 0], opacity: [0, 1] }), { target: textC }));
      this.cleanupFns.push(scroll(animate(line2, { x: [100, 0], opacity: [0, 1] }), { target: textC }));
      this.cleanupFns.push(scroll(animate(line3, { x: [-100, 0], opacity: [0, 1] }), { target: textC }));
    }

    // Demo 5: Perspective
    const perspC = this.perspectiveContainer()?.nativeElement;
    const card1 = this.perspCard1()?.nativeElement;
    const card2 = this.perspCard2()?.nativeElement;
    const card3 = this.perspCard3()?.nativeElement;
    
    if (perspC && card1 && card2 && card3) {
      [card1, card2, card3].forEach((card, i) => {
        this.cleanupFns.push(scroll(
          animate(card, { rotateX: [45, 0], opacity: [0, 1] }),
          { target: perspC, offset: [`${i * 0.1} 1`, `${0.5 + i * 0.1} 0.5`] }
        ));
      });
    }

    // Demo 6: Zoom
    const zoomC = this.zoomContainer()?.nativeElement;
    const circle = this.zoomCircle()?.nativeElement;
    
    if (zoomC && circle) {
      this.cleanupFns.push(scroll(
        animate(circle, { scale: [0.5, 1.5], borderRadius: ['50%', '20%'] }),
        { target: zoomC }
      ));
    }
  }
}
