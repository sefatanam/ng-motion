import { Component, ChangeDetectionStrategy, signal, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

@Component({
  selector: 'app-chapter5-lesson3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="5"
      title="Modal Animations"
      description="Create Linear-style modal dialogs with polished open/close animations and backdrop effects.">
      
      <!-- Demo 1: Basic Modal -->
      <section class="demo-section">
        <h2 class="section-title">1. Basic Modal</h2>
        <p class="section-desc">Scale and fade animation with backdrop blur.</p>
        
        <div class="demo-area">
          <button class="btn btn-primary" (click)="openBasicModal()">Open Modal</button>
        </div>
        
        @if (basicModalOpen()) {
          <div class="modal-overlay" (click)="closeBasicModal()">
            <div class="modal-content basic" #basicModal (click)="$event.stopPropagation()">
              <div class="modal-header">
                <h3>Create Issue</h3>
                <button class="close-btn" (click)="closeBasicModal()">×</button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="Issue title..." />
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea placeholder="Describe the issue..."></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" (click)="closeBasicModal()">Cancel</button>
                <button class="btn btn-primary">Create Issue</button>
              </div>
            </div>
          </div>
        }
      </section>

      <!-- Demo 2: Command Palette -->
      <section class="demo-section">
        <h2 class="section-title">2. Command Palette</h2>
        <p class="section-desc">Linear's ⌘K command palette with search.</p>
        
        <div class="demo-area">
          <button class="btn btn-primary" (click)="openCommandPalette()">
            Open Command Palette
            <span class="key-hint">⌘K</span>
          </button>
        </div>
        
        @if (commandPaletteOpen()) {
          <div class="modal-overlay dark" (click)="closeCommandPalette()">
            <div class="command-palette" #commandPalette (click)="$event.stopPropagation()">
              <div class="command-search">
                <span class="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="Type a command or search..."
                  [value]="searchQuery()"
                  (input)="updateSearch($event)" />
              </div>
              <div class="command-results">
                @for (cmd of filteredCommands(); track cmd.id) {
                  <div class="command-item" (click)="executeCommand(cmd)">
                    <span class="cmd-icon">{{ cmd.icon }}</span>
                    <div class="cmd-info">
                      <span class="cmd-name">{{ cmd.name }}</span>
                      <span class="cmd-category">{{ cmd.category }}</span>
                    </div>
                    <div class="cmd-keys">
                      @for (key of cmd.keys; track key) {
                        <kbd>{{ key }}</kbd>
                      }
                    </div>
                  </div>
                }
              </div>
              <div class="command-footer">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>esc Close</span>
              </div>
            </div>
          </div>
        }
      </section>

      <!-- Demo 3: Confirmation Dialog -->
      <section class="demo-section">
        <h2 class="section-title">3. Confirmation Dialog</h2>
        <p class="section-desc">Danger dialog with warning animation.</p>
        
        <div class="demo-area">
          <button class="btn btn-danger" (click)="openConfirmDialog()">Delete Project</button>
        </div>
        
        @if (confirmDialogOpen()) {
          <div class="modal-overlay" (click)="closeConfirmDialog()">
            <div class="confirm-dialog" #confirmDialog (click)="$event.stopPropagation()">
              <div class="confirm-icon danger">
                <span>⚠️</span>
              </div>
              <h3>Delete Project?</h3>
              <p>This action cannot be undone. All issues, comments, and data will be permanently removed.</p>
              <div class="confirm-actions">
                <button class="btn btn-secondary" (click)="closeConfirmDialog()">Cancel</button>
                <button class="btn btn-danger" (click)="confirmDelete()">Delete Project</button>
              </div>
            </div>
          </div>
        }
      </section>

      <!-- Demo 4: Slide-in Panel -->
      <section class="demo-section">
        <h2 class="section-title">4. Side Panel</h2>
        <p class="section-desc">Slide-in panel for detailed views.</p>
        
        <div class="demo-area">
          <button class="btn btn-primary" (click)="openSidePanel()">Open Details Panel</button>
        </div>
        
        @if (sidePanelOpen()) {
          <div class="panel-overlay" (click)="closeSidePanel()">
            <div class="side-panel" #sidePanel (click)="$event.stopPropagation()">
              <div class="panel-header">
                <h3>Issue Details</h3>
                <button class="close-btn" (click)="closeSidePanel()">×</button>
              </div>
              <div class="panel-body">
                <div class="issue-header">
                  <span class="issue-key">LIN-423</span>
                  <h2>Implement dark mode</h2>
                </div>
                <div class="issue-meta">
                  <div class="meta-item">
                    <span class="meta-label">Status</span>
                    <span class="status-badge progress">In Progress</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Priority</span>
                    <span class="priority-badge high">High</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Assignee</span>
                    <div class="assignee">
                      <div class="avatar">JD</div>
                      <span>John Doe</span>
                    </div>
                  </div>
                </div>
                <div class="issue-description">
                  <h4>Description</h4>
                  <p>Add a dark mode toggle to the application settings. The theme should persist across sessions and respect system preferences.</p>
                </div>
              </div>
            </div>
          </div>
        }
      </section>

      <!-- Demo 5: Toast Notifications -->
      <section class="demo-section">
        <h2 class="section-title">5. Toast Notifications</h2>
        <p class="section-desc">Animated toast notifications from bottom.</p>
        
        <div class="demo-area">
          <div class="toast-buttons">
            <button class="btn btn-primary" (click)="showToast('success')">Success Toast</button>
            <button class="btn btn-secondary" (click)="showToast('info')">Info Toast</button>
            <button class="btn btn-danger" (click)="showToast('error')">Error Toast</button>
          </div>
        </div>
        
        <div class="toast-container">
          @for (toast of toasts(); track toast.id) {
            <div class="toast" [class]="toast.type">
              <span class="toast-icon">{{ toast.icon }}</span>
              <span class="toast-message">{{ toast.message }}</span>
              <button class="toast-close" (click)="removeToast(toast.id)">×</button>
            </div>
          }
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
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-danger {
      background: #ef4444;
      color: white;
    }

    .key-hint {
      margin-left: 8px;
      padding: 2px 6px;
      background: rgba(255,255,255,0.2);
      border-radius: var(--radius-sm);
      font-size: 11px;
    }

    /* Modal Overlay */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }

    .modal-overlay.dark {
      background: rgba(0, 0, 0, 0.8);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Basic Modal */
    .modal-content {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      width: 100%;
      max-width: 480px;
      animation: modalIn 0.3s ease;
    }

    @keyframes modalIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
    }

    .modal-header h3 {
      font-size: 16px;
      font-weight: 600;
    }

    .close-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border-radius: var(--radius-md);
      font-size: 20px;
      color: var(--text-tertiary);
      cursor: pointer;
    }

    .close-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .modal-body {
      padding: 24px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--text-secondary);
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 10px 12px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      font-size: 14px;
      color: var(--text-primary);
    }

    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 16px 24px;
      border-top: 1px solid var(--border-color);
    }

    /* Command Palette */
    .command-palette {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      width: 100%;
      max-width: 560px;
      overflow: hidden;
      animation: paletteIn 0.2s ease;
    }

    @keyframes paletteIn {
      from {
        opacity: 0;
        transform: scale(0.98) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .command-search {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .search-icon {
      font-size: 18px;
    }

    .command-search input {
      flex: 1;
      background: transparent;
      border: none;
      font-size: 16px;
      color: var(--text-primary);
      outline: none;
    }

    .command-results {
      max-height: 300px;
      overflow-y: auto;
    }

    .command-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      cursor: pointer;
      transition: background 0.1s ease;
    }

    .command-item:hover {
      background: var(--bg-hover);
    }

    .cmd-icon {
      font-size: 18px;
    }

    .cmd-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .cmd-name {
      font-size: 14px;
    }

    .cmd-category {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .cmd-keys {
      display: flex;
      gap: 4px;
    }

    .cmd-keys kbd {
      padding: 4px 8px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      font-size: 11px;
      font-family: inherit;
    }

    .command-footer {
      display: flex;
      gap: 16px;
      padding: 12px 20px;
      border-top: 1px solid var(--border-color);
      font-size: 12px;
      color: var(--text-tertiary);
    }

    /* Confirmation Dialog */
    .confirm-dialog {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      width: 100%;
      max-width: 400px;
      padding: 32px;
      text-align: center;
      animation: shakeIn 0.4s ease;
    }

    @keyframes shakeIn {
      0% { opacity: 0; transform: scale(0.9); }
      50% { transform: scale(1.02); }
      100% { opacity: 1; transform: scale(1); }
    }

    .confirm-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 32px;
    }

    .confirm-icon.danger {
      background: #ef444420;
    }

    .confirm-dialog h3 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .confirm-dialog p {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }

    .confirm-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    /* Side Panel */
    .panel-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1000;
      animation: fadeIn 0.2s ease;
    }

    .side-panel {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 480px;
      background: var(--bg-secondary);
      border-left: 1px solid var(--border-color);
      animation: slideInRight 0.3s ease;
    }

    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
    }

    .panel-body {
      padding: 24px;
    }

    .issue-header {
      margin-bottom: 24px;
    }

    .issue-key {
      font-size: 12px;
      color: var(--text-tertiary);
      display: block;
      margin-bottom: 4px;
    }

    .issue-header h2 {
      font-size: 20px;
    }

    .issue-meta {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .meta-label {
      width: 80px;
      font-size: 13px;
      color: var(--text-tertiary);
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: 12px;
      font-weight: 500;
    }

    .status-badge.progress {
      background: #f59e0b20;
      color: #f59e0b;
    }

    .priority-badge {
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: 12px;
      font-weight: 500;
    }

    .priority-badge.high {
      background: #ef444420;
      color: #ef4444;
    }

    .assignee {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .avatar {
      width: 28px;
      height: 28px;
      background: var(--accent-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      color: white;
    }

    .issue-description h4 {
      font-size: 13px;
      color: var(--text-tertiary);
      margin-bottom: 8px;
    }

    .issue-description p {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Toast Container */
    .toast-buttons {
      display: flex;
      gap: 8px;
    }

    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1001;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      min-width: 300px;
      animation: toastIn 0.3s ease;
      box-shadow: var(--shadow-lg);
    }

    @keyframes toastIn {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .toast.success { border-left: 4px solid #22c55e; }
    .toast.info { border-left: 4px solid #3b82f6; }
    .toast.error { border-left: 4px solid #ef4444; }

    .toast-icon {
      font-size: 18px;
    }

    .toast-message {
      flex: 1;
      font-size: 14px;
    }

    .toast-close {
      background: transparent;
      border: none;
      font-size: 18px;
      color: var(--text-tertiary);
      cursor: pointer;
    }
  `]
})
export class Chapter5Lesson3 {
  readonly basicModal = viewChild<ElementRef<HTMLElement>>('basicModal');
  readonly commandPalette = viewChild<ElementRef<HTMLElement>>('commandPalette');
  readonly confirmDialog = viewChild<ElementRef<HTMLElement>>('confirmDialog');
  readonly sidePanel = viewChild<ElementRef<HTMLElement>>('sidePanel');

  readonly basicModalOpen = signal(false);
  readonly commandPaletteOpen = signal(false);
  readonly confirmDialogOpen = signal(false);
  readonly sidePanelOpen = signal(false);
  readonly searchQuery = signal('');

  readonly commands = signal([
    { id: 1, icon: '📝', name: 'Create Issue', category: 'Issues', keys: ['C'] },
    { id: 2, icon: '🔍', name: 'Search Issues', category: 'Search', keys: ['⌘', 'F'] },
    { id: 3, icon: '📋', name: 'Copy Link', category: 'Actions', keys: ['⌘', 'L'] },
    { id: 4, icon: '👤', name: 'Assign to Me', category: 'Actions', keys: ['I'] },
    { id: 5, icon: '🏷️', name: 'Add Label', category: 'Labels', keys: ['L'] },
    { id: 6, icon: '📅', name: 'Set Due Date', category: 'Planning', keys: ['D'] }
  ]);

  readonly toasts = signal<Array<{ id: number; type: string; icon: string; message: string }>>([]);

  private toastId = 0;

  get filteredCommands() {
    return () => {
      const query = this.searchQuery().toLowerCase();
      if (!query) return this.commands();
      return this.commands().filter(cmd => 
        cmd.name.toLowerCase().includes(query) || 
        cmd.category.toLowerCase().includes(query)
      );
    };
  }

  openBasicModal(): void {
    this.basicModalOpen.set(true);
  }

  closeBasicModal(): void {
    this.basicModalOpen.set(false);
  }

  openCommandPalette(): void {
    this.commandPaletteOpen.set(true);
    this.searchQuery.set('');
  }

  closeCommandPalette(): void {
    this.commandPaletteOpen.set(false);
  }

  updateSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  executeCommand(cmd: any): void {
    this.closeCommandPalette();
    this.showToast('success');
  }

  openConfirmDialog(): void {
    this.confirmDialogOpen.set(true);
  }

  closeConfirmDialog(): void {
    this.confirmDialogOpen.set(false);
  }

  confirmDelete(): void {
    this.closeConfirmDialog();
    this.showToast('error');
  }

  openSidePanel(): void {
    this.sidePanelOpen.set(true);
  }

  closeSidePanel(): void {
    this.sidePanelOpen.set(false);
  }

  showToast(type: 'success' | 'info' | 'error'): void {
    const icons = { success: '✅', info: 'ℹ️', error: '❌' };
    const messages = {
      success: 'Action completed successfully',
      info: 'Here\'s some information',
      error: 'Something went wrong'
    };

    const toast = {
      id: this.toastId++,
      type,
      icon: icons[type],
      message: messages[type]
    };

    this.toasts.update(t => [...t, toast]);

    setTimeout(() => this.removeToast(toast.id), 4000);
  }

  removeToast(id: number): void {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
