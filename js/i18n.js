/**
 * NexusAI Glassmorphism 2026 - i18n
 * 語言系統（中/英文切換）
 */

const LANG_KEY = 'nexusai-lang';
const LANGUAGES = {
  ZH: 'zh-TW',
  EN: 'en',
};

// 翻譯資料
const translations = {
  'zh-TW': {
    // 導航
    'nav.home': '首頁',
    'nav.features': '功能',
    'nav.pricing': '方案',
    'nav.about': '關於',
    'nav.contact': '聯繫',
    'nav.dashboard': '儀表板',
    'nav.projects': '專案',
    'nav.jsShowcase': 'JS 展示',
    'nav.dataTable': '資料表',
    'nav.kanban': '看板',
    'nav.calendar': '日曆',
    'nav.notifications': '通知',
    'nav.profile': '個人檔案',
    'nav.settings': '設定',

    // 按鈕
    'btn.getStarted': '立即開始',
    'btn.learnMore': '了解更多',
    'btn.signIn': '登入',
    'btn.signUp': '註冊',
    'btn.save': '儲存',
    'btn.cancel': '取消',
    'btn.submit': '提交',
    'btn.viewAll': '查看全部',

    // 頁面標題
    'page.dashboard': '儀表板',
    'page.projects': '專案管理',
    'page.jsShowcase': 'JavaScript 展示',
    'page.dataTable': '資料表格',
    'page.kanban': '看板',
    'page.calendar': '日曆',
    'page.notifications': '通知中心',
    'page.profile': '個人檔案',
    'page.settings': '設定',

    // 通用
    'common.loading': '載入中...',
    'common.noData': '暫無資料',
    'common.search': '搜尋',
    'common.filter': '篩選',
    'common.sort': '排序',
    'common.edit': '編輯',
    'common.delete': '刪除',
    'common.confirm': '確認',

    // Hero 區塊
    'hero.title': '打造未來的數位體驗',
    'hero.subtitle': '運用 Glassmorphism 設計語言，創造令人驚艷的使用者介面',

    // 頁腳
    'footer.copyright': '© 2026 NexusAI. 保留所有權利。',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.jsShowcase': 'JS Showcase',
    'nav.dataTable': 'Data Table',
    'nav.kanban': 'Kanban',
    'nav.calendar': 'Calendar',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',

    // Buttons
    'btn.getStarted': 'Get Started',
    'btn.learnMore': 'Learn More',
    'btn.signIn': 'Sign In',
    'btn.signUp': 'Sign Up',
    'btn.save': 'Save',
    'btn.cancel': 'Cancel',
    'btn.submit': 'Submit',
    'btn.viewAll': 'View All',

    // Page titles
    'page.dashboard': 'Dashboard',
    'page.projects': 'Project Management',
    'page.jsShowcase': 'JavaScript Showcase',
    'page.dataTable': 'Data Table',
    'page.kanban': 'Kanban Board',
    'page.calendar': 'Calendar',
    'page.notifications': 'Notification Center',
    'page.profile': 'Profile',
    'page.settings': 'Settings',

    // Common
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',

    // Hero section
    'hero.title': 'Build the Future of Digital Experience',
    'hero.subtitle': 'Create stunning user interfaces with Glassmorphism design language',

    // Footer
    'footer.copyright': '© 2026 NexusAI. All rights reserved.',
  },
};

// 取得瀏覽器語言
function getBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('zh') ? LANGUAGES.ZH : LANGUAGES.EN;
}

// 取得儲存的語言設定
function getSavedLanguage() {
  return localStorage.getItem(LANG_KEY) || getBrowserLanguage();
}

// 當前語言
let currentLanguage = getSavedLanguage();

// 取得翻譯文字
function t(key, params = {}) {
  const text = translations[currentLanguage]?.[key] || translations[LANGUAGES.EN]?.[key] || key;

  // 替換參數 {{param}}
  return text.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => params[paramKey] || '');
}

// 切換語言
function toggleLanguage() {
  const newLang = currentLanguage === LANGUAGES.ZH ? LANGUAGES.EN : LANGUAGES.ZH;
  setLanguage(newLang);
  return newLang;
}

// 設定語言
function setLanguage(lang) {
  if (!Object.values(LANGUAGES).includes(lang)) {
    console.warn(`Invalid language: ${lang}`);
    return;
  }

  currentLanguage = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.setAttribute('lang', lang);

  // 更新所有有 data-lang 屬性的元素
  updatePageTranslations();

  // 派發語言變更事件
  window.dispatchEvent(
    new CustomEvent('languagechange', {
      detail: { language: lang },
    })
  );
}

// 更新頁面翻譯
function updatePageTranslations() {
  document.querySelectorAll('[data-lang]').forEach((el) => {
    const key = el.getAttribute('data-lang');
    const translated = t(key);
    if (translated !== key) {
      el.textContent = translated;
    }
  });

  // 更新 placeholder
  document.querySelectorAll('[data-lang-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-lang-placeholder');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('placeholder', translated);
    }
  });

  // 更新 aria-label
  document.querySelectorAll('[data-lang-aria]').forEach((el) => {
    const key = el.getAttribute('data-lang-aria');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('aria-label', translated);
    }
  });
}

// 更新語言切換按鈕 UI
function updateLanguageToggleUI() {
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    const display = btn.querySelector('[data-lang-display]');
    if (display) {
      display.textContent = currentLanguage === LANGUAGES.ZH ? '中' : 'EN';
    }

    btn.setAttribute(
      'aria-label',
      currentLanguage === LANGUAGES.ZH ? '切換為英文' : 'Switch to Chinese'
    );
  });
}

// 初始化語言系統
function initI18n() {
  // 設定初始語言
  setLanguage(currentLanguage);

  // 綁定語言切換按鈕
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      toggleLanguage();
      updateLanguageToggleUI();
    });
  });

  // 初始化切換按鈕 UI
  updateLanguageToggleUI();
}

// 取得當前語言
function getCurrentLanguage() {
  return currentLanguage;
}

// 導出
export {
  LANGUAGES,
  initI18n,
  t,
  toggleLanguage,
  setLanguage,
  getCurrentLanguage,
  updatePageTranslations,
};
