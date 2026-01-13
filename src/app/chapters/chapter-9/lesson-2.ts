import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

/**
 * @REVIEW Chapter 9 Lesson 2 - Hover & Focus States
 * Hover effects that make dashboards feel responsive and interactive
 */
@Component({
  selector: 'app-chapter9-lesson2',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      chapter="9"
      title="Hover & Focus States"
      description="Hover effects that make dashboards feel responsive and interactive. Subtle animations that guide user attention.">

      <!-- Demo 1: Card Lift Effect -->
      <section class="demo-section">
        <h2 class="section-title">1. Card Lift Effect</h2>
        <p class="section-desc">Cards that lift on hover with shadow transition.</p>

        <div class="demo-area cards-grid">
          <div #card1 class="stat-card" (mouseenter)="onCardHover($event, true)" (mouseleave)="onCardHover($event, false)">
            <div class="stat-value">1,234</div>
            <div class="stat-label">Total Users</div>
          </div>
          <div #card2 class="stat-card" (mouseenter)="onCardHover($event, true)" (mouseleave)="onCardHover($event, false)">
            <div class="stat-value">$12.5k</div>
            <div class="stat-label">Revenue</div>
          </div>
          <div #card3 class="stat-card" (mouseenter)="onCardHover($event, true)" (mouseleave)="onCardHover($event, false)">
            <div class="stat-value">98.2%</div>
            <div class="stat-label">Uptime</div>
          </div>
        </div>

        <div class="code-block">
          <pre>animate(card, {{ '{' }} y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' {{ '}' }}, {{ '{' }} duration: 0.2 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Card Glow Border -->
      <section class="demo-section">
        <h2 class="section-title">2. Card Glow Border on Hover</h2>
        <p class="section-desc">Accent border that glows on hover for emphasis.</p>

        <div class="demo-area cards-grid">
          <div #glowCard1 class="glow-card" (mouseenter)="onGlowCardHover($event, true)" (mouseleave)="onGlowCardHover($event, false)">
            <div class="card-icon">📊</div>
            <div class="card-title">Analytics</div>
            <div class="card-desc">View your insights</div>
          </div>
          <div #glowCard2 class="glow-card" (mouseenter)="onGlowCardHover($event, true)" (mouseleave)="onGlowCardHover($event, false)">
            <div class="card-icon">⚙️</div>
            <div class="card-title">Settings</div>
            <div class="card-desc">Configure system</div>
          </div>
        </div>

        <div class="code-block">
          <pre>animate(card, {{ '{' }} borderColor: 'var(--accent-primary)' {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: Table Row Highlight -->
      <section class="demo-section">
        <h2 class="section-title">3. Table Row Highlight with Slide Indicator</h2>
        <p class="section-desc">Table row highlight with animated side indicator.</p>

        <div class="demo-area">
          <div class="data-table">
            @for (row of tableData(); track row.id) {
              <div #tableRow class="table-row" [attr.data-id]="row.id"
                   (mouseenter)="onRowHover($event, true)"
                   (mouseleave)="onRowHover($event, false)">
                <div #rowIndicator class="row-indicator"></div>
                <div class="row-cell">{{ row.name }}</div>
                <div class="row-cell">{{ row.status }}</div>
                <div class="row-cell">{{ row.value }}</div>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>animate(indicator, {{ '{' }} scaleY: [0, 1], opacity: [0, 1] {{ '}' }}, {{ '{' }} duration: 0.2 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 4: Sidebar Menu Item -->
      <section class="demo-section">
        <h2 class="section-title">4. Sidebar Menu Item Hover</h2>
        <p class="section-desc">Background slide effect for navigation menus.</p>

        <div class="demo-area">
          <div class="sidebar-menu">
            @for (item of menuItems(); track item.id) {
              <div #menuItem class="menu-item" [attr.data-id]="item.id"
                   (mouseenter)="onMenuHover($event, true)"
                   (mouseleave)="onMenuHover($event, false)">
                <div #menuBg class="menu-bg"></div>
                <span class="menu-icon">{{ item.icon }}</span>
                <span class="menu-label">{{ item.label }}</span>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>animate(bg, {{ '{' }} scaleX: [0, 1] {{ '}' }}, {{ '{' }} duration: 0.3, easing: [0.4, 0, 0.2, 1] {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 5: Icon Hover Rotation/Bounce -->
      <section class="demo-section">
        <h2 class="section-title">5. Icon Hover Rotation/Bounce</h2>
        <p class="section-desc">Playful icon animations that respond to hover.</p>

        <div class="demo-area icon-grid">
          <div #iconBox1 class="icon-box" (mouseenter)="onIconHover($event, 'rotate')" (mouseleave)="onIconLeave($event)">
            <span class="hover-icon">🔔</span>
            <span class="icon-label">Notifications</span>
          </div>
          <div #iconBox2 class="icon-box" (mouseenter)="onIconHover($event, 'bounce')" (mouseleave)="onIconLeave($event)">
            <span class="hover-icon">❤️</span>
            <span class="icon-label">Favorites</span>
          </div>
          <div #iconBox3 class="icon-box" (mouseenter)="onIconHover($event, 'scale')" (mouseleave)="onIconLeave($event)">
            <span class="hover-icon">⭐</span>
            <span class="icon-label">Premium</span>
          </div>
        </div>

        <div class="code-block">
          <pre>// Rotate: rotate: 15deg | Bounce: y: -8px | Scale: scale: 1.2</pre>
        </div>
      </section>

      <!-- Demo 6: Avatar Hover Reveal -->
      <section class="demo-section">
        <h2 class="section-title">6. Avatar Hover Reveal</h2>
        <p class="section-desc">Show user name tooltip on avatar hover.</p>

        <div class="demo-area avatars-row">
          @for (user of users(); track user.id) {
            <div class="avatar-wrapper" (mouseenter)="onAvatarHover(user.id, true)" (mouseleave)="onAvatarHover(user.id, false)">
              <div #avatar class="avatar" [attr.data-id]="user.id">
                {{ user.initials }}
              </div>
              @if (hoveredAvatar() === user.id) {
                <div #avatarTooltip class="avatar-tooltip">
                  {{ user.name }}
                </div>
              }
            </div>
          }
        </div>

        <div class="code-block">
          <pre>animate(tooltip, {{ '{' }} opacity: [0, 1], y: [-8, 0] {{ '}' }}, {{ '{' }} duration: 0.2 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 7: Action Button Hover Expand -->
      <section class="demo-section">
        <h2 class="section-title">7. Action Button Hover Expand</h2>
        <p class="section-desc">Icon-only button that expands to show text on hover.</p>

        <div class="demo-area action-buttons">
          @for (action of actions(); track action.id) {
            <div #actionBtn class="action-btn" [attr.data-id]="action.id"
                 (mouseenter)="onActionHover(action.id, true)"
                 (mouseleave)="onActionHover(action.id, false)">
              <span class="action-icon">{{ action.icon }}</span>
              @if (expandedAction() === action.id) {
                <span #actionText class="action-text">{{ action.label }}</span>
              }
            </div>
          }
        </div>

        <div class="code-block">
          <pre>animate(text, {{ '{' }} width: [0, 'auto'], opacity: [0, 1] {{ '}' }}, {{ '{' }} duration: 0.2 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 8: Input Focus Glow -->
      <section class="demo-section">
        <h2 class="section-title">8. Input Focus Glow Animation</h2>
        <p class="section-desc">Input fields with glowing border on focus.</p>

        <div class="demo-area inputs-stack">
          <div class="input-wrapper">
            <label class="input-label">Email</label>
            <input #emailInput type="email" class="glow-input" placeholder="Enter your email"
                   (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
          </div>
          <div class="input-wrapper">
            <label class="input-label">Password</label>
            <input #passwordInput type="password" class="glow-input" placeholder="Enter password"
                   (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
          </div>
        </div>

        <div class="code-block">
          <pre>animate(input, {{ '{' }} borderColor: 'var(--accent-primary)', boxShadow: '0 0 0 3px var(--accent-glow)' {{ '}' }})</pre>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2 class="section-title">📋 Hover Effects Cheat Sheet</h2>
        <div class="cheat-grid">
          <div class="cheat-item">
            <h4>Card Lift</h4>
            <code>y: -8px + shadow</code>
          </div>
          <div class="cheat-item">
            <h4>Glow Border</h4>
            <code>borderColor transition</code>
          </div>
          <div class="cheat-item">
            <h4>Slide Indicator</h4>
            <code>scaleY: [0, 1]</code>
          </div>
          <div class="cheat-item">
            <h4>Background Slide</h4>
            <code>scaleX: [0, 1]</code>
          </div>
          <div class="cheat-item">
            <h4>Icon Bounce</h4>
            <code>y: -8px spring</code>
          </div>
          <div class="cheat-item">
            <h4>Tooltip Fade</h4>
            <code>opacity + y offset</code>
          </div>
          <div class="cheat-item">
            <h4>Expand Text</h4>
            <code>width: [0, auto]</code>
          </div>
          <div class="cheat-item">
            <h4>Focus Glow</h4>
            <code>boxShadow spread</code>
          </div>
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
      min-height: 140px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
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

    /* Demo 1: Card Lift */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
      width: 100%;
    }

    .stat-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: box-shadow 0.2s;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-primary);
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Demo 2: Glow Card */
    .glow-card {
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.3s, transform 0.2s;
    }

    .glow-card:hover {
      transform: translateY(-2px);
    }

    .card-icon {
      font-size: 32px;
      margin-bottom: 12px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--text-primary);
    }

    .card-desc {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* Demo 3: Table Row */
    .data-table {
      width: 100%;
      background: var(--bg-secondary);
      border-radius: 8px;
      overflow: hidden;
    }

    .table-row {
      display: grid;
      grid-template-columns: 4px 1fr 120px 100px;
      gap: 16px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;
      position: relative;
      transition: background-color 0.2s;
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .table-row:hover {
      background: var(--bg-hover);
    }

    .row-indicator {
      width: 3px;
      height: 100%;
      background: var(--accent-primary);
      border-radius: 2px;
      transform: scaleY(0);
      transform-origin: center;
    }

    .row-cell {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Demo 4: Sidebar Menu */
    .sidebar-menu {
      width: 240px;
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 8px;
    }

    .menu-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
    }

    .menu-bg {
      position: absolute;
      inset: 0;
      background: var(--accent-glow);
      transform: scaleX(0);
      transform-origin: left;
      border-radius: 8px;
    }

    .menu-icon {
      font-size: 18px;
      position: relative;
      z-index: 1;
    }

    .menu-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
      position: relative;
      z-index: 1;
    }

    /* Demo 5: Icon Hover */
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .icon-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .icon-box:hover {
      background: var(--bg-hover);
    }

    .hover-icon {
      font-size: 32px;
    }

    .icon-label {
      font-size: 12px;
      color: var(--text-secondary);
    }

    /* Demo 6: Avatar */
    .avatars-row {
      gap: 24px;
    }

    .avatar-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--accent-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .avatar:hover {
      transform: scale(1.05);
    }

    .avatar-tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      background: var(--bg-primary);
      color: var(--text-primary);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 1px solid var(--border-color);
    }

    /* Demo 7: Action Button */
    .action-buttons {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: var(--accent-primary);
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
      overflow: hidden;
      white-space: nowrap;
    }

    .action-btn:hover {
      background: var(--accent-hover);
    }

    .action-icon {
      font-size: 18px;
      flex-shrink: 0;
    }

    .action-text {
      font-size: 14px;
      font-weight: 500;
      overflow: hidden;
    }

    /* Demo 8: Input Focus */
    .inputs-stack {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      max-width: 400px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .input-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .glow-input {
      padding: 12px 16px;
      border: 2px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }

    .glow-input::placeholder {
      color: var(--text-tertiary);
    }

    /* Cheat Sheet */
    .cheat-sheet {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px;
    }

    .cheat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .cheat-item {
      background: var(--bg-tertiary);
      padding: 16px;
      border-radius: 8px;
    }

    .cheat-item h4 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--accent-primary);
    }

    .cheat-item code {
      font-size: 12px;
      color: var(--text-secondary);
    }
  `]
})
export class Chapter9Lesson2 {
  // State signals
  readonly hoveredAvatar = signal<number | null>(null);
  readonly expandedAction = signal<number | null>(null);

  readonly tableData = signal([
    { id: 1, name: 'John Doe', status: 'Active', value: '$1,234' },
    { id: 2, name: 'Jane Smith', status: 'Pending', value: '$890' },
    { id: 3, name: 'Bob Johnson', status: 'Active', value: '$2,456' }
  ]);

  readonly menuItems = signal([
    { id: 1, icon: '📊', label: 'Dashboard' },
    { id: 2, icon: '👥', label: 'Users' },
    { id: 3, icon: '📈', label: 'Analytics' },
    { id: 4, icon: '⚙️', label: 'Settings' }
  ]);

  readonly users = signal([
    { id: 1, name: 'Alice Brown', initials: 'AB' },
    { id: 2, name: 'Charlie Davis', initials: 'CD' },
    { id: 3, name: 'Emma Wilson', initials: 'EW' }
  ]);

  readonly actions = signal([
    { id: 1, icon: '📥', label: 'Download' },
    { id: 2, icon: '📤', label: 'Upload' },
    { id: 3, icon: '🗑️', label: 'Delete' }
  ]);

  // Demo 1: Card Lift
  onCardHover(event: MouseEvent, isEnter: boolean): void {
    const card = event.currentTarget as HTMLElement;
    if (isEnter) {
      animate(card, {
        y: -8,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
      }, { duration: 0.2 });
    } else {
      animate(card, {
        y: 0,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }, { duration: 0.2 });
    }
  }

  // Demo 2: Glow Card
  onGlowCardHover(event: MouseEvent, isEnter: boolean): void {
    const card = event.currentTarget as HTMLElement;
    if (isEnter) {
      animate(card, {
        borderColor: 'var(--accent-primary)'
      }, { duration: 0.3 });
    } else {
      animate(card, {
        borderColor: 'var(--border-color)'
      }, { duration: 0.3 });
    }
  }

  // Demo 3: Table Row
  onRowHover(event: MouseEvent, isEnter: boolean): void {
    const row = event.currentTarget as HTMLElement;
    const indicator = row.querySelector('.row-indicator') as HTMLElement;

    if (indicator) {
      if (isEnter) {
        animate(indicator, {
          scaleY: [0, 1],
          opacity: [0, 1]
        }, { duration: 0.2 });
      } else {
        animate(indicator, {
          scaleY: [1, 0],
          opacity: [1, 0]
        }, { duration: 0.2 });
      }
    }
  }

  // Demo 4: Menu Item
  onMenuHover(event: MouseEvent, isEnter: boolean): void {
    const item = event.currentTarget as HTMLElement;
    const bg = item.querySelector('.menu-bg') as HTMLElement;

    if (bg) {
      if (isEnter) {
        animate(bg, { scaleX: [0, 1] }, {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        });
      } else {
        animate(bg, { scaleX: [1, 0] }, {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        });
      }
    }
  }

  // Demo 5: Icon Hover
  onIconHover(event: MouseEvent, type: 'rotate' | 'bounce' | 'scale'): void {
    const box = event.currentTarget as HTMLElement;
    const icon = box.querySelector('.hover-icon') as HTMLElement;

    if (icon) {
      if (type === 'rotate') {
        animate(icon, { rotate: [0, 15] }, { duration: 0.3 });
      } else if (type === 'bounce') {
        animate(icon, { y: [0, -8] } as any, {
          type: spring,
          stiffness: 300,
          damping: 10
        });
      } else if (type === 'scale') {
        animate(icon, { scale: [1, 1.2] }, { duration: 0.3 });
      }
    }
  }

  onIconLeave(event: MouseEvent): void {
    const box = event.currentTarget as HTMLElement;
    const icon = box.querySelector('.hover-icon') as HTMLElement;

    if (icon) {
      animate(icon, {
        rotate: 0,
        y: 0,
        scale: 1
      }, { duration: 0.3 });
    }
  }

  // Demo 6: Avatar
  onAvatarHover(userId: number, isEnter: boolean): void {
    if (isEnter) {
      this.hoveredAvatar.set(userId);
      setTimeout(() => {
        const tooltip = document.querySelector(`[data-id="${userId}"]`)
          ?.parentElement?.querySelector('.avatar-tooltip') as HTMLElement;
        if (tooltip) {
          animate(tooltip, {
            opacity: [0, 1],
            y: [-8, 0]
          }, { duration: 0.2 });
        }
      }, 10);
    } else {
      this.hoveredAvatar.set(null);
    }
  }

  // Demo 7: Action Button
  onActionHover(actionId: number, isEnter: boolean): void {
    if (isEnter) {
      this.expandedAction.set(actionId);
      setTimeout(() => {
        const btn = document.querySelector(`[data-id="${actionId}"]`);
        const text = btn?.querySelector('.action-text') as HTMLElement;
        if (text) {
          animate(text, {
            width: [0, 'auto'],
            opacity: [0, 1]
          }, { duration: 0.2 });
        }
      }, 10);
    } else {
      this.expandedAction.set(null);
    }
  }

  // Demo 8: Input Focus
  onInputFocus(event: FocusEvent): void {
    const input = event.target as HTMLElement;
    animate(input, {
      borderColor: 'var(--accent-primary)',
      boxShadow: '0 0 0 3px var(--accent-glow)'
    }, { duration: 0.2 });
  }

  onInputBlur(event: FocusEvent): void {
    const input = event.target as HTMLElement;
    animate(input, {
      borderColor: 'var(--border-color)',
      boxShadow: '0 0 0 0 transparent'
    }, { duration: 0.2 });
  }
}
