import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring, stagger } from 'motion';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  progress: number;
}

/**
 * @REVIEW Chapter 8 Lesson 2 - Notification Toasts
 * Premium toast notifications with animations, stacking, and auto-dismiss
 */
@Component({
  selector: 'app-chapter8-lesson2',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      title="Notification Toasts"
      description="Premium toast notifications with slide animations, stacking, progress indicators, and swipe-to-dismiss"
      chapter="8"
    >
      <div class="toast-demo-container">
        <!-- Toast Triggers -->
        <div class="demo-section">
          <h3>Toast Types</h3>
          <div class="trigger-grid">
            <button class="trigger-btn success" (click)="showToast('success')">
              <span class="icon">✓</span>
              <span>Success</span>
            </button>
            <button class="trigger-btn error" (click)="showToast('error')">
              <span class="icon">✕</span>
              <span>Error</span>
            </button>
            <button class="trigger-btn warning" (click)="showToast('warning')">
              <span class="icon">⚠</span>
              <span>Warning</span>
            </button>
            <button class="trigger-btn info" (click)="showToast('info')">
              <span class="icon">ℹ</span>
              <span>Info</span>
            </button>
          </div>
        </div>

        <!-- Position Control -->
        <div class="demo-section">
          <h3>Position</h3>
          <div class="position-selector">
            @for (pos of positions; track pos) {
              <button
                [class.active]="position() === pos"
                (click)="setPosition(pos)"
              >
                {{ pos }}
              </button>
            }
          </div>
        </div>

        <!-- Bulk Actions -->
        <div class="demo-section">
          <h3>Actions</h3>
          <div class="action-buttons">
            <button (click)="showMultipleToasts()">Show Multiple</button>
            <button (click)="clearAllToasts()">Clear All</button>
          </div>
        </div>

        <!-- Toast Container Preview -->
        <div class="preview-area">
          <div class="preview-label">Toast Preview Area</div>

          <!-- Toast Stack -->
          <div class="toast-stack" [class]="position()">
            @for (toast of toasts(); track toast.id) {
              <div
                class="toast"
                [class]="toast.type"
                [attr.data-id]="toast.id"
                (click)="dismissToast(toast.id)"
              >
                <div class="toast-icon">
                  @switch (toast.type) {
                    @case ('success') { ✓ }
                    @case ('error') { ✕ }
                    @case ('warning') { ⚠ }
                    @case ('info') { ℹ }
                  }
                </div>
                <div class="toast-content">
                  <div class="toast-title">{{ toast.title }}</div>
                  <div class="toast-message">{{ toast.message }}</div>
                </div>
                <button class="toast-close" (click)="dismissToast(toast.id); $event.stopPropagation()">
                  ×
                </button>
                <div class="toast-progress">
                  <div
                    class="toast-progress-bar"
                    [style.width.%]="toast.progress"
                  ></div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Custom Toast Builder -->
        <div class="demo-section wide">
          <h3>Custom Toast</h3>
          <div class="custom-builder">
            <div class="builder-row">
              <label>
                Title
                <input
                  type="text"
                  [value]="customTitle()"
                  (input)="customTitle.set($any($event.target).value)"
                  placeholder="Toast title..."
                />
              </label>
              <label>
                Message
                <input
                  type="text"
                  [value]="customMessage()"
                  (input)="customMessage.set($any($event.target).value)"
                  placeholder="Toast message..."
                />
              </label>
            </div>
            <div class="builder-row">
              <label>
                Duration (ms)
                <input
                  type="number"
                  [value]="customDuration()"
                  (input)="customDuration.set(+$any($event.target).value)"
                  min="1000"
                  max="10000"
                  step="1000"
                />
              </label>
              <label>
                Type
                <select (change)="customType.set($any($event.target).value)">
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </label>
            </div>
            <button class="show-custom-btn" (click)="showCustomToast()">
              Show Custom Toast
            </button>
          </div>
        </div>

        <!-- Action Toast -->
        <div class="demo-section">
          <h3>Action Toast</h3>
          <button class="trigger-btn action" (click)="showActionToast()">
            <span class="icon">↩</span>
            <span>Undo Action</span>
          </button>

          @if (showingActionToast()) {
            <div class="action-toast">
              <span>Item deleted</span>
              <button (click)="undoAction()">Undo</button>
            </div>
          }
        </div>

        <!-- Promise Toast -->
        <div class="demo-section">
          <h3>Promise Toast</h3>
          <button
            class="trigger-btn promise"
            (click)="showPromiseToast()"
            [disabled]="promiseLoading()"
          >
            <span class="icon">{{ promiseLoading() ? '⏳' : '📤' }}</span>
            <span>{{ promiseLoading() ? 'Uploading...' : 'Upload File' }}</span>
          </button>
        </div>
      </div>
    </app-lesson-layout>
  `,
  styles: [`
    .toast-demo-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .demo-section {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;

      &.wide {
        grid-column: 1 / -1;
      }

      h3 {
        margin: 0 0 1rem 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .trigger-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .trigger-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s;

      .icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
      }

      &.success {
        background: rgba(52, 199, 89, 0.15);
        color: #34c759;
        .icon { background: #34c759; color: white; }
        &:hover { background: rgba(52, 199, 89, 0.25); }
      }

      &.error {
        background: rgba(255, 59, 48, 0.15);
        color: #ff3b30;
        .icon { background: #ff3b30; color: white; }
        &:hover { background: rgba(255, 59, 48, 0.25); }
      }

      &.warning {
        background: rgba(255, 159, 10, 0.15);
        color: #ff9f0a;
        .icon { background: #ff9f0a; color: white; }
        &:hover { background: rgba(255, 159, 10, 0.25); }
      }

      &.info {
        background: rgba(0, 122, 255, 0.15);
        color: #007aff;
        .icon { background: #007aff; color: white; }
        &:hover { background: rgba(0, 122, 255, 0.25); }
      }

      &.action {
        background: rgba(94, 106, 210, 0.15);
        color: var(--accent);
        .icon { background: var(--accent); color: white; }
        &:hover { background: rgba(94, 106, 210, 0.25); }
      }

      &.promise {
        background: rgba(175, 82, 222, 0.15);
        color: #af52de;
        .icon { background: #af52de; color: white; }
        &:hover { background: rgba(175, 82, 222, 0.25); }
        &:disabled { opacity: 0.7; cursor: not-allowed; }
      }
    }

    .position-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      button {
        padding: 0.5rem 0.75rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 0.75rem;
        transition: all 0.2s;

        &:hover {
          border-color: var(--accent);
        }

        &.active {
          background: var(--accent);
          border-color: var(--accent);
          color: white;
        }
      }
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;

      button {
        flex: 1;
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

    .preview-area {
      grid-column: 1 / -1;
      background: var(--bg-tertiary);
      border: 1px dashed var(--border-color);
      border-radius: 12px;
      min-height: 300px;
      position: relative;
      overflow: hidden;
    }

    .preview-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--text-muted);
      font-size: 0.875rem;
      pointer-events: none;
    }

    /* Toast Stack */
    .toast-stack {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 360px;
      width: 100%;
      padding: 1rem;

      &.top-right {
        top: 0;
        right: 0;
      }

      &.top-center {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &.bottom-right {
        bottom: 0;
        right: 0;
        flex-direction: column-reverse;
      }

      &.bottom-center {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        flex-direction: column-reverse;
      }
    }

    /* Toast */
    .toast {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &.success {
        border-left: 3px solid #34c759;
        .toast-icon { color: #34c759; }
        .toast-progress-bar { background: #34c759; }
      }

      &.error {
        border-left: 3px solid #ff3b30;
        .toast-icon { color: #ff3b30; }
        .toast-progress-bar { background: #ff3b30; }
      }

      &.warning {
        border-left: 3px solid #ff9f0a;
        .toast-icon { color: #ff9f0a; }
        .toast-progress-bar { background: #ff9f0a; }
      }

      &.info {
        border-left: 3px solid #007aff;
        .toast-icon { color: #007aff; }
        .toast-progress-bar { background: #007aff; }
      }
    }

    .toast-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.875rem;
      margin-bottom: 2px;
    }

    .toast-message {
      color: var(--text-secondary);
      font-size: 0.8125rem;
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;

      &:hover {
        color: var(--text-primary);
      }
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
    }

    .toast-progress-bar {
      height: 100%;
      transition: width 0.1s linear;
    }

    /* Custom Builder */
    .custom-builder {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .builder-row {
      display: flex;
      gap: 1rem;

      label {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.75rem;
        color: var(--text-secondary);
      }

      input, select {
        padding: 0.5rem 0.75rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        color: var(--text-primary);
        font-size: 0.875rem;

        &:focus {
          outline: none;
          border-color: var(--accent);
        }
      }
    }

    .show-custom-btn {
      padding: 0.75rem 1.5rem;
      background: var(--accent);
      border: none;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;

      &:hover {
        opacity: 0.9;
      }
    }

    /* Action Toast */
    .action-toast {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--bg-tertiary);
      border-radius: 8px;
      margin-top: 1rem;

      span {
        color: var(--text-primary);
        font-size: 0.875rem;
      }

      button {
        padding: 4px 12px;
        background: var(--accent);
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 0.8125rem;
      }
    }
  `]
})
export class Chapter8Lesson2 {
  toasts = signal<Toast[]>([]);
  position = signal<ToastPosition>('top-right');
  positions: ToastPosition[] = ['top-right', 'top-center', 'bottom-right', 'bottom-center'];

  customTitle = signal('Custom Title');
  customMessage = signal('This is a custom toast message');
  customDuration = signal(5000);
  customType = signal<ToastType>('info');

  showingActionToast = signal(false);
  promiseLoading = signal(false);

  private toastId = 0;
  private toastTimers = new Map<number, ReturnType<typeof setInterval>>();

  private toastConfigs: Record<ToastType, { title: string; message: string }> = {
    success: { title: 'Success!', message: 'Your action was completed successfully.' },
    error: { title: 'Error', message: 'Something went wrong. Please try again.' },
    warning: { title: 'Warning', message: 'This action may have consequences.' },
    info: { title: 'Information', message: 'Here is some useful information.' }
  };

  setPosition(pos: ToastPosition) {
    this.position.set(pos);
  }

  showToast(type: ToastType, title?: string, message?: string, duration = 5000) {
    const config = this.toastConfigs[type];
    const id = ++this.toastId;

    const toast: Toast = {
      id,
      type,
      title: title ?? config.title,
      message: message ?? config.message,
      duration,
      progress: 100
    };

    this.toasts.update(toasts => [...toasts, toast]);

    // Animate in
    setTimeout(() => {
      const element = document.querySelector(`[data-id="${id}"]`);
      if (element) {
        const isTop = this.position().startsWith('top');
        animate(element, {
          opacity: [0, 1],
          y: [isTop ? -20 : 20, 0],
          scale: [0.9, 1]
        }, {
          type: spring,
          stiffness: 400,
          damping: 30
        });
      }
    }, 10);

    // Progress timer
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);

      this.toasts.update(toasts =>
        toasts.map(t => t.id === id ? { ...t, progress: remaining } : t)
      );

      if (remaining <= 0) {
        clearInterval(timer);
        this.dismissToast(id);
      }
    }, 50);

    this.toastTimers.set(id, timer);
  }

  dismissToast(id: number) {
    const timer = this.toastTimers.get(id);
    if (timer) {
      clearInterval(timer);
      this.toastTimers.delete(id);
    }

    const element = document.querySelector(`[data-id="${id}"]`);
    if (element) {
      const isRight = this.position().endsWith('right');
      animate(element, {
        opacity: 0,
        x: isRight ? 100 : 0,
        scale: 0.9
      }, {
        duration: 0.2
      }).then(() => {
        this.toasts.update(toasts => toasts.filter(t => t.id !== id));
      });
    } else {
      this.toasts.update(toasts => toasts.filter(t => t.id !== id));
    }
  }

  showMultipleToasts() {
    const types: ToastType[] = ['success', 'info', 'warning'];
    types.forEach((type, i) => {
      setTimeout(() => this.showToast(type), i * 300);
    });
  }

  clearAllToasts() {
    const currentToasts = this.toasts();
    currentToasts.forEach((toast, i) => {
      setTimeout(() => this.dismissToast(toast.id), i * 100);
    });
  }

  showCustomToast() {
    this.showToast(
      this.customType(),
      this.customTitle(),
      this.customMessage(),
      this.customDuration()
    );
  }

  showActionToast() {
    this.showingActionToast.set(true);

    const element = document.querySelector('.action-toast');
    if (element) {
      animate(element, {
        opacity: [0, 1],
        y: [10, 0]
      }, {
        duration: 0.2
      });
    }

    setTimeout(() => {
      if (this.showingActionToast()) {
        const el = document.querySelector('.action-toast');
        if (el) {
          animate(el, { opacity: 0, y: -10 }, { duration: 0.2 }).then(() => {
            this.showingActionToast.set(false);
          });
        }
      }
    }, 5000);
  }

  undoAction() {
    this.showingActionToast.set(false);
    this.showToast('success', 'Restored', 'Item has been restored');
  }

  showPromiseToast() {
    this.promiseLoading.set(true);
    this.showToast('info', 'Uploading...', 'Your file is being uploaded');

    // Simulate async operation
    setTimeout(() => {
      this.promiseLoading.set(false);
      this.showToast('success', 'Upload Complete', 'Your file has been uploaded successfully');
    }, 3000);
  }
}
