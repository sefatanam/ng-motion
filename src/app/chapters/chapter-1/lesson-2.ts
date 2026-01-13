import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal, computed } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

// @REVIEW - Enhanced Spring Animation lesson with comprehensive physics theory
@Component({
  selector: 'app-chapter1-lesson2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="1"
      title="Springs & Easing"
      description="Master physics-based spring animations. Understand stiffness, damping, mass, and bounce for natural, organic motion.">

      <!-- Theory Section: Spring Physics -->
      <section class="theory-section">
        <h2 class="theory-title">🎓 Spring Animation Theory</h2>

        <div class="theory-card">
          <h3>Two Types of Springs</h3>
          <div class="spring-types">
            <div class="spring-type">
              <div class="type-badge physics">Physics-Based</div>
              <p>Uses <strong>stiffness</strong>, <strong>damping</strong>, and <strong>mass</strong></p>
              <ul>
                <li>Incorporates velocity from gestures</li>
                <li>More realistic, natural feel</li>
                <li>Duration is calculated automatically</li>
              </ul>
              <div class="code-mini">
                <code>&#123; type: spring, stiffness: 300, damping: 20, mass: 1 &#125;</code>
              </div>
            </div>
            <div class="spring-type">
              <div class="type-badge duration">Duration-Based</div>
              <p>Uses <strong>duration</strong> and <strong>bounce</strong></p>
              <ul>
                <li>Easier to understand and configure</li>
                <li>Predictable timing</li>
                <li>Good for UI transitions</li>
              </ul>
              <div class="code-mini">
                <code>&#123; type: spring, duration: 0.8, bounce: 0.25 &#125;</code>
              </div>
            </div>
          </div>
        </div>

        <div class="theory-card">
          <h3>Understanding the Parameters</h3>
          <div class="param-grid">
            <div class="param-item">
              <div class="param-icon">🔩</div>
              <div class="param-name">Stiffness</div>
              <div class="param-desc">How "tight" the spring is. Higher = snappier, faster movement</div>
              <div class="param-analogy">
                <span class="analogy-label">Real-world:</span>
                A trampoline (low) vs a car suspension (high)
              </div>
              <div class="param-range">
                <span>50</span>
                <div class="range-bar"><div class="range-fill" style="width: 30%"></div></div>
                <span>1000</span>
              </div>
            </div>
            <div class="param-item">
              <div class="param-icon">🛢️</div>
              <div class="param-name">Damping</div>
              <div class="param-desc">Resistance that slows oscillation. Higher = less bounce, settles faster</div>
              <div class="param-analogy">
                <span class="analogy-label">Real-world:</span>
                Moving through air (low) vs honey (high)
              </div>
              <div class="param-range">
                <span>1</span>
                <div class="range-bar"><div class="range-fill" style="width: 40%"></div></div>
                <span>100</span>
              </div>
            </div>
            <div class="param-item">
              <div class="param-icon">⚖️</div>
              <div class="param-name">Mass</div>
              <div class="param-desc">Weight of the object. Higher = more inertia, slower to start/stop</div>
              <div class="param-analogy">
                <span class="analogy-label">Real-world:</span>
                A tennis ball (low) vs a bowling ball (high)
              </div>
              <div class="param-range">
                <span>0.1</span>
                <div class="range-bar"><div class="range-fill" style="width: 20%"></div></div>
                <span>10</span>
              </div>
            </div>
            <div class="param-item">
              <div class="param-icon">🎾</div>
              <div class="param-name">Bounce</div>
              <div class="param-desc">Bounciness for duration-based springs. 0 = no overshoot, 1 = very bouncy</div>
              <div class="param-analogy">
                <span class="analogy-label">Real-world:</span>
                A deflated ball (0) vs a super ball (1)
              </div>
              <div class="param-range">
                <span>0</span>
                <div class="range-bar"><div class="range-fill" style="width: 25%"></div></div>
                <span>1</span>
              </div>
            </div>
          </div>
        </div>

        <div class="theory-card formula-card">
          <h3>The Spring Formula</h3>
          <div class="formula">
            <span class="formula-text">F = -kx - cv + mg</span>
          </div>
          <div class="formula-legend">
            <span><strong>k</strong> = stiffness</span>
            <span><strong>c</strong> = damping</span>
            <span><strong>m</strong> = mass</span>
            <span><strong>x</strong> = displacement</span>
            <span><strong>v</strong> = velocity</span>
          </div>
          <p class="formula-note">Motion.dev handles this math for you - just tweak the parameters!</p>
        </div>

        <!-- @REVIEW - Added: Damping States Theory -->
        <div class="theory-card damping-states-card">
          <h3>Damping States: The Physics Behind the Feel</h3>
          <p class="theory-intro">The damping ratio (&#950;) determines how the spring settles. Understanding these states helps you choose the right feel.</p>

          <div class="damping-states-grid">
            <div class="damping-state underdamped">
              <div class="state-header">
                <span class="state-icon">🎾</span>
                <span class="state-name">Underdamped</span>
                <span class="state-ratio">&#950; &lt; 1</span>
              </div>
              <div class="state-visual">
                <svg viewBox="0 0 120 50" class="wave-svg">
                  <path d="M 0 25 Q 15 5 30 25 Q 45 45 60 25 Q 75 15 90 25 Q 105 30 120 25" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <p class="state-desc">Oscillates before settling. Creates bouncy, playful motion.</p>
              <code class="state-example">damping: 5-15</code>
            </div>

            <div class="damping-state critically-damped">
              <div class="state-header">
                <span class="state-icon">⚡</span>
                <span class="state-name">Critically Damped</span>
                <span class="state-ratio">&#950; = 1</span>
              </div>
              <div class="state-visual">
                <svg viewBox="0 0 120 50" class="wave-svg">
                  <path d="M 0 45 Q 40 15 80 25 Q 100 25 120 25" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <p class="state-desc">Fastest settling with no overshoot. The "sweet spot" for UI.</p>
              <code class="state-example">bounce: 0</code>
            </div>

            <div class="damping-state overdamped">
              <div class="state-header">
                <span class="state-icon">🐌</span>
                <span class="state-name">Overdamped</span>
                <span class="state-ratio">&#950; &gt; 1</span>
              </div>
              <div class="state-visual">
                <svg viewBox="0 0 120 50" class="wave-svg">
                  <path d="M 0 45 Q 60 30 90 26 Q 110 25 120 25" fill="none" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <p class="state-desc">Slowly approaches target without oscillation. Heavy, sluggish feel.</p>
              <code class="state-example">damping: 50+</code>
            </div>
          </div>

          <div class="damping-ratio-visual">
            <h4>Damping Ratio Formula</h4>
            <div class="formula-small">
              <span>&#950; = c / (2 * &#8730;(k * m))</span>
            </div>
            <p class="formula-tip">For duration-based springs: <strong>bounce: 0</strong> = critically damped, <strong>bounce: 1</strong> = very underdamped</p>
          </div>
        </div>

        <!-- @REVIEW - Added: Velocity Parameter Theory -->
        <div class="theory-card velocity-card">
          <h3>Initial Velocity: Momentum from Gestures</h3>
          <p class="theory-intro">The <strong>velocity</strong> parameter lets springs inherit momentum from user interactions like drags and swipes.</p>

          <div class="velocity-concept">
            <div class="velocity-item">
              <div class="velocity-icon">🖐️</div>
              <div class="velocity-info">
                <h4>Without Velocity</h4>
                <p>Spring starts from rest. Feels disconnected from gesture.</p>
              </div>
            </div>
            <div class="velocity-arrow">→</div>
            <div class="velocity-item">
              <div class="velocity-icon">🚀</div>
              <div class="velocity-info">
                <h4>With Velocity</h4>
                <p>Spring inherits movement speed. Feels natural and fluid.</p>
              </div>
            </div>
          </div>

          <div class="velocity-code-example">
            <code>// Capture velocity from drag and pass to spring
const dragVelocity = event.velocityX;

animate(element, &#123; x: targetX &#125;, &#123;
  type: spring,
  velocity: dragVelocity,  // Units: pixels per second
  stiffness: 300,
  damping: 25
&#125;)</code>
          </div>

          <div class="velocity-values">
            <span class="velocity-val"><strong>0</strong> = at rest</span>
            <span class="velocity-val"><strong>500</strong> = gentle swipe</span>
            <span class="velocity-val"><strong>1500+</strong> = fast flick</span>
          </div>
        </div>
      </section>

      <!-- Demo 1: Physics vs Duration Springs -->
      <section class="demo-section">
        <h2 class="section-title">1. Physics vs Duration-Based</h2>
        <p class="section-desc">Compare the two spring types side by side.</p>

        <div class="comparison-area">
          <div class="comparison-row">
            <span class="comparison-label">
              <span class="badge physics">Physics</span>
              <span class="sub-label">stiffness: 300, damping: 20</span>
            </span>
            <div class="comparison-track">
              <div #physicsSpring class="demo-box physics-box">P</div>
            </div>
          </div>
          <div class="comparison-row">
            <span class="comparison-label">
              <span class="badge duration">Duration</span>
              <span class="sub-label">duration: 0.6s, bounce: 0.3</span>
            </span>
            <div class="comparison-track">
              <div #durationSpring class="demo-box duration-box">D</div>
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="compareSpringTypes()">Compare</button>
          <button class="btn btn-secondary" (click)="resetComparison()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Physics-based: incorporates velocity, natural feel
animate(el, &#123; x: 250 &#125;, &#123;
  type: spring,
  stiffness: 300,
  damping: 20
&#125;)

// Duration-based: predictable timing
animate(el, &#123; x: 250 &#125;, &#123;
  type: spring,
  duration: 0.6,
  bounce: 0.3
&#125;)</pre>
        </div>
      </section>

      <!-- Demo 2: Stiffness Explorer -->
      <section class="demo-section">
        <h2 class="section-title">2. Stiffness Comparison</h2>
        <p class="section-desc">See how stiffness affects the spring's "snappiness".</p>

        <div class="stiffness-grid">
          @for (config of stiffnessConfigs(); track config.value) {
            <div class="stiffness-item">
              <span class="stiffness-label">{{ config.label }}</span>
              <span class="stiffness-value">{{ config.value }}</span>
              <div class="stiffness-track">
                <div class="stiffness-box" [attr.data-stiffness]="config.value"></div>
              </div>
            </div>
          }
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateStiffnessDemo()">Run All</button>
          <button class="btn btn-secondary" (click)="resetStiffnessDemo()">Reset</button>
        </div>

        <div class="insight-box">
          <span class="insight-icon">💡</span>
          <span class="insight-text">Low stiffness (100) creates a lazy, floating feel. High stiffness (800+) creates snappy, immediate response.</span>
        </div>
      </section>

      <!-- Demo 3: Damping Explorer -->
      <section class="demo-section">
        <h2 class="section-title">3. Damping Comparison</h2>
        <p class="section-desc">See how damping controls oscillation and settling time.</p>

        <div class="damping-grid">
          @for (config of dampingConfigs(); track config.value) {
            <div class="damping-item">
              <span class="damping-label">{{ config.label }}</span>
              <span class="damping-value">{{ config.value }}</span>
              <div class="damping-track">
                <div class="damping-box" [attr.data-damping]="config.value"></div>
              </div>
              <span class="damping-desc">{{ config.desc }}</span>
            </div>
          }
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateDampingDemo()">Run All</button>
          <button class="btn btn-secondary" (click)="resetDampingDemo()">Reset</button>
        </div>

        <div class="insight-box warning">
          <span class="insight-icon">⚠️</span>
          <span class="insight-text">Very low damping (5-10) can create excessive bouncing. For UI, aim for damping 15-30.</span>
        </div>
      </section>

      <!-- Demo 4: Mass Effect -->
      <section class="demo-section">
        <h2 class="section-title">4. Mass Effect</h2>
        <p class="section-desc">Mass affects inertia - how quickly objects respond to force.</p>

        <div class="mass-demo">
          <div class="mass-row">
            <div class="mass-info">
              <span class="mass-icon">🏓</span>
              <span class="mass-name">Light (0.5)</span>
            </div>
            <div class="mass-track">
              <div #massLight class="mass-ball light"></div>
            </div>
          </div>
          <div class="mass-row">
            <div class="mass-info">
              <span class="mass-icon">⚾</span>
              <span class="mass-name">Medium (1.0)</span>
            </div>
            <div class="mass-track">
              <div #massMedium class="mass-ball medium"></div>
            </div>
          </div>
          <div class="mass-row">
            <div class="mass-info">
              <span class="mass-icon">🎱</span>
              <span class="mass-name">Heavy (3.0)</span>
            </div>
            <div class="mass-track">
              <div #massHeavy class="mass-ball heavy"></div>
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateMassDemo()">Compare Mass</button>
          <button class="btn btn-secondary" (click)="resetMassDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Light objects respond quickly
animate(light, &#123; x: 200 &#125;, &#123; type: spring, stiffness: 300, damping: 15, mass: 0.5 &#125;)

// Heavy objects have more inertia
animate(heavy, &#123; x: 200 &#125;, &#123; type: spring, stiffness: 300, damping: 15, mass: 3 &#125;)</pre>
        </div>
      </section>

      <!-- Demo 5: Bounce Parameter -->
      <section class="demo-section">
        <h2 class="section-title">5. Bounce Parameter (Duration-Based)</h2>
        <p class="section-desc">For simpler configuration, use duration + bounce instead of physics parameters.</p>

        <div class="bounce-demo">
          @for (bounce of bounceValues(); track bounce.value) {
            <div class="bounce-item">
              <div class="bounce-label">
                <span class="bounce-name">{{ bounce.label }}</span>
                <span class="bounce-val">bounce: {{ bounce.value }}</span>
              </div>
              <div class="bounce-track">
                <div class="bounce-box" [attr.data-bounce]="bounce.value"></div>
              </div>
            </div>
          }
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateBounceDemo()">Run All</button>
          <button class="btn btn-secondary" (click)="resetBounceDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// bounce: 0 = no overshoot (ease out feel)
animate(el, &#123; x: 200 &#125;, &#123; type: spring, duration: 0.6, bounce: 0 &#125;)

// bounce: 0.5 = moderate bounce
animate(el, &#123; x: 200 &#125;, &#123; type: spring, duration: 0.6, bounce: 0.5 &#125;)

// bounce: 1 = maximum bounce (use sparingly!)
animate(el, &#123; x: 200 &#125;, &#123; type: spring, duration: 0.6, bounce: 1 &#125;)</pre>
        </div>
      </section>

      <!-- Demo 6: Velocity Effect - @REVIEW Added -->
      <section class="demo-section">
        <h2 class="section-title">6. Velocity Effect</h2>
        <p class="section-desc">Initial velocity determines the starting momentum. Essential for gesture-driven animations.</p>

        <div class="velocity-demo">
          <div class="velocity-comparison">
            <div class="velocity-row">
              <span class="velocity-label">
                <span class="velocity-name">No Velocity</span>
                <span class="velocity-value">velocity: 0</span>
              </span>
              <div class="velocity-track">
                <div #velocityZero class="velocity-ball zero"></div>
              </div>
            </div>
            <div class="velocity-row">
              <span class="velocity-label">
                <span class="velocity-name">Gentle Push</span>
                <span class="velocity-value">velocity: 500</span>
              </span>
              <div class="velocity-track">
                <div #velocityLow class="velocity-ball low"></div>
              </div>
            </div>
            <div class="velocity-row">
              <span class="velocity-label">
                <span class="velocity-name">Strong Push</span>
                <span class="velocity-value">velocity: 1000</span>
              </span>
              <div class="velocity-track">
                <div #velocityMed class="velocity-ball medium"></div>
              </div>
            </div>
            <div class="velocity-row">
              <span class="velocity-label">
                <span class="velocity-name">Fast Flick</span>
                <span class="velocity-value">velocity: 2000</span>
              </span>
              <div class="velocity-track">
                <div #velocityHigh class="velocity-ball high"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateVelocityDemo()">Compare Velocity</button>
          <button class="btn btn-secondary" (click)="resetVelocityDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// No initial velocity - spring starts from rest
animate(el, &#123; x: 200 &#125;, &#123; type: spring, velocity: 0, stiffness: 200, damping: 15 &#125;)

// With velocity - spring has initial momentum (overshoots more)
animate(el, &#123; x: 200 &#125;, &#123; type: spring, velocity: 1000, stiffness: 200, damping: 15 &#125;)</pre>
        </div>

        <div class="insight-box">
          <span class="insight-icon">🎯</span>
          <span class="insight-text">Use velocity from drag/swipe events for seamless gesture-to-animation transitions. Higher velocity = more overshoot.</span>
        </div>
      </section>

      <!-- Demo 7: Damping States Comparison - @REVIEW Added -->
      <section class="demo-section">
        <h2 class="section-title">7. Damping States in Action</h2>
        <p class="section-desc">See the three damping states and how they affect animation feel.</p>

        <div class="damping-states-demo">
          <div class="state-comparison-row">
            <span class="state-demo-label">
              <span class="state-badge underdamped-badge">Underdamped</span>
              <span class="state-config">damping: 8</span>
            </span>
            <div class="state-demo-track">
              <div #underdampedBox class="state-demo-box underdamped-box"></div>
            </div>
            <span class="state-behavior">Bounces multiple times</span>
          </div>
          <div class="state-comparison-row">
            <span class="state-demo-label">
              <span class="state-badge critical-badge">Critical</span>
              <span class="state-config">bounce: 0</span>
            </span>
            <div class="state-demo-track">
              <div #criticalBox class="state-demo-box critical-box"></div>
            </div>
            <span class="state-behavior">Fastest, no overshoot</span>
          </div>
          <div class="state-comparison-row">
            <span class="state-demo-label">
              <span class="state-badge overdamped-badge">Overdamped</span>
              <span class="state-config">damping: 60</span>
            </span>
            <div class="state-demo-track">
              <div #overdampedBox class="state-demo-box overdamped-box"></div>
            </div>
            <span class="state-behavior">Slow, sluggish</span>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateDampingStatesDemo()">Compare States</button>
          <button class="btn btn-secondary" (click)="resetDampingStatesDemo()">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Underdamped: bouncy, oscillates before settling
animate(el, &#123; x: 200 &#125;, &#123; type: spring, stiffness: 300, damping: 8 &#125;)

// Critically damped: fastest to settle, no overshoot
animate(el, &#123; x: 200 &#125;, &#123; type: spring, duration: 0.6, bounce: 0 &#125;)

// Overdamped: slow approach, heavy feel
animate(el, &#123; x: 200 &#125;, &#123; type: spring, stiffness: 300, damping: 60 &#125;)</pre>
        </div>
      </section>

      <!-- Demo 8: Spring Presets -->
      <section class="demo-section">
        <h2 class="section-title">8. Common Spring Presets</h2>
        <p class="section-desc">Ready-to-use configurations for different UI scenarios.</p>

        <div class="presets-grid">
          @for (preset of springPresets(); track preset.name) {
            <div class="preset-card" (click)="animatePreset(preset)">
              <div class="preset-header">
                <span class="preset-icon">{{ preset.icon }}</span>
                <span class="preset-name">{{ preset.name }}</span>
              </div>
              <div class="preset-box" [attr.data-preset]="preset.name"></div>
              <div class="preset-config">
                <code>{{ preset.configStr }}</code>
              </div>
              <div class="preset-use">{{ preset.useCase }}</div>
            </div>
          }
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateAllPresets()">Run All Presets</button>
          <button class="btn btn-secondary" (click)="resetAllPresets()">Reset</button>
        </div>
      </section>

      <!-- Demo 9: Interactive Playground -->
      <section class="demo-section playground-section">
        <h2 class="section-title">9. Interactive Spring Playground</h2>
        <p class="section-desc">Experiment with all parameters to build your perfect spring.</p>

        <div class="playground-area">
          <div class="playground-preview">
            <div #playgroundBox class="playground-box">
              <span>{{ playgroundMode() === 'physics' ? '⚙️' : '⏱️' }}</span>
            </div>
          </div>

          <div class="playground-controls">
            <div class="mode-toggle">
              <button
                class="mode-btn"
                [class.active]="playgroundMode() === 'physics'"
                (click)="setPlaygroundMode('physics')">
                Physics-Based
              </button>
              <button
                class="mode-btn"
                [class.active]="playgroundMode() === 'duration'"
                (click)="setPlaygroundMode('duration')">
                Duration-Based
              </button>
            </div>

            @if (playgroundMode() === 'physics') {
              <div class="slider-group">
                <label>Stiffness: <strong>{{ stiffness() }}</strong></label>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  [value]="stiffness()"
                  (input)="stiffness.set(+$any($event.target).value)">
              </div>
              <div class="slider-group">
                <label>Damping: <strong>{{ damping() }}</strong></label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  [value]="damping()"
                  (input)="damping.set(+$any($event.target).value)">
              </div>
              <div class="slider-group">
                <label>Mass: <strong>{{ mass() }}</strong></label>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  [value]="mass()"
                  (input)="mass.set(+$any($event.target).value)">
              </div>
            } @else {
              <div class="slider-group">
                <label>Duration: <strong>{{ duration() }}s</strong></label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  [value]="duration()"
                  (input)="duration.set(+$any($event.target).value)">
              </div>
              <div class="slider-group">
                <label>Bounce: <strong>{{ bounce() }}</strong></label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  [value]="bounce()"
                  (input)="bounce.set(+$any($event.target).value)">
              </div>
            }

            <div class="generated-code">
              <pre>{{ generatedCode() }}</pre>
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animatePlayground()">Animate</button>
          <button class="btn btn-secondary" (click)="resetPlayground()">Reset</button>
          <button class="btn btn-accent" (click)="copyCode()">{{ copyLabel() }}</button>
        </div>
      </section>

      <!-- Demo 10: Easing Functions -->
      <section class="demo-section">
        <h2 class="section-title">10. Easing Functions (Non-Spring)</h2>
        <p class="section-desc">Traditional easing curves for duration-based animations.</p>

        <div class="easing-grid">
          @for (ease of easingFunctions(); track ease.name) {
            <div class="easing-item">
              <span class="easing-label">{{ ease.name }}</span>
              <div class="easing-curve">
                <svg viewBox="0 0 100 100" class="curve-svg">
                  <path [attr.d]="ease.path" fill="none" stroke="var(--accent-primary)" stroke-width="2"/>
                </svg>
              </div>
              <div class="easing-track">
                <div class="easing-box" [attr.data-ease]="ease.name"></div>
              </div>
            </div>
          }
        </div>

        <div class="controls">
          <button class="btn btn-primary" (click)="animateAllEasing()">Run All</button>
          <button class="btn btn-secondary" (click)="resetAllEasing()">Reset</button>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2 class="cheat-title">📋 Spring Cheat Sheet</h2>

        <div class="cheat-grid">
          <div class="cheat-card">
            <h4>🎯 Quick & Responsive</h4>
            <code>stiffness: 400+, damping: 25-35</code>
            <p>Buttons, toggles, micro-interactions</p>
          </div>
          <div class="cheat-card">
            <h4>🌊 Smooth & Elegant</h4>
            <code>stiffness: 150-250, damping: 15-25</code>
            <p>Cards, modals, page transitions</p>
          </div>
          <div class="cheat-card">
            <h4>🎪 Bouncy & Playful</h4>
            <code>stiffness: 300, damping: 10-15</code>
            <p>Notifications, badges, celebrations</p>
          </div>
          <div class="cheat-card">
            <h4>⚡ Instant & Sharp</h4>
            <code>stiffness: 800+, damping: 40+</code>
            <p>Snackbars, tooltips, fast feedback</p>
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
      margin-bottom: 16px;
    }

    .spring-types {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .spring-type {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
    }

    .type-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      border-radius: var(--radius-full);
      margin-bottom: 8px;
    }

    .type-badge.physics {
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
    }

    .type-badge.duration {
      background: rgba(34, 197, 94, 0.2);
      color: #4ade80;
    }

    .spring-type p {
      font-size: 13px;
      margin-bottom: 8px;
    }

    .spring-type ul {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0 0 12px 16px;
    }

    .spring-type li {
      margin-bottom: 4px;
    }

    .code-mini {
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      padding: 8px;
    }

    .code-mini code {
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
    }

    /* Parameter Grid */
    .param-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .param-item {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
    }

    .param-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .param-name {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .param-desc {
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .param-analogy {
      font-size: 11px;
      color: var(--text-tertiary);
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      padding: 6px 8px;
      margin-bottom: 8px;
    }

    .analogy-label {
      color: var(--accent-primary);
      font-weight: 500;
    }

    .param-range {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      color: var(--text-tertiary);
    }

    .range-bar {
      flex: 1;
      height: 4px;
      background: var(--bg-hover);
      border-radius: 2px;
      overflow: hidden;
    }

    .range-fill {
      height: 100%;
      background: var(--accent-primary);
    }

    /* Formula Card */
    .formula-card {
      text-align: center;
    }

    .formula {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 12px;
    }

    .formula-text {
      font-size: 24px;
      font-family: 'SF Mono', monospace;
      color: var(--accent-primary);
    }

    .formula-legend {
      display: flex;
      justify-content: center;
      gap: 16px;
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .formula-note {
      font-size: 12px;
      color: var(--text-tertiary);
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
      flex-wrap: wrap;
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

    /* Comparison Area */
    .comparison-area {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 24px;
    }

    .comparison-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .comparison-row:last-child {
      margin-bottom: 0;
    }

    .comparison-label {
      width: 180px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .badge {
      display: inline-block;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: 600;
      border-radius: var(--radius-sm);
    }

    .badge.physics {
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
    }

    .badge.duration {
      background: rgba(34, 197, 94, 0.2);
      color: #4ade80;
    }

    .sub-label {
      font-size: 10px;
      color: var(--text-tertiary);
    }

    .comparison-track {
      flex: 1;
      height: 60px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    .demo-box {
      width: 50px;
      height: 50px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: white;
    }

    .physics-box {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
    }

    .duration-box {
      background: linear-gradient(135deg, #22c55e, #16a34a);
    }

    /* Stiffness Grid */
    .stiffness-grid, .damping-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .stiffness-item, .damping-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stiffness-label, .damping-label {
      width: 80px;
      font-size: 13px;
      color: var(--text-secondary);
    }

    .stiffness-value, .damping-value {
      width: 50px;
      font-size: 12px;
      font-family: 'SF Mono', monospace;
      color: var(--accent-primary);
    }

    .stiffness-track, .damping-track {
      flex: 1;
      height: 40px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    .stiffness-box, .damping-box {
      width: 36px;
      height: 36px;
      background: var(--accent-primary);
      border-radius: var(--radius-sm);
    }

    .damping-desc {
      width: 100px;
      font-size: 11px;
      color: var(--text-tertiary);
    }

    /* Insight Box */
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

    .insight-box.warning {
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.3);
    }

    .insight-icon {
      font-size: 20px;
    }

    .insight-text {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* Mass Demo */
    .mass-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .mass-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .mass-row:last-child {
      margin-bottom: 0;
    }

    .mass-info {
      width: 120px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mass-icon {
      font-size: 20px;
    }

    .mass-name {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .mass-track {
      flex: 1;
      height: 50px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    .mass-ball {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .mass-ball.light {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
    }

    .mass-ball.medium {
      background: linear-gradient(135deg, #f97316, #ea580c);
    }

    .mass-ball.heavy {
      background: linear-gradient(135deg, #ef4444, #dc2626);
    }

    /* Bounce Demo */
    .bounce-demo {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .bounce-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bounce-label {
      width: 140px;
      display: flex;
      flex-direction: column;
    }

    .bounce-name {
      font-size: 13px;
      font-weight: 500;
    }

    .bounce-val {
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--text-tertiary);
    }

    .bounce-track {
      flex: 1;
      height: 40px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    .bounce-box {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #8b5cf6, #6d28d9);
      border-radius: var(--radius-sm);
    }

    /* Presets Grid */
    .presets-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .preset-card {
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 16px;
      cursor: pointer;
      transition: border-color 0.2s, transform 0.2s;
    }

    .preset-card:hover {
      border-color: var(--accent-primary);
      transform: translateY(-2px);
    }

    .preset-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .preset-icon {
      font-size: 20px;
    }

    .preset-name {
      font-size: 14px;
      font-weight: 600;
    }

    .preset-box {
      width: 100%;
      height: 40px;
      background: var(--accent-primary);
      border-radius: var(--radius-md);
      margin-bottom: 12px;
    }

    .preset-config {
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      padding: 8px;
      margin-bottom: 8px;
    }

    .preset-config code {
      font-size: 10px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
    }

    .preset-use {
      font-size: 11px;
      color: var(--text-tertiary);
    }

    /* Playground Section */
    .playground-section {
      background: linear-gradient(135deg, var(--bg-secondary), rgba(99, 102, 241, 0.05));
    }

    .playground-area {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .playground-preview {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .playground-box {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .playground-controls {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .mode-toggle {
      display: flex;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 4px;
    }

    .mode-btn {
      flex: 1;
      padding: 8px 16px;
      font-size: 13px;
      border-radius: var(--radius-sm);
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.2s;
    }

    .mode-btn.active {
      background: var(--accent-primary);
      color: white;
    }

    .slider-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slider-group label {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .slider-group label strong {
      color: var(--accent-primary);
    }

    .slider-group input[type="range"] {
      width: 100%;
      height: 6px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-full);
      appearance: none;
      cursor: pointer;
    }

    .slider-group input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      background: var(--accent-primary);
      border-radius: 50%;
      cursor: pointer;
    }

    .generated-code {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 12px;
      font-family: 'SF Mono', monospace;
      font-size: 12px;
    }

    .generated-code pre {
      margin: 0;
      color: var(--accent-primary);
    }

    .btn-accent {
      background: var(--accent-secondary);
      color: white;
    }

    /* Easing Grid */
    .easing-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .easing-item {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 12px;
    }

    .easing-label {
      font-size: 12px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
      margin-bottom: 8px;
      display: block;
    }

    .easing-curve {
      height: 60px;
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      margin-bottom: 8px;
      padding: 8px;
    }

    .curve-svg {
      width: 100%;
      height: 100%;
    }

    .easing-track {
      height: 32px;
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      padding: 0 4px;
    }

    .easing-box {
      width: 28px;
      height: 28px;
      background: var(--accent-primary);
      border-radius: var(--radius-xs);
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
      grid-template-columns: repeat(2, 1fr);
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
      font-size: 12px;
      font-family: 'SF Mono', monospace;
      color: var(--accent-primary);
      background: var(--bg-hover);
      padding: 8px;
      border-radius: var(--radius-sm);
      margin-bottom: 8px;
    }

    .cheat-card p {
      font-size: 12px;
      color: var(--text-tertiary);
      margin: 0;
    }

    /* @REVIEW - Added: Damping States Card */
    .damping-states-card .theory-intro {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .damping-states-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }

    .damping-state {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
      text-align: center;
    }

    .state-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      margin-bottom: 12px;
    }

    .state-icon {
      font-size: 24px;
    }

    .state-name {
      font-size: 13px;
      font-weight: 600;
    }

    .state-ratio {
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--accent-primary);
    }

    .state-visual {
      height: 50px;
      margin-bottom: 12px;
    }

    .wave-svg {
      width: 100%;
      height: 100%;
      color: var(--accent-primary);
    }

    .state-desc {
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .state-example {
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--text-tertiary);
      background: var(--bg-hover);
      padding: 4px 8px;
      border-radius: var(--radius-xs);
    }

    .damping-state.underdamped {
      border-top: 3px solid #f59e0b;
    }

    .damping-state.critically-damped {
      border-top: 3px solid #22c55e;
    }

    .damping-state.overdamped {
      border-top: 3px solid #6366f1;
    }

    .damping-ratio-visual {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
      text-align: center;
    }

    .damping-ratio-visual h4 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .formula-small {
      background: var(--bg-hover);
      border-radius: var(--radius-sm);
      padding: 8px 16px;
      display: inline-block;
      margin-bottom: 8px;
    }

    .formula-small span {
      font-family: 'SF Mono', monospace;
      font-size: 14px;
      color: var(--accent-primary);
    }

    .formula-tip {
      font-size: 12px;
      color: var(--text-tertiary);
      margin: 0;
    }

    /* @REVIEW - Added: Velocity Card */
    .velocity-card .theory-intro {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .velocity-concept {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 16px;
    }

    .velocity-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .velocity-icon {
      font-size: 32px;
    }

    .velocity-info h4 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .velocity-info p {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
    }

    .velocity-arrow {
      font-size: 24px;
      color: var(--accent-primary);
    }

    .velocity-code-example {
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 12px;
    }

    .velocity-code-example code {
      font-size: 12px;
      font-family: 'SF Mono', monospace;
      color: var(--text-secondary);
      white-space: pre-wrap;
      display: block;
    }

    .velocity-values {
      display: flex;
      justify-content: center;
      gap: 24px;
    }

    .velocity-val {
      font-size: 12px;
      color: var(--text-secondary);
    }

    .velocity-val strong {
      color: var(--accent-primary);
    }

    /* @REVIEW - Added: Velocity Demo */
    .velocity-demo {
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 20px;
    }

    .velocity-comparison {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .velocity-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .velocity-label {
      width: 130px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .velocity-name {
      font-size: 13px;
      font-weight: 500;
    }

    .velocity-value {
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--text-tertiary);
    }

    .velocity-track {
      flex: 1;
      height: 50px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    .velocity-ball {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .velocity-ball.zero {
      background: linear-gradient(135deg, #6b7280, #4b5563);
    }

    .velocity-ball.low {
      background: linear-gradient(135deg, #22c55e, #16a34a);
    }

    .velocity-ball.medium {
      background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .velocity-ball.high {
      background: linear-gradient(135deg, #ef4444, #dc2626);
    }

    /* @REVIEW - Added: Damping States Demo */
    .damping-states-demo {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .state-comparison-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .state-demo-label {
      width: 150px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .state-badge {
      display: inline-block;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      border-radius: var(--radius-sm);
      width: fit-content;
    }

    .underdamped-badge {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
    }

    .critical-badge {
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
    }

    .overdamped-badge {
      background: rgba(99, 102, 241, 0.2);
      color: #818cf8;
    }

    .state-config {
      font-size: 11px;
      font-family: 'SF Mono', monospace;
      color: var(--text-tertiary);
    }

    .state-demo-track {
      flex: 1;
      height: 50px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    .state-demo-box {
      width: 45px;
      height: 45px;
      border-radius: var(--radius-md);
    }

    .underdamped-box {
      background: linear-gradient(135deg, #f59e0b, #d97706);
    }

    .critical-box {
      background: linear-gradient(135deg, #22c55e, #16a34a);
    }

    .overdamped-box {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
    }

    .state-behavior {
      width: 150px;
      font-size: 12px;
      color: var(--text-tertiary);
    }
  `]
})
export class Chapter1Lesson2 {
  // View children for demos
  readonly physicsSpring = viewChild<ElementRef<HTMLElement>>('physicsSpring');
  readonly durationSpring = viewChild<ElementRef<HTMLElement>>('durationSpring');
  readonly massLight = viewChild<ElementRef<HTMLElement>>('massLight');
  readonly massMedium = viewChild<ElementRef<HTMLElement>>('massMedium');
  readonly massHeavy = viewChild<ElementRef<HTMLElement>>('massHeavy');
  readonly playgroundBox = viewChild<ElementRef<HTMLElement>>('playgroundBox');

  // @REVIEW - Added: Velocity demo view children
  readonly velocityZero = viewChild<ElementRef<HTMLElement>>('velocityZero');
  readonly velocityLow = viewChild<ElementRef<HTMLElement>>('velocityLow');
  readonly velocityMed = viewChild<ElementRef<HTMLElement>>('velocityMed');
  readonly velocityHigh = viewChild<ElementRef<HTMLElement>>('velocityHigh');

  // @REVIEW - Added: Damping states demo view children
  readonly underdampedBox = viewChild<ElementRef<HTMLElement>>('underdampedBox');
  readonly criticalBox = viewChild<ElementRef<HTMLElement>>('criticalBox');
  readonly overdampedBox = viewChild<ElementRef<HTMLElement>>('overdampedBox');

  // Playground state
  readonly playgroundMode = signal<'physics' | 'duration'>('physics');
  readonly stiffness = signal(300);
  readonly damping = signal(20);
  readonly mass = signal(1);
  readonly duration = signal(0.6);
  readonly bounce = signal(0.25);
  readonly copyLabel = signal('Copy Code');

  // Computed generated code
  readonly generatedCode = computed(() => {
    if (this.playgroundMode() === 'physics') {
      return `animate(el, { y: -80 }, {
  type: spring,
  stiffness: ${this.stiffness()},
  damping: ${this.damping()},
  mass: ${this.mass()}
})`;
    } else {
      return `animate(el, { y: -80 }, {
  type: spring,
  duration: ${this.duration()},
  bounce: ${this.bounce()}
})`;
    }
  });

  // Data for demos
  readonly stiffnessConfigs = signal([
    { label: 'Very Soft', value: 100 },
    { label: 'Soft', value: 200 },
    { label: 'Medium', value: 300 },
    { label: 'Stiff', value: 500 },
    { label: 'Very Stiff', value: 800 }
  ]);

  readonly dampingConfigs = signal([
    { label: 'Underdamped', value: 5, desc: 'Very bouncy' },
    { label: 'Low', value: 10, desc: 'Bouncy' },
    { label: 'Medium', value: 20, desc: 'Balanced' },
    { label: 'High', value: 35, desc: 'Smooth' },
    { label: 'Overdamped', value: 60, desc: 'No bounce' }
  ]);

  readonly bounceValues = signal([
    { label: 'No Bounce', value: 0 },
    { label: 'Subtle', value: 0.15 },
    { label: 'Moderate', value: 0.35 },
    { label: 'Bouncy', value: 0.6 },
    { label: 'Very Bouncy', value: 1 }
  ]);

  readonly springPresets = signal([
    {
      name: 'Snappy',
      icon: '⚡',
      config: { stiffness: 500, damping: 30 },
      configStr: 'stiffness: 500, damping: 30',
      useCase: 'Buttons, toggles'
    },
    {
      name: 'Smooth',
      icon: '🌊',
      config: { stiffness: 200, damping: 20 },
      configStr: 'stiffness: 200, damping: 20',
      useCase: 'Cards, modals'
    },
    {
      name: 'Bouncy',
      icon: '🎾',
      config: { stiffness: 400, damping: 10 },
      configStr: 'stiffness: 400, damping: 10',
      useCase: 'Notifications, badges'
    },
    {
      name: 'Gentle',
      icon: '🍃',
      config: { stiffness: 120, damping: 14 },
      configStr: 'stiffness: 120, damping: 14',
      useCase: 'Background elements'
    },
    {
      name: 'Wobbly',
      icon: '🫠',
      config: { stiffness: 180, damping: 8 },
      configStr: 'stiffness: 180, damping: 8',
      useCase: 'Playful UI, games'
    },
    {
      name: 'Stiff',
      icon: '🔩',
      config: { stiffness: 800, damping: 35 },
      configStr: 'stiffness: 800, damping: 35',
      useCase: 'Tooltips, fast feedback'
    }
  ]);

  readonly easingFunctions = signal([
    { name: 'linear', path: 'M 0 100 L 100 0' },
    { name: 'easeIn', path: 'M 0 100 Q 50 100 100 0' },
    { name: 'easeOut', path: 'M 0 100 Q 50 0 100 0' },
    { name: 'easeInOut', path: 'M 0 100 C 40 100 60 0 100 0' },
    { name: 'circOut', path: 'M 0 100 Q 0 0 100 0' },
    { name: 'backOut', path: 'M 0 100 C 20 -20 80 0 100 0' }
  ]);

  // Demo 1: Compare spring types
  compareSpringTypes(): void {
    const physics = this.physicsSpring()?.nativeElement;
    const duration = this.durationSpring()?.nativeElement;

    if (physics) {
      animate(physics, { x: 250 }, { type: spring, stiffness: 300, damping: 20 });
    }
    if (duration) {
      animate(duration, { x: 250 }, { type: spring, duration: 0.6, bounce: 0.3 } as any);
    }
  }

  resetComparison(): void {
    const physics = this.physicsSpring()?.nativeElement;
    const duration = this.durationSpring()?.nativeElement;
    if (physics) animate(physics, { x: 0 }, { duration: 0.3 });
    if (duration) animate(duration, { x: 0 }, { duration: 0.3 });
  }

  // Demo 2: Stiffness
  animateStiffnessDemo(): void {
    const boxes = document.querySelectorAll('.stiffness-box');
    boxes.forEach((box) => {
      const stiffness = parseInt(box.getAttribute('data-stiffness') || '300');
      animate(box, { x: 180 }, { type: spring, stiffness, damping: 20 });
    });
  }

  resetStiffnessDemo(): void {
    const boxes = document.querySelectorAll('.stiffness-box');
    boxes.forEach((box) => animate(box, { x: 0 }, { duration: 0.3 }));
  }

  // Demo 3: Damping
  animateDampingDemo(): void {
    const boxes = document.querySelectorAll('.damping-box');
    boxes.forEach((box) => {
      const damping = parseInt(box.getAttribute('data-damping') || '20');
      animate(box, { x: 180 }, { type: spring, stiffness: 300, damping });
    });
  }

  resetDampingDemo(): void {
    const boxes = document.querySelectorAll('.damping-box');
    boxes.forEach((box) => animate(box, { x: 0 }, { duration: 0.3 }));
  }

  // Demo 4: Mass
  animateMassDemo(): void {
    const light = this.massLight()?.nativeElement;
    const medium = this.massMedium()?.nativeElement;
    const heavy = this.massHeavy()?.nativeElement;

    if (light) animate(light, { x: 200 }, { type: spring, stiffness: 300, damping: 15, mass: 0.5 });
    if (medium) animate(medium, { x: 200 }, { type: spring, stiffness: 300, damping: 15, mass: 1 });
    if (heavy) animate(heavy, { x: 200 }, { type: spring, stiffness: 300, damping: 15, mass: 3 });
  }

  resetMassDemo(): void {
    const light = this.massLight()?.nativeElement;
    const medium = this.massMedium()?.nativeElement;
    const heavy = this.massHeavy()?.nativeElement;
    if (light) animate(light, { x: 0 }, { duration: 0.3 });
    if (medium) animate(medium, { x: 0 }, { duration: 0.3 });
    if (heavy) animate(heavy, { x: 0 }, { duration: 0.3 });
  }

  // Demo 5: Bounce
  animateBounceDemo(): void {
    const boxes = document.querySelectorAll('.bounce-box');
    boxes.forEach((box) => {
      const bounce = parseFloat(box.getAttribute('data-bounce') || '0.25');
      animate(box, { x: 180 }, { type: spring, duration: 0.6, bounce } as any);
    });
  }

  resetBounceDemo(): void {
    const boxes = document.querySelectorAll('.bounce-box');
    boxes.forEach((box) => animate(box, { x: 0 }, { duration: 0.3 }));
  }

  // Demo 6: Presets
  animatePreset(preset: { name: string; config: { stiffness: number; damping: number } }): void {
    const box = document.querySelector(`[data-preset="${preset.name}"]`);
    if (box) {
      animate(box, { x: [0, 50, 0] }, { type: spring, ...preset.config });
    }
  }

  animateAllPresets(): void {
    this.springPresets().forEach((preset, i) => {
      setTimeout(() => this.animatePreset(preset), i * 100);
    });
  }

  resetAllPresets(): void {
    const boxes = document.querySelectorAll('.preset-box');
    boxes.forEach((box) => animate(box, { x: 0 }, { duration: 0.2 }));
  }

  // Demo 7: Playground
  setPlaygroundMode(mode: 'physics' | 'duration'): void {
    this.playgroundMode.set(mode);
  }

  animatePlayground(): void {
    const el = this.playgroundBox()?.nativeElement;
    if (!el) return;

    if (this.playgroundMode() === 'physics') {
      animate(el, { y: -80 }, {
        type: spring,
        stiffness: this.stiffness(),
        damping: this.damping(),
        mass: this.mass()
      });
    } else {
      animate(el, { y: -80 }, {
        type: spring,
        duration: this.duration(),
        bounce: this.bounce()
      } as any);
    }
  }

  resetPlayground(): void {
    const el = this.playgroundBox()?.nativeElement;
    if (el) animate(el, { y: 0 }, { duration: 0.3 });
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.generatedCode());
    this.copyLabel.set('Copied!');
    setTimeout(() => this.copyLabel.set('Copy Code'), 2000);
  }

  // Demo 8: Easing
  animateAllEasing(): void {
    const boxes = document.querySelectorAll('.easing-box');
    const easings = ['linear', 'easeIn', 'easeOut', 'easeInOut', 'circOut', 'backOut'];

    boxes.forEach((box, i) => {
      animate(box, { x: 120 }, { duration: 1, ease: easings[i] as any });
    });
  }

  resetAllEasing(): void {
    const boxes = document.querySelectorAll('.easing-box');
    boxes.forEach((box) => animate(box, { x: 0 }, { duration: 0.3 }));
  }

  // @REVIEW - Added: Demo 6 - Velocity comparison
  animateVelocityDemo(): void {
    const zero = this.velocityZero()?.nativeElement;
    const low = this.velocityLow()?.nativeElement;
    const med = this.velocityMed()?.nativeElement;
    const high = this.velocityHigh()?.nativeElement;

    // All start from same position with same target, different initial velocities
    if (zero) animate(zero, { x: 200 }, { type: spring, velocity: 0, stiffness: 200, damping: 15 } as any);
    if (low) animate(low, { x: 200 }, { type: spring, velocity: 500, stiffness: 200, damping: 15 } as any);
    if (med) animate(med, { x: 200 }, { type: spring, velocity: 1000, stiffness: 200, damping: 15 } as any);
    if (high) animate(high, { x: 200 }, { type: spring, velocity: 2000, stiffness: 200, damping: 15 } as any);
  }

  resetVelocityDemo(): void {
    const zero = this.velocityZero()?.nativeElement;
    const low = this.velocityLow()?.nativeElement;
    const med = this.velocityMed()?.nativeElement;
    const high = this.velocityHigh()?.nativeElement;

    if (zero) animate(zero, { x: 0 }, { duration: 0.3 });
    if (low) animate(low, { x: 0 }, { duration: 0.3 });
    if (med) animate(med, { x: 0 }, { duration: 0.3 });
    if (high) animate(high, { x: 0 }, { duration: 0.3 });
  }

  // @REVIEW - Added: Demo 7 - Damping states comparison
  animateDampingStatesDemo(): void {
    const underdamped = this.underdampedBox()?.nativeElement;
    const critical = this.criticalBox()?.nativeElement;
    const overdamped = this.overdampedBox()?.nativeElement;

    // Underdamped: bouncy, oscillates
    if (underdamped) animate(underdamped, { x: 200 }, { type: spring, stiffness: 300, damping: 8 });

    // Critically damped: fastest settling, no overshoot (using duration-based with bounce: 0)
    if (critical) animate(critical, { x: 200 }, { type: spring, duration: 0.6, bounce: 0 } as any);

    // Overdamped: slow approach, no oscillation
    if (overdamped) animate(overdamped, { x: 200 }, { type: spring, stiffness: 300, damping: 60 });
  }

  resetDampingStatesDemo(): void {
    const underdamped = this.underdampedBox()?.nativeElement;
    const critical = this.criticalBox()?.nativeElement;
    const overdamped = this.overdampedBox()?.nativeElement;

    if (underdamped) animate(underdamped, { x: 0 }, { duration: 0.3 });
    if (critical) animate(critical, { x: 0 }, { duration: 0.3 });
    if (overdamped) animate(overdamped, { x: 0 }, { duration: 0.3 });
  }
}
