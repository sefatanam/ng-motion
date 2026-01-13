import { Component, ChangeDetectionStrategy, afterNextRender, ElementRef, viewChild, signal, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, hover, spring } from 'motion';

@Component({
  selector: 'app-chapter5-lesson1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="5"
      title="Smooth Card Transitions"
      description="Recreate Linear's premium card interactions with subtle, refined animations that feel effortless.">
      
      <!-- Demo 1: Linear Issue Card -->
      <section class="demo-section">
        <h2 class="section-title">1. Issue Card Hover</h2>
        <p class="section-desc">Subtle elevation and border glow on hover.</p>
        
        <div class="demo-area">
          <div class="issue-list" #issueList>
            @for (issue of issues(); track issue.id) {
              <div class="issue-card">
                <div class="issue-status" [class]="issue.status"></div>
                <div class="issue-content">
                  <span class="issue-id">{{ issue.id }}</span>
                  <span class="issue-title">{{ issue.title }}</span>
                </div>
                <div class="issue-meta">
                  <span class="issue-priority" [class]="issue.priority">{{ issue.priority }}</span>
                  <span class="issue-assignee">{{ issue.assignee }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 2: Feature Card -->
      <section class="demo-section">
        <h2 class="section-title">2. Feature Card Animation</h2>
        <p class="section-desc">Cards with icon animation and smooth transitions.</p>
        
        <div class="demo-area">
          <div class="feature-cards">
            @for (feature of featureCards(); track feature.id) {
              <div class="feature-card">
                <div class="feature-icon-wrap">
                  <span class="feature-icon">{{ feature.icon }}</span>
                </div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-desc">{{ feature.desc }}</p>
                <div class="feature-arrow">→</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 3: Project Card -->
      <section class="demo-section">
        <h2 class="section-title">3. Project Card</h2>
        <p class="section-desc">Linear-style project cards with team avatars.</p>
        
        <div class="demo-area">
          <div class="project-cards">
            @for (project of projects(); track project.id) {
              <div class="project-card">
                <div class="project-header">
                  <div class="project-icon" [style.background]="project.color">
                    {{ project.icon }}
                  </div>
                  <div class="project-info">
                    <h4 class="project-name">{{ project.name }}</h4>
                    <span class="project-key">{{ project.key }}</span>
                  </div>
                </div>
                <div class="project-stats">
                  <div class="stat">
                    <span class="stat-value">{{ project.issues }}</span>
                    <span class="stat-label">Issues</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">{{ project.completed }}%</span>
                    <span class="stat-label">Complete</span>
                  </div>
                </div>
                <div class="project-team">
                  @for (member of project.team; track member) {
                    <div class="team-avatar">{{ member }}</div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 4: Keyboard Shortcut Card -->
      <section class="demo-section">
        <h2 class="section-title">4. Command Card</h2>
        <p class="section-desc">Command palette style cards with keyboard hints.</p>
        
        <div class="demo-area">
          <div class="command-list">
            @for (cmd of commands(); track cmd.id) {
              <div class="command-card">
                <div class="command-icon">{{ cmd.icon }}</div>
                <div class="command-info">
                  <span class="command-name">{{ cmd.name }}</span>
                  <span class="command-desc">{{ cmd.desc }}</span>
                </div>
                <div class="command-shortcut">
                  @for (key of cmd.keys; track key) {
                    <kbd class="key">{{ key }}</kbd>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 5: Notification Card -->
      <section class="demo-section">
        <h2 class="section-title">5. Activity Cards</h2>
        <p class="section-desc">Activity feed with smooth entrance animations.</p>
        
        <div class="demo-area">
          <div class="activity-feed" #activityFeed>
            @for (activity of activities(); track activity.id) {
              <div class="activity-card">
                <div class="activity-avatar" [style.background]="activity.color">
                  {{ activity.initials }}
                </div>
                <div class="activity-content">
                  <p class="activity-text">
                    <strong>{{ activity.user }}</strong> {{ activity.action }}
                  </p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="addActivity()">Add Activity</button>
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
      padding: 24px;
      margin-bottom: 16px;
    }

    .controls {
      display: flex;
      gap: 8px;
    }

    /* Issue Cards */
    .issue-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .issue-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border: 1px solid transparent;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .issue-card:hover {
      background: var(--bg-active);
      border-color: var(--accent-primary);
      transform: translateX(4px);
    }

    .issue-status {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid;
    }

    .issue-status.todo { border-color: var(--text-tertiary); }
    .issue-status.progress { border-color: #f59e0b; background: #f59e0b40; }
    .issue-status.done { border-color: #22c55e; background: #22c55e; }

    .issue-content {
      flex: 1;
      display: flex;
      gap: 12px;
    }

    .issue-id {
      color: var(--text-tertiary);
      font-size: 13px;
    }

    .issue-title {
      font-size: 14px;
    }

    .issue-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .issue-priority {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }

    .issue-priority.high { background: #ef444420; color: #ef4444; }
    .issue-priority.medium { background: #f59e0b20; color: #f59e0b; }
    .issue-priority.low { background: #22c55e20; color: #22c55e; }

    .issue-assignee {
      font-size: 13px;
      color: var(--text-tertiary);
    }

    /* Feature Cards */
    .feature-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .feature-card {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .feature-card:hover {
      border-color: var(--accent-primary);
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.2);
    }

    .feature-card:hover .feature-icon {
      transform: scale(1.1);
    }

    .feature-card:hover .feature-arrow {
      opacity: 1;
      transform: translateX(4px);
    }

    .feature-icon-wrap {
      width: 48px;
      height: 48px;
      background: var(--accent-glow);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .feature-icon {
      font-size: 24px;
      transition: transform 0.2s ease;
    }

    .feature-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .feature-desc {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .feature-arrow {
      position: absolute;
      top: 24px;
      right: 24px;
      font-size: 18px;
      color: var(--accent-primary);
      opacity: 0;
      transition: all 0.2s ease;
    }

    /* Project Cards */
    .project-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .project-card {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .project-card:hover {
      border-color: var(--accent-primary);
      box-shadow: 0 8px 24px rgba(99,102,241,0.15);
    }

    .project-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .project-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .project-name {
      font-size: 15px;
      font-weight: 600;
    }

    .project-key {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .project-stats {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 20px;
      font-weight: 600;
    }

    .stat-label {
      font-size: 11px;
      color: var(--text-tertiary);
    }

    .project-team {
      display: flex;
      gap: -8px;
    }

    .team-avatar {
      width: 28px;
      height: 28px;
      background: var(--accent-primary);
      border: 2px solid var(--bg-hover);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      color: white;
      margin-left: -8px;
    }

    .team-avatar:first-child {
      margin-left: 0;
    }

    /* Command Cards */
    .command-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .command-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .command-card:hover {
      background: var(--bg-active);
    }

    .command-icon {
      font-size: 18px;
    }

    .command-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .command-name {
      font-size: 14px;
      font-weight: 500;
    }

    .command-desc {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    .command-shortcut {
      display: flex;
      gap: 4px;
    }

    .key {
      padding: 4px 8px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      font-size: 11px;
      font-family: inherit;
    }

    /* Activity Cards */
    .activity-feed {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 300px;
      overflow-y: auto;
    }

    .activity-card {
      display: flex;
      gap: 12px;
      padding: 12px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      opacity: 0;
      transform: translateX(-20px);
      animation: slideIn 0.3s ease forwards;
    }

    @keyframes slideIn {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .activity-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color: white;
      flex-shrink: 0;
    }

    .activity-content {
      flex: 1;
    }

    .activity-text {
      font-size: 13px;
      margin-bottom: 2px;
    }

    .activity-time {
      font-size: 11px;
      color: var(--text-tertiary);
    }
  `]
})
export class Chapter5Lesson1 implements OnDestroy {
  readonly issueList = viewChild<ElementRef<HTMLElement>>('issueList');
  readonly activityFeed = viewChild<ElementRef<HTMLElement>>('activityFeed');

  readonly issues = signal([
    { id: 'LIN-123', title: 'Implement dark mode toggle', status: 'progress', priority: 'high', assignee: 'John' },
    { id: 'LIN-124', title: 'Fix navigation animation', status: 'todo', priority: 'medium', assignee: 'Sarah' },
    { id: 'LIN-125', title: 'Update documentation', status: 'done', priority: 'low', assignee: 'Mike' }
  ]);

  readonly featureCards = signal([
    { id: 1, icon: '⚡', title: 'Lightning Fast', desc: 'Built for speed with optimized performance' },
    { id: 2, icon: '🎨', title: 'Beautiful UI', desc: 'Crafted with attention to every detail' },
    { id: 3, icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security built in' }
  ]);

  readonly projects = signal([
    { id: 1, name: 'Frontend', key: 'FE', icon: '🎨', color: '#6366f1', issues: 24, completed: 68, team: ['JD', 'SK', 'MR'] },
    { id: 2, name: 'Backend', key: 'BE', icon: '⚙️', color: '#22c55e', issues: 18, completed: 82, team: ['AW', 'LP'] }
  ]);

  readonly commands = signal([
    { id: 1, icon: '🔍', name: 'Search', desc: 'Search everything', keys: ['⌘', 'K'] },
    { id: 2, icon: '📝', name: 'New Issue', desc: 'Create new issue', keys: ['C'] },
    { id: 3, icon: '📋', name: 'Copy Link', desc: 'Copy issue link', keys: ['⌘', 'L'] }
  ]);

  readonly activities = signal([
    { id: 1, user: 'John', action: 'created a new issue', time: '2m ago', initials: 'JD', color: '#6366f1' },
    { id: 2, user: 'Sarah', action: 'completed the task', time: '5m ago', initials: 'SK', color: '#22c55e' }
  ]);

  private cleanupFns: (() => void)[] = [];
  private activityId = 3;

  constructor() {
    afterNextRender(() => {
      this.setupHoverEffects();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  addActivity(): void {
    const newActivity = {
      id: this.activityId++,
      user: 'You',
      action: 'added a new activity',
      time: 'just now',
      initials: 'YO',
      color: '#ec4899'
    };

    this.activities.update(prev => [newActivity, ...prev]);
  }

  private setupHoverEffects(): void {
    const issueCards = document.querySelectorAll('.issue-card');
    issueCards.forEach((card) => {
      const stop = hover(card, () => {
        animate(card, { x: 4 }, { duration: 0.15 });
        return () => animate(card, { x: 0 }, { duration: 0.15 });
      });
      this.cleanupFns.push(stop);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card) => {
      const icon = card.querySelector('.feature-icon');
      const arrow = card.querySelector('.feature-arrow');
      
      const stop = hover(card, () => {
        animate(card, { y: -4 }, { duration: 0.2 });
        if (icon) animate(icon, { scale: 1.1 }, { duration: 0.2 });
        if (arrow) animate(arrow, { opacity: 1, x: 4 }, { duration: 0.2 });
        return () => {
          animate(card, { y: 0 }, { duration: 0.2 });
          if (icon) animate(icon, { scale: 1 }, { duration: 0.2 });
          if (arrow) animate(arrow, { opacity: 0, x: 0 }, { duration: 0.2 });
        };
      });
      this.cleanupFns.push(stop);
    });
  }
}
