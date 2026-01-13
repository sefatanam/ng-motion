import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal, afterNextRender } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

/**
 * @REVIEW Chapter 9 Lesson 4 - Choreography & Layout Shifts
 * Natural spring physics - organic, fluid, alive
 */
@Component({
  selector: 'app-chapter9-lesson4',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      chapter="9"
      title="Choreography & Layout Shifts"
      description="Organic animations where components dance together. Spring physics create natural, connected motion.">

      <!-- Philosophy -->
      <section class="philosophy-section">
        <h2 class="philosophy-title">🌊 Natural Motion Principles</h2>
        <div class="philosophy-grid">
          <div class="philosophy-card">
            <span class="p-icon">⚡</span>
            <h4>Cause → Effect</h4>
            <p>When A moves, B responds. Same spring = same energy.</p>
          </div>
          <div class="philosophy-card">
            <span class="p-icon">🎾</span>
            <h4>Mass Matters</h4>
            <p>Heavier elements move slower. Light elements are snappy.</p>
          </div>
          <div class="philosophy-card">
            <span class="p-icon">🌊</span>
            <h4>Soft Landings</h4>
            <p>Low damping = overshoot. High damping = sluggish. Find the sweet spot.</p>
          </div>
          <div class="philosophy-card">
            <span class="p-icon">👁️</span>
            <h4>Lead the Eye</h4>
            <p>Stagger creates reading order. 30-50ms between elements.</p>
          </div>
        </div>
      </section>

      <!-- Demo 1: Search Expand -->
      <section class="demo-section">
        <h2 class="section-title">1. Expanding Search</h2>
        <p class="section-desc">Search grows, nav items yield with shared spring energy.</p>

        <div class="demo-area">
          <div class="nav-bar">
            <div class="nav-logo">◆ App</div>
            <div class="nav-center">
              <div #searchBox class="search-box">
                <input
                  #searchInput
                  type="text"
                  class="search-input"
                  placeholder="Search..."
                  (focus)="expandSearch()"
                  (blur)="collapseSearch()">
                <span class="search-icon">🔍</span>
              </div>
            </div>
            <div class="nav-actions">
              <button #btn1 class="nav-btn">Docs</button>
              <button #btn2 class="nav-btn">Help</button>
              <button #btn3 class="nav-btn primary">Sign In</button>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Shared spring = connected feel
const springConfig = {{ '{' }} stiffness: 200, damping: 20, mass: 1 {{ '}' }}
animate(search, {{ '{' }} width: 380 {{ '}' }}, springConfig)
animate(buttons, {{ '{' }} x: 40, opacity: 0.5 {{ '}' }}, springConfig)</pre>
        </div>
      </section>

      <!-- Demo 2: Sidebar Push -->
      <section class="demo-section">
        <h2 class="section-title">2. Sidebar Push</h2>
        <p class="section-desc">Sidebar expands, content shifts - no overlay, pure spatial dance.</p>

        <div class="demo-area demo-tall">
          <div class="push-layout">
            <div #sidebar class="push-sidebar" [class.open]="sidebarOpen()">
              <button class="toggle-btn" (click)="toggleSidebar()">
                {{ sidebarOpen() ? '◀' : '▶' }}
              </button>
              <div class="sidebar-items">
                @for (item of sidebarItems(); track item.id) {
                  <div class="sidebar-item">
                    <span class="item-icon">{{ item.icon }}</span>
                    @if (sidebarOpen()) {
                      <span #itemLabel class="item-label">{{ item.label }}</span>
                    }
                  </div>
                }
              </div>
            </div>
            <div #mainContent class="main-content">
              <h3>Dashboard</h3>
              <p>Content shifts smoothly with sidebar</p>
              <div class="cards-grid">
                <div class="card">Card 1</div>
                <div class="card">Card 2</div>
                <div class="card">Card 3</div>
                <div class="card">Card 4</div>
              </div>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Lower stiffness = smoother, more organic
animate(sidebar, {{ '{' }} width: 200 {{ '}' }}, {{ '{' }} stiffness: 180, damping: 22 {{ '}' }})
animate(content, {{ '{' }} x: 140 {{ '}' }}, {{ '{' }} stiffness: 180, damping: 22 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: Inline Form -->
      <section class="demo-section">
        <h2 class="section-title">3. Inline Form Expand</h2>
        <p class="section-desc">Form opens, list items flow down like water.</p>

        <div class="demo-area">
          <div class="task-container">
            <div class="task-header">
              <h4>Tasks</h4>
              <button class="add-btn" (click)="toggleForm()">
                {{ formOpen() ? '✕ Close' : '+ Add' }}
              </button>
            </div>

            @if (formOpen()) {
              <div #formPanel class="form-panel">
                <input type="text" placeholder="Task name..." class="form-input">
                <input type="text" placeholder="Due date..." class="form-input">
                <div class="form-btns">
                  <button class="cancel-btn" (click)="toggleForm()">Cancel</button>
                  <button class="save-btn" (click)="toggleForm()">Save</button>
                </div>
              </div>
            }

            <div class="task-list">
              @for (task of tasks(); track task.id; let i = $index) {
                <div #taskRow class="task-row" [attr.data-i]="i">
                  <span class="check">☐</span>
                  <span class="task-name">{{ task.name }}</span>
                  <span class="task-date">{{ task.date }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Soft spring for form, ripple effect on list
animate(form, {{ '{' }} height: 'auto', opacity: 1 {{ '}' }}, {{ '{' }} stiffness: 250, damping: 25 {{ '}' }})
// Each row gets slight delay - creates wave
rows.forEach((row, i) => animate(row, {{ '{' }} y: 8 {{ '}' }}, {{ '{' }} delay: i * 0.03 {{ '}' }}))</pre>
        </div>
      </section>

      <!-- Demo 4: Card Selection -->
      <section class="demo-section">
        <h2 class="section-title">4. Card Selection Morph</h2>
        <p class="section-desc">Selected grows, others shrink - spatial balance preserved.</p>

        <div class="demo-area">
          <div class="select-cards">
            @for (card of selectCards(); track card.id) {
              <div
                #selectCardDiv
                class="select-card"
                [class.selected]="selectedId() === card.id"
                [class.dimmed]="selectedId() !== null && selectedId() !== card.id"
                [attr.data-id]="card.id"
                (click)="selectCard(card.id)">
                <span class="card-icon">{{ card.icon }}</span>
                <span class="card-title">{{ card.title }}</span>
                @if (selectedId() === card.id) {
                  <p class="card-desc">{{ card.desc }}</p>
                  <button class="card-btn">Learn More →</button>
                }
              </div>
            }
          </div>
          <button class="reset-btn" (click)="selectCard(null)">Reset</button>
        </div>

        <div class="code-block">
          <pre>// Selected lifts up, others sink down - creates depth
animate(selected, {{ '{' }} scale: 1.08, y: -12 {{ '}' }}, {{ '{' }} stiffness: 300, damping: 20 {{ '}' }})
animate(others, {{ '{' }} scale: 0.92, opacity: 0.4 {{ '}' }}, {{ '{' }} stiffness: 300, damping: 20 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 5: Split Pane -->
      <section class="demo-section">
        <h2 class="section-title">5. Split Pane Snap</h2>
        <p class="section-desc">Drag freely, release snaps to preset with satisfying bounce.</p>

        <div class="demo-area demo-tall">
          <div class="split-view">
            <div #leftPane class="left-pane">
              <div class="pane-title">Explorer</div>
              <div class="file">📁 src</div>
              <div class="file">📁 components</div>
              <div class="file">📄 app.ts</div>
            </div>
            <div
              class="divider"
              (mousedown)="startDrag($event)">
              <div class="divider-grip"></div>
            </div>
            <div class="right-pane">
              <div class="pane-title">Editor</div>
              <code>import {{ '{' }} Component {{ '}' }} from '&#64;angular/core';</code>
            </div>
          </div>
          <div class="presets">
            <button (click)="snapTo(25)">25%</button>
            <button (click)="snapTo(50)">50%</button>
            <button (click)="snapTo(75)">75%</button>
          </div>
        </div>

        <div class="code-block">
          <pre>// High stiffness + medium damping = snappy but not harsh
animate(leftPane, {{ '{' }} width: '25%' {{ '}' }}, {{ '{' }} stiffness: 400, damping: 28 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 6: Cascade Reveal -->
      <section class="demo-section">
        <h2 class="section-title">6. Attention Cascade</h2>
        <p class="section-desc">Choreographed sequence guides eye: title → body → features → action.</p>

        <div class="demo-area">
          <div class="cascade-box">
            <h3 #cTitle class="c-title">New Feature</h3>
            <p #cBody class="c-body">Experience the most powerful update yet.</p>
            <div class="c-badges">
              @for (f of features(); track f.id; let i = $index) {
                <span #cBadge class="c-badge" [attr.data-i]="i">{{ f.icon }} {{ f.label }}</span>
              }
            </div>
            <button #cBtn class="c-btn">Get Started →</button>
          </div>
          <button class="replay-btn" (click)="playCascade()">▶ Replay</button>
        </div>

        <div class="code-block">
          <pre>// Orchestrated sequence with natural timing
await animate(title, {{ '{' }} y: 0, opacity: 1 {{ '}' }}, {{ '{' }} stiffness: 200, damping: 18 {{ '}' }})
await animate(body, {{ '{' }} y: 0, opacity: 1 {{ '}' }}, {{ '{' }} stiffness: 200, damping: 18 {{ '}' }})
badges.forEach((b, i) => animate(b, {{ '{' }} scale: 1 {{ '}' }}, {{ '{' }} delay: i * 0.04 {{ '}' }}))</pre>
        </div>
      </section>

      <!-- Demo 7: State Morph -->
      <section class="demo-section">
        <h2 class="section-title">7. State Morph Container</h2>
        <p class="section-desc">Single container transforms between states - size, shape, content as one.</p>

        <div class="demo-area">
          <div
            #morphBox
            class="morph-box"
            [attr.data-state]="morphState()">
            @switch (morphState()) {
              @case ('idle') {
                <span>📤 Upload</span>
              }
              @case ('loading') {
                <div class="spinner"></div>
                <span>Uploading...</span>
              }
              @case ('success') {
                <span>✓ Done!</span>
              }
              @case ('detail') {
                <div class="detail-view">
                  <span class="file-ico">📄</span>
                  <div class="file-meta">
                    <strong>document.pdf</strong>
                    <small>2.4 MB</small>
                  </div>
                  <button class="view-btn">View</button>
                </div>
              }
            }
          </div>
          <div class="morph-btns">
            <button (click)="setMorph('idle')">Idle</button>
            <button (click)="setMorph('loading')">Loading</button>
            <button (click)="setMorph('success')">Success</button>
            <button (click)="setMorph('detail')">Detail</button>
            <button class="auto-btn" (click)="autoMorph()">▶ Auto</button>
          </div>
        </div>

        <div class="code-block">
          <pre>// Unified spring for all properties = cohesive morph
animate(box, {{ '{' }}
  width: sizes[state].w,
  height: sizes[state].h,
  borderRadius: sizes[state].r
{{ '}' }}, {{ '{' }} stiffness: 280, damping: 24 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 8: Notification Panel -->
      <section class="demo-section">
        <h2 class="section-title">8. Notification Expand</h2>
        <p class="section-desc">Badge morphs into panel, items cascade in with wave effect.</p>

        <div class="demo-area">
          <div class="notif-demo">
            <div class="demo-bar">
              <span>Dashboard</span>
              <div class="bar-actions">
                <div class="notif-wrap">
                  <button #notifBtn class="notif-btn" (click)="toggleNotif()">
                    🔔
                    @if (!notifOpen()) {
                      <span class="badge">3</span>
                    }
                  </button>
                  @if (notifOpen()) {
                    <div #notifPanel class="notif-panel">
                      <div class="notif-head">
                        <span>Notifications</span>
                        <button>Mark read</button>
                      </div>
                      @for (n of notifs(); track n.id; let i = $index) {
                        <div #notifRow class="notif-row" [attr.data-i]="i">
                          <span class="n-icon">{{ n.icon }}</span>
                          <div class="n-text">
                            <span>{{ n.title }}</span>
                            <small>{{ n.time }}</small>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
                <div class="avatar">JD</div>
              </div>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>// Panel scales from badge origin, items wave in
animate(panel, {{ '{' }} scale: [0.8, 1], opacity: [0, 1] {{ '}' }}, {{ '{' }} stiffness: 350, damping: 25 {{ '}' }})
items.forEach((item, i) =>
  animate(item, {{ '{' }} x: [−20, 0], opacity: [0, 1] {{ '}' }}, {{ '{' }} delay: 0.02 + i * 0.03 {{ '}' }})
)</pre>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2>📋 Spring Tuning Guide</h2>
        <div class="tune-grid">
          <div class="tune-item">
            <h4>🧈 Buttery Smooth</h4>
            <code>stiffness: 150, damping: 15</code>
            <p>Slow, gentle, luxurious</p>
          </div>
          <div class="tune-item">
            <h4>🎯 Responsive</h4>
            <code>stiffness: 250, damping: 22</code>
            <p>Quick but not harsh</p>
          </div>
          <div class="tune-item">
            <h4>⚡ Snappy</h4>
            <code>stiffness: 400, damping: 28</code>
            <p>Fast, minimal overshoot</p>
          </div>
          <div class="tune-item">
            <h4>🎾 Bouncy</h4>
            <code>stiffness: 300, damping: 12</code>
            <p>Playful, overshoots</p>
          </div>
        </div>
      </section>
    </app-lesson-layout>
  `,
  styles: [`
    /* Remove all CSS transitions - let Motion handle everything */
    * {
      transition: none !important;
    }

    .philosophy-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 28px;
    }

    .philosophy-title {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 20px;
    }

    .philosophy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
    }

    .philosophy-card {
      background: var(--bg-tertiary);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }

    .p-icon {
      font-size: 28px;
      display: block;
      margin-bottom: 8px;
    }

    .philosophy-card h4 {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--accent-primary);
    }

    .philosophy-card p {
      font-size: 11px;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    .demo-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 24px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .section-desc {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .demo-area {
      background: var(--bg-tertiary);
      border-radius: 12px;
      padding: 20px;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .demo-tall {
      min-height: 280px;
    }

    .code-block {
      background: var(--bg-tertiary);
      border-radius: 8px;
      padding: 14px;
      font-family: 'SF Mono', monospace;
      font-size: 12px;
      color: var(--text-secondary);
      overflow-x: auto;
    }

    .code-block pre { margin: 0; }

    /* Demo 1: Search */
    .nav-bar {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      background: var(--bg-secondary);
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }

    .nav-logo {
      font-weight: 600;
      color: var(--accent-primary);
    }

    .nav-center { flex: 1; display: flex; justify-content: center; }

    .search-box {
      position: relative;
      width: 180px;
    }

    .search-input {
      width: 100%;
      padding: 8px 36px 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      background: var(--bg-tertiary);
      color: var(--text-primary);
      font-size: 13px;
      outline: none;
    }

    .search-input:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px var(--accent-glow);
    }

    .search-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
    }

    .nav-actions { display: flex; gap: 6px; }

    .nav-btn {
      padding: 6px 12px;
      border-radius: 5px;
      font-size: 12px;
      background: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      cursor: pointer;
    }

    .nav-btn.primary {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }

    /* Demo 2: Sidebar */
    .push-layout {
      width: 100%;
      height: 240px;
      display: flex;
      background: var(--bg-primary);
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .push-sidebar {
      width: 56px;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
    }

    .toggle-btn {
      padding: 12px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 12px;
      color: var(--text-secondary);
    }

    .sidebar-items {
      display: flex;
      flex-direction: column;
      padding: 6px;
      gap: 2px;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
    }

    .sidebar-item:hover { background: var(--bg-hover); }

    .item-icon { font-size: 16px; }
    .item-label { font-size: 13px; white-space: nowrap; }

    .main-content {
      flex: 1;
      padding: 16px;
    }

    .main-content h3 { font-size: 16px; margin-bottom: 4px; }
    .main-content p { font-size: 12px; color: var(--text-secondary); margin-bottom: 12px; }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .card {
      padding: 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 12px;
      text-align: center;
      color: var(--text-secondary);
    }

    /* Demo 3: Inline Form */
    .task-container {
      width: 100%;
      max-width: 420px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
    }

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
    }

    .task-header h4 { font-size: 14px; }

    .add-btn {
      padding: 5px 12px;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
    }

    .form-panel {
      padding: 14px 16px;
      background: var(--accent-glow);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: hidden;
    }

    .form-input {
      padding: 8px 12px;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 13px;
    }

    .form-btns { display: flex; gap: 6px; justify-content: flex-end; }

    .cancel-btn, .save-btn {
      padding: 6px 14px;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
    }

    .cancel-btn {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
    }

    .save-btn {
      background: var(--accent-primary);
      border: none;
      color: white;
    }

    .task-list { display: flex; flex-direction: column; }

    .task-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
    }

    .task-row:last-child { border-bottom: none; }

    .check { font-size: 14px; color: var(--text-tertiary); }
    .task-name { flex: 1; font-size: 13px; }
    .task-date { font-size: 11px; color: var(--text-tertiary); }

    /* Demo 4: Card Selection */
    .select-cards {
      display: flex;
      gap: 14px;
      justify-content: center;
    }

    .select-card {
      width: 140px;
      padding: 20px;
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      border-radius: 14px;
      text-align: center;
      cursor: pointer;
    }

    .select-card.selected {
      border-color: var(--accent-primary);
      background: var(--accent-glow);
    }

    .card-icon { font-size: 32px; display: block; margin-bottom: 8px; }
    .card-title { font-size: 13px; font-weight: 600; }

    .card-desc {
      font-size: 11px;
      color: var(--text-secondary);
      margin: 12px 0;
      line-height: 1.4;
    }

    .card-btn {
      padding: 6px 14px;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 11px;
      cursor: pointer;
    }

    .reset-btn {
      padding: 6px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-primary);
    }

    /* Demo 5: Split */
    .split-view {
      width: 100%;
      height: 200px;
      display: flex;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      overflow: hidden;
    }

    .left-pane {
      width: 50%;
      border-right: none;
      display: flex;
      flex-direction: column;
    }

    .right-pane {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .pane-title {
      padding: 10px 14px;
      font-size: 12px;
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
      background: var(--bg-secondary);
    }

    .file {
      padding: 6px 14px;
      font-size: 12px;
      cursor: pointer;
    }

    .file:hover { background: var(--bg-hover); }

    .right-pane code {
      padding: 14px;
      font-size: 11px;
      color: var(--text-secondary);
    }

    .divider {
      width: 6px;
      background: var(--border-color);
      cursor: col-resize;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .divider:hover { background: var(--accent-primary); }

    .divider-grip {
      width: 3px;
      height: 30px;
      background: var(--bg-secondary);
      border-radius: 2px;
    }

    .presets {
      display: flex;
      gap: 6px;
      margin-top: 10px;
    }

    .presets button {
      padding: 6px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-primary);
    }

    .presets button:hover {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }

    /* Demo 6: Cascade */
    .cascade-box {
      width: 100%;
      max-width: 340px;
      padding: 28px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      text-align: center;
    }

    .c-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .c-body {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .c-badges {
      display: flex;
      gap: 6px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .c-badge {
      padding: 6px 12px;
      background: var(--bg-tertiary);
      border-radius: 16px;
      font-size: 11px;
    }

    .c-btn {
      padding: 10px 24px;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
    }

    .replay-btn {
      margin-top: 12px;
      padding: 6px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-primary);
    }

    /* Demo 7: State Morph */
    .morph-box {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
    }

    .morph-box[data-state="idle"] {
      width: 140px;
      height: 50px;
      border-radius: 10px;
      cursor: pointer;
    }

    .morph-box[data-state="loading"] {
      width: 160px;
      height: 50px;
      border-radius: 10px;
      border-color: var(--accent-primary);
    }

    .morph-box[data-state="success"] {
      width: 120px;
      height: 50px;
      border-radius: 25px;
      background: #22c55e;
      border-color: #22c55e;
      color: white;
    }

    .morph-box[data-state="detail"] {
      width: 280px;
      height: 80px;
      border-radius: 12px;
      border-color: var(--accent-primary);
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid var(--border-color);
      border-top-color: var(--accent-primary);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .detail-view {
      width: 100%;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .file-ico { font-size: 24px; }

    .file-meta {
      flex: 1;
      text-align: left;
    }

    .file-meta strong { display: block; font-size: 13px; }
    .file-meta small { font-size: 11px; color: var(--text-secondary); }

    .view-btn {
      padding: 5px 12px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 11px;
      cursor: pointer;
      color: var(--text-primary);
    }

    .morph-btns {
      display: flex;
      gap: 6px;
      margin-top: 16px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .morph-btns button {
      padding: 6px 14px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      color: var(--text-primary);
    }

    .auto-btn {
      background: var(--accent-primary) !important;
      border-color: var(--accent-primary) !important;
      color: white !important;
    }

    /* Demo 8: Notification */
    .notif-demo {
      width: 100%;
      max-width: 420px;
    }

    .demo-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
    }

    .bar-actions { display: flex; align-items: center; gap: 14px; }

    .notif-wrap { position: relative; }

    .notif-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      cursor: pointer;
      position: relative;
      font-size: 16px;
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      background: #ef4444;
      color: white;
      font-size: 10px;
      font-weight: 600;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .notif-panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 260px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.12);
      overflow: hidden;
      z-index: 100;
    }

    .notif-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-color);
      font-size: 13px;
      font-weight: 600;
    }

    .notif-head button {
      font-size: 11px;
      color: var(--accent-primary);
      background: none;
      border: none;
      cursor: pointer;
    }

    .notif-row {
      display: flex;
      gap: 10px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-color);
    }

    .notif-row:last-child { border-bottom: none; }
    .notif-row:hover { background: var(--bg-hover); }

    .n-icon { font-size: 18px; }

    .n-text { display: flex; flex-direction: column; gap: 2px; }
    .n-text span { font-size: 12px; }
    .n-text small { font-size: 10px; color: var(--text-tertiary); }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-primary);
      color: white;
      font-size: 11px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Cheat Sheet */
    .cheat-sheet {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 24px;
    }

    .cheat-sheet h2 {
      font-size: 16px;
      margin-bottom: 16px;
    }

    .tune-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    }

    .tune-item {
      background: var(--bg-tertiary);
      padding: 16px;
      border-radius: 10px;
    }

    .tune-item h4 { font-size: 13px; margin-bottom: 8px; }

    .tune-item code {
      display: block;
      padding: 8px 10px;
      background: var(--bg-secondary);
      border-radius: 5px;
      font-size: 11px;
      color: var(--accent-primary);
      margin-bottom: 8px;
    }

    .tune-item p {
      font-size: 11px;
      color: var(--text-secondary);
    }
  `]
})
export class Chapter9Lesson4 {
  // Refs
  readonly searchBox = viewChild<ElementRef<HTMLElement>>('searchBox');
  readonly btn1 = viewChild<ElementRef<HTMLElement>>('btn1');
  readonly btn2 = viewChild<ElementRef<HTMLElement>>('btn2');
  readonly btn3 = viewChild<ElementRef<HTMLElement>>('btn3');
  readonly sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');
  readonly mainContent = viewChild<ElementRef<HTMLElement>>('mainContent');
  readonly formPanel = viewChild<ElementRef<HTMLElement>>('formPanel');
  readonly leftPane = viewChild<ElementRef<HTMLElement>>('leftPane');
  readonly morphBox = viewChild<ElementRef<HTMLElement>>('morphBox');
  readonly cTitle = viewChild<ElementRef<HTMLElement>>('cTitle');
  readonly cBody = viewChild<ElementRef<HTMLElement>>('cBody');
  readonly cBtn = viewChild<ElementRef<HTMLElement>>('cBtn');
  readonly notifPanel = viewChild<ElementRef<HTMLElement>>('notifPanel');

  // State
  readonly sidebarOpen = signal(false);
  readonly formOpen = signal(false);
  readonly selectedId = signal<number | null>(null);
  readonly morphState = signal<'idle' | 'loading' | 'success' | 'detail'>('idle');
  readonly notifOpen = signal(false);

  // Data
  readonly sidebarItems = signal([
    { id: 1, icon: '📊', label: 'Dashboard' },
    { id: 2, icon: '📁', label: 'Projects' },
    { id: 3, icon: '👥', label: 'Team' },
    { id: 4, icon: '⚙️', label: 'Settings' }
  ]);

  readonly tasks = signal([
    { id: 1, name: 'Review pull request', date: 'Today' },
    { id: 2, name: 'Update documentation', date: 'Tomorrow' },
    { id: 3, name: 'Deploy to production', date: 'Friday' }
  ]);

  readonly selectCards = signal([
    { id: 1, icon: '🚀', title: 'Fast', desc: 'Blazing fast performance.' },
    { id: 2, icon: '🎨', title: 'Beautiful', desc: 'Stunning animations.' },
    { id: 3, icon: '🔒', title: 'Secure', desc: 'Enterprise security.' }
  ]);

  readonly features = signal([
    { id: 1, icon: '⚡', label: 'Fast' },
    { id: 2, icon: '🎯', label: 'Precise' },
    { id: 3, icon: '🔄', label: 'Auto' }
  ]);

  readonly notifs = signal([
    { id: 1, icon: '📬', title: 'New message', time: '2m ago' },
    { id: 2, icon: '✅', title: 'Task done', time: '1h ago' },
    { id: 3, icon: '🎉', title: 'Welcome!', time: 'Yesterday' }
  ]);

  constructor() {
    afterNextRender(() => {
      this.playCascade();
    });
  }

  // Demo 1: Search
  expandSearch(): void {
    const box = this.searchBox()?.nativeElement;
    const btns = [this.btn1()?.nativeElement, this.btn2()?.nativeElement, this.btn3()?.nativeElement];

    // Same spring for connected feel
    const cfg = { type: spring, stiffness: 200, damping: 20, mass: 1 };

    if (box) animate(box, { width: '380px' }, cfg);

    btns.forEach((btn, i) => {
      if (btn) animate(btn, { x: 40, opacity: 0.5 }, { ...cfg, delay: i * 0.02 });
    });
  }

  collapseSearch(): void {
    const box = this.searchBox()?.nativeElement;
    const btns = [this.btn1()?.nativeElement, this.btn2()?.nativeElement, this.btn3()?.nativeElement];

    const cfg = { type: spring, stiffness: 200, damping: 20, mass: 1 };

    if (box) animate(box, { width: '180px' }, cfg);

    btns.forEach((btn, i) => {
      if (btn) animate(btn, { x: 0, opacity: 1 }, { ...cfg, delay: i * 0.02 });
    });
  }

  // Demo 2: Sidebar
  toggleSidebar(): void {
    const open = !this.sidebarOpen();
    this.sidebarOpen.set(open);

    const sb = this.sidebar()?.nativeElement;
    const mc = this.mainContent()?.nativeElement;

    // Lower stiffness = more organic
    const cfg = { type: spring, stiffness: 180, damping: 22 };

    if (sb) animate(sb, { width: open ? '200px' : '56px' }, cfg);
    if (mc) animate(mc, { x: open ? 0 : 0 }, cfg); // Content stays, sidebar pushes

    // Fade in labels with wave
    if (open) {
      requestAnimationFrame(() => {
        const labels = document.querySelectorAll('.item-label');
        labels.forEach((label, i) => {
          animate(label as HTMLElement, { opacity: [0, 1], x: [-8, 0] }, {
            type: spring,
            stiffness: 200,
            damping: 18,
            delay: i * 0.04
          });
        });
      });
    }
  }

  // Demo 3: Form
  toggleForm(): void {
    const wasOpen = this.formOpen();
    this.formOpen.set(!wasOpen);

    if (!wasOpen) {
      // Opening - animate form then ripple list
      requestAnimationFrame(() => {
        const form = this.formPanel()?.nativeElement;
        const rows = document.querySelectorAll('.task-row');

        if (form) {
          form.style.opacity = '0';
          form.style.height = '0px';
          const h = form.scrollHeight;

          animate(form, { height: `${h}px`, opacity: 1 }, {
            type: spring,
            stiffness: 250,
            damping: 25
          }).finished.then(() => {
            form.style.height = 'auto';
          });
        }

        // Ripple effect on list - subtle y bounce
        rows.forEach((row, i) => {
          animate(row as HTMLElement, { y: [0, 6, 0] }, {
            type: spring,
            stiffness: 200,
            damping: 15,
            delay: i * 0.03
          });
        });
      });
    }
  }

  // Demo 4: Card Selection
  selectCard(id: number | null): void {
    const wasSelected = this.selectedId() === id;
    this.selectedId.set(wasSelected ? null : id);

    const cards = document.querySelectorAll('.select-card');
    cards.forEach(card => {
      const cardId = parseInt(card.getAttribute('data-id') || '0');
      const el = card as HTMLElement;

      if (wasSelected || id === null) {
        // Reset all
        animate(el, { scale: 1, y: 0, opacity: 1 }, {
          type: spring, stiffness: 300, damping: 22
        });
      } else if (cardId === id) {
        // Selected rises
        animate(el, { scale: 1.08, y: -12 }, {
          type: spring, stiffness: 300, damping: 20
        });
      } else {
        // Others sink
        animate(el, { scale: 0.92, opacity: 0.4 }, {
          type: spring, stiffness: 300, damping: 22
        });
      }
    });
  }

  // Demo 5: Split Pane
  startDrag(e: MouseEvent): void {
    const startX = e.clientX;
    const left = this.leftPane()?.nativeElement;
    const container = document.querySelector('.split-view') as HTMLElement;
    if (!left || !container) return;

    const startW = left.offsetWidth;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX;
      const cw = container.offsetWidth;
      const newW = Math.max(80, Math.min(cw - 80, startW + delta));
      left.style.width = `${(newW / cw) * 100}%`;
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  snapTo(pct: number): void {
    const left = this.leftPane()?.nativeElement;
    if (left) {
      animate(left, { width: `${pct}%` }, {
        type: spring, stiffness: 400, damping: 28
      });
    }
  }

  // Demo 6: Cascade
  async playCascade(): Promise<void> {
    const title = this.cTitle()?.nativeElement;
    const body = this.cBody()?.nativeElement;
    const badges = document.querySelectorAll('.c-badge');
    const btn = this.cBtn()?.nativeElement;

    // Reset
    [title, body, btn].forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
      }
    });
    badges.forEach(b => {
      (b as HTMLElement).style.opacity = '0';
      (b as HTMLElement).style.transform = 'scale(0.8)';
    });

    await new Promise(r => setTimeout(r, 150));

    // Title
    if (title) {
      await animate(title, { opacity: 1, y: 0 }, {
        type: spring, stiffness: 200, damping: 18
      }).finished;
    }

    // Body
    if (body) {
      await animate(body, { opacity: 1, y: 0 }, {
        type: spring, stiffness: 200, damping: 18
      }).finished;
    }

    // Badges wave
    badges.forEach((badge, i) => {
      animate(badge as HTMLElement, { opacity: 1, scale: 1 }, {
        type: spring, stiffness: 300, damping: 18,
        delay: i * 0.04
      });
    });

    await new Promise(r => setTimeout(r, badges.length * 40 + 80));

    // Button
    if (btn) {
      animate(btn, { opacity: 1, y: 0 }, {
        type: spring, stiffness: 200, damping: 18
      });
    }
  }

  // Demo 7: Morph
  setMorph(state: 'idle' | 'loading' | 'success' | 'detail'): void {
    const box = this.morphBox()?.nativeElement;
    if (!box) return;

    const sizes = {
      idle: { width: '140px', height: '50px', borderRadius: '10px' },
      loading: { width: '160px', height: '50px', borderRadius: '10px' },
      success: { width: '120px', height: '50px', borderRadius: '25px' },
      detail: { width: '280px', height: '80px', borderRadius: '12px' }
    };

    this.morphState.set(state);

    animate(box, sizes[state], {
      type: spring, stiffness: 280, damping: 24
    });
  }

  async autoMorph(): Promise<void> {
    this.setMorph('idle');
    await new Promise(r => setTimeout(r, 600));
    this.setMorph('loading');
    await new Promise(r => setTimeout(r, 1200));
    this.setMorph('success');
    await new Promise(r => setTimeout(r, 800));
    this.setMorph('detail');
  }

  // Demo 8: Notification
  toggleNotif(): void {
    const open = !this.notifOpen();
    this.notifOpen.set(open);

    if (open) {
      requestAnimationFrame(() => {
        const panel = this.notifPanel()?.nativeElement;
        const rows = document.querySelectorAll('.notif-row');

        if (panel) {
          animate(panel, { scale: [0.85, 1], opacity: [0, 1] }, {
            type: spring, stiffness: 350, damping: 25
          });
        }

        rows.forEach((row, i) => {
          animate(row as HTMLElement, { x: [-16, 0], opacity: [0, 1] }, {
            type: spring, stiffness: 280, damping: 22,
            delay: 0.03 + i * 0.035
          });
        });
      });
    }
  }
}
