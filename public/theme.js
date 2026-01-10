const STORAGE_KEY = 'theme-preference';

const getThemePreference = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  // Default to system preference on first visit
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getEffectiveTheme = (preference) => {
  return preference; // No longer need to resolve 'system' - always light or dark
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

  const next = preference === 'light' ? 'dark' : 'light';

  button.setAttribute('aria-pressed', preference === 'dark' ? 'true' : 'false');
  button.setAttribute('aria-label', `Switch to ${next} theme`);
};

const toggleTheme = () => {
  const current = getThemePreference();
  const next = current === 'light' ? 'dark' : 'light';

  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
  updateButton(next);
};

let initialized = false;

const initThemeToggle = () => {
  // Prevent multiple initializations
  if (initialized) return;
  initialized = true;

  const preference = getThemePreference();
  applyTheme(preference);
  updateButton(preference);

  const button = document.getElementById('theme-toggle');
  if (button) {
    // Remove any existing listeners before adding new one
    button.removeEventListener('click', toggleTheme);
    button.addEventListener('click', toggleTheme);
  }
};

// Apply immediately to avoid flashes
applyTheme(getThemePreference());

// Wait for DOM to be fully loaded before attaching event listeners
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle, { once: true });
} else {
  // DOM already loaded, init immediately
  initThemeToggle();
}
