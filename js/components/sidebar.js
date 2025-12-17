/**
 * NexusAI Glassmorphism 2026 - Sidebar Component
 * 側邊欄共用元件（內頁使用）
 */

import { t } from '../i18n.js';

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
      { key: 'page.settings', href: '/pages/settings-general.html', label: '一般' },
      { key: 'page.settings', href: '/pages/settings-billing.html', label: '帳務' },
      { key: 'page.settings', href: '/pages/settings-security.html', label: '安全' },
    ],
  },
];

// 取得當前頁面路徑
function getCurrentPath() {
  return window.location.pathname;
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
        >
          <i data-lucide="${item.icon}" class="sidebar__icon"></i>
          <span class="sidebar__text" data-lang="${item.label}">${t(item.label)}</span>
          <i data-lucide="chevron-down" class="sidebar__chevron"></i>
        </button>
        <ul class="sidebar__submenu" ${isSubmenuActive ? '' : 'hidden'}>
          ${item.submenu
            .map(
              (sub) => `
            <li>
              <a
                href="${sub.href}"
                class="sidebar__submenu-link ${sub.href === currentPath ? 'is-active' : ''}"
              >
                ${sub.label}
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
        href="${item.href}"
        class="sidebar__link ${isActive ? 'is-active' : ''}"
        ${isActive ? 'aria-current="page"' : ''}
      >
        <i data-lucide="${item.icon}" class="sidebar__icon"></i>
        <span class="sidebar__text" data-lang="${item.key}">${t(item.key)}</span>
        ${item.badge ? `<span class="sidebar__badge">${item.badge}</span>` : ''}
      </a>
    </li>
  `;
}

// 建立側邊欄 HTML
function createSidebarHTML() {
  const currentPath = getCurrentPath();

  return `
    <aside class="sidebar glass-sidebar" role="navigation" aria-label="側邊導航">
      <!-- Logo -->
      <div class="sidebar__header">
        <a href="/" class="sidebar__logo">
          <span class="sidebar__logo-icon">
            <i data-lucide="hexagon"></i>
          </span>
          <span class="sidebar__logo-text">NexusAI</span>
        </a>

        <!-- Collapse Toggle -->
        <button
          class="sidebar__collapse-btn glass-btn"
          data-sidebar-collapse
          aria-label="收合側邊欄"
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
            <img src="/assets/images/avatar-placeholder.png" alt="用戶頭像" />
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
function initSidebar(container) {
  const sidebar = container.querySelector('.sidebar');
  const collapseBtn = container.querySelector('[data-sidebar-collapse]');
  const overlay = container.querySelector('[data-sidebar-overlay]');

  // 收合/展開
  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      const isCollapsed = sidebar.classList.toggle('sidebar--collapsed');

      // 更新圖標
      const icon = collapseBtn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isCollapsed ? 'panel-left-open' : 'panel-left-close');
        if (window.lucide) window.lucide.createIcons();
      }

      // 更新 layout
      document.querySelector('.sidebar-layout')?.classList.toggle('sidebar-layout--collapsed');

      // 儲存狀態
      localStorage.setItem('sidebar-collapsed', isCollapsed);
    });

    // 恢復狀態
    if (localStorage.getItem('sidebar-collapsed') === 'true') {
      sidebar.classList.add('sidebar--collapsed');
      document.querySelector('.sidebar-layout')?.classList.add('sidebar-layout--collapsed');
    }
  }

  // 子選單切換
  container.querySelectorAll('[data-submenu-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);

      const submenu = btn.nextElementSibling;
      if (submenu) {
        submenu.hidden = isExpanded;
      }
    });
  });

  // Mobile overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      overlay.hidden = true;
    });
  }

  // 初始化 Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 渲染函數
export function render(container) {
  container.innerHTML = createSidebarHTML();
  initSidebar(container);
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
