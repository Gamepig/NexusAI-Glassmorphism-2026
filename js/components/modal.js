/**
 * NexusAI Glassmorphism 2026 - Modal Component
 * 全域對話框元件
 */

// Modal 配置
const MODAL_CONFIG = {
  closeOnBackdrop: true,
  closeOnEscape: true,
  trapFocus: true,
};

// 活動的 Modal
let activeModals = [];

// 建立 Modal 元素
function createModalElement({ id, title, content, footer, size = 'md', closable = true }) {
  const modal = document.createElement('div');
  modal.id = id;
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', `${id}-title`);
  modal.hidden = true;

  modal.innerHTML = `
    <div class="modal__backdrop glass-modal-backdrop" data-modal-backdrop></div>
    <div class="modal__container">
      <div class="modal__dialog glass-modal modal__dialog--${size}">
        ${
          title || closable
            ? `
          <div class="modal__header">
            ${title ? `<h3 class="modal__title" id="${id}-title">${title}</h3>` : ''}
            ${
              closable
                ? `
              <button class="modal__close glass-btn" data-modal-close aria-label="關閉對話框">
                <i data-lucide="x"></i>
              </button>
            `
                : ''
            }
          </div>
        `
            : ''
        }
        <div class="modal__body">
          ${content}
        </div>
        ${
          footer
            ? `
          <div class="modal__footer">
            ${footer}
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;

  return modal;
}

// 開啟 Modal
function openModal(modal) {
  if (typeof modal === 'string') {
    modal = document.getElementById(modal);
  }

  if (!modal) {
    console.error('Modal not found');
    return;
  }

  // 儲存之前的焦點元素
  modal._previousFocus = document.activeElement;

  // 顯示 Modal
  modal.hidden = false;
  modal.classList.add('is-open');

  // 禁止 body 滾動
  document.body.style.overflow = 'hidden';

  // 初始化 Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 聚焦到第一個可聚焦元素
  setTimeout(() => {
    const focusable = modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus();
    }
  }, 100);

  // 綁定事件
  bindModalEvents(modal);

  // 加入活動列表
  activeModals.push(modal);

  // 派發事件
  modal.dispatchEvent(new CustomEvent('modal:open'));

  return modal;
}

// 關閉 Modal
function closeModal(modal) {
  if (typeof modal === 'string') {
    modal = document.getElementById(modal);
  }

  if (!modal) return;

  // 動畫關閉
  modal.classList.remove('is-open');
  modal.classList.add('is-closing');

  setTimeout(() => {
    modal.hidden = true;
    modal.classList.remove('is-closing');

    // 恢復 body 滾動
    if (activeModals.length <= 1) {
      document.body.style.overflow = '';
    }

    // 移除事件
    unbindModalEvents(modal);

    // 從活動列表移除
    activeModals = activeModals.filter((m) => m !== modal);

    // 恢復焦點
    if (modal._previousFocus) {
      modal._previousFocus.focus();
    }

    // 派發事件
    modal.dispatchEvent(new CustomEvent('modal:close'));
  }, 200);
}

// 綁定 Modal 事件
function bindModalEvents(modal) {
  // 背景點擊關閉
  const backdrop = modal.querySelector('[data-modal-backdrop]');
  if (backdrop && MODAL_CONFIG.closeOnBackdrop) {
    backdrop._closeHandler = () => closeModal(modal);
    backdrop.addEventListener('click', backdrop._closeHandler);
  }

  // 關閉按鈕
  modal.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn._closeHandler = () => closeModal(modal);
    btn.addEventListener('click', btn._closeHandler);
  });

  // ESC 關閉
  if (MODAL_CONFIG.closeOnEscape) {
    modal._escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal(modal);
      }
    };
    document.addEventListener('keydown', modal._escHandler);
  }

  // 焦點陷阱
  if (MODAL_CONFIG.trapFocus) {
    modal._focusTrapHandler = (e) => {
      if (e.key === 'Tab') {
        const focusables = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    modal.addEventListener('keydown', modal._focusTrapHandler);
  }
}

// 移除 Modal 事件
function unbindModalEvents(modal) {
  const backdrop = modal.querySelector('[data-modal-backdrop]');
  if (backdrop && backdrop._closeHandler) {
    backdrop.removeEventListener('click', backdrop._closeHandler);
  }

  modal.querySelectorAll('[data-modal-close]').forEach((btn) => {
    if (btn._closeHandler) {
      btn.removeEventListener('click', btn._closeHandler);
    }
  });

  if (modal._escHandler) {
    document.removeEventListener('keydown', modal._escHandler);
  }

  if (modal._focusTrapHandler) {
    modal.removeEventListener('keydown', modal._focusTrapHandler);
  }
}

// 建立並開啟 Modal
function createModal(options) {
  const {
    id = `modal-${Date.now()}`,
    title,
    content,
    footer,
    size,
    closable,
    onOpen,
    onClose,
  } = options;

  const modal = createModalElement({ id, title, content, footer, size, closable });
  document.body.appendChild(modal);

  if (onOpen) {
    modal.addEventListener('modal:open', onOpen);
  }
  if (onClose) {
    modal.addEventListener('modal:close', onClose);
  }

  openModal(modal);

  return modal;
}

// 確認對話框
function confirm({ title = '確認', message, confirmText = '確認', cancelText = '取消' }) {
  return new Promise((resolve) => {
    const modal = createModal({
      title,
      content: `<p>${message}</p>`,
      footer: `
        <button class="btn btn--secondary" data-modal-close>${cancelText}</button>
        <button class="btn btn--primary" data-modal-confirm>${confirmText}</button>
      `,
      size: 'sm',
      onClose: () => {
        modal.remove();
        resolve(false);
      },
    });

    modal.querySelector('[data-modal-confirm]').addEventListener('click', () => {
      closeModal(modal);
      resolve(true);
    });
  });
}

// 提示對話框
function alert({ title = '提示', message, confirmText = '確定' }) {
  return new Promise((resolve) => {
    const modal = createModal({
      title,
      content: `<p>${message}</p>`,
      footer: `<button class="btn btn--primary" data-modal-close>${confirmText}</button>`,
      size: 'sm',
      onClose: () => {
        modal.remove();
        resolve();
      },
    });
  });
}

// 設定配置
function configure(options) {
  Object.assign(MODAL_CONFIG, options);
}

// 渲染函數（初始化頁面上的 Modal）
export function render(container) {
  // 初始化頁面上已存在的 Modal 觸發器
  document.querySelectorAll('[data-modal-trigger]').forEach((trigger) => {
    const targetId = trigger.getAttribute('data-modal-trigger');
    trigger.addEventListener('click', () => openModal(targetId));
  });
}

// 導出
export {
  createModal,
  openModal,
  closeModal,
  confirm,
  alert,
  configure,
};

// 掛載到全域
window.Modal = {
  create: createModal,
  open: openModal,
  close: closeModal,
  confirm,
  alert,
  configure,
};
