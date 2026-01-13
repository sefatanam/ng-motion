import { Component, ChangeDetectionStrategy, ElementRef, viewChild, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring, stagger } from 'motion';

/**
 * @REVIEW Chapter 9 Lesson 3 - Show/Hide & List Dynamics
 * Component visibility transitions and list manipulations for dashboards
 */
@Component({
  selector: 'app-chapter9-lesson3',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      chapter="9"
      title="Show/Hide & List Dynamics"
      description="Component visibility transitions and list manipulations. Smooth animations for modals, dropdowns, and dynamic content.">

      <!-- Demo 1: Modal Entrance/Exit -->
      <section class="demo-section">
        <h2 class="section-title">1. Modal Entrance/Exit</h2>
        <p class="section-desc">Scale + fade animation for modal dialogs.</p>

        <div class="demo-area">
          <button class="action-btn" (click)="toggleModal()">
            {{ showModal() ? 'Close Modal' : 'Open Modal' }}
          </button>

          @if (showModal()) {
            <div #modalOverlay class="modal-overlay" (click)="toggleModal()">
              <div #modalContent class="modal-content" (click)="$event.stopPropagation()">
                <h3>Confirm Action</h3>
                <p>Are you sure you want to proceed?</p>
                <div class="modal-actions">
                  <button class="btn-secondary" (click)="toggleModal()">Cancel</button>
                  <button class="btn-primary" (click)="toggleModal()">Confirm</button>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="code-block">
          <pre>animate(modal, {{ '{' }} scale: [0.9, 1], opacity: [0, 1] {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 2: Dropdown Menu Cascade -->
      <section class="demo-section">
        <h2 class="section-title">2. Dropdown Menu Cascade</h2>
        <p class="section-desc">Staggered fade-in for dropdown menu items.</p>

        <div class="demo-area">
          <div class="dropdown-wrapper">
            <button class="dropdown-trigger" (click)="toggleDropdown()">
              Actions ▼
            </button>

            @if (showDropdown()) {
              <div #dropdownMenu class="dropdown-menu">
                @for (item of dropdownItems(); track item.id) {
                  <div #dropdownItem class="dropdown-item" [attr.data-index]="$index">
                    <span class="item-icon">{{ item.icon }}</span>
                    <span class="item-label">{{ item.label }}</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>stagger(items, {{ '{' }} opacity: [0, 1], y: [-10, 0] {{ '}' }}, {{ '{' }} delay: 0.05 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 3: Sidebar Collapse/Expand -->
      <section class="demo-section">
        <h2 class="section-title">3. Sidebar Collapse/Expand</h2>
        <p class="section-desc">Smooth width transition for collapsible sidebars.</p>

        <div class="demo-area">
          <div class="sidebar-demo">
            <div #sidebar class="demo-sidebar" [class.collapsed]="sidebarCollapsed()">
              <button class="sidebar-toggle" (click)="toggleSidebar()">
                {{ sidebarCollapsed() ? '▶' : '◀' }}
              </button>
              @if (!sidebarCollapsed()) {
                <div #sidebarContent class="sidebar-content">
                  <div class="sidebar-item">Dashboard</div>
                  <div class="sidebar-item">Users</div>
                  <div class="sidebar-item">Settings</div>
                </div>
              }
            </div>
            <div class="main-content">
              <div class="content-placeholder">Main Content Area</div>
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>animate(sidebar, {{ '{' }} width: collapsed ? 60 : 240 {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 4: Accordion Panel -->
      <section class="demo-section">
        <h2 class="section-title">4. Accordion Panel Expand</h2>
        <p class="section-desc">Height transition with content fade for accordions.</p>

        <div class="demo-area">
          <div class="accordion">
            @for (panel of accordionPanels(); track panel.id) {
              <div class="accordion-panel">
                <button class="accordion-header" (click)="togglePanel(panel.id)">
                  <span>{{ panel.title }}</span>
                  <span class="accordion-icon">{{ expandedPanel() === panel.id ? '−' : '+' }}</span>
                </button>
                @if (expandedPanel() === panel.id) {
                  <div #accordionBody class="accordion-body" [attr.data-id]="panel.id">
                    <p>{{ panel.content }}</p>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>animate(body, {{ '{' }} height: [0, 'auto'], opacity: [0, 1] {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 5: List Item Add -->
      <section class="demo-section">
        <h2 class="section-title">5. List Item Add Animation</h2>
        <p class="section-desc">Slide in + highlight effect for new items.</p>

        <div class="demo-area">
          <div class="list-demo">
            <button class="action-btn" (click)="addListItem()">Add Task</button>
            <div class="task-list">
              @for (task of tasks(); track task.id) {
                <div #taskItem class="task-item" [attr.data-id]="task.id" [class.new]="task.isNew">
                  <span class="task-checkbox">☐</span>
                  <span class="task-text">{{ task.text }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>animate(item, {{ '{' }} x: [-100, 0], opacity: [0, 1] {{ '}' }}, spring({{ '{' }} stiffness: 200 {{ '}' }}))</pre>
        </div>
      </section>

      <!-- Demo 6: List Item Remove -->
      <section class="demo-section">
        <h2 class="section-title">6. List Item Remove Animation</h2>
        <p class="section-desc">Slide out + collapse for removing items.</p>

        <div class="demo-area">
          <div class="removable-list">
            @for (item of removableItems(); track item.id) {
              <div #removableItem class="removable-item" [attr.data-id]="item.id">
                <span class="item-text">{{ item.text }}</span>
                <button class="remove-btn" (click)="removeItem(item.id)">✕</button>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>// Slide out then collapse height
animate(item, {{ '{' }} x: [0, 100], opacity: [1, 0] {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 7: Toast Notification Stack -->
      <section class="demo-section">
        <h2 class="section-title">7. Toast Notification Stack</h2>
        <p class="section-desc">Slide in from right with auto-dismiss.</p>

        <div class="demo-area">
          <button class="action-btn" (click)="showToast('success')">Success Toast</button>
          <button class="action-btn" (click)="showToast('error')">Error Toast</button>
          <button class="action-btn" (click)="showToast('info')">Info Toast</button>

          <div class="toast-container">
            @for (toast of toasts(); track toast.id) {
              <div #toastEl class="toast" [attr.data-id]="toast.id" [class]="'toast-' + toast.type">
                <span class="toast-icon">{{ getToastIcon(toast.type) }}</span>
                <span class="toast-message">{{ toast.message }}</span>
                <button class="toast-close" (click)="dismissToast(toast.id)">✕</button>
              </div>
            }
          </div>
        </div>

        <div class="code-block">
          <pre>animate(toast, {{ '{' }} x: [300, 0], opacity: [0, 1] {{ '}' }}, {{ '{' }} duration: 0.4 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Demo 8: Tab Content Transition -->
      <section class="demo-section">
        <h2 class="section-title">8. Tab Content Transition</h2>
        <p class="section-desc">Fade transition when switching tabs.</p>

        <div class="demo-area">
          <div class="tabs-demo">
            <div class="tab-headers">
              @for (tab of tabs(); track tab.id) {
                <button class="tab-header" [class.active]="activeTab() === tab.id" (click)="switchTab(tab.id)">
                  {{ tab.label }}
                </button>
              }
            </div>
            <div class="tab-content-wrapper">
              @for (tab of tabs(); track tab.id) {
                @if (activeTab() === tab.id) {
                  <div #tabContent class="tab-content" [attr.data-id]="tab.id">
                    <h4>{{ tab.label }} Content</h4>
                    <p>{{ tab.content }}</p>
                  </div>
                }
              }
            </div>
          </div>
        </div>

        <div class="code-block">
          <pre>animate(content, {{ '{' }} opacity: [0, 1], y: [10, 0] {{ '}' }}, {{ '{' }} duration: 0.3 {{ '}' }})</pre>
        </div>
      </section>

      <!-- Cheat Sheet -->
      <section class="cheat-sheet">
        <h2 class="section-title">📋 Show/Hide Cheat Sheet</h2>
        <div class="cheat-grid">
          <div class="cheat-item">
            <h4>Modal</h4>
            <code>scale + opacity fade</code>
          </div>
          <div class="cheat-item">
            <h4>Dropdown</h4>
            <code>stagger y + opacity</code>
          </div>
          <div class="cheat-item">
            <h4>Sidebar</h4>
            <code>width transition</code>
          </div>
          <div class="cheat-item">
            <h4>Accordion</h4>
            <code>height: auto</code>
          </div>
          <div class="cheat-item">
            <h4>List Add</h4>
            <code>x slide + highlight</code>
          </div>
          <div class="cheat-item">
            <h4>List Remove</h4>
            <code>slide out + collapse</code>
          </div>
          <div class="cheat-item">
            <h4>Toast</h4>
            <code>x: [300, 0] slide</code>
          </div>
          <div class="cheat-item">
            <h4>Tab Switch</h4>
            <code>opacity + y offset</code>
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
      min-height: 160px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;
      padding: 24px;
      flex-wrap: wrap;
      position: relative;
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

    .action-btn {
      padding: 10px 20px;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .action-btn:hover {
      background: var(--accent-hover);
    }

    /* Demo 1: Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 24px;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .modal-content h3 {
      font-size: 20px;
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .modal-content p {
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .modal-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .btn-secondary {
      padding: 8px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      color: var(--text-primary);
    }

    .btn-primary {
      padding: 8px 16px;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    }

    /* Demo 2: Dropdown */
    .dropdown-wrapper {
      position: relative;
    }

    .dropdown-trigger {
      padding: 10px 20px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      color: var(--text-primary);
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      min-width: 180px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      z-index: 10;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .dropdown-item:hover {
      background: var(--bg-hover);
    }

    .item-icon {
      font-size: 16px;
    }

    .item-label {
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Demo 3: Sidebar */
    .sidebar-demo {
      display: flex;
      width: 100%;
      height: 300px;
      background: var(--bg-primary);
      border-radius: 8px;
      overflow: hidden;
    }

    .demo-sidebar {
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      width: 240px;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: width 0.3s;
    }

    .demo-sidebar.collapsed {
      width: 60px;
    }

    .sidebar-toggle {
      padding: 12px;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: var(--text-primary);
      text-align: center;
    }

    .sidebar-content {
      display: flex;
      flex-direction: column;
      padding: 8px;
    }

    .sidebar-item {
      padding: 12px 16px;
      font-size: 14px;
      color: var(--text-primary);
      border-radius: 6px;
      transition: background-color 0.2s;
      cursor: pointer;
    }

    .sidebar-item:hover {
      background: var(--bg-hover);
    }

    .main-content {
      flex: 1;
      padding: 24px;
    }

    .content-placeholder {
      color: var(--text-secondary);
      text-align: center;
      padding: 40px;
    }

    /* Demo 4: Accordion */
    .accordion {
      width: 100%;
      max-width: 500px;
    }

    .accordion-panel {
      border: 1px solid var(--border-color);
      border-radius: 8px;
      margin-bottom: 8px;
      overflow: hidden;
    }

    .accordion-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: var(--bg-secondary);
      border: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
      transition: background-color 0.2s;
    }

    .accordion-header:hover {
      background: var(--bg-hover);
    }

    .accordion-icon {
      font-size: 18px;
      color: var(--accent-primary);
    }

    .accordion-body {
      padding: 16px;
      background: var(--bg-primary);
      overflow: hidden;
    }

    .accordion-body p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 14px;
      line-height: 1.6;
    }

    /* Demo 5: List Add */
    .list-demo {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      transition: background-color 0.3s;
    }

    .task-item.new {
      background: var(--accent-glow);
      border-color: var(--accent-primary);
    }

    .task-checkbox {
      font-size: 16px;
      color: var(--text-secondary);
    }

    .task-text {
      font-size: 14px;
      color: var(--text-primary);
    }

    /* Demo 6: List Remove */
    .removable-list {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .removable-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .item-text {
      font-size: 14px;
      color: var(--text-primary);
    }

    .remove-btn {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background: var(--bg-tertiary);
      border: none;
      cursor: pointer;
      color: var(--text-secondary);
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .remove-btn:hover {
      background: #ef4444;
      color: white;
    }

    /* Demo 7: Toast */
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      min-width: 280px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .toast-success {
      border-left: 3px solid #22c55e;
    }

    .toast-error {
      border-left: 3px solid #ef4444;
    }

    .toast-info {
      border-left: 3px solid #3b82f6;
    }

    .toast-icon {
      font-size: 18px;
    }

    .toast-message {
      flex: 1;
      font-size: 14px;
      color: var(--text-primary);
    }

    .toast-close {
      width: 20px;
      height: 20px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--text-secondary);
      font-size: 16px;
    }

    /* Demo 8: Tabs */
    .tabs-demo {
      width: 100%;
      max-width: 500px;
    }

    .tab-headers {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 16px;
    }

    .tab-header {
      padding: 12px 20px;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 14px;
      color: var(--text-secondary);
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }

    .tab-header.active {
      color: var(--accent-primary);
      border-bottom-color: var(--accent-primary);
    }

    .tab-content-wrapper {
      min-height: 120px;
    }

    .tab-content {
      padding: 16px;
      background: var(--bg-secondary);
      border-radius: 8px;
    }

    .tab-content h4 {
      font-size: 16px;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .tab-content p {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
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
export class Chapter9Lesson3 {
  // State signals
  readonly showModal = signal(false);
  readonly showDropdown = signal(false);
  readonly sidebarCollapsed = signal(false);
  readonly expandedPanel = signal<number | null>(null);
  readonly activeTab = signal(1);
  readonly hoveredAvatar = signal<number | null>(null);

  readonly tasks = signal<Array<{ id: number; text: string; isNew: boolean }>>([
    { id: 1, text: 'Review pull requests', isNew: false },
    { id: 2, text: 'Update documentation', isNew: false }
  ]);

  readonly removableItems = signal([
    { id: 1, text: 'Item 1 - Click × to remove' },
    { id: 2, text: 'Item 2 - Click × to remove' },
    { id: 3, text: 'Item 3 - Click × to remove' }
  ]);

  readonly toasts = signal<Array<{ id: number; type: string; message: string }>>([]);

  readonly dropdownItems = signal([
    { id: 1, icon: '✏️', label: 'Edit' },
    { id: 2, icon: '📋', label: 'Duplicate' },
    { id: 3, icon: '📤', label: 'Share' },
    { id: 4, icon: '🗑️', label: 'Delete' }
  ]);

  readonly accordionPanels = signal([
    { id: 1, title: 'General Settings', content: 'Configure general application settings including language, timezone, and default preferences.' },
    { id: 2, title: 'Privacy & Security', content: 'Manage your privacy settings, two-factor authentication, and security preferences.' },
    { id: 3, title: 'Notifications', content: 'Control which notifications you receive via email, SMS, and push notifications.' }
  ]);

  readonly tabs = signal([
    { id: 1, label: 'Overview', content: 'Dashboard overview with key metrics and statistics.' },
    { id: 2, label: 'Analytics', content: 'Detailed analytics and performance reports.' },
    { id: 3, label: 'Reports', content: 'Generate and download custom reports.' }
  ]);

  private taskCounter = 3;
  private toastCounter = 0;

  // Demo 1: Modal
  toggleModal(): void {
    this.showModal.update(v => !v);
    if (this.showModal()) {
      setTimeout(() => {
        const overlay = document.querySelector('.modal-overlay') as HTMLElement;
        const content = document.querySelector('.modal-content') as HTMLElement;
        if (overlay && content) {
          animate(overlay, { opacity: [0, 1] }, { duration: 0.2 });
          animate(content, {
            scale: [0.9, 1],
            opacity: [0, 1]
          }, { duration: 0.3, ease: [0.4, 0, 0.2, 1] });
        }
      }, 10);
    }
  }

  // Demo 2: Dropdown
  toggleDropdown(): void {
    this.showDropdown.update(v => !v);
    if (this.showDropdown()) {
      setTimeout(() => {
        const items = document.querySelectorAll('.dropdown-item');
        items.forEach((item, index) => {
          animate(item as HTMLElement, {
            opacity: [0, 1],
            y: [-10, 0]
          }, {
            duration: 0.2,
            delay: index * 0.05
          });
        });
      }, 10);
    }
  }

  // Demo 3: Sidebar
  toggleSidebar(): void {
    const sidebar = document.querySelector('.demo-sidebar') as HTMLElement;
    const newState = !this.sidebarCollapsed();
    this.sidebarCollapsed.set(newState);

    if (sidebar) {
      animate(sidebar, {
        width: newState ? '60px' : '240px'
      }, { duration: 0.3, ease: [0.4, 0, 0.2, 1] });
    }
  }

  // Demo 4: Accordion
  togglePanel(panelId: number): void {
    const wasExpanded = this.expandedPanel() === panelId;
    this.expandedPanel.set(wasExpanded ? null : panelId);

    if (!wasExpanded) {
      setTimeout(() => {
        const body = document.querySelector(`[data-id="${panelId}"]`) as HTMLElement;
        if (body) {
          body.style.height = '0';
          const fullHeight = body.scrollHeight;
          animate(body, {
            height: ['0px', `${fullHeight}px`],
            opacity: [0, 1]
          }, { duration: 0.3, ease: [0.4, 0, 0.2, 1] }).finished.then(() => {
            body.style.height = 'auto';
          });
        }
      }, 10);
    }
  }

  // Demo 5: List Add
  addListItem(): void {
    const newTask = {
      id: this.taskCounter++,
      text: `New task #${this.taskCounter - 1}`,
      isNew: true
    };

    this.tasks.update(tasks => [newTask, ...tasks]);

    setTimeout(() => {
      const item = document.querySelector(`[data-id="${newTask.id}"]`) as HTMLElement;
      if (item) {
        animate(item, {
          x: [-100, 0],
          opacity: [0, 1]
        } as any, {
          type: spring,
          stiffness: 200,
          damping: 20
        });

        // Remove highlight after 2s
        setTimeout(() => {
          this.tasks.update(tasks =>
            tasks.map(t => t.id === newTask.id ? { ...t, isNew: false } : t)
          );
        }, 2000);
      }
    }, 10);
  }

  // Demo 6: List Remove
  removeItem(itemId: number): void {
    const item = document.querySelector(`[data-id="${itemId}"]`) as HTMLElement;
    if (item) {
      animate(item, {
        x: [0, 100],
        opacity: [1, 0]
      }, { duration: 0.3 }).finished.then(() => {
        animate(item, {
          height: [item.offsetHeight, 0],
          marginBottom: [8, 0]
        }, { duration: 0.2 }).finished.then(() => {
          this.removableItems.update(items =>
            items.filter(i => i.id !== itemId)
          );
        });
      });
    }
  }

  // Demo 7: Toast
  showToast(type: 'success' | 'error' | 'info'): void {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'An error occurred. Please try again.',
      info: 'This is an informational message.'
    };

    const toast = {
      id: ++this.toastCounter,
      type,
      message: messages[type]
    };

    this.toasts.update(toasts => [...toasts, toast]);

    setTimeout(() => {
      const el = document.querySelector(`[data-id="${toast.id}"]`) as HTMLElement;
      if (el) {
        animate(el, {
          x: [300, 0],
          opacity: [0, 1]
        }, { duration: 0.4, ease: [0.4, 0, 0.2, 1] });
      }
    }, 10);

    // Auto dismiss after 3s
    setTimeout(() => this.dismissToast(toast.id), 3000);
  }

  dismissToast(toastId: number): void {
    const el = document.querySelector(`[data-id="${toastId}"]`) as HTMLElement;
    if (el) {
      animate(el, {
        x: [0, 300],
        opacity: [1, 0]
      }, { duration: 0.3 }).finished.then(() => {
        this.toasts.update(toasts => toasts.filter(t => t.id !== toastId));
      });
    }
  }

  getToastIcon(type: string): string {
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    return icons[type as keyof typeof icons] || 'ℹ';
  }

  // Demo 8: Tabs
  switchTab(tabId: number): void {
    this.activeTab.set(tabId);
    setTimeout(() => {
      const content = document.querySelector(`[data-id="${tabId}"]`) as HTMLElement;
      if (content) {
        animate(content, {
          opacity: [0, 1],
          y: [10, 0]
        }, { duration: 0.3 });
      }
    }, 10);
  }
}
