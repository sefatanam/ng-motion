import { Component, ChangeDetectionStrategy, signal, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, spring } from 'motion';

@Component({
  selector: 'app-chapter6-lesson3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="6"
      title="Search Bar Animation"
      description="Recreate Airbnb's iconic expanding search bar with smooth morphing transitions.">
      
      <!-- Demo 1: Expandable Search -->
      <section class="demo-section">
        <h2 class="section-title">1. Expanding Search Bar</h2>
        <p class="section-desc">Click to expand into full search experience.</p>
        
        <div class="demo-area search-demo">
          @if (!searchExpanded()) {
            <div class="search-collapsed" (click)="expandSearch()">
              <span class="search-text">Where to?</span>
              <div class="search-pills">
                <span class="pill">Anywhere</span>
                <span class="divider">·</span>
                <span class="pill">Any week</span>
                <span class="divider">·</span>
                <span class="pill">Add guests</span>
              </div>
              <button class="search-icon-btn">🔍</button>
            </div>
          } @else {
            <div class="search-expanded">
              <div class="search-tabs">
                @for (tab of searchTabs(); track tab) {
                  <button 
                    class="search-tab"
                    [class.active]="activeTab() === tab"
                    (click)="setActiveTab(tab)">
                    {{ tab }}
                  </button>
                }
              </div>
              
              <div class="search-fields">
                <div class="field-group" [class.active]="activeField() === 'where'">
                  <label>Where</label>
                  <input 
                    type="text" 
                    placeholder="Search destinations"
                    (focus)="setActiveField('where')" />
                </div>
                <div class="field-divider"></div>
                <div class="field-group" [class.active]="activeField() === 'checkin'">
                  <label>Check in</label>
                  <span class="field-value" (click)="setActiveField('checkin')">Add dates</span>
                </div>
                <div class="field-divider"></div>
                <div class="field-group" [class.active]="activeField() === 'checkout'">
                  <label>Check out</label>
                  <span class="field-value" (click)="setActiveField('checkout')">Add dates</span>
                </div>
                <div class="field-divider"></div>
                <div class="field-group guests" [class.active]="activeField() === 'guests'">
                  <div class="guest-info" (click)="setActiveField('guests')">
                    <label>Who</label>
                    <span class="field-value">Add guests</span>
                  </div>
                  <button class="search-btn" (click)="doSearch()">
                    <span>🔍</span>
                    Search
                  </button>
                </div>
              </div>
              
              <button class="close-search" (click)="collapseSearch()">×</button>
            </div>
          }
        </div>
      </section>

      <!-- Demo 2: Quick Suggestions -->
      <section class="demo-section">
        <h2 class="section-title">2. Search Suggestions</h2>
        <p class="section-desc">Type to show animated suggestions.</p>
        
        <div class="demo-area">
          <div class="suggestions-demo">
            <div class="search-input-wrapper">
              <span class="input-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Where are you going?"
                [value]="searchQuery()"
                (input)="updateSearchQuery($event)"
                (focus)="showSuggestions()"
                (blur)="hideSuggestions()" />
              @if (searchQuery()) {
                <button class="clear-btn" (click)="clearSearch()">×</button>
              }
            </div>
            
            @if (suggestionsVisible() && filteredSuggestions().length > 0) {
              <div class="suggestions-list">
                @for (suggestion of filteredSuggestions(); track suggestion.id) {
                  <div class="suggestion-item" (mousedown)="selectSuggestion(suggestion)">
                    <div class="suggestion-icon">{{ suggestion.icon }}</div>
                    <div class="suggestion-info">
                      <span class="suggestion-name">{{ suggestion.name }}</span>
                      <span class="suggestion-type">{{ suggestion.type }}</span>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 3: Filter Pills -->
      <section class="demo-section">
        <h2 class="section-title">3. Filter Animations</h2>
        <p class="section-desc">Toggle filters with smooth transitions.</p>
        
        <div class="demo-area">
          <div class="filters-container">
            <div class="filter-pills">
              @for (filter of filters(); track filter.id) {
                <button 
                  class="filter-pill"
                  [class.active]="activeFilters().has(filter.id)"
                  (click)="toggleFilter(filter.id)">
                  <span class="filter-icon">{{ filter.icon }}</span>
                  <span class="filter-label">{{ filter.label }}</span>
                  @if (activeFilters().has(filter.id)) {
                    <span class="filter-check">✓</span>
                  }
                </button>
              }
            </div>
            
            @if (activeFilters().size > 0) {
              <div class="active-filters-bar">
                <span>{{ activeFilters().size }} filters applied</span>
                <button class="clear-filters" (click)="clearFilters()">Clear all</button>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 4: Date Picker -->
      <section class="demo-section">
        <h2 class="section-title">4. Date Range Selection</h2>
        <p class="section-desc">Animated date picker with range selection.</p>
        
        <div class="demo-area">
          <div class="date-picker-demo">
            <div class="date-selector" (click)="toggleDatePicker()">
              <div class="date-field">
                <label>Check-in</label>
                <span class="date-value">{{ selectedCheckIn() || 'Add date' }}</span>
              </div>
              <span class="date-arrow">→</span>
              <div class="date-field">
                <label>Check-out</label>
                <span class="date-value">{{ selectedCheckOut() || 'Add date' }}</span>
              </div>
            </div>
            
            @if (datePickerOpen()) {
              <div class="date-picker-popup">
                <div class="date-quick-options">
                  <button class="quick-option" (click)="setQuickDate('weekend')">This weekend</button>
                  <button class="quick-option" (click)="setQuickDate('week')">Next week</button>
                  <button class="quick-option" (click)="setQuickDate('month')">This month</button>
                </div>
                <div class="calendar-placeholder">
                  <p>Calendar would go here</p>
                  <div class="sample-dates">
                    @for (day of sampleDays(); track day) {
                      <button 
                        class="day-btn"
                        [class.selected]="selectedDays().includes(day)"
                        (click)="selectDay(day)">
                        {{ day }}
                      </button>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 5: Guest Counter -->
      <section class="demo-section">
        <h2 class="section-title">5. Guest Counter</h2>
        <p class="section-desc">Increment/decrement with animated feedback.</p>
        
        <div class="demo-area">
          <div class="guest-counter-demo">
            @for (counter of guestCounters(); track counter.id) {
              <div class="counter-row">
                <div class="counter-info">
                  <span class="counter-title">{{ counter.title }}</span>
                  <span class="counter-desc">{{ counter.description }}</span>
                </div>
                <div class="counter-controls">
                  <button 
                    class="counter-btn"
                    [disabled]="counter.value <= counter.min"
                    (click)="decrementCounter(counter.id)">
                    −
                  </button>
                  <span class="counter-value">{{ counter.value }}</span>
                  <button 
                    class="counter-btn"
                    [disabled]="counter.value >= counter.max"
                    (click)="incrementCounter(counter.id)">
                    +
                  </button>
                </div>
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

    /* Collapsed Search */
    .search-demo {
      min-height: 200px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .search-collapsed {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 12px 12px 24px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .search-collapsed:hover {
      box-shadow: var(--shadow-md);
      transform: scale(1.02);
    }

    .search-text {
      font-weight: 600;
      font-size: 14px;
    }

    .search-pills {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      font-size: 14px;
    }

    .pill {
      font-weight: 400;
    }

    .divider {
      opacity: 0.5;
    }

    .search-icon-btn {
      width: 48px;
      height: 48px;
      background: var(--accent-primary);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    /* Expanded Search */
    .search-expanded {
      width: 100%;
      max-width: 850px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 16px;
      position: relative;
      animation: expandIn 0.3s ease;
    }

    @keyframes expandIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .search-tabs {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-bottom: 16px;
    }

    .search-tab {
      background: none;
      border: none;
      padding: 8px 0;
      font-size: 15px;
      color: var(--text-secondary);
      cursor: pointer;
      position: relative;
    }

    .search-tab.active {
      color: var(--text-primary);
      font-weight: 600;
    }

    .search-tab.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--text-primary);
    }

    .search-fields {
      display: flex;
      background: var(--bg-secondary);
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
    }

    .field-group {
      flex: 1;
      padding: 14px 24px;
      border-radius: var(--radius-full);
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .field-group:hover,
    .field-group.active {
      background: var(--bg-hover);
    }

    .field-group label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 2px;
    }

    .field-group input {
      background: transparent;
      border: none;
      font-size: 14px;
      color: var(--text-primary);
      outline: none;
      width: 100%;
    }

    .field-value {
      font-size: 14px;
      color: var(--text-tertiary);
    }

    .field-divider {
      width: 1px;
      background: var(--border-color);
      margin: 12px 0;
    }

    .field-group.guests {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .search-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 24px;
      background: var(--accent-primary);
      color: white;
      border: none;
      border-radius: var(--radius-full);
      font-weight: 600;
      cursor: pointer;
    }

    .close-search {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      background: transparent;
      border: none;
      font-size: 24px;
      color: var(--text-tertiary);
      cursor: pointer;
    }

    /* Suggestions */
    .suggestions-demo {
      position: relative;
      max-width: 400px;
    }

    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
    }

    .input-icon {
      font-size: 18px;
    }

    .search-input-wrapper input {
      flex: 1;
      background: transparent;
      border: none;
      font-size: 15px;
      color: var(--text-primary);
      outline: none;
    }

    .clear-btn {
      width: 24px;
      height: 24px;
      background: var(--bg-tertiary);
      border: none;
      border-radius: 50%;
      font-size: 16px;
      color: var(--text-tertiary);
      cursor: pointer;
    }

    .suggestions-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      margin-top: 8px;
      overflow: hidden;
      animation: slideDown 0.2s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .suggestion-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .suggestion-item:hover {
      background: var(--bg-hover);
    }

    .suggestion-icon {
      width: 40px;
      height: 40px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .suggestion-name {
      font-size: 14px;
      font-weight: 500;
    }

    .suggestion-type {
      font-size: 12px;
      color: var(--text-tertiary);
      display: block;
    }

    /* Filters */
    .filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .filter-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-pill:hover {
      border-color: var(--text-tertiary);
    }

    .filter-pill.active {
      background: var(--accent-glow);
      border-color: var(--accent-primary);
    }

    .filter-check {
      color: var(--accent-primary);
    }

    .active-filters-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-lg);
      font-size: 14px;
      animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .clear-filters {
      background: none;
      border: none;
      color: var(--accent-primary);
      font-size: 14px;
      cursor: pointer;
      text-decoration: underline;
    }

    /* Date Picker */
    .date-picker-demo {
      max-width: 400px;
    }

    .date-selector {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      cursor: pointer;
    }

    .date-field {
      flex: 1;
    }

    .date-field label {
      display: block;
      font-size: 12px;
      color: var(--text-tertiary);
      margin-bottom: 2px;
    }

    .date-value {
      font-size: 14px;
    }

    .date-arrow {
      color: var(--text-tertiary);
    }

    .date-picker-popup {
      margin-top: 12px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 16px;
      animation: fadeIn 0.2s ease;
    }

    .date-quick-options {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .quick-option {
      padding: 8px 16px;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      font-size: 13px;
      cursor: pointer;
    }

    .quick-option:hover {
      border-color: var(--accent-primary);
    }

    .calendar-placeholder {
      padding: 24px;
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      text-align: center;
    }

    .calendar-placeholder p {
      color: var(--text-tertiary);
      margin-bottom: 16px;
    }

    .sample-dates {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .day-btn {
      width: 40px;
      height: 40px;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      background: transparent;
      cursor: pointer;
    }

    .day-btn.selected {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }

    /* Guest Counter */
    .guest-counter-demo {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
    }

    .counter-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-lg);
    }

    .counter-title {
      font-size: 15px;
      font-weight: 500;
      display: block;
    }

    .counter-desc {
      font-size: 13px;
      color: var(--text-tertiary);
    }

    .counter-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .counter-btn {
      width: 36px;
      height: 36px;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      background: transparent;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .counter-btn:hover:not(:disabled) {
      border-color: var(--text-primary);
    }

    .counter-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .counter-value {
      font-size: 16px;
      font-weight: 500;
      min-width: 24px;
      text-align: center;
    }
  `]
})
export class Chapter6Lesson3 {
  readonly searchExpanded = signal(false);
  readonly activeTab = signal('Stays');
  readonly activeField = signal<string | null>(null);
  readonly searchTabs = signal(['Stays', 'Experiences', 'Online Experiences']);

  readonly searchQuery = signal('');
  readonly suggestionsVisible = signal(false);

  readonly suggestions = signal([
    { id: 1, name: 'Los Angeles, California', type: 'City', icon: '🏙️' },
    { id: 2, name: 'London, United Kingdom', type: 'City', icon: '🇬🇧' },
    { id: 3, name: 'Lake Tahoe, California', type: 'Region', icon: '🏔️' },
    { id: 4, name: 'Las Vegas, Nevada', type: 'City', icon: '🎰' }
  ]);

  readonly filters = signal([
    { id: 1, icon: '🏠', label: 'Entire home' },
    { id: 2, icon: '🛏️', label: 'Private room' },
    { id: 3, icon: '💼', label: 'Work-friendly' },
    { id: 4, icon: '🏊', label: 'Pool' },
    { id: 5, icon: '🅿️', label: 'Free parking' },
    { id: 6, icon: '🐕', label: 'Pet friendly' }
  ]);

  readonly activeFilters = signal<Set<number>>(new Set());

  readonly datePickerOpen = signal(false);
  readonly selectedCheckIn = signal<string | null>(null);
  readonly selectedCheckOut = signal<string | null>(null);
  readonly selectedDays = signal<number[]>([]);
  readonly sampleDays = signal([15, 16, 17, 18, 19, 20, 21]);

  readonly guestCounters = signal([
    { id: 'adults', title: 'Adults', description: 'Ages 13 or above', value: 2, min: 1, max: 16 },
    { id: 'children', title: 'Children', description: 'Ages 2–12', value: 0, min: 0, max: 15 },
    { id: 'infants', title: 'Infants', description: 'Under 2', value: 0, min: 0, max: 5 },
    { id: 'pets', title: 'Pets', description: 'Bringing a service animal?', value: 0, min: 0, max: 5 }
  ]);

  get filteredSuggestions() {
    return () => {
      const query = this.searchQuery().toLowerCase();
      if (!query) return this.suggestions();
      return this.suggestions().filter(s => 
        s.name.toLowerCase().includes(query)
      );
    };
  }

  expandSearch(): void {
    this.searchExpanded.set(true);
  }

  collapseSearch(): void {
    this.searchExpanded.set(false);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  setActiveField(field: string): void {
    this.activeField.set(field);
  }

  doSearch(): void {
    this.collapseSearch();
  }

  updateSearchQuery(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  showSuggestions(): void {
    this.suggestionsVisible.set(true);
  }

  hideSuggestions(): void {
    setTimeout(() => this.suggestionsVisible.set(false), 200);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  selectSuggestion(suggestion: any): void {
    this.searchQuery.set(suggestion.name);
    this.suggestionsVisible.set(false);
  }

  toggleFilter(id: number): void {
    this.activeFilters.update(filters => {
      const newFilters = new Set(filters);
      if (newFilters.has(id)) {
        newFilters.delete(id);
      } else {
        newFilters.add(id);
      }
      return newFilters;
    });
  }

  clearFilters(): void {
    this.activeFilters.set(new Set());
  }

  toggleDatePicker(): void {
    this.datePickerOpen.update(v => !v);
  }

  setQuickDate(option: string): void {
    const today = new Date();
    if (option === 'weekend') {
      this.selectedCheckIn.set('Fri');
      this.selectedCheckOut.set('Sun');
    } else if (option === 'week') {
      this.selectedCheckIn.set('Mon');
      this.selectedCheckOut.set('Sun');
    } else {
      this.selectedCheckIn.set('1st');
      this.selectedCheckOut.set('30th');
    }
  }

  selectDay(day: number): void {
    this.selectedDays.update(days => {
      if (days.includes(day)) {
        return days.filter(d => d !== day);
      }
      return [...days, day].sort((a, b) => a - b);
    });
  }

  incrementCounter(id: string): void {
    this.guestCounters.update(counters =>
      counters.map(c => c.id === id && c.value < c.max ? { ...c, value: c.value + 1 } : c)
    );
  }

  decrementCounter(id: string): void {
    this.guestCounters.update(counters =>
      counters.map(c => c.id === id && c.value > c.min ? { ...c, value: c.value - 1 } : c)
    );
  }
}
