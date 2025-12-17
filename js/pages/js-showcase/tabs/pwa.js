/**
 * PWA tab (client-side info + capability checks)
 */

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(k)));
  const v = bytes / Math.pow(k, i);
  return `${v.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

class PWAShowcase {
  constructor() {
    this.isOnline = navigator.onLine;
  }

  setupNetworkMonitor({ onOnline, onOffline } = {}) {
    window.addEventListener('online', () => {
      this.isOnline = true;
      if (typeof onOnline === 'function') onOnline();
    });
    window.addEventListener('offline', () => {
      this.isOnline = false;
      if (typeof onOffline === 'function') onOffline();
    });
  }

  checkSupport() {
    return {
      serviceWorker: 'serviceWorker' in navigator,
      cacheAPI: 'caches' in window,
      indexedDB: 'indexedDB' in window,
      storageAPI: 'storage' in navigator,
      notifications: 'Notification' in window,
      pushManager: 'PushManager' in window,
      backgroundSync: 'SyncManager' in window,
      periodicSync: 'PeriodicSyncManager' in window,
    };
  }

  async getStorageEstimate() {
    if (!('storage' in navigator) || !('estimate' in navigator.storage)) return null;
    try {
      const est = await navigator.storage.estimate();
      const usage = est.usage || 0;
      const quota = est.quota || 0;
      const percent = quota ? Math.min(100, (usage / quota) * 100) : 0;
      return { usage, quota, percent };
    } catch {
      return null;
    }
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">📱 PWA / Service Worker</h2>
      <p class="text-secondary">本分頁為純客戶端展示（不強制註冊 Service Worker），用於介紹概念與檢測瀏覽器支援度。</p>
    </div>

    <div class="showcase-section">
      <h3 class="h5">💡 什麼是 PWA？</h3>
      <div class="demo-card">
        <div class="demo-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
          <div>
            <strong>📴 離線可用</strong>
            <p class="text-secondary mt-2">透過 Service Worker 快取資源。</p>
          </div>
          <div>
            <strong>⚡ 快速載入</strong>
            <p class="text-secondary mt-2">快取策略加速頁面載入。</p>
          </div>
          <div>
            <strong>📲 可安裝</strong>
            <p class="text-secondary mt-2">加入主畫面，接近原生 App 體驗。</p>
          </div>
          <div>
            <strong>🔔 推送通知</strong>
            <p class="text-secondary mt-2">可在背景推送通知（需權限/伺服器配合）。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🌐 網路狀態（即時）</h3>
      <div class="demo-card">
        <div style="display:flex; align-items:center; gap: var(--space-3);">
          <span class="glass-badge" id="pwa-net-badge">檢查中...</span>
          <span class="text-secondary" id="pwa-net-detail">-</span>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">✅ API 支援檢測</h3>
      <div class="demo-card">
        <div class="demo-grid" id="pwa-support-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));"></div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">💽 儲存空間估算</h3>
      <div class="demo-card">
        <div style="height: 10px; border-radius: 999px; background: rgba(107,114,128,0.18); overflow:hidden;">
          <div id="pwa-storage-fill" style="height: 10px; width: 0%; background: var(--color-primary);"></div>
        </div>
        <div class="text-secondary mt-3">
          已使用：<strong id="pwa-storage-usage">-</strong>　/　配額：<strong id="pwa-storage-quota">-</strong>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">📝 程式碼範例（概念）</h3>
      <div class="code-block">
<pre><code>// 註冊 Service Worker（需要 HTTPS 或 localhost）
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}</code></pre>
      </div>
      <p class="text-secondary mt-3">提醒：<code>file://</code> 直接開啟檔案時，Service Worker 通常不可用。</p>
    </div>
  `;
}

function updateNetwork(container) {
  const badge = container.querySelector('#pwa-net-badge');
  const detail = container.querySelector('#pwa-net-detail');
  if (!(badge instanceof HTMLElement) || !(detail instanceof HTMLElement)) return;

  const online = navigator.onLine;
  badge.textContent = online ? '已連線' : '離線';
  badge.style.background = online ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)';
  badge.style.border = `1px solid ${online ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`;
  badge.style.color = online ? 'var(--color-success)' : 'var(--color-error)';

  const conn = navigator.connection;
  const type = conn?.effectiveType || '-';
  const downlink = conn?.downlink ? `${conn.downlink} Mbps` : '-';
  const rtt = conn?.rtt ? `${conn.rtt} ms` : '-';
  detail.textContent = `連線類型: ${type} / 下載: ${downlink} / 延遲: ${rtt}`;
}

function updateSupport(container, showcase) {
  const grid = container.querySelector('#pwa-support-grid');
  if (!(grid instanceof HTMLElement)) return;

  const support = showcase.checkSupport();
  const items = [
    { key: 'serviceWorker', name: 'Service Worker' },
    { key: 'cacheAPI', name: 'Cache API' },
    { key: 'indexedDB', name: 'IndexedDB' },
    { key: 'storageAPI', name: 'Storage API' },
    { key: 'notifications', name: 'Notifications' },
    { key: 'pushManager', name: 'Push API' },
    { key: 'backgroundSync', name: 'Background Sync' },
    { key: 'periodicSync', name: 'Periodic Sync' },
  ];

  grid.innerHTML = items
    .map((item) => {
      const ok = !!support[item.key];
      const label = ok ? '✅ 支援' : '❌ 不支援';
      return `
        <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow: none;">
          <div style="display:flex; justify-content: space-between; align-items:center; gap: var(--space-3);">
            <strong>${item.name}</strong>
            <span class="text-secondary" style="font-size: var(--text-xs);">${label}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

async function updateStorage(container, showcase) {
  const fill = container.querySelector('#pwa-storage-fill');
  const usageEl = container.querySelector('#pwa-storage-usage');
  const quotaEl = container.querySelector('#pwa-storage-quota');
  if (!(fill instanceof HTMLElement) || !(usageEl instanceof HTMLElement) || !(quotaEl instanceof HTMLElement)) return;

  const est = await showcase.getStorageEstimate();
  if (!est) {
    fill.style.width = '0%';
    usageEl.textContent = '不支援';
    quotaEl.textContent = '-';
    return;
  }

  fill.style.width = `${est.percent.toFixed(2)}%`;
  usageEl.textContent = formatBytes(est.usage);
  quotaEl.textContent = formatBytes(est.quota);
}

export async function init(container) {
  renderUI(container);

  const showcase = new PWAShowcase();
  const updateAll = async () => {
    updateNetwork(container);
    updateSupport(container, showcase);
    await updateStorage(container, showcase);
  };

  await updateAll();

  const onOnline = () => updateNetwork(container);
  const onOffline = () => updateNetwork(container);
  showcase.setupNetworkMonitor({ onOnline, onOffline });

  return () => {
    // No explicit cleanup needed; we keep listeners lightweight.
  };
}


