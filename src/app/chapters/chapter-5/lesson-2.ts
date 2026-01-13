import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { LessonLayout } from '../../shared/lesson-layout';
import { animate, stagger, spring } from 'motion';

@Component({
  selector: 'app-chapter5-lesson2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LessonLayout],
  template: `
    <app-lesson-layout
      chapter="5"
      title="List Item Animations"
      description="Master Linear's polished list interactions with reordering, filtering, and state transitions.">
      
      <!-- Demo 1: Filterable List -->
      <section class="demo-section">
        <h2 class="section-title">1. Filterable List</h2>
        <p class="section-desc">Smooth filtering with staggered animations.</p>
        
        <div class="demo-area">
          <div class="filter-controls">
            @for (filter of filters(); track filter.id) {
              <button 
                class="filter-btn"
                [class.active]="activeFilter() === filter.id"
                (click)="setFilter(filter.id)">
                {{ filter.label }}
              </button>
            }
          </div>
          
          <div class="filtered-list">
            @for (item of filteredItems(); track item.id) {
              <div class="list-item">
                <div class="item-status" [class]="item.status"></div>
                <span class="item-title">{{ item.title }}</span>
                <span class="item-tag" [class]="item.status">{{ item.status }}</span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 2: Sortable List -->
      <section class="demo-section">
        <h2 class="section-title">2. Sort Transitions</h2>
        <p class="section-desc">Animated sorting with smooth position changes.</p>
        
        <div class="demo-area">
          <div class="sort-controls">
            <button class="btn btn-secondary" (click)="sortByName()">Sort by Name</button>
            <button class="btn btn-secondary" (click)="sortByPriority()">Sort by Priority</button>
            <button class="btn btn-secondary" (click)="shuffleList()">Shuffle</button>
          </div>
          
          <div class="sortable-list">
            @for (item of sortableItems(); track item.id) {
              <div class="sortable-item">
                <span class="priority-dot" [style.background]="item.color"></span>
                <span class="item-name">{{ item.name }}</span>
                <span class="item-priority">P{{ item.priority }}</span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 3: Add/Remove Items -->
      <section class="demo-section">
        <h2 class="section-title">3. Add/Remove Animations</h2>
        <p class="section-desc">Smooth entrance and exit animations for list items.</p>
        
        <div class="demo-area">
          <div class="add-controls">
            <button class="btn btn-primary" (click)="addItem()">+ Add Item</button>
          </div>
          
          <div class="dynamic-list">
            @for (item of dynamicItems(); track item.id) {
              <div class="dynamic-item" [attr.data-id]="item.id">
                <span class="item-icon">{{ item.icon }}</span>
                <span class="item-text">{{ item.text }}</span>
                <button class="remove-btn" (click)="removeItem(item.id)">×</button>
              </div>
            }
            @empty {
              <div class="empty-state">
                <span>No items yet</span>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Demo 4: Selection State -->
      <section class="demo-section">
        <h2 class="section-title">4. Selection Animations</h2>
        <p class="section-desc">Multi-select with visual feedback.</p>
        
        <div class="demo-area">
          <div class="selection-list">
            @for (item of selectionItems(); track item.id) {
              <div 
                class="selection-item"
                [class.selected]="selectedIds().has(item.id)"
                (click)="toggleSelection(item.id)">
                <div class="checkbox" [class.checked]="selectedIds().has(item.id)">
                  @if (selectedIds().has(item.id)) {
                    <span class="check-icon">✓</span>
                  }
                </div>
                <span class="select-title">{{ item.title }}</span>
              </div>
            }
          </div>
          
          @if (selectedIds().size > 0) {
            <div class="selection-bar">
              {{ selectedIds().size }} selected
              <button class="btn btn-secondary" (click)="clearSelection()">Clear</button>
            </div>
          }
        </div>
      </section>

      <!-- Demo 5: Expandable List -->
      <section class="demo-section">
        <h2 class="section-title">5. Expandable Items</h2>
        <p class="section-desc">Click to expand/collapse with smooth height animation.</p>
        
        <div class="demo-area">
          <div class="expand-list">
            @for (item of expandItems(); track item.id) {
              <div class="expand-item" [class.expanded]="expandedId() === item.id">
                <div class="expand-header" (click)="toggleExpand(item.id)">
                  <span class="expand-icon">{{ expandedId() === item.id ? '−' : '+' }}</span>
                  <span class="expand-title">{{ item.title }}</span>
                </div>
                @if (expandedId() === item.id) {
                  <div class="expand-content">
                    <p>{{ item.content }}</p>
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

    /* Filter Controls */
    .filter-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .filter-btn {
      padding: 8px 16px;
      background: var(--bg-hover);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-full);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .filter-btn.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }

    .filtered-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .list-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      animation: fadeSlideIn 0.3s ease;
    }

    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .item-status {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .item-status.todo { background: var(--text-tertiary); }
    .item-status.progress { background: #f59e0b; }
    .item-status.done { background: #22c55e; }

    .item-title {
      flex: 1;
      font-size: 14px;
    }

    .item-tag {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }

    .item-tag.todo { background: var(--bg-tertiary); color: var(--text-tertiary); }
    .item-tag.progress { background: #f59e0b20; color: #f59e0b; }
    .item-tag.done { background: #22c55e20; color: #22c55e; }

    /* Sortable List */
    .sort-controls {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .sortable-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sortable-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      transition: transform 0.3s ease;
    }

    .priority-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .item-name {
      flex: 1;
      font-size: 14px;
    }

    .item-priority {
      font-size: 12px;
      color: var(--text-tertiary);
    }

    /* Dynamic List */
    .add-controls {
      margin-bottom: 16px;
    }

    .dynamic-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 100px;
    }

    .dynamic-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .item-icon {
      font-size: 18px;
    }

    .item-text {
      flex: 1;
      font-size: 14px;
    }

    .remove-btn {
      width: 24px;
      height: 24px;
      background: transparent;
      border: none;
      color: var(--text-tertiary);
      font-size: 18px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .remove-btn:hover {
      background: #ef444420;
      color: #ef4444;
    }

    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: var(--text-tertiary);
    }

    /* Selection List */
    .selection-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 16px;
    }

    .selection-item {
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

    .selection-item:hover {
      background: var(--bg-active);
    }

    .selection-item.selected {
      background: var(--accent-glow);
      border-color: var(--accent-primary);
    }

    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid var(--text-tertiary);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .checkbox.checked {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
    }

    .check-icon {
      color: white;
      font-size: 12px;
    }

    .selection-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      font-size: 13px;
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

    /* Expandable List */
    .expand-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .expand-item {
      background: var(--bg-hover);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .expand-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .expand-header:hover {
      background: var(--bg-active);
    }

    .expand-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: var(--text-tertiary);
    }

    .expand-title {
      font-size: 14px;
      font-weight: 500;
    }

    .expand-content {
      padding: 0 16px 16px 48px;
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

    .expand-content p {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
    }
  `]
})
export class Chapter5Lesson2 {
  readonly filters = signal([
    { id: 'all', label: 'All' },
    { id: 'todo', label: 'To Do' },
    { id: 'progress', label: 'In Progress' },
    { id: 'done', label: 'Done' }
  ]);

  readonly activeFilter = signal('all');

  readonly allItems = signal([
    { id: 1, title: 'Design homepage', status: 'done' },
    { id: 2, title: 'Implement auth', status: 'progress' },
    { id: 3, title: 'Write tests', status: 'todo' },
    { id: 4, title: 'Deploy to prod', status: 'todo' },
    { id: 5, title: 'Review PR', status: 'progress' }
  ]);

  readonly sortableItems = signal([
    { id: 1, name: 'Alpha Task', priority: 2, color: '#f59e0b' },
    { id: 2, name: 'Beta Task', priority: 1, color: '#ef4444' },
    { id: 3, name: 'Gamma Task', priority: 3, color: '#22c55e' },
    { id: 4, name: 'Delta Task', priority: 1, color: '#ef4444' }
  ]);

  readonly dynamicItems = signal([
    { id: 1, icon: '📝', text: 'First task' },
    { id: 2, icon: '🎯', text: 'Second task' }
  ]);

  readonly selectionItems = signal([
    { id: 1, title: 'Item One' },
    { id: 2, title: 'Item Two' },
    { id: 3, title: 'Item Three' },
    { id: 4, title: 'Item Four' }
  ]);

  readonly selectedIds = signal<Set<number>>(new Set());

  readonly expandItems = signal([
    { id: 1, title: 'What is motion.dev?', content: 'Motion is a powerful animation library for JavaScript and React applications, offering hardware-accelerated animations with a simple API.' },
    { id: 2, title: 'How to get started?', content: 'Install the package with npm install motion, then import the animate function to create your first animation.' },
    { id: 3, title: 'Is it production ready?', content: 'Yes! Motion is used by many production applications and is designed for performance and reliability.' }
  ]);

  readonly expandedId = signal<number | null>(null);

  private itemId = 3;

  get filteredItems() {
    return () => {
      const filter = this.activeFilter();
      const items = this.allItems();
      if (filter === 'all') return items;
      return items.filter(item => item.status === filter);
    };
  }

  setFilter(id: string): void {
    this.activeFilter.set(id);
  }

  sortByName(): void {
    this.sortableItems.update(items => 
      [...items].sort((a, b) => a.name.localeCompare(b.name))
    );
    this.animateSort();
  }

  sortByPriority(): void {
    this.sortableItems.update(items => 
      [...items].sort((a, b) => a.priority - b.priority)
    );
    this.animateSort();
  }

  shuffleList(): void {
    this.sortableItems.update(items => {
      const shuffled = [...items];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    this.animateSort();
  }

  private animateSort(): void {
    setTimeout(() => {
      const items = document.querySelectorAll('.sortable-item');
      animate(items, { opacity: [0.5, 1], y: [10, 0] }, { 
        delay: stagger(0.05),
        duration: 0.3
      });
    });
  }

  addItem(): void {
    const icons = ['📌', '🎨', '⚡', '🚀', '💡', '🔥'];
    const texts = ['New task', 'Important item', 'Quick note', 'Reminder'];
    
    this.dynamicItems.update(items => [
      ...items,
      {
        id: this.itemId++,
        icon: icons[Math.floor(Math.random() * icons.length)],
        text: texts[Math.floor(Math.random() * texts.length)]
      }
    ]);
  }

  removeItem(id: number): void {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el) {
      animate(el, { opacity: 0, x: -20 }, { duration: 0.2 }).then(() => {
        this.dynamicItems.update(items => items.filter(item => item.id !== id));
      });
    }
  }

  toggleSelection(id: number): void {
    this.selectedIds.update(ids => {
      const newIds = new Set(ids);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        newIds.add(id);
      }
      return newIds;
    });
  }

  clearSelection(): void {
    this.selectedIds.set(new Set());
  }

  toggleExpand(id: number): void {
    this.expandedId.update(current => current === id ? null : id);
  }
}
