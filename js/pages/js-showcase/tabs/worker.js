/**
 * Worker tab (Inline Blob Worker, works under file://)
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

const PRIME_WORKER_CODE = `
self.onmessage = function(e) {
  const max = e.data.max;
  const reportProgress = e.data.reportProgress;
  const start = performance.now();
  const primes = [];
  const step = Math.max(1, Math.floor(max / 10));
  for (let num = 2; num <= max; num++) {
    if (isPrime(num)) primes.push(num);
    if (reportProgress && num % step === 0) {
      self.postMessage({ type: 'progress', percent: Math.floor((num / max) * 100) });
    }
  }
  const end = performance.now();
  self.postMessage({ type: 'result', primes: primes, count: primes.length, duration: end - start });
};

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}
`;

const SORT_WORKER_CODE = `
self.onmessage = function(e) {
  const array = e.data.array;
  const algorithm = e.data.algorithm;
  const start = performance.now();
  let sorted;
  if (algorithm === 'quick') sorted = quickSort(array.slice());
  else if (algorithm === 'merge') sorted = mergeSort(array.slice());
  else if (algorithm === 'heap') sorted = heapSort(array.slice());
  else sorted = array.slice().sort((a,b)=>a-b);
  const end = performance.now();
  self.postMessage({ type: 'result', duration: end - start, algorithm: algorithm });
};

function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const mid = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return quickSort(left).concat(mid, quickSort(right));
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const out = [];
  let l = 0, r = 0;
  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) out.push(left[l++]);
    else out.push(right[r++]);
  }
  return out.concat(left.slice(l), right.slice(r));
}

function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n/2)-1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n-1; i > 0; i--) {
    const tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2*i + 1;
  const right = 2*i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    const tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
    heapify(arr, n, largest);
  }
}
`;

class WorkerShowcase {
  constructor() {
    this.workers = {};
    this.urls = {};
  }

  createInlineWorker(name, code) {
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const w = new Worker(url);
    this.workers[name] = w;
    this.urls[name] = url;
    return w;
  }

  terminate(name) {
    if (this.workers[name]) this.workers[name].terminate();
    if (this.urls[name]) URL.revokeObjectURL(this.urls[name]);
    delete this.workers[name];
    delete this.urls[name];
  }

  terminateAll() {
    Object.keys(this.workers).forEach((k) => this.terminate(k));
  }

  isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i * i <= num; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }

  computePrimesMain(max, onProgress) {
    return new Promise((resolve) => {
      const start = performance.now();
      const primes = [];
      const step = Math.max(1, Math.floor(max / 10));
      for (let num = 2; num <= max; num++) {
        if (this.isPrime(num)) primes.push(num);
        if (onProgress && num % step === 0) onProgress(Math.floor((num / max) * 100));
      }
      const end = performance.now();
      resolve({ primes, count: primes.length, duration: end - start });
    });
  }

  computePrimesWorker(max, onProgress) {
    return new Promise((resolve, reject) => {
      const w = this.createInlineWorker('prime', PRIME_WORKER_CODE);
      w.onmessage = (e) => {
        if (e.data.type === 'progress' && onProgress) onProgress(e.data.percent);
        if (e.data.type === 'result') {
          this.terminate('prime');
          resolve(e.data);
        }
      };
      w.onerror = (err) => {
        this.terminate('prime');
        reject(err);
      };
      w.postMessage({ max, reportProgress: !!onProgress });
    });
  }

  generateArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
  }

  sortMain(size, algorithm) {
    return new Promise((resolve) => {
      const arr = this.generateArray(size);
      const start = performance.now();
      if (algorithm === 'quick') arr.sort((a, b) => a - b);
      if (algorithm === 'merge') arr.sort((a, b) => a - b);
      if (algorithm === 'heap') arr.sort((a, b) => a - b);
      const end = performance.now();
      resolve({ duration: end - start, algorithm });
    });
  }

  sortWorker(size, algorithm) {
    return new Promise((resolve, reject) => {
      const arr = this.generateArray(size);
      const w = this.createInlineWorker('sort', SORT_WORKER_CODE);
      w.onmessage = (e) => {
        if (e.data.type === 'result') {
          this.terminate('sort');
          resolve(e.data);
        }
      };
      w.onerror = (err) => {
        this.terminate('sort');
        reject(err);
      };
      w.postMessage({ array: arr, algorithm });
    });
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">⚡ Web Worker（多線程）</h2>
      <p class="text-secondary">對比主線程 vs Worker：計算質數與排序大量資料，並觀察 UI 是否卡頓。</p>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🔢 質數計算</h3>
      <div class="demo-card">
        <div class="demo-control-row" style="align-items:center;">
          <label class="text-secondary">範圍上限</label>
          <select class="form-input" data-prime-range style="width: 180px;">
            <option value="10000">10,000</option>
            <option value="50000" selected>50,000</option>
            <option value="100000">100,000</option>
            <option value="200000">200,000</option>
          </select>
        </div>

        <div class="demo-grid mt-4" style="grid-template-columns: 1fr 1fr;">
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <strong>🐌 主線程</strong>
            <div class="text-secondary mt-2">會阻塞 UI</div>
            <button class="btn btn--secondary btn--sm mt-3" type="button" data-prime-main>執行</button>
            <div class="text-secondary mt-3">耗時：<strong data-prime-main-time>-</strong></div>
            <div class="text-secondary">結果：<strong data-prime-main-count>-</strong></div>
          </div>
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <strong>⚡ Worker</strong>
            <div class="text-secondary mt-2">不阻塞 UI</div>
            <button class="btn btn--primary btn--sm mt-3" type="button" data-prime-worker>執行</button>
            <div class="mt-3" style="height: 10px; border-radius: 999px; background: rgba(107,114,128,0.18); overflow:hidden;">
              <div data-prime-progress style="height: 10px; width: 0%; background: var(--color-primary);"></div>
            </div>
            <div class="text-secondary mt-3">耗時：<strong data-prime-worker-time>-</strong></div>
            <div class="text-secondary">結果：<strong data-prime-worker-count>-</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">📊 大數組排序</h3>
      <div class="demo-card">
        <div class="demo-control-row" style="align-items:center;">
          <label class="text-secondary">大小</label>
          <select class="form-input" data-sort-size style="width: 180px;">
            <option value="10000">10,000</option>
            <option value="50000" selected>50,000</option>
            <option value="100000">100,000</option>
            <option value="200000">200,000</option>
          </select>
          <label class="text-secondary">算法</label>
          <select class="form-input" data-sort-algo style="width: 180px;">
            <option value="quick">快速排序</option>
            <option value="merge">合併排序</option>
            <option value="heap">堆排序</option>
          </select>
        </div>

        <div class="demo-grid mt-4" style="grid-template-columns: 1fr 1fr;">
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <strong>🐌 主線程</strong>
            <button class="btn btn--secondary btn--sm mt-3" type="button" data-sort-main>執行</button>
            <div class="text-secondary mt-3">耗時：<strong data-sort-main-time>-</strong></div>
          </div>
          <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;">
            <strong>⚡ Worker</strong>
            <button class="btn btn--primary btn--sm mt-3" type="button" data-sort-worker>執行</button>
            <div class="text-secondary mt-3">耗時：<strong data-sort-worker-time>-</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🎯 UI 響應性測試</h3>
      <div class="demo-card">
        <div style="height: 120px; position: relative; border-radius: var(--radius-md); border: 1px solid var(--border-default); background: var(--bg-secondary); overflow:hidden;">
          <div data-ball style="width: 18px; height: 18px; border-radius: 999px; background: var(--color-secondary); position:absolute; left: 0; top: 50px;"></div>
        </div>
        <div class="demo-control-row mt-4">
          <button class="btn btn--secondary btn--sm" type="button" data-counter-btn>點我（<span data-counter>0</span>）</button>
        </div>
        <p class="text-secondary mt-3" style="font-size: var(--text-xs);">提示：在運算期間觀察小球是否仍然流暢移動。</p>
      </div>
    </div>
  `;
}

export async function init(container) {
  renderUI(container);

  const showcase = new WorkerShowcase();
  let counter = 0;
  let ballRaf = null;
  let ballX = 0;
  let dir = 1;

  const ball = container.querySelector('[data-ball]');
  const animateBall = () => {
    if (!(ball instanceof HTMLElement)) return;
    const parent = ball.parentElement;
    const w = parent ? parent.clientWidth : 320;
    ballX += dir * 2.6;
    if (ballX < 0) {
      ballX = 0;
      dir = 1;
    }
    if (ballX > w - 18) {
      ballX = w - 18;
      dir = -1;
    }
    ball.style.transform = `translateX(${ballX}px)`;
    ballRaf = requestAnimationFrame(animateBall);
  };
  ballRaf = requestAnimationFrame(animateBall);

  const readPrimeMax = () => {
    const el = container.querySelector('[data-prime-range]');
    return el instanceof HTMLSelectElement ? parseInt(el.value, 10) : 50000;
  };
  const readSortSize = () => {
    const el = container.querySelector('[data-sort-size]');
    return el instanceof HTMLSelectElement ? parseInt(el.value, 10) : 50000;
  };
  const readSortAlgo = () => {
    const el = container.querySelector('[data-sort-algo]');
    return el instanceof HTMLSelectElement ? el.value : 'quick';
  };

  const onClick = async (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;

    if (t.closest('[data-counter-btn]')) {
      counter++;
      const out = container.querySelector('[data-counter]');
      if (out instanceof HTMLElement) out.textContent = String(counter);
      return;
    }

    if (t.closest('[data-prime-main]')) {
      const max = readPrimeMax();
      const timeEl = container.querySelector('[data-prime-main-time]');
      const countEl = container.querySelector('[data-prime-main-count]');
      if (timeEl instanceof HTMLElement) timeEl.textContent = '計算中...';
      if (countEl instanceof HTMLElement) countEl.textContent = '-';

      setTimeout(async () => {
        const res = await showcase.computePrimesMain(max);
        if (timeEl instanceof HTMLElement) timeEl.textContent = `${res.duration.toFixed(2)} ms`;
        if (countEl instanceof HTMLElement) countEl.textContent = `找到 ${res.count.toLocaleString()} 個質數`;
      }, 40);
      return;
    }

    if (t.closest('[data-prime-worker]')) {
      const max = readPrimeMax();
      const timeEl = container.querySelector('[data-prime-worker-time]');
      const countEl = container.querySelector('[data-prime-worker-count]');
      const progress = container.querySelector('[data-prime-progress]');
      if (timeEl instanceof HTMLElement) timeEl.textContent = '計算中...';
      if (countEl instanceof HTMLElement) countEl.textContent = '-';
      if (progress instanceof HTMLElement) progress.style.width = '0%';

      try {
        const res = await showcase.computePrimesWorker(max, (p) => {
          if (progress instanceof HTMLElement) progress.style.width = `${p}%`;
        });
        if (progress instanceof HTMLElement) progress.style.width = '100%';
        if (timeEl instanceof HTMLElement) timeEl.textContent = `${res.duration.toFixed(2)} ms`;
        if (countEl instanceof HTMLElement) countEl.textContent = `找到 ${res.count.toLocaleString()} 個質數`;
      } catch (err) {
        toast('error', String(err?.message || err));
      }
      return;
    }

    if (t.closest('[data-sort-main]')) {
      const size = readSortSize();
      const algo = readSortAlgo();
      const timeEl = container.querySelector('[data-sort-main-time]');
      if (timeEl instanceof HTMLElement) timeEl.textContent = '排序中...';
      setTimeout(async () => {
        const res = await showcase.sortMain(size, algo);
        if (timeEl instanceof HTMLElement) timeEl.textContent = `${res.duration.toFixed(2)} ms`;
      }, 40);
      return;
    }

    if (t.closest('[data-sort-worker]')) {
      const size = readSortSize();
      const algo = readSortAlgo();
      const timeEl = container.querySelector('[data-sort-worker-time]');
      if (timeEl instanceof HTMLElement) timeEl.textContent = '排序中...';
      try {
        const res = await showcase.sortWorker(size, algo);
        if (timeEl instanceof HTMLElement) timeEl.textContent = `${res.duration.toFixed(2)} ms`;
      } catch (err) {
        toast('error', String(err?.message || err));
      }
    }
  };

  container.addEventListener('click', onClick);

  return () => {
    container.removeEventListener('click', onClick);
    showcase.terminateAll();
    if (ballRaf) cancelAnimationFrame(ballRaf);
  };
}


