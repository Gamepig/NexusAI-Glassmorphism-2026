/**
 * NexusAI Glassmorphism 2026 - Utils
 * 工具函數庫
 */

// ========================================
// Base Path（本機 / 與 GitHub Pages /<repo>/ 子路徑相容）
// ========================================

/**
 * 取得專案 base path（必定以 / 開頭且以 / 結尾）
 * - 本機根目錄：/
 * - GitHub Pages：/NexusAI-Glassmorphism-2026/
 */
function getBasePath() {
  const p = window.__NEXUS_BASE_PATH__;
  if (typeof p === 'string' && p.startsWith('/')) {
    return p.endsWith('/') ? p : `${p}/`;
  }
  return '/';
}

/**
 * 把「專案根目錄路徑」轉成可在本機與 GitHub Pages 都可用的 URL
 * - withBasePath('/pages/dashboard.html') -> '/<base>/pages/dashboard.html'
 * - withBasePath('/') -> '/<base>/'
 * - '#anchor' / 'https://...' 會原樣返回
 */
function withBasePath(path) {
  if (!path) return path;
  if (path.startsWith('#')) return path;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path; // e.g. https:, mailto:

  const base = getBasePath();
  if (path.startsWith('/')) return base + path.slice(1);
  return base + path;
}

// ========================================
// DOM 工具
// ========================================

/**
 * 查詢單一元素
 */
function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * 查詢所有元素
 */
function $$(selector, context = document) {
  return [...context.querySelectorAll(selector)];
}

/**
 * 建立元素
 */
function createElement(tag, attributes = {}, children = []) {
  const el = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        el.dataset[dataKey] = dataValue;
      });
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  });

  return el;
}

// ========================================
// 格式化工具
// ========================================

/**
 * 格式化數字（千分位）
 */
function formatNumber(num, locale = 'zh-TW') {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * 格式化貨幣
 */
function formatCurrency(amount, currency = 'TWD', locale = 'zh-TW') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * 格式化日期
 */
function formatDate(date, options = {}, locale = 'zh-TW') {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(
    new Date(date)
  );
}

/**
 * 格式化相對時間
 */
function formatRelativeTime(date, locale = 'zh-TW') {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now - target;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffSec < 60) return rtf.format(-diffSec, 'second');
  if (diffMin < 60) return rtf.format(-diffMin, 'minute');
  if (diffHour < 24) return rtf.format(-diffHour, 'hour');
  if (diffDay < 30) return rtf.format(-diffDay, 'day');

  return formatDate(date, {}, locale);
}

/**
 * 格式化檔案大小
 */
function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

// ========================================
// 安全工具
// ========================================

/**
 * 轉義 HTML 防止 XSS 攻擊
 */
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 初始化 Lucide Icons
 * @param {HTMLElement|Document} container - 要掃描的容器，預設為整個文檔
 * @deprecated 請使用 lucide-icons.js 中的 initIcons
 */
async function initIcons(container) {
  // 動態導入 Lucide Icons 模組
  const { initIcons: lucideInitIcons } = await import('./lucide-icons.js');
  await lucideInitIcons(container);
}

// ========================================
// 字串工具
// ========================================

/**
 * 截斷字串
 */
function truncate(str, maxLength, suffix = '...') {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * 首字母大寫
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 轉換為 kebab-case
 */
function kebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// ========================================
// 事件工具
// ========================================

/**
 * 防抖
 */
function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * 節流
 */
function throttle(fn, limit = 300) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ========================================
// 儲存工具
// ========================================

/**
 * 本地儲存 - 取得
 */
function getStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * 本地儲存 - 設定
 */
function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * 本地儲存 - 移除
 */
function removeStorage(key) {
  localStorage.removeItem(key);
}

// ========================================
// 隨機工具
// ========================================

/**
 * 產生隨機 ID
 */
function generateId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * 隨機範圍整數
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========================================
// 陣列工具
// ========================================

/**
 * 陣列分組
 */
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const group = typeof key === 'function' ? key(item) : item[key];
    (result[group] = result[group] || []).push(item);
    return result;
  }, {});
}

/**
 * 陣列去重
 */
function unique(arr, key) {
  if (!key) return [...new Set(arr)];

  const seen = new Set();
  return arr.filter((item) => {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

// ========================================
// 剪貼簿
// ========================================

/**
 * 複製到剪貼簿
 */
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const result = document.execCommand('copy');
    document.body.removeChild(textarea);
    return result;
  }
}

// 導出
export {
  $,
  $$,
  createElement,
  getBasePath,
  withBasePath,
  escapeHtml,
  initIcons,
  formatNumber,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  formatFileSize,
  truncate,
  capitalize,
  kebabCase,
  debounce,
  throttle,
  getStorage,
  setStorage,
  removeStorage,
  generateId,
  randomInt,
  groupBy,
  unique,
  copyToClipboard,
};
