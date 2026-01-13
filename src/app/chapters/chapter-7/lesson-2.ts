import { Component, ChangeDetectionStrategy, viewChild, ElementRef, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring, stagger } from 'motion';

type IslandState = 'idle' | 'music' | 'timer' | 'call' | 'directions';

/**
 * @REVIEW Chapter 7 Lesson 2 - State Transitions
 * Content transitions within Dynamic Island with crossfades and morphing
 */
@Component({
  selector: 'app-chapter7-lesson2',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      title="State Transitions"
      description="Content transitions within Dynamic Island - crossfades, content morphing, and state-specific animations"
      chapter="7"
    >
      <div class="demos-grid">
        <!-- State Switcher -->
        <div class="demo-section full-width">
          <h3>Dynamic Island States</h3>
          <div class="island-stage">
            <div #mainIsland class="dynamic-island" [class]="'state-' + currentState()">
              <!-- Idle State -->
              @if (currentState() === 'idle') {
                <div #idleContent class="island-state idle-state">
                  <div class="notch-camera"></div>
                </div>
              }

              <!-- Music State -->
              @if (currentState() === 'music') {
                <div #musicContent class="island-state music-state">
                  <div class="music-artwork">
                    <div class="artwork-placeholder">🎵</div>
                  </div>
                  <div class="music-info">
                    <div class="music-waveform">
                      @for (bar of waveformBars; track $index) {
                        <div class="wave-bar" [style.height.%]="bar"></div>
                      }
                    </div>
                  </div>
                  <div class="music-controls">
                    <button class="control-btn">⏸</button>
                    <button class="control-btn">⏭</button>
                  </div>
                </div>
              }

              <!-- Timer State -->
              @if (currentState() === 'timer') {
                <div #timerContent class="island-state timer-state">
                  <div class="timer-icon">⏱</div>
                  <div class="timer-display">
                    <span class="timer-value">{{ timerValue() }}</span>
                  </div>
                  <div class="timer-progress">
                    <div #timerBar class="timer-bar"></div>
                  </div>
                </div>
              }

              <!-- Call State -->
              @if (currentState() === 'call') {
                <div #callContent class="island-state call-state">
                  <div class="call-avatar">
                    <div class="avatar-ring"></div>
                    <span>👤</span>
                  </div>
                  <div class="call-info">
                    <span class="call-name">Sarah Connor</span>
                    <span class="call-duration">{{ callDuration() }}</span>
                  </div>
                  <div class="call-actions">
                    <button class="end-call">📞</button>
                  </div>
                </div>
              }

              <!-- Directions State -->
              @if (currentState() === 'directions') {
                <div #directionsContent class="island-state directions-state">
                  <div class="direction-arrow">↗</div>
                  <div class="direction-info">
                    <span class="direction-distance">200m</span>
                    <span class="direction-street">Turn right on Main St</span>
                  </div>
                  <div class="direction-eta">3 min</div>
                </div>
              }
            </div>
          </div>

          <div class="state-buttons">
            <button
              (click)="switchState('idle')"
              [class.active]="currentState() === 'idle'"
            >
              Idle
            </button>
            <button
              (click)="switchState('music')"
              [class.active]="currentState() === 'music'"
            >
              Music
            </button>
            <button
              (click)="switchState('timer')"
              [class.active]="currentState() === 'timer'"
            >
              Timer
            </button>
            <button
              (click)="switchState('call')"
              [class.active]="currentState() === 'call'"
            >
              Call
            </button>
            <button
              (click)="switchState('directions')"
              [class.active]="currentState() === 'directions'"
            >
              Directions
            </button>
          </div>
        </div>

        <!-- Content Crossfade -->
        <div class="demo-section">
          <h3>Content Crossfade</h3>
          <div class="crossfade-container">
            <div #crossfadeIsland class="crossfade-island">
              <div #content1 class="crossfade-content content-1">
                <span>🔔</span>
                <span>3 Notifications</span>
              </div>
              <div #content2 class="crossfade-content content-2">
                <span>📧</span>
                <span>New Message</span>
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="toggleCrossfade()">Toggle Content</button>
          </div>
        </div>

        <!-- Progress Animation -->
        <div class="demo-section">
          <h3>Progress Animation</h3>
          <div class="progress-container">
            <div class="progress-island">
              <div class="progress-icon">⬇️</div>
              <div class="progress-info">
                <span class="progress-label">Downloading...</span>
                <div class="progress-bar-bg">
                  <div #progressBar class="progress-bar-fill"></div>
                </div>
              </div>
              <span class="progress-percent">{{ progressValue() }}%</span>
            </div>
          </div>
          <div class="controls">
            <button (click)="simulateProgress()">Start Download</button>
          </div>
        </div>

        <!-- Icon Morphing -->
        <div class="demo-section">
          <h3>Icon Morphing</h3>
          <div class="icon-morph-container">
            <div class="icon-island">
              <div #morphIcon class="morph-icon">
                {{ currentIcon() }}
              </div>
            </div>
          </div>
          <div class="controls">
            <button (click)="cycleIcon()">Morph Icon</button>
          </div>
        </div>
      </div>
    </app-lesson-layout>
  `,
  styles: [`
    .demos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .demo-section {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;

      &.full-width {
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

    .island-stage {
      display: flex;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%);
      border-radius: 12px;
      min-height: 120px;
    }

    .dynamic-island {
      background: #000;
      border-radius: 50px;
      display: flex;
      align-items: center;
      padding: 8px 12px;
      min-width: 120px;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.5),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dynamic-island.state-idle {
      width: 126px;
      height: 37px;
      padding: 0;
      justify-content: center;
    }

    .dynamic-island.state-music {
      width: 280px;
      height: 50px;
    }

    .dynamic-island.state-timer {
      width: 200px;
      height: 44px;
    }

    .dynamic-island.state-call {
      width: 260px;
      height: 50px;
    }

    .dynamic-island.state-directions {
      width: 300px;
      height: 50px;
    }

    .island-state {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 12px;
    }

    /* Idle State */
    .idle-state {
      justify-content: center;
    }

    .notch-camera {
      width: 12px;
      height: 12px;
      background: #1a1a2e;
      border-radius: 50%;
      box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
    }

    /* Music State */
    .music-artwork {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, var(--accent), #ff6b6b);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .music-info {
      flex: 1;
    }

    .music-waveform {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 24px;
    }

    .wave-bar {
      width: 3px;
      background: var(--accent);
      border-radius: 2px;
      animation: wave 0.5s ease-in-out infinite alternate;
    }

    @keyframes wave {
      from { opacity: 0.4; }
      to { opacity: 1; }
    }

    .music-controls {
      display: flex;
      gap: 8px;
    }

    .control-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1rem;
      cursor: pointer;
      padding: 4px;
    }

    /* Timer State */
    .timer-icon {
      font-size: 1.25rem;
    }

    .timer-display {
      flex: 1;
    }

    .timer-value {
      font-family: monospace;
      font-size: 1.5rem;
      color: #ff9f0a;
      font-weight: 600;
    }

    .timer-progress {
      width: 40px;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      overflow: hidden;
    }

    .timer-bar {
      height: 100%;
      background: #ff9f0a;
      width: 0%;
    }

    /* Call State */
    .call-avatar {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #34c759, #30d158);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .avatar-ring {
      position: absolute;
      inset: -4px;
      border: 2px solid rgba(52, 199, 89, 0.5);
      border-radius: 50%;
      animation: pulse-ring 1.5s ease-out infinite;
    }

    @keyframes pulse-ring {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.3); opacity: 0; }
    }

    .call-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .call-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
    }

    .call-duration {
      font-size: 0.75rem;
      color: #34c759;
    }

    .end-call {
      width: 32px;
      height: 32px;
      background: #ff3b30;
      border: none;
      border-radius: 50%;
      cursor: pointer;
    }

    /* Directions State */
    .direction-arrow {
      width: 36px;
      height: 36px;
      background: #007aff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: white;
    }

    .direction-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .direction-distance {
      font-size: 1rem;
      font-weight: 600;
      color: white;
    }

    .direction-street {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .direction-eta {
      font-size: 0.875rem;
      color: #34c759;
      font-weight: 500;
    }

    .state-buttons {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;

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

    /* Crossfade Demo */
    .crossfade-container {
      display: flex;
      justify-content: center;
      padding: 1.5rem;
      background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%);
      border-radius: 8px;
    }

    .crossfade-island {
      background: #000;
      border-radius: 50px;
      padding: 8px 16px;
      min-width: 180px;
      height: 40px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .crossfade-content {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
      font-size: 0.875rem;
      position: absolute;

      &.content-2 {
        opacity: 0;
      }
    }

    /* Progress Demo */
    .progress-container {
      display: flex;
      justify-content: center;
      padding: 1.5rem;
      background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%);
      border-radius: 8px;
    }

    .progress-island {
      background: #000;
      border-radius: 50px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 200px;
    }

    .progress-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .progress-label {
      font-size: 0.75rem;
      color: white;
    }

    .progress-bar-bg {
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      background: var(--accent);
      width: 0%;
      border-radius: 2px;
    }

    .progress-percent {
      font-size: 0.75rem;
      color: var(--accent);
      font-weight: 600;
      min-width: 36px;
      text-align: right;
    }

    /* Icon Morph Demo */
    .icon-morph-container {
      display: flex;
      justify-content: center;
      padding: 1.5rem;
      background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%);
      border-radius: 8px;
    }

    .icon-island {
      background: #000;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .morph-icon {
      font-size: 1.5rem;
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
export class Chapter7Lesson2 {
  // Element refs
  mainIsland = viewChild<ElementRef<HTMLElement>>('mainIsland');
  content1 = viewChild<ElementRef<HTMLElement>>('content1');
  content2 = viewChild<ElementRef<HTMLElement>>('content2');
  progressBar = viewChild<ElementRef<HTMLElement>>('progressBar');
  morphIcon = viewChild<ElementRef<HTMLElement>>('morphIcon');
  timerBar = viewChild<ElementRef<HTMLElement>>('timerBar');

  // State
  currentState = signal<IslandState>('idle');
  crossfadeState = signal(1);
  progressValue = signal(0);
  currentIcon = signal('🎵');
  timerValue = signal('00:45');
  callDuration = signal('02:34');

  waveformBars = [40, 70, 50, 80, 60, 90, 45, 75, 55, 85];
  icons = ['🎵', '📞', '⏱', '🔔', '📍', '✈️'];
  iconIndex = 0;

  private timerInterval?: ReturnType<typeof setInterval>;

  switchState(state: IslandState) {
    const island = this.mainIsland()?.nativeElement;
    if (!island) return;

    // Animate out current content
    const currentContent = island.querySelector('.island-state');
    if (currentContent) {
      animate(currentContent as HTMLElement, {
        opacity: 0,
        scale: 0.9
      }, {
        duration: 0.15
      });
    }

    // Change state after exit animation
    setTimeout(() => {
      this.currentState.set(state);

      // Animate in new content
      setTimeout(() => {
        const newContent = island.querySelector('.island-state');
        if (newContent) {
          animate(newContent as HTMLElement, {
            opacity: [0, 1],
            scale: [0.9, 1]
          }, {
            duration: 0.2,
            type: spring,
            stiffness: 400,
            damping: 30
          });
        }

        // Start timer animation if timer state
        if (state === 'timer') {
          this.startTimerAnimation();
        } else {
          this.stopTimerAnimation();
        }
      }, 50);
    }, 150);
  }

  startTimerAnimation() {
    const bar = this.timerBar()?.nativeElement;
    if (!bar) return;

    animate(
      (progress: number) => {
        bar.style.width = `${progress * 100}%`;
      },
      { duration: 45, ease: 'linear' }
    );
  }

  stopTimerAnimation() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  toggleCrossfade() {
    const c1 = this.content1()?.nativeElement;
    const c2 = this.content2()?.nativeElement;
    if (!c1 || !c2) return;

    const showFirst = this.crossfadeState() === 2;
    this.crossfadeState.set(showFirst ? 1 : 2);

    animate(c1, {
      opacity: showFirst ? 1 : 0,
      x: showFirst ? 0 : -20
    }, {
      duration: 0.3
    });

    animate(c2, {
      opacity: showFirst ? 0 : 1,
      x: showFirst ? 20 : 0
    }, {
      duration: 0.3
    });
  }

  simulateProgress() {
    const bar = this.progressBar()?.nativeElement;
    if (!bar) return;

    this.progressValue.set(0);
    bar.style.width = '0%';

    animate(
      (progress: number) => {
        bar.style.width = `${progress * 100}%`;
      },
      { duration: 3, ease: 'ease-out' }
    );

    // Simulate progress value updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      this.progressValue.set(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 60);
  }

  cycleIcon() {
    const icon = this.morphIcon()?.nativeElement;
    if (!icon) return;

    // Animate out
    animate(icon, {
      scale: 0,
      rotate: '180deg'
    }, {
      duration: 0.2
    }).then(() => {
      // Change icon
      this.iconIndex = (this.iconIndex + 1) % this.icons.length;
      this.currentIcon.set(this.icons[this.iconIndex]);

      // Animate in
      animate(icon, {
        scale: 1,
        rotate: '0deg'
      }, {
        type: spring,
        stiffness: 400,
        damping: 20
      });
    });
  }
}
