/**
 * NexusAI Glassmorphism 2026 - Toast Component
 * 全域通知元件
 */

// Toast 類型
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Toast 配置
const TOAST_CONFIG = {
  duration: 4000,
  position: 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
  maxToasts: 5,
};

// Toast 圖標對應
const TOAST_ICONS = {
  success: 'check-circle',
  error: 'x-circle',
  warning: 'alert-triangle',
  info: 'info',
};

// Toast 容器
let toastContainer = null;

// 建立 Toast 容器
function createToastContainer() {
  if (toastContainer) return toastContainer;

  toastContainer = document.createElement('div');
  toastContainer.className = `toast-container toast-container--${TOAST_CONFIG.position}`;
  toastContainer.setAttribute('aria-live', 'polite');
  toastContainer.setAttribute('aria-atomic', 'true');
  document.body.appendChild(toastContainer);

  return toastContainer;
}

// 建立 Toast 元素
function createToastElement({ type, title, message, closable = true }) {
  const toast = document.createElement('div');
  toast.className = `toast toast--${type} glass-card animate-in-right`;
  toast.setAttribute('role', 'alert');

  toast.innerHTML = `
    <div class="toast__icon">
      <i data-lucide="${TOAST_ICONS[type]}"></i>
    </div>
    <div class="toast__content">
      ${title ? `<div class="toast__title">${title}</div>` : ''}
      ${message ? `<div class="toast__message">${message}</div>` : ''}
    </div>
    ${
      closable
        ? `
      <button class="toast__close" aria-label="關閉通知">
        <i data-lucide="x"></i>
      </button>
    `
        : ''
    }
    <div class="toast__progress"></div>
  `;

  return toast;
}

// 移除 Toast
function removeToast(toast) {
  toast.classList.add('animate-out');
  toast.addEventListener('animationend', () => {
    toast.remove();
  });
}

// 顯示 Toast
function showToast(options) {
  const { type = TOAST_TYPES.INFO, title, message, duration = TOAST_CONFIG.duration } = options;

  const container = createToastContainer();
  const toast = createToastElement({ type, title, message });

  // 限制最大 Toast 數量
  const toasts = container.querySelectorAll('.toast');
  if (toasts.length >= TOAST_CONFIG.maxToasts) {
    removeToast(toasts[0]);
  }

  container.appendChild(toast);

  // 初始化 Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons({ icons: toast });
  }

  // 關閉按鈕
  const closeBtn = toast.querySelector('.toast__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => removeToast(toast));
  }

  // 進度條動畫
  const progress = toast.querySelector('.toast__progress');
  if (progress && duration > 0) {
    progress.style.animation = `toast-progress ${duration}ms linear forwards`;
  }

  // 自動關閉
  if (duration > 0) {
    setTimeout(() => {
      if (toast.parentNode) {
        removeToast(toast);
      }
    }, duration);
  }

  return toast;
}

// 快捷方法
function success(message, title = '') {
  return showToast({ type: TOAST_TYPES.SUCCESS, title, message });
}

function error(message, title = '錯誤') {
  return showToast({ type: TOAST_TYPES.ERROR, title, message });
}

function warning(message, title = '警告') {
  return showToast({ type: TOAST_TYPES.WARNING, title, message });
}

function info(message, title = '') {
  return showToast({ type: TOAST_TYPES.INFO, title, message });
}

// 清除所有 Toast
function clearAll() {
  if (toastContainer) {
    toastContainer.innerHTML = '';
  }
}

// 設定配置
function configure(options) {
  Object.assign(TOAST_CONFIG, options);

  // 更新容器位置
  if (toastContainer && options.position) {
    toastContainer.className = `toast-container toast-container--${options.position}`;
  }
}

// 渲染函數（可用於初始化）
export function render(container) {
  // Toast 不需要容器，會自動附加到 body
  createToastContainer();
}

// 導出
export {
  TOAST_TYPES,
  showToast,
  success,
  error,
  warning,
  info,
  clearAll,
  configure,
};

// 掛載到全域
window.Toast = {
  show: showToast,
  success,
  error,
  warning,
  info,
  clearAll,
  configure,
};
