/**
 * JS Showcase page entry
 * - Tabs switching (event delegation)
 * - Lazy init each tab module
 */

import { refreshIcons } from '../../lucide-icons.js';
import { render as renderToast } from '../../components/toast.js?v=20251218_2';
import { render as renderModal } from '../../components/modal.js';

const TAB_MODULE_VERSION = '20251218_2';

const TAB_ORDER = [
  'animations',
  'web-apis',
  'interactions',
  'es-features',
  'charts',
  'animations-extended',
  'canvas-drawing',
  'worker',
  'pwa',
  'websocket',
  'webgl',
];

const TAB_MODULE_LOADERS = {
  animations: () => import(`./tabs/animations.js?v=${TAB_MODULE_VERSION}`),
  'web-apis': () => import(`./tabs/web-apis.js?v=${TAB_MODULE_VERSION}`),
  interactions: () => import(`./tabs/interactions.js?v=${TAB_MODULE_VERSION}`),
  'es-features': () => import(`./tabs/es-features.js?v=${TAB_MODULE_VERSION}`),
  charts: () => import(`./tabs/charts.js?v=${TAB_MODULE_VERSION}`),
  'animations-extended': () => import(`./tabs/animations-extended.js?v=${TAB_MODULE_VERSION}`),
  'canvas-drawing': () => import(`./tabs/canvas-drawing.js?v=${TAB_MODULE_VERSION}`),
  worker: () => import(`./tabs/worker.js?v=${TAB_MODULE_VERSION}`),
  pwa: () => import(`./tabs/pwa.js?v=${TAB_MODULE_VERSION}`),
  websocket: () => import(`./tabs/websocket.js?v=${TAB_MODULE_VERSION}`),
  webgl: () => import(`./tabs/webgl.js?v=${TAB_MODULE_VERSION}`),
};

function getPanel(tab) {
  return document.querySelector(`[data-panel="${tab}"]`);
}

function setActiveTab(tab) {
  document.querySelectorAll('[data-js-showcase-tabs] [data-tab]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-tab') === tab);
  });
  document.querySelectorAll('[data-panel]').forEach((panel) => {
    panel.classList.toggle('is-active', panel.getAttribute('data-panel') === tab);
  });
}

function normalizeTab(tab) {
  if (TAB_ORDER.includes(tab)) return tab;
  return 'animations';
}

const tabState = new Map(); // tab -> { initialized, cleanup, module }

async function initTab(tab) {
  const normalized = normalizeTab(tab);
  const state = tabState.get(normalized) || { initialized: false, cleanup: null, module: null };
  const panel = getPanel(normalized);
  if (!panel) return;

  if (state.initialized) return;

  const loader = TAB_MODULE_LOADERS[normalized];
  if (!loader) return;

  panel.innerHTML = `
    <div class="glass-card p-6">
      <h2 class="h5 mb-2">載入中...</h2>
      <p class="text-secondary">正在初始化此分頁內容。</p>
    </div>
  `;

  try {
    const mod = await loader();
    state.module = mod;
    state.cleanup = (await mod.init?.(panel)) || null;
    state.initialized = true;
    tabState.set(normalized, state);
    await refreshIcons(panel);
  } catch (err) {
    console.error(err);
    panel.innerHTML = `
      <div class="glass-card p-6">
        <h2 class="h5 mb-2">初始化失敗</h2>
        <p class="text-secondary">請開啟 Console 查看詳細錯誤訊息。</p>
      </div>
    `;
  }
}

function cleanupTab(tab) {
  const normalized = normalizeTab(tab);
  const state = tabState.get(normalized);
  if (!state?.initialized) return;
  if (typeof state.cleanup === 'function') {
    try {
      state.cleanup();
    } catch (err) {
      console.warn('cleanup failed:', err);
    }
  }
  state.cleanup = null;
  tabState.set(normalized, state);
}

function setHash(tab) {
  history.replaceState(null, '', `#${tab}`);
}

function getTabFromHash() {
  const hash = (window.location.hash || '').replace('#', '').trim();
  return normalizeTab(hash);
}

function wireTabs() {
  const tabsRoot = document.querySelector('[data-js-showcase-tabs]');
  if (!tabsRoot) return;

  tabsRoot.addEventListener('click', async (e) => {
    const target = e.target instanceof HTMLElement ? e.target.closest('[data-tab]') : null;
    if (!(target instanceof HTMLElement)) return;

    const tab = normalizeTab(target.getAttribute('data-tab'));
    setActiveTab(tab);
    setHash(tab);
    await initTab(tab);
  });
}

function wireHashChange() {
  window.addEventListener('hashchange', async () => {
    const tab = getTabFromHash();
    setActiveTab(tab);
    await initTab(tab);
  });
}

function wireGlobalRefresh() {
  // For tabs that depend on theme/i18n, re-init minimal pieces.
  const reinitActive = async () => {
    const active = getTabFromHash();
    const state = tabState.get(active);
    const panel = getPanel(active);
    if (!panel || !state?.initialized) return;

    const onThemeChange = state.module?.onThemeChange;
    const onLanguageChange = state.module?.onLanguageChange;

    try {
      if (typeof onThemeChange === 'function') await onThemeChange(panel);
      if (typeof onLanguageChange === 'function') await onLanguageChange(panel);
      await refreshIcons(panel);
    } catch (err) {
      console.warn('tab refresh failed:', err);
    }
  };

  window.addEventListener('themechange', reinitActive);
  window.addEventListener('languagechange', reinitActive);

  // Cleanup long-running timers when leaving the page.
  window.addEventListener('beforeunload', () => {
    TAB_ORDER.forEach((tab) => cleanupTab(tab));
  });
}

async function initPage() {
  // Ensure global components are ready (Toast/Modal attach to window.*).
  renderToast();
  renderModal();

  wireTabs();
  wireHashChange();
  wireGlobalRefresh();

  const initial = getTabFromHash();
  setActiveTab(initial);
  await initTab(initial);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}


