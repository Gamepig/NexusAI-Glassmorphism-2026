/**
 * Web APIs tab
 * Shows common modern browser APIs with safe fallbacks.
 */

function getCssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function toast(type, message) {
  const fn =
    type === 'error'
      ? window.Toast?.error
      : type === 'warning'
        ? window.Toast?.warning
        : type === 'success'
          ? window.Toast?.success
          : window.Toast?.info;
  if (typeof fn === 'function') fn(message);
}

class FetchManager {
  constructor() {
    this.mockData = {
      users: [
        { id: 1, name: 'Alex Johnson', email: 'alex@nexusai.com', role: 'Product Manager', avatar: '👨‍💼', status: 'active' },
        { id: 2, name: 'Sarah Chen', email: 'sarah@nexusai.com', role: 'Senior Developer', avatar: '👩‍💻', status: 'active' },
        { id: 3, name: 'Mike Wilson', email: 'mike@nexusai.com', role: 'Designer', avatar: '🎨', status: 'away' },
        { id: 4, name: 'Emma Davis', email: 'emma@nexusai.com', role: 'Marketing Manager', avatar: '📊', status: 'active' },
        { id: 5, name: 'James Brown', email: 'james@nexusai.com', role: 'QA Engineer', avatar: '🧪', status: 'active' },
      ],
      transactions: [
        { id: 'TXN001', date: '2025-12-03', type: 'revenue', amount: 5000, category: 'Subscription', description: 'Monthly subscription payment', status: 'completed' },
        { id: 'TXN002', date: '2025-12-02', type: 'expense', amount: 1200, category: 'Infrastructure', description: 'Cloud hosting fee', status: 'completed' },
        { id: 'TXN003', date: '2025-12-01', type: 'revenue', amount: 3500, category: 'Service', description: 'Consulting services', status: 'completed' },
        { id: 'TXN004', date: '2025-11-30', type: 'expense', amount: 850, category: 'Marketing', description: 'Ad campaign', status: 'completed' },
        { id: 'TXN005', date: '2025-11-29', type: 'revenue', amount: 7200, category: 'Product Sales', description: 'License sales', status: 'pending' },
      ],
      notifications: [
        { id: 1, title: '新任務指派', message: '你被指派審閱 API 文件', type: 'task', timestamp: '2025-12-03T10:30:00Z', read: false },
        { id: 2, title: '系統更新', message: '系統維護已完成', type: 'system', timestamp: '2025-12-03T09:15:00Z', read: false },
        { id: 3, title: '會議提醒', message: '15 分鐘後團隊站會', type: 'reminder', timestamp: '2025-12-03T08:45:00Z', read: true },
        { id: 4, title: '里程碑', message: 'Phase 1 已完成', type: 'achievement', timestamp: '2025-12-02T15:20:00Z', read: true },
        { id: 5, title: '安全提醒', message: '偵測到新的登入裝置', type: 'alert', timestamp: '2025-12-02T12:00:00Z', read: true },
      ],
    };
  }

  async simulateAPICall(endpoint, delayMs, onProgress) {
    const delay = Number.isFinite(delayMs) ? delayMs : 2000;
    const startedAt = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(99, (elapsed / delay) * 100);
      if (typeof onProgress === 'function') onProgress(progress);
    }, 60);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        clearInterval(interval);
        if (typeof onProgress === 'function') onProgress(100);

        const fail = Math.random() < 0.12;
        if (fail) {
          reject(new Error('模擬網路錯誤（示範）'));
          return;
        }

        const key = String(endpoint || '').trim();
        const data = this.mockData[key];
        resolve({
          success: true,
          endpoint: key,
          timestamp: new Date().toISOString(),
          data: data ?? null,
        });
      }, delay);
    });
  }
}

class StorageManager {
  constructor() {
    this.prefix = 'nexusai_';
  }

  getFullKey(key) {
    return `${this.prefix}${key}`;
  }

  saveLocal(key, value) {
    try {
      localStorage.setItem(this.getFullKey(key), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  saveSession(key, value) {
    try {
      sessionStorage.setItem(this.getFullKey(key), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  remove(key, useSession) {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      storage.removeItem(this.getFullKey(key));
      return true;
    } catch {
      return false;
    }
  }

  clear(useSession) {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      const keys = [];
      let i = 0;
      while (i < storage.length) {
        const k = storage.key(i);
        if (k && k.startsWith(this.prefix)) keys.push(k);
        i++;
      }
      keys.forEach((k) => storage.removeItem(k));
      return true;
    } catch {
      return false;
    }
  }

  getAll(useSession) {
    const storage = useSession ? sessionStorage : localStorage;
    const items = [];
    let i = 0;
    while (i < storage.length) {
      const k = storage.key(i);
      if (k && k.startsWith(this.prefix)) {
        const cleanKey = k.slice(this.prefix.length);
        const v = storage.getItem(k);
        items.push({ key: cleanKey, value: v });
      }
      i++;
    }
    return items;
  }

  getStats(useSession) {
    try {
      const storage = useSession ? sessionStorage : localStorage;
      let totalSize = 0;
      let count = 0;
      let i = 0;
      while (i < storage.length) {
        const k = storage.key(i);
        if (k && k.startsWith(this.prefix)) {
          const v = storage.getItem(k) || '';
          totalSize += (k.length + v.length) * 2;
          count++;
        }
        i++;
      }
      return { count, sizeBytes: totalSize, sizeKB: (totalSize / 1024).toFixed(2) };
    } catch {
      return null;
    }
  }
}

class GeolocationManager {
  isSupported() {
    return 'geolocation' in navigator;
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error('Geolocation API 不支援'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            timestamp: pos.timestamp,
          });
        },
        (err) => reject(new Error(err?.message || '取得位置失敗')),
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  }

  calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}

class NotificationManager {
  get permission() {
    return window.Notification?.permission || 'default';
  }

  isSupported() {
    return 'Notification' in window;
  }

  async requestPermission() {
    if (!this.isSupported()) return { ok: false, permission: 'unsupported' };
    try {
      const p = await window.Notification.requestPermission();
      return { ok: p === 'granted', permission: p };
    } catch {
      return { ok: false, permission: this.permission };
    }
  }

  send(title, options) {
    if (!this.isSupported()) return null;
    if (this.permission !== 'granted') return null;
    const n = new window.Notification(title, options);
    n.addEventListener('click', () => {
      window.focus();
      n.close();
    });
    return n;
  }
}

class ObserverManager {
  observeIntersection(elements, callback, options) {
    if (!('IntersectionObserver' in window)) return null;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => callback(entry.target, entry.isIntersecting, entry));
    }, options || { threshold: 0.2 });
    elements.forEach((el) => io.observe(el));
    return io;
  }

  observeResize(elements, callback) {
    if (!('ResizeObserver' in window)) return null;
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => callback(entry.target, entry.contentRect.width, entry.contentRect.height));
    });
    elements.forEach((el) => ro.observe(el));
    return ro;
  }
}

class CanvasTools {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.isDrawing = false;
    this.brushSize = 3;
    this.color = getCssVar('--color-primary', '#A855F7');
    this.mode = 'draw';
    this.setup();
  }

  setup() {
    this.resize();
    this.fillBackground();

    this.canvas.addEventListener('mousedown', () => (this.isDrawing = true));
    this.canvas.addEventListener('mouseup', () => (this.isDrawing = false));
    this.canvas.addEventListener('mouseleave', () => (this.isDrawing = false));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
  }

  resize() {
    const parent = this.canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : { width: 520 };
    this.canvas.width = Math.max(320, Math.floor(rect.width));
    this.canvas.height = 280;
  }

  fillBackground() {
    const bg = getCssVar('--bg-secondary', '#F9FAFB');
    this.ctx.fillStyle = bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setMode(mode) {
    this.mode = mode;
  }

  setColor(color) {
    this.color = color;
  }

  setBrushSize(size) {
    this.brushSize = Math.max(1, Math.min(24, size));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.fillBackground();
  }

  draw(event) {
    if (!this.isDrawing) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const bg = getCssVar('--bg-secondary', '#F9FAFB');
    const drawColor = this.mode === 'erase' ? bg : this.color;

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushSize, 0, Math.PI * 2);
    this.ctx.fillStyle = drawColor;
    this.ctx.fill();
  }

  drawChart(data, type) {
    this.clear();
    const padding = 36;
    const w = this.canvas.width - padding * 2;
    const h = this.canvas.height - padding * 2;
    const axis = 'rgba(107,114,128,0.45)';
    this.ctx.strokeStyle = axis;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(padding, padding);
    this.ctx.lineTo(padding, this.canvas.height - padding);
    this.ctx.lineTo(this.canvas.width - padding, this.canvas.height - padding);
    this.ctx.stroke();

    if (type === 'bar') this.drawBarChart(data, padding, w, h);
    if (type === 'line') this.drawLineChart(data, padding, w, h);
  }

  drawBarChart(data, padding, w, h) {
    const max = Math.max(...data.map((d) => d.value));
    const barW = w / data.length;
    this.ctx.fillStyle = 'rgba(168,85,247,0.65)';
    let i = 0;
    while (i < data.length) {
      const item = data[i];
      const bh = (item.value / max) * h;
      const x = padding + i * barW + barW * 0.12;
      const y = this.canvas.height - padding - bh;
      this.ctx.fillRect(x, y, barW * 0.76, bh);
      i++;
    }
  }

  drawLineChart(data, padding, w, h) {
    const max = Math.max(...data.map((d) => d.value));
    this.ctx.strokeStyle = getCssVar('--color-secondary', '#06B6D4');
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    let i = 0;
    while (i < data.length) {
      const item = data[i];
      const x = padding + (i / (data.length - 1)) * w;
      const y = this.canvas.height - padding - (item.value / max) * h;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
      i++;
    }
    this.ctx.stroke();

    this.ctx.fillStyle = getCssVar('--color-secondary', '#06B6D4');
    i = 0;
    while (i < data.length) {
      const item = data[i];
      const x = padding + (i / (data.length - 1)) * w;
      const y = this.canvas.height - padding - (item.value / max) * h;
      this.ctx.beginPath();
      this.ctx.arc(x, y, 4, 0, Math.PI * 2);
      this.ctx.fill();
      i++;
    }
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">🌐 Web API</h2>
      <p class="text-secondary">示範常見 Web API：Fetch、Storage、Geolocation、Notification、Canvas、Observer。</p>
    </div>

    <div class="showcase-section">
      <h3 class="h5">Fetch API（模擬呼叫）</h3>
      <div class="demo-card">
        <div class="demo-control-row" style="align-items:center;">
          <button class="btn btn--primary btn--sm" type="button" data-fetch="users">載入用戶</button>
          <button class="btn btn--secondary btn--sm" type="button" data-fetch="transactions">載入交易</button>
          <button class="btn btn--secondary btn--sm" type="button" data-fetch="notifications">載入通知</button>
          <select class="form-input" style="width: 180px;" data-fetch-delay>
            <option value="1000">延遲 1 秒</option>
            <option value="2000" selected>延遲 2 秒</option>
            <option value="3000">延遲 3 秒</option>
            <option value="5000">延遲 5 秒</option>
          </select>
        </div>

        <div class="mt-4" style="max-width: 520px;">
          <div class="text-secondary" style="display:flex; justify-content: space-between;">
            <span>載入進度</span>
            <span data-fetch-progress-text>0%</span>
          </div>
          <div style="height: 10px; border-radius: 999px; background: rgba(107,114,128,0.18); overflow:hidden;">
            <div data-fetch-progress-fill style="height: 10px; width: 0%; background: var(--color-primary);"></div>
          </div>
        </div>

        <div class="code-block mt-4" data-fetch-result><pre><code>點擊上方按鈕以模擬 API 呼叫</code></pre></div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">💾 Web Storage</h3>
      <div class="demo-card">
        <div class="demo-grid" style="grid-template-columns: 1fr 1fr;">
          <div>
            <div class="form-group">
              <label class="form-label">鍵名</label>
              <input class="form-input" type="text" data-storage-key placeholder="例如: token">
            </div>
          </div>
          <div>
            <div class="form-group">
              <label class="form-label">值</label>
              <input class="form-input" type="text" data-storage-value placeholder="例如: abc123">
            </div>
          </div>
        </div>
        <div class="demo-control-row">
          <button class="btn btn--primary btn--sm" type="button" data-storage-save="local">存入 LocalStorage</button>
          <button class="btn btn--secondary btn--sm" type="button" data-storage-save="session">存入 SessionStorage</button>
          <button class="btn btn--secondary btn--sm" type="button" data-storage-clear>清除全部 NexusAI keys</button>
        </div>

        <div class="demo-grid mt-4" style="grid-template-columns: 1fr 1fr;">
          <div>
            <strong>LocalStorage</strong>
            <div class="text-secondary mt-2" data-storage-stats="local">-</div>
            <div class="mt-3" data-storage-items="local"></div>
          </div>
          <div>
            <strong>SessionStorage</strong>
            <div class="text-secondary mt-2" data-storage-stats="session">-</div>
            <div class="mt-3" data-storage-items="session"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">📍 Geolocation</h3>
      <div class="demo-card">
        <div class="demo-control-row">
          <button class="btn btn--primary btn--sm" type="button" data-geo-request>請求位置權限</button>
        </div>
        <div class="mt-4 hidden" data-geo-info>
          <div class="demo-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
            <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
              <div class="text-secondary">緯度</div>
              <div class="h5" data-geo-lat>-</div>
            </div>
            <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
              <div class="text-secondary">經度</div>
              <div class="h5" data-geo-lon>-</div>
            </div>
            <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
              <div class="text-secondary">精度（公尺）</div>
              <div class="h5" data-geo-acc>-</div>
            </div>
            <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
              <div class="text-secondary">到東京距離（公里）</div>
              <div class="h5" data-geo-dist>-</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🔔 Notification</h3>
      <div class="demo-card">
        <div class="text-secondary mb-3">
          權限狀態：<strong data-notif-permission>未請求</strong>
        </div>
        <div class="demo-control-row">
          <button class="btn btn--primary btn--sm" type="button" data-notif-request>請求通知權限</button>
          <button class="btn btn--secondary btn--sm" type="button" data-notif-send="success">成功通知</button>
          <button class="btn btn--secondary btn--sm" type="button" data-notif-send="warning">警告通知</button>
          <button class="btn btn--secondary btn--sm" type="button" data-notif-send="error">錯誤通知</button>
          <button class="btn btn--secondary btn--sm" type="button" data-notif-send="info">資訊通知</button>
        </div>
        <p class="text-secondary mt-3">提醒：瀏覽器可能會封鎖非 HTTPS 環境的通知功能。</p>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🎨 Canvas API（簡易繪圖 + 圖表）</h3>
      <div class="demo-card">
        <div class="demo-control-row" style="align-items:center;">
          <button class="btn btn--secondary btn--sm" type="button" data-canvas-mode="draw">✏️ 繪圖</button>
          <button class="btn btn--secondary btn--sm" type="button" data-canvas-mode="erase">🧽 橡皮擦</button>
          <button class="btn btn--secondary btn--sm" type="button" data-canvas-clear>🗑️ 清除</button>
          <input type="color" value="#A855F7" data-canvas-color style="width: 44px; height: 36px; border: none; background: transparent;">
          <input type="range" min="1" max="18" value="3" data-canvas-size style="width: 140px;">
        </div>

        <div class="mt-4" style="border-radius: var(--radius-md); overflow:hidden; border: 1px solid var(--border-default);">
          <canvas data-canvas-board style="display:block; width: 100%; height: 280px;"></canvas>
        </div>

        <div class="demo-control-row mt-4">
          <button class="btn btn--secondary btn--sm" type="button" data-canvas-chart="bar">柱狀圖</button>
          <button class="btn btn--secondary btn--sm" type="button" data-canvas-chart="line">折線圖</button>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">👁️ Observer（Intersection / Resize）</h3>
      <div class="demo-card">
        <div class="demo-grid" style="grid-template-columns: 1fr;">
          <div>
            <div class="text-secondary mb-2">Intersection Observer：滾動觸發（往下滾動）</div>
            <div data-observe-scroll style="max-height: 240px; overflow:auto; border-radius: var(--radius-md); border: 1px solid var(--border-default); padding: var(--space-3); background: var(--bg-secondary);">
              <div class="glass-card p-4 mb-3" style="border-radius: var(--radius-md); box-shadow:none;" data-observe-item>項目 1 - 向下滾動以觸發</div>
              <div class="glass-card p-4 mb-3" style="border-radius: var(--radius-md); box-shadow:none;" data-observe-item>項目 2</div>
              <div class="glass-card p-4 mb-3" style="border-radius: var(--radius-md); box-shadow:none;" data-observe-item>項目 3</div>
              <div class="glass-card p-4 mb-3" style="border-radius: var(--radius-md); box-shadow:none;" data-observe-item>項目 4</div>
              <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;" data-observe-item>項目 5 - 底部項目</div>
            </div>
          </div>
          <div class="mt-4">
            <div class="text-secondary mb-2">Resize Observer：拖曳改變大小</div>
            <div data-resize-box style="
              width: 100%;
              height: 140px;
              resize: both;
              overflow: auto;
              border-radius: var(--radius-md);
              border: 1px dashed var(--border-default);
              background: var(--bg-secondary);
              padding: var(--space-3);
            ">
              寬度：<strong data-resize-w>-</strong> px　|　高度：<strong data-resize-h>-</strong> px
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStorageLists(container, storageManager) {
  const localStatsEl = container.querySelector('[data-storage-stats="local"]');
  const sessionStatsEl = container.querySelector('[data-storage-stats="session"]');
  const localListEl = container.querySelector('[data-storage-items="local"]');
  const sessionListEl = container.querySelector('[data-storage-items="session"]');

  const localStats = storageManager.getStats(false);
  const sessionStats = storageManager.getStats(true);
  if (localStatsEl) localStatsEl.textContent = localStats ? `項目數: ${localStats.count} / 估計大小: ${localStats.sizeKB} KB` : '無法讀取';
  if (sessionStatsEl) sessionStatsEl.textContent = sessionStats ? `項目數: ${sessionStats.count} / 估計大小: ${sessionStats.sizeKB} KB` : '無法讀取';

  const renderItems = (items, useSession) => {
    if (!items.length) return `<div class="text-secondary">無數據</div>`;
    return items
      .map(
        (it) => `
        <div class="glass-card p-4 mb-2" style="border-radius: var(--radius-md); box-shadow:none;">
          <div style="display:flex; justify-content: space-between; gap: var(--space-3); align-items: center;">
            <div style="min-width: 0;">
              <div style="font-weight: var(--font-semibold);">${it.key}</div>
              <div class="text-secondary" style="font-size: var(--text-xs); overflow:hidden; text-overflow: ellipsis; white-space: nowrap;">${String(it.value || '')}</div>
            </div>
            <button class="btn btn--secondary btn--sm" type="button" data-storage-remove="${it.key}" data-storage-session="${useSession ? '1' : '0'}">刪除</button>
          </div>
        </div>
      `
      )
      .join('');
  };

  if (localListEl) localListEl.innerHTML = renderItems(storageManager.getAll(false), false);
  if (sessionListEl) sessionListEl.innerHTML = renderItems(storageManager.getAll(true), true);
}

function updateNotifPermission(container, notificationManager) {
  const el = container.querySelector('[data-notif-permission]');
  if (!(el instanceof HTMLElement)) return;
  const p = notificationManager.permission;
  const label = p === 'granted' ? '✅ 已授予' : p === 'denied' ? '❌ 已拒絕' : '⏳ 未請求';
  el.textContent = label;
}

export async function init(container) {
  renderUI(container);

  const fetchManager = new FetchManager();
  const storageManager = new StorageManager();
  const geoManager = new GeolocationManager();
  const notifManager = new NotificationManager();
  const observerManager = new ObserverManager();

  updateNotifPermission(container, notifManager);
  renderStorageLists(container, storageManager);

  // Canvas tools init
  const canvas = container.querySelector('[data-canvas-board]');
  const canvasTools = canvas instanceof HTMLCanvasElement ? new CanvasTools(canvas) : null;

  // Observers
  const observeItems = [...container.querySelectorAll('[data-observe-item]')];
  const scrollBox = container.querySelector('[data-observe-scroll]');
  const resizeBox = container.querySelector('[data-resize-box]');
  const resizeW = container.querySelector('[data-resize-w]');
  const resizeH = container.querySelector('[data-resize-h]');

  const io = observerManager.observeIntersection(
    observeItems,
    (el, isIntersecting) => {
      if (!isIntersecting) return;
      if (!(el instanceof HTMLElement)) return;
      el.style.transition = 'transform 220ms ease, box-shadow 220ms ease';
      el.style.transform = 'translateX(6px)';
      el.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.12)';
    },
    { root: scrollBox instanceof HTMLElement ? scrollBox : null, threshold: 0.4 }
  );

  const ro = observerManager.observeResize(
    resizeBox instanceof HTMLElement ? [resizeBox] : [],
    (_el, w, h) => {
      if (resizeW instanceof HTMLElement) resizeW.textContent = String(Math.round(w));
      if (resizeH instanceof HTMLElement) resizeH.textContent = String(Math.round(h));
    }
  );

  // Handlers
  const onClick = async (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;

    const fetchBtn = t.closest('[data-fetch]');
    if (fetchBtn instanceof HTMLElement) {
      const endpoint = fetchBtn.getAttribute('data-fetch');
      const delaySel = container.querySelector('[data-fetch-delay]');
      const delay = delaySel instanceof HTMLSelectElement ? parseInt(delaySel.value, 10) : 2000;
      const progressFill = container.querySelector('[data-fetch-progress-fill]');
      const progressText = container.querySelector('[data-fetch-progress-text]');
      const result = container.querySelector('[data-fetch-result]');
      const buttons = [...container.querySelectorAll('[data-fetch]')];
      buttons.forEach((b) => (b.disabled = true));

      if (progressFill instanceof HTMLElement) progressFill.style.width = '0%';
      if (progressText instanceof HTMLElement) progressText.textContent = '0%';
      if (result instanceof HTMLElement) result.innerHTML = `<pre><code>載入中...</code></pre>`;

      try {
        const res = await fetchManager.simulateAPICall(endpoint, delay, (p) => {
          if (progressFill instanceof HTMLElement) progressFill.style.width = `${p.toFixed(0)}%`;
          if (progressText instanceof HTMLElement) progressText.textContent = `${Math.round(p)}%`;
        });
        if (result instanceof HTMLElement) result.innerHTML = `<pre><code>${JSON.stringify(res, null, 2)}</code></pre>`;
        toast('success', 'API 模擬呼叫完成');
      } catch (err) {
        if (result instanceof HTMLElement) result.innerHTML = `<pre><code>${String(err?.message || err)}</code></pre>`;
        toast('error', 'API 模擬呼叫失敗（示範）');
      } finally {
        buttons.forEach((b) => (b.disabled = false));
      }
      return;
    }

    const saveBtn = t.closest('[data-storage-save]');
    if (saveBtn instanceof HTMLElement) {
      const mode = saveBtn.getAttribute('data-storage-save');
      const keyEl = container.querySelector('[data-storage-key]');
      const valEl = container.querySelector('[data-storage-value]');
      const key = keyEl instanceof HTMLInputElement ? keyEl.value.trim() : '';
      const value = valEl instanceof HTMLInputElement ? valEl.value.trim() : '';
      if (!key || !value) {
        toast('warning', '請輸入鍵名與值');
        return;
      }
      const ok = mode === 'session' ? storageManager.saveSession(key, value) : storageManager.saveLocal(key, value);
      if (ok) toast('success', '已保存');
      else toast('error', '保存失敗');
      if (keyEl instanceof HTMLInputElement) keyEl.value = '';
      if (valEl instanceof HTMLInputElement) valEl.value = '';
      renderStorageLists(container, storageManager);
      return;
    }

    const clearBtn = t.closest('[data-storage-clear]');
    if (clearBtn instanceof HTMLElement) {
      const confirmed = await window.Modal?.confirm?.({ title: '確認', message: '確定要清除所有 NexusAI storage keys 嗎？' });
      if (!confirmed) return;
      storageManager.clear(false);
      storageManager.clear(true);
      renderStorageLists(container, storageManager);
      toast('success', '已清除');
      return;
    }

    const removeBtn = t.closest('[data-storage-remove]');
    if (removeBtn instanceof HTMLElement) {
      const key = removeBtn.getAttribute('data-storage-remove') || '';
      const useSession = removeBtn.getAttribute('data-storage-session') === '1';
      storageManager.remove(key, useSession);
      renderStorageLists(container, storageManager);
      toast('info', '已刪除項目');
      return;
    }

    const geoBtn = t.closest('[data-geo-request]');
    if (geoBtn instanceof HTMLElement) {
      geoBtn.setAttribute('disabled', 'true');
      try {
        if (!geoManager.isSupported()) {
          toast('warning', '瀏覽器不支援 Geolocation API');
          return;
        }
        const pos = await geoManager.getCurrentPosition();
        const info = container.querySelector('[data-geo-info]');
        if (info instanceof HTMLElement) info.classList.remove('hidden');
        const lat = container.querySelector('[data-geo-lat]');
        const lon = container.querySelector('[data-geo-lon]');
        const acc = container.querySelector('[data-geo-acc]');
        const dist = container.querySelector('[data-geo-dist]');
        if (lat instanceof HTMLElement) lat.textContent = pos.latitude.toFixed(4);
        if (lon instanceof HTMLElement) lon.textContent = pos.longitude.toFixed(4);
        if (acc instanceof HTMLElement) acc.textContent = pos.accuracy.toFixed(0);

        const d = geoManager.calculateDistanceKm(pos.latitude, pos.longitude, 35.6762, 139.6503);
        if (dist instanceof HTMLElement) dist.textContent = d.toFixed(2);
        toast('success', '位置已更新');
      } catch (err) {
        toast('error', String(err?.message || err));
      } finally {
        geoBtn.removeAttribute('disabled');
      }
      return;
    }

    const notifReq = t.closest('[data-notif-request]');
    if (notifReq instanceof HTMLElement) {
      const res = await notifManager.requestPermission();
      updateNotifPermission(container, notifManager);
      if (res.ok) toast('success', '通知權限已授予');
      else toast('warning', '通知權限未授予（或不支援）');
      return;
    }

    const notifSend = t.closest('[data-notif-send]');
    if (notifSend instanceof HTMLElement) {
      const kind = notifSend.getAttribute('data-notif-send');
      if (!notifManager.isSupported()) {
        toast('warning', '瀏覽器不支援 Notification API');
        return;
      }
      if (notifManager.permission !== 'granted') {
        toast('warning', '請先授予通知權限');
        return;
      }
      const map = {
        success: { title: '成功', body: '操作已成功完成', tag: 'success' },
        warning: { title: '警告', body: '請檢查設定或輸入', tag: 'warning' },
        error: { title: '錯誤', body: '發生錯誤，請重試', tag: 'error' },
        info: { title: '資訊', body: '這是一則資訊通知', tag: 'info' },
      };
      const payload = map[kind] || map.info;
      notifManager.send(payload.title, { body: payload.body, tag: payload.tag });
      toast('info', '已送出系統通知（若瀏覽器允許）');
      return;
    }

    const modeBtn = t.closest('[data-canvas-mode]');
    if (modeBtn instanceof HTMLElement && canvasTools) {
      const mode = modeBtn.getAttribute('data-canvas-mode');
      canvasTools.setMode(mode === 'erase' ? 'erase' : 'draw');
      toast('info', mode === 'erase' ? '橡皮擦模式' : '繪圖模式');
      return;
    }

    const clearCanvasBtn = t.closest('[data-canvas-clear]');
    if (clearCanvasBtn instanceof HTMLElement && canvasTools) {
      canvasTools.clear();
      return;
    }

    const chartBtn = t.closest('[data-canvas-chart]');
    if (chartBtn instanceof HTMLElement && canvasTools) {
      const type = chartBtn.getAttribute('data-canvas-chart');
      const sample = [
        { label: '1月', value: 120 },
        { label: '2月', value: 190 },
        { label: '3月', value: 150 },
        { label: '4月', value: 220 },
        { label: '5月', value: 180 },
        { label: '6月', value: 250 },
      ];
      canvasTools.drawChart(sample, type === 'line' ? 'line' : 'bar');
    }
  };

  const onInput = (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.matches('[data-canvas-color]') && canvasTools) {
      const v = t instanceof HTMLInputElement ? t.value : '#A855F7';
      canvasTools.setColor(v);
    }
    if (t.matches('[data-canvas-size]') && canvasTools) {
      const v = t instanceof HTMLInputElement ? parseInt(t.value, 10) : 3;
      canvasTools.setBrushSize(v);
    }
  };

  container.addEventListener('click', onClick);
  container.addEventListener('input', onInput);

  return () => {
    container.removeEventListener('click', onClick);
    container.removeEventListener('input', onInput);
    if (io?.disconnect) io.disconnect();
    if (ro?.disconnect) ro.disconnect();
  };
}


