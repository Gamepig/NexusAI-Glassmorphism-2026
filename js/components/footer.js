/**
 * NexusAI Glassmorphism 2026 - Footer Component
 * 頁腳共用元件（Landing Page 使用）
 */

import { t } from '../i18n.js';

// 頁腳連結配置
const footerLinks = {
  product: {
    title: '產品',
    links: [
      { label: '功能', href: '#features' },
      { label: '定價', href: '#pricing' },
      { label: '整合', href: '#' },
      { label: '更新日誌', href: '#' },
    ],
  },
  company: {
    title: '公司',
    links: [
      { label: '關於我們', href: '#about' },
      { label: '部落格', href: '#' },
      { label: '職缺', href: '#' },
      { label: '聯繫我們', href: '#contact' },
    ],
  },
  resources: {
    title: '資源',
    links: [
      { label: '文檔', href: '#' },
      { label: 'API 參考', href: '#' },
      { label: '社群', href: '#' },
      { label: '支援', href: '#' },
    ],
  },
  legal: {
    title: '法律',
    links: [
      { label: '隱私政策', href: '#' },
      { label: '服務條款', href: '#' },
      { label: 'Cookie 政策', href: '#' },
    ],
  },
};

// 社群連結
const socialLinks = [
  { name: 'GitHub', icon: 'github', href: 'https://github.com' },
  { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com' },
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
  { name: 'Discord', icon: 'message-circle', href: '#' },
];

// 建立頁腳 HTML
function createFooterHTML() {
  return `
    <footer class="footer">
      <div class="container">
        <!-- Top Section -->
        <div class="footer__top">
          <!-- Brand -->
          <div class="footer__brand">
            <a href="/" class="footer__logo">
              <span class="footer__logo-icon">
                <i data-lucide="hexagon"></i>
              </span>
              <span class="footer__logo-text">NexusAI</span>
            </a>
            <p class="footer__tagline">
              打造未來的數位體驗
            </p>

            <!-- Social Links -->
            <div class="footer__social">
              ${socialLinks
                .map(
                  (social) => `
                <a
                  href="${social.href}"
                  class="footer__social-link glass-btn"
                  aria-label="${social.name}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i data-lucide="${social.icon}"></i>
                </a>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Links -->
          <div class="footer__links">
            ${Object.entries(footerLinks)
              .map(
                ([key, section]) => `
              <div class="footer__column">
                <h4 class="footer__column-title">${section.title}</h4>
                <ul class="footer__column-links">
                  ${section.links
                    .map(
                      (link) => `
                    <li>
                      <a href="${link.href}" class="footer__link">${link.label}</a>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="footer__bottom">
          <p class="footer__copyright" data-lang="footer.copyright">
            ${t('footer.copyright')}
          </p>

          <div class="footer__settings">
            <!-- Language Toggle -->
            <button
              class="footer__setting-btn glass-btn"
              data-lang-toggle
              aria-label="切換語言"
            >
              <i data-lucide="globe"></i>
              <span data-lang-display>中文</span>
            </button>

            <!-- Theme Toggle -->
            <button
              class="footer__setting-btn glass-btn"
              data-theme-toggle
              aria-label="切換主題"
            >
              <i data-lucide="moon" data-theme-icon></i>
              <span>主題</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// 渲染函數
export function render(container) {
  container.innerHTML = createFooterHTML();

  // 初始化 Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 導出配置
export { footerLinks, socialLinks };
