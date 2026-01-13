import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

@Component({
  selector: 'app-chapter3-lesson3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="3"
      title="Drag Interactions"
      description="Create draggable elements with smooth animations. Implement sliders, cards, and gesture-driven interfaces.">
      
      <!-- Demo 1: Basic Drag -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Draggable</h2>
        <p class="section-desc">Drag the element and watch it snap back.</p>
        
        <div class="demo-area drag-area" #dragArea1>
          <div class="drag-box" #dragBox1>
            Drag Me
          </div>
        </div>

        <div class="code-block">
          <pre>element.addEventListener('pointerdown', startDrag)
element.addEventListener('pointermove', onDrag)
element.addEventListener('pointerup', () => {{ '{' }}
  // Snap back with spring
  animate(element, {{ '{' }} x: 0, y: 0 {{ '}' }}, {{ '{' }} type: spring {{ '}' }})
{{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Constrained Drag -->
      <section class="demo-section">
        <h2 class="section-title">2. Constrained Drag</h2>
        <p class="section-desc">Drag limited to horizontal or vertical axis.</p>
        
        <div class="demo-area">
          <div class="constrained-demos">
            <div class="constrained-track horizontal">
              <div class="constrained-box" #dragHorizontal>↔</div>
            </div>
            <div class="constrained-track vertical">
              <div class="constrained-box" #dragVertical>↕</div>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Horizontal only
onDrag = (e) => {{ '{' }}
  const x = clamp(e.clientX - startX, -100, 100)
  animate(element, {{ '{' }} x {{ '}' }}, {{ '{' }} duration: 0 {{ '}' }})
{{ '}' }}</pre>
        </div>
      </section>

      <!-- Demo 3: Slider -->
      <section class="demo-section">
        <h2 class="section-title">3. Custom Slider</h2>
        <p class="section-desc">Drag-based range slider with smooth animation.</p>
        
        <div class="demo-area">
          <div class="slider-container">
            <div class="slider-track" #sliderTrack>
              <div class="slider-fill" #sliderFill></div>
              <div class="slider-thumb" #sliderThumb></div>
            </div>
            <div class="slider-value">{{ sliderValue() }}%</div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Update fill and value based on thumb position
const percent = (thumbX / trackWidth) * 100
animate(fill, {{ '{' }} scaleX: percent / 100 {{ '}' }})
setValue(Math.round(percent))</pre>
        </div>
      </section>

      <!-- Demo 4: Swipe Cards -->
      <section class="demo-section">
        <h2 class="section-title">4. Swipe to Dismiss</h2>
        <p class="section-desc">Tinder-style swipe cards with rotation.</p>
        
        <div class="demo-area swipe-area">
          <div class="swipe-container" #swipeContainer>
            @for (card of swipeCards(); track card.id) {
              <div 
                class="swipe-card" 
                [style.background]="card.color"
                [style.z-index]="swipeCards().length - $index">
                <div class="swipe-content">
                  <span class="swipe-icon">{{ card.icon }}</span>
                  <span class="swipe-title">{{ card.title }}</span>
                </div>
                <div class="swipe-actions">
                  <span class="action-left">✗</span>
                  <span class="action-right">✓</span>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>onDrag = (e) => {{ '{' }}
  const x = e.clientX - startX
  const rotate = x * 0.1 // Rotation based on drag distance
  animate(card, {{ '{' }} x, rotate {{ '}' }})
{{ '}' }}

onRelease = () => {{ '{' }}
  if (Math.abs(x) > threshold) dismissCard()
  else snapBack()
{{ '}' }}</pre>
        </div>
      </section>

      <!-- Demo 5: Draggable List -->
      <section class="demo-section">
        <h2 class="section-title">5. Reorderable List</h2>
        <p class="section-desc">Drag items to reorder the list.</p>
        
        <div class="demo-area">
          <ul class="reorder-list" #reorderList>
            @for (item of listItems(); track item.id) {
              <li class="reorder-item" [attr.data-id]="item.id">
                <span class="drag-handle">⋮⋮</span>
                <span class="item-text">{{ item.text }}</span>
              </li>
            }
          </ul>
        </div>

        <div class="code-block">
          <pre>// Calculate new position based on drag
const newIndex = Math.floor((dragY + itemHeight/2) / itemHeight)
if (newIndex !== currentIndex) {{ '{' }}
  reorderItems(currentIndex, newIndex)
  animate(items, {{ '{' }} y: getPositions() {{ '}' }})
{{ '}' }}</pre>
        </div>
      </section>

      <!-- Demo 6: Elastic Drag -->
      <section class="demo-section">
        <h2 class="section-title">6. Elastic Pull</h2>
        <p class="section-desc">Pull-to-refresh style elastic resistance.</p>
        
        <div class="demo-area">
          <div class="elastic-container" #elasticContainer>
            <div class="elastic-indicator" #elasticIndicator>
              @if (pullProgress() > 0.8) {
                <span>Release to refresh</span>
              } @else {
                <span>Pull down</span>
              }
            </div>
            <div class="elastic-content" #elasticContent>
              <div class="content-item">Item 1</div>
              <div class="content-item">Item 2</div>
              <div class="content-item">Item 3</div>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Apply elastic resistance
const resistance = 0.5
const elasticY = y * resistance
animate(content, {{ '{' }} y: elasticY {{ '}' }})

onRelease = () => {{ '{' }}
  if (y > threshold) triggerRefresh()
  animate(content, {{ '{' }} y: 0 {{ '}' }}, {{ '{' }} type: spring {{ '}' }})
{{ '}' }}</pre>
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

    /* Basic Drag */
    .drag-area {
      min-height: 250px;
      position: relative;
    }

    .drag-box {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      cursor: grab;
      user-select: none;
      touch-action: none;
    }

    .drag-box:active {
      cursor: grabbing;
    }

    /* Constrained */
    .constrained-demos {
      display: flex;
      gap: 40px;
      align-items: center;
    }

    .constrained-track {
      background: var(--bg-hover);
      border-radius: var(--radius-full);
      position: relative;
    }

    .constrained-track.horizontal {
      width: 200px;
      height: 50px;
    }

    .constrained-track.vertical {
      width: 50px;
      height: 150px;
    }

    .constrained-box {
      width: 50px;
      height: 50px;
      background: var(--accent-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      cursor: grab;
      user-select: none;
      touch-action: none;
      position: absolute;
    }

    .horizontal .constrained-box {
      left: 0;
      top: 0;
    }

    .vertical .constrained-box {
      left: 0;
      top: 0;
    }

    /* Slider */
    .slider-container {
      width: 300px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .slider-track {
      flex: 1;
      height: 8px;
      background: var(--bg-hover);
      border-radius: var(--radius-full);
      position: relative;
    }

    .slider-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: var(--accent-primary);
      border-radius: var(--radius-full);
      transform-origin: left;
    }

    .slider-thumb {
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
      box-shadow: var(--shadow-md);
      cursor: grab;
      touch-action: none;
    }

    .slider-value {
      width: 50px;
      font-size: 18px;
      font-weight: 600;
      text-align: right;
    }

    /* Swipe Cards */
    .swipe-area {
      min-height: 320px;
    }

    .swipe-container {
      position: relative;
      width: 250px;
      height: 300px;
    }

    .swipe-card {
      position: absolute;
      inset: 0;
      border-radius: var(--radius-xl);
      padding: 24px;
      display: flex;
      flex-direction: column;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }

    .swipe-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .swipe-icon {
      font-size: 48px;
    }

    .swipe-title {
      font-size: 18px;
      font-weight: 600;
      color: white;
    }

    .swipe-actions {
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      opacity: 0;
    }

    .action-left { color: #ef4444; }
    .action-right { color: #22c55e; }

    /* Reorderable List */
    .reorder-list {
      list-style: none;
      width: 280px;
    }

    .reorder-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      margin-bottom: 8px;
      cursor: grab;
      user-select: none;
      touch-action: none;
    }

    .drag-handle {
      color: var(--text-tertiary);
      cursor: grab;
    }

    .item-text {
      flex: 1;
    }

    /* Elastic Pull */
    .elastic-container {
      width: 280px;
      height: 200px;
      background: var(--bg-hover);
      border-radius: var(--radius-lg);
      overflow: hidden;
      position: relative;
    }

    .elastic-indicator {
      position: absolute;
      top: -40px;
      left: 0;
      right: 0;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .elastic-content {
      padding: 16px;
      touch-action: none;
    }

    .content-item {
      padding: 12px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      margin-bottom: 8px;
    }
  `]
})
export class Chapter3Lesson3 implements OnDestroy {
  readonly dragBox1 = viewChild<ElementRef<HTMLElement>>('dragBox1');
  readonly dragHorizontal = viewChild<ElementRef<HTMLElement>>('dragHorizontal');
  readonly dragVertical = viewChild<ElementRef<HTMLElement>>('dragVertical');
  readonly sliderTrack = viewChild<ElementRef<HTMLElement>>('sliderTrack');
  readonly sliderThumb = viewChild<ElementRef<HTMLElement>>('sliderThumb');
  readonly sliderFill = viewChild<ElementRef<HTMLElement>>('sliderFill');
  readonly swipeContainer = viewChild<ElementRef<HTMLElement>>('swipeContainer');
  readonly reorderList = viewChild<ElementRef<HTMLElement>>('reorderList');
  readonly elasticContent = viewChild<ElementRef<HTMLElement>>('elasticContent');

  readonly sliderValue = signal(50);
  readonly pullProgress = signal(0);
  
  readonly swipeCards = signal([
    { id: 1, icon: '🎨', title: 'Design', color: 'linear-gradient(135deg, #ec4899, #be185d)' },
    { id: 2, icon: '⚡', title: 'Speed', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { id: 3, icon: '🚀', title: 'Launch', color: 'linear-gradient(135deg, #6366f1, #4f46e5)' }
  ]);

  readonly listItems = signal([
    { id: 1, text: 'First Item' },
    { id: 2, text: 'Second Item' },
    { id: 3, text: 'Third Item' },
    { id: 4, text: 'Fourth Item' }
  ]);

  private cleanupFns: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.setupDragInteractions();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  private setupDragInteractions(): void {
    // Demo 1: Basic Drag
    this.setupBasicDrag();
    
    // Demo 2: Constrained Drag
    this.setupConstrainedDrag();
    
    // Demo 3: Slider
    this.setupSlider();
    
    // Demo 4: Swipe Cards
    this.setupSwipeCards();
    
    // Demo 5: Reorderable List
    this.setupReorderableList();
    
    // Demo 6: Elastic Pull
    this.setupElasticPull();
  }

  private setupBasicDrag(): void {
    const box = this.dragBox1()?.nativeElement;
    if (!box) return;

    let startX = 0, startY = 0, currentX = 0, currentY = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      box.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      animate(box, { x: currentX, y: currentY }, { duration: 0 });
    };

    const onPointerUp = () => {
      isDragging = false;
      animate(box, { x: 0, y: 0 }, { type: spring, stiffness: 300, damping: 20 });
      currentX = 0;
      currentY = 0;
    };

    box.addEventListener('pointerdown', onPointerDown);
    box.addEventListener('pointermove', onPointerMove);
    box.addEventListener('pointerup', onPointerUp);

    this.cleanupFns.push(() => {
      box.removeEventListener('pointerdown', onPointerDown);
      box.removeEventListener('pointermove', onPointerMove);
      box.removeEventListener('pointerup', onPointerUp);
    });
  }

  private setupConstrainedDrag(): void {
    const hBox = this.dragHorizontal()?.nativeElement;
    const vBox = this.dragVertical()?.nativeElement;

    if (hBox) {
      let startX = 0, currentX = 0, isDragging = false;

      const onDown = (e: PointerEvent) => {
        isDragging = true;
        startX = e.clientX - currentX;
        hBox.setPointerCapture(e.pointerId);
      };

      const onMove = (e: PointerEvent) => {
        if (!isDragging) return;
        currentX = Math.max(-75, Math.min(75, e.clientX - startX));
        animate(hBox, { x: currentX }, { duration: 0 });
      };

      const onUp = () => {
        isDragging = false;
      };

      hBox.addEventListener('pointerdown', onDown);
      hBox.addEventListener('pointermove', onMove);
      hBox.addEventListener('pointerup', onUp);

      this.cleanupFns.push(() => {
        hBox.removeEventListener('pointerdown', onDown);
        hBox.removeEventListener('pointermove', onMove);
        hBox.removeEventListener('pointerup', onUp);
      });
    }

    if (vBox) {
      let startY = 0, currentY = 0, isDragging = false;

      const onDown = (e: PointerEvent) => {
        isDragging = true;
        startY = e.clientY - currentY;
        vBox.setPointerCapture(e.pointerId);
      };

      const onMove = (e: PointerEvent) => {
        if (!isDragging) return;
        currentY = Math.max(0, Math.min(100, e.clientY - startY));
        animate(vBox, { y: currentY }, { duration: 0 });
      };

      const onUp = () => {
        isDragging = false;
      };

      vBox.addEventListener('pointerdown', onDown);
      vBox.addEventListener('pointermove', onMove);
      vBox.addEventListener('pointerup', onUp);

      this.cleanupFns.push(() => {
        vBox.removeEventListener('pointerdown', onDown);
        vBox.removeEventListener('pointermove', onMove);
        vBox.removeEventListener('pointerup', onUp);
      });
    }
  }

  private setupSlider(): void {
    const track = this.sliderTrack()?.nativeElement;
    const thumb = this.sliderThumb()?.nativeElement;
    const fill = this.sliderFill()?.nativeElement;
    if (!track || !thumb || !fill) return;

    // Initialize position
    const trackWidth = track.offsetWidth;
    const initialX = (this.sliderValue() / 100) * trackWidth;
    animate(thumb, { x: initialX }, { duration: 0 });
    animate(fill, { scaleX: this.sliderValue() / 100 }, { duration: 0 });

    let isDragging = false;

    const updateSlider = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const percent = (x / rect.width) * 100;
      
      animate(thumb, { x }, { duration: 0 });
      animate(fill, { scaleX: percent / 100 }, { duration: 0 });
      this.sliderValue.set(Math.round(percent));
    };

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      thumb.setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    };

    const onUp = () => {
      isDragging = false;
    };

    thumb.addEventListener('pointerdown', onDown);
    thumb.addEventListener('pointermove', onMove);
    thumb.addEventListener('pointerup', onUp);

    this.cleanupFns.push(() => {
      thumb.removeEventListener('pointerdown', onDown);
      thumb.removeEventListener('pointermove', onMove);
      thumb.removeEventListener('pointerup', onUp);
    });
  }

  private setupSwipeCards(): void {
    const container = this.swipeContainer()?.nativeElement;
    if (!container) return;

    const cards = container.querySelectorAll('.swipe-card');
    if (!cards.length) return;

    const topCard = cards[0] as HTMLElement;
    let startX = 0, currentX = 0, isDragging = false;

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      topCard.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      const rotate = currentX * 0.05;
      animate(topCard, { x: currentX, rotate }, { duration: 0 });
      
      const actions = topCard.querySelector('.swipe-actions') as HTMLElement;
      if (actions) {
        actions.style.opacity = String(Math.min(1, Math.abs(currentX) / 100));
      }
    };

    const onUp = () => {
      isDragging = false;
      
      if (Math.abs(currentX) > 100) {
        // Dismiss card
        const direction = currentX > 0 ? 1 : -1;
        animate(topCard, { x: direction * 500, opacity: 0, rotate: direction * 30 }, { duration: 0.3 });
      } else {
        // Snap back
        animate(topCard, { x: 0, rotate: 0 }, { type: spring, stiffness: 300, damping: 20 });
        const actions = topCard.querySelector('.swipe-actions') as HTMLElement;
        if (actions) actions.style.opacity = '0';
      }
      currentX = 0;
    };

    topCard.addEventListener('pointerdown', onDown);
    topCard.addEventListener('pointermove', onMove);
    topCard.addEventListener('pointerup', onUp);

    this.cleanupFns.push(() => {
      topCard.removeEventListener('pointerdown', onDown);
      topCard.removeEventListener('pointermove', onMove);
      topCard.removeEventListener('pointerup', onUp);
    });
  }

  private setupReorderableList(): void {
    const list = this.reorderList()?.nativeElement;
    if (!list) return;

    const items = list.querySelectorAll('.reorder-item');
    
    items.forEach((item) => {
      const el = item as HTMLElement;
      let startY = 0, currentY = 0, isDragging = false;

      const onDown = (e: PointerEvent) => {
        isDragging = true;
        startY = e.clientY;
        el.setPointerCapture(e.pointerId);
        animate(el, { scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }, { duration: 0.1 });
      };

      const onMove = (e: PointerEvent) => {
        if (!isDragging) return;
        currentY = e.clientY - startY;
        animate(el, { y: currentY }, { duration: 0 });
      };

      const onUp = () => {
        isDragging = false;
        animate(el, { y: 0, scale: 1, boxShadow: 'none' }, { type: spring, stiffness: 300, damping: 25 });
        currentY = 0;
      };

      el.addEventListener('pointerdown', onDown);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);

      this.cleanupFns.push(() => {
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
      });
    });
  }

  private setupElasticPull(): void {
    const content = this.elasticContent()?.nativeElement;
    if (!content) return;

    let startY = 0, currentY = 0, isDragging = false;
    const resistance = 0.4;

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      startY = e.clientY;
      content.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      if (deltaY > 0) {
        currentY = deltaY * resistance;
        animate(content, { y: currentY }, { duration: 0 });
        this.pullProgress.set(Math.min(1, currentY / 80));
      }
    };

    const onUp = () => {
      isDragging = false;
      animate(content, { y: 0 }, { type: spring, stiffness: 300, damping: 25 });
      this.pullProgress.set(0);
      currentY = 0;
    };

    content.addEventListener('pointerdown', onDown);
    content.addEventListener('pointermove', onMove);
    content.addEventListener('pointerup', onUp);

    this.cleanupFns.push(() => {
      content.removeEventListener('pointerdown', onDown);
      content.removeEventListener('pointermove', onMove);
      content.removeEventListener('pointerup', onUp);
    });
  }
}
