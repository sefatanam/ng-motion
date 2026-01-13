import { Component, ChangeDetectionStrategy, signal, afterNextRender, OnDestroy } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring, hover } from 'motion';

@Component({
  selector: 'app-chapter6-lesson1',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="6"
      title="Image Gallery"
      description="Create Airbnb's signature image gallery with smooth transitions, hover effects, and lightbox animations.">
      
      <!-- Demo 1: Image Grid Hover -->
      <section class="demo-section">
        <h2 class="section-title">1. Gallery Grid</h2>
        <p class="section-desc">Hover to preview with scale and shadow effects.</p>
        
        <div class="demo-area">
          <div class="gallery-grid">
            @for (image of galleryImages(); track image.id) {
              <div 
                class="gallery-item"
                [class.large]="image.large"
                (click)="openLightbox(image)">
                <div class="image-placeholder" [style.background]="image.gradient">
                  <span class="image-label">{{ image.label }}</span>
                </div>
                <div class="image-overlay">
                  <span class="overlay-icon">🔍</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 2: Carousel -->
      <section class="demo-section">
        <h2 class="section-title">2. Image Carousel</h2>
        <p class="section-desc">Swipe-style carousel with smooth transitions.</p>
        
        <div class="demo-area">
          <div class="carousel-container">
            <div class="carousel-track" [style.transform]="'translateX(' + carouselOffset() + 'px)'">
              @for (slide of carouselSlides(); track slide.id) {
                <div class="carousel-slide" [style.background]="slide.gradient">
                  <span class="slide-text">{{ slide.title }}</span>
                </div>
              }
            </div>
            <button class="carousel-btn prev" (click)="prevSlide()" [disabled]="currentSlide() === 0">‹</button>
            <button class="carousel-btn next" (click)="nextSlide()" [disabled]="currentSlide() === carouselSlides().length - 1">›</button>
            <div class="carousel-dots">
              @for (slide of carouselSlides(); track slide.id; let i = $index) {
                <button 
                  class="dot" 
                  [class.active]="i === currentSlide()"
                  (click)="goToSlide(i)">
                </button>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Demo 3: Masonry Layout -->
      <section class="demo-section">
        <h2 class="section-title">3. Masonry Gallery</h2>
        <p class="section-desc">Pinterest-style masonry with staggered reveal.</p>
        
        <div class="demo-area">
          <div class="masonry-grid">
            @for (item of masonryItems(); track item.id) {
              <div 
                class="masonry-item"
                [style.height.px]="item.height"
                [style.background]="item.gradient">
                <div class="masonry-content">
                  <span class="masonry-icon">{{ item.icon }}</span>
                  <span class="masonry-label">{{ item.label }}</span>
                </div>
              </div>
            }
          </div>
        </div>
        
        <div class="controls">
          <button class="btn btn-primary" (click)="animateMasonry()">Animate In</button>
          <button class="btn btn-secondary" (click)="resetMasonry()">Reset</button>
        </div>
      </section>

      <!-- Demo 4: Featured Listing -->
      <section class="demo-section">
        <h2 class="section-title">4. Featured Listing Card</h2>
        <p class="section-desc">Airbnb listing card with heart animation.</p>
        
        <div class="demo-area">
          <div class="listing-cards">
            @for (listing of listings(); track listing.id) {
              <div class="listing-card">
                <div class="listing-image" [style.background]="listing.gradient">
                  <button 
                    class="heart-btn"
                    [class.liked]="listing.liked"
                    (click)="toggleLike(listing)">
                    {{ listing.liked ? '❤️' : '🤍' }}
                  </button>
                  <div class="listing-badge" [class.superhost]="listing.superhost">
                    {{ listing.superhost ? 'Superhost' : 'Guest favorite' }}
                  </div>
                </div>
                <div class="listing-info">
                  <div class="listing-header">
                    <span class="listing-location">{{ listing.location }}</span>
                    <span class="listing-rating">★ {{ listing.rating }}</span>
                  </div>
                  <p class="listing-desc">{{ listing.description }}</p>
                  <p class="listing-price"><strong>{{ listing.price }}</strong> night</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Lightbox -->
      @if (lightboxOpen()) {
        <div class="lightbox-overlay" (click)="closeLightbox()">
          <div class="lightbox-content" (click)="$event.stopPropagation()">
            <button class="lightbox-close" (click)="closeLightbox()">×</button>
            <div class="lightbox-image" [style.background]="selectedImage().gradient">
              <span class="lightbox-label">{{ selectedImage().label }}</span>
            </div>
            <div class="lightbox-nav">
              <button class="nav-btn" (click)="prevImage()">‹</button>
              <span class="nav-counter">{{ lightboxIndex() + 1 }} / {{ galleryImages().length }}</span>
              <button class="nav-btn" (click)="nextImage()">›</button>
            </div>
          </div>
        </div>
      }
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

    /* Gallery Grid */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 120px;
      gap: 8px;
    }

    .gallery-item {
      border-radius: var(--radius-lg);
      overflow: hidden;
      cursor: pointer;
      position: relative;
    }

    .gallery-item.large {
      grid-column: span 2;
      grid-row: span 2;
    }

    .image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    .gallery-item:hover .image-placeholder {
      transform: scale(1.05);
    }

    .image-label {
      color: white;
      font-weight: 600;
      font-size: 14px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .gallery-item:hover .image-overlay {
      opacity: 1;
    }

    .overlay-icon {
      font-size: 24px;
    }

    /* Carousel */
    .carousel-container {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-lg);
    }

    .carousel-track {
      display: flex;
      transition: transform 0.4s ease;
    }

    .carousel-slide {
      min-width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .slide-text {
      color: white;
      font-size: 24px;
      font-weight: 700;
      text-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background: white;
      border: none;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      box-shadow: var(--shadow-md);
      transition: transform 0.2s ease;
    }

    .carousel-btn:hover:not(:disabled) {
      transform: translateY(-50%) scale(1.1);
    }

    .carousel-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .carousel-btn.prev { left: 16px; }
    .carousel-btn.next { right: 16px; }

    .carousel-dots {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 8px;
      height: 8px;
      background: rgba(255,255,255,0.5);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .dot.active {
      background: white;
      transform: scale(1.2);
    }

    /* Masonry */
    .masonry-grid {
      column-count: 3;
      column-gap: 12px;
    }

    .masonry-item {
      break-inside: avoid;
      margin-bottom: 12px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
      transition: transform 0.2s ease;
    }

    .masonry-item:hover {
      transform: translateY(-4px);
    }

    .masonry-content {
      text-align: center;
      color: white;
    }

    .masonry-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 8px;
    }

    .masonry-label {
      font-size: 14px;
      font-weight: 500;
    }

    /* Listings */
    .listing-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .listing-card {
      cursor: pointer;
    }

    .listing-image {
      height: 200px;
      border-radius: var(--radius-lg);
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .listing-card:hover .listing-image {
      transform: scale(1.02);
    }

    .heart-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 36px;
      height: 36px;
      background: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      transition: transform 0.2s ease;
    }

    .heart-btn:hover {
      transform: scale(1.2);
    }

    .heart-btn.liked {
      animation: heartPop 0.3s ease;
    }

    @keyframes heartPop {
      0% { transform: scale(1); }
      50% { transform: scale(1.4); }
      100% { transform: scale(1); }
    }

    .listing-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 4px 10px;
      background: white;
      border-radius: var(--radius-full);
      font-size: 12px;
      font-weight: 500;
    }

    .listing-badge.superhost {
      background: var(--accent-primary);
      color: white;
    }

    .listing-info {
      padding: 12px 0;
    }

    .listing-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .listing-location {
      font-weight: 600;
    }

    .listing-rating {
      font-size: 14px;
    }

    .listing-desc {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 4px;
    }

    .listing-price {
      font-size: 15px;
    }

    /* Lightbox */
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.9);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .lightbox-content {
      position: relative;
      width: 90%;
      max-width: 800px;
      animation: lightboxIn 0.3s ease;
    }

    @keyframes lightboxIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .lightbox-close {
      position: absolute;
      top: -48px;
      right: 0;
      width: 40px;
      height: 40px;
      background: transparent;
      border: none;
      color: white;
      font-size: 32px;
      cursor: pointer;
    }

    .lightbox-image {
      width: 100%;
      height: 500px;
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .lightbox-label {
      color: white;
      font-size: 32px;
      font-weight: 700;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }

    .lightbox-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      margin-top: 16px;
    }

    .nav-btn {
      width: 48px;
      height: 48px;
      background: white;
      border: none;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
    }

    .nav-counter {
      color: white;
      font-size: 14px;
    }
  `]
})
export class Chapter6Lesson1 implements OnDestroy {
  readonly galleryImages = signal([
    { id: 1, label: 'Living Room', gradient: 'linear-gradient(135deg, #667eea, #764ba2)', large: true },
    { id: 2, label: 'Kitchen', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 3, label: 'Bedroom', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 4, label: 'Bathroom', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { id: 5, label: 'View', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
  ]);

  readonly carouselSlides = signal([
    { id: 1, title: 'Mountain Cabin', gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)' },
    { id: 2, title: 'Beach House', gradient: 'linear-gradient(135deg, #00b4db, #0083b0)' },
    { id: 3, title: 'City Loft', gradient: 'linear-gradient(135deg, #e65c00, #f9d423)' },
    { id: 4, title: 'Forest Retreat', gradient: 'linear-gradient(135deg, #134e5e, #71b280)' }
  ]);

  readonly masonryItems = signal([
    { id: 1, height: 180, icon: '🏠', label: 'Home', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
    { id: 2, height: 120, icon: '🌊', label: 'Beach', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
    { id: 3, height: 200, icon: '🏔️', label: 'Mountain', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { id: 4, height: 150, icon: '🌆', label: 'City', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
    { id: 5, height: 130, icon: '🌲', label: 'Forest', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    { id: 6, height: 160, icon: '🏝️', label: 'Island', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)' }
  ]);

  readonly listings = signal([
    { id: 1, location: 'Malibu, California', description: 'Beachfront villa with ocean views', price: '$450', rating: 4.92, superhost: true, liked: false, gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 2, location: 'Aspen, Colorado', description: 'Cozy mountain cabin near slopes', price: '$280', rating: 4.87, superhost: false, liked: false, gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
  ]);

  readonly currentSlide = signal(0);
  readonly lightboxOpen = signal(false);
  readonly lightboxIndex = signal(0);

  private cleanupFns: (() => void)[] = [];

  get carouselOffset() {
    return () => -this.currentSlide() * 100 + '%';
  }

  get selectedImage() {
    return () => this.galleryImages()[this.lightboxIndex()];
  }

  constructor() {
    afterNextRender(() => {
      this.setupHoverEffects();
    });
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(fn => fn());
  }

  prevSlide(): void {
    if (this.currentSlide() > 0) {
      this.currentSlide.update(v => v - 1);
    }
  }

  nextSlide(): void {
    if (this.currentSlide() < this.carouselSlides().length - 1) {
      this.currentSlide.update(v => v + 1);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  animateMasonry(): void {
    const items = document.querySelectorAll('.masonry-item') as NodeListOf<HTMLElement>;
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        animate(item, { opacity: 1, transform: 'translateY(0)' } as any, { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] });
      }, i * 100);
    });
  }

  resetMasonry(): void {
    const items = document.querySelectorAll('.masonry-item') as NodeListOf<HTMLElement>;
    items.forEach(item => {
      animate(item, { opacity: 0, transform: 'translateY(20px)' } as any, { duration: 0.2 });
    });
  }

  toggleLike(listing: any): void {
    this.listings.update(items => 
      items.map(item => 
        item.id === listing.id ? { ...item, liked: !item.liked } : item
      )
    );
  }

  openLightbox(image: any): void {
    this.lightboxIndex.set(this.galleryImages().findIndex(i => i.id === image.id));
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  prevImage(): void {
    this.lightboxIndex.update(i => i > 0 ? i - 1 : this.galleryImages().length - 1);
  }

  nextImage(): void {
    this.lightboxIndex.update(i => i < this.galleryImages().length - 1 ? i + 1 : 0);
  }

  private setupHoverEffects(): void {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      const stop = hover(item, () => {
        const overlay = item.querySelector('.image-overlay');
        if (overlay) animate(overlay, { opacity: 1 }, { duration: 0.2 });
        return () => {
          if (overlay) animate(overlay, { opacity: 0 }, { duration: 0.2 });
        };
      });
      this.cleanupFns.push(stop);
    });
  }
}
