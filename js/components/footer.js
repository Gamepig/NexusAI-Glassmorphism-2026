/**
 * NexusAI Glassmorphism 2026 - Footer Component
 * 頁腳共用元件（Landing Page 使用）
 */

import { t } from '../i18n.js';
import { escapeHtml, withBasePath } from '../utils.js';
import { initIcons } from '../lucide-icons.js';

// 頁腳連結配置（使用 i18n keys，避免硬編碼文字）
const footerLinks = {
  product: {
    titleKey: 'footer.links.product',
    links: [
      { key: 'footer.product.features', href: '#features' },
      { key: 'footer.product.pricing', href: '#pricing' },
      { key: 'footer.product.integrations', href: '#' },
      { key: 'footer.product.changelog', href: '#' },
    ],
  },
  company: {
    titleKey: 'footer.links.company',
    links: [
      { key: 'footer.company.about', href: '#about' },
      { key: 'footer.company.blog', href: '#' },
      { key: 'footer.company.careers', href: '#' },
      { key: 'footer.company.contact', href: '#contact' },
    ],
  },
  resources: {
    titleKey: 'footer.links.resources',
    links: [
      { key: 'footer.resources.docs', href: '#' },
      { key: 'footer.resources.api', href: '#' },
      { key: 'footer.resources.community', href: '#' },
      { key: 'footer.resources.support', href: '#' },
    ],
  },
  legal: {
    titleKey: 'footer.links.legal',
    links: [
      { key: 'footer.legal.privacy', href: '#' },
      { key: 'footer.legal.terms', href: '#' },
      { key: 'footer.legal.cookies', href: '#' },
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
        <div class="footer__grid">
          <!-- Brand -->
          <div class="footer__brand">
            <a href="${escapeHtml(withBasePath('/'))}" class="footer__logo">
              <span class="footer__logo-icon">
                <i data-lucide="hexagon"></i>
              </span>
              <span class="footer__logo-text">NexusAI</span>
            </a>
            <p class="footer__desc" data-lang="footer.tagline">
              ${t('footer.tagline')}
            </p>

            <!-- Social Links -->
            <div class="footer__social">
              ${socialLinks
                .map(
                  (social) => `
                <a
                  href="${escapeHtml(social.href)}"
                  class="footer__social-link glass-btn"
                  aria-label="${escapeHtml(social.name)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i data-lucide="${escapeHtml(social.icon)}"></i>
                </a>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Links -->
          ${Object.entries(footerLinks)
            .map(
              ([key, section]) => `
            <div class="footer__column">
              <h4 data-lang="${escapeHtml(section.titleKey)}">${escapeHtml(t(section.titleKey))}</h4>
              <ul class="footer__links">
                ${section.links
                  .map(
                    (link) => `
                  <li>
                    <a href="${escapeHtml(link.href)}" data-lang="${escapeHtml(link.key)}">${escapeHtml(t(link.key))}</a>
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
              <span data-lang="footer.settings.theme">${t('footer.settings.theme')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// 渲染函數
export async function render(container) {
  container.innerHTML = createFooterHTML();

  // 初始化 Lucide Icons
  await initIcons(container).catch(err => console.warn('Failed to create icons:', err));
}

// 導出配置
export { footerLinks, socialLinks };
