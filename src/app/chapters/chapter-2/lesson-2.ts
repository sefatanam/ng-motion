import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, scroll, spring } from 'motion';

@Component({
  selector: 'app-chapter2-lesson2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="2"
      title="Scroll Progress"
      description="Link animations directly to scroll position. Create progress indicators, scroll-driven effects, and smooth parallax-like motion.">

      <!-- Theory Section -->
      <section class="theory-section">
        <h2 class="theory-title">📚 Understanding scroll()</h2>

        <div class="theory-content">
          <p>The <code>scroll()</code> function links animations to scroll progress. Unlike <code>inView()</code> which triggers once,
          <code>scroll()</code> creates a <strong>continuous relationship</strong> between scroll position and animation state.</p>

          <div class="anatomy-box">
            <h3>Function Anatomy</h3>
            <pre class="anatomy-code">scroll(
  // Option 1: Pass an animation
  animate(element, &#123; opacity: [0, 1] &#125;),

  // Option 2: Pass a callback
  (progress) =&gt; &#123;
    console.log(progress) // 0 to 1
  &#125;,

  // Options
  &#123;
    target: element,    // Element to track (default: document)
    offset: [           // When animation starts/ends
      "start end",      // Animation starts when element top meets viewport bottom
      "end start"       // Animation ends when element bottom meets viewport top
    ],
    axis: "y"           // "x" or "y" scroll direction
  &#125;
)</pre>
          </div>

          <div class="key-concepts">
            <div class="concept">
              <span class="concept-icon">📊</span>
              <div>
                <strong>Progress: 0 to 1</strong>
                <p>Animation state maps to scroll position</p>
              </div>
            </div>
            <div class="concept">
              <span class="concept-icon">🎯</span>
              <div>
                <strong>target</strong>
                <p>Element whose scroll position to track</p>
              </div>
            </div>
            <div class="concept">
              <span class="concept-icon">📍</span>
              <div>
                <strong>offset</strong>
                <p>Define start/end scroll positions</p>
              </div>
            </div>
            <div class="concept">
              <span class="concept-icon">🔄</span>
              <div>
                <strong>Reversible</strong>
                <p>Scroll up = animation reverses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Scroll Note -->
      <div class="scroll-note">
        <span class="note-icon">💡</span>
        <p><strong>Scroll this page</strong> to see animations linked to your scroll position.
        The animations progress as you scroll and reverse when you scroll back up.</p>
      </div>

      <!-- Fixed Progress Bar -->
      <div class="page-progress-bar" #pageProgressBar></div>

      <!-- Demo 1: Page Progress -->
      <section class="demo-section">
        <h2 class="section-title">1. Page Progress Bar</h2>
        <p class="section-desc">The purple bar at the top shows your progress through this page.</p>

        <div class="demo-visual">
          <div class="progress-preview">
            <div class="mini-bar">
              <div class="mini-fill" #miniProgressFill></div>
            </div>
            <span class="progress-label">Page Progress: {{ pageProgress() }}%</span>
          </div>
        </div>

        <div class="code-block">
          <pre>// Track scroll progress of entire document
scroll(
  animate(progressBar, &#123; scaleX: [0, 1] &#125;)
)

// With callback for custom logic
scroll((progress) =&gt; &#123;
  progressBar.style.transform = \`scaleX(\$&#123;progress&#125;)\`
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 2: Element-Based Progress -->
      <section class="demo-section">
        <h2 class="section-title">2. Element Scroll Progress</h2>
        <p class="section-desc">Animation progresses as a specific element scrolls through the viewport.</p>

        <div class="demo-visual tall">
          <div class="element-progress-box" #elementProgressBox>
            <div class="progress-ring">
              <svg viewBox="0 0 100 100">
                <circle class="ring-bg" cx="50" cy="50" r="45"/>
                <circle class="ring-fill" #ringFill cx="50" cy="50" r="45"/>
              </svg>
              <span class="ring-text">{{ elementProgress() }}%</span>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>scroll(
  (progress) =&gt; &#123;
    // Update ring stroke
    ring.style.strokeDashoffset = circumference * (1 - progress)
  &#125;,
  &#123;
    target: element,
    offset: ["start end", "end start"]  // Full viewport traverse
  &#125;
)</pre>
        </div>
      </section>

      <!-- Demo 3: Color Morph -->
      <section class="demo-section">
        <h2 class="section-title">3. Scroll-Driven Color Morph</h2>
        <p class="section-desc">Colors transition smoothly based on scroll position.</p>

        <div class="demo-visual">
          <div class="color-morph-box" #colorMorphBox>
            <span class="morph-text">🎨</span>
            <p>Watch my colors change</p>
          </div>
        </div>

        <div class="code-block">
          <pre>scroll(
  animate(element, &#123;
    backgroundColor: ["#6366f1", "#22c55e", "#f59e0b", "#ec4899"],
    borderRadius: ["16px", "50%", "16px", "50%"]
  &#125;),
  &#123; target: element, offset: ["start end", "end start"] &#125;
)</pre>
        </div>
      </section>

      <!-- Demo 4: Parallax Cards -->
      <section class="demo-section">
        <h2 class="section-title">4. Parallax Speed Layers</h2>
        <p class="section-desc">Elements move at different speeds to create depth perception.</p>

        <div class="demo-visual tall" #parallaxContainer>
          <div class="parallax-layer slow" #parallaxSlow>
            <span>🏔️</span>
            <p>Slow (0.3x)</p>
          </div>
          <div class="parallax-layer medium" #parallaxMedium>
            <span>🌲</span>
            <p>Medium (0.6x)</p>
          </div>
          <div class="parallax-layer fast" #parallaxFast>
            <span>🦅</span>
            <p>Fast (1x)</p>
          </div>
        </div>

        <div class="code-block">
          <pre>// Different y offsets create parallax depth
scroll(animate(slow, &#123; y: [0, -50] &#125;), &#123; target &#125;)    // Slow
scroll(animate(medium, &#123; y: [0, -100] &#125;), &#123; target &#125;) // Medium
scroll(animate(fast, &#123; y: [0, -200] &#125;), &#123; target &#125;)   // Fast</pre>
        </div>
      </section>

      <!-- Demo 5: Text Reveal -->
      <section class="demo-section">
        <h2 class="section-title">5. Progressive Text Reveal</h2>
        <p class="section-desc">Text reveals word by word as you scroll.</p>

        <div class="demo-visual tall">
          <div class="text-reveal-container" #textRevealContainer>
            @for (word of revealWords(); track $index) {
              <span class="reveal-word">{{ word }}</span>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>// Each word animates based on container scroll
words.forEach((word, i) =&gt; &#123;
  scroll(
    animate(word, &#123; opacity: [0.2, 1], y: [20, 0] &#125;),
    &#123;
      target: container,
      offset: [
        \`\$&#123;i * 0.1&#125; 0.5\`,      // Staggered start
        \`\$&#123;i * 0.1 + 0.1&#125; 0.5\` // Quick reveal
      ]
    &#125;
  )
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 6: Horizontal Gallery -->
      <section class="demo-section">
        <h2 class="section-title">6. Scroll-Linked Gallery</h2>
        <p class="section-desc">Vertical scroll drives horizontal movement.</p>

        <div class="demo-visual gallery-wrapper" #galleryWrapper>
          <div class="gallery-track" #galleryTrack>
            @for (item of galleryItems(); track item.id) {
              <div class="gallery-card" [style.background]="item.gradient">
                <span class="gallery-emoji">{{ item.emoji }}</span>
                <p>{{ item.label }}</p>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>// Map vertical scroll to horizontal movement
scroll(
  animate(track, &#123; x: ["0%", "-60%"] &#125;),
  &#123; target: wrapper &#125;
)</pre>
        </div>
      </section>

      <!-- Demo 7: Counter Animation -->
      <section class="demo-section">
        <h2 class="section-title">7. Scroll-Driven Counters</h2>
        <p class="section-desc">Numbers animate as the section scrolls into view.</p>

        <div class="demo-visual" #counterSection>
          <div class="counter-grid">
            <div class="counter-box">
              <span class="counter-num" #counter1>0</span>
              <span class="counter-label">Projects</span>
            </div>
            <div class="counter-box">
              <span class="counter-num" #counter2>0</span>
              <span class="counter-label">Users</span>
            </div>
            <div class="counter-box">
              <span class="counter-num" #counter3>0</span>
              <span class="counter-label">Stars</span>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>scroll(
  (progress) =&gt; &#123;
    counter.textContent = Math.round(progress * maxValue)
  &#125;,
  &#123; target: section, offset: ["start end", "center center"] &#125;
)</pre>
        </div>
      </section>

      <!-- Demo 8: Container-Based Scroll -->
      <section class="demo-section">
        <h2 class="section-title">8. Custom Scroll Container</h2>
        <p class="section-desc">Track scroll within a specific element instead of the viewport.</p>

        <div class="demo-visual">
          <div class="custom-scroll-container" #customScrollContainer>
            <div class="container-progress-bar" #containerProgressBar></div>
            <div class="scroll-hint-inner">↓ Scroll inside this box</div>
            <div class="inner-spacer"></div>
            <div class="inner-content">
              <h3>Scroll Container Demo</h3>
              <p>This tracks scroll within this specific element, not the page.</p>
              <p>Useful for carousels, modals, or any scrollable container.</p>
            </div>
            <div class="inner-spacer"></div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Track a specific scrollable container
scroll(
  animate(progressBar, &#123; scaleX: [0, 1] &#125;),
  &#123; target: scrollContainer &#125; // Custom container
)</pre>
        </div>
      </section>

      <!-- Offset Reference -->
      <section class="offset-reference">
        <h2 class="ref-title">📍 Offset Reference</h2>
        <p class="ref-desc">The <code>offset</code> option defines when animations start and end relative to the viewport.</p>

        <div class="offset-grid">
          <div class="offset-item">
            <code>"start end"</code>
            <span>Element top meets viewport bottom</span>
          </div>
          <div class="offset-item">
            <code>"center center"</code>
            <span>Element center meets viewport center</span>
          </div>
          <div class="offset-item">
            <code>"end start"</code>
            <span>Element bottom meets viewport top</span>
          </div>
          <div class="offset-item">
            <code>"start start"</code>
            <span>Element top meets viewport top</span>
          </div>
        </div>

        <div class="offset-visual">
          <div class="viewport-box">
            <span>Viewport</span>
            <div class="vp-line top">start (top)</div>
            <div class="vp-line center">center</div>
            <div class="vp-line bottom">end (bottom)</div>
          </div>
          <div class="element-box">
            <span>Element</span>
            <div class="el-line top">start (top)</div>
            <div class="el-line center">center</div>
            <div class="el-line bottom">end (bottom)</div>
          </div>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2 class="cheat-title">📋 Scroll Cheat Sheet</h2>
        <div class="cheat-grid">
          <div class="cheat-item">
            <code>scroll(animation)</code>
            <span>Link animation to page scroll</span>
          </div>
          <div class="cheat-item">
            <code>scroll(callback)</code>
            <span>Get progress (0-1) as callback</span>
          </div>
          <div class="cheat-item">
            <code>&#123; target: el &#125;</code>
            <span>Track specific element</span>
          </div>
          <div class="cheat-item">
            <code>&#123; axis: "x" &#125;</code>
            <span>Track horizontal scroll</span>
          </div>
          <div class="cheat-item">
            <code>offset: ["start end", "end start"]</code>
            <span>Full element traverse</span>
          </div>
          <div class="cheat-item">
            <code>offset: ["start 0.5", "end 0.5"]</code>
            <span>Animation at viewport center</span>
          </div>
          <div class="cheat-item">
            <code>const stop = scroll(...)</code>
            <span>Returns cleanup function</span>
          </div>
          <div class="cheat-item">
            <code>progress * 100</code>
            <span>Convert to percentage</span>
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
    }

    /* Page Progress Bar */
    .page-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--accent-primary);
      transform-origin: left;
      transform: scaleX(0);
      z-index: 1000;
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

    .demo-visual {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 40px 24px;
      margin-bottom: 20px;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .demo-visual.tall {
      min-height: 300px;
    }

    .demo-visual.gallery-wrapper {
      overflow: hidden;
      padding: 40px 0;
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

    /* Demo 1: Progress Preview */
    .progress-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .mini-bar {
      width: 300px;
      height: 8px;
      background: var(--bg-hover);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .mini-fill {
      height: 100%;
      background: var(--accent-primary);
      transform-origin: left;
      transform: scaleX(0);
    }

    .progress-label {
      font-size: 14px;
      color: var(--text-secondary);
    }

    /* Demo 2: Element Progress */
    .element-progress-box {
      width: 180px;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .progress-ring {
      position: relative;
      width: 150px;
      height: 150px;
    }

    .progress-ring svg {
      transform: rotate(-90deg);
    }

    .ring-bg {
      fill: none;
      stroke: var(--bg-hover);
      stroke-width: 8;
    }

    .ring-fill {
      fill: none;
      stroke: var(--accent-primary);
      stroke-width: 8;
      stroke-linecap: round;
      stroke-dasharray: 283;
      stroke-dashoffset: 283;
    }

    .ring-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
      color: var(--text-primary);
    }

    /* Demo 3: Color Morph */
    .color-morph-box {
      width: 200px;
      height: 200px;
      background: #6366f1;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: border-radius 0.1s;
    }

    .morph-text {
      font-size: 48px;
    }

    .color-morph-box p {
      margin: 0;
      font-size: 14px;
      color: white;
      font-weight: 600;
    }

    /* Demo 4: Parallax */
    .parallax-layer {
      width: 140px;
      height: 140px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      position: absolute;
    }

    .parallax-layer span {
      font-size: 40px;
    }

    .parallax-layer p {
      margin: 0;
      font-size: 12px;
      color: var(--text-secondary);
    }

    .parallax-layer.slow {
      left: 10%;
      background: rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
    }

    .parallax-layer.medium {
      left: 50%;
      transform: translateX(-50%);
      background: rgba(139, 92, 246, 0.2);
      border-color: #8b5cf6;
    }

    .parallax-layer.fast {
      right: 10%;
      background: rgba(236, 72, 153, 0.2);
      border-color: #ec4899;
    }

    /* Demo 5: Text Reveal */
    .text-reveal-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      max-width: 500px;
    }

    .reveal-word {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      opacity: 0.2;
    }

    /* Demo 6: Gallery */
    .gallery-track {
      display: flex;
      gap: 20px;
      padding: 0 40px;
    }

    .gallery-card {
      width: 200px;
      height: 150px;
      border-radius: var(--radius-xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .gallery-emoji {
      font-size: 40px;
    }

    .gallery-card p {
      margin: 0;
      font-size: 14px;
      color: white;
      font-weight: 600;
    }

    /* Demo 7: Counters */
    .counter-grid {
      display: flex;
      gap: 32px;
    }

    .counter-box {
      text-align: center;
      padding: 24px 32px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
    }

    .counter-num {
      display: block;
      font-size: 40px;
      font-weight: 700;
      color: var(--accent-primary);
      margin-bottom: 4px;
    }

    .counter-label {
      font-size: 12px;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Demo 8: Custom Container */
    .custom-scroll-container {
      width: 100%;
      max-width: 400px;
      height: 250px;
      overflow-y: auto;
      background: var(--bg-hover);
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-lg);
      position: relative;
    }

    .container-progress-bar {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--accent-secondary);
      transform-origin: left;
      transform: scaleX(0);
      z-index: 10;
    }

    .scroll-hint-inner {
      text-align: center;
      padding: 20px;
      color: var(--text-tertiary);
      font-size: 14px;
    }

    .inner-spacer {
      height: 150px;
    }

    .inner-content {
      padding: 20px;
      text-align: center;
    }

    .inner-content h3 {
      font-size: 16px;
      margin-bottom: 12px;
    }

    .inner-content p {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    /* Offset Reference */
    .offset-reference {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px;
      margin-bottom: 32px;
    }

    .ref-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .ref-desc {
      color: var(--text-secondary);
      margin-bottom: 24px;
      font-size: 14px;
    }

    .ref-desc code {
      background: var(--accent-glow);
      color: var(--accent-primary);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-family: 'SF Mono', monospace;
      font-size: 13px;
    }

    .offset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }

    .offset-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .offset-item code {
      font-family: 'SF Mono', monospace;
      font-size: 13px;
      color: var(--accent-primary);
    }

    .offset-item span {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .offset-visual {
      display: flex;
      gap: 32px;
      justify-content: center;
    }

    .viewport-box, .element-box {
      width: 150px;
      height: 200px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-lg);
      position: relative;
      background: var(--bg-hover);
    }

    .viewport-box > span, .element-box > span {
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: var(--text-secondary);
    }

    .vp-line, .el-line {
      position: absolute;
      left: 0;
      right: 0;
      font-size: 10px;
      text-align: center;
      color: var(--text-tertiary);
      padding: 4px;
    }

    .vp-line.top, .el-line.top {
      top: 0;
      border-bottom: 1px dashed var(--border-color);
    }

    .vp-line.center, .el-line.center {
      top: 50%;
      transform: translateY(-50%);
      border-top: 1px dashed var(--accent-primary);
      border-bottom: 1px dashed var(--accent-primary);
      background: var(--accent-glow);
    }

    .vp-line.bottom, .el-line.bottom {
      bottom: 0;
      border-top: 1px dashed var(--border-color);
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
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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
export class Chapter2Lesson2 implements OnDestroy {
  // Element refs
  readonly pageProgressBar = viewChild<ElementRef<HTMLElement>>('pageProgressBar');
  readonly miniProgressFill = viewChild<ElementRef<HTMLElement>>('miniProgressFill');
  readonly elementProgressBox = viewChild<ElementRef<HTMLElement>>('elementProgressBox');
  readonly ringFill = viewChild<ElementRef<HTMLElement>>('ringFill');
  readonly colorMorphBox = viewChild<ElementRef<HTMLElement>>('colorMorphBox');
  readonly parallaxContainer = viewChild<ElementRef<HTMLElement>>('parallaxContainer');
  readonly parallaxSlow = viewChild<ElementRef<HTMLElement>>('parallaxSlow');
  readonly parallaxMedium = viewChild<ElementRef<HTMLElement>>('parallaxMedium');
  readonly parallaxFast = viewChild<ElementRef<HTMLElement>>('parallaxFast');
  readonly textRevealContainer = viewChild<ElementRef<HTMLElement>>('textRevealContainer');
  readonly galleryWrapper = viewChild<ElementRef<HTMLElement>>('galleryWrapper');
  readonly galleryTrack = viewChild<ElementRef<HTMLElement>>('galleryTrack');
  readonly counterSection = viewChild<ElementRef<HTMLElement>>('counterSection');
  readonly counter1 = viewChild<ElementRef<HTMLElement>>('counter1');
  readonly counter2 = viewChild<ElementRef<HTMLElement>>('counter2');
  readonly counter3 = viewChild<ElementRef<HTMLElement>>('counter3');
  readonly customScrollContainer = viewChild<ElementRef<HTMLElement>>('customScrollContainer');
  readonly containerProgressBar = viewChild<ElementRef<HTMLElement>>('containerProgressBar');

  // State
  readonly pageProgress = signal(0);
  readonly elementProgress = signal(0);

  readonly revealWords = signal([
    'Motion', 'brings', 'your', 'interfaces', 'to', 'life',
    'with', 'scroll-driven', 'animations'
  ]);

  readonly galleryItems = signal([
    { id: 1, emoji: '🚀', label: 'Launch', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
    { id: 2, emoji: '⚡', label: 'Speed', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { id: 3, emoji: '🎨', label: 'Design', gradient: 'linear-gradient(135deg, #ec4899, #be185d)' },
    { id: 4, emoji: '🔥', label: 'Hot', gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
    { id: 5, emoji: '💎', label: 'Quality', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' }
  ]);

  private cleanupFns: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.setupScrollAnimations();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  private setupScrollAnimations(): void {
    // Demo 1: Page Progress Bar (tracks document scroll)
    const pageBar = this.pageProgressBar()?.nativeElement;
    const miniFill = this.miniProgressFill()?.nativeElement;
    if (pageBar) {
      const cleanup = scroll((progress: number) => {
        this.pageProgress.set(Math.round(progress * 100));
        pageBar.style.transform = `scaleX(${progress})`;
        if (miniFill) {
          miniFill.style.transform = `scaleX(${progress})`;
        }
      });
      this.cleanupFns.push(cleanup);
    }

    // Demo 2: Element Progress Ring
    const progressBox = this.elementProgressBox()?.nativeElement;
    const ring = this.ringFill()?.nativeElement;
    if (progressBox && ring) {
      const circumference = 2 * Math.PI * 45; // radius = 45
      ring.style.strokeDasharray = `${circumference}`;
      ring.style.strokeDashoffset = `${circumference}`;

      const cleanup = scroll(
        (progress: number) => {
          this.elementProgress.set(Math.round(progress * 100));
          ring.style.strokeDashoffset = `${circumference * (1 - progress)}`;
        },
        { target: progressBox, offset: ['start end', 'end start'] }
      );
      this.cleanupFns.push(cleanup);
    }

    // Demo 3: Color Morph
    const morphBox = this.colorMorphBox()?.nativeElement;
    if (morphBox) {
      const cleanup = scroll(
        animate(morphBox, {
          backgroundColor: ['#6366f1', '#22c55e', '#f59e0b', '#ec4899'],
          borderRadius: ['16px', '50%', '16px', '50%']
        }),
        { target: morphBox, offset: ['start end', 'end start'] }
      );
      this.cleanupFns.push(cleanup);
    }

    // Demo 4: Parallax Layers
    const parallaxCont = this.parallaxContainer()?.nativeElement;
    const slow = this.parallaxSlow()?.nativeElement;
    const medium = this.parallaxMedium()?.nativeElement;
    const fast = this.parallaxFast()?.nativeElement;
    if (parallaxCont && slow && medium && fast) {
      this.cleanupFns.push(
        scroll(animate(slow, { y: [50, -50] }), { target: parallaxCont, offset: ['start end', 'end start'] })
      );
      this.cleanupFns.push(
        scroll(animate(medium, { y: [100, -100] }), { target: parallaxCont, offset: ['start end', 'end start'] })
      );
      this.cleanupFns.push(
        scroll(animate(fast, { y: [150, -150] }), { target: parallaxCont, offset: ['start end', 'end start'] })
      );
    }

    // Demo 5: Text Reveal
    const textContainer = this.textRevealContainer()?.nativeElement;
    if (textContainer) {
      const words = textContainer.querySelectorAll('.reveal-word');
      words.forEach((word, i) => {
        const startProgress = i * 0.08;
        const endProgress = startProgress + 0.15;
        const cleanup = scroll(
          animate(word, { opacity: [0.2, 1], y: [20, 0] }),
          {
            target: textContainer,
            offset: [`${startProgress} 1`, `${endProgress} 0.5`]
          }
        );
        this.cleanupFns.push(cleanup);
      });
    }

    // Demo 6: Horizontal Gallery
    const wrapper = this.galleryWrapper()?.nativeElement;
    const track = this.galleryTrack()?.nativeElement;
    if (wrapper && track) {
      const cleanup = scroll(
        animate(track, { x: ['0%', '-60%'] }),
        { target: wrapper, offset: ['start end', 'end start'] }
      );
      this.cleanupFns.push(cleanup);
    }

    // Demo 7: Counters
    const counterSec = this.counterSection()?.nativeElement;
    const c1 = this.counter1()?.nativeElement;
    const c2 = this.counter2()?.nativeElement;
    const c3 = this.counter3()?.nativeElement;
    if (counterSec) {
      const setupCounter = (el: HTMLElement | undefined, max: number) => {
        if (!el) return null;
        return scroll(
          (progress: number) => {
            el.textContent = Math.round(progress * max).toLocaleString();
          },
          { target: counterSec, offset: ['start end', 'center center'] }
        );
      };

      const cleanup1 = setupCounter(c1, 150);
      const cleanup2 = setupCounter(c2, 10000);
      const cleanup3 = setupCounter(c3, 50000);

      if (cleanup1) this.cleanupFns.push(cleanup1);
      if (cleanup2) this.cleanupFns.push(cleanup2);
      if (cleanup3) this.cleanupFns.push(cleanup3);
    }

    // Demo 8: Custom Container Progress
    const customContainer = this.customScrollContainer()?.nativeElement;
    const containerBar = this.containerProgressBar()?.nativeElement;
    if (customContainer && containerBar) {
      const cleanup = scroll(
        animate(containerBar, { scaleX: [0, 1] }),
        { target: customContainer }
      );
      this.cleanupFns.push(cleanup);
    }
  }
}
