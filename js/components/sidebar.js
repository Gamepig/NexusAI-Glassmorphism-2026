/**
 * NexusAI Glassmorphism 2026 - Sidebar Component
 * 側邊欄共用元件（內頁使用）
 */

import { t } from '../i18n.js';
import { escapeHtml, getBasePath, withBasePath } from '../utils.js';
import { initIcons, refreshIcons } from '../lucide-icons.js';

// 側邊欄選單配置
const menuItems = [
  {
    key: 'nav.dashboard',
    href: '/pages/dashboard.html',
    icon: 'layout-dashboard',
  },
  {
    key: 'nav.projects',
    href: '/pages/projects.html',
    icon: 'folder-kanban',
  },
  {
    key: 'nav.jsShowcase',
    href: '/pages/js-showcase.html',
    icon: 'code-2',
  },
  {
    key: 'nav.dataTable',
    href: '/pages/data-table.html',
    icon: 'table-2',
  },
  {
    key: 'nav.kanban',
    href: '/pages/kanban.html',
    icon: 'kanban',
  },
  {
    key: 'nav.calendar',
    href: '/pages/calendar.html',
    icon: 'calendar',
  },
  { divider: true },
  {
    key: 'nav.notifications',
    href: '/pages/notifications.html',
    icon: 'bell',
    badge: 3,
  },
  {
    key: 'nav.profile',
    href: '/pages/profile.html',
    icon: 'user',
  },
  {
    label: 'nav.settings',
    icon: 'settings',
    submenu: [
      { key: 'nav.settings.general', href: '/pages/settings-general.html' },
      { key: 'nav.settings.billing', href: '/pages/settings-billing.html' },
      { key: 'nav.settings.security', href: '/pages/settings-security.html' },
    ],
  },
];

// 取得當前頁面路徑
function getCurrentPath() {
  const pathname = window.location.pathname;
  const base = getBasePath();

  // 把 /<repo>/pages/xxx.html 轉回 /pages/xxx.html，讓 active 判斷一致
  if (base !== '/' && pathname.startsWith(base)) {
    const rest = pathname.slice(base.length);
    return `/${rest.replace(/^\/+/, '')}`;
  }
  return pathname;
}

// 建立選單項目 HTML
function createMenuItemHTML(item, currentPath) {
  if (item.divider) {
    return '<li class="sidebar__divider"></li>';
  }

  const isActive = item.href === currentPath;
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  if (hasSubmenu) {
    const isSubmenuActive = item.submenu.some((sub) => sub.href === currentPath);

    return `
      <li class="sidebar__item sidebar__item--has-submenu ${isSubmenuActive ? 'is-active' : ''}">
        <button
          class="sidebar__link"
          data-submenu-toggle
          aria-expanded="${isSubmenuActive}"
          aria-label="${escapeHtml(t(item.label))}"
          data-lang-aria="${escapeHtml(item.label)}"
          title="${escapeHtml(t(item.label))}"
          data-lang-title="${escapeHtml(item.label)}"
        >
          <i data-lucide="${escapeHtml(item.icon)}" class="sidebar__icon"></i>
          <span class="sidebar__text" data-lang="${escapeHtml(item.label)}">${escapeHtml(t(item.label))}</span>
          <i data-lucide="chevron-down" class="sidebar__chevron"></i>
        </button>
        <ul class="sidebar__submenu" ${isSubmenuActive ? '' : 'hidden'}>
          ${item.submenu
            .map(
              (sub) => `
            <li>
              <a
                href="${escapeHtml(withBasePath(sub.href))}"
                class="sidebar__submenu-link ${sub.href === currentPath ? 'is-active' : ''}"
                data-lang="${escapeHtml(sub.key)}"
                aria-label="${escapeHtml(t(sub.key))}"
                data-lang-aria="${escapeHtml(sub.key)}"
              >
                ${escapeHtml(t(sub.key))}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
      </li>
    `;
  }

  return `
    <li class="sidebar__item">
      <a
        href="${escapeHtml(withBasePath(item.href))}"
        class="sidebar__link ${isActive ? 'is-active' : ''}"
        ${isActive ? 'aria-current="page"' : ''}
        aria-label="${escapeHtml(t(item.key))}"
        data-lang-aria="${escapeHtml(item.key)}"
        title="${escapeHtml(t(item.key))}"
        data-lang-title="${escapeHtml(item.key)}"
      >
        <i data-lucide="${escapeHtml(item.icon)}" class="sidebar__icon"></i>
        <span class="sidebar__text" data-lang="${escapeHtml(item.key)}">${escapeHtml(t(item.key))}</span>
        ${item.badge ? `<span class="sidebar__badge">${escapeHtml(String(item.badge))}</span>` : ''}
      </a>
    </li>
  `;
}

// 建立側邊欄 HTML
function createSidebarHTML() {
  const currentPath = getCurrentPath();

  return `
    <!-- Mobile Menu Toggle (顯示在手機版) -->
    <button
      class="mobile-menu-toggle"
      data-mobile-sidebar-toggle
      aria-label="${escapeHtml(t('sidebar.mobile.openMenu'))}"
      data-lang-aria="sidebar.mobile.openMenu"
      aria-expanded="false"
      aria-controls="sidebar"
    >
      <i data-lucide="menu"></i>
    </button>

    <aside id="sidebar" class="sidebar glass-sidebar" role="navigation" aria-label="${escapeHtml(t('sidebar.aria.label'))}" data-lang-aria="sidebar.aria.label">
      <!-- Logo -->
      <div class="sidebar__header">
        <a href="${escapeHtml(withBasePath('/'))}" class="sidebar__logo">
          <span class="sidebar__logo-icon">
            <i data-lucide="hexagon"></i>
          </span>
          <span class="sidebar__logo-text">NexusAI</span>
        </a>

        <!-- Collapse Toggle -->
        <button
          class="sidebar__collapse-btn glass-btn"
          data-sidebar-collapse
          aria-label="${escapeHtml(t('sidebar.collapse.collapse'))}"
          data-lang-aria="sidebar.collapse.collapse"
        >
          <i data-lucide="panel-left-close"></i>
        </button>
      </div>

      <!-- Menu -->
      <nav class="sidebar__nav">
        <ul class="sidebar__menu">
          ${menuItems.map((item) => createMenuItemHTML(item, currentPath)).join('')}
        </ul>
      </nav>

      <!-- Footer -->
      <div class="sidebar__footer">
        <div class="sidebar__user">
          <div class="avatar">
            <img src="${escapeHtml(withBasePath('/assets/images/avatar-placeholder.svg'))}" alt="用戶頭像" />
          </div>
          <div class="sidebar__user-info">
            <span class="sidebar__user-name">John Doe</span>
            <span class="sidebar__user-role">管理員</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    <div class="sidebar__overlay" data-sidebar-overlay hidden></div>
  `;
}

// 初始化行為
async function initSidebar(container) {
  const sidebar = container.querySelector('.sidebar');
  const collapseBtn = container.querySelector('[data-sidebar-collapse]');
  const overlay = container.querySelector('[data-sidebar-overlay]');
  const mobileToggle = container.querySelector('[data-mobile-sidebar-toggle]');

  // 收折狀態下的「設定」子選單：以浮動方式顯示（避免被 scroll/overflow 裁切）
  function positionFlyout(btn, submenu) {
    submenu.classList.add('sidebar__submenu--flyout');
    submenu.style.position = 'fixed';
    submenu.style.zIndex = '20000';
    submenu.style.left = '';
    submenu.style.top = '';

    const rect = btn.getBoundingClientRect();
    const gap = 8;
    // 先放到可量測的位置，避免一開始在視窗外導致高度量不到
    submenu.style.left = '0px';
    submenu.style.top = '0px';

    const height = submenu.offsetHeight || 160;
    const width = submenu.offsetWidth || 220;

    const maxTop = Math.max(8, window.innerHeight - height - 8);
    const top = Math.min(Math.max(8, rect.top), maxTop);

    const maxLeft = Math.max(8, window.innerWidth - width - 8);
    const left = Math.min(Math.max(8, rect.right + gap), maxLeft);

    submenu.style.left = `${left}px`;
    submenu.style.top = `${top}px`;
  }

  function isRectVisible(rect) {
    if (!rect || rect.width <= 0 || rect.height <= 0) return false;
    if (rect.right <= 0 || rect.bottom <= 0) return false;
    if (rect.left >= window.innerWidth || rect.top >= window.innerHeight) return false;
    return true;
  }

  function ensureSubmenuAccessible(btn, submenu) {
    // 下一個 frame 再量測，確保 style 已生效
    requestAnimationFrame(() => {
      const rect = submenu.getBoundingClientRect();
      if (isRectVisible(rect)) return;

      // fallback：自動展開 sidebar，並打開 inline 子選單
      if (sidebar?.classList.contains('sidebar--collapsed')) {
        sidebar.classList.remove('sidebar--collapsed');
        document.querySelector('.sidebar-layout')?.classList.remove('sidebar-layout--collapsed');
        localStorage.setItem('sidebar-collapsed', 'false');

        if (collapseBtn) {
          const icon = collapseBtn.querySelector('[data-lucide]');
          if (icon) {
            icon.setAttribute('data-lucide', 'panel-left-close');
            refreshIcons(container).catch(err => console.warn('Failed to refresh icons:', err));
          }
          collapseBtn.setAttribute('aria-label', t('sidebar.collapse.collapse'));
        }
      }

      // 重置 flyout 樣式，改走 inline
      resetFlyout(submenu);
      submenu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    });
  }

  function resetFlyout(submenu) {
    submenu.classList.remove('sidebar__submenu--flyout');
    submenu.style.position = '';
    submenu.style.zIndex = '';
    submenu.style.left = '';
    submenu.style.top = '';
  }

  function closeAllFlyouts(except) {
    container.querySelectorAll('.sidebar__submenu--flyout').forEach((el) => {
      if (except && el === except) return;
      el.hidden = true;
      resetFlyout(el);
      const toggleBtn = el.previousElementSibling;
      if (toggleBtn && toggleBtn.getAttribute) {
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function closeAllSubmenus() {
    container.querySelectorAll('[data-submenu-toggle]').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      const submenu = btn.nextElementSibling;
      if (submenu instanceof HTMLElement) {
        submenu.hidden = true;
        resetFlyout(submenu);
      }
    });
  }

  // Mobile toggle
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.setAttribute('aria-label', t(isOpen ? 'sidebar.mobile.closeMenu' : 'sidebar.mobile.openMenu'));

      // 更新圖標
      const icon = mobileToggle.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        refreshIcons(container).catch(err => console.warn('Failed to refresh icons:', err));
      }

      // 顯示/隱藏 overlay
      if (overlay) {
        overlay.hidden = !isOpen;
      }
    });
  }

  // 收合/展開
  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      const isCollapsed = sidebar.classList.toggle('sidebar--collapsed');

      // 收折時：先把所有子選單關閉，避免文字被擠在 72px 內
      if (isCollapsed) {
        closeAllSubmenus();
      } else {
        // 展開時也確保沒有殘留 flyout 樣式
        closeAllFlyouts();
      }

      // 更新圖標
      const icon = collapseBtn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isCollapsed ? 'panel-left-open' : 'panel-left-close');
        refreshIcons(container).catch(err => console.warn('Failed to refresh icons:', err));
      }

      // 更新 layout
      document.querySelector('.sidebar-layout')?.classList.toggle('sidebar-layout--collapsed');

      // 儲存狀態
      localStorage.setItem('sidebar-collapsed', isCollapsed);

      // 更新 aria-label
      collapseBtn.setAttribute('aria-label', t(isCollapsed ? 'sidebar.collapse.expand' : 'sidebar.collapse.collapse'));
    });

    // 恢復狀態
    if (localStorage.getItem('sidebar-collapsed') === 'true') {
      sidebar.classList.add('sidebar--collapsed');
      document.querySelector('.sidebar-layout')?.classList.add('sidebar-layout--collapsed');
      collapseBtn.setAttribute('aria-label', t('sidebar.collapse.expand'));
      closeAllSubmenus();
    }
  }

  // 子選單切換
  container.querySelectorAll('[data-submenu-toggle]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const willExpand = !isExpanded;
      btn.setAttribute('aria-expanded', String(willExpand));

      const submenu = btn.nextElementSibling;
      if (!(submenu instanceof HTMLElement)) return;

      // 收折狀態：為了確保一定看得到（避免 flyout 被視窗外/被蓋住/相容性問題），直接展開 sidebar 並打開 inline 子選單
      if (sidebar?.classList.contains('sidebar--collapsed')) {
        if (willExpand) {
          closeAllFlyouts();

          // 展開 sidebar
          sidebar.classList.remove('sidebar--collapsed');
          document.querySelector('.sidebar-layout')?.classList.remove('sidebar-layout--collapsed');
          localStorage.setItem('sidebar-collapsed', 'false');

          if (collapseBtn) {
            const icon = collapseBtn.querySelector('[data-lucide]');
            if (icon) {
              icon.setAttribute('data-lucide', 'panel-left-close');
              refreshIcons(container).catch(err => console.warn('Failed to refresh icons:', err));
            }
            collapseBtn.setAttribute('aria-label', t('sidebar.collapse.collapse'));
          }

          // 打開 inline 子選單
          resetFlyout(submenu);
          submenu.hidden = false;
        } else {
          submenu.hidden = true;
          resetFlyout(submenu);
        }
        return;
      }

      // 展開狀態：維持原本 inline 子選單
      resetFlyout(submenu);
      submenu.hidden = !willExpand;
    });
  });

  // 點擊其它地方關閉浮動子選單
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('.sidebar__submenu--flyout') || target.closest('[data-submenu-toggle]')) return;
    closeAllFlyouts();
  });

  // Mobile overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      overlay.hidden = true;

      // 重置 mobile toggle 狀態
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', t('sidebar.mobile.openMenu'));
        const icon = mobileToggle.querySelector('[data-lucide]');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          refreshIcons(container).catch(err => console.warn('Failed to refresh icons:', err));
        }
      }
    });
  }

  // ESC 關閉側邊欄（行動版）
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar?.classList.contains('is-open')) {
      sidebar.classList.remove('is-open');
      if (overlay) overlay.hidden = true;
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', t('sidebar.mobile.openMenu'));
        mobileToggle.focus();
        const icon = mobileToggle.querySelector('[data-lucide]');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          refreshIcons(container).catch(err => console.warn('Failed to refresh icons:', err));
        }
      }
    }
  });

  // 語言切換時同步 aria-label（避免狀態文字停留在舊語言）
  window.addEventListener('languagechange', () => {
    if (mobileToggle && sidebar) {
      const isOpen = sidebar.classList.contains('is-open');
      mobileToggle.setAttribute('aria-label', t(isOpen ? 'sidebar.mobile.closeMenu' : 'sidebar.mobile.openMenu'));
    }
    if (collapseBtn && sidebar) {
      const isCollapsed = sidebar.classList.contains('sidebar--collapsed');
      collapseBtn.setAttribute('aria-label', t(isCollapsed ? 'sidebar.collapse.expand' : 'sidebar.collapse.collapse'));
    }
  });

  // 初始化 Lucide Icons
  initIcons(container).catch(err => console.warn('Failed to create icons:', err));
}

// 渲染函數
export async function render(container) {
  container.innerHTML = createSidebarHTML();
  await initSidebar(container);
}

// 開啟/關閉 Mobile Sidebar
export function toggleMobileSidebar(open) {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('[data-sidebar-overlay]');

  if (sidebar) {
    sidebar.classList.toggle('is-open', open);
  }
  if (overlay) {
    overlay.hidden = !open;
  }
}

// 導出配置
export { menuItems };
