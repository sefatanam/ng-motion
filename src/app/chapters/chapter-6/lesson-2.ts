import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

@Component({
  selector: 'app-chapter6-lesson2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="6"
      title="Card Expand/Collapse"
      description="Create Airbnb's signature expanding card animations for detailed views and modals.">
      
      <!-- Demo 1: Expandable Card -->
      <section class="demo-section">
        <h2 class="section-title">1. Card to Modal</h2>
        <p class="section-desc">Click card to expand into full view.</p>
        
        <div class="demo-area">
          <div class="card-grid">
            @for (card of expandCards(); track card.id) {
              <div 
                class="expand-card"
                [class.expanded]="expandedCardId() === card.id"
                (click)="toggleExpandCard(card.id)">
                <div class="expand-card-image" [style.background]="card.gradient">
                  @if (expandedCardId() !== card.id) {
                    <div class="card-quick-info">
                      <span class="quick-price">{{ card.price }}</span>
                    </div>
                  }
                </div>
                <div class="expand-card-content">
                  <h3>{{ card.title }}</h3>
                  <p class="card-location">{{ card.location }}</p>
                  @if (expandedCardId() === card.id) {
                    <div class="card-details">
                      <p class="card-description">{{ card.description }}</p>
                      <div class="card-amenities">
                        @for (amenity of card.amenities; track amenity) {
                          <span class="amenity">{{ amenity }}</span>
                        }
                      </div>
                      <div class="card-actions">
                        <button class="btn btn-secondary">Save</button>
                        <button class="btn btn-primary">Book Now</button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 2: Accordion List -->
      <section class="demo-section">
        <h2 class="section-title">2. Accordion Sections</h2>
        <p class="section-desc">Expand sections to reveal more information.</p>
        
        <div class="demo-area">
          <div class="accordion-list">
            @for (section of accordionSections(); track section.id) {
              <div class="accordion-item" [class.open]="openAccordion() === section.id">
                <button class="accordion-header" (click)="toggleAccordion(section.id)">
                  <div class="accordion-title">
                    <span class="accordion-icon">{{ section.icon }}</span>
                    <span>{{ section.title }}</span>
                  </div>
                  <span class="accordion-arrow">{{ openAccordion() === section.id ? '−' : '+' }}</span>
                </button>
                @if (openAccordion() === section.id) {
                  <div class="accordion-content">
                    <p>{{ section.content }}</p>
                    @if (section.items) {
                      <ul class="accordion-items">
                        @for (item of section.items; track item) {
                          <li>{{ item }}</li>
                        }
                      </ul>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 3: Info Drawer -->
      <section class="demo-section">
        <h2 class="section-title">3. Bottom Drawer</h2>
        <p class="section-desc">Pull-up drawer for additional content.</p>
        
        <div class="demo-area drawer-demo">
          <div class="drawer-preview">
            <div class="preview-card" (click)="openDrawer()">
              <div class="preview-image"></div>
              <div class="preview-info">
                <h4>Lakeside Cabin</h4>
                <p>$189/night</p>
              </div>
              <span class="preview-arrow">↑</span>
            </div>
          </div>
          
          @if (drawerOpen()) {
            <div class="drawer-overlay" (click)="closeDrawer()">
              <div class="drawer-content" (click)="$event.stopPropagation()">
                <div class="drawer-handle"></div>
                <div class="drawer-body">
                  <div class="drawer-header">
                    <h3>Lakeside Cabin</h3>
                    <span class="rating">★ 4.95</span>
                  </div>
                  <p class="drawer-desc">Peaceful retreat on the lake with stunning mountain views. Perfect for a weekend getaway.</p>
                  <div class="drawer-features">
                    <div class="feature">
                      <span class="feature-icon">🛏️</span>
                      <span>3 bedrooms</span>
                    </div>
                    <div class="feature">
                      <span class="feature-icon">🚿</span>
                      <span>2 bathrooms</span>
                    </div>
                    <div class="feature">
                      <span class="feature-icon">👥</span>
                      <span>6 guests</span>
                    </div>
                  </div>
                  <div class="drawer-actions">
                    <button class="btn btn-primary full-width">Reserve · $189/night</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Demo 4: Map Pin Expand -->
      <section class="demo-section">
        <h2 class="section-title">4. Map Pin Popup</h2>
        <p class="section-desc">Expanding pin markers on map hover.</p>
        
        <div class="demo-area">
          <div class="map-demo">
            @for (pin of mapPins(); track pin.id) {
              <div 
                class="map-pin"
                [style.left.%]="pin.x"
                [style.top.%]="pin.y"
                [class.active]="activePin() === pin.id"
                (mouseenter)="setActivePin(pin.id)"
                (mouseleave)="setActivePin(null)">
                <div class="pin-marker">{{ pin.price }}</div>
                @if (activePin() === pin.id) {
                  <div class="pin-popup">
                    <div class="popup-image" [style.background]="pin.gradient"></div>
                    <div class="popup-info">
                      <span class="popup-title">{{ pin.title }}</span>
                      <span class="popup-rating">★ {{ pin.rating }}</span>
                    </div>
                  </div>
                }
              </div>
            }
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
      background: var(--bg-tertiary);
      border-radius: var(--radius-lg);
      padding: 24px;
    }

    /* Expand Cards */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .expand-card {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .expand-card:hover:not(.expanded) {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.2);
    }

    .expand-card.expanded {
      grid-column: span 2;
    }

    .expand-card-image {
      height: 150px;
      position: relative;
      transition: height 0.3s ease;
    }

    .expand-card.expanded .expand-card-image {
      height: 250px;
    }

    .card-quick-info {
      position: absolute;
      bottom: 12px;
      left: 12px;
    }

    .quick-price {
      background: white;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 14px;
    }

    .expand-card-content {
      padding: 16px;
    }

    .expand-card-content h3 {
      font-size: 16px;
      margin-bottom: 4px;
    }

    .card-location {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .card-details {
      margin-top: 16px;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card-description {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .card-amenities {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .amenity {
      padding: 4px 12px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-full);
      font-size: 12px;
    }

    .card-actions {
      display: flex;
      gap: 8px;
    }

    /* Accordion */
    .accordion-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .accordion-item {
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .accordion-item.open {
      border-color: var(--accent-primary);
    }

    .accordion-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: transparent;
      text-align: left;
      cursor: pointer;
    }

    .accordion-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      font-weight: 500;
    }

    .accordion-icon {
      font-size: 20px;
    }

    .accordion-arrow {
      font-size: 20px;
      color: var(--text-tertiary);
    }

    .accordion-content {
      padding: 0 20px 20px;
      animation: expandIn 0.2s ease;
    }

    @keyframes expandIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .accordion-content p {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .accordion-items {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .accordion-items li {
      font-size: 14px;
      padding-left: 20px;
      position: relative;
    }

    .accordion-items li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--success);
    }

    /* Drawer */
    .drawer-demo {
      min-height: 400px;
      position: relative;
    }

    .drawer-preview {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .preview-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      cursor: pointer;
    }

    .preview-image {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: var(--radius-md);
    }

    .preview-info {
      flex: 1;
    }

    .preview-info h4 {
      font-size: 15px;
      margin-bottom: 2px;
    }

    .preview-info p {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .preview-arrow {
      font-size: 20px;
      color: var(--text-tertiary);
    }

    .drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      align-items: flex-end;
      animation: fadeIn 0.2s ease;
    }

    .drawer-content {
      width: 100%;
      max-height: 80vh;
      background: var(--bg-secondary);
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }

    .drawer-handle {
      width: 40px;
      height: 4px;
      background: var(--text-tertiary);
      border-radius: var(--radius-full);
      margin: 12px auto;
    }

    .drawer-body {
      padding: 20px 24px 32px;
    }

    .drawer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .drawer-header h3 {
      font-size: 20px;
    }

    .rating {
      font-size: 14px;
    }

    .drawer-desc {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .drawer-features {
      display: flex;
      gap: 24px;
      margin-bottom: 24px;
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .feature-icon {
      font-size: 18px;
    }

    .drawer-actions {
      display: flex;
    }

    .full-width {
      width: 100%;
    }

    /* Map Pins */
    .map-demo {
      height: 300px;
      background: linear-gradient(135deg, #1e3a5f, #2d5a7b);
      border-radius: var(--radius-lg);
      position: relative;
    }

    .map-pin {
      position: absolute;
      transform: translate(-50%, -100%);
      z-index: 1;
    }

    .map-pin.active {
      z-index: 10;
    }

    .pin-marker {
      padding: 6px 12px;
      background: white;
      border-radius: var(--radius-full);
      font-size: 13px;
      font-weight: 600;
      box-shadow: var(--shadow-md);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .map-pin.active .pin-marker {
      background: var(--accent-primary);
      color: white;
      transform: scale(1.1);
    }

    .pin-popup {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
      width: 200px;
      background: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      animation: popupIn 0.2s ease;
    }

    @keyframes popupIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    .popup-image {
      height: 100px;
    }

    .popup-info {
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .popup-title {
      font-size: 13px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .popup-rating {
      font-size: 12px;
      color: #666;
    }
  `]
})
export class Chapter6Lesson2 {
  readonly expandCards = signal([
    {
      id: 1,
      title: 'Modern Loft Downtown',
      location: 'San Francisco, CA',
      price: '$245/night',
      description: 'Stunning modern loft in the heart of the city. Floor-to-ceiling windows with panoramic views.',
      amenities: ['WiFi', 'Kitchen', 'Parking', 'Gym'],
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
    },
    {
      id: 2,
      title: 'Cozy Beach Cottage',
      location: 'Santa Monica, CA',
      price: '$189/night',
      description: 'Steps from the beach with private patio. Perfect for a relaxing coastal getaway.',
      amenities: ['Ocean View', 'BBQ', 'Bikes', 'Patio'],
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
    }
  ]);

  readonly accordionSections = signal([
    {
      id: 1,
      icon: '🏠',
      title: 'About this space',
      content: 'This stylish home is perfect for families or groups looking for a comfortable stay.',
      items: ['Entire home', 'Self check-in', 'Free cancellation']
    },
    {
      id: 2,
      icon: '🛏️',
      title: 'Sleeping arrangements',
      content: 'This home has 3 bedrooms with the following sleeping arrangements:',
      items: ['Master: 1 king bed', 'Guest Room: 1 queen bed', 'Kids Room: 2 twin beds']
    },
    {
      id: 3,
      icon: '✨',
      title: 'What this place offers',
      content: 'This property comes fully equipped with modern amenities for your comfort.',
      items: ['Fast WiFi', 'Dedicated workspace', 'Full kitchen', 'Free parking']
    }
  ]);

  readonly mapPins = signal([
    { id: 1, x: 20, y: 30, price: '$189', title: 'Beach House', rating: 4.92, gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { id: 2, x: 45, y: 50, price: '$245', title: 'Modern Loft', rating: 4.88, gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { id: 3, x: 70, y: 35, price: '$312', title: 'Luxury Villa', rating: 4.95, gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { id: 4, x: 60, y: 70, price: '$156', title: 'Cozy Studio', rating: 4.85, gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' }
  ]);

  readonly expandedCardId = signal<number | null>(null);
  readonly openAccordion = signal<number | null>(1);
  readonly drawerOpen = signal(false);
  readonly activePin = signal<number | null>(null);

  toggleExpandCard(id: number): void {
    this.expandedCardId.update(current => current === id ? null : id);
  }

  toggleAccordion(id: number): void {
    this.openAccordion.update(current => current === id ? null : id);
  }

  openDrawer(): void {
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  setActivePin(id: number | null): void {
    this.activePin.set(id);
  }
}
