/**
 * NexusAI Glassmorphism 2026 - Theme
 * 主題切換系統（淺色/深色）
 */

const THEME_KEY = 'nexusai-theme';
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// 取得系統主題偏好
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

// 取得儲存的主題設定
function getSavedTheme() {
  return localStorage.getItem(THEME_KEY) || THEMES.SYSTEM;
}

// 取得實際應用的主題
function getActiveTheme() {
  const savedTheme = getSavedTheme();
  return savedTheme === THEMES.SYSTEM ? getSystemTheme() : savedTheme;
}

// 套用主題
function applyTheme(theme) {
  const activeTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme;

  document.documentElement.setAttribute('data-theme', activeTheme);

  // 更新 meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.content = activeTheme === THEMES.DARK ? '#0F172A' : '#FFFFFF';
  }

  // 派發主題變更事件
  window.dispatchEvent(
    new CustomEvent('themechange', {
      detail: { theme: activeTheme },
    })
  );
}

// 切換主題
function toggleTheme() {
  const currentTheme = getActiveTheme();
  const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);

  return newTheme;
}

// 設定主題
function setTheme(theme) {
  if (!Object.values(THEMES).includes(theme)) {
    console.warn(`Invalid theme: ${theme}`);
    return;
  }

  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

// 初始化主題系統
function initTheme() {
  // 立即套用主題（避免閃爍）
  applyTheme(getSavedTheme());

  // 監聽系統主題變更
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (getSavedTheme() === THEMES.SYSTEM) {
      applyTheme(THEMES.SYSTEM);
    }
  });

  // 綁定主題切換按鈕
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newTheme = toggleTheme();
      updateThemeToggleUI(newTheme);
    });
  });

  // 初始化切換按鈕 UI
  updateThemeToggleUI(getActiveTheme());
}

// 更新主題切換按鈕 UI
function updateThemeToggleUI(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    const icon = btn.querySelector('[data-theme-icon]');
    if (icon) {
      // 使用 Lucide Icons
      icon.setAttribute('data-lucide', theme === THEMES.DARK ? 'sun' : 'moon');
    }

    btn.setAttribute('aria-label', theme === THEMES.DARK ? '切換淺色模式' : '切換深色模式');
  });

  // 重新渲染 Lucide Icons（如果有使用）
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 導出
export {
  THEMES,
  initTheme,
  toggleTheme,
  setTheme,
  getActiveTheme,
  getSavedTheme,
};
