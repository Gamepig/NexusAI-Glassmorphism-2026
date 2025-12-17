/**
 * ES Features tab
 * Covers:
 * - Object.groupBy (with polyfill)
 * - Promise.withResolvers (with polyfill)
 * - Temporal (demo via Date)
 * - Optional chaining / nullish coalescing
 * - Class private fields
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

class ArrayGrouping {
  constructor() {
    this.sampleData = [
      { id: 1, name: 'Alice Chen', status: 'active', amount: 5000, date: '2025-12-03' },
      { id: 2, name: 'Bob Smith', status: 'pending', amount: 3200, date: '2025-12-02' },
      { id: 3, name: 'Carol Wang', status: 'active', amount: 7800, date: '2025-12-01' },
      { id: 4, name: 'David Liu', status: 'inactive', amount: 2100, date: '2025-11-30' },
      { id: 5, name: 'Emma Zhou', status: 'active', amount: 4500, date: '2025-11-29' },
      { id: 6, name: 'Frank Lee', status: 'pending', amount: 6300, date: '2025-11-28' },
    ];
  }

  groupBy(array, fn) {
    if (typeof Object.groupBy === 'function') return Object.groupBy(array, fn);
    return array.reduce((acc, item, idx) => {
      const k = fn(item, idx);
      if (!acc[k]) acc[k] = [];
      acc[k].push(item);
      return acc;
    }, {});
  }

  render(container) {
    const byStatus = this.groupBy(this.sampleData, (x) => x.status);
    const byRange = this.groupBy(this.sampleData, (x) => (x.amount < 3000 ? 'low' : x.amount < 5000 ? 'medium' : 'high'));

    const renderGroup = (g) =>
      Object.entries(g)
        .map(([k, items]) => `<div style="display:flex; justify-content: space-between; padding: 8px 10px; border-bottom: 1px solid var(--border-default);"><span>${escapeHtml(k)}</span><span class="text-secondary">${items.length} 項</span></div>`)
        .join('');

    container.innerHTML = `
      <div class="demo-card">
        <h4>Object.groupBy（含 polyfill）</h4>
        <p class="text-secondary">依狀態/金額範圍分組，若瀏覽器未支援 Object.groupBy 則使用後備。</p>
        <div class="demo-grid" style="grid-template-columns: 1fr 1fr;">
          <div>
            <strong>按狀態分組</strong>
            <div class="glass-card p-3 mt-2" style="border-radius: var(--radius-md); box-shadow:none;">${renderGroup(byStatus)}</div>
          </div>
          <div>
            <strong>按金額範圍分組</strong>
            <div class="glass-card p-3 mt-2" style="border-radius: var(--radius-md); box-shadow:none;">${renderGroup(byRange)}</div>
          </div>
        </div>
        <div class="code-block mt-4"><pre><code>const grouped = Object.groupBy(data, item => item.status);</code></pre></div>
      </div>
    `;
  }
}

class PromiseAdvanced {
  static withResolvers() {
    if (typeof Promise.withResolvers === 'function') return Promise.withResolvers();
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  render(container) {
    container.innerHTML = `
      <div class="demo-card">
        <h4>Promise.withResolvers（含 polyfill）</h4>
        <p class="text-secondary">允許在 Promise 外部控制 resolve/reject。</p>
        <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
          <div style="display:flex; gap: var(--space-4); flex-wrap:wrap;">
            <div>狀態：<strong data-p-state>IDLE</strong></div>
            <div>值：<strong data-p-value>-</strong></div>
          </div>
        </div>
        <div class="demo-control-row mt-4">
          <button class="btn btn--primary btn--sm" type="button" data-p-action="create">建立 Promise</button>
          <button class="btn btn--secondary btn--sm" type="button" data-p-action="resolve">手動 Resolve</button>
          <button class="btn btn--secondary btn--sm" type="button" data-p-action="reject">手動 Reject</button>
        </div>
        <div class="code-block mt-4"><pre><code>const { promise, resolve, reject } = Promise.withResolvers();</code></pre></div>
      </div>
    `;
  }
}

class TemporalDemo {
  getPlainDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  getPlainTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  addDays(days) {
    const now = new Date();
    const future = new Date(now.getTime() + days * 86400000);
    const y = future.getFullYear();
    const m = String(future.getMonth() + 1).padStart(2, '0');
    const d = String(future.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  dateDiffDays(a, b) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    const ms = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(ms / 86400000);
  }

  render(container) {
    const today = this.getPlainDate();
    const plus30 = this.addDays(30);
    container.innerHTML = `
      <div class="demo-card">
        <h4>Temporal（示範）</h4>
        <p class="text-secondary">Temporal 尚未在所有瀏覽器普及，本分頁以 Date 模擬概念。</p>
        <div class="demo-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));">
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <div class="text-secondary">日期</div>
            <div class="h5" data-t-date>${today}</div>
          </div>
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <div class="text-secondary">時間</div>
            <div class="h5" data-t-time>${this.getPlainTime()}</div>
          </div>
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <div class="text-secondary">+7 天</div>
            <div class="h5">${this.addDays(7)}</div>
          </div>
        </div>
        <div class="mt-4">
          <strong>日期差異計算</strong>
          <div class="demo-control-row mt-2">
            <input class="form-input" type="date" data-diff-a value="${today}" style="width: 180px;">
            <span class="text-secondary">到</span>
            <input class="form-input" type="date" data-diff-b value="${plus30}" style="width: 180px;">
            <button class="btn btn--secondary btn--sm" type="button" data-t-action="diff">計算</button>
          </div>
          <div class="text-secondary mt-2" data-diff-out>相差 30 天</div>
        </div>
      </div>
    `;
  }
}

class SafeAccessDemo {
  render(container) {
    const complete = { user: { profile: { address: { city: 'Taipei' } }, settings: { theme: 'dark' } } };
    const partial = { user: { profile: null } };
    const empty = {};

    const cityA = complete?.user?.profile?.address?.city;
    const cityB = partial?.user?.profile?.address?.city;
    const cityC = empty?.user?.profile?.address?.city;

    const themeA = complete?.user?.settings?.theme ?? 'light';
    const themeB = partial?.user?.settings?.theme ?? 'light';
    const themeC = empty?.user?.settings?.theme ?? 'light';

    container.innerHTML = `
      <div class="demo-card">
        <h4>可選鏈（?.）與空值合併（??）</h4>
        <p class="text-secondary">安全存取深層屬性，避免 TypeError；並示範 ?? 與 || 的差異。</p>
        <div class="demo-grid" style="grid-template-columns: 1fr 1fr;">
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <strong>可選鏈結果</strong>
            <div class="text-secondary mt-2">complete city: <code>${escapeHtml(cityA ?? 'undefined')}</code></div>
            <div class="text-secondary mt-2">partial city: <code>${escapeHtml(cityB ?? 'undefined')}</code></div>
            <div class="text-secondary mt-2">empty city: <code>${escapeHtml(cityC ?? 'undefined')}</code></div>
          </div>
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <strong>空值合併結果</strong>
            <div class="text-secondary mt-2">complete theme: <code>${escapeHtml(themeA)}</code></div>
            <div class="text-secondary mt-2">partial theme: <code>${escapeHtml(themeB)}</code></div>
            <div class="text-secondary mt-2">empty theme: <code>${escapeHtml(themeC)}</code></div>
          </div>
        </div>
        <div class="code-block mt-4"><pre><code>const theme = settings?.theme ?? 'light';</code></pre></div>
      </div>
    `;
  }
}

class ClassEncapsulation {
  #counter = 0;
  static #instances = 0;

  constructor(name) {
    this.name = name;
    ClassEncapsulation.#instances++;
  }

  increment() {
    this.#counter++;
    return this.#counter;
  }

  getCounter() {
    return this.#counter;
  }

  static getInstanceCount() {
    return ClassEncapsulation.#instances;
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">⚡ ES 特性</h2>
      <p class="text-secondary">展示新舊語法對照與互動式示範。</p>
    </div>

    <div class="showcase-section">
      <div class="glass-card p-4" style="border-radius: var(--radius-lg); box-shadow:none;">
        <div class="demo-control-row" data-es-nav>
          <button class="btn btn--secondary btn--sm" type="button" data-es-section="grouping">Array Grouping</button>
          <button class="btn btn--secondary btn--sm" type="button" data-es-section="promise">Promise.withResolvers</button>
          <button class="btn btn--secondary btn--sm" type="button" data-es-section="temporal">Temporal</button>
          <button class="btn btn--secondary btn--sm" type="button" data-es-section="safe">?. / ??</button>
          <button class="btn btn--secondary btn--sm" type="button" data-es-section="class">Class 私有字段</button>
        </div>
      </div>
    </div>

    <div class="showcase-section" data-es-panel="grouping"></div>
    <div class="showcase-section hidden" data-es-panel="promise"></div>
    <div class="showcase-section hidden" data-es-panel="temporal"></div>
    <div class="showcase-section hidden" data-es-panel="safe"></div>
    <div class="showcase-section hidden" data-es-panel="class"></div>
  `;
}

function setActive(container, key) {
  container.querySelectorAll('[data-es-panel]').forEach((p) => {
    p.classList.toggle('hidden', p.getAttribute('data-es-panel') !== key);
  });
  container.querySelectorAll('[data-es-section]').forEach((b) => {
    b.classList.toggle('btn--primary', b.getAttribute('data-es-section') === key);
    b.classList.toggle('btn--secondary', b.getAttribute('data-es-section') !== key);
  });
}

export async function init(container) {
  renderUI(container);

  const groupingPanel = container.querySelector('[data-es-panel="grouping"]');
  const promisePanel = container.querySelector('[data-es-panel="promise"]');
  const temporalPanel = container.querySelector('[data-es-panel="temporal"]');
  const safePanel = container.querySelector('[data-es-panel="safe"]');
  const classPanel = container.querySelector('[data-es-panel="class"]');

  const grouping = new ArrayGrouping();
  const promise = new PromiseAdvanced();
  const temporal = new TemporalDemo();
  const safe = new SafeAccessDemo();

  if (groupingPanel instanceof HTMLElement) grouping.render(groupingPanel);
  if (promisePanel instanceof HTMLElement) promise.render(promisePanel);
  if (temporalPanel instanceof HTMLElement) temporal.render(temporalPanel);
  if (safePanel instanceof HTMLElement) safe.render(safePanel);

  if (classPanel instanceof HTMLElement) {
    const demo = new ClassEncapsulation('Demo');
    const count = ClassEncapsulation.getInstanceCount();
    classPanel.innerHTML = `
      <div class="demo-card">
        <h4>Class 私有字段（#）</h4>
        <p class="text-secondary">真正的私有屬性，外部無法直接存取。</p>
        <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
          <div class="demo-control-row" style="align-items:center;">
            <button class="btn btn--primary btn--sm" type="button" data-class-inc>增加計數器</button>
            <span>計數：<strong data-class-counter>0</strong></span>
            <span class="text-secondary">（建立 1 個實例，總實例數：<strong data-class-count>${count}</strong>）</span>
          </div>
        </div>
        <div class="code-block mt-4"><pre><code>class Counter {
  #count = 0;
  increment() { this.#count++; }
}</code></pre></div>
      </div>
    `;
    const btn = classPanel.querySelector('[data-class-inc]');
    const out = classPanel.querySelector('[data-class-counter]');
    if (btn instanceof HTMLButtonElement && out instanceof HTMLElement) {
      btn.addEventListener('click', () => {
        out.textContent = String(demo.increment());
      });
    }
  }

  // Handlers for Promise tab
  let currentPromise = null;
  const onClick = (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;

    const navBtn = t.closest('[data-es-section]');
    if (navBtn instanceof HTMLElement) {
      const key = navBtn.getAttribute('data-es-section');
      setActive(container, key);
      return;
    }

    const pBtn = t.closest('[data-p-action]');
    if (pBtn instanceof HTMLElement && promisePanel instanceof HTMLElement) {
      const action = pBtn.getAttribute('data-p-action');
      const stateEl = promisePanel.querySelector('[data-p-state]');
      const valEl = promisePanel.querySelector('[data-p-value]');
      if (!(stateEl instanceof HTMLElement) || !(valEl instanceof HTMLElement)) return;

      if (action === 'create') {
        const { promise: p, resolve, reject } = PromiseAdvanced.withResolvers();
        currentPromise = { resolve, reject };
        stateEl.textContent = 'PENDING';
        valEl.textContent = '-';
        p.then((v) => {
          stateEl.textContent = 'FULFILLED';
          valEl.textContent = typeof v === 'string' ? v : JSON.stringify(v);
        }).catch((err) => {
          stateEl.textContent = 'REJECTED';
          valEl.textContent = String(err?.message || err);
        });
      }
      if (action === 'resolve') {
        currentPromise?.resolve?.({ message: 'Manually resolved!', timestamp: Date.now() });
      }
      if (action === 'reject') {
        currentPromise?.reject?.(new Error('Manually rejected!'));
      }
      return;
    }

    const tBtn = t.closest('[data-t-action="diff"]');
    if (tBtn instanceof HTMLElement && temporalPanel instanceof HTMLElement) {
      const a = temporalPanel.querySelector('[data-diff-a]');
      const b = temporalPanel.querySelector('[data-diff-b]');
      const out = temporalPanel.querySelector('[data-diff-out]');
      if (!(a instanceof HTMLInputElement) || !(b instanceof HTMLInputElement) || !(out instanceof HTMLElement)) return;
      const days = temporal.dateDiffDays(a.value, b.value);
      out.textContent = `相差 ${days} 天`;
    }
  };

  container.addEventListener('click', onClick);

  // Start with grouping
  setActive(container, 'grouping');

  const timer = setInterval(() => {
    if (!(temporalPanel instanceof HTMLElement)) return;
    const timeEl = temporalPanel.querySelector('[data-t-time]');
    if (timeEl instanceof HTMLElement) timeEl.textContent = temporal.getPlainTime();
  }, 1000);

  return () => {
    container.removeEventListener('click', onClick);
    clearInterval(timer);
  };
}


