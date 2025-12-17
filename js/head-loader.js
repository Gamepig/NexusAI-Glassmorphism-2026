/**
 * NexusAI Glassmorphism - Head Loader
 * 集中管理全站核心 CSS 與 cache-bust 版本號，避免逐頁重複維護。
 *
 * 使用方式：
 * - index.html：<script src="js/head-loader.js"></script>
 * - pages/*.html：<script src="../js/head-loader.js"></script>
 *
 * 注意：
 * - 這是 JS 注入 <link>，第一次載入可能有極短暫 FOUC（通常可接受）。
 */

(() => {
  const VERSION = '202512180002';
  const MARK_ATTR = 'data-nexus-head';

  // 避免重複注入
  if (document.querySelector(`link[${MARK_ATTR}="design-tokens"]`)) return;

  const script = document.currentScript;
  if (!script || !script.src) return;

  // === Base Path（同時支援本機 / 與 GitHub Pages /<repo>/ 子路徑）===
  // 透過目前載入的 head-loader.js 位置推導專案根目錄：
  // - /js/head-loader.js -> 專案根目錄為 ../
  // - pages/*.html 也會因為 ../js/head-loader.js 解析後落在同一路徑
  const basePathUrl = new URL('../', script.src);
  const basePath = basePathUrl.pathname.endsWith('/') ? basePathUrl.pathname : `${basePathUrl.pathname}/`;
  window.__NEXUS_BASE_PATH__ = basePath;

  const cssBaseUrl = new URL('../css/', script.src); // script 在 /js/，往上就是 /css/

  // Fonts（集中管理，頁面不需要各自寫）
  const fontLinks = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
    },
  ];

  const coreCss = [
    'design-tokens.css',
    'glassmorphism.css',
    'typography.css',
    'layout.css',
    'components.css',
    'animations.css',
    'responsive.css',
  ];

  const pageCss = [];

  // page-scope：JS Showcase
  if (location.pathname.endsWith('/pages/js-showcase.html')) {
    pageCss.push('js-showcase.css');
  }

  // 依序插入（維持 tokens -> glass -> typography -> layout -> components -> animations -> responsive）
  const head = document.head || document.getElementsByTagName('head')[0];

  fontLinks.forEach((f) => {
    // 避免重複（某些頁面可能仍保留舊 link）
    const key = `${f.rel}:${f.href}`;
    if (document.querySelector(`link[${MARK_ATTR}="${key}"]`)) return;
    if (document.querySelector(`link[rel="${f.rel}"][href="${f.href}"]`)) return;

    const link = document.createElement('link');
    link.rel = f.rel;
    link.href = f.href;
    if (f.crossorigin) link.crossOrigin = 'anonymous';
    link.setAttribute(MARK_ATTR, key);
    head.appendChild(link);
  });

  [...coreCss, ...pageCss].forEach((file) => {
    const url = new URL(file, cssBaseUrl);
    url.searchParams.set('v', VERSION);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url.toString();
    link.setAttribute(MARK_ATTR, file.replace('.css', ''));
    head.appendChild(link);
  });
})();


