import { Component, ChangeDetectionStrategy, viewChild, ElementRef, signal, afterNextRender } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

/**
 * @REVIEW Chapter 7 Lesson 1 - Morphing Container
 * Dynamic Island foundation: pill-shaped containers that morph between sizes
 */
@Component({
  selector: 'app-chapter7-lesson1',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      title="Morphing Container"
      description="Dynamic Island foundation - pill-shaped containers that smoothly morph between different sizes and states"
      chapter="7"
    >
      <div class="demos-grid">
        <!-- Basic Morph -->
        <div class="demo-section">
          <h3>Basic Morph</h3>
          <div class="island-container">
            <div #basicIsland class="island island-minimal">
              <div class="island-content">
                <div class="island-dot"></div>
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="toggleBasic()">
              {{ basicExpanded() ? 'Collapse' : 'Expand' }}
            </button>
          </div>
        </div>

        <!-- Width Morph -->
        <div class="demo-section">
          <h3>Width Expansion</h3>
          <div class="island-container">
            <div #widthIsland class="island island-pill">
              <div class="island-content-row">
                <div class="island-icon">🎵</div>
                <span #widthText class="island-text">Now Playing</span>
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="toggleWidth()">
              {{ widthExpanded() ? 'Collapse' : 'Expand' }}
            </button>
          </div>
        </div>

        <!-- Full Expansion -->
        <div class="demo-section">
          <h3>Full Expansion</h3>
          <div class="island-container">
            <div #fullIsland class="island island-compact">
              <div class="island-full-content">
                <div class="island-header">
                  <div class="island-icon">📞</div>
                  <span>Incoming Call</span>
                </div>
                <div #callDetails class="island-details">
                  <span class="caller-name">John Doe</span>
                  <span class="call-type">Mobile</span>
                </div>
                <div #callActions class="island-actions">
                  <button class="action-btn decline">✕</button>
                  <button class="action-btn accept">✓</button>
                </div>
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="toggleFull()">
              {{ fullExpanded() ? 'Collapse' : 'Expand' }}
            </button>
          </div>
        </div>

        <!-- Spring Physics -->
        <div class="demo-section">
          <h3>Spring Physics</h3>
          <div class="island-container">
            <div #springIsland class="island island-minimal">
              <div class="spring-content">
                <div class="spring-indicator"></div>
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="toggleSpring()">
              {{ springExpanded() ? 'Bounce Back' : 'Expand' }}
            </button>
          </div>
        </div>

        <!-- Multi-Stage Morph -->
        <div class="demo-section large">
          <h3>Multi-Stage Morph</h3>
          <div class="island-container">
            <div #multiIsland class="island island-minimal">
              <div #multiContent class="multi-content">
                <div class="stage-indicator">Stage {{ multiStage() }}</div>
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="cycleMultiStage()">Next Stage</button>
            <button (click)="resetMultiStage()">Reset</button>
          </div>
        </div>
      </div>
    </app-lesson-layout>
  `,
  styles: [`
    .demos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .demo-section {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;

      &.large {
        grid-column: 1 / -1;
      }

      h3 {
        margin: 0 0 1.5rem 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .island-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 150px;
      padding: 1rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #0a0a15 100%);
      border-radius: 8px;
    }

    .island {
      background: #000;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }

    .island-minimal {
      width: 120px;
      height: 36px;
    }

    .island-pill {
      width: 160px;
      height: 36px;
    }

    .island-compact {
      width: 200px;
      height: 44px;
    }

    .island-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .island-dot {
      width: 12px;
      height: 12px;
      background: var(--accent);
      border-radius: 50%;
    }

    .island-content-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0 1rem;
      white-space: nowrap;
    }

    .island-icon {
      font-size: 1rem;
    }

    .island-text {
      font-size: 0.75rem;
      color: white;
      opacity: 0;
    }

    .island-full-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem 1rem;
      gap: 0.5rem;
      width: 100%;
    }

    .island-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: white;
    }

    .island-details {
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0;
      height: 0;
      overflow: hidden;
    }

    .caller-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
    }

    .call-type {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .island-actions {
      display: flex;
      gap: 2rem;
      opacity: 0;
      height: 0;
      overflow: hidden;
    }

    .action-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }

      &.decline {
        background: #ff3b30;
        color: white;
      }

      &.accept {
        background: #34c759;
        color: white;
      }
    }

    .spring-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0 1rem;
    }

    .spring-indicator {
      width: 8px;
      height: 8px;
      background: #34c759;
      border-radius: 50%;
    }

    .multi-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
    }

    .stage-indicator {
      font-size: 0.75rem;
      color: white;
      white-space: nowrap;
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
export class Chapter7Lesson1 {
  // Element refs
  basicIsland = viewChild<ElementRef<HTMLElement>>('basicIsland');
  widthIsland = viewChild<ElementRef<HTMLElement>>('widthIsland');
  widthText = viewChild<ElementRef<HTMLElement>>('widthText');
  fullIsland = viewChild<ElementRef<HTMLElement>>('fullIsland');
  callDetails = viewChild<ElementRef<HTMLElement>>('callDetails');
  callActions = viewChild<ElementRef<HTMLElement>>('callActions');
  springIsland = viewChild<ElementRef<HTMLElement>>('springIsland');
  multiIsland = viewChild<ElementRef<HTMLElement>>('multiIsland');
  multiContent = viewChild<ElementRef<HTMLElement>>('multiContent');

  // State
  basicExpanded = signal(false);
  widthExpanded = signal(false);
  fullExpanded = signal(false);
  springExpanded = signal(false);
  multiStage = signal(1);

  toggleBasic() {
    const island = this.basicIsland()?.nativeElement;
    if (!island) return;

    const expanded = !this.basicExpanded();
    this.basicExpanded.set(expanded);

    animate(island, {
      width: expanded ? '200px' : '120px',
      height: expanded ? '60px' : '36px',
      borderRadius: expanded ? '30px' : '50px'
    }, {
      type: spring,
      stiffness: 400,
      damping: 30
    });
  }

  toggleWidth() {
    const island = this.widthIsland()?.nativeElement;
    const text = this.widthText()?.nativeElement;
    if (!island || !text) return;

    const expanded = !this.widthExpanded();
    this.widthExpanded.set(expanded);

    animate(island, {
      width: expanded ? '240px' : '160px'
    }, {
      type: spring,
      stiffness: 400,
      damping: 30
    });

    animate(text, {
      opacity: expanded ? 1 : 0
    }, {
      duration: expanded ? 0.3 : 0.1,
      delay: expanded ? 0.1 : 0
    });
  }

  toggleFull() {
    const island = this.fullIsland()?.nativeElement;
    const details = this.callDetails()?.nativeElement;
    const actions = this.callActions()?.nativeElement;
    if (!island || !details || !actions) return;

    const expanded = !this.fullExpanded();
    this.fullExpanded.set(expanded);

    // Morph container
    animate(island, {
      width: expanded ? '300px' : '200px',
      height: expanded ? '180px' : '44px',
      borderRadius: expanded ? '40px' : '50px'
    }, {
      type: spring,
      stiffness: 300,
      damping: 25
    });

    // Reveal details
    animate(details, {
      opacity: expanded ? 1 : 0,
      height: expanded ? 'auto' : '0px'
    }, {
      duration: 0.3,
      delay: expanded ? 0.15 : 0
    });

    // Reveal actions
    animate(actions, {
      opacity: expanded ? 1 : 0,
      height: expanded ? 'auto' : '0px'
    }, {
      duration: 0.3,
      delay: expanded ? 0.2 : 0
    });
  }

  toggleSpring() {
    const island = this.springIsland()?.nativeElement;
    if (!island) return;

    const expanded = !this.springExpanded();
    this.springExpanded.set(expanded);

    // More bouncy spring for playful effect
    animate(island, {
      width: expanded ? '280px' : '120px',
      height: expanded ? '50px' : '36px'
    }, {
      type: spring,
      stiffness: 200,
      damping: 15 // Lower damping = more bounce
    });
  }

  cycleMultiStage() {
    const island = this.multiIsland()?.nativeElement;
    if (!island) return;

    const stages = [
      { width: '120px', height: '36px', borderRadius: '50px' },
      { width: '200px', height: '36px', borderRadius: '50px' },
      { width: '280px', height: '50px', borderRadius: '30px' },
      { width: '320px', height: '80px', borderRadius: '40px' }
    ];

    const currentStage = this.multiStage();
    const nextStage = currentStage >= 4 ? 1 : currentStage + 1;
    this.multiStage.set(nextStage);

    const config = stages[nextStage - 1];

    animate(island, config, {
      type: spring,
      stiffness: 400,
      damping: 30
    });
  }

  resetMultiStage() {
    const island = this.multiIsland()?.nativeElement;
    if (!island) return;

    this.multiStage.set(1);

    animate(island, {
      width: '120px',
      height: '36px',
      borderRadius: '50px'
    }, {
      type: spring,
      stiffness: 400,
      damping: 30
    });
  }
}
