import { Component, ChangeDetectionStrategy, signal, inject, afterNextRender, viewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { animate, stagger } from 'motion';

interface Lesson {
  title: string;
  path: string;
}

interface Chapter {
  id: number;
  title: string;
  icon: string;
  lessons: Lesson[];
}

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <span class="logo-icon">◆</span>
            <span class="logo-text">ng-motion</span>
          </div>
          <span class="version">v1.0</span>
        </div>

        <nav #navContainer class="nav">
          @for (chapter of chapters(); track chapter.id) {
            <div class="nav-chapter">
              <button 
                class="chapter-header"
                [class.expanded]="expandedChapters().has(chapter.id)"
                (click)="toggleChapter(chapter.id)">
                <span class="chapter-icon">{{ chapter.icon }}</span>
                <span class="chapter-title">{{ chapter.title }}</span>
                <span class="chapter-arrow">›</span>
              </button>
              
              @if (expandedChapters().has(chapter.id)) {
                <div class="chapter-lessons">
                  @for (lesson of chapter.lessons; track lesson.path) {
                    <a 
                      class="lesson-link"
                      [routerLink]="lesson.path"
                      routerLinkActive="active">
                      {{ lesson.title }}
                    </a>
                  }
                </div>
              }
            </div>
          }
        </nav>

        <div class="sidebar-footer">
          <a href="https://motion.dev/docs" target="_blank" class="footer-link">
            📚 Motion Docs
          </a>
        </div>
      </aside>

      <main class="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .sidebar {
      width: 280px;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    .sidebar-header {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-color);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo-icon {
      font-size: 20px;
      color: var(--accent-primary);
    }

    .logo-text {
      font-size: 16px;
      font-weight: 600;
    }

    .version {
      font-size: 11px;
      color: var(--text-tertiary);
      background: var(--bg-tertiary);
      padding: 2px 8px;
      border-radius: var(--radius-full);
    }

    .nav {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
    }

    .nav-chapter {
      margin-bottom: 4px;
    }

    .chapter-header {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: var(--radius-md);
      text-align: left;
      transition: background var(--transition-fast);
    }

    .chapter-header:hover {
      background: var(--bg-hover);
    }

    .chapter-icon {
      font-size: 16px;
    }

    .chapter-title {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
    }

    .chapter-arrow {
      font-size: 14px;
      color: var(--text-tertiary);
      transition: transform var(--transition-fast);
    }

    .chapter-header.expanded .chapter-arrow {
      transform: rotate(90deg);
    }

    .chapter-lessons {
      padding: 4px 0 8px 38px;
    }

    .lesson-link {
      display: block;
      padding: 8px 12px;
      font-size: 13px;
      color: var(--text-secondary);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      border-left: 2px solid transparent;
      margin-left: -2px;
    }

    .lesson-link:hover {
      color: var(--text-primary);
      background: var(--bg-hover);
    }

    .lesson-link.active {
      color: var(--accent-primary);
      background: var(--accent-glow);
      border-left-color: var(--accent-primary);
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid var(--border-color);
    }

    .footer-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      font-size: 13px;
      color: var(--text-secondary);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
    }

    .footer-link:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 32px 40px;
    }
  `]
})
export class AppLayout {
  private router = inject(Router);
  navContainer = viewChild<ElementRef<HTMLElement>>('navContainer');

  readonly chapters = signal<Chapter[]>([
    {
      id: 1,
      title: 'Fundamentals',
      icon: '🎯',
      lessons: [
        { title: 'Basic Animate', path: '/chapter/1/lesson/1' },
        { title: 'Springs & Easing', path: '/chapter/1/lesson/2' },
        { title: 'Stagger Animations', path: '/chapter/1/lesson/3' }
      ]
    },
    {
      id: 2,
      title: 'Scroll Animations',
      icon: '📜',
      lessons: [
        { title: 'InView Triggers', path: '/chapter/2/lesson/1' },
        { title: 'Scroll Progress', path: '/chapter/2/lesson/2' },
        { title: 'Parallax Effects', path: '/chapter/2/lesson/3' }
      ]
    },
    {
      id: 3,
      title: 'User Interactions',
      icon: '👆',
      lessons: [
        { title: 'Hover Effects', path: '/chapter/3/lesson/1' },
        { title: 'Press Animations', path: '/chapter/3/lesson/2' },
        { title: 'Drag Interactions', path: '/chapter/3/lesson/3' }
      ]
    },
    {
      id: 4,
      title: 'Timeline & Sequences',
      icon: '⏱️',
      lessons: [
        { title: 'Animation Sequences', path: '/chapter/4/lesson/1' },
        { title: 'Orchestrated Animations', path: '/chapter/4/lesson/2' },
        { title: 'Complex Timelines', path: '/chapter/4/lesson/3' }
      ]
    },
    {
      id: 5,
      title: 'Linear-Style',
      icon: '💜',
      lessons: [
        { title: 'Smooth Card Transitions', path: '/chapter/5/lesson/1' },
        { title: 'List Item Animations', path: '/chapter/5/lesson/2' },
        { title: 'Modal Animations', path: '/chapter/5/lesson/3' }
      ]
    },
    {
      id: 6,
      title: 'Airbnb-Style',
      icon: '🏠',
      lessons: [
        { title: 'Image Gallery', path: '/chapter/6/lesson/1' },
        { title: 'Card Expand/Collapse', path: '/chapter/6/lesson/2' },
        { title: 'Search Bar Animation', path: '/chapter/6/lesson/3' }
      ]
    },
    {
      id: 7,
      title: 'Dynamic Island',
      icon: '📱',
      lessons: [
        { title: 'Morphing Container', path: '/chapter/7/lesson/1' },
        { title: 'State Transitions', path: '/chapter/7/lesson/2' },
        { title: 'Full Dynamic Island', path: '/chapter/7/lesson/3' }
      ]
    },
    {
      id: 8,
      title: 'Premium UX',
      icon: '✨',
      lessons: [
        { title: 'Skeleton Loaders', path: '/chapter/8/lesson/1' },
        { title: 'Notification Toasts', path: '/chapter/8/lesson/2' },
        { title: 'Page Transitions', path: '/chapter/8/lesson/3' }
      ]
    },
    {
      id: 9,
      title: 'Angular Practical',
      icon: '🔧',
      lessons: [
        { title: 'Click & Button Feedback', path: '/chapter/9/lesson/1' },
        { title: 'Hover & Focus States', path: '/chapter/9/lesson/2' },
        { title: 'Show/Hide & Lists', path: '/chapter/9/lesson/3' },
        { title: 'Choreography & Layout', path: '/chapter/9/lesson/4' }
      ]
    }
  ]);

  readonly expandedChapters = signal<Set<number>>(new Set([1]));

  constructor() {
    afterNextRender(() => {
      this.animateSidebar();
    });
  }

  toggleChapter(id: number): void {
    this.expandedChapters.update(set => {
      const newSet = new Set(set);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  private animateSidebar(): void {
    const nav = this.navContainer()?.nativeElement;
    if (nav) {
      const chapters = nav.querySelectorAll('.nav-chapter') as NodeListOf<HTMLElement>;
      chapters.forEach((chapter, i) => {
        chapter.style.opacity = '0';
        chapter.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          animate(chapter, { opacity: 1, transform: 'translateX(0)' } as any, {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          });
        }, i * 50);
      });
    }
  }
}
