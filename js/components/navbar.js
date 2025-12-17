/**
 * NexusAI Glassmorphism 2026 - Navbar Component
 * 導航列共用元件
 */

import { t } from '../i18n.js';
import { throttle, escapeHtml } from '../utils.js';
import { initIcons, refreshIcons } from '../lucide-icons.js';

// 導航連結配置
const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.features', href: '#features' },
  { key: 'nav.pricing', href: '#pricing' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
];

// 建立導航 HTML
function createNavbarHTML() {
  return `
    <nav class="navbar glass-nav" role="navigation" aria-label="主導航">
      <div class="navbar__container container">
        <!-- Logo -->
        <a href="/" class="navbar__logo">
          <span class="navbar__logo-icon">
            <i data-lucide="hexagon"></i>
          </span>
          <span class="navbar__logo-text">NexusAI</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="navbar__links">
          ${navLinks
            .map(
              (link) => `
            <li>
              <a href="${escapeHtml(link.href)}" class="navbar__link" data-lang="${escapeHtml(link.key)}">
                ${escapeHtml(t(link.key))}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>

        <!-- Actions -->
        <div class="navbar__actions">
          <!-- Language Toggle -->
          <button
            class="navbar__action-btn glass-btn"
            data-lang-toggle
            aria-label="切換語言"
          >
            <span data-lang-display>中</span>
          </button>

          <!-- Theme Toggle -->
          <button
            class="navbar__action-btn glass-btn"
            data-theme-toggle
            aria-label="切換主題"
          >
            <i data-lucide="moon" data-theme-icon></i>
          </button>

          <!-- CTA Button (Desktop) -->
          <a href="#" class="btn btn--primary navbar__cta" data-lang="btn.getStarted">
            ${t('btn.getStarted')}
          </a>

          <!-- Mobile Menu Toggle -->
          <button
            class="navbar__hamburger hidden-desktop"
            data-mobile-menu-toggle
            aria-label="開啟選單"
            aria-expanded="false"
          >
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="navbar__mobile-menu" data-mobile-menu hidden>
        <ul class="navbar__mobile-links">
          ${navLinks
            .map(
              (link) => `
            <li>
              <a href="${escapeHtml(link.href)}" class="navbar__mobile-link" data-lang="${escapeHtml(link.key)}">
                ${escapeHtml(t(link.key))}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
        <a href="#" class="btn btn--primary w-full" data-lang="btn.getStarted">
          ${t('btn.getStarted')}
        </a>
      </div>
    </nav>
  `;
}

// 初始化行為
async function initNavbar(container) {
  const hamburger = container.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = container.querySelector('[data-mobile-menu]');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isOpen);
      mobileMenu.hidden = isOpen;

      // 切換圖標
      const icon = hamburger.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'menu' : 'x');
        // 重新初始化圖標
        refreshIcons(container).catch(err => console.warn('Failed to refresh icons:', err));
      }
    });

    // 點擊連結後關閉選單
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  // 滾動時添加陰影（使用 throttle 優化效能）
  const navbar = container.querySelector('.navbar');
  const handleScroll = throttle(() => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  }, 100);

  window.addEventListener('scroll', handleScroll, { passive: true });

  // 初始化 Lucide Icons
  await initIcons(container).catch(err => console.warn('Failed to init icons:', err));
}

// 渲染函數
export async function render(container) {
  container.innerHTML = createNavbarHTML();
  await initNavbar(container);
}

// 導出配置
export { navLinks };
