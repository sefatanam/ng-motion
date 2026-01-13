import { Component, ChangeDetectionStrategy, viewChild, viewChildren, ElementRef, signal, afterNextRender, QueryList } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, stagger } from 'motion';

/**
 * @REVIEW Chapter 8 Lesson 1 - Skeleton Loaders
 * Premium loading states with shimmer effects and smooth content transitions
 */
@Component({
  selector: 'app-chapter8-lesson1',
  standalone: true,
  imports: [LessonLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-lesson-layout
      title="Skeleton Loaders"
      description="Premium loading states with shimmer effects, staggered reveals, and smooth transitions to content"
      chapter="8"
    >
      <div class="demos-grid">
        <!-- Basic Skeleton -->
        <div class="demo-section">
          <h3>Basic Skeleton</h3>
          <div class="skeleton-demo">
            @if (basicLoading()) {
              <div class="skeleton-card">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton-content">
                  <div class="skeleton skeleton-title"></div>
                  <div class="skeleton skeleton-text"></div>
                  <div class="skeleton skeleton-text short"></div>
                </div>
              </div>
            } @else {
              <div #basicContent class="real-card">
                <div class="avatar">JD</div>
                <div class="card-content">
                  <h4>John Doe</h4>
                  <p>Senior Software Engineer at TechCorp</p>
                  <span class="tag">Available for hire</span>
                </div>
              </div>
            }
          </div>
          <div class="controls">
            <button (click)="toggleBasicLoading()">
              {{ basicLoading() ? 'Show Content' : 'Show Skeleton' }}
            </button>
          </div>
        </div>

        <!-- Shimmer Effect -->
        <div class="demo-section">
          <h3>Shimmer Effect</h3>
          <div class="skeleton-demo">
            <div class="shimmer-card">
              <div class="skeleton shimmer skeleton-image"></div>
              <div class="shimmer-content">
                <div class="skeleton shimmer skeleton-title"></div>
                <div class="skeleton shimmer skeleton-text"></div>
                <div class="skeleton shimmer skeleton-text short"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Staggered Skeleton List -->
        <div class="demo-section">
          <h3>Staggered List</h3>
          <div class="skeleton-demo">
            @if (listLoading()) {
              <div class="skeleton-list">
                @for (item of [1,2,3,4]; track item) {
                  <div class="skeleton-list-item">
                    <div class="skeleton shimmer skeleton-icon"></div>
                    <div class="skeleton-item-content">
                      <div class="skeleton shimmer skeleton-title small"></div>
                      <div class="skeleton shimmer skeleton-text small"></div>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div #listContent class="real-list">
                @for (item of listItems; track item.id) {
                  <div class="list-item">
                    <div class="item-icon">{{ item.icon }}</div>
                    <div class="item-content">
                      <h4>{{ item.title }}</h4>
                      <p>{{ item.description }}</p>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
          <div class="controls">
            <button (click)="toggleListLoading()">
              {{ listLoading() ? 'Load Content' : 'Reset' }}
            </button>
          </div>
        </div>

        <!-- Content Grid Skeleton -->
        <div class="demo-section large">
          <h3>Content Grid</h3>
          <div class="skeleton-demo">
            @if (gridLoading()) {
              <div class="skeleton-grid">
                @for (item of [1,2,3,4,5,6]; track item) {
                  <div class="skeleton-grid-item">
                    <div class="skeleton shimmer skeleton-thumb"></div>
                    <div class="skeleton shimmer skeleton-title small"></div>
                    <div class="skeleton shimmer skeleton-text tiny"></div>
                  </div>
                }
              </div>
            } @else {
              <div #gridContent class="real-grid">
                @for (item of gridItems; track item.id) {
                  <div class="grid-item">
                    <div class="grid-thumb" [style.background]="item.color">
                      {{ item.icon }}
                    </div>
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.subtitle }}</p>
                  </div>
                }
              </div>
            }
          </div>
          <div class="controls">
            <button (click)="toggleGridLoading()">
              {{ gridLoading() ? 'Load Content' : 'Reset' }}
            </button>
          </div>
        </div>

        <!-- Article Skeleton -->
        <div class="demo-section">
          <h3>Article Layout</h3>
          <div class="skeleton-demo">
            @if (articleLoading()) {
              <div class="skeleton-article">
                <div class="skeleton shimmer skeleton-hero"></div>
                <div class="skeleton shimmer skeleton-headline"></div>
                <div class="article-meta-skeleton">
                  <div class="skeleton shimmer skeleton-avatar small"></div>
                  <div class="skeleton shimmer skeleton-text tiny"></div>
                </div>
                <div class="skeleton shimmer skeleton-paragraph"></div>
                <div class="skeleton shimmer skeleton-paragraph"></div>
                <div class="skeleton shimmer skeleton-paragraph short"></div>
              </div>
            } @else {
              <div #articleContent class="real-article">
                <div class="article-hero">📰</div>
                <h2>Breaking: New Animation Library Released</h2>
                <div class="article-meta">
                  <span class="author-avatar">SA</span>
                  <span>Sarah Anderson • 5 min read</span>
                </div>
                <p>Motion.dev brings unprecedented animation capabilities to web developers, enabling smooth and performant animations...</p>
              </div>
            }
          </div>
          <div class="controls">
            <button (click)="toggleArticleLoading()">
              {{ articleLoading() ? 'Load Article' : 'Reset' }}
            </button>
          </div>
        </div>

        <!-- Pulse Skeleton -->
        <div class="demo-section">
          <h3>Pulse Animation</h3>
          <div class="skeleton-demo">
            <div class="pulse-card">
              <div class="skeleton pulse skeleton-avatar large"></div>
              <div class="pulse-content">
                <div class="skeleton pulse skeleton-title"></div>
                <div class="skeleton pulse skeleton-text"></div>
                <div class="skeleton-row">
                  <div class="skeleton pulse skeleton-badge"></div>
                  <div class="skeleton pulse skeleton-badge"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-lesson-layout>
  `,
  styles: [`
    .demos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .demo-section {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 1.5rem;

      &.large {
        grid-column: 1 / -1;
      }

      h3 {
        margin: 0 0 1.5rem 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .skeleton-demo {
      min-height: 150px;
    }

    /* Base Skeleton Styles */
    .skeleton {
      background: linear-gradient(90deg, var(--bg-tertiary) 0%, var(--bg-secondary) 50%, var(--bg-tertiary) 100%);
      background-size: 200% 100%;
      border-radius: 4px;
    }

    .skeleton.shimmer {
      animation: shimmer 1.5s infinite;
    }

    .skeleton.pulse {
      animation: pulse-skeleton 1.5s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @keyframes pulse-skeleton {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Skeleton Sizes */
    .skeleton-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      flex-shrink: 0;

      &.small {
        width: 32px;
        height: 32px;
      }

      &.large {
        width: 64px;
        height: 64px;
      }
    }

    .skeleton-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .skeleton-title {
      height: 20px;
      width: 70%;
      margin-bottom: 8px;

      &.small {
        height: 16px;
        width: 60%;
      }
    }

    .skeleton-text {
      height: 14px;
      width: 100%;
      margin-bottom: 6px;

      &.short {
        width: 60%;
      }

      &.small {
        height: 12px;
      }

      &.tiny {
        height: 10px;
        width: 40%;
      }
    }

    .skeleton-image {
      width: 100%;
      height: 120px;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .skeleton-thumb {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .skeleton-hero {
      width: 100%;
      height: 100px;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .skeleton-headline {
      height: 24px;
      width: 90%;
      margin-bottom: 12px;
    }

    .skeleton-paragraph {
      height: 60px;
      width: 100%;
      margin-bottom: 8px;

      &.short {
        width: 80%;
      }
    }

    .skeleton-badge {
      width: 60px;
      height: 24px;
      border-radius: 12px;
    }

    /* Skeleton Card */
    .skeleton-card {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: var(--bg-tertiary);
      border-radius: 12px;
    }

    .skeleton-content {
      flex: 1;
    }

    /* Shimmer Card */
    .shimmer-card {
      background: var(--bg-tertiary);
      border-radius: 12px;
      overflow: hidden;
    }

    .shimmer-content {
      padding: 12px;
    }

    /* Skeleton List */
    .skeleton-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton-list-item {
      display: flex;
      gap: 12px;
      padding: 12px;
      background: var(--bg-tertiary);
      border-radius: 8px;
    }

    .skeleton-item-content {
      flex: 1;
    }

    /* Skeleton Grid */
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 16px;
    }

    .skeleton-grid-item {
      background: var(--bg-tertiary);
      border-radius: 12px;
      padding: 12px;
    }

    /* Skeleton Article */
    .skeleton-article {
      background: var(--bg-tertiary);
      border-radius: 12px;
      padding: 16px;
    }

    .article-meta-skeleton {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    /* Pulse Card */
    .pulse-card {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: var(--bg-tertiary);
      border-radius: 12px;
    }

    .pulse-content {
      flex: 1;
    }

    .skeleton-row {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    /* Real Content Styles */
    .real-card {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: var(--bg-tertiary);
      border-radius: 12px;
    }

    .avatar {
      width: 48px;
      height: 48px;
      background: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
      flex-shrink: 0;
    }

    .card-content {
      h4 {
        margin: 0 0 4px 0;
        font-size: 1rem;
        color: var(--text-primary);
      }

      p {
        margin: 0 0 8px 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }

    .tag {
      display: inline-block;
      padding: 4px 8px;
      background: rgba(94, 106, 210, 0.2);
      color: var(--accent);
      border-radius: 4px;
      font-size: 0.75rem;
    }

    /* Real List */
    .real-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .list-item {
      display: flex;
      gap: 12px;
      padding: 12px;
      background: var(--bg-tertiary);
      border-radius: 8px;
    }

    .item-icon {
      width: 40px;
      height: 40px;
      background: var(--accent);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .item-content {
      h4 {
        margin: 0 0 2px 0;
        font-size: 0.875rem;
        color: var(--text-primary);
      }

      p {
        margin: 0;
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
    }

    /* Real Grid */
    .real-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 16px;
    }

    .grid-item {
      background: var(--bg-tertiary);
      border-radius: 12px;
      padding: 12px;
      text-align: center;
    }

    .grid-thumb {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 8px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }

    .grid-item h4 {
      margin: 0 0 4px 0;
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .grid-item p {
      margin: 0;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    /* Real Article */
    .real-article {
      background: var(--bg-tertiary);
      border-radius: 12px;
      padding: 16px;
    }

    .article-hero {
      width: 100%;
      height: 100px;
      background: linear-gradient(135deg, var(--accent), #ff6b6b);
      border-radius: 8px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
    }

    .real-article h2 {
      margin: 0 0 8px 0;
      font-size: 1.125rem;
      color: var(--text-primary);
    }

    .article-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .author-avatar {
      width: 24px;
      height: 24px;
      background: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.625rem;
      color: white;
      font-weight: 600;
    }

    .real-article p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;

      button {
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
  `]
})
export class Chapter8Lesson1 {
  basicContent = viewChild<ElementRef<HTMLElement>>('basicContent');
  listContent = viewChild<ElementRef<HTMLElement>>('listContent');
  gridContent = viewChild<ElementRef<HTMLElement>>('gridContent');
  articleContent = viewChild<ElementRef<HTMLElement>>('articleContent');

  basicLoading = signal(true);
  listLoading = signal(true);
  gridLoading = signal(true);
  articleLoading = signal(true);

  listItems = [
    { id: 1, icon: '📁', title: 'Documents', description: '24 files' },
    { id: 2, icon: '🖼', title: 'Images', description: '156 photos' },
    { id: 3, icon: '🎵', title: 'Music', description: '89 songs' },
    { id: 4, icon: '🎬', title: 'Videos', description: '12 clips' }
  ];

  gridItems = [
    { id: 1, icon: '🎨', title: 'Design', subtitle: '12 projects', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 2, icon: '💻', title: 'Code', subtitle: '8 repos', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 3, icon: '📊', title: 'Analytics', subtitle: '5 dashboards', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 4, icon: '📝', title: 'Docs', subtitle: '34 files', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 5, icon: '🔧', title: 'Tools', subtitle: '15 utilities', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { id: 6, icon: '🚀', title: 'Deploy', subtitle: '3 pipelines', color: 'linear-gradient(135deg, #a8edea, #fed6e3)' }
  ];

  toggleBasicLoading() {
    const loading = this.basicLoading();
    this.basicLoading.set(!loading);

    if (loading) {
      setTimeout(() => {
        const content = this.basicContent()?.nativeElement;
        if (content) {
          animate(content, {
            opacity: [0, 1],
            y: [10, 0]
          }, {
            duration: 0.3
          });
        }
      }, 50);
    }
  }

  toggleListLoading() {
    const loading = this.listLoading();
    this.listLoading.set(!loading);

    if (loading) {
      setTimeout(() => {
        const content = this.listContent()?.nativeElement;
        if (content) {
          const items = content.querySelectorAll('.list-item');
          animate(items, {
            opacity: [0, 1],
            x: [-20, 0]
          }, {
            duration: 0.3,
            delay: stagger(0.1)
          });
        }
      }, 50);
    }
  }

  toggleGridLoading() {
    const loading = this.gridLoading();
    this.gridLoading.set(!loading);

    if (loading) {
      setTimeout(() => {
        const content = this.gridContent()?.nativeElement;
        if (content) {
          const items = content.querySelectorAll('.grid-item');
          animate(items, {
            opacity: [0, 1],
            scale: [0.8, 1]
          }, {
            duration: 0.3,
            delay: stagger(0.05)
          });
        }
      }, 50);
    }
  }

  toggleArticleLoading() {
    const loading = this.articleLoading();
    this.articleLoading.set(!loading);

    if (loading) {
      setTimeout(() => {
        const content = this.articleContent()?.nativeElement;
        if (content) {
          animate(content, {
            opacity: [0, 1],
            y: [20, 0]
          }, {
            duration: 0.4
          });
        }
      }, 50);
    }
  }
}
