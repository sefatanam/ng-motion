import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, stagger, spring } from 'motion';

// @REVIEW - Enhanced Orchestrated Animations with comprehensive stagger patterns
@Component({
  selector: 'app-chapter4-lesson2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="4"
      title="Orchestrated Animations"
      description="Master multi-element choreography with advanced stagger patterns, timing control, and sequenced motion.">

      <!-- Theory Section: Stagger Deep Dive -->
      <section class="theory-section">
        <h2 class="theory-title">🎭 Orchestration Theory</h2>

        <div class="theory-card">
          <h3>The stagger() Function</h3>
          <p class="theory-desc">Stagger distributes animation start times across multiple elements, creating wave-like effects.</p>

          <div class="stagger-anatomy">
            <div class="anatomy-code">
              <code>stagger(duration, &#123; startDelay, from, ease &#125;)</code>
            </div>
            <div class="anatomy-grid">
              <div class="anatomy-item">
                <span class="anatomy-param">duration</span>
                <span class="anatomy-desc">Time between each element (seconds)</span>
                <span class="anatomy-example">0.1 = 100ms gap</span>
              </div>
              <div class="anatomy-item">
                <span class="anatomy-param">startDelay</span>
                <span class="anatomy-desc">Initial delay before stagger begins</span>
                <span class="anatomy-example">0.2 = wait 200ms first</span>
              </div>
              <div class="anatomy-item">
                <span class="anatomy-param">from</span>
                <span class="anatomy-desc">Origin point for stagger direction</span>
                <span class="anatomy-example">'first' | 'center' | 'last' | number</span>
              </div>
              <div class="anatomy-item">
                <span class="anatomy-param">ease</span>
                <span class="anatomy-desc">Distribution curve for delays</span>
                <span class="anatomy-example">'linear' | 'easeOut' | [bezier]</span>
              </div>
            </div>
          </div>
        </div>

        <!-- @REVIEW - Added: Animation Sequences Theory -->
        <div class="theory-card sequence-card">
          <h3>Animation Sequences: Timeline Choreography</h3>
          <p class="theory-desc">Use array-based sequences to orchestrate complex multi-element animations with precise timing control.</p>

          <div class="sequence-anatomy">
            <div class="anatomy-code">
              <code>animate([ [element, keyframes, options], ... ])</code>
            </div>
            <div class="sequence-timeline">
              <div class="timeline-row">
                <span class="timeline-label">Element 1</span>
                <div class="timeline-bar first"></div>
              </div>
              <div class="timeline-row">
                <span class="timeline-label">Element 2</span>
                <div class="timeline-bar second"></div>
                <span class="at-label">at: "-0.2"</span>
              </div>
              <div class="timeline-row">
                <span class="timeline-label">Element 3</span>
                <div class="timeline-bar third"></div>
                <span class="at-label">at: "-0.3"</span>
              </div>
            </div>
          </div>

          <div class="at-options">
            <h4>The <code>at</code> Parameter</h4>
            <div class="at-grid">
              <div class="at-item">
                <code>at: 0</code>
                <span>Start at beginning (default)</span>
              </div>
              <div class="at-item">
                <code>at: 0.5</code>
                <span>Start at absolute time (0.5s)</span>
              </div>
              <div class="at-item">
                <code>at: "-0.2"</code>
                <span>Overlap previous by 0.2s</span>
              </div>
              <div class="at-item">
                <code>at: "+0.1"</code>
                <span>Gap of 0.1s after previous</span>
              </div>
            </div>
          </div>
        </div>

        <div class="theory-card">
          <h3>Stagger Direction (from)</h3>
          <div class="from-visual">
            <div class="from-item">
              <div class="from-label">'first' (default)</div>
              <div class="from-demo">
                <span class="dot active">1</span>
                <span class="dot">2</span>
                <span class="dot">3</span>
                <span class="dot">4</span>
                <span class="dot">5</span>
              </div>
              <div class="from-arrow">→ → → → →</div>
            </div>
            <div class="from-item">
              <div class="from-label">'center'</div>
              <div class="from-demo">
                <span class="dot">1</span>
                <span class="dot">2</span>
                <span class="dot active">3</span>
                <span class="dot">4</span>
                <span class="dot">5</span>
              </div>
              <div class="from-arrow">← ← • → →</div>
            </div>
            <div class="from-item">
              <div class="from-label">'last'</div>
              <div class="from-demo">
                <span class="dot">1</span>
                <span class="dot">2</span>
                <span class="dot">3</span>
                <span class="dot">4</span>
                <span class="dot active">5</span>
              </div>
              <div class="from-arrow">← ← ← ← ←</div>
            </div>
            <div class="from-item">
              <div class="from-label">index (e.g., 2)</div>
              <div class="from-demo">
                <span class="dot">1</span>
                <span class="dot">2</span>
                <span class="dot active">3</span>
                <span class="dot">4</span>
                <span class="dot">5</span>
              </div>
              <div class="from-arrow">← ← • → →</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Demo 1: Stagger Direction -->
      <section class="demo-section">
        <h2 class="section-title">1. Stagger Direction (from)</h2>
        <p class="section-desc">Control where the stagger animation originates.</p>

        <div class="direction-demo">
          <div class="direction-row">
            <span class="direction-label">from: 'first'</span>
            <div class="direction-track" #staggerFirst>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="stagger-dot"></div>
              }
            </div>
          </div>
          <div class="direction-row">
            <span class="direction-label">from: 'center'</span>
            <div class="direction-track" #staggerCenter>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="stagger-dot"></div>
              }
            </div>
          </div>
          <div class="direction-row">
            <span class="direction-label">from: 'last'</span>
            <div class="direction-track" #staggerLast>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="stagger-dot"></div>
              }
            </div>
          </div>
          <div class="direction-row">
            <span class="direction-label">from: 2 (index)</span>
            <div class="direction-track" #staggerIndex>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="stagger-dot" [class.origin]="i === 3"></div>
              }
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playDirectionDemo()">Play All</button>
          <button class="btn btn-secondary" (click)="resetDirectionDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Radiate from center - great for grid reveals
animate(items, &#123; scale: 1, opacity: 1 &#125;, &#123;
  delay: stagger(0.05, &#123; from: 'center' &#125;)
&#125;)

// Reverse order - items animate from last to first
animate(items, &#123; y: 0 &#125;, &#123;
  delay: stagger(0.1, &#123; from: 'last' &#125;)
&#125;)

// From specific index - radiate from third element
animate(items, &#123; scale: 1 &#125;, &#123;
  delay: stagger(0.08, &#123; from: 2 &#125;)  // 0-indexed
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 2: Start Delay -->
      <section class="demo-section">
        <h2 class="section-title">2. Start Delay</h2>
        <p class="section-desc">Add initial delay before the stagger sequence begins.</p>

        <div class="delay-demo">
          <div class="delay-row">
            <span class="delay-label">No startDelay</span>
            <div class="delay-track" #delayNone>
              @for (i of [1,2,3,4,5]; track i) {
                <div class="delay-box"></div>
              }
            </div>
            <span class="delay-time">starts: 0ms</span>
          </div>
          <div class="delay-row">
            <span class="delay-label">startDelay: 0.3</span>
            <div class="delay-track" #delayShort>
              @for (i of [1,2,3,4,5]; track i) {
                <div class="delay-box"></div>
              }
            </div>
            <span class="delay-time">starts: 300ms</span>
          </div>
          <div class="delay-row">
            <span class="delay-label">startDelay: 0.6</span>
            <div class="delay-track" #delayLong>
              @for (i of [1,2,3,4,5]; track i) {
                <div class="delay-box"></div>
              }
            </div>
            <span class="delay-time">starts: 600ms</span>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playDelayDemo()">Play All</button>
          <button class="btn btn-secondary" (click)="resetDelayDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Wait for header animation to complete, then stagger items
animate(header, &#123; opacity: 1 &#125;, &#123; duration: 0.3 &#125;)

animate(items, &#123; opacity: 1, y: 0 &#125;, &#123;
  delay: stagger(0.1, &#123; startDelay: 0.3 &#125;)  // Wait 300ms first
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 3: Ease Distribution -->
      <section class="demo-section">
        <h2 class="section-title">3. Ease Distribution</h2>
        <p class="section-desc">Control how delays are distributed across elements.</p>

        <div class="ease-demo">
          <div class="ease-row">
            <span class="ease-label">ease: 'linear'</span>
            <div class="ease-track" #easeLinear>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="ease-box"></div>
              }
            </div>
            <span class="ease-desc">Equal spacing</span>
          </div>
          <div class="ease-row">
            <span class="ease-label">ease: 'easeOut'</span>
            <div class="ease-track" #easeOut>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="ease-box"></div>
              }
            </div>
            <span class="ease-desc">Fast start, slow end</span>
          </div>
          <div class="ease-row">
            <span class="ease-label">ease: 'easeIn'</span>
            <div class="ease-track" #easeIn>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="ease-box"></div>
              }
            </div>
            <span class="ease-desc">Slow start, fast end</span>
          </div>
          <div class="ease-row">
            <span class="ease-label">ease: [.68,-0.6,.32,1.6]</span>
            <div class="ease-track" #easeBezier>
              @for (i of [1,2,3,4,5,6,7,8]; track i) {
                <div class="ease-box"></div>
              }
            </div>
            <span class="ease-desc">Custom curve</span>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playEaseDemo()">Play All</button>
          <button class="btn btn-secondary" (click)="resetEaseDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// EaseOut: First items appear quickly, later ones slow down
animate(items, &#123; opacity: 1 &#125;, &#123;
  delay: stagger(0.15, &#123; ease: 'easeOut' &#125;)
&#125;)

// Custom bezier for unique timing feel
animate(items, &#123; scale: 1 &#125;, &#123;
  delay: stagger(0.1, &#123; ease: [0.68, -0.6, 0.32, 1.6] &#125;)
&#125;)</pre>
        </div>

        <div class="insight-box">
          <span class="insight-icon">💡</span>
          <span class="insight-text">Use 'easeOut' on stagger delays for a natural "cascade" effect where early elements appear quickly.</span>
        </div>
      </section>

      <!-- Demo 4: Grid Stagger -->
      <section class="demo-section">
        <h2 class="section-title">4. Grid Reveal Patterns</h2>
        <p class="section-desc">Different stagger origins create unique grid reveal effects.</p>

        <div class="grid-demo">
          <div class="grid-controls">
            <button
              class="grid-btn"
              [class.active]="gridFrom() === 'first'"
              (click)="setGridFrom('first')">
              Top-Left
            </button>
            <button
              class="grid-btn"
              [class.active]="gridFrom() === 'center'"
              (click)="setGridFrom('center')">
              Center
            </button>
            <button
              class="grid-btn"
              [class.active]="gridFrom() === 'last'"
              (click)="setGridFrom('last')">
              Bottom-Right
            </button>
          </div>

          <div class="grid-container" #gridContainer>
            @for (item of gridItems(); track item.id) {
              <div class="grid-item">
                <div class="grid-icon">{{ item.icon }}</div>
              </div>
            }
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playGridDemo()">Reveal Grid</button>
          <button class="btn btn-secondary" (click)="resetGridDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Grid reveal from center - creates ripple effect
animate('.grid-item', &#123; scale: [0, 1], opacity: [0, 1] &#125;, &#123;
  delay: stagger(0.03, &#123; from: 'center' &#125;),
  type: spring,
  stiffness: 400,
  damping: 25
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 5: Combined Options -->
      <section class="demo-section">
        <h2 class="section-title">5. Combined Stagger Options</h2>
        <p class="section-desc">Combine all options for sophisticated orchestration.</p>

        <div class="combined-demo">
          <div class="combined-preview" #combinedContainer>
            @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
              <div class="combined-bar"></div>
            }
          </div>

          <div class="combined-controls">
            <div class="control-group">
              <label>Duration: {{ staggerDuration() }}s</label>
              <input
                type="range"
                min="0.02"
                max="0.2"
                step="0.01"
                [value]="staggerDuration()"
                (input)="staggerDuration.set(+$any($event.target).value)">
            </div>
            <div class="control-group">
              <label>Start Delay: {{ staggerStartDelay() }}s</label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                [value]="staggerStartDelay()"
                (input)="staggerStartDelay.set(+$any($event.target).value)">
            </div>
            <div class="control-group">
              <label>From:</label>
              <select (change)="staggerFrom.set($any($event.target).value)">
                <option value="first">first</option>
                <option value="center">center</option>
                <option value="last">last</option>
              </select>
            </div>
            <div class="control-group">
              <label>Ease:</label>
              <select (change)="staggerEase.set($any($event.target).value)">
                <option value="linear">linear</option>
                <option value="easeOut">easeOut</option>
                <option value="easeIn">easeIn</option>
                <option value="easeInOut">easeInOut</option>
              </select>
            </div>
          </div>

          <div class="generated-code">
            <pre>{{ combinedCode() }}</pre>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playCombinedDemo()">Play</button>
          <button class="btn btn-secondary" (click)="resetCombinedDemo()">Reset</button>
        </div>
      </section>

      <!-- Demo 6: Hero Section -->
      <section class="demo-section">
        <h2 class="section-title">6. Hero Section Orchestration</h2>
        <p class="section-desc">A real-world hero section with layered, orchestrated entrance.</p>

        <div class="demo-area hero-demo">
          <div class="hero-content" #heroContainer>
            <div class="hero-badge">🚀 New Release</div>
            <h2 class="hero-headline">Build Amazing Products</h2>
            <p class="hero-subheadline">The modern way to create stunning web experiences with Motion.dev</p>
            <div class="hero-actions">
              <button class="hero-btn primary">Get Started</button>
              <button class="hero-btn secondary">Learn More</button>
            </div>
            <div class="hero-stats">
              <div class="stat"><span class="stat-num">50k+</span><span class="stat-label">Users</span></div>
              <div class="stat"><span class="stat-num">99%</span><span class="stat-label">Uptime</span></div>
              <div class="stat"><span class="stat-num">4.9</span><span class="stat-label">Rating</span></div>
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playHeroAnimation()">Animate Hero</button>
          <button class="btn btn-secondary" (click)="resetHeroAnimation()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Orchestrated hero entrance
animate([
  // Badge pops in first
  [badge, &#123; opacity: 1, scale: [0.8, 1] &#125;, &#123; duration: 0.3 &#125;],

  // Headline slides up with overlap
  [headline, &#123; opacity: 1, y: 0 &#125;, &#123; duration: 0.5, at: '-0.1' &#125;],

  // Subheadline follows
  [subheadline, &#123; opacity: 1, y: 0 &#125;, &#123; duration: 0.4, at: '-0.2' &#125;],

  // Buttons stagger in
  [buttons, &#123; opacity: 1, y: 0 &#125;, &#123; delay: stagger(0.1), at: '-0.1' &#125;],

  // Stats cascade from center
  [stats, &#123; opacity: 1, scale: 1 &#125;, &#123;
    delay: stagger(0.08, &#123; from: 'center' &#125;),
    at: '-0.1'
  &#125;]
])</pre>
        </div>
      </section>

      <!-- Demo 7: List Animation -->
      <section class="demo-section">
        <h2 class="section-title">7. Dynamic List Animation</h2>
        <p class="section-desc">Animate list items with different reveal patterns.</p>

        <div class="list-demo">
          <div class="list-container" #listContainer>
            @for (item of listItems(); track item.id) {
              <div class="list-item">
                <div class="item-avatar">{{ item.avatar }}</div>
                <div class="item-content">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-desc">{{ item.desc }}</div>
                </div>
                <div class="item-badge">{{ item.badge }}</div>
              </div>
            }
          </div>

          <div class="list-patterns">
            <button class="pattern-btn" (click)="playListPattern('slide')">
              <span class="pattern-icon">→</span>
              <span>Slide In</span>
            </button>
            <button class="pattern-btn" (click)="playListPattern('fade')">
              <span class="pattern-icon">◐</span>
              <span>Fade Scale</span>
            </button>
            <button class="pattern-btn" (click)="playListPattern('bounce')">
              <span class="pattern-icon">⚡</span>
              <span>Spring Bounce</span>
            </button>
            <button class="pattern-btn" (click)="playListPattern('cascade')">
              <span class="pattern-icon">↘</span>
              <span>Cascade</span>
            </button>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-secondary" (click)="resetListDemo()">Reset</button>
        </div>
      </section>

      <!-- Demo 8: Notification Stack -->
      <section class="demo-section">
        <h2 class="section-title">8. Notification Cascade</h2>
        <p class="section-desc">Notifications appear in sequence with spring physics, then auto-dismiss.</p>

        <div class="demo-area notification-area">
          <div class="notification-stack" #notificationStack>
            <!-- Notifications added dynamically -->
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playNotifications()">Show Notifications</button>
        </div>

        <div class="code-block">
          <pre>// Staggered notification entrance with spring
notifications.forEach((notif, i) => &#123;
  setTimeout(() => &#123;
    animate(notif.el, &#123; opacity: 1, x: 0 &#125;, &#123;
      type: spring,
      stiffness: 400,
      damping: 25
    &#125;)

    // Auto-dismiss after delay
    setTimeout(() => &#123;
      animate(notif.el, &#123; opacity: 0, x: 100 &#125;)
    &#125;, 2000)
  &#125;, i * 400)  // 400ms between each
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 9: Timeline Sequences - @REVIEW Added -->
      <section class="demo-section">
        <h2 class="section-title">9. Timeline Sequences (at parameter)</h2>
        <p class="section-desc">Create overlapping animations with precise timing using the <code>at</code> parameter.</p>

        <div class="timeline-demo">
          <div class="timeline-preview" #timelineContainer>
            <div class="timeline-card card-1">
              <div class="card-icon">📦</div>
              <span>Package</span>
            </div>
            <div class="timeline-card card-2">
              <div class="card-icon">🚚</div>
              <span>Shipping</span>
            </div>
            <div class="timeline-card card-3">
              <div class="card-icon">📍</div>
              <span>Delivery</span>
            </div>
            <div class="timeline-card card-4">
              <div class="card-icon">✅</div>
              <span>Complete</span>
            </div>
          </div>

          <div class="timing-controls">
            <div class="timing-row">
              <span class="timing-label">Overlap:</span>
              <div class="timing-options">
                <button class="timing-btn" [class.active]="timelineOverlap() === 0" (click)="timelineOverlap.set(0)">None</button>
                <button class="timing-btn" [class.active]="timelineOverlap() === 0.1" (click)="timelineOverlap.set(0.1)">Small (-0.1s)</button>
                <button class="timing-btn" [class.active]="timelineOverlap() === 0.3" (click)="timelineOverlap.set(0.3)">Large (-0.3s)</button>
              </div>
            </div>
          </div>

          <div class="generated-code">
            <pre>{{ timelineCode() }}</pre>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playTimelineDemo()">Play Sequence</button>
          <button class="btn btn-secondary" (click)="resetTimelineDemo()">Reset</button>
        </div>

        <div class="insight-box">
          <span class="insight-icon">⏱️</span>
          <span class="insight-text">Negative <code>at</code> values create overlapping animations, making sequences feel faster and more connected.</span>
        </div>
      </section>

      <!-- Demo 10: Dashboard Loading - @REVIEW Added -->
      <section class="demo-section">
        <h2 class="section-title">10. Complex UI Choreography</h2>
        <p class="section-desc">Real-world dashboard loading with multi-phase orchestration.</p>

        <div class="dashboard-demo">
          <div class="dashboard-preview" #dashboardContainer>
            <div class="dash-header">
              <div class="dash-logo">📊</div>
              <div class="dash-title">Analytics Dashboard</div>
              <div class="dash-actions">
                <span class="dash-action">🔔</span>
                <span class="dash-action">⚙️</span>
              </div>
            </div>
            <div class="dash-sidebar">
              <div class="sidebar-item">📈 Overview</div>
              <div class="sidebar-item">👥 Users</div>
              <div class="sidebar-item">💰 Revenue</div>
              <div class="sidebar-item">📦 Products</div>
            </div>
            <div class="dash-content">
              <div class="metric-card">
                <div class="metric-icon">👥</div>
                <div class="metric-value">2.5K</div>
                <div class="metric-label">Active Users</div>
              </div>
              <div class="metric-card">
                <div class="metric-icon">💵</div>
                <div class="metric-value">$48K</div>
                <div class="metric-label">Revenue</div>
              </div>
              <div class="metric-card">
                <div class="metric-icon">📈</div>
                <div class="metric-value">+24%</div>
                <div class="metric-label">Growth</div>
              </div>
              <div class="chart-area">
                <div class="chart-title">Weekly Performance</div>
                <div class="chart-bars">
                  @for (bar of chartBars(); track bar.day) {
                    <div class="chart-bar" [style.--height]="bar.height + '%'">
                      <span class="bar-label">{{ bar.day }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playDashboardAnimation()">Load Dashboard</button>
          <button class="btn btn-secondary" (click)="resetDashboardAnimation()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Multi-phase dashboard choreography
animate([
  // Phase 1: Header slides down
  [header, &#123; opacity: 1, y: 0 &#125;, &#123; duration: 0.4 &#125;],

  // Phase 2: Sidebar cascades in (overlapping header)
  [sidebarItems, &#123; opacity: 1, x: 0 &#125;, &#123;
    delay: stagger(0.08),
    at: '-0.2'
  &#125;],

  // Phase 3: Metric cards pop in from center
  [metricCards, &#123; opacity: 1, scale: 1 &#125;, &#123;
    delay: stagger(0.05, &#123; from: 'center' &#125;),
    type: spring,
    stiffness: 400,
    damping: 25,
    at: '-0.15'
  &#125;],

  // Phase 4: Chart bars animate up
  [chartBars, &#123; scaleY: 1 &#125;, &#123;
    delay: stagger(0.04),
    duration: 0.5,
    ease: 'backOut',
    at: '-0.1'
  &#125;]
])</pre>
        </div>
      </section>

      <!-- Demo 11: Page Transition - @REVIEW Added -->
      <section class="demo-section">
        <h2 class="section-title">11. Page Exit & Enter Choreography</h2>
        <p class="section-desc">Coordinate exit and enter animations for smooth page transitions.</p>

        <div class="page-transition-demo">
          <div class="page-container" #pageContainer>
            <div class="page page-old">
              <div class="page-header">Old Page</div>
              <div class="page-content">
                <div class="content-block"></div>
                <div class="content-block"></div>
                <div class="content-block"></div>
              </div>
            </div>
            <div class="page page-new">
              <div class="page-header">New Page</div>
              <div class="page-content">
                <div class="content-block accent"></div>
                <div class="content-block accent"></div>
                <div class="content-block accent"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="playPageTransition()">Transition</button>
          <button class="btn btn-secondary" (click)="resetPageTransition()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Exit old page elements (reverse order)
animate(oldContent, &#123; opacity: 0, y: 20 &#125;, &#123;
  delay: stagger(0.05, &#123; from: 'last' &#125;)
&#125;)

// Enter new page elements
await animate(newContent, &#123; opacity: 1, y: 0 &#125;, &#123;
  delay: stagger(0.08, &#123; from: 'first' &#125;),
  type: spring,
  stiffness: 300,
  damping: 25
&#125;)</pre>
        </div>

        <div class="insight-box">
          <span class="insight-icon">💡</span>
          <span class="insight-text">Use <code>from: 'last'</code> for exit animations to create a natural "folding away" effect, then <code>from: 'first'</code> for entrance.</span>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2 class="cheat-title">📋 Orchestration Cheat Sheet</h2>

        <div class="cheat-grid">
          <div class="cheat-card">
            <h4>🌊 Wave Effect</h4>
            <code>stagger(0.05, &#123; from: 'first' &#125;)</code>
            <p>Sequential left-to-right reveal</p>
          </div>
          <div class="cheat-card">
            <h4>💫 Ripple Effect</h4>
            <code>stagger(0.03, &#123; from: 'center' &#125;)</code>
            <p>Radiate outward from middle</p>
          </div>
          <div class="cheat-card">
            <h4>⏱️ Delayed Start</h4>
            <code>stagger(0.1, &#123; startDelay: 0.3 &#125;)</code>
            <p>Wait before starting sequence</p>
          </div>
          <div class="cheat-card">
            <h4>🎢 Natural Cascade</h4>
            <code>stagger(0.08, &#123; ease: 'easeOut' &#125;)</code>
            <p>Fast start, gradual finish</p>
          </div>
          <div class="cheat-card">
            <h4>↩️ Reverse Order</h4>
            <code>stagger(0.1, &#123; from: 'last' &#125;)</code>
            <p>Animate from end to start</p>
          </div>
          <div class="cheat-card">
            <h4>🎯 Full Control</h4>
            <code>stagger(0.05, &#123; from: 'center', ease: 'easeOut', startDelay: 0.2 &#125;)</code>
            <p>Combine all options</p>
          </div>
        </div>
      </section>
    </app-lesson-layout>
  `,
  styles: [`
    /* Theory Section */
    .theory-section {
      background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
      border: 1px solid var(--accent-primary);
      border-radius: var(--radius-xl);
      padding: 24px;
      margin-bottom: 24px;
    }

    .theory-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--accent-primary);
    }

    .theory-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      margin-bottom: 16px;
    }

    .theory-card:last-child {
      margin-bottom: 0;
    }

    .theory-card h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .theory-desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .stagger-anatomy {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
    }

    .anatomy-code {
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      padding: 12px;
      margin-bottom: 16px;
      text-align: center;
    }

    .anatomy-code code {
      font-family: 'SF Mono', monospace;
      font-size: 14px;
      color: var(--accent-primary);
    }

    .anatomy-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .anatomy-item {
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      padding: 12px;
    }

    .anatomy-param {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--accent-primary);
      margin-bottom: 4px;
    }

    .anatomy-desc {
      display: block;
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .anatomy-example {
      display: block;
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--text-tertiary);
    }

    /* From Visual */
    .from-visual {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .from-item {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 12px;
      text-align: center;
    }

    .from-label {
      font-size: 12px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .from-demo {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .dot {
      width: 28px;
      height: 28px;
      background: var(--bg-hover);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: var(--text-tertiary);
    }

    .dot.active {
      background: var(--accent-primary);
      color: white;
    }

    .from-arrow {
      font-size: 11px;
      color: var(--text-tertiary);
      letter-spacing: 2px;
    }

    /* Demo Sections */
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

    .controls {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .code-block {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 13px;
      overflow-x: auto;
      margin-top: 16px;
    }

    .code-block pre {
      margin: 0;
      color: var(--text-secondary);
    }

    .insight-box {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      margin-top: 16px;
    }

    .insight-icon {
      font-size: 20px;
    }

    .insight-text {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* Direction Demo */
    .direction-demo {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .direction-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .direction-label {
      width: 120px;
      font-size: 12px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
    }

    .direction-track {
      flex: 1;
      display: flex;
      gap: 8px;
      padding: 12px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
    }

    .stagger-dot {
      width: 32px;
      height: 32px;
      background: var(--accent-primary);
      border-radius: 50%;
      opacity: 0;
      transform: scale(0);
    }

    .stagger-dot.origin {
      border: 2px solid var(--accent-secondary);
    }

    /* Delay Demo */
    .delay-demo {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .delay-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .delay-label {
      width: 140px;
      font-size: 12px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
    }

    .delay-track {
      flex: 1;
      display: flex;
      gap: 8px;
      padding: 12px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
    }

    .delay-box {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border-radius: var(--radius-sm);
      opacity: 0;
      transform: translateY(20px);
    }

    .delay-time {
      width: 80px;
      font-size: 11px;
      color: var(--text-tertiary);
    }

    /* Ease Demo */
    .ease-demo {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .ease-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .ease-label {
      width: 180px;
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
    }

    .ease-track {
      flex: 1;
      display: flex;
      gap: 6px;
      padding: 12px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
    }

    .ease-box {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #8b5cf6, #6d28d9);
      border-radius: var(--radius-sm);
      opacity: 0;
      transform: scale(0.5);
    }

    .ease-desc {
      width: 120px;
      font-size: 11px;
      color: var(--text-tertiary);
    }

    /* Grid Demo */
    .grid-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .grid-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      justify-content: center;
    }

    .grid-btn {
      padding: 8px 16px;
      font-size: 12px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s;
    }

    .grid-btn.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 12px;
      max-width: 400px;
      margin: 0 auto;
    }

    .grid-item {
      aspect-ratio: 1;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0);
    }

    .grid-icon {
      font-size: 20px;
    }

    /* Combined Demo */
    .combined-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .combined-preview {
      display: flex;
      gap: 8px;
      height: 120px;
      align-items: flex-end;
      margin-bottom: 20px;
      padding: 0 20px;
    }

    .combined-bar {
      flex: 1;
      background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      height: 0;
    }

    .combined-controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .control-group label {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .control-group input[type="range"] {
      width: 100%;
      height: 6px;
      background: var(--bg-hover);
      border-radius: var(--radius-full);
      appearance: none;
      cursor: pointer;
    }

    .control-group input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      background: var(--accent-primary);
      border-radius: 50%;
      cursor: pointer;
    }

    .control-group select {
      padding: 8px 12px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: 12px;
      cursor: pointer;
    }

    .generated-code {
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      padding: 12px;
      font-family: 'SF Mono', monospace;
      font-size: 11px;
    }

    .generated-code pre {
      margin: 0;
      color: var(--accent-primary);
    }

    /* Hero Demo */
    .demo-area {
      min-height: 250px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    .hero-demo {
      min-height: 350px;
    }

    .hero-content {
      text-align: center;
      max-width: 500px;
    }

    .hero-badge {
      display: inline-block;
      padding: 6px 14px;
      background: var(--accent-glow);
      color: var(--accent-primary);
      font-size: 12px;
      font-weight: 500;
      border-radius: var(--radius-full);
      margin-bottom: 16px;
      opacity: 0;
      transform: scale(0.8);
    }

    .hero-headline {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      opacity: 0;
      transform: translateY(20px);
    }

    .hero-subheadline {
      font-size: 15px;
      color: var(--text-secondary);
      margin-bottom: 24px;
      line-height: 1.5;
      opacity: 0;
      transform: translateY(20px);
    }

    .hero-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-bottom: 24px;
    }

    .hero-btn {
      padding: 12px 24px;
      font-weight: 600;
      border-radius: var(--radius-lg);
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
    }

    .hero-btn.primary {
      background: var(--accent-primary);
      color: white;
    }

    .hero-btn.secondary {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
    }

    .hero-stats {
      display: flex;
      gap: 32px;
      justify-content: center;
    }

    .stat {
      text-align: center;
      opacity: 0;
      transform: scale(0.8);
    }

    .stat-num {
      display: block;
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-primary);
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    /* List Demo */
    .list-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .list-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }

    .list-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      opacity: 0;
      transform: translateX(-30px);
    }

    .item-avatar {
      width: 40px;
      height: 40px;
      background: var(--accent-glow);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .item-content {
      flex: 1;
    }

    .item-name {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 2px;
    }

    .item-desc {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .item-badge {
      padding: 4px 10px;
      background: var(--accent-glow);
      color: var(--accent-primary);
      font-size: 11px;
      font-weight: 500;
      border-radius: var(--radius-full);
    }

    .list-patterns {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .pattern-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .pattern-btn:hover {
      border-color: var(--accent-primary);
    }

    .pattern-icon {
      font-size: 14px;
    }

    /* Notification */
    .notification-area {
      min-height: 300px;
      align-items: flex-start;
      justify-content: flex-end;
    }

    .notification-stack {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 300px;
    }

    /* Cheat Sheet */
    .cheat-sheet {
      background: var(--bg-secondary);
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px;
    }

    .cheat-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .cheat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .cheat-card {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
    }

    .cheat-card h4 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .cheat-card code {
      display: block;
      font-size: 10px;
      font-family: 'SF Mono', monospace;
      color: var(--accent-primary);
      background: var(--bg-hover);
      padding: 8px;
      border-radius: var(--radius-sm);
      margin-bottom: 8px;
      word-break: break-all;
    }

    .cheat-card p {
      font-size: 11px;
      color: var(--text-tertiary);
      margin: 0;
    }

    /* @REVIEW - Added: Sequence Card */
    .sequence-card .sequence-anatomy {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 16px;
    }

    .sequence-timeline {
      margin-top: 16px;
    }

    .timeline-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .timeline-label {
      width: 80px;
      font-size: 11px;
      color: var(--text-secondary);
    }

    .timeline-bar {
      height: 24px;
      border-radius: var(--radius-sm);
      position: relative;
    }

    .timeline-bar.first {
      width: 120px;
      background: var(--accent-primary);
    }

    .timeline-bar.second {
      width: 100px;
      background: rgba(99, 102, 241, 0.7);
      margin-left: 100px;
    }

    .timeline-bar.third {
      width: 80px;
      background: rgba(99, 102, 241, 0.5);
      margin-left: 150px;
    }

    .at-label {
      font-size: 10px;
      font-family: 'SF Mono', monospace;
      color: var(--accent-primary);
    }

    .at-options {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
    }

    .at-options h4 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    .at-options h4 code {
      color: var(--accent-primary);
      background: var(--bg-hover);
      padding: 2px 6px;
      border-radius: var(--radius-xs);
    }

    .at-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .at-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .at-item code {
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--accent-primary);
      background: var(--bg-hover);
      padding: 4px 8px;
      border-radius: var(--radius-xs);
    }

    .at-item span {
      font-size: 11px;
      color: var(--text-tertiary);
    }

    /* @REVIEW - Added: Timeline Demo */
    .timeline-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .timeline-preview {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .timeline-card {
      width: 100px;
      padding: 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      text-align: center;
      opacity: 0;
      transform: translateY(30px);
    }

    .card-icon {
      font-size: 28px;
      margin-bottom: 8px;
    }

    .timeline-card span {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .timing-controls {
      margin-bottom: 16px;
    }

    .timing-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .timing-label {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .timing-options {
      display: flex;
      gap: 8px;
    }

    .timing-btn {
      padding: 8px 14px;
      font-size: 12px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s;
    }

    .timing-btn.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }

    /* @REVIEW - Added: Dashboard Demo */
    .dashboard-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .dashboard-preview {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      min-height: 350px;
    }

    .dash-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      background: var(--bg-hover);
      border-bottom: 1px solid var(--border-color);
      opacity: 0;
      transform: translateY(-20px);
    }

    .dash-logo {
      font-size: 20px;
    }

    .dash-title {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
    }

    .dash-actions {
      display: flex;
      gap: 12px;
    }

    .dash-action {
      font-size: 16px;
      cursor: pointer;
    }

    .dash-sidebar {
      position: absolute;
      left: 0;
      top: 50px;
      width: 140px;
      padding: 16px 12px;
      background: var(--bg-tertiary);
      border-right: 1px solid var(--border-color);
      height: calc(100% - 50px);
    }

    .dashboard-preview {
      position: relative;
    }

    .sidebar-item {
      padding: 10px 12px;
      font-size: 12px;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      margin-bottom: 4px;
      opacity: 0;
      transform: translateX(-20px);
    }

    .sidebar-item:first-child {
      background: var(--accent-glow);
      color: var(--accent-primary);
    }

    .dash-content {
      margin-left: 140px;
      padding: 16px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }

    .metric-card {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;
      text-align: center;
      opacity: 0;
      transform: scale(0.8);
    }

    .metric-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .metric-value {
      font-size: 22px;
      font-weight: 700;
      color: var(--accent-primary);
      margin-bottom: 4px;
    }

    .metric-label {
      font-size: 11px;
      color: var(--text-tertiary);
    }

    .chart-area {
      grid-column: 1 / -1;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;
    }

    .chart-title {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .chart-bars {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      height: 80px;
    }

    .chart-bar {
      flex: 1;
      background: linear-gradient(180deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      height: var(--height, 0%);
      transform-origin: bottom;
      transform: scaleY(0);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 4px;
    }

    .bar-label {
      font-size: 9px;
      color: white;
      transform: translateY(16px);
    }

    /* @REVIEW - Added: Page Transition Demo */
    .page-transition-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .page-container {
      display: flex;
      gap: 24px;
      justify-content: center;
    }

    .page {
      width: 200px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .page-header {
      padding: 12px 16px;
      background: var(--bg-hover);
      font-size: 13px;
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
    }

    .page-new .page-header {
      background: var(--accent-glow);
      color: var(--accent-primary);
    }

    .page-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .content-block {
      height: 32px;
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
    }

    .content-block.accent {
      background: var(--accent-glow);
    }

    .page-old .content-block,
    .page-old .page-header {
      opacity: 1;
    }

    .page-new .content-block,
    .page-new .page-header {
      opacity: 0;
      transform: translateY(20px);
    }
  `]
})
export class Chapter4Lesson2 {
  // View children
  readonly staggerFirst = viewChild<ElementRef<HTMLElement>>('staggerFirst');
  readonly staggerCenter = viewChild<ElementRef<HTMLElement>>('staggerCenter');
  readonly staggerLast = viewChild<ElementRef<HTMLElement>>('staggerLast');
  readonly staggerIndex = viewChild<ElementRef<HTMLElement>>('staggerIndex');
  readonly delayNone = viewChild<ElementRef<HTMLElement>>('delayNone');
  readonly delayShort = viewChild<ElementRef<HTMLElement>>('delayShort');
  readonly delayLong = viewChild<ElementRef<HTMLElement>>('delayLong');
  readonly easeLinear = viewChild<ElementRef<HTMLElement>>('easeLinear');
  readonly easeOut = viewChild<ElementRef<HTMLElement>>('easeOut');
  readonly easeIn = viewChild<ElementRef<HTMLElement>>('easeIn');
  readonly easeBezier = viewChild<ElementRef<HTMLElement>>('easeBezier');
  readonly gridContainer = viewChild<ElementRef<HTMLElement>>('gridContainer');
  readonly combinedContainer = viewChild<ElementRef<HTMLElement>>('combinedContainer');
  readonly heroContainer = viewChild<ElementRef<HTMLElement>>('heroContainer');
  readonly listContainer = viewChild<ElementRef<HTMLElement>>('listContainer');
  readonly notificationStack = viewChild<ElementRef<HTMLElement>>('notificationStack');

  // @REVIEW - Added: New demo view children
  readonly timelineContainer = viewChild<ElementRef<HTMLElement>>('timelineContainer');
  readonly dashboardContainer = viewChild<ElementRef<HTMLElement>>('dashboardContainer');
  readonly pageContainer = viewChild<ElementRef<HTMLElement>>('pageContainer');

  // State
  readonly gridFrom = signal<'first' | 'center' | 'last'>('center');
  readonly staggerDuration = signal(0.08);
  readonly staggerStartDelay = signal(0);
  readonly staggerFrom = signal<'first' | 'center' | 'last'>('first');
  readonly staggerEase = signal('linear');

  // @REVIEW - Added: Timeline demo state
  readonly timelineOverlap = signal(0.1);

  // @REVIEW - Added: Dashboard demo data
  readonly chartBars = signal([
    { day: 'M', height: 60 },
    { day: 'T', height: 80 },
    { day: 'W', height: 45 },
    { day: 'T', height: 90 },
    { day: 'F', height: 70 },
    { day: 'S', height: 55 },
    { day: 'S', height: 35 }
  ]);

  // Data
  readonly gridItems = signal([
    { id: 1, icon: '🎨' }, { id: 2, icon: '⚡' }, { id: 3, icon: '🔒' },
    { id: 4, icon: '📱' }, { id: 5, icon: '☁️' }, { id: 6, icon: '🔄' },
    { id: 7, icon: '📊' }, { id: 8, icon: '🤖' }, { id: 9, icon: '🎯' },
    { id: 10, icon: '💎' }, { id: 11, icon: '🚀' }, { id: 12, icon: '✨' }
  ]);

  readonly listItems = signal([
    { id: 1, avatar: '👤', name: 'Alex Johnson', desc: 'Product Designer', badge: 'Online' },
    { id: 2, avatar: '👩', name: 'Sarah Chen', desc: 'Frontend Developer', badge: 'Away' },
    { id: 3, avatar: '👨', name: 'Mike Wilson', desc: 'UX Researcher', badge: 'Online' },
    { id: 4, avatar: '👩‍💼', name: 'Emma Davis', desc: 'Project Manager', badge: 'Busy' }
  ]);

  readonly notifications = signal([
    { icon: '✅', text: 'File uploaded successfully', type: 'success' },
    { icon: '👤', text: 'New user signed up', type: 'info' },
    { icon: '💰', text: 'Payment received - $49.99', type: 'success' },
    { icon: '⚠️', text: 'Server load high', type: 'warning' }
  ]);

  // Computed code
  combinedCode(): string {
    return `stagger(${this.staggerDuration()}, {
  startDelay: ${this.staggerStartDelay()},
  from: '${this.staggerFrom()}',
  ease: '${this.staggerEase()}'
})`;
  }

  // Demo 1: Direction
  playDirectionDemo(): void {
    const first = this.staggerFirst()?.nativeElement;
    const center = this.staggerCenter()?.nativeElement;
    const last = this.staggerLast()?.nativeElement;
    const index = this.staggerIndex()?.nativeElement;

    if (first) {
      animate(first.querySelectorAll('.stagger-dot'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.08, { from: 'first' }), duration: 0.3 }
      );
    }
    if (center) {
      animate(center.querySelectorAll('.stagger-dot'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.08, { from: 'center' }), duration: 0.3 }
      );
    }
    if (last) {
      animate(last.querySelectorAll('.stagger-dot'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.08, { from: 'last' }), duration: 0.3 }
      );
    }
    if (index) {
      animate(index.querySelectorAll('.stagger-dot'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.08, { from: 2 }), duration: 0.3 }
      );
    }
  }

  resetDirectionDemo(): void {
    [this.staggerFirst(), this.staggerCenter(), this.staggerLast(), this.staggerIndex()].forEach(ref => {
      const el = ref?.nativeElement;
      if (el) animate(el.querySelectorAll('.stagger-dot'), { opacity: 0, scale: 0 } as any, { duration: 0.2 });
    });
  }

  // Demo 2: Delay
  playDelayDemo(): void {
    const none = this.delayNone()?.nativeElement;
    const short = this.delayShort()?.nativeElement;
    const long = this.delayLong()?.nativeElement;

    if (none) {
      animate(none.querySelectorAll('.delay-box'),
        { opacity: 1, y: 0 } as any,
        { delay: stagger(0.1), duration: 0.4 }
      );
    }
    if (short) {
      animate(short.querySelectorAll('.delay-box'),
        { opacity: 1, y: 0 } as any,
        { delay: stagger(0.1, { startDelay: 0.3 }), duration: 0.4 }
      );
    }
    if (long) {
      animate(long.querySelectorAll('.delay-box'),
        { opacity: 1, y: 0 } as any,
        { delay: stagger(0.1, { startDelay: 0.6 }), duration: 0.4 }
      );
    }
  }

  resetDelayDemo(): void {
    [this.delayNone(), this.delayShort(), this.delayLong()].forEach(ref => {
      const el = ref?.nativeElement;
      if (el) animate(el.querySelectorAll('.delay-box'), { opacity: 0, y: 20 } as any, { duration: 0.2 });
    });
  }

  // Demo 3: Ease
  playEaseDemo(): void {
    const linear = this.easeLinear()?.nativeElement;
    const out = this.easeOut()?.nativeElement;
    const inn = this.easeIn()?.nativeElement;
    const bezier = this.easeBezier()?.nativeElement;

    if (linear) {
      animate(linear.querySelectorAll('.ease-box'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.12, { ease: 'linear' }), duration: 0.3 }
      );
    }
    if (out) {
      animate(out.querySelectorAll('.ease-box'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.12, { ease: 'easeOut' }), duration: 0.3 }
      );
    }
    if (inn) {
      animate(inn.querySelectorAll('.ease-box'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.12, { ease: 'easeIn' }), duration: 0.3 }
      );
    }
    if (bezier) {
      animate(bezier.querySelectorAll('.ease-box'),
        { opacity: 1, scale: 1 } as any,
        { delay: stagger(0.12, { ease: [0.68, -0.6, 0.32, 1.6] }), duration: 0.3 }
      );
    }
  }

  resetEaseDemo(): void {
    [this.easeLinear(), this.easeOut(), this.easeIn(), this.easeBezier()].forEach(ref => {
      const el = ref?.nativeElement;
      if (el) animate(el.querySelectorAll('.ease-box'), { opacity: 0, scale: 0.5 } as any, { duration: 0.2 });
    });
  }

  // Demo 4: Grid
  setGridFrom(from: 'first' | 'center' | 'last'): void {
    this.gridFrom.set(from);
  }

  playGridDemo(): void {
    const grid = this.gridContainer()?.nativeElement;
    if (!grid) return;

    const items = grid.querySelectorAll('.grid-item');
    animate(items, { opacity: 1, scale: 1 } as any, {
      delay: stagger(0.03, { from: this.gridFrom() }),
      type: spring,
      stiffness: 400,
      damping: 25
    });
  }

  resetGridDemo(): void {
    const grid = this.gridContainer()?.nativeElement;
    if (grid) {
      animate(grid.querySelectorAll('.grid-item'), { opacity: 0, scale: 0 } as any, { duration: 0.2 });
    }
  }

  // Demo 5: Combined
  playCombinedDemo(): void {
    const container = this.combinedContainer()?.nativeElement;
    if (!container) return;

    const bars = container.querySelectorAll('.combined-bar');
    const heights = [60, 80, 45, 90, 70, 55, 85, 40, 75, 65];

    bars.forEach((bar, i) => {
      (bar as HTMLElement).style.height = '0px';
    });

    // Animate each bar to its target height with stagger
    bars.forEach((bar, i) => {
      const targetHeight = heights[i % heights.length];
      const delayTime = this.calculateStaggerDelay(i, bars.length);

      animate(bar, { height: `${targetHeight}px` } as any, {
        delay: delayTime,
        duration: 0.4,
        type: spring,
        stiffness: 300,
        damping: 20
      });
    });
  }

  private calculateStaggerDelay(index: number, total: number): number {
    const duration = this.staggerDuration();
    const startDelay = this.staggerStartDelay();
    const from = this.staggerFrom();

    let normalizedIndex: number;

    switch (from) {
      case 'center':
        const center = (total - 1) / 2;
        normalizedIndex = Math.abs(index - center);
        break;
      case 'last':
        normalizedIndex = total - 1 - index;
        break;
      default: // 'first'
        normalizedIndex = index;
    }

    return startDelay + (normalizedIndex * duration);
  }

  resetCombinedDemo(): void {
    const container = this.combinedContainer()?.nativeElement;
    if (container) {
      const bars = container.querySelectorAll('.combined-bar');
      bars.forEach(bar => {
        (bar as HTMLElement).style.height = '0px';
      });
    }
  }

  // Demo 6: Hero
  playHeroAnimation(): void {
    const container = this.heroContainer()?.nativeElement;
    if (!container) return;

    const badge = container.querySelector('.hero-badge');
    const headline = container.querySelector('.hero-headline');
    const subheadline = container.querySelector('.hero-subheadline');
    const buttons = container.querySelectorAll('.hero-btn');
    const stats = container.querySelectorAll('.stat');

    animate([
      [badge!, { opacity: 1, scale: 1 } as any, { duration: 0.3 }],
      [headline!, { opacity: 1, y: 0 } as any, { duration: 0.5, at: '-0.1' }],
      [subheadline!, { opacity: 1, y: 0 } as any, { duration: 0.4, at: '-0.2' }],
      [buttons, { opacity: 1, y: 0 } as any, { delay: stagger(0.1), duration: 0.4, at: '-0.1' }],
      [stats, { opacity: 1, scale: 1 } as any, { delay: stagger(0.08, { from: 'center' }), duration: 0.3, at: '-0.1' }]
    ]);
  }

  resetHeroAnimation(): void {
    const container = this.heroContainer()?.nativeElement;
    if (!container) return;

    const elements = container.querySelectorAll('.hero-badge, .hero-headline, .hero-subheadline, .hero-btn, .stat');
    elements.forEach(el => {
      if (el.classList.contains('hero-badge')) {
        animate(el, { opacity: 0, scale: 0.8 } as any, { duration: 0.2 });
      } else if (el.classList.contains('stat')) {
        animate(el, { opacity: 0, scale: 0.8 } as any, { duration: 0.2 });
      } else {
        animate(el, { opacity: 0, y: 20 } as any, { duration: 0.2 });
      }
    });
  }

  // Demo 7: List patterns
  playListPattern(pattern: 'slide' | 'fade' | 'bounce' | 'cascade'): void {
    const container = this.listContainer()?.nativeElement;
    if (!container) return;

    const items = container.querySelectorAll('.list-item');

    // Reset first
    animate(items, { opacity: 0, x: -30, scale: 0.9 } as any, { duration: 0.1 });

    setTimeout(() => {
      switch (pattern) {
        case 'slide':
          animate(items, { opacity: 1, x: 0, scale: 1 } as any, {
            delay: stagger(0.1),
            duration: 0.4,
            ease: 'easeOut'
          });
          break;
        case 'fade':
          animate(items, { opacity: 1, x: 0, scale: 1 } as any, {
            delay: stagger(0.08, { from: 'center' }),
            duration: 0.5
          });
          break;
        case 'bounce':
          animate(items, { opacity: 1, x: 0, scale: 1 } as any, {
            delay: stagger(0.1),
            type: spring,
            stiffness: 400,
            damping: 15
          });
          break;
        case 'cascade':
          animate(items, { opacity: 1, x: 0, scale: 1 } as any, {
            delay: stagger(0.15, { ease: 'easeOut' }),
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          });
          break;
      }
    }, 150);
  }

  resetListDemo(): void {
    const container = this.listContainer()?.nativeElement;
    if (container) {
      animate(container.querySelectorAll('.list-item'), { opacity: 0, x: -30 } as any, { duration: 0.2 });
    }
  }

  // Demo 8: Notifications
  playNotifications(): void {
    const stack = this.notificationStack()?.nativeElement;
    if (!stack) return;

    // Clear existing
    stack.innerHTML = '';

    this.notifications().forEach((notif, i) => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'notification';
        el.style.cssText = `
          background: var(--bg-hover);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateX(100px);
        `;
        el.innerHTML = `
          <span style="font-size: 18px;">${notif.icon}</span>
          <span style="flex: 1; font-size: 13px;">${notif.text}</span>
        `;
        stack.appendChild(el);

        animate(el, { opacity: 1, x: 0 } as any, {
          type: spring,
          stiffness: 400,
          damping: 25
        });

        // Auto dismiss
        setTimeout(() => {
          animate(el, { opacity: 0, x: 100 } as any, { duration: 0.3 })
            .then(() => el.remove());
        }, 2500 + i * 300);
      }, i * 500);
    });
  }

  // @REVIEW - Added: Demo 9 - Timeline Sequences
  timelineCode(): string {
    const overlap = this.timelineOverlap();
    const atValue = overlap === 0 ? '' : `, at: '-${overlap}'`;
    return `animate([
  [card1, { opacity: 1, y: 0 }, { duration: 0.4 }],
  [card2, { opacity: 1, y: 0 }, { duration: 0.4${atValue} }],
  [card3, { opacity: 1, y: 0 }, { duration: 0.4${atValue} }],
  [card4, { opacity: 1, y: 0 }, { duration: 0.4${atValue} }]
])`;
  }

  playTimelineDemo(): void {
    const container = this.timelineContainer()?.nativeElement;
    if (!container) return;

    const cards = container.querySelectorAll('.timeline-card');
    const overlap = this.timelineOverlap();
    const atValue = overlap === 0 ? 0 : `-${overlap}`;

    animate([
      [cards[0], { opacity: 1, y: 0 } as any, { duration: 0.4 }],
      [cards[1], { opacity: 1, y: 0 } as any, { duration: 0.4, at: atValue }],
      [cards[2], { opacity: 1, y: 0 } as any, { duration: 0.4, at: atValue }],
      [cards[3], { opacity: 1, y: 0 } as any, { duration: 0.4, at: atValue }]
    ]);
  }

  resetTimelineDemo(): void {
    const container = this.timelineContainer()?.nativeElement;
    if (container) {
      animate(container.querySelectorAll('.timeline-card'), { opacity: 0, y: 30 } as any, { duration: 0.2 });
    }
  }

  // @REVIEW - Added: Demo 10 - Dashboard Animation
  playDashboardAnimation(): void {
    const container = this.dashboardContainer()?.nativeElement;
    if (!container) return;

    const header = container.querySelector('.dash-header');
    const sidebarItems = container.querySelectorAll('.sidebar-item');
    const metricCards = container.querySelectorAll('.metric-card');
    const chartBars = container.querySelectorAll('.chart-bar');

    // Multi-phase choreography
    animate([
      // Phase 1: Header slides down
      [header!, { opacity: 1, y: 0 } as any, { duration: 0.4 }],

      // Phase 2: Sidebar cascades in (overlapping header)
      [sidebarItems, { opacity: 1, x: 0 } as any, {
        delay: stagger(0.08),
        duration: 0.4,
        at: '-0.2'
      }],

      // Phase 3: Metric cards pop in from center
      [metricCards, { opacity: 1, scale: 1 } as any, {
        delay: stagger(0.05, { from: 'center' }),
        type: spring,
        stiffness: 400,
        damping: 25,
        at: '-0.15'
      }],

      // Phase 4: Chart bars animate up
      [chartBars, { scaleY: 1 } as any, {
        delay: stagger(0.04),
        duration: 0.5,
        ease: 'backOut' as any,
        at: '-0.1'
      }]
    ]);
  }

  resetDashboardAnimation(): void {
    const container = this.dashboardContainer()?.nativeElement;
    if (!container) return;

    const header = container.querySelector('.dash-header');
    const sidebarItems = container.querySelectorAll('.sidebar-item');
    const metricCards = container.querySelectorAll('.metric-card');
    const chartBars = container.querySelectorAll('.chart-bar');

    if (header) animate(header, { opacity: 0, y: -20 } as any, { duration: 0.2 });
    animate(sidebarItems, { opacity: 0, x: -20 } as any, { duration: 0.2 });
    animate(metricCards, { opacity: 0, scale: 0.8 } as any, { duration: 0.2 });
    animate(chartBars, { scaleY: 0 } as any, { duration: 0.2 });
  }

  // @REVIEW - Added: Demo 11 - Page Transition
  playPageTransition(): void {
    const container = this.pageContainer()?.nativeElement;
    if (!container) return;

    const oldPage = container.querySelector('.page-old');
    const newPage = container.querySelector('.page-new');

    if (!oldPage || !newPage) return;

    const oldContent = oldPage.querySelectorAll('.content-block, .page-header');
    const newContent = newPage.querySelectorAll('.content-block, .page-header');

    // Exit old page elements (reverse order)
    animate(oldContent, { opacity: 0, y: 20 } as any, {
      delay: stagger(0.05, { from: 'last' }),
      duration: 0.3
    });

    // Enter new page elements with delay
    setTimeout(() => {
      animate(newContent, { opacity: 1, y: 0 } as any, {
        delay: stagger(0.08, { from: 'first' }),
        type: spring,
        stiffness: 300,
        damping: 25
      });
    }, 350);
  }

  resetPageTransition(): void {
    const container = this.pageContainer()?.nativeElement;
    if (!container) return;

    const oldContent = container.querySelectorAll('.page-old .content-block, .page-old .page-header');
    const newContent = container.querySelectorAll('.page-new .content-block, .page-new .page-header');

    animate(oldContent, { opacity: 1, y: 0 } as any, { duration: 0.2 });
    animate(newContent, { opacity: 0, y: 20 } as any, { duration: 0.2 });
  }
}
