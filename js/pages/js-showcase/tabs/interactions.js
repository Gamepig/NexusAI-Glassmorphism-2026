/**
 * Interactions tab
 * - Drag & drop reorder (widgets)
 * - Search enhancer (debounce + suggestions + history)
 * - Table sorting
 * - Form validation
 * - Keyboard shortcuts help
 * - Touch gestures (basic demo hooks)
 */

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

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">⚙️ 互動功能</h2>
      <p class="text-secondary">示範拖拽排序、搜尋增強、表格排序、即時驗證、快捷鍵與觸控手勢。</p>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🎯 拖拽排序</h3>
      <div class="demo-card">
        <p class="text-secondary mb-4">拖動卡片重新排序（示範）</p>
        <div class="demo-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));" data-drag-widgets>
          <div class="glass-card p-4" draggable="true" data-draggable="widget" style="border-radius: var(--radius-md); box-shadow:none; cursor: move;">📊 Dashboard</div>
          <div class="glass-card p-4" draggable="true" data-draggable="widget" style="border-radius: var(--radius-md); box-shadow:none; cursor: move;">📁 專案管理</div>
          <div class="glass-card p-4" draggable="true" data-draggable="widget" style="border-radius: var(--radius-md); box-shadow:none; cursor: move;">📈 數據分析</div>
        </div>
        <p class="text-secondary mt-3" style="font-size: var(--text-xs);">提示：拖動卡片即可重新排序</p>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🔍 搜尋增強</h3>
      <div class="demo-card">
        <p class="text-secondary mb-4">實時模糊搜尋 + 自動完成 + 搜尋歷史</p>
        <div style="position: relative;">
          <input class="form-input" type="text" placeholder="試著輸入 'Dashboard' 或 '資料'..." data-search-input>
          <div class="glass-card" data-search-suggestions style="
            position: absolute;
            left: 0;
            right: 0;
            top: calc(100% + 2px);
            max-height: 0;
            overflow: hidden;
            transition: max-height 160ms ease;
            border-radius: var(--radius-md);
            box-shadow: none;
          "></div>
        </div>
        <div class="mt-5">
          <h4 class="text-secondary" style="font-weight: var(--font-semibold); margin-bottom: var(--space-2);">搜尋歷史</h4>
          <div data-search-history style="display:flex; flex-wrap: wrap; gap: var(--space-2); min-height: 44px;"></div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">📊 表格互動（排序）</h3>
      <div class="demo-card">
        <p class="text-secondary mb-4">點擊列頭排序（示範）</p>
        <div class="table-container">
          <table class="table" data-sort-table>
            <thead>
              <tr>
                <th class="sortable" data-sort="name">名稱</th>
                <th class="sortable" data-sort="amount">金額</th>
                <th>狀態</th>
                <th class="sortable" data-sort="date">日期</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice Chen</td>
                <td data-amount="5000">NT$5,000</td>
                <td><span class="badge badge--success">已完成</span></td>
                <td data-date="2025-12-03">2025-12-03</td>
              </tr>
              <tr>
                <td>Bob Smith</td>
                <td data-amount="3200">NT$3,200</td>
                <td><span class="badge badge--warning">待處理</span></td>
                <td data-date="2025-12-02">2025-12-02</td>
              </tr>
              <tr>
                <td>Carol Wang</td>
                <td data-amount="7800">NT$7,800</td>
                <td><span class="badge badge--success">已完成</span></td>
                <td data-date="2025-12-01">2025-12-01</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-secondary mt-3" style="font-size: var(--text-xs);">提示：點擊列標題可排序</p>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">✓ 表單即時驗證</h3>
      <div class="demo-card">
        <p class="text-secondary mb-4">實時驗證 + 視覺反饋</p>
        <form data-validate-form style="max-width: 520px;">
          <div class="form-group">
            <label class="form-label">電子郵件</label>
            <input class="form-input" type="email" placeholder="user@example.com" data-validate="email">
            <div class="text-secondary" data-err="email" style="display:none; color: var(--color-error); font-size: var(--text-xs); margin-top: var(--space-2);">請輸入有效的電子郵件</div>
          </div>
          <div class="form-group">
            <label class="form-label">用戶名（3-20 字元）</label>
            <input class="form-input" type="text" placeholder="username" data-validate="username" data-min-length="3">
            <div class="text-secondary" data-err="username" style="display:none; color: var(--color-error); font-size: var(--text-xs); margin-top: var(--space-2);">用戶名必須為 3-20 字元</div>
          </div>
          <div class="form-group">
            <label class="form-label">密碼（至少 8 字元，含大小寫與數字）</label>
            <input class="form-input" type="password" placeholder="Password123" data-validate="password">
            <div class="text-secondary" data-err="password" style="display:none; color: var(--color-error); font-size: var(--text-xs); margin-top: var(--space-2);">密碼至少 8 字元，含大小寫與數字</div>
          </div>
          <button class="btn btn--primary" type="submit" style="width:100%;">提交表單</button>
        </form>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">⌨️ 鍵盤快捷鍵</h3>
      <div class="demo-card">
        <p class="text-secondary mb-4">全局快捷鍵示範（僅在本頁啟用）</p>
        <div data-shortcuts-help></div>
        <p class="text-secondary mt-3" style="font-size: var(--text-xs);">提示：按 Ctrl/Cmd + K 會聚焦搜尋框；Esc 會清空搜尋建議。</p>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">👆 觸控手勢（示範）</h3>
      <div class="demo-card">
        <p class="text-secondary mb-4">在支援觸控的裝置上試試看：滑動 / 長按 / 兩指縮放（示範事件）。</p>
        <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;" data-gesture-swipe>
          在這個區塊左右滑動（Swipe）
        </div>
        <div class="glass-card p-4 mt-3" style="border-radius: var(--radius-md); box-shadow:none;" data-gesture-long-press>
          在這個區塊長按（Long press）
        </div>
        <div class="glass-card p-4 mt-3" style="border-radius: var(--radius-md); box-shadow:none;" data-gesture-pinch>
          在這個區塊兩指縮放（Pinch）
        </div>
      </div>
    </div>
  `;
}

class DragDropManager {
  constructor(root) {
    this.root = root;
    this.dragged = null;
  }

  init() {
    const items = this.root.querySelectorAll('[data-draggable="widget"]');
    items.forEach((el) => {
      el.addEventListener('dragstart', (e) => {
        this.dragged = el;
        el.style.opacity = '0.55';
        e.dataTransfer.effectAllowed = 'move';
      });
      el.addEventListener('dragend', () => {
        el.style.opacity = '1';
        this.dragged = null;
      });
      el.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!this.dragged || this.dragged === el) return;
        el.style.borderTop = '3px dashed rgba(168,85,247,0.55)';
      });
      el.addEventListener('dragleave', () => {
        el.style.borderTop = '';
      });
      el.addEventListener('drop', (e) => {
        e.preventDefault();
        el.style.borderTop = '';
        if (!this.dragged || this.dragged === el) return;
        const parent = el.parentNode;
        const all = Array.from(parent.querySelectorAll('[data-draggable="widget"]'));
        const draggedIndex = all.indexOf(this.dragged);
        const targetIndex = all.indexOf(el);
        if (draggedIndex < targetIndex) parent.insertBefore(this.dragged, el.nextSibling);
        else parent.insertBefore(this.dragged, el);
      });
    });
  }
}

class SearchEnhancer {
  constructor(container) {
    this.container = container;
    this.timer = null;
    this.suggestions = ['Dashboard', '資料管理', '使用者管理', '設定', '通知'];
    this.mockData = [
      { id: 1, title: 'Dashboard 設定', category: '系統' },
      { id: 2, title: '資料管理系統', category: '數據' },
      { id: 3, title: '使用者管理', category: '用戶' },
      { id: 4, title: '設定面板', category: '配置' },
      { id: 5, title: '通知中心', category: '通知' },
    ];
    this.historyKey = 'jsShowcase_searchHistory';
  }

  loadHistory() {
    try {
      const raw = localStorage.getItem(this.historyKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveHistory(history) {
    try {
      localStorage.setItem(this.historyKey, JSON.stringify(history.slice(0, 10)));
    } catch {
      // ignore
    }
  }

  init() {
    this.input = this.container.querySelector('[data-search-input]');
    this.list = this.container.querySelector('[data-search-suggestions]');
    this.historyEl = this.container.querySelector('[data-search-history]');
    this.history = this.loadHistory();
    this.renderHistory();
    this.wire();
  }

  setListOpen(open) {
    if (!(this.list instanceof HTMLElement)) return;
    this.list.style.maxHeight = open ? '300px' : '0';
    this.list.style.padding = open ? 'var(--space-2)' : '0';
  }

  renderHistory() {
    if (!(this.historyEl instanceof HTMLElement)) return;
    const recent = this.history.slice(0, 5);
    if (!recent.length) {
      this.historyEl.innerHTML = `<span class="text-secondary">暫無搜尋歷史</span>`;
      return;
    }
    this.historyEl.innerHTML = recent
      .map(
        (q) => `
      <button type="button" class="btn btn--secondary btn--sm" data-history="${q}" style="white-space:nowrap;">
        🕐 ${q}
      </button>
    `
      )
      .join('');
  }

  addToHistory(query) {
    const q = String(query || '').trim();
    if (!q) return;
    if (!this.history.includes(q)) this.history.unshift(q);
    this.saveHistory(this.history);
    this.renderHistory();
  }

  renderResults(query) {
    if (!(this.list instanceof HTMLElement)) return;
    const q = String(query || '').trim().toLowerCase();
    const filtered = this.mockData.filter((x) => x.title.toLowerCase().includes(q));
    if (!filtered.length) {
      this.list.innerHTML = `<div class="text-secondary" style="padding: var(--space-3); text-align:center;">未找到匹配結果</div>`;
      return;
    }

    this.list.innerHTML = filtered
      .map(
        (item) => `
      <button type="button" class="glass-card" data-suggest="${item.title}" style="
        width:100%;
        text-align:left;
        padding: var(--space-3);
        border-radius: var(--radius-md);
        box-shadow:none;
        margin-bottom: var(--space-2);
      ">
        <div style="font-weight: var(--font-semibold); color: var(--text-primary);">${item.title}</div>
        <div class="text-secondary" style="font-size: var(--text-xs); margin-top: 2px;">${item.category}</div>
      </button>
    `
      )
      .join('');
  }

  wire() {
    if (!(this.input instanceof HTMLInputElement)) return;
    this.input.addEventListener('input', (e) => {
      clearTimeout(this.timer);
      const v = e.target.value.trim();
      this.setListOpen(!!v);
      this.timer = setTimeout(() => {
        if (v) this.renderResults(v);
      }, 280);
    });

    this.input.addEventListener('blur', () => {
      setTimeout(() => this.setListOpen(false), 160);
    });

    this.container.addEventListener('click', (e) => {
      const t = e.target instanceof HTMLElement ? e.target : null;
      if (!t) return;

      const hist = t.closest('[data-history]');
      if (hist instanceof HTMLElement && this.input) {
        const q = hist.getAttribute('data-history') || '';
        this.input.value = q;
        this.input.dispatchEvent(new Event('input'));
        return;
      }

      const sug = t.closest('[data-suggest]');
      if (sug instanceof HTMLElement && this.input) {
        const q = sug.getAttribute('data-suggest') || '';
        this.input.value = q;
        this.addToHistory(q);
        this.setListOpen(false);
      }
    });
  }
}

class TableSorter {
  constructor(table) {
    this.table = table;
    this.current = { key: null, dir: 'asc' };
  }

  init() {
    const headers = this.table.querySelectorAll('th.sortable');
    headers.forEach((th) => {
      th.style.cursor = 'pointer';
      th.addEventListener('click', () => {
        const key = th.getAttribute('data-sort');
        this.sort(key);
      });
    });
  }

  sort(key) {
    if (!key) return;
    const tbody = this.table.querySelector('tbody');
    if (!(tbody instanceof HTMLElement)) return;
    const rows = Array.from(tbody.querySelectorAll('tr'));

    if (this.current.key === key) this.current.dir = this.current.dir === 'asc' ? 'desc' : 'asc';
    else this.current = { key, dir: 'asc' };

    const dir = this.current.dir;

    const readVal = (row) => {
      if (key === 'amount') {
        const cell = row.querySelector('[data-amount]');
        return cell ? Number(cell.getAttribute('data-amount') || 0) : 0;
      }
      if (key === 'date') {
        const cell = row.querySelector('[data-date]');
        return cell ? String(cell.getAttribute('data-date') || '') : '';
      }
      return String(row.cells[0]?.textContent || '').trim();
    };

    rows.sort((a, b) => {
      const av = readVal(a);
      const bv = readVal(b);
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv), 'zh-TW');
      return dir === 'asc' ? cmp : -cmp;
    });

    rows.forEach((r) => tbody.appendChild(r));

    // Update header indicators without rewriting innerHTML
    const headers = this.table.querySelectorAll('th.sortable');
    headers.forEach((th) => {
      const k = th.getAttribute('data-sort');
      const mark = th.querySelector('[data-sort-mark]');
      if (mark) mark.remove();
      if (k === this.current.key) {
        const span = document.createElement('span');
        span.setAttribute('data-sort-mark', '1');
        span.style.marginLeft = '6px';
        span.textContent = this.current.dir === 'asc' ? '↑' : '↓';
        th.appendChild(span);
      }
    });
  }
}

class FormValidator {
  constructor(root) {
    this.root = root;
    this.rules = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      username: /^[a-zA-Z0-9_]{3,20}$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    };
  }

  init() {
    this.form = this.root.querySelector('[data-validate-form]');
    if (!(this.form instanceof HTMLFormElement)) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = this.form.querySelectorAll('[data-validate]');
      let ok = true;
      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement) ok = this.validateField(input) && ok;
      });
      if (ok) toast('success', '表單驗證通過（示範）');
    });

    this.form.addEventListener('blur', (e) => {
      const input = e.target;
      if (input instanceof HTMLInputElement && input.hasAttribute('data-validate')) this.validateField(input);
    }, true);

    this.form.addEventListener('input', (e) => {
      const input = e.target;
      if (input instanceof HTMLInputElement && input.hasAttribute('data-validate')) {
        if (input.classList.contains('has-error')) this.validateField(input);
      }
    });
  }

  showError(type, show) {
    const el = this.form.querySelector(`[data-err="${type}"]`);
    if (el instanceof HTMLElement) el.style.display = show ? 'block' : 'none';
  }

  setStatus(input, ok) {
    input.classList.toggle('has-error', !ok);
    input.classList.toggle('has-success', ok);
    input.style.borderColor = ok ? 'rgba(34,197,94,0.55)' : 'rgba(239,68,68,0.55)';
  }

  validateField(input) {
    const type = input.getAttribute('data-validate');
    const v = input.value || '';
    let ok = true;
    if (type === 'email') ok = this.rules.email.test(v);
    if (type === 'username') ok = this.rules.username.test(v);
    if (type === 'password') ok = this.rules.password.test(v);
    this.setStatus(input, ok);
    this.showError(type, !ok);
    return ok;
  }
}

class KeyboardShortcuts {
  constructor(root) {
    this.root = root;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  init() {
    this.searchInput = this.root.querySelector('[data-search-input]');
    this.suggestList = this.root.querySelector('[data-search-suggestions]');
    this.help = this.root.querySelector('[data-shortcuts-help]');
    if (this.help instanceof HTMLElement) {
      this.help.innerHTML = `
        <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
          <div style="display:flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--border-default);">
            <kbd>Ctrl+K / Cmd+K</kbd><span class="text-secondary">聚焦搜尋</span>
          </div>
          <div style="display:flex; justify-content: space-between; padding: var(--space-2) 0; border-bottom: 1px solid var(--border-default);">
            <kbd>Esc</kbd><span class="text-secondary">收起建議</span>
          </div>
          <div style="display:flex; justify-content: space-between; padding: var(--space-2) 0;">
            <kbd>Enter</kbd><span class="text-secondary">（示範）</span>
          </div>
        </div>
      `;
    }
    document.addEventListener('keydown', this.onKeyDown);
  }

  destroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    const key = (e.key || '').toLowerCase();
    const isMac = e.metaKey;
    const isCtrl = e.ctrlKey;

    if ((isCtrl || isMac) && key === 'k') {
      e.preventDefault();
      if (this.searchInput instanceof HTMLInputElement) this.searchInput.focus();
      return;
    }
    if (key === 'escape') {
      if (this.suggestList instanceof HTMLElement) {
        this.suggestList.style.maxHeight = '0';
        this.suggestList.style.padding = '0';
      }
    }
  }
}

class GestureDetector {
  constructor(root) {
    this.root = root;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastTouchDistance = 0;
    this.longPressTimer = null;
  }

  init() {
    const swipe = this.root.querySelector('[data-gesture-swipe]');
    const press = this.root.querySelector('[data-gesture-long-press]');
    const pinch = this.root.querySelector('[data-gesture-pinch]');

    if (swipe instanceof HTMLElement) {
      swipe.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
      });
      swipe.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].screenX;
        const endY = e.changedTouches[0].screenY;
        const dx = this.touchStartX - endX;
        const dy = this.touchStartY - endY;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 50) toast('info', '偵測到：向左滑動');
          if (dx < -50) toast('info', '偵測到：向右滑動');
        }
      });
    }

    if (press instanceof HTMLElement) {
      press.addEventListener('touchstart', (e) => {
        clearTimeout(this.longPressTimer);
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        this.longPressTimer = setTimeout(() => {
          toast('info', `偵測到：長按（${Math.round(x)}, ${Math.round(y)}）`);
        }, 520);
      });
      press.addEventListener('touchend', () => clearTimeout(this.longPressTimer));
      press.addEventListener('touchmove', () => clearTimeout(this.longPressTimer));
    }

    if (pinch instanceof HTMLElement) {
      pinch.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 2) return;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        if (this.lastTouchDistance > 0) {
          const scale = dist / this.lastTouchDistance;
          if (scale > 1.05) toast('info', '偵測到：放大');
          if (scale < 0.95) toast('info', '偵測到：縮小');
        }
        this.lastTouchDistance = dist;
      });
      pinch.addEventListener('touchend', () => {
        this.lastTouchDistance = 0;
      });
    }
  }
}

export async function init(container) {
  renderUI(container);

  const dragRoot = container.querySelector('[data-drag-widgets]');
  if (dragRoot instanceof HTMLElement) {
    const dnd = new DragDropManager(dragRoot);
    dnd.init();
  }

  const search = new SearchEnhancer(container);
  search.init();

  const table = container.querySelector('[data-sort-table]');
  const sorter = table instanceof HTMLTableElement ? new TableSorter(table) : null;
  sorter?.init();

  const validator = new FormValidator(container);
  validator.init();

  const shortcuts = new KeyboardShortcuts(container);
  shortcuts.init();

  const gestures = new GestureDetector(container);
  gestures.init();

  return () => {
    shortcuts.destroy();
  };
}


