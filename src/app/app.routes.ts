import { Routes } from '@angular/router';

/**
 * @REVIEW Application routes configuration
 * Lazy loads all chapter components for optimal bundle splitting
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then(m => m.HomePage)
  },

  // Chapter 1: Fundamentals
  {
    path: 'chapter/1/lesson/1',
    loadComponent: () => import('./chapters/chapter-1/lesson-1').then(m => m.Chapter1Lesson1)
  },
  {
    path: 'chapter/1/lesson/2',
    loadComponent: () => import('./chapters/chapter-1/lesson-2').then(m => m.Chapter1Lesson2)
  },
  {
    path: 'chapter/1/lesson/3',
    loadComponent: () => import('./chapters/chapter-1/lesson-3').then(m => m.Chapter1Lesson3)
  },

  // Chapter 2: Scroll Animations
  {
    path: 'chapter/2/lesson/1',
    loadComponent: () => import('./chapters/chapter-2/lesson-1').then(m => m.Chapter2Lesson1)
  },
  {
    path: 'chapter/2/lesson/2',
    loadComponent: () => import('./chapters/chapter-2/lesson-2').then(m => m.Chapter2Lesson2)
  },
  {
    path: 'chapter/2/lesson/3',
    loadComponent: () => import('./chapters/chapter-2/lesson-3').then(m => m.Chapter2Lesson3)
  },

  // Chapter 3: User Interactions
  {
    path: 'chapter/3/lesson/1',
    loadComponent: () => import('./chapters/chapter-3/lesson-1').then(m => m.Chapter3Lesson1)
  },
  {
    path: 'chapter/3/lesson/2',
    loadComponent: () => import('./chapters/chapter-3/lesson-2').then(m => m.Chapter3Lesson2)
  },
  {
    path: 'chapter/3/lesson/3',
    loadComponent: () => import('./chapters/chapter-3/lesson-3').then(m => m.Chapter3Lesson3)
  },

  // Chapter 4: Timeline & Sequences
  {
    path: 'chapter/4/lesson/1',
    loadComponent: () => import('./chapters/chapter-4/lesson-1').then(m => m.Chapter4Lesson1)
  },
  {
    path: 'chapter/4/lesson/2',
    loadComponent: () => import('./chapters/chapter-4/lesson-2').then(m => m.Chapter4Lesson2)
  },
  {
    path: 'chapter/4/lesson/3',
    loadComponent: () => import('./chapters/chapter-4/lesson-3').then(m => m.Chapter4Lesson3)
  },

  // Chapter 5: Linear-Style UI
  {
    path: 'chapter/5/lesson/1',
    loadComponent: () => import('./chapters/chapter-5/lesson-1').then(m => m.Chapter5Lesson1)
  },
  {
    path: 'chapter/5/lesson/2',
    loadComponent: () => import('./chapters/chapter-5/lesson-2').then(m => m.Chapter5Lesson2)
  },
  {
    path: 'chapter/5/lesson/3',
    loadComponent: () => import('./chapters/chapter-5/lesson-3').then(m => m.Chapter5Lesson3)
  },

  // Chapter 6: Airbnb-Style
  {
    path: 'chapter/6/lesson/1',
    loadComponent: () => import('./chapters/chapter-6/lesson-1').then(m => m.Chapter6Lesson1)
  },
  {
    path: 'chapter/6/lesson/2',
    loadComponent: () => import('./chapters/chapter-6/lesson-2').then(m => m.Chapter6Lesson2)
  },
  {
    path: 'chapter/6/lesson/3',
    loadComponent: () => import('./chapters/chapter-6/lesson-3').then(m => m.Chapter6Lesson3)
  },

  // Chapter 7: Dynamic Island
  {
    path: 'chapter/7/lesson/1',
    loadComponent: () => import('./chapters/chapter-7/lesson-1').then(m => m.Chapter7Lesson1)
  },
  {
    path: 'chapter/7/lesson/2',
    loadComponent: () => import('./chapters/chapter-7/lesson-2').then(m => m.Chapter7Lesson2)
  },
  {
    path: 'chapter/7/lesson/3',
    loadComponent: () => import('./chapters/chapter-7/lesson-3').then(m => m.Chapter7Lesson3)
  },

  // Chapter 8: Premium UX
  {
    path: 'chapter/8/lesson/1',
    loadComponent: () => import('./chapters/chapter-8/lesson-1').then(m => m.Chapter8Lesson1)
  },
  {
    path: 'chapter/8/lesson/2',
    loadComponent: () => import('./chapters/chapter-8/lesson-2').then(m => m.Chapter8Lesson2)
  },
  {
    path: 'chapter/8/lesson/3',
    loadComponent: () => import('./chapters/chapter-8/lesson-3').then(m => m.Chapter8Lesson3)
  },

  // @REVIEW Chapter 9: Angular Practical
  {
    path: 'chapter/9/lesson/1',
    loadComponent: () => import('./chapters/chapter-9/lesson-1').then(m => m.Chapter9Lesson1)
  },
  {
    path: 'chapter/9/lesson/2',
    loadComponent: () => import('./chapters/chapter-9/lesson-2').then(m => m.Chapter9Lesson2)
  },
  {
    path: 'chapter/9/lesson/3',
    loadComponent: () => import('./chapters/chapter-9/lesson-3').then(m => m.Chapter9Lesson3)
  },
  {
    path: 'chapter/9/lesson/4',
    loadComponent: () => import('./chapters/chapter-9/lesson-4').then(m => m.Chapter9Lesson4)
  },

  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];
