import { Component, ChangeDetectionStrategy, input, afterNextRender, viewChild, ElementRef } from '@angular/core';
import { animate } from 'motion';

@Component({
  selector: 'app-lesson-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="lesson-layout">
      <header #lessonHeader class="lesson-header">
        <div class="lesson-meta">
          <span class="chapter-badge">Chapter {{ chapter() }}</span>
        </div>
        <h1 class="lesson-title">{{ title() }}</h1>
        <p class="lesson-description">{{ description() }}</p>
      </header>

      <div class="lesson-content">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .lesson-layout {
      max-width: 900px;
    }

    .lesson-header {
      margin-bottom: 40px;
    }

    .lesson-meta {
      margin-bottom: 12px;
    }

    .chapter-badge {
      display: inline-block;
      padding: 4px 12px;
      background: var(--accent-glow);
      color: var(--accent-primary);
      font-size: 12px;
      font-weight: 500;
      border-radius: var(--radius-full);
    }

    .lesson-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
    }

    .lesson-description {
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .lesson-content {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
  `]
})
export class LessonLayout {
  readonly chapter = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();

  lessonHeader = viewChild<ElementRef<HTMLElement>>('lessonHeader');

  constructor() {
    afterNextRender(() => {
      const header = this.lessonHeader()?.nativeElement;
      if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        animate(
          header,
          { opacity: 1, transform: 'translateY(0)' } as any,
          { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
        );
      }
    });
  }
}
