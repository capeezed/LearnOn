import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'learnon-theme';
  private readonly rootElement = this.document.documentElement;

  readonly mode = signal<ThemeMode>('light');

  constructor() {
    this.initializeTheme();
  }

  readonly isDarkMode = () => this.mode() === 'dark';

  toggleTheme(): void {
    this.setTheme(this.isDarkMode() ? 'light' : 'dark');
  }

  setTheme(mode: ThemeMode): void {
    this.mode.set(mode);
    this.rootElement.classList.toggle('dark-theme', mode === 'dark');
    this.rootElement.setAttribute('data-theme', mode);
    this.document.body.classList.toggle('dark-theme', mode === 'dark');
    localStorage.setItem(this.storageKey, mode);
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.storageKey);
    const preferredTheme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : this.getSystemPreference();

    this.setTheme(preferredTheme);
  }

  private getSystemPreference(): ThemeMode {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
