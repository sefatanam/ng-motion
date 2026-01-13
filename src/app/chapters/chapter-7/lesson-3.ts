import { Component, ChangeDetectionStrategy, viewChild, ElementRef, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

type ActivityType = 'music' | 'timer' | 'call' | 'maps';

interface Activity {
  type: ActivityType;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
}

/**
 * @REVIEW Chapter 7 Lesson 3 - Full Dynamic Island
 * Complete Dynamic Island recreation with all interactions
 */
@Component({
  selector: 'app-chapter7-lesson3',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      title="Full Dynamic Island"
      description="Complete iPhone Dynamic Island recreation with long-press expand, tap interactions, and live activities"
      chapter="7"
    >
      <div class="iphone-frame">
        <div class="iphone-screen">
          <!-- Dynamic Island -->
          <div
            #dynamicIsland
            class="dynamic-island"
            [class.expanded]="isExpanded()"
            [class.has-activity]="activities().length > 0"
            (click)="handleTap($event)"
            (mousedown)="handlePressStart()"
            (mouseup)="handlePressEnd()"
            (mouseleave)="handlePressEnd()"
          >
            <!-- Minimal State (No Activity) -->
            @if (activities().length === 0 && !isExpanded()) {
              <div class="island-idle">
                <div class="camera-dot"></div>
              </div>
            }

            <!-- Compact State (1-2 Activities) -->
            @if (activities().length > 0 && !isExpanded()) {
              <div class="island-compact">
                @if (activities().length === 1) {
                  <div class="compact-single">
                    <div class="activity-icon" [style.background]="activities()[0].color">
                      {{ activities()[0].icon }}
                    </div>
                    <div class="compact-content">
                      @if (activities()[0].type === 'music') {
                        <div class="music-bars">
                          @for (bar of [1,2,3,4]; track bar) {
                            <div class="bar" [style.animationDelay.ms]="bar * 100"></div>
                          }
                        </div>
                      }
                      @if (activities()[0].type === 'timer') {
                        <span class="timer-mini">{{ timerDisplay() }}</span>
                      }
                      @if (activities()[0].type === 'call') {
                        <div class="call-wave"></div>
                      }
                      @if (activities()[0].type === 'maps') {
                        <span class="eta-mini">{{ etaDisplay() }}</span>
                      }
                    </div>
                  </div>
                }

                @if (activities().length === 2) {
                  <div class="compact-split">
                    <div class="split-left">
                      <div class="activity-icon small" [style.background]="activities()[0].color">
                        {{ activities()[0].icon }}
                      </div>
                    </div>
                    <div class="camera-dot"></div>
                    <div class="split-right">
                      <div class="activity-icon small" [style.background]="activities()[1].color">
                        {{ activities()[1].icon }}
                      </div>
                    </div>
                  </div>
                }
              </div>
            }

            <!-- Expanded State -->
            @if (isExpanded() && expandedActivity()) {
              <div #expandedContent class="island-expanded">
                @switch (expandedActivity()!.type) {
                  @case ('music') {
                    <div class="expanded-music">
                      <div class="music-header">
                        <div class="album-art">🎵</div>
                        <div class="track-info">
                          <span class="track-name">Midnight City</span>
                          <span class="artist-name">M83</span>
                        </div>
                        <div class="airplay-icon">📡</div>
                      </div>
                      <div class="progress-container">
                        <div class="progress-track">
                          <div #musicProgress class="progress-fill"></div>
                        </div>
                        <div class="time-labels">
                          <span>1:23</span>
                          <span>-2:45</span>
                        </div>
                      </div>
                      <div class="playback-controls">
                        <button class="control-btn">⏮</button>
                        <button class="control-btn play">⏸</button>
                        <button class="control-btn">⏭</button>
                      </div>
                    </div>
                  }
                  @case ('timer') {
                    <div class="expanded-timer">
                      <div class="timer-ring">
                        <svg viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" class="ring-bg"/>
                          <circle #timerRing cx="50" cy="50" r="45" class="ring-progress"/>
                        </svg>
                        <span class="timer-large">{{ timerDisplay() }}</span>
                      </div>
                      <div class="timer-controls">
                        <button class="timer-btn cancel">Cancel</button>
                        <button class="timer-btn pause">Pause</button>
                      </div>
                    </div>
                  }
                  @case ('call') {
                    <div class="expanded-call">
                      <div class="caller-info">
                        <div class="caller-avatar">
                          <span>👤</span>
                          <div class="pulse-ring"></div>
                        </div>
                        <span class="caller-name">Mom</span>
                        <span class="call-status">calling...</span>
                      </div>
                      <div class="call-buttons">
                        <button class="call-btn reminder">
                          <span>⏰</span>
                          <span>Remind Me</span>
                        </button>
                        <button class="call-btn message">
                          <span>💬</span>
                          <span>Message</span>
                        </button>
                      </div>
                      <div class="call-actions">
                        <button class="action-btn decline">✕</button>
                        <button class="action-btn accept">✓</button>
                      </div>
                    </div>
                  }
                  @case ('maps') {
                    <div class="expanded-maps">
                      <div class="maps-header">
                        <div class="direction-icon">↗</div>
                        <div class="direction-details">
                          <span class="next-turn">Turn right onto</span>
                          <span class="street-name">Market Street</span>
                        </div>
                        <span class="distance">200m</span>
                      </div>
                      <div class="route-preview">
                        <div class="route-line"></div>
                        <div class="route-dot current"></div>
                        <div class="route-dot destination"></div>
                      </div>
                      <div class="maps-footer">
                        <span class="arrival">Arrival: {{ etaDisplay() }}</span>
                        <button class="end-route">End</button>
                      </div>
                    </div>
                  }
                }
              </div>
            }
          </div>

          <!-- Screen Content -->
          <div class="screen-content">
            <div class="time-display">{{ currentTime() }}</div>
            <div class="date-display">Thursday, January 15</div>

            <div class="activity-launcher">
              <h3>Launch Activity</h3>
              <div class="launcher-grid">
                <button
                  class="launcher-btn"
                  (click)="addActivity('music')"
                  [class.active]="hasActivity('music')"
                >
                  <span>🎵</span>
                  <span>Music</span>
                </button>
                <button
                  class="launcher-btn"
                  (click)="addActivity('timer')"
                  [class.active]="hasActivity('timer')"
                >
                  <span>⏱</span>
                  <span>Timer</span>
                </button>
                <button
                  class="launcher-btn"
                  (click)="addActivity('call')"
                  [class.active]="hasActivity('call')"
                >
                  <span>📞</span>
                  <span>Call</span>
                </button>
                <button
                  class="launcher-btn"
                  (click)="addActivity('maps')"
                  [class.active]="hasActivity('maps')"
                >
                  <span>🗺</span>
                  <span>Maps</span>
                </button>
              </div>
              <p class="hint">Tap island to focus activity • Long-press to expand</p>
            </div>
          </div>
        </div>
      </div>
    </app-lesson-layout>
  `,
  styles: [`
    .iphone-frame {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .iphone-screen {
      width: 390px;
      height: 700px;
      background: linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%);
      border-radius: 50px;
      position: relative;
      overflow: hidden;
      box-shadow:
        0 0 0 12px #1a1a1a,
        0 0 0 14px #333,
        0 20px 60px rgba(0, 0, 0, 0.5);
    }

    .dynamic-island {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: #000;
      border-radius: 50px;
      min-width: 126px;
      height: 37px;
      cursor: pointer;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .dynamic-island.has-activity {
      min-width: 160px;
    }

    .dynamic-island.expanded {
      width: 360px;
      height: auto;
      min-height: 160px;
      border-radius: 44px;
      padding: 16px;
    }

    /* Idle State */
    .island-idle {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .camera-dot {
      width: 12px;
      height: 12px;
      background: #1a1a2e;
      border-radius: 50%;
      box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
    }

    /* Compact States */
    .island-compact {
      width: 100%;
      padding: 0 12px;
    }

    .compact-single {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .compact-split {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .split-left, .split-right {
      display: flex;
      align-items: center;
    }

    .activity-icon {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;

      &.small {
        width: 24px;
        height: 24px;
        font-size: 0.75rem;
      }
    }

    .compact-content {
      display: flex;
      align-items: center;
    }

    .music-bars {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      height: 16px;
    }

    .bar {
      width: 3px;
      background: #fc3c44;
      border-radius: 2px;
      animation: bar-dance 0.5s ease-in-out infinite alternate;
    }

    .bar:nth-child(1) { height: 8px; }
    .bar:nth-child(2) { height: 14px; }
    .bar:nth-child(3) { height: 10px; }
    .bar:nth-child(4) { height: 16px; }

    @keyframes bar-dance {
      from { transform: scaleY(0.5); }
      to { transform: scaleY(1); }
    }

    .timer-mini {
      font-family: monospace;
      font-size: 1rem;
      color: #ff9f0a;
      font-weight: 600;
    }

    .call-wave {
      width: 24px;
      height: 16px;
      background: linear-gradient(90deg,
        transparent 0%,
        #34c759 25%,
        transparent 50%,
        #34c759 75%,
        transparent 100%
      );
      background-size: 200% 100%;
      animation: wave-move 1s linear infinite;
      border-radius: 4px;
    }

    @keyframes wave-move {
      from { background-position: 0% 0%; }
      to { background-position: 200% 0%; }
    }

    .eta-mini {
      font-size: 0.875rem;
      color: #34c759;
      font-weight: 500;
    }

    /* Expanded States */
    .island-expanded {
      width: 100%;
    }

    /* Expanded Music */
    .expanded-music {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .music-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .album-art {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #fc3c44, #ff6b6b);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .track-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .track-name {
      font-size: 1rem;
      font-weight: 600;
      color: white;
    }

    .artist-name {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .airplay-icon {
      font-size: 1.25rem;
    }

    .progress-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .progress-track {
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: white;
      width: 35%;
      border-radius: 2px;
    }

    .time-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .playback-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32px;
    }

    .control-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 8px;

      &.play {
        font-size: 2rem;
      }
    }

    /* Expanded Timer */
    .expanded-timer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .timer-ring {
      position: relative;
      width: 100px;
      height: 100px;
    }

    .timer-ring svg {
      transform: rotate(-90deg);
    }

    .ring-bg {
      fill: none;
      stroke: rgba(255, 159, 10, 0.2);
      stroke-width: 6;
    }

    .ring-progress {
      fill: none;
      stroke: #ff9f0a;
      stroke-width: 6;
      stroke-linecap: round;
      stroke-dasharray: 283;
      stroke-dashoffset: 70;
    }

    .timer-large {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: monospace;
      font-size: 1.5rem;
      font-weight: 600;
      color: #ff9f0a;
    }

    .timer-controls {
      display: flex;
      gap: 16px;
    }

    .timer-btn {
      padding: 8px 24px;
      border-radius: 20px;
      border: none;
      font-size: 0.875rem;
      cursor: pointer;

      &.cancel {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      &.pause {
        background: #ff9f0a;
        color: black;
      }
    }

    /* Expanded Call */
    .expanded-call {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .caller-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .caller-avatar {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #34c759, #30d158);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      position: relative;
    }

    .pulse-ring {
      position: absolute;
      inset: -6px;
      border: 2px solid rgba(52, 199, 89, 0.5);
      border-radius: 50%;
      animation: pulse 1.5s ease-out infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .caller-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
    }

    .call-status {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .call-buttons {
      display: flex;
      gap: 12px;
    }

    .call-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 0.75rem;
      cursor: pointer;
    }

    .call-actions {
      display: flex;
      gap: 48px;
    }

    .action-btn {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;

      &.decline {
        background: #ff3b30;
        color: white;
      }

      &.accept {
        background: #34c759;
        color: white;
      }
    }

    /* Expanded Maps */
    .expanded-maps {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .maps-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .direction-icon {
      width: 40px;
      height: 40px;
      background: #007aff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: white;
    }

    .direction-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .next-turn {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .street-name {
      font-size: 1rem;
      font-weight: 600;
      color: white;
    }

    .distance {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
    }

    .route-preview {
      height: 40px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }

    .route-line {
      position: absolute;
      top: 50%;
      left: 20px;
      right: 20px;
      height: 3px;
      background: linear-gradient(90deg, #007aff 30%, rgba(255, 255, 255, 0.2) 30%);
      border-radius: 2px;
    }

    .route-dot {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;

      &.current {
        left: 17px;
        background: #007aff;
        box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
      }

      &.destination {
        right: 17px;
        background: #ff3b30;
      }
    }

    .maps-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .arrival {
      font-size: 0.875rem;
      color: #34c759;
    }

    .end-route {
      padding: 6px 16px;
      background: rgba(255, 59, 48, 0.2);
      border: none;
      border-radius: 16px;
      color: #ff3b30;
      font-size: 0.875rem;
      cursor: pointer;
    }

    /* Screen Content */
    .screen-content {
      padding: 80px 24px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .time-display {
      font-size: 4rem;
      font-weight: 300;
      color: white;
      letter-spacing: -2px;
    }

    .date-display {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 3rem;
    }

    .activity-launcher {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 20px;
      width: 100%;

      h3 {
        margin: 0 0 16px 0;
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .launcher-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .launcher-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      cursor: pointer;
      transition: all 0.2s;

      span:first-child {
        font-size: 1.5rem;
      }

      span:last-child {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.6);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--accent);
      }

      &.active {
        background: var(--accent);
        border-color: var(--accent);

        span:last-child {
          color: white;
        }
      }
    }

    .hint {
      margin-top: 16px;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
    }
  `]
})
export class Chapter7Lesson3 implements OnDestroy {
  dynamicIsland = viewChild<ElementRef<HTMLElement>>('dynamicIsland');
  expandedContent = viewChild<ElementRef<HTMLElement>>('expandedContent');

  activities = signal<Activity[]>([]);
  isExpanded = signal(false);
  expandedActivity = signal<Activity | null>(null);
  currentTime = signal('9:41');
  timerDisplay = signal('00:45');
  etaDisplay = signal('3 min');

  private pressTimer?: ReturnType<typeof setTimeout>;
  private timeInterval?: ReturnType<typeof setInterval>;

  constructor() {
    // Update time every minute
    this.timeInterval = setInterval(() => {
      const now = new Date();
      this.currentTime.set(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      }));
    }, 60000);
  }

  ngOnDestroy() {
    if (this.pressTimer) clearTimeout(this.pressTimer);
    if (this.timeInterval) clearInterval(this.timeInterval);
  }

  hasActivity(type: ActivityType): boolean {
    return this.activities().some(a => a.type === type);
  }

  addActivity(type: ActivityType) {
    const configs: Record<ActivityType, Activity> = {
      music: { type: 'music', title: 'Now Playing', subtitle: 'Midnight City', icon: '🎵', color: '#fc3c44' },
      timer: { type: 'timer', title: 'Timer', subtitle: '00:45', icon: '⏱', color: '#ff9f0a' },
      call: { type: 'call', title: 'Incoming Call', subtitle: 'Mom', icon: '📞', color: '#34c759' },
      maps: { type: 'maps', title: 'Directions', subtitle: 'Market St', icon: '🗺', color: '#007aff' }
    };

    const current = this.activities();
    const exists = current.some(a => a.type === type);

    if (exists) {
      // Remove activity
      this.activities.set(current.filter(a => a.type !== type));
      if (this.expandedActivity()?.type === type) {
        this.collapseIsland();
      }
    } else if (current.length < 2) {
      // Add activity (max 2)
      this.activities.set([...current, configs[type]]);
      this.animateIslandChange();
    }
  }

  handleTap(event: MouseEvent) {
    event.stopPropagation();

    if (this.isExpanded()) {
      this.collapseIsland();
    } else if (this.activities().length === 1) {
      // Focus single activity (brief expand)
      this.briefExpand(this.activities()[0]);
    }
  }

  handlePressStart() {
    if (this.activities().length === 0) return;

    this.pressTimer = setTimeout(() => {
      const activity = this.activities()[0];
      this.expandIsland(activity);
    }, 500);
  }

  handlePressEnd() {
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
    }
  }

  private expandIsland(activity: Activity) {
    const island = this.dynamicIsland()?.nativeElement;
    if (!island) return;

    this.expandedActivity.set(activity);
    this.isExpanded.set(true);

    animate(island, {
      scale: [0.95, 1]
    }, {
      type: spring,
      stiffness: 400,
      damping: 30
    });

    // Animate content in
    setTimeout(() => {
      const content = this.expandedContent()?.nativeElement;
      if (content) {
        animate(content, {
          opacity: [0, 1],
          y: [10, 0]
        }, {
          duration: 0.2
        });
      }
    }, 100);
  }

  private collapseIsland() {
    const island = this.dynamicIsland()?.nativeElement;
    if (!island) return;

    const content = this.expandedContent()?.nativeElement;
    if (content) {
      animate(content, {
        opacity: 0,
        y: -10
      }, {
        duration: 0.15
      });
    }

    setTimeout(() => {
      this.isExpanded.set(false);
      this.expandedActivity.set(null);

      animate(island, {
        scale: [1.02, 1]
      }, {
        type: spring,
        stiffness: 400,
        damping: 30
      });
    }, 150);
  }

  private briefExpand(activity: Activity) {
    const island = this.dynamicIsland()?.nativeElement;
    if (!island) return;

    // Quick pulse animation using transform
    island.style.transition = 'transform 0.15s ease-out';
    island.style.transform = 'scale(1.05)';
    setTimeout(() => {
      island.style.transform = 'scale(1)';
    }, 150);
  }

  private animateIslandChange() {
    const island = this.dynamicIsland()?.nativeElement;
    if (!island) return;

    island.style.transform = 'scale(0.95)';
    animate(island, { transform: 'scale(1)' }, {
      type: spring,
      stiffness: 400,
      damping: 30
    });
  }
}
