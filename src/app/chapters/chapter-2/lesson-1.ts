import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, inView, stagger, spring } from 'motion';

@Component({
  selector: 'app-chapter2-lesson1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="2"
      title="InView Triggers"
      description="Trigger animations when elements enter the viewport. Perfect for reveal effects, lazy loading, and scroll-based storytelling.">

      <!-- Theory Section -->
      <section class="theory-section">
        <h2 class="theory-title">📚 Understanding inView()</h2>

        <div class="theory-content">
          <p>The <code>inView()</code> function detects when elements enter or leave the viewport (visible area of the browser).
          It uses the <strong>Intersection Observer API</strong> under the hood, making it highly performant.</p>

          <div class="anatomy-box">
            <h3>Function Anatomy</h3>
            <pre class="anatomy-code">inView(
  element,        // Element to observe
  (info) => &#123;     // Callback when element enters view
    // info.target - the element that triggered
    animate(...)

    return () => &#123; // Optional: cleanup when leaving view
      animate(...)
    &#125;
  &#125;,
  &#123;
    root: null,     // Viewport to observe (null = browser viewport)
    margin: "0px",  // Expand/shrink observation area
    amount: "some"  // How much must be visible: "some" | "all" | 0-1
  &#125;
)</pre>
          </div>

          <div class="key-concepts">
            <div class="concept">
              <span class="concept-icon">🎯</span>
              <div>
                <strong>amount: "some"</strong>
                <p>Triggers when any part is visible (default)</p>
              </div>
            </div>
            <div class="concept">
              <span class="concept-icon">📏</span>
              <div>
                <strong>amount: "all"</strong>
                <p>Triggers when 100% is visible</p>
              </div>
            </div>
            <div class="concept">
              <span class="concept-icon">⚖️</span>
              <div>
                <strong>amount: 0.5</strong>
                <p>Triggers when 50% is visible</p>
              </div>
            </div>
            <div class="concept">
              <span class="concept-icon">↩️</span>
              <div>
                <strong>Return function</strong>
                <p>Called when element leaves viewport</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Note about scroll behavior -->
      <div class="scroll-note">
        <span class="note-icon">💡</span>
        <p><strong>Scroll down this page</strong> to see the demos animate as they enter your viewport.
        Each demo triggers when it becomes visible in the browser window.</p>
      </div>

      <!-- Demo 1: Basic InView -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Viewport Trigger</h2>
        <p class="section-desc">The simplest inView animation - element fades and slides up when visible.</p>

        <div class="demo-area">
          <div class="inview-box" #inviewBox1>
            <span>👋 Hello!</span>
            <small>I animated when you scrolled here</small>
          </div>
        </div>

        <div class="code-block">
          <pre>const stop = inView(element, () => &#123;
  animate(element, &#123; opacity: 1, y: 0 &#125;, &#123; duration: 0.6 &#125;)

  return () => &#123;
    animate(element, &#123; opacity: 0, y: 50 &#125;, &#123; duration: 0.3 &#125;)
  &#125;
&#125;)

// Call stop() to disconnect the observer</pre>
        </div>
      </section>

      <!-- Demo 2: Staggered Cards -->
      <section class="demo-section">
        <h2 class="section-title">2. Staggered Reveal</h2>
        <p class="section-desc">Combine inView with stagger for sequential reveals.</p>

        <div class="demo-area">
          <div class="reveal-cards" #revealCards>
            @for (card of revealCardsData(); track card.id) {
              <div class="reveal-card">
                <div class="reveal-icon">{{ card.icon }}</div>
                <h3>{{ card.title }}</h3>
                <p>{{ card.desc }}</p>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>inView(container, () => &#123;
  animate(
    container.querySelectorAll('.card'),
    &#123; opacity: 1, y: 0, scale: 1 &#125;,
    &#123; delay: stagger(0.1), duration: 0.5 &#125;
  )
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 3: Amount Threshold -->
      <section class="demo-section">
        <h2 class="section-title">3. Visibility Threshold (amount)</h2>
        <p class="section-desc">Control how much of the element must be visible to trigger.</p>

        <div class="demo-area">
          <div class="threshold-grid">
            <div class="threshold-box" #thresholdSome>
              <div class="threshold-label">amount: "some"</div>
              <div class="threshold-progress" [style.width.%]="someProgress()"></div>
              <span class="threshold-status">{{ someVisible() ? '✓ In View' : 'Waiting...' }}</span>
            </div>

            <div class="threshold-box" #thresholdHalf>
              <div class="threshold-label">amount: 0.5</div>
              <div class="threshold-progress" [style.width.%]="halfProgress()"></div>
              <span class="threshold-status">{{ halfVisible() ? '✓ In View' : 'Waiting...' }}</span>
            </div>

            <div class="threshold-box" #thresholdAll>
              <div class="threshold-label">amount: "all"</div>
              <div class="threshold-progress" [style.width.%]="allProgress()"></div>
              <span class="threshold-status">{{ allVisible() ? '✓ In View' : 'Waiting...' }}</span>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Trigger when ANY part is visible (default)
inView(el, callback, &#123; amount: "some" &#125;)

// Trigger when 50% is visible
inView(el, callback, &#123; amount: 0.5 &#125;)

// Trigger when 100% is visible
inView(el, callback, &#123; amount: "all" &#125;)</pre>
        </div>
      </section>

      <!-- Demo 4: Enter & Leave -->
      <section class="demo-section">
        <h2 class="section-title">4. Enter & Leave Callbacks</h2>
        <p class="section-desc">Return a function to animate when leaving the viewport.</p>

        <div class="demo-area">
          <div class="enter-leave-demo" #enterLeaveBox>
            <div class="status-badge" [class.in-view]="isInView()">
              {{ isInView() ? '👁️ Visible' : '🙈 Hidden' }}
            </div>
            <div class="enter-leave-visual">
              <div class="eye-icon">{{ isInView() ? '👁️' : '💤' }}</div>
            </div>
            <p class="enter-count">Entered: {{ enterCount() }} times</p>
          </div>
        </div>

        <div class="code-block">
          <pre>inView(element, () => &#123;
  // Called when entering viewport
  animate(element, &#123; scale: 1, rotate: 0 &#125;)

  return () => &#123;
    // Called when leaving viewport
    animate(element, &#123; scale: 0.8, rotate: -10 &#125;)
  &#125;
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 5: Spring Reveal -->
      <section class="demo-section">
        <h2 class="section-title">5. Spring-Based Reveal</h2>
        <p class="section-desc">Use spring physics for organic, bouncy reveal animations.</p>

        <div class="demo-area">
          <div class="spring-reveal-container" #springReveal>
            <div class="spring-card spring-card-1">
              <span>🎾</span>
              <p>Bouncy</p>
            </div>
            <div class="spring-card spring-card-2">
              <span>🌊</span>
              <p>Smooth</p>
            </div>
            <div class="spring-card spring-card-3">
              <span>⚡</span>
              <p>Snappy</p>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>inView(container, () => &#123;
  animate(
    '.spring-card',
    &#123; opacity: 1, y: 0, scale: 1 &#125;,
    &#123;
      delay: stagger(0.15),
      type: spring,
      stiffness: 300,
      damping: 20
    &#125;
  )
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 6: Direction-Based Reveals -->
      <section class="demo-section">
        <h2 class="section-title">6. Direction-Based Reveals</h2>
        <p class="section-desc">Animate elements from different directions based on their position.</p>

        <div class="demo-area">
          <div class="direction-grid" #directionGrid>
            <div class="direction-item from-left">
              <span>←</span>
              <p>From Left</p>
            </div>
            <div class="direction-item from-top">
              <span>↑</span>
              <p>From Top</p>
            </div>
            <div class="direction-item from-right">
              <span>→</span>
              <p>From Right</p>
            </div>
            <div class="direction-item from-bottom">
              <span>↓</span>
              <p>From Bottom</p>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Each element starts from its direction
animate('.from-left', &#123; opacity: 1, x: 0 &#125;)   // Started at x: -50
animate('.from-right', &#123; opacity: 1, x: 0 &#125;)  // Started at x: 50
animate('.from-top', &#123; opacity: 1, y: 0 &#125;)    // Started at y: -50
animate('.from-bottom', &#123; opacity: 1, y: 0 &#125;) // Started at y: 50</pre>
        </div>
      </section>

      <!-- Demo 7: Real-World Feature Section -->
      <section class="demo-section">
        <h2 class="section-title">7. Real-World: Feature Sections</h2>
        <p class="section-desc">A practical example of alternating feature reveals like on marketing pages.</p>

        <div class="demo-area wide">
          @for (feature of features(); track feature.id) {
            <div class="feature-section"
                 #featureSection
                 [class.reversed]="feature.id % 2 === 0">
              <div class="feature-text">
                <span class="feature-badge">Feature {{ feature.id }}</span>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.desc }}</p>
              </div>
              <div class="feature-visual">
                <span>{{ feature.icon }}</span>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Demo 8: Custom Root (Container-Based) -->
      <section class="demo-section">
        <h2 class="section-title">8. Custom Root Container</h2>
        <p class="section-desc">Use the <code>root</code> option to observe within a scrollable container instead of the viewport.</p>

        <div class="demo-area">
          <div class="custom-root-container" #customRoot>
            <div class="scroll-hint-inner">↓ Scroll inside this box</div>
            <div class="spacer-inner"></div>
            <div class="container-item" #containerItem>
              <span>📦</span>
              <p>{{ containerItemVisible() ? 'Visible in container!' : 'Scroll to reveal' }}</p>
            </div>
            <div class="spacer-inner"></div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Observe within a specific container, not the window
inView(item, callback, &#123;
  root: containerElement  // Custom scroll container
&#125;)</pre>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2 class="cheat-title">📋 InView Cheat Sheet</h2>
        <div class="cheat-grid">
          <div class="cheat-item">
            <code>inView(el, cb)</code>
            <span>Basic observation</span>
          </div>
          <div class="cheat-item">
            <code>return () => &#123;...&#125;</code>
            <span>Leave callback</span>
          </div>
          <div class="cheat-item">
            <code>&#123; amount: "some" &#125;</code>
            <span>Any visibility (default)</span>
          </div>
          <div class="cheat-item">
            <code>&#123; amount: "all" &#125;</code>
            <span>Full visibility required</span>
          </div>
          <div class="cheat-item">
            <code>&#123; amount: 0.5 &#125;</code>
            <span>50% visibility</span>
          </div>
          <div class="cheat-item">
            <code>&#123; margin: "100px" &#125;</code>
            <span>Trigger 100px early</span>
          </div>
          <div class="cheat-item">
            <code>&#123; root: element &#125;</code>
            <span>Custom scroll container</span>
          </div>
          <div class="cheat-item">
            <code>const stop = inView(...)</code>
            <span>Returns cleanup function</span>
          </div>
        </div>
      </section>
    </app-lesson-layout>
  `,
  styles: [`
    /* Theory Section */
    .theory-section {
      background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      margin-bottom: 32px;
    }

    .theory-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .theory-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .theory-content > p {
      font-size: 15px;
      line-height: 1.7;
      color: var(--text-secondary);
    }

    .theory-content code {
      background: var(--accent-glow);
      color: var(--accent-primary);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-family: 'SF Mono', monospace;
      font-size: 14px;
    }

    .anatomy-box {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
      border: 1px solid var(--border-color);
    }

    .anatomy-box h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--text-secondary);
    }

    .anatomy-code {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: var(--text-primary);
      margin: 0;
      white-space: pre-wrap;
    }

    .key-concepts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .concept {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .concept-icon {
      font-size: 24px;
    }

    .concept strong {
      display: block;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .concept p {
      font-size: 12px;
      color: var(--text-tertiary);
      margin: 0;
    }

    /* Scroll Note */
    .scroll-note {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      background: var(--accent-glow);
      border: 1px solid var(--accent-primary);
      border-radius: var(--radius-lg);
      margin-bottom: 32px;
    }

    .note-icon {
      font-size: 24px;
    }

    .scroll-note p {
      margin: 0;
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Demo Sections */
    .demo-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px;
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .section-desc {
      color: var(--text-secondary);
      margin-bottom: 24px;
      font-size: 14px;
    }

    .demo-area {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 40px 24px;
      margin-bottom: 20px;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .demo-area.wide {
      flex-direction: column;
      gap: 24px;
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

    /* Demo 1: Basic InView Box */
    .inview-box {
      width: 280px;
      padding: 32px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: white;
      opacity: 0;
      transform: translateY(50px);
    }

    .inview-box span {
      font-size: 24px;
      font-weight: 700;
    }

    .inview-box small {
      font-size: 12px;
      opacity: 0.8;
    }

    /* Demo 2: Reveal Cards */
    .reveal-cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .reveal-card {
      width: 140px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px 16px;
      text-align: center;
      opacity: 0;
      transform: translateY(40px) scale(0.9);
    }

    .reveal-icon {
      font-size: 36px;
      margin-bottom: 12px;
    }

    .reveal-card h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .reveal-card p {
      font-size: 12px;
      color: var(--text-tertiary);
      margin: 0;
    }

    /* Demo 3: Threshold Grid */
    .threshold-grid {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .threshold-box {
      width: 180px;
      padding: 20px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .threshold-label {
      font-family: 'SF Mono', monospace;
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .threshold-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background: var(--accent-primary);
      transition: width 0.3s ease;
    }

    .threshold-status {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }

    /* Demo 4: Enter/Leave */
    .enter-leave-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 32px;
      background: var(--bg-hover);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-xl);
      transform: scale(0.85) rotate(-5deg);
      opacity: 0.5;
      transition: border-color 0.3s;
    }

    .enter-leave-demo.visible {
      border-color: var(--success);
    }

    .status-badge {
      padding: 6px 16px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-full);
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s;
    }

    .status-badge.in-view {
      background: var(--success);
      color: white;
    }

    .enter-leave-visual {
      width: 80px;
      height: 80px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .eye-icon {
      font-size: 40px;
    }

    .enter-count {
      font-size: 12px;
      color: var(--text-tertiary);
      margin: 0;
    }

    /* Demo 5: Spring Reveal */
    .spring-reveal-container {
      display: flex;
      gap: 24px;
    }

    .spring-card {
      width: 120px;
      height: 140px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      opacity: 0;
      transform: translateY(60px) scale(0.8);
    }

    .spring-card span {
      font-size: 40px;
    }

    .spring-card p {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-secondary);
    }

    /* Demo 6: Direction Grid */
    .direction-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .direction-item {
      width: 120px;
      height: 100px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      opacity: 0;
    }

    .direction-item span {
      font-size: 24px;
    }

    .direction-item p {
      margin: 0;
      font-size: 12px;
      color: var(--text-secondary);
    }

    .direction-item.from-left {
      transform: translateX(-50px);
    }

    .direction-item.from-right {
      transform: translateX(50px);
    }

    .direction-item.from-top {
      transform: translateY(-50px);
    }

    .direction-item.from-bottom {
      transform: translateY(50px);
    }

    /* Demo 7: Feature Sections */
    .feature-section {
      display: flex;
      align-items: center;
      gap: 32px;
      padding: 24px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      width: 100%;
      opacity: 0;
      transform: translateX(-60px);
    }

    .feature-section.reversed {
      flex-direction: row-reverse;
      transform: translateX(60px);
    }

    .feature-text {
      flex: 1;
    }

    .feature-badge {
      display: inline-block;
      padding: 4px 12px;
      background: var(--accent-glow);
      color: var(--accent-primary);
      font-size: 11px;
      font-weight: 600;
      border-radius: var(--radius-full);
      margin-bottom: 12px;
    }

    .feature-text h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .feature-text p {
      margin: 0;
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .feature-visual {
      width: 100px;
      height: 100px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .feature-visual span {
      font-size: 48px;
    }

    /* Demo 8: Custom Root Container */
    .custom-root-container {
      width: 100%;
      max-width: 400px;
      height: 250px;
      overflow-y: auto;
      background: var(--bg-hover);
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-lg);
      position: relative;
    }

    .scroll-hint-inner {
      text-align: center;
      padding: 20px;
      color: var(--text-tertiary);
      font-size: 14px;
    }

    .spacer-inner {
      height: 200px;
    }

    .container-item {
      margin: 20px;
      padding: 24px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      text-align: center;
      opacity: 0;
      transform: scale(0.8);
    }

    .container-item span {
      font-size: 36px;
      display: block;
      margin-bottom: 8px;
    }

    .container-item p {
      margin: 0;
      font-size: 14px;
      color: var(--text-secondary);
    }

    /* Cheat Sheet */
    .cheat-sheet {
      background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
    }

    .cheat-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .cheat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 12px;
    }

    .cheat-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .cheat-item code {
      font-family: 'SF Mono', monospace;
      font-size: 13px;
      color: var(--accent-primary);
    }

    .cheat-item span {
      font-size: 12px;
      color: var(--text-tertiary);
    }
  `]
})
export class Chapter2Lesson1 implements OnDestroy {
  // Element refs for viewport-based animations
  readonly inviewBox1 = viewChild<ElementRef<HTMLElement>>('inviewBox1');
  readonly revealCards = viewChild<ElementRef<HTMLElement>>('revealCards');
  readonly enterLeaveBox = viewChild<ElementRef<HTMLElement>>('enterLeaveBox');
  readonly thresholdSome = viewChild<ElementRef<HTMLElement>>('thresholdSome');
  readonly thresholdHalf = viewChild<ElementRef<HTMLElement>>('thresholdHalf');
  readonly thresholdAll = viewChild<ElementRef<HTMLElement>>('thresholdAll');
  readonly springReveal = viewChild<ElementRef<HTMLElement>>('springReveal');
  readonly directionGrid = viewChild<ElementRef<HTMLElement>>('directionGrid');
  readonly customRoot = viewChild<ElementRef<HTMLElement>>('customRoot');
  readonly containerItem = viewChild<ElementRef<HTMLElement>>('containerItem');

  // Feature section refs - using viewChildren pattern manually
  private featureSections: HTMLElement[] = [];

  // State signals
  readonly isInView = signal(false);
  readonly enterCount = signal(0);
  readonly someVisible = signal(false);
  readonly halfVisible = signal(false);
  readonly allVisible = signal(false);
  readonly someProgress = signal(0);
  readonly halfProgress = signal(0);
  readonly allProgress = signal(0);
  readonly containerItemVisible = signal(false);

  readonly revealCardsData = signal([
    { id: 1, icon: '🎯', title: 'Precise', desc: 'Pixel perfect animations' },
    { id: 2, icon: '⚡', title: 'Fast', desc: 'Hardware accelerated' },
    { id: 3, icon: '🎨', title: 'Beautiful', desc: 'Stunning transitions' },
    { id: 4, icon: '📦', title: 'Tiny', desc: 'Only 3.5kb gzipped' }
  ]);

  readonly features = signal([
    { id: 1, icon: '🚀', title: 'Lightning Fast', desc: 'Motion.dev leverages hardware acceleration and optimized rendering for buttery smooth 60fps animations.' },
    { id: 2, icon: '📦', title: 'Tiny Bundle Size', desc: 'Only 3.5kb for the core animate function. Fully tree-shakeable so you only ship what you use.' },
    { id: 3, icon: '🎛️', title: 'Complete Control', desc: 'Full control over playback with play, pause, reverse, and dynamic timeline manipulation.' }
  ]);

  private cleanupFns: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.setupViewportObservers();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  private setupViewportObservers(): void {
    // Demo 1: Basic InView - triggers on main viewport scroll
    const box1 = this.inviewBox1()?.nativeElement;
    if (box1) {
      const stop = inView(box1, () => {
        animate(box1, { opacity: 1, y: 0 } as any, { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] });
        return () => {
          animate(box1, { opacity: 0, y: 50 } as any, { duration: 0.3 });
        };
      }, { amount: 0.3 });
      this.cleanupFns.push(stop);
    }

    // Demo 2: Staggered Cards
    const cardsContainer = this.revealCards()?.nativeElement;
    if (cardsContainer) {
      const stop = inView(cardsContainer, () => {
        animate(
          cardsContainer.querySelectorAll('.reveal-card'),
          { opacity: 1, y: 0, scale: 1 } as any,
          { delay: stagger(0.1), duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        );
        return () => {
          animate(
            cardsContainer.querySelectorAll('.reveal-card'),
            { opacity: 0, y: 40, scale: 0.9 } as any,
            { duration: 0.3 }
          );
        };
      }, { amount: 0.2 });
      this.cleanupFns.push(stop);
    }

    // Demo 3: Threshold indicators
    this.setupThresholdDemo(this.thresholdSome()?.nativeElement, 'some', this.someVisible, this.someProgress);
    this.setupThresholdDemo(this.thresholdHalf()?.nativeElement, 0.5, this.halfVisible, this.halfProgress);
    this.setupThresholdDemo(this.thresholdAll()?.nativeElement, 'all', this.allVisible, this.allProgress);

    // Demo 4: Enter/Leave with counter
    const enterLeaveEl = this.enterLeaveBox()?.nativeElement;
    if (enterLeaveEl) {
      const stop = inView(enterLeaveEl, () => {
        this.isInView.set(true);
        this.enterCount.update(c => c + 1);
        animate(enterLeaveEl, { scale: 1, rotate: 0, opacity: 1 } as any, {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        });
        return () => {
          this.isInView.set(false);
          animate(enterLeaveEl, { scale: 0.85, rotate: -5, opacity: 0.5 } as any, { duration: 0.3 });
        };
      }, { amount: 0.5 });
      this.cleanupFns.push(stop);
    }

    // Demo 5: Spring Reveal
    const springContainer = this.springReveal()?.nativeElement;
    if (springContainer) {
      const stop = inView(springContainer, () => {
        animate(
          springContainer.querySelectorAll('.spring-card'),
          { opacity: 1, y: 0, scale: 1 } as any,
          {
            delay: stagger(0.15),
            type: spring,
            stiffness: 300,
            damping: 20
          }
        );
        return () => {
          animate(
            springContainer.querySelectorAll('.spring-card'),
            { opacity: 0, y: 60, scale: 0.8 } as any,
            { duration: 0.3 }
          );
        };
      }, { amount: 0.3 });
      this.cleanupFns.push(stop);
    }

    // Demo 6: Direction-Based Reveals
    const dirGrid = this.directionGrid()?.nativeElement;
    if (dirGrid) {
      const stop = inView(dirGrid, () => {
        // Animate each direction item to its natural position
        animate(dirGrid.querySelector('.from-left')!, { opacity: 1, x: 0 } as any, { duration: 0.5, delay: 0 });
        animate(dirGrid.querySelector('.from-top')!, { opacity: 1, y: 0 } as any, { duration: 0.5, delay: 0.1 });
        animate(dirGrid.querySelector('.from-right')!, { opacity: 1, x: 0 } as any, { duration: 0.5, delay: 0.2 });
        animate(dirGrid.querySelector('.from-bottom')!, { opacity: 1, y: 0 } as any, { duration: 0.5, delay: 0.3 });

        return () => {
          animate(dirGrid.querySelector('.from-left')!, { opacity: 0, x: -50 } as any, { duration: 0.3 });
          animate(dirGrid.querySelector('.from-top')!, { opacity: 0, y: -50 } as any, { duration: 0.3 });
          animate(dirGrid.querySelector('.from-right')!, { opacity: 0, x: 50 } as any, { duration: 0.3 });
          animate(dirGrid.querySelector('.from-bottom')!, { opacity: 0, y: 50 } as any, { duration: 0.3 });
        };
      }, { amount: 0.3 });
      this.cleanupFns.push(stop);
    }

    // Demo 7: Feature Sections - each section observed individually
    setTimeout(() => {
      const sections = document.querySelectorAll('.feature-section');
      sections.forEach((section, index) => {
        const isReversed = section.classList.contains('reversed');
        const stop = inView(section, () => {
          animate(section, { opacity: 1, x: 0 } as any, {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          });
          return () => {
            animate(section, { opacity: 0, x: isReversed ? 60 : -60 } as any, { duration: 0.3 });
          };
        }, { amount: 0.3 });
        this.cleanupFns.push(stop);
      });
    }, 0);

    // Demo 8: Custom Root Container - observes within the scroll container
    const rootContainer = this.customRoot()?.nativeElement;
    const item = this.containerItem()?.nativeElement;
    if (rootContainer && item) {
      const stop = inView(item, () => {
        this.containerItemVisible.set(true);
        animate(item, { opacity: 1, scale: 1 } as any, {
          type: spring,
          stiffness: 400,
          damping: 25
        });
        return () => {
          this.containerItemVisible.set(false);
          animate(item, { opacity: 0, scale: 0.8 } as any, { duration: 0.3 });
        };
      }, { root: rootContainer, amount: 0.5 });
      this.cleanupFns.push(stop);
    }
  }

  private setupThresholdDemo(
    element: HTMLElement | undefined,
    amount: 'some' | 'all' | number,
    visibleSignal: ReturnType<typeof signal<boolean>>,
    progressSignal: ReturnType<typeof signal<number>>
  ): void {
    if (!element) return;

    const stop = inView(element, () => {
      visibleSignal.set(true);
      progressSignal.set(100);
      animate(element, { borderColor: 'var(--success)' } as any, { duration: 0.3 });
      return () => {
        visibleSignal.set(false);
        progressSignal.set(0);
        animate(element, { borderColor: 'var(--border-color)' } as any, { duration: 0.3 });
      };
    }, { amount: amount as any });

    this.cleanupFns.push(stop);
  }
}
