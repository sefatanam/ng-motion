import { Component, ChangeDetectionStrategy, viewChild, ElementRef, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate, spring, stagger, inView } from 'motion';

/**
 * @REVIEW Home page with animated hero and chapter navigation
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section #heroSection class="hero">
        <div class="hero-content">
          <div #heroIcon class="hero-icon">✨</div>
          <h1 #heroTitle>Motion.dev + Angular</h1>
          <p #heroSubtitle>A comprehensive guide to creating premium animations with Motion.dev in Angular applications</p>
          <div #heroBadges class="hero-badges">
            <span class="badge">Angular 21</span>
            <span class="badge">Motion v12</span>
            <span class="badge">8 Chapters</span>
            <span class="badge">24 Lessons</span>
          </div>
        </div>
        <div #heroVisual class="hero-visual">
          <div class="floating-card card-1"></div>
          <div class="floating-card card-2"></div>
          <div class="floating-card card-3"></div>
        </div>
      </section>

      <!-- Chapters Grid -->
      <section class="chapters-section">
        <h2 #chaptersTitle>Chapters</h2>
        <div #chaptersGrid class="chapters-grid">
          @for (chapter of chapters; track chapter.id) {
            <a [routerLink]="['/chapter', chapter.id, 'lesson', 1]" class="chapter-card">
              <div class="chapter-icon" [style.background]="chapter.gradient">
                {{ chapter.icon }}
              </div>
              <div class="chapter-content">
                <span class="chapter-number">Chapter {{ chapter.id }}</span>
                <h3>{{ chapter.title }}</h3>
                <p>{{ chapter.description }}</p>
                <div class="chapter-lessons">
                  @for (lesson of chapter.lessons; track lesson) {
                    <span class="lesson-dot"></span>
                  }
                  <span class="lesson-count">{{ chapter.lessons.length }} lessons</span>
                </div>
              </div>
              <div class="chapter-arrow">→</div>
            </a>
          }
        </div>
      </section>

      <!-- Features Section -->
      <section #featuresSection class="features-section">
        <h2>What You'll Learn</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>Core Animations</h3>
            <p>Master the fundamentals of Motion.dev including springs, easing, and stagger effects</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>UI Patterns</h3>
            <p>Build Linear-style interfaces, Airbnb-inspired galleries, and Dynamic Island recreations</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Performance</h3>
            <p>Learn best practices for performant animations with Angular's change detection</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>Premium UX</h3>
            <p>Create skeleton loaders, toast notifications, and page transitions</p>
          </div>
        </div>
      </section>

      <!-- Quick Start -->
      <section class="quickstart-section">
        <div class="quickstart-card">
          <h2>Ready to Start?</h2>
          <p>Jump into Chapter 1 and learn the fundamentals of Motion.dev animations</p>
          <a routerLink="/chapter/1/lesson/1" class="start-button">
            Start Learning
            <span class="arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Hero Section */
    .hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      min-height: 60vh;
      padding: 4rem 0;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .hero-icon {
      font-size: 4rem;
      opacity: 0;
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
      margin: 0;
      opacity: 0;

      @media (max-width: 600px) {
        font-size: 2.5rem;
      }
    }

    .hero-content > p {
      font-size: 1.25rem;
      color: var(--text-secondary);
      line-height: 1.6;
      opacity: 0;
    }

    .hero-badges {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      opacity: 0;

      @media (max-width: 900px) {
        justify-content: center;
      }
    }

    .badge {
      padding: 0.5rem 1rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .hero-visual {
      position: relative;
      height: 400px;
      opacity: 0;

      @media (max-width: 900px) {
        display: none;
      }
    }

    .floating-card {
      position: absolute;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .card-1 {
      width: 200px;
      height: 150px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      top: 20%;
      left: 10%;
      animation: float1 6s ease-in-out infinite;
    }

    .card-2 {
      width: 160px;
      height: 120px;
      background: linear-gradient(135deg, #f093fb, #f5576c);
      top: 40%;
      right: 10%;
      animation: float2 7s ease-in-out infinite;
    }

    .card-3 {
      width: 180px;
      height: 130px;
      background: linear-gradient(135deg, #4facfe, #00f2fe);
      bottom: 15%;
      left: 25%;
      animation: float3 5s ease-in-out infinite;
    }

    @keyframes float1 {
      0%, 100% { transform: translateY(0) rotate(-5deg); }
      50% { transform: translateY(-20px) rotate(-3deg); }
    }

    @keyframes float2 {
      0%, 100% { transform: translateY(0) rotate(5deg); }
      50% { transform: translateY(-15px) rotate(8deg); }
    }

    @keyframes float3 {
      0%, 100% { transform: translateY(0) rotate(3deg); }
      50% { transform: translateY(-25px) rotate(0deg); }
    }

    /* Chapters Section */
    .chapters-section {
      padding: 4rem 0;

      h2 {
        font-size: 2rem;
        margin: 0 0 2rem 0;
        color: var(--text-primary);
        opacity: 0;
      }
    }

    .chapters-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .chapter-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      text-decoration: none;
      transition: all 0.3s;
      opacity: 0;

      &:hover {
        border-color: var(--accent);
        transform: translateX(8px);
        box-shadow: 0 10px 40px rgba(94, 106, 210, 0.1);
      }
    }

    .chapter-icon {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      flex-shrink: 0;
    }

    .chapter-content {
      flex: 1;

      .chapter-number {
        font-size: 0.75rem;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      h3 {
        margin: 0.25rem 0 0.5rem 0;
        font-size: 1.25rem;
        color: var(--text-primary);
      }

      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.5;
      }
    }

    .chapter-lessons {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 0.75rem;
    }

    .lesson-dot {
      width: 6px;
      height: 6px;
      background: var(--accent);
      border-radius: 50%;
      opacity: 0.5;
    }

    .lesson-count {
      margin-left: 8px;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .chapter-arrow {
      font-size: 1.5rem;
      color: var(--text-muted);
      transition: all 0.3s;
    }

    .chapter-card:hover .chapter-arrow {
      color: var(--accent);
      transform: translateX(4px);
    }

    /* Features Section */
    .features-section {
      padding: 4rem 0;

      h2 {
        font-size: 2rem;
        margin: 0 0 2rem 0;
        color: var(--text-primary);
        text-align: center;
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .feature-card {
      padding: 2rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      text-align: center;
      transition: all 0.3s;

      &:hover {
        border-color: var(--accent);
        transform: translateY(-4px);
      }
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.125rem;
      color: var(--text-primary);
    }

    .feature-card p {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    /* Quick Start Section */
    .quickstart-section {
      padding: 4rem 0;
    }

    .quickstart-card {
      padding: 3rem;
      background: linear-gradient(135deg, rgba(94, 106, 210, 0.1), rgba(94, 106, 210, 0.05));
      border: 1px solid var(--accent);
      border-radius: 24px;
      text-align: center;

      h2 {
        margin: 0 0 1rem 0;
        font-size: 2rem;
        color: var(--text-primary);
      }

      p {
        margin: 0 0 2rem 0;
        color: var(--text-secondary);
        font-size: 1.125rem;
      }
    }

    .start-button {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      background: var(--accent);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-size: 1.125rem;
      font-weight: 600;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(94, 106, 210, 0.3);
      }

      .arrow {
        transition: transform 0.3s;
      }

      &:hover .arrow {
        transform: translateX(4px);
      }
    }
  `]
})
export class HomePage {
  heroSection = viewChild<ElementRef<HTMLElement>>('heroSection');
  heroIcon = viewChild<ElementRef<HTMLElement>>('heroIcon');
  heroTitle = viewChild<ElementRef<HTMLElement>>('heroTitle');
  heroSubtitle = viewChild<ElementRef<HTMLElement>>('heroSubtitle');
  heroBadges = viewChild<ElementRef<HTMLElement>>('heroBadges');
  heroVisual = viewChild<ElementRef<HTMLElement>>('heroVisual');
  chaptersTitle = viewChild<ElementRef<HTMLElement>>('chaptersTitle');
  chaptersGrid = viewChild<ElementRef<HTMLElement>>('chaptersGrid');
  featuresSection = viewChild<ElementRef<HTMLElement>>('featuresSection');

  chapters = [
    {
      id: 1,
      title: 'Fundamentals',
      description: 'Learn the basics of Motion.dev including animate, springs, and stagger effects',
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      lessons: ['Basic Animate', 'Springs & Easing', 'Stagger Effects']
    },
    {
      id: 2,
      title: 'Scroll Animations',
      description: 'Create scroll-triggered animations, progress indicators, and parallax effects',
      icon: '📜',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      lessons: ['InView Triggers', 'Scroll Progress', 'Parallax Effects']
    },
    {
      id: 3,
      title: 'User Interactions',
      description: 'Build interactive hover states, press animations, and drag interactions',
      icon: '👆',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      lessons: ['Hover Effects', 'Press Animations', 'Drag Interactions']
    },
    {
      id: 4,
      title: 'Timeline & Sequences',
      description: 'Orchestrate complex animation sequences and choreographed reveals',
      icon: '⏱',
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      lessons: ['Animation Sequences', 'Orchestrated Animations', 'Complex Timelines']
    },
    {
      id: 5,
      title: 'Linear-Style UI',
      description: 'Recreate Linear app patterns with cards, lists, and modal animations',
      icon: '📋',
      gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
      lessons: ['Issue Cards', 'Animated Lists', 'Modal Animations']
    },
    {
      id: 6,
      title: 'Airbnb-Style',
      description: 'Build Airbnb-inspired image galleries, expanding cards, and search interactions',
      icon: '🏠',
      gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      lessons: ['Image Galleries', 'Expanding Cards', 'Search Animations']
    },
    {
      id: 7,
      title: 'Dynamic Island',
      description: 'Recreate iPhone Dynamic Island with morphing containers and state transitions',
      icon: '📱',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      lessons: ['Morphing Container', 'State Transitions', 'Full Dynamic Island']
    },
    {
      id: 8,
      title: 'Premium UX',
      description: 'Create premium UX patterns including skeleton loaders, toasts, and page transitions',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      lessons: ['Skeleton Loaders', 'Notification Toasts', 'Page Transitions']
    }
  ];

  constructor() {
    afterNextRender(() => {
      this.animateHero();
      this.setupScrollAnimations();
    });
  }

  private animateHero() {
    const icon = this.heroIcon()?.nativeElement;
    const title = this.heroTitle()?.nativeElement;
    const subtitle = this.heroSubtitle()?.nativeElement;
    const badges = this.heroBadges()?.nativeElement;
    const visual = this.heroVisual()?.nativeElement;

    if (icon) {
      icon.style.opacity = '0';
      icon.style.transform = 'scale(0.5) rotate(-180deg)';
      setTimeout(() => {
        animate(icon, { opacity: 1, transform: 'scale(1) rotate(0deg)' }, {
          type: spring,
          stiffness: 200,
          damping: 15
        });
      }, 100);
    }

    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateY(30px)';
      setTimeout(() => {
        animate(title, { opacity: 1, transform: 'translateY(0)' }, {
          duration: 0.6
        });
      }, 200);
    }

    if (subtitle) {
      subtitle.style.opacity = '0';
      subtitle.style.transform = 'translateY(20px)';
      setTimeout(() => {
        animate(subtitle, { opacity: 1, transform: 'translateY(0)' }, {
          duration: 0.6
        });
      }, 350);
    }

    if (badges) {
      badges.style.opacity = '0';
      badges.style.transform = 'translateY(20px)';
      setTimeout(() => {
        animate(badges, { opacity: 1, transform: 'translateY(0)' }, {
          duration: 0.6
        });
      }, 500);
    }

    if (visual) {
      visual.style.opacity = '0';
      visual.style.transform = 'scale(0.9)';
      setTimeout(() => {
        animate(visual, { opacity: 1, transform: 'scale(1)' }, {
          duration: 0.8
        });
      }, 400);
    }
  }

  private setupScrollAnimations() {
    // Chapters section
    const chaptersTitle = this.chaptersTitle()?.nativeElement;
    const chaptersGrid = this.chaptersGrid()?.nativeElement;

    if (chaptersTitle) {
      inView(chaptersTitle, () => {
        animate(chaptersTitle, { opacity: 1, transform: 'translateY(0)' }, { duration: 0.5 });
      }, { amount: 0.5 });
    }

    if (chaptersGrid) {
      inView(chaptersGrid, () => {
        const cards = chaptersGrid.querySelectorAll('.chapter-card') as NodeListOf<HTMLElement>;
        cards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateX(-30px)';
          setTimeout(() => {
            animate(card, { opacity: 1, transform: 'translateX(0)' }, { duration: 0.5 });
          }, i * 100);
        });
      }, { amount: 0.2 });
    }

    // Features section
    const featuresSection = this.featuresSection()?.nativeElement;
    if (featuresSection) {
      inView(featuresSection, () => {
        const cards = featuresSection.querySelectorAll('.feature-card') as NodeListOf<HTMLElement>;
        cards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            animate(card, { opacity: 1, transform: 'translateY(0)' }, { duration: 0.5 });
          }, i * 100);
        });
      }, { amount: 0.2 });
    }
  }
}
