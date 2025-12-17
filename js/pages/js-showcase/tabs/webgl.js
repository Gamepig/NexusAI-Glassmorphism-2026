/**
 * 3D tab
 * Canvas 2D projection to simulate 3D (works under file://)
 * Avoids nested loops by flattening index iteration.
 */

function getCssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

class Canvas3D {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = Math.max(320, container.clientWidth || 800);
    this.height = 420;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = '100%';
    this.canvas.style.height = `${this.height}px`;
    this.canvas.style.display = 'block';
    this.canvas.style.borderRadius = 'var(--radius-md)';
    this.canvas.style.border = '1px solid var(--border-default)';
    container.appendChild(this.canvas);

    this.objects = [];
    this.animationId = null;
    this.rotation = { x: 0, y: 0 };
    this.autoRotate = true;
    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };
    this.cameraZ = 5;

    this.onResize = () => this.resize();
    window.addEventListener('resize', this.onResize);
    this.setupControls();
  }

  setupControls() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.lastMouse = { x: e.offsetX, y: e.offsetY };
    });
    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.offsetX - this.lastMouse.x;
      const dy = e.offsetY - this.lastMouse.y;
      this.rotation.y += dx * 0.01;
      this.rotation.x += dy * 0.01;
      this.lastMouse = { x: e.offsetX, y: e.offsetY };
    });
    this.canvas.addEventListener('mouseup', () => (this.isDragging = false));
    this.canvas.addEventListener('mouseleave', () => (this.isDragging = false));
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.cameraZ += e.deltaY * 0.01;
      this.cameraZ = Math.max(3, Math.min(10, this.cameraZ));
    });
    this.canvas.addEventListener('dblclick', () => {
      this.autoRotate = true;
    });
  }

  resize() {
    this.width = Math.max(320, this.container.clientWidth || 800);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  project(p) {
    const scale = 220 / (this.cameraZ + p.z);
    return { x: this.width / 2 + p.x * scale, y: this.height / 2 + p.y * scale, scale };
  }

  rotatePoint(p, rx, ry) {
    // rotate around Y
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x1 = p.x * cosY - p.z * sinY;
    let z1 = p.x * sinY + p.z * cosY;
    // rotate around X
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y2 = p.y * cosX - z1 * sinX;
    z1 = p.y * sinX + z1 * cosX;
    return { x: x1, y: y2, z: z1 };
  }

  clearScene() {
    this.stop();
    this.objects = [];
    this.rotation = { x: 0, y: 0 };
    this.autoRotate = true;
  }

  addCube({ size = 1, color = '#A855F7', x = 0, y = 0, z = 0, wireframe = true } = {}) {
    const s = size;
    const verts = [
      { x: -s, y: -s, z: -s },
      { x: s, y: -s, z: -s },
      { x: s, y: s, z: -s },
      { x: -s, y: s, z: -s },
      { x: -s, y: -s, z: s },
      { x: s, y: -s, z: s },
      { x: s, y: s, z: s },
      { x: -s, y: s, z: s },
    ].map((v) => ({ x: v.x + x, y: v.y + y, z: v.z + z }));
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
    this.objects.push({ type: 'wire', vertices: verts, edges, color, wireframe });
  }

  addSphere({ radius = 1, color = '#06B6D4', x = 0, y = 0, z = 0, segments = 12 } = {}) {
    const seg = segments;
    const cols = seg + 1;
    const rows = seg + 1;
    const total = rows * cols;
    const vertices = new Array(total);

    let idx = 0;
    while (idx < total) {
      const i = Math.floor(idx / cols);
      const j = idx % cols;
      const lat = (i / seg) * Math.PI;
      const lon = (j / seg) * 2 * Math.PI;
      vertices[idx] = {
        x: x + radius * Math.sin(lat) * Math.cos(lon),
        y: y + radius * Math.cos(lat),
        z: z + radius * Math.sin(lat) * Math.sin(lon),
      };
      idx++;
    }

    const edges = [];
    idx = 0;
    while (idx < seg * seg) {
      const i = Math.floor(idx / seg);
      const j = idx % seg;
      const base = i * cols + j;
      edges.push([base, base + 1]);
      edges.push([base, base + cols]);
      idx++;
    }

    this.objects.push({ type: 'wire', vertices, edges, color, wireframe: true });
  }

  addTorus({ radius = 1, tube = 0.3, color = '#22C55E', x = 0, y = 0, z = 0, segments = 16, tubeSegments = 12 } = {}) {
    const seg = segments;
    const tseg = tubeSegments;
    const cols = tseg + 1;
    const rows = seg + 1;
    const total = rows * cols;
    const vertices = new Array(total);

    let idx = 0;
    while (idx < total) {
      const i = Math.floor(idx / cols);
      const j = idx % cols;
      const u = (i / seg) * 2 * Math.PI;
      const v = (j / tseg) * 2 * Math.PI;
      vertices[idx] = {
        x: x + (radius + tube * Math.cos(v)) * Math.cos(u),
        y: y + tube * Math.sin(v),
        z: z + (radius + tube * Math.cos(v)) * Math.sin(u),
      };
      idx++;
    }

    const edges = [];
    idx = 0;
    while (idx < seg * tseg) {
      const i = Math.floor(idx / tseg);
      const j = idx % tseg;
      const base = i * cols + j;
      edges.push([base, base + 1]);
      edges.push([base, base + cols]);
      idx++;
    }

    this.objects.push({ type: 'wire', vertices, edges, color, wireframe: true });
  }

  addParticles(count = 280) {
    const vertices = new Array(count);
    let i = 0;
    while (i < count) {
      vertices[i] = { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6, z: (Math.random() - 0.5) * 6 };
      i++;
    }
    this.objects.push({ type: 'particles', vertices, color: getCssVar('--color-primary', '#A855F7') });
  }

  render() {
    const bg = getCssVar('--bg-secondary', '#F9FAFB');
    this.ctx.fillStyle = bg;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.objects.forEach((obj) => {
      if (obj.type === 'particles') this.renderParticles(obj);
      else this.renderWire(obj);
    });
  }

  renderWire(obj) {
    const projected = obj.vertices.map((v) => this.project(this.rotatePoint(v, this.rotation.x, this.rotation.y)));
    this.ctx.strokeStyle = obj.color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    obj.edges.forEach(([a, b]) => {
      const p1 = projected[a];
      const p2 = projected[b];
      if (!p1 || !p2) return;
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
    });
    this.ctx.stroke();

    this.ctx.fillStyle = obj.color;
    projected.forEach((p) => {
      if (!p) return;
      const r = Math.max(2, p.scale * 0.45);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  renderParticles(obj) {
    const col = obj.color;
    obj.vertices.forEach((v) => {
      const rotated = this.rotatePoint(v, this.rotation.x, this.rotation.y);
      const p = this.project(rotated);
      const alpha = Math.max(0.2, Math.min(1, (5 - rotated.z) / 5));
      const size = Math.max(1, p.scale * 0.3);
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = col;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;
  }

  animate() {
    if (this.autoRotate) {
      this.rotation.y += 0.01;
      this.rotation.x += 0.005;
    }
    this.render();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  stop() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.animationId = null;
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.onResize);
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">🎮 3D 效果（Canvas 2D 模擬）</h2>
      <p class="text-secondary">使用數學投影在 Canvas 2D 上模擬 3D，支援拖曳旋轉、滾輪縮放、雙擊恢復自動旋轉。</p>
    </div>

    <div class="demo-card">
      <div data-webgl-canvas></div>
      <div class="demo-control-row mt-4">
        <button class="btn btn--primary btn--sm" type="button" data-scene="geometry">📦 基礎幾何</button>
        <button class="btn btn--secondary btn--sm" type="button" data-scene="particles">✨ 粒子系統</button>
        <button class="btn btn--secondary btn--sm" type="button" data-scene="wireframe">🔲 線框模式</button>
      </div>
      <div class="text-secondary mt-3" style="font-size: var(--text-xs);">
        🖱️ 拖動旋轉　|　🔍 滾輪縮放　|　👆 雙擊恢復自動旋轉
      </div>
    </div>
  `;
}

export async function init(container) {
  renderUI(container);
  const mount = container.querySelector('[data-webgl-canvas]');
  if (!(mount instanceof HTMLElement)) return () => {};

  const scene = new Canvas3D(mount);

  const loadScene = (key) => {
    scene.clearScene();
    if (key === 'geometry') {
      scene.addCube({ x: -2.5, color: getCssVar('--color-primary', '#A855F7'), size: 0.8 });
      scene.addSphere({ x: 0, color: getCssVar('--color-secondary', '#06B6D4'), radius: 0.8 });
      scene.addTorus({ x: 2.5, color: getCssVar('--color-success', '#22C55E'), radius: 0.6, tube: 0.25 });
    }
    if (key === 'particles') {
      scene.addParticles(320);
    }
    if (key === 'wireframe') {
      scene.addCube({ x: -2.5, color: getCssVar('--color-primary', '#A855F7'), size: 0.8, wireframe: true });
      scene.addSphere({ x: 0, color: getCssVar('--color-secondary', '#06B6D4'), radius: 0.8 });
      scene.addTorus({ x: 2.5, color: getCssVar('--color-success', '#22C55E'), radius: 0.6, tube: 0.25 });
    }
    scene.animate();
  };

  loadScene('geometry');

  const onClick = (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;
    const btn = t.closest('[data-scene]');
    if (!(btn instanceof HTMLElement)) return;
    const key = btn.getAttribute('data-scene') || 'geometry';
    container.querySelectorAll('[data-scene]').forEach((b) => {
      b.classList.toggle('btn--primary', b.getAttribute('data-scene') === key);
      b.classList.toggle('btn--secondary', b.getAttribute('data-scene') !== key);
    });
    loadScene(key);
  };

  container.addEventListener('click', onClick);

  return () => {
    container.removeEventListener('click', onClick);
    scene.dispose();
  };
}


