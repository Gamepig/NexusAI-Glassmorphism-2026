/**
 * Charts tab (Chart.js)
 * Includes multiple chart types + randomize + realtime update toggle.
 */

import { getCurrentLanguage } from '../../../i18n.js';

function getCssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hasChartJS() {
  return typeof window !== 'undefined' && typeof window.Chart !== 'undefined';
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

class ChartShowcase {
  constructor() {
    this.charts = {};
    this.realtimeTimer = null;
    this.isRealtime = false;
  }

  destroy() {
    this.stopRealtime();
    Object.values(this.charts).forEach((c) => c?.destroy?.());
    this.charts = {};
  }

  colors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      primary: getCssVar('--color-primary', '#A855F7'),
      secondary: getCssVar('--color-secondary', '#06B6D4'),
      success: getCssVar('--color-success', '#22C55E'),
      warning: getCssVar('--color-warning', '#F59E0B'),
      error: getCssVar('--color-error', '#EF4444'),
      text: isDark ? '#E2E8F0' : '#334155',
      grid: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)',
      tooltipBg: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.95)',
    };
  }

  setupDefaults() {
    const c = this.colors();
    window.Chart.defaults.color = c.text;
    window.Chart.defaults.borderColor = c.grid;
    window.Chart.defaults.font.family = getCssVar('--font-sans', 'system-ui, -apple-system, sans-serif');
    window.Chart.defaults.animation = { duration: 900, easing: 'easeOutQuart' };
  }

  initAll(container) {
    this.setupDefaults();
    this.createLine(container);
    this.createBar(container);
    this.createPie(container);
    this.createDoughnut(container);
    this.createRadar(container);
    this.createScatter(container);
    this.createPolar(container);
    this.createMixed(container);
  }

  canvas(container, id) {
    const el = container.querySelector(`#${id}`);
    return el instanceof HTMLCanvasElement ? el : null;
  }

  createLine(container) {
    const el = this.canvas(container, 'revenueChart');
    if (!el) return;
    const c = this.colors();
    const isEn = getCurrentLanguage() === 'en';
    this.charts.revenueChart = new window.Chart(el, {
      type: 'line',
      data: {
        labels: isEn ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] : ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
          {
            label: isEn ? 'Revenue' : '營收',
            data: [120000, 190000, 150000, 250000, 220000, 300000],
            borderColor: c.primary,
            backgroundColor: 'rgba(168,85,247,0.12)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: c.tooltipBg,
            borderColor: c.primary,
            borderWidth: 1,
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: NT$${Number(ctx.raw).toLocaleString()}`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: c.text } },
          y: {
            grid: { color: c.grid },
            ticks: { color: c.text, callback: (v) => `NT$${Number(v) / 1000}K` },
          },
        },
      },
    });
  }

  createBar(container) {
    const el = this.canvas(container, 'salesChart');
    if (!el) return;
    const c = this.colors();
    const isEn = getCurrentLanguage() === 'en';
    this.charts.salesChart = new window.Chart(el, {
      type: 'bar',
      data: {
        labels: isEn ? ['Product A', 'Product B', 'Product C', 'Product D'] : ['產品 A', '產品 B', '產品 C', '產品 D'],
        datasets: [
          {
            label: isEn ? 'Sales' : '銷售量',
            data: [350, 200, 150, 400],
            backgroundColor: [c.primary, c.secondary, c.success, c.warning],
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: c.text } },
          y: { grid: { color: c.grid }, ticks: { color: c.text } },
        },
      },
    });
  }

  createPie(container) {
    const el = this.canvas(container, 'marketShareChart');
    if (!el) return;
    const c = this.colors();
    const isEn = getCurrentLanguage() === 'en';
    this.charts.marketShareChart = new window.Chart(el, {
      type: 'pie',
      data: {
        labels: isEn ? ['Us', 'Competitor A', 'Competitor B', 'Others'] : ['我司', '競品 A', '競品 B', '其他'],
        datasets: [{ data: [35, 25, 20, 20], backgroundColor: [c.primary, c.secondary, c.success, 'rgba(107,114,128,0.7)'] }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
    });
  }

  createDoughnut(container) {
    const el = this.canvas(container, 'goalChart');
    if (!el) return;
    const c = this.colors();
    const isEn = getCurrentLanguage() === 'en';
    this.charts.goalChart = new window.Chart(el, {
      type: 'doughnut',
      data: {
        labels: isEn ? ['Done', 'Remaining'] : ['達成', '剩餘'],
        datasets: [{ data: [72, 28], backgroundColor: [c.success, 'rgba(107,114,128,0.35)'], borderWidth: 0, cutout: '70%' }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
    });
  }

  createRadar(container) {
    const el = this.canvas(container, 'performanceChart');
    if (!el) return;
    const c = this.colors();
    const isEn = getCurrentLanguage() === 'en';
    this.charts.performanceChart = new window.Chart(el, {
      type: 'radar',
      data: {
        labels: isEn ? ['Speed', 'Stability', 'Usability', 'Features', 'Security'] : ['速度', '穩定性', '易用性', '功能性', '安全性'],
        datasets: [
          {
            label: isEn ? 'Score' : '評分',
            data: [85, 90, 75, 88, 92],
            borderColor: c.secondary,
            backgroundColor: 'rgba(6,182,212,0.18)',
            pointRadius: 4,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
    });
  }

  createScatter(container) {
    const el = this.canvas(container, 'scatterChart');
    if (!el) return;
    const c = this.colors();
    this.charts.scatterChart = new window.Chart(el, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: '價格 vs 銷量',
            data: [
              { x: 100, y: 200 },
              { x: 150, y: 180 },
              { x: 200, y: 250 },
              { x: 250, y: 300 },
              { x: 300, y: 280 },
              { x: 350, y: 350 },
              { x: 400, y: 320 },
              { x: 450, y: 400 },
            ],
            backgroundColor: c.primary,
            pointRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: c.grid }, ticks: { color: c.text }, title: { display: true, text: getCurrentLanguage() === 'en' ? 'Price (NT$)' : '價格 (NT$)', color: c.text } },
          y: { grid: { color: c.grid }, ticks: { color: c.text }, title: { display: true, text: getCurrentLanguage() === 'en' ? 'Volume' : '銷量', color: c.text } },
        },
      },
    });
  }

  createPolar(container) {
    const el = this.canvas(container, 'hourlyChart');
    if (!el) return;
    const c = this.colors();
    this.charts.hourlyChart = new window.Chart(el, {
      type: 'polarArea',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [{ data: [120, 50, 280, 450, 380, 320], backgroundColor: [c.primary, c.secondary, c.success, c.warning, c.error, 'rgba(107,114,128,0.6)'] }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
    });
  }

  createMixed(container) {
    const el = this.canvas(container, 'mixedChart');
    if (!el) return;
    const c = this.colors();
    const isEn = getCurrentLanguage() === 'en';
    const labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
    const data = [120000, 190000, 150000, 250000, 220000, 300000];
    this.charts.mixedChart = new window.Chart(el, {
      type: 'bar',
      data: {
        labels: isEn ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] : labels,
        datasets: [
          { type: 'line', label: isEn ? 'Trend' : '趨勢線', data, borderColor: c.secondary, backgroundColor: 'transparent', tension: 0.4 },
          { type: 'bar', label: isEn ? 'Monthly revenue' : '月營收', data, backgroundColor: 'rgba(168,85,247,0.6)', borderRadius: 6 },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } },
    });
  }

  randomizeAll() {
    Object.values(this.charts).forEach((chart) => {
      const ds = chart.data?.datasets || [];
      ds.forEach((d) => {
        if (Array.isArray(d.data)) {
          d.data = d.data.map((v) => (typeof v === 'number' ? Math.max(0, v + (Math.random() - 0.5) * v * 0.3) : v));
        }
      });
      chart.update();
    });
    toast('info', '已隨機更新數據');
  }

  startRealtime() {
    if (this.realtimeTimer) return;
    const chart = this.charts.revenueChart;
    if (!chart) return;
    this.realtimeTimer = setInterval(() => {
      const d = chart.data.datasets[0].data;
      d.shift();
      d.push(220000 + (Math.random() - 0.5) * 120000);
      chart.update('none');
    }, 2000);
    this.isRealtime = true;
    toast('success', '已開始實時更新（營收折線圖）');
  }

  stopRealtime() {
    if (this.realtimeTimer) clearInterval(this.realtimeTimer);
    this.realtimeTimer = null;
    this.isRealtime = false;
  }

  toggleRealtime() {
    if (this.isRealtime) {
      this.stopRealtime();
      toast('info', '已停止實時更新');
    } else {
      this.startRealtime();
    }
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">📊 Chart.js 數據可視化</h2>
      <p class="text-secondary">展示多種圖表與互動功能（需要載入 Chart.js）。</p>
      <div class="demo-control-row mt-4">
        <button class="btn btn--secondary btn--sm" type="button" data-chart-action="random">🎲 隨機數據</button>
        <button class="btn btn--secondary btn--sm" type="button" data-chart-action="realtime">⏱️ 實時更新</button>
      </div>
    </div>

    <div class="showcase-section">
      <div class="demo-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
        <div class="demo-card">
          <h4>📈 營收趨勢（折線圖）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="revenueChart"></canvas>
          </div>
        </div>
        <div class="demo-card">
          <h4>📊 產品銷售（柱狀圖）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="salesChart"></canvas>
          </div>
        </div>
        <div class="demo-card">
          <h4>🥧 市場份額（圓餅圖）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="marketShareChart"></canvas>
          </div>
        </div>
        <div class="demo-card">
          <h4>🍩 目標達成（環形圖）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="goalChart"></canvas>
          </div>
        </div>
        <div class="demo-card">
          <h4>🎯 產品評分（雷達圖）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="performanceChart"></canvas>
          </div>
        </div>
        <div class="demo-card">
          <h4>⚬ 價格銷量（散佈圖）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="scatterChart"></canvas>
          </div>
        </div>
        <div class="demo-card">
          <h4>🕐 時段分佈（極區圖）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="hourlyChart"></canvas>
          </div>
        </div>
        <div class="demo-card">
          <h4>🔀 組合圖表（混合）</h4>
          <div class="demo-preview" style="height: 280px;">
            <canvas id="mixedChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function init(container) {
  renderUI(container);

  if (!hasChartJS()) {
    container.insertAdjacentHTML(
      'afterbegin',
      `<div class="glass-card p-6 mb-6"><h3 class="h5 mb-2">Chart.js 未載入</h3><p class="text-secondary">請確認 CDN 是否可用；本分頁需要 Chart.js 才能顯示圖表。</p></div>`
    );
    return () => {};
  }

  const showcase = new ChartShowcase();
  showcase.initAll(container);
  container._chartShowcase = showcase;

  const onClick = (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;
    const btn = t.closest('[data-chart-action]');
    if (!(btn instanceof HTMLElement)) return;
    const action = btn.getAttribute('data-chart-action');
    if (action === 'random') showcase.randomizeAll();
    if (action === 'realtime') showcase.toggleRealtime();
  };

  container.addEventListener('click', onClick);

  return () => {
    container.removeEventListener('click', onClick);
    showcase.destroy();
    container._chartShowcase = null;
  };
}

export async function onThemeChange(container) {
  const showcase = container._chartShowcase;
  if (!showcase) return;
  // simplest: destroy and rebuild all charts so colors update
  showcase.destroy();
  showcase.initAll(container);
}

export async function onLanguageChange(container) {
  const showcase = container._chartShowcase;
  if (!showcase) return;
  showcase.destroy();
  showcase.initAll(container);
}


