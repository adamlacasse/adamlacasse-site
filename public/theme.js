/* eslint-env browser */

const STORAGE_KEY = 'theme-preference';

const getThemePreference = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
};

const getEffectiveTheme = (preference) => {
  if (preference === 'light' || preference === 'dark') return preference;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (preference) => {
  const effective = getEffectiveTheme(preference);
  const root = document.documentElement;
  root.style.colorScheme = effective;
  root.setAttribute('data-theme', effective);
  root.setAttribute('data-theme-preference', preference);
};

const updateButton = (preference) => {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const effective = getEffectiveTheme(preference);
  const next = preference === 'light' ? 'dark' : preference === 'dark' ? 'system' : 'light';

  button.setAttribute('aria-pressed', effective === 'dark' ? 'true' : 'false');
  button.setAttribute('aria-label', `Switch to ${next} theme`);
};

const toggleTheme = () => {
  const current = getThemePreference();
  const next = current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';

  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
  updateButton(next);
};

const initThemeToggle = () => {
  const preference = getThemePreference();
  applyTheme(preference);
  updateButton(preference);

  const button = document.getElementById('theme-toggle');
  if (button) {
    button.addEventListener('click', toggleTheme);
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const current = getThemePreference();
    if (current === 'system') {
      applyTheme('system');
      updateButton('system');
    }
  });
};

// Apply immediately to avoid flashes
applyTheme(getThemePreference());

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle, { once: true });
} else {
  initThemeToggle();
}
