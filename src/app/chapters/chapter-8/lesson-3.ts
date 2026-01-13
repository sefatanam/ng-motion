import { Component, ChangeDetectionStrategy, viewChild, ElementRef, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring, stagger } from 'motion';

type TransitionType = 'fade' | 'slide' | 'scale' | 'flip' | 'morph' | 'shared';

interface Page {
  id: string;
  title: string;
  icon: string;
  color: string;
}

/**
 * @REVIEW Chapter 8 Lesson 3 - Page Transitions
 * Premium page transitions for route changes and view swapping
 */
@Component({
  selector: 'app-chapter8-lesson3',
  standalone: true,
  imports: [LessonLayout, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      title="Page Transitions"
      description="Premium page transition animations for route changes, view swapping, and shared element transitions"
      chapter="8"
    >
      <div class="demos-grid">
        <!-- Transition Type Selector -->
        <div class="demo-section full-width">
          <h3>Transition Types</h3>
          <div class="transition-selector">
            @for (type of transitionTypes; track type) {
              <button
                [class.active]="activeTransition() === type"
                (click)="setTransition(type)"
              >
                {{ type | titlecase }}
              </button>
            }
          </div>
        </div>

        <!-- Page Preview -->
        <div class="demo-section full-width">
          <div class="page-preview">
            <div class="page-nav">
              @for (page of pages; track page.id) {
                <button
                  [class.active]="currentPage() === page.id"
                  (click)="navigateTo(page.id)"
                >
                  <span>{{ page.icon }}</span>
                  <span>{{ page.title }}</span>
                </button>
              }
            </div>

            <div class="page-container">
              <div #pageContent class="page-content" [style.background]="getCurrentPageColor()">
                <div class="page-hero">
                  <span class="page-icon">{{ getCurrentPageIcon() }}</span>
                  <h2>{{ getCurrentPageTitle() }}</h2>
                </div>

                <div class="page-body">
                  <div class="content-card">
                    <div class="card-header">
                      <span class="dot"></span>
                      <span class="dot"></span>
                      <span class="dot"></span>
                    </div>
                    <div class="card-content">
                      <div class="line"></div>
                      <div class="line short"></div>
                      <div class="line"></div>
                    </div>
                  </div>

                  <div class="content-grid">
                    @for (item of [1,2,3,4]; track item) {
                      <div class="grid-box"></div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Direction Control -->
        <div class="demo-section">
          <h3>Slide Direction</h3>
          <div class="direction-grid">
            <button (click)="setDirection('up')">↑ Up</button>
            <button (click)="setDirection('down')">↓ Down</button>
            <button (click)="setDirection('left')">← Left</button>
            <button (click)="setDirection('right')">→ Right</button>
          </div>
        </div>

        <!-- Easing Control -->
        <div class="demo-section">
          <h3>Easing</h3>
          <div class="easing-selector">
            <button
              [class.active]="useSpring()"
              (click)="useSpring.set(true)"
            >
              Spring
            </button>
            <button
              [class.active]="!useSpring()"
              (click)="useSpring.set(false)"
            >
              Ease
            </button>
          </div>
          @if (useSpring()) {
            <div class="spring-controls">
              <label>
                Stiffness: {{ springStiffness() }}
                <input
                  type="range"
                  min="100"
                  max="600"
                  [value]="springStiffness()"
                  (input)="springStiffness.set(+$any($event.target).value)"
                />
              </label>
              <label>
                Damping: {{ springDamping() }}
                <input
                  type="range"
                  min="10"
                  max="50"
                  [value]="springDamping()"
                  (input)="springDamping.set(+$any($event.target).value)"
                />
              </label>
            </div>
          }
        </div>

        <!-- Staggered Elements Demo -->
        <div class="demo-section">
          <h3>Staggered Elements</h3>
          <div #staggerDemo class="stagger-demo">
            <div class="stagger-header"></div>
            <div class="stagger-items">
              @for (item of [1,2,3,4,5]; track item) {
                <div class="stagger-item"></div>
              }
            </div>
          </div>
          <div class="controls">
            <button (click)="playStaggerAnimation()">Replay</button>
          </div>
        </div>

        <!-- Shared Element Preview -->
        <div class="demo-section large">
          <h3>Shared Element Transition</h3>
          <div class="shared-demo">
            @if (!sharedExpanded()) {
              <div class="shared-grid">
                @for (card of sharedCards; track card.id) {
                  <div
                    class="shared-card"
                    [style.background]="card.color"
                    (click)="expandSharedCard(card)"
                  >
                    <span class="shared-icon">{{ card.icon }}</span>
                    <span class="shared-title">{{ card.title }}</span>
                  </div>
                }
              </div>
            } @else {
              <div
                #expandedCard
                class="expanded-card"
                [style.background]="selectedCard()!.color"
              >
                <button class="close-btn" (click)="collapseSharedCard()">×</button>
                <div class="expanded-content">
                  <span class="expanded-icon">{{ selectedCard()!.icon }}</span>
                  <h2>{{ selectedCard()!.title }}</h2>
                  <p>This is an expanded view showing a shared element transition.</p>
                  <div class="expanded-actions">
                    <button>Action 1</button>
                    <button>Action 2</button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Crossfade Demo -->
        <div class="demo-section">
          <h3>Crossfade Views</h3>
          <div class="crossfade-demo">
            <div #crossfadeA class="crossfade-view view-a" [class.active]="crossfadeView() === 'a'">
              <div class="view-content">
                <span>📋</span>
                <span>List View</span>
              </div>
            </div>
            <div #crossfadeB class="crossfade-view view-b" [class.active]="crossfadeView() === 'b'">
              <div class="view-content">
                <span>📊</span>
                <span>Grid View</span>
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="toggleCrossfade()">
              Switch to {{ crossfadeView() === 'a' ? 'Grid' : 'List' }}
            </button>
          </div>
        </div>
      </div>
    </app-lesson-layout>
  `,
  styles: [`
    .demos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .demo-section {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;

      &.full-width {
        grid-column: 1 / -1;
      }

      &.large {
        grid-column: 1 / -1;
      }

      h3 {
        margin: 0 0 1rem 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .transition-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      button {
        padding: 0.5rem 1rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.2s;

        &:hover {
          border-color: var(--accent);
          color: var(--text-primary);
        }

        &.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
      }
    }

    .page-preview {
      background: var(--bg-tertiary);
      border-radius: 12px;
      overflow: hidden;
    }

    .page-nav {
      display: flex;
      gap: 0;
      border-bottom: 1px solid var(--border-color);

      button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 1rem;
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s;
        border-bottom: 2px solid transparent;

        &:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        &.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
      }
    }

    .page-container {
      height: 400px;
      overflow: hidden;
      position: relative;
    }

    .page-content {
      position: absolute;
      inset: 0;
      padding: 2rem;
      display: flex;
      flex-direction: column;
    }

    .page-hero {
      text-align: center;
      margin-bottom: 2rem;
    }

    .page-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }

    .page-hero h2 {
      margin: 0;
      color: white;
      font-size: 1.5rem;
    }

    .page-body {
      display: flex;
      gap: 1.5rem;
      flex: 1;
    }

    .content-card {
      flex: 1;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      overflow: hidden;
    }

    .card-header {
      display: flex;
      gap: 6px;
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
    }

    .card-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .line {
      height: 12px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 6px;

      &.short {
        width: 60%;
      }
    }

    .content-grid {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .grid-box {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }

    .direction-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;

      button {
        padding: 0.75rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-primary);
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.2s;

        &:hover {
          background: var(--accent);
          border-color: var(--accent);
        }
      }
    }

    .easing-selector {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;

      button {
        flex: 1;
        padding: 0.5rem 1rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s;

        &.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
      }
    }

    .spring-controls {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.75rem;
        color: var(--text-secondary);
      }

      input[type="range"] {
        width: 100%;
      }
    }

    /* Stagger Demo */
    .stagger-demo {
      padding: 1rem;
      background: var(--bg-tertiary);
      border-radius: 8px;
    }

    .stagger-header {
      height: 24px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .stagger-items {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stagger-item {
      height: 32px;
      background: var(--accent);
      border-radius: 4px;
      opacity: 0.8;
    }

    /* Shared Element Demo */
    .shared-demo {
      min-height: 300px;
    }

    .shared-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }

    .shared-card {
      aspect-ratio: 1;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.05);
      }
    }

    .shared-icon {
      font-size: 2.5rem;
    }

    .shared-title {
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .expanded-card {
      border-radius: 20px;
      padding: 2rem;
      position: relative;
      min-height: 300px;
    }

    .close-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      border: none;
      color: white;
      font-size: 1.25rem;
      cursor: pointer;
    }

    .expanded-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 1rem;
      padding-top: 2rem;
    }

    .expanded-icon {
      font-size: 4rem;
    }

    .expanded-content h2 {
      margin: 0;
      color: white;
    }

    .expanded-content p {
      color: rgba(255, 255, 255, 0.8);
      max-width: 300px;
    }

    .expanded-actions {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.5rem 1.5rem;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 8px;
        color: white;
        cursor: pointer;
      }
    }

    /* Crossfade Demo */
    .crossfade-demo {
      position: relative;
      height: 150px;
      background: var(--bg-tertiary);
      border-radius: 8px;
      overflow: hidden;
    }

    .crossfade-view {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;

      &.active {
        opacity: 1;
        pointer-events: auto;
      }
    }

    .view-a {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .view-b {
      background: linear-gradient(135deg, #f093fb, #f5576c);
    }

    .view-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: white;

      span:first-child {
        font-size: 2.5rem;
      }

      span:last-child {
        font-weight: 600;
      }
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;

      button {
        padding: 0.5rem 1rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-primary);
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.2s;

        &:hover {
          background: var(--accent);
          border-color: var(--accent);
        }
      }
    }
  `]
})
export class Chapter8Lesson3 {
  pageContent = viewChild<ElementRef<HTMLElement>>('pageContent');
  staggerDemo = viewChild<ElementRef<HTMLElement>>('staggerDemo');
  expandedCard = viewChild<ElementRef<HTMLElement>>('expandedCard');
  crossfadeA = viewChild<ElementRef<HTMLElement>>('crossfadeA');
  crossfadeB = viewChild<ElementRef<HTMLElement>>('crossfadeB');

  transitionTypes: TransitionType[] = ['fade', 'slide', 'scale', 'flip', 'morph', 'shared'];
  activeTransition = signal<TransitionType>('slide');

  pages: Page[] = [
    { id: 'home', title: 'Home', icon: '🏠', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 'explore', title: 'Explore', icon: '🔍', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 'profile', title: 'Profile', icon: '👤', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 'settings', title: 'Settings', icon: '⚙️', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
  ];

  currentPage = signal('home');
  slideDirection = signal<'up' | 'down' | 'left' | 'right'>('left');

  useSpring = signal(true);
  springStiffness = signal(300);
  springDamping = signal(25);

  sharedCards = [
    { id: '1', icon: '🎨', title: 'Design', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: '2', icon: '💻', title: 'Code', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: '3', icon: '🚀', title: 'Deploy', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: '4', icon: '📊', title: 'Analytics', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
  ];

  sharedExpanded = signal(false);
  selectedCard = signal<typeof this.sharedCards[0] | null>(null);

  crossfadeView = signal<'a' | 'b'>('a');

  setTransition(type: TransitionType) {
    this.activeTransition.set(type);
  }

  setDirection(dir: 'up' | 'down' | 'left' | 'right') {
    this.slideDirection.set(dir);
  }

  getCurrentPageColor(): string {
    return this.pages.find(p => p.id === this.currentPage())?.color ?? '';
  }

  getCurrentPageIcon(): string {
    return this.pages.find(p => p.id === this.currentPage())?.icon ?? '';
  }

  getCurrentPageTitle(): string {
    return this.pages.find(p => p.id === this.currentPage())?.title ?? '';
  }

  navigateTo(pageId: string) {
    if (pageId === this.currentPage()) return;

    const content = this.pageContent()?.nativeElement;
    if (!content) return;

    const transition = this.activeTransition();
    const direction = this.slideDirection();

    // Exit animation
    const exitAnimation = this.getExitAnimation(transition, direction);
    const animOptions = this.useSpring()
      ? { type: spring, stiffness: this.springStiffness(), damping: this.springDamping() }
      : { duration: 0.3, ease: 'easeOut' as const };

    animate(content, exitAnimation, animOptions).then(() => {
      this.currentPage.set(pageId);

      // Enter animation
      setTimeout(() => {
        const enterAnimation = this.getEnterAnimation(transition, direction);
        animate(content, enterAnimation, animOptions);
      }, 50);
    });
  }

  private getExitAnimation(type: TransitionType, direction: string): Record<string, unknown> {
    switch (type) {
      case 'fade':
        return { opacity: 0 };
      case 'slide':
        const slideOut: Record<string, string> = {
          left: 'translateX(-100px)',
          right: 'translateX(100px)',
          up: 'translateY(-100px)',
          down: 'translateY(100px)'
        };
        return { transform: slideOut[direction], opacity: 0 };
      case 'scale':
        return { transform: 'scale(0.8)', opacity: 0 };
      case 'flip':
        return { transform: 'rotateY(-90deg)', opacity: 0 };
      case 'morph':
        return { transform: 'scale(1.1)', opacity: 0, filter: 'blur(10px)' };
      default:
        return { opacity: 0 };
    }
  }

  private getEnterAnimation(type: TransitionType, direction: string): Record<string, unknown> {
    switch (type) {
      case 'fade':
        return { opacity: 1 };
      case 'slide':
        const slideIn: Record<string, string[]> = {
          left: ['translateX(100px)', 'translateX(0)'],
          right: ['translateX(-100px)', 'translateX(0)'],
          up: ['translateY(100px)', 'translateY(0)'],
          down: ['translateY(-100px)', 'translateY(0)']
        };
        return { transform: slideIn[direction], opacity: [0, 1] };
      case 'scale':
        return { transform: ['scale(0.8)', 'scale(1)'], opacity: [0, 1] };
      case 'flip':
        return { transform: ['rotateY(90deg)', 'rotateY(0deg)'], opacity: [0, 1] };
      case 'morph':
        return { transform: ['scale(0.9)', 'scale(1)'], opacity: [0, 1], filter: ['blur(10px)', 'blur(0px)'] };
      default:
        return { opacity: 1 };
    }
  }

  playStaggerAnimation() {
    const demo = this.staggerDemo()?.nativeElement;
    if (!demo) return;

    const header = demo.querySelector('.stagger-header') as HTMLElement | null;
    const items = demo.querySelectorAll('.stagger-item') as NodeListOf<HTMLElement>;

    // Reset
    if (header) {
      header.style.opacity = '0';
      header.style.transform = 'translateX(-20px)';
    }
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
    });

    // Animate header
    setTimeout(() => {
      if (header) {
        animate(header, { opacity: 0.5, transform: 'translateX(0)' }, {
          type: spring,
          stiffness: 400,
          damping: 30
        });
      }

      // Animate items with stagger
      items.forEach((item, i) => {
        setTimeout(() => {
          animate(item, { opacity: 0.8, transform: 'translateX(0)' }, {
            type: spring,
            stiffness: 400,
            damping: 30
          });
        }, 100 + i * 100);
      });
    }, 100);
  }

  expandSharedCard(card: typeof this.sharedCards[0]) {
    this.selectedCard.set(card);
    this.sharedExpanded.set(true);

    setTimeout(() => {
      const expanded = this.expandedCard()?.nativeElement;
      if (expanded) {
        expanded.style.transform = 'scale(0.5)';
        expanded.style.opacity = '0';
        animate(expanded, {
          transform: 'scale(1)',
          opacity: 1
        }, {
          type: spring,
          stiffness: 300,
          damping: 25
        });

        // Animate content
        const content = expanded.querySelector('.expanded-content') as HTMLElement | null;
        if (content) {
          content.style.opacity = '0';
          content.style.transform = 'translateY(20px)';
          setTimeout(() => {
            animate(content, {
              opacity: 1,
              transform: 'translateY(0)'
            }, {
              duration: 0.3
            });
          }, 150);
        }
      }
    }, 10);
  }

  collapseSharedCard() {
    const expanded = this.expandedCard()?.nativeElement;
    if (expanded) {
      animate(expanded, {
        transform: 'scale(0.5)',
        opacity: 0
      }, {
        duration: 0.2
      }).then(() => {
        this.sharedExpanded.set(false);
        this.selectedCard.set(null);
      });
    }
  }

  toggleCrossfade() {
    const a = this.crossfadeA()?.nativeElement;
    const b = this.crossfadeB()?.nativeElement;
    if (!a || !b) return;

    const showA = this.crossfadeView() === 'b';
    this.crossfadeView.set(showA ? 'a' : 'b');

    animate(a, {
      opacity: showA ? 1 : 0,
      transform: showA ? 'scale(1)' : 'scale(0.9)'
    }, {
      duration: 0.3
    });

    animate(b, {
      opacity: showA ? 0 : 1,
      transform: showA ? 'scale(0.9)' : 'scale(1)'
    }, {
      duration: 0.3
    });
  }
}
