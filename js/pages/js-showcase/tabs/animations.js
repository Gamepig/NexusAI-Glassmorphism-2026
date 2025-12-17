/**
 * Animations tab
 * - Anime.js demos (with CSS fallback)
 * - GSAP demos (with CSS fallback)
 * - Canvas demos (no external dependency)
 */

function hasAnime() {
  return typeof window !== 'undefined' && typeof window.anime === 'function';
}

function hasGSAP() {
  return typeof window !== 'undefined' && typeof window.gsap !== 'undefined';
}

function toastInfo(message) {
  if (window.Toast?.info) window.Toast.info(message);
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">🎬 動畫效果</h2>
      <p class="text-secondary">展示 Anime.js、GSAP 與 Canvas 動畫（若外部庫未載入會自動使用後備效果）。</p>
    </div>

    <div class="showcase-section">
      <h3 class="h5">Anime.js</h3>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>圓形進度條</h4>
          <div class="demo-preview">
            <svg class="js-a-circle" width="120" height="120" viewBox="0 0 120 120" aria-label="圓形進度條">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(107,114,128,0.25)" stroke-width="8"/>
              <circle class="js-a-progress" cx="60" cy="60" r="50" fill="none"
                      stroke="var(--color-primary)" stroke-width="8"
                      stroke-dasharray="314" stroke-dashoffset="314"/>
            </svg>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-anime-demo="progress">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>數字計數</h4>
          <div class="demo-preview">
            <div class="h3 js-a-counter" style="font-variant-numeric: tabular-nums;">0</div>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-anime-demo="counter">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>列表入場</h4>
          <div class="demo-preview">
            <ul class="js-a-list" style="margin:0; padding-left: 1.25rem; color: var(--text-secondary); line-height: 1.8;">
              <li>項目 1</li>
              <li>項目 2</li>
              <li>項目 3</li>
            </ul>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-anime-demo="list">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>Hover 效果</h4>
          <div class="demo-preview">
            <div class="js-a-hoverbox" style="
              width: 100%;
              height: 96px;
              display:flex;
              align-items:center;
              justify-content:center;
              border-radius: var(--radius-md);
              background: rgba(168,85,247,0.12);
              border: 1px solid rgba(168,85,247,0.25);
              color: var(--text-primary);
              transition: transform 160ms ease, box-shadow 160ms ease;
            ">懸停試試</div>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--secondary btn--sm" type="button" data-anime-demo="hover-reset">重置</button>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">GSAP</h3>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>3D 翻轉</h4>
          <div class="demo-preview">
            <div class="js-g-flip" style="
              width: 100%;
              height: 96px;
              display:flex;
              align-items:center;
              justify-content:center;
              border-radius: var(--radius-md);
              background: rgba(6,182,212,0.12);
              border: 1px solid rgba(6,182,212,0.25);
              transform-style: preserve-3d;
              will-change: transform;
            ">翻轉我</div>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-gsap-demo="flip">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>時間軸序列</h4>
          <div class="demo-preview">
            <div class="js-g-timeline" style="display:flex; gap: var(--space-2);">
              <div class="js-g-step" style="opacity:0; transform: translateX(-10px); padding: 10px 12px; border-radius: var(--radius-md); background: var(--glass-bg); border: 1px solid var(--glass-border);">步驟 1</div>
              <div class="js-g-step" style="opacity:0; transform: translateX(-10px); padding: 10px 12px; border-radius: var(--radius-md); background: var(--glass-bg); border: 1px solid var(--glass-border);">步驟 2</div>
              <div class="js-g-step" style="opacity:0; transform: translateX(-10px); padding: 10px 12px; border-radius: var(--radius-md); background: var(--glass-bg); border: 1px solid var(--glass-border);">步驟 3</div>
            </div>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-gsap-demo="timeline">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>文字動畫</h4>
          <div class="demo-preview">
            <div class="h4 js-g-text" style="opacity:0; transform: translateY(-10px);">GSAP Power</div>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-gsap-demo="text">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>組合效果</h4>
          <div class="demo-preview">
            <div class="js-g-combo" style="
              width: 100%;
              height: 96px;
              display:flex;
              align-items:center;
              justify-content:center;
              border-radius: var(--radius-md);
              background: rgba(34,197,94,0.12);
              border: 1px solid rgba(34,197,94,0.25);
              will-change: transform;
            ">複合動畫</div>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-gsap-demo="combo">運行</button>
          </div>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">Canvas</h3>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>粒子系統</h4>
          <div class="demo-preview">
            <canvas class="js-canvas" data-canvas="particles" width="240" height="150" style="width:100%; height:150px; border-radius: var(--radius-md);"></canvas>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-canvas-demo="particles">點擊生成</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>波形動畫</h4>
          <div class="demo-preview">
            <canvas class="js-canvas" data-canvas="wave" width="240" height="150" style="width:100%; height:150px; border-radius: var(--radius-md);"></canvas>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-canvas-demo="wave">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>網格背景</h4>
          <div class="demo-preview">
            <div class="text-secondary" data-canvas-placeholder="grid" style="height:150px; display:flex; align-items:center; justify-content:center;">
              點擊「運行」後顯示
            </div>
            <canvas class="js-canvas hidden" data-canvas="grid" width="240" height="150" style="width:100%; height:150px; border-radius: var(--radius-md);"></canvas>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-canvas-demo="grid">運行</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>簡單繪圖</h4>
          <div class="demo-preview">
            <div class="text-secondary" data-canvas-placeholder="draw" style="height:150px; display:flex; align-items:center; justify-content:center;">
              點擊「運行」後顯示
            </div>
            <canvas class="js-canvas hidden" data-canvas="draw" width="240" height="150" style="width:100%; height:150px; border-radius: var(--radius-md);"></canvas>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--primary btn--sm" type="button" data-canvas-demo="draw">運行</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function animeProgress(container) {
  const circle = container.querySelector('.js-a-progress');
  if (!(circle instanceof SVGElement)) return;

  circle.style.strokeDashoffset = '314';

  if (hasAnime()) {
    window.anime({
      targets: circle,
      strokeDashoffset: [314, 0],
      duration: 2000,
      easing: 'easeInOutQuad',
    });
    return;
  }

  circle.style.transition = 'stroke-dashoffset 900ms ease';
  requestAnimationFrame(() => {
    circle.style.strokeDashoffset = '0';
    setTimeout(() => {
      circle.style.strokeDashoffset = '314';
    }, 1200);
  });
  toastInfo('Anime.js 未載入，已使用 CSS 後備效果。');
}

function animeCounter(container) {
  const el = container.querySelector('.js-a-counter');
  if (!(el instanceof HTMLElement)) return;

  if (hasAnime()) {
    const state = { value: 0 };
    window.anime({
      targets: state,
      value: 999999,
      duration: 2000,
      easing: 'easeInOutQuad',
      update: () => {
        el.textContent = Math.round(state.value).toLocaleString();
      },
    });
    return;
  }

  const start = performance.now();
  const duration = 1200;
  const target = 999999;
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  toastInfo('Anime.js 未載入，已使用 requestAnimationFrame 後備計數。');
}

function animeList(container) {
  const items = [...container.querySelectorAll('.js-a-list li')];
  if (items.length === 0) return;

  if (hasAnime()) {
    window.anime.set(items, { opacity: 0, translateY: -20 });
    window.anime({
      targets: items,
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 700,
      delay: window.anime.stagger(120),
      easing: 'easeOutQuad',
    });
    return;
  }

  items.forEach((li) => {
    li.style.opacity = '0';
    li.style.transform = 'translateY(-8px)';
  });
  const start = performance.now();
  const dur = 700;
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    items.forEach((li, idx) => {
      const local = Math.max(0, Math.min(1, (eased * dur - idx * 120) / dur));
      li.style.opacity = String(local);
      li.style.transform = `translateY(${(-8 + 8 * local).toFixed(2)}px)`;
    });
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  toastInfo('Anime.js 未載入，已使用 CSS/RAF 後備效果。');
}

function wireHoverBox(container) {
  const box = container.querySelector('.js-a-hoverbox');
  if (!(box instanceof HTMLElement)) return;

  box.addEventListener('mouseenter', () => {
    box.style.transform = 'scale(1.06)';
    box.style.boxShadow = '0 12px 30px rgba(168,85,247,0.25)';
  });
  box.addEventListener('mouseleave', () => {
    box.style.transform = 'scale(1)';
    box.style.boxShadow = 'none';
  });
}

function gsapFlip(container) {
  const box = container.querySelector('.js-g-flip');
  if (!(box instanceof HTMLElement)) return;

  if (hasGSAP()) {
    window.gsap.to(box, {
      rotationY: 360,
      duration: 1.5,
      ease: 'back.out',
      transformPerspective: 1000,
    });
    return;
  }

  box.style.transition = 'transform 800ms ease';
  box.style.transform = 'rotateY(360deg)';
  setTimeout(() => {
    box.style.transform = 'rotateY(0deg)';
  }, 900);
  toastInfo('GSAP 未載入，已使用 CSS 後備效果。');
}

function gsapTimeline(container) {
  const steps = [...container.querySelectorAll('.js-g-step')];
  if (steps.length === 0) return;

  if (hasGSAP()) {
    const tl = window.gsap.timeline();
    steps.forEach((el, idx) => {
      tl.to(
        el,
        { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' },
        idx * 0.18
      );
    });
    return;
  }

  steps.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-10px)';
    el.style.transition = 'opacity 240ms ease, transform 240ms ease';
  });
  steps.forEach((el, idx) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    }, idx * 180);
  });
  toastInfo('GSAP 未載入，已使用 CSS 後備效果。');
}

function gsapText(container) {
  const el = container.querySelector('.js-g-text');
  if (!(el instanceof HTMLElement)) return;

  if (hasGSAP()) {
    window.gsap.fromTo(el, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 1, ease: 'elastic.out' });
    return;
  }

  el.style.transition = 'opacity 420ms ease, transform 420ms ease';
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
  toastInfo('GSAP 未載入，已使用 CSS 後備效果。');
}

function gsapCombo(container) {
  const el = container.querySelector('.js-g-combo');
  if (!(el instanceof HTMLElement)) return;

  if (hasGSAP()) {
    window.gsap.to(el, {
      duration: 1.7,
      x: 50,
      rotation: 360,
      scale: 1.15,
      ease: 'sine.inOut',
      onComplete: () => {
        window.gsap.set(el, { x: 0, rotation: 0, scale: 1 });
      },
    });
    return;
  }

  el.style.transition = 'transform 900ms ease';
  el.style.transform = 'translateX(40px) rotate(30deg) scale(1.08)';
  setTimeout(() => {
    el.style.transform = 'translateX(0) rotate(0deg) scale(1)';
  }, 1100);
  toastInfo('GSAP 未載入，已使用 CSS 後備效果。');
}

function getCanvas(container, key) {
  const c = container.querySelector(`canvas[data-canvas="${key}"]`);
  if (!(c instanceof HTMLCanvasElement)) return null;
  return c;
}

function clearCanvas(ctx, canvas) {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim() || '#F9FAFB';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawParticles(container) {
  const canvas = getCanvas(container, 'particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  clearCanvas(ctx, canvas);

  let i = 0;
  const count = 50;
  while (i < count) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 3 + 1;
    ctx.fillStyle = `rgba(168, 85, 247, ${(Math.random() * 0.55 + 0.25).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    i++;
  }
}

function drawGrid(container) {
  const canvas = getCanvas(container, 'grid');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  clearCanvas(ctx, canvas);
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
  ctx.lineWidth = 1;

  let x = 0;
  while (x < canvas.width) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    x += 20;
  }

  let y = 0;
  while (y < canvas.height) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    y += 20;
  }
}

function drawSimple(container) {
  const canvas = getCanvas(container, 'draw');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  clearCanvas(ctx, canvas);

  ctx.fillStyle = 'rgba(168,85,247,0.85)';
  ctx.fillRect(50, 30, 120, 60);

  ctx.fillStyle = 'rgba(6,182,212,0.75)';
  ctx.beginPath();
  ctx.arc(120, 105, 24, 0, Math.PI * 2);
  ctx.fill();
}

function animateWave(container, rafState) {
  const canvas = getCanvas(container, 'wave');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  clearCanvas(ctx, canvas);

  if (rafState.waveId) cancelAnimationFrame(rafState.waveId);

  let t = 0;
  const render = () => {
    clearCanvas(ctx, canvas);
    ctx.strokeStyle = 'rgba(6,182,212,0.95)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let x = 0;
    while (x < canvas.width) {
      const y = canvas.height / 2 + Math.sin((x + t) * 0.05) * 28;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += 1;
    }
    ctx.stroke();
    t += 2;
    rafState.waveId = requestAnimationFrame(render);
  };

  rafState.waveId = requestAnimationFrame(render);
}

export async function init(container) {
  renderUI(container);
  wireHoverBox(container);

  const rafState = { waveId: null };

  const showCanvas = (key) => {
    const canvas = container.querySelector(`canvas[data-canvas="${key}"]`);
    const placeholder = container.querySelector(`[data-canvas-placeholder="${key}"]`);
    if (canvas instanceof HTMLCanvasElement) canvas.classList.remove('hidden');
    if (placeholder instanceof HTMLElement) placeholder.classList.add('hidden');
  };

  const onClick = (e) => {
    const target = e.target instanceof HTMLElement ? e.target.closest('[data-anime-demo], [data-gsap-demo], [data-canvas-demo]') : null;
    if (!(target instanceof HTMLElement)) return;

    const animeDemo = target.getAttribute('data-anime-demo');
    const gsapDemo = target.getAttribute('data-gsap-demo');
    const canvasDemo = target.getAttribute('data-canvas-demo');

    if (animeDemo) {
      if (animeDemo === 'progress') animeProgress(container);
      if (animeDemo === 'counter') animeCounter(container);
      if (animeDemo === 'list') animeList(container);
      if (animeDemo === 'hover-reset') {
        const box = container.querySelector('.js-a-hoverbox');
        if (box instanceof HTMLElement) {
          box.style.transform = 'scale(1)';
          box.style.boxShadow = 'none';
        }
      }
      return;
    }

    if (gsapDemo) {
      if (gsapDemo === 'flip') gsapFlip(container);
      if (gsapDemo === 'timeline') gsapTimeline(container);
      if (gsapDemo === 'text') gsapText(container);
      if (gsapDemo === 'combo') gsapCombo(container);
      return;
    }

    if (canvasDemo) {
      if (canvasDemo === 'particles') drawParticles(container);
      if (canvasDemo === 'grid') {
        showCanvas('grid');
        drawGrid(container);
      }
      if (canvasDemo === 'draw') {
        showCanvas('draw');
        drawSimple(container);
      }
      if (canvasDemo === 'wave') animateWave(container, rafState);
    }
  };

  container.addEventListener('click', onClick);

  // Prime initial drawings for non-animated canvases.
  drawParticles(container);

  return () => {
    container.removeEventListener('click', onClick);
    if (rafState.waveId) cancelAnimationFrame(rafState.waveId);
  };
}


