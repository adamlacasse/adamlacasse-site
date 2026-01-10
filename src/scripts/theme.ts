/**
 * Theme management module
 * Handles dark mode toggling with localStorage persistence
 * Supports: light, dark, system (OS preference)
 */

type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme-preference';

export function getThemePreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
}

export function getEffectiveTheme(preference: ThemePreference): 'light' | 'dark' {
  if (preference === 'light' || preference === 'dark') {
    return preference;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(preference: ThemePreference): void {
  const effective = getEffectiveTheme(preference);
  document.documentElement.style.colorScheme = effective;
  document.documentElement.setAttribute('data-theme', preference);
}

export function toggleTheme(): void {
  const current = getThemePreference();
  let next: ThemePreference;

  switch (current) {
    case 'light':
      next = 'dark';
      break;
    case 'dark':
      next = 'system';
      break;
    case 'system':
    default:
      next = 'light';
  }

  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
  updateButton(next);
}

export function updateButton(preference: ThemePreference): void {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const label = getEffectiveTheme(preference) === 'dark' ? 'Light' : 'Dark';
  button.setAttribute('aria-pressed', getEffectiveTheme(preference) === 'dark' ? 'true' : 'false');
  button.setAttribute('aria-label', `Switch to ${label === 'Dark' ? 'dark' : 'light'} theme`);
}

export function initThemeToggle(): void {
  // Initialize on first load
  const preference = getThemePreference();
  applyTheme(preference);
  updateButton(preference);

  // Attach click handler to toggle button
  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', toggleTheme);
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const current = getThemePreference();
    if (current === 'system') {
      applyTheme('system');
      updateButton('system');
    }
  });
}
