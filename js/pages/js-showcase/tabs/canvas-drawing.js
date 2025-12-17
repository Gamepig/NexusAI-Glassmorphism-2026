/**
 * Canvas Drawing tab
 * Full drawing tool:
 * - pen/pencil/brush/eraser
 * - line/rect/circle/fill
 * - undo/redo
 * - export PNG/JPG
 * - copy to clipboard (if supported)
 * - keyboard shortcuts
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

class CanvasDrawingTool {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tempCanvas = document.createElement('canvas');
    this.tempCtx = this.tempCanvas.getContext('2d');

    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.startX = 0;
    this.startY = 0;

    this.currentTool = 'pen';
    this.brushSize = 5;
    this.brushColor = getCssVar('--color-primary', '#A855F7');

    this.history = [];
    this.historyIndex = -1;
    this.maxHistory = 50;

    this.resize();
    this.clearCanvas();
    this.saveState();
    this.bindPointerEvents();
  }

  getBackgroundColor() {
    return getCssVar('--bg-secondary', '#F9FAFB');
  }

  resize() {
    const parent = this.canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : { width: 800 };
    this.canvas.width = Math.max(320, Math.floor(rect.width));
    this.canvas.height = 420;
    this.tempCanvas.width = this.canvas.width;
    this.tempCanvas.height = this.canvas.height;
  }

  setTool(tool) {
    this.currentTool = tool;
    const cursors = { pen: 'crosshair', pencil: 'crosshair', brush: 'crosshair', eraser: 'cell', fill: 'cell', line: 'crosshair', rect: 'crosshair', circle: 'crosshair' };
    this.canvas.style.cursor = cursors[tool] || 'default';
  }

  setBrushSize(size) {
    this.brushSize = Math.max(1, Math.min(50, size));
  }

  setBrushColor(color) {
    this.brushColor = color;
  }

  bindPointerEvents() {
    this.canvas.addEventListener('mousedown', (e) => this.startDraw(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.endDraw());
    this.canvas.addEventListener('mouseleave', () => this.endDraw());

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startDraw(e.touches[0]);
    }, { passive: false });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.draw(e.touches[0]);
    }, { passive: false });
    this.canvas.addEventListener('touchend', () => this.endDraw());
  }

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  startDraw(e) {
    const pos = this.getPos(e);
    this.isDrawing = true;
    this.lastX = pos.x;
    this.lastY = pos.y;
    this.startX = pos.x;
    this.startY = pos.y;

    if (['rect', 'circle', 'line'].includes(this.currentTool)) {
      this.tempCtx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
      this.tempCtx.drawImage(this.canvas, 0, 0);
    }

    if (this.currentTool === 'fill') {
      this.floodFill(Math.floor(pos.x), Math.floor(pos.y), this.brushColor);
      this.saveState();
      this.isDrawing = false;
    }
  }

  draw(e) {
    if (!this.isDrawing) return;
    const pos = this.getPos(e);

    if (this.currentTool === 'pen' || this.currentTool === 'pencil') {
      this.drawLine(this.lastX, this.lastY, pos.x, pos.y, this.brushColor, this.brushSize);
      this.lastX = pos.x;
      this.lastY = pos.y;
      return;
    }

    if (this.currentTool === 'brush') {
      this.drawBrush(pos.x, pos.y);
      this.lastX = pos.x;
      this.lastY = pos.y;
      return;
    }

    if (this.currentTool === 'eraser') {
      this.erase(pos.x, pos.y);
      return;
    }

    if (this.currentTool === 'line') {
      this.previewLine(pos.x, pos.y);
      return;
    }
    if (this.currentTool === 'rect') {
      this.previewRect(pos.x, pos.y);
      return;
    }
    if (this.currentTool === 'circle') {
      this.previewCircle(pos.x, pos.y);
    }
  }

  endDraw() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    if (['line', 'rect', 'circle', 'pen', 'pencil', 'brush', 'eraser'].includes(this.currentTool)) {
      this.saveState();
    }
  }

  drawLine(x1, y1, x2, y2, color, width) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();
  }

  drawBrush(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.brushColor;
    this.ctx.fill();
    this.drawLine(this.lastX, this.lastY, x, y, this.brushColor, this.brushSize);
  }

  erase(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushSize, 0, Math.PI * 2);
    this.ctx.fillStyle = this.getBackgroundColor();
    this.ctx.fill();
  }

  previewLine(endX, endY) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.tempCanvas, 0, 0);
    this.drawLine(this.startX, this.startY, endX, endY, this.brushColor, this.brushSize);
  }

  previewRect(endX, endY) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.tempCanvas, 0, 0);
    const w = endX - this.startX;
    const h = endY - this.startY;
    this.ctx.beginPath();
    this.ctx.rect(this.startX, this.startY, w, h);
    this.ctx.strokeStyle = this.brushColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.stroke();
  }

  previewCircle(endX, endY) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.tempCanvas, 0, 0);
    const dx = endX - this.startX;
    const dy = endY - this.startY;
    const r = Math.sqrt(dx * dx + dy * dy);
    this.ctx.beginPath();
    this.ctx.arc(this.startX, this.startY, r, 0, Math.PI * 2);
    this.ctx.strokeStyle = this.brushColor;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.stroke();
  }

  clearCanvas() {
    const bg = this.getBackgroundColor();
    this.ctx.fillStyle = bg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.tempCtx.fillStyle = bg;
    this.tempCtx.fillRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
  }

  saveState() {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(this.canvas.toDataURL());
    if (this.history.length > this.maxHistory) this.history.shift();
    this.historyIndex = this.history.length - 1;
  }

  restoreState(dataUrl) {
    const img = new Image();
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
  }

  undo() {
    if (this.historyIndex <= 0) return;
    this.historyIndex--;
    this.restoreState(this.history[this.historyIndex]);
  }

  redo() {
    if (this.historyIndex >= this.history.length - 1) return;
    this.historyIndex++;
    this.restoreState(this.history[this.historyIndex]);
  }

  exportPNG() {
    const a = document.createElement('a');
    a.download = `drawing-${Date.now()}.png`;
    a.href = this.canvas.toDataURL('image/png');
    a.click();
  }

  exportJPG() {
    const a = document.createElement('a');
    a.download = `drawing-${Date.now()}.jpg`;
    a.href = this.canvas.toDataURL('image/jpeg', 0.9);
    a.click();
  }

  async copyToClipboard() {
    if (!navigator.clipboard || typeof ClipboardItem === 'undefined') return false;
    const blob = await new Promise((resolve) => this.canvas.toBlob(resolve, 'image/png'));
    if (!blob) return false;
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    return true;
  }

  // Flood fill (stack-based)
  floodFill(startX, startY, fillColor) {
    const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = img.data;
    const w = this.canvas.width;
    const h = this.canvas.height;

    const target = this.getPixel(data, startX, startY, w);
    const repl = this.hexToRgb(fillColor);
    if (this.colorsMatch(target, repl)) return;

    const stack = [[startX, startY]];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      const cur = this.getPixel(data, x, y, w);
      if (!this.colorsMatch(cur, target)) continue;
      this.setPixel(data, x, y, w, repl);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    this.ctx.putImageData(img, 0, 0);
  }

  getPixel(data, x, y, w) {
    const i = (y * w + x) * 4;
    return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };
  }

  setPixel(data, x, y, w, c) {
    const i = (y * w + x) * 4;
    data[i] = c.r;
    data[i + 1] = c.g;
    data[i + 2] = c.b;
    data[i + 3] = 255;
  }

  colorsMatch(a, b, tol = 12) {
    return Math.abs(a.r - b.r) < tol && Math.abs(a.g - b.g) < tol && Math.abs(a.b - b.b) < tol;
  }

  hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return { r: 0, g: 0, b: 0 };
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">🎨 Canvas 繪圖工具</h2>
      <p class="text-secondary">完整繪圖功能展示（工具、形狀、填充、撤銷/重做、匯出、快捷鍵）。</p>
    </div>

    <div class="demo-card">
      <div class="demo-grid" style="grid-template-columns: 1fr;">
        <div class="glass-card p-4" style="border-radius: var(--radius-lg); box-shadow:none;">
          <div class="demo-control-row" style="align-items:center; flex-wrap: wrap;">
            <span class="text-secondary" style="font-weight: var(--font-semibold);">工具</span>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="pen">🖊️ 鋼筆</button>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="pencil">✏️ 鉛筆</button>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="brush">🖌️ 畫刷</button>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="eraser">🧽 橡皮擦</button>
            <span class="text-secondary" style="font-weight: var(--font-semibold); margin-left: var(--space-2);">形狀</span>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="line">📏 線條</button>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="rect">⬜ 矩形</button>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="circle">⭕ 圓形</button>
            <button class="btn btn--secondary btn--sm" type="button" data-tool="fill">🪣 填充</button>
          </div>

          <div class="demo-control-row mt-4" style="align-items:center;">
            <span class="text-secondary">顏色</span>
            <input type="color" data-color value="#A855F7" style="width: 46px; height: 36px; border: none; background: transparent;">
            <button class="btn btn--secondary btn--sm" type="button" data-preset="#A855F7" style="padding: 0; width: 36px; height: 36px; border-radius: 999px; background: #A855F7;"></button>
            <button class="btn btn--secondary btn--sm" type="button" data-preset="#06B6D4" style="padding: 0; width: 36px; height: 36px; border-radius: 999px; background: #06B6D4;"></button>
            <button class="btn btn--secondary btn--sm" type="button" data-preset="#22C55E" style="padding: 0; width: 36px; height: 36px; border-radius: 999px; background: #22C55E;"></button>
            <button class="btn btn--secondary btn--sm" type="button" data-preset="#F59E0B" style="padding: 0; width: 36px; height: 36px; border-radius: 999px; background: #F59E0B;"></button>
            <button class="btn btn--secondary btn--sm" type="button" data-preset="#EF4444" style="padding: 0; width: 36px; height: 36px; border-radius: 999px; background: #EF4444;"></button>
            <button class="btn btn--secondary btn--sm" type="button" data-preset="#FFFFFF" style="padding: 0; width: 36px; height: 36px; border-radius: 999px; background: #FFFFFF;"></button>
          </div>

          <div class="demo-control-row mt-4" style="align-items:center;">
            <span class="text-secondary">大小: <strong data-size-label>5</strong>px</span>
            <input type="range" min="1" max="50" value="5" data-size style="width: 220px;">
          </div>
        </div>

        <div style="border-radius: var(--radius-lg); overflow:hidden; border: 1px solid var(--border-default); background: var(--bg-secondary);">
          <canvas data-drawing-canvas style="display:block; width:100%; height:420px;"></canvas>
        </div>

        <div class="demo-control-row">
          <button class="btn btn--secondary btn--sm" type="button" data-action="undo">↩️ 撤銷</button>
          <button class="btn btn--secondary btn--sm" type="button" data-action="redo">↪️ 重做</button>
          <button class="btn btn--secondary btn--sm" type="button" data-action="clear">🗑️ 清除</button>
          <button class="btn btn--primary btn--sm" type="button" data-action="png">💾 匯出 PNG</button>
          <button class="btn btn--secondary btn--sm" type="button" data-action="jpg">📷 匯出 JPG</button>
          <button class="btn btn--secondary btn--sm" type="button" data-action="copy">📋 複製</button>
        </div>

        <div class="text-secondary" style="font-size: var(--text-xs); line-height: 1.8;">
          ⌨️ 快捷鍵：Ctrl/Cmd+Z 撤銷、Ctrl/Cmd+Y 重做、1-8 切換工具、[ ] 調整大小
        </div>
      </div>
    </div>
  `;
}

export async function init(container) {
  renderUI(container);

  const canvas = container.querySelector('[data-drawing-canvas]');
  if (!(canvas instanceof HTMLCanvasElement)) return () => {};
  const tool = new CanvasDrawingTool(canvas);

  const setActiveToolButton = (name) => {
    container.querySelectorAll('[data-tool]').forEach((b) => {
      b.classList.toggle('btn--primary', b.getAttribute('data-tool') === name);
      b.classList.toggle('btn--secondary', b.getAttribute('data-tool') !== name);
    });
  };

  setActiveToolButton('pen');

  const colorInput = container.querySelector('[data-color]');
  const sizeInput = container.querySelector('[data-size]');
  const sizeLabel = container.querySelector('[data-size-label]');

  const onClick = async (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;

    const toolBtn = t.closest('[data-tool]');
    if (toolBtn instanceof HTMLElement) {
      const name = toolBtn.getAttribute('data-tool');
      tool.setTool(name);
      setActiveToolButton(name);
      return;
    }

    const preset = t.closest('[data-preset]');
    if (preset instanceof HTMLElement) {
      const c = preset.getAttribute('data-preset');
      tool.setBrushColor(c);
      if (colorInput instanceof HTMLInputElement) colorInput.value = c;
      return;
    }

    const action = t.closest('[data-action]');
    if (action instanceof HTMLElement) {
      const a = action.getAttribute('data-action');
      if (a === 'undo') tool.undo();
      if (a === 'redo') tool.redo();
      if (a === 'clear') {
        tool.clearCanvas();
        tool.saveState();
      }
      if (a === 'png') tool.exportPNG();
      if (a === 'jpg') tool.exportJPG();
      if (a === 'copy') {
        try {
          const ok = await tool.copyToClipboard();
          if (ok) toast('success', '已複製到剪貼簿');
          else toast('warning', '此瀏覽器不支援複製圖片到剪貼簿');
        } catch (err) {
          toast('error', String(err?.message || err));
        }
      }
    }
  };

  const onInput = (e) => {
    const t = e.target;
    if (t === colorInput && colorInput instanceof HTMLInputElement) {
      tool.setBrushColor(colorInput.value);
    }
    if (t === sizeInput && sizeInput instanceof HTMLInputElement) {
      const v = parseInt(sizeInput.value, 10);
      tool.setBrushSize(v);
      if (sizeLabel instanceof HTMLElement) sizeLabel.textContent = String(v);
    }
  };

  const onKeyDown = (e) => {
    const activePanel = document.getElementById('canvas-drawing-tab');
    if (!activePanel?.classList.contains('is-active')) return;

    const isMod = e.ctrlKey || e.metaKey;
    if (isMod && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      tool.undo();
      return;
    }
    if (isMod && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      tool.redo();
      return;
    }

    const toolKeys = { '1': 'pen', '2': 'pencil', '3': 'brush', '4': 'eraser', '5': 'line', '6': 'rect', '7': 'circle', '8': 'fill' };
    if (toolKeys[e.key]) {
      tool.setTool(toolKeys[e.key]);
      setActiveToolButton(toolKeys[e.key]);
    }

    if (e.key === '[' && sizeInput instanceof HTMLInputElement) {
      const next = Math.max(1, parseInt(sizeInput.value, 10) - 5);
      sizeInput.value = String(next);
      tool.setBrushSize(next);
      if (sizeLabel instanceof HTMLElement) sizeLabel.textContent = String(next);
    }
    if (e.key === ']' && sizeInput instanceof HTMLInputElement) {
      const next = Math.min(50, parseInt(sizeInput.value, 10) + 5);
      sizeInput.value = String(next);
      tool.setBrushSize(next);
      if (sizeLabel instanceof HTMLElement) sizeLabel.textContent = String(next);
    }
  };

  const onResize = () => {
    // preserve current pixels as image
    try {
      const dataUrl = canvas.toDataURL();
      tool.resize();
      tool.clearCanvas();
      const img = new Image();
      img.onload = () => tool.ctx.drawImage(img, 0, 0);
      img.src = dataUrl;
    } catch {
      tool.resize();
      tool.clearCanvas();
    }
  };

  container.addEventListener('click', onClick);
  container.addEventListener('input', onInput);
  document.addEventListener('keydown', onKeyDown);
  window.addEventListener('resize', onResize);
  window.addEventListener('themechange', onResize);

  return () => {
    container.removeEventListener('click', onClick);
    container.removeEventListener('input', onInput);
    document.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('themechange', onResize);
  };
}


