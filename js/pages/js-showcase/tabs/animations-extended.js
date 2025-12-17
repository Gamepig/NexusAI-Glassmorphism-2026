/**
 * Extended animations tab
 * - Motion One (optional; CSS fallback)
 * - Lottie (optional; built-in mini animations)
 * - Mo.js (optional; CSS fallback)
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

function hasLottie() {
  return typeof window !== 'undefined' && typeof window.lottie !== 'undefined';
}

function hasMojs() {
  return typeof window !== 'undefined' && typeof window.mojs !== 'undefined';
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">🎬 擴展動畫</h2>
      <p class="text-secondary">Motion One / Lottie / Mo.js 示範。若外部庫未載入，會自動使用後備效果。</p>
    </div>

    <div class="showcase-section">
      <h3 class="h5">⚡ Motion One（後備：CSS）</h3>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>基本動畫</h4>
          <div class="demo-preview">
            <div data-motion="basic" style="width: 100%; height: 96px; display:flex; align-items:center; justify-content:center; border-radius: var(--radius-md); background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.25);">
              基本動畫
            </div>
          </div>
          <button class="btn btn--secondary btn--sm" type="button" data-motion-action="basic">播放</button>
        </div>

        <div class="demo-card">
          <h4>彈簧效果</h4>
          <div class="demo-preview">
            <div data-motion="spring" style="width: 100%; height: 96px; display:flex; align-items:center; justify-content:center; border-radius: var(--radius-md); background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.25);">
              彈簧效果
            </div>
          </div>
          <button class="btn btn--secondary btn--sm" type="button" data-motion-action="spring">播放</button>
        </div>

        <div class="demo-card">
          <h4>序列動畫</h4>
          <div class="demo-preview" style="display:flex; gap: var(--space-2); align-items:center; justify-content:center;">
            <div data-motion-seq="1" style="width: 42px; height: 42px; border-radius: var(--radius-md); background: rgba(168,85,247,0.18); border: 1px solid rgba(168,85,247,0.25); display:flex; align-items:center; justify-content:center; opacity:0; transform: translateY(10px);">1</div>
            <div data-motion-seq="2" style="width: 42px; height: 42px; border-radius: var(--radius-md); background: rgba(6,182,212,0.18); border: 1px solid rgba(6,182,212,0.25); display:flex; align-items:center; justify-content:center; opacity:0; transform: translateY(10px);">2</div>
            <div data-motion-seq="3" style="width: 42px; height: 42px; border-radius: var(--radius-md); background: rgba(34,197,94,0.18); border: 1px solid rgba(34,197,94,0.25); display:flex; align-items:center; justify-content:center; opacity:0; transform: translateY(10px);">3</div>
          </div>
          <button class="btn btn--secondary btn--sm" type="button" data-motion-action="sequence">播放</button>
        </div>
      </div>
      <p class="text-secondary mt-3" style="font-size: var(--text-xs);">提示：此專案預設不綁定 Motion One；若未載入會使用 CSS 後備。</p>
    </div>

    <div class="showcase-section">
      <h3 class="h5">🎞️ Lottie</h3>
      <div class="demo-grid">
        <div class="demo-card">
          <h4>載入中</h4>
          <div class="demo-preview">
            <div class="lottie-container" data-lottie="loading" style="width: 120px; height: 120px; margin: 0 auto;"></div>
          </div>
          <div class="demo-control-row">
            <button class="btn btn--secondary btn--sm" type="button" data-lottie-action="play" data-lottie-target="loading">▶️</button>
            <button class="btn btn--secondary btn--sm" type="button" data-lottie-action="pause" data-lottie-target="loading">⏸️</button>
            <button class="btn btn--secondary btn--sm" type="button" data-lottie-action="stop" data-lottie-target="loading">⏹️</button>
          </div>
        </div>

        <div class="demo-card">
          <h4>成功</h4>
          <div class="demo-preview">
            <div class="lottie-container" data-lottie="success" style="width: 120px; height: 120px; margin: 0 auto;"></div>
          </div>
          <button class="btn btn--secondary btn--sm" type="button" data-lottie-action="replay" data-lottie-target="success">🔄 重播</button>
        </div>

        <div class="demo-card">
          <h4>錯誤</h4>
          <div class="demo-preview">
            <div class="lottie-container" data-lottie="error" style="width: 120px; height: 120px; margin: 0 auto;"></div>
          </div>
          <button class="btn btn--secondary btn--sm" type="button" data-lottie-action="replay" data-lottie-target="error">🔄 重播</button>
        </div>
      </div>

      <div class="demo-card mt-4">
        <div class="demo-control-row" style="align-items:center;">
          <label class="text-secondary">播放速度</label>
          <input type="range" min="0.25" max="3" step="0.25" value="1" data-lottie-speed style="width: 220px;">
          <span class="text-secondary" data-lottie-speed-label>1x</span>
        </div>
        <p class="text-secondary mt-3" style="font-size: var(--text-xs);">提醒：若 Lottie 未載入，將顯示 placeholder。</p>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">💥 Mo.js（後備：CSS）</h3>
      <div class="demo-card">
        <div data-mojs-area style="
          position: relative;
          height: 180px;
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-default);
          background: var(--bg-secondary);
          overflow:hidden;
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          <span class="text-secondary">👆 點擊此區域觸發爆發效果</span>
        </div>

        <div class="demo-control-row mt-4">
          <button class="btn btn--secondary btn--sm" type="button" data-mojs-action="burst">💥 中心爆發</button>
          <button class="btn btn--secondary btn--sm" type="button" data-mojs-action="ripple">🌊 漣漪效果</button>
          <button class="btn btn--secondary btn--sm" type="button" data-mojs-action="heart">❤️ 愛心爆發</button>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">📊 庫對比（概念）</h3>
      <div class="demo-card">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>動畫庫</th>
                <th>大小（概略）</th>
                <th>特點</th>
                <th>適用場景</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Motion One</strong></td><td>~3KB</td><td>輕量、高性能</td><td>UI 微動畫</td></tr>
              <tr><td><strong>Lottie</strong></td><td>~50KB</td><td>支援 AE 導出</td><td>插圖動畫</td></tr>
              <tr><td><strong>Mo.js</strong></td><td>~30KB</td><td>爆發特效</td><td>互動回饋</td></tr>
              <tr><td><strong>Anime.js</strong></td><td>~17KB</td><td>通用、易上手</td><td>常見動畫</td></tr>
              <tr><td><strong>GSAP</strong></td><td>~60KB</td><td>專業級、插件多</td><td>複雜序列</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Minimal built-in Lottie JSON (compact, based on demo-site simplified shapes)
function getLoadingAnim() {
  return {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 60,
    w: 100,
    h: 100,
    layers: [
      {
        ty: 4,
        nm: 'circle',
        ks: { r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [360] }] }, p: { a: 0, k: [50, 50] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] } },
        shapes: [
          { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [60, 60] } },
          { ty: 'st', c: { a: 0, k: [0.66, 0.33, 0.92, 1] }, w: { a: 0, k: 6 }, lc: 2, d: [{ n: 'd', nm: 'dash', v: { a: 0, k: 120 } }, { n: 'g', nm: 'gap', v: { a: 0, k: 80 } }] },
        ],
      },
    ],
  };
}

function getSuccessAnim() {
  return {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 40,
    w: 100,
    h: 100,
    layers: [
      {
        ty: 4,
        nm: 'check',
        ks: { p: { a: 0, k: [50, 50] }, a: { a: 0, k: [0, 0] }, s: { a: 1, k: [{ t: 0, s: [0, 0] }, { t: 20, s: [100, 100] }] } },
        shapes: [
          { ty: 'sh', ks: { a: 0, k: { v: [[-20, 0], [-5, 15], [20, -15]], c: false } } },
          { ty: 'st', c: { a: 0, k: [0.13, 0.77, 0.37, 1] }, w: { a: 0, k: 8 }, lc: 2, lj: 2 },
          { ty: 'tm', s: { a: 0, k: 0 }, e: { a: 1, k: [{ t: 15, s: [0] }, { t: 35, s: [100] }] } },
        ],
      },
    ],
  };
}

function getErrorAnim() {
  return {
    v: '5.7.4',
    fr: 60,
    ip: 0,
    op: 40,
    w: 100,
    h: 100,
    layers: [
      {
        ty: 4,
        nm: 'x',
        ks: { p: { a: 0, k: [50, 50] }, s: { a: 1, k: [{ t: 0, s: [0, 0] }, { t: 20, s: [100, 100] }] } },
        shapes: [
          { ty: 'gr', it: [
            { ty: 'sh', ks: { a: 0, k: { v: [[-15, -15], [15, 15]], c: false } } },
            { ty: 'sh', ks: { a: 0, k: { v: [[15, -15], [-15, 15]], c: false } } },
            { ty: 'st', c: { a: 0, k: [0.94, 0.27, 0.27, 1] }, w: { a: 0, k: 8 }, lc: 2 },
          ] },
        ],
      },
    ],
  };
}

export async function init(container) {
  renderUI(container);

  // Motion demo (CSS fallback)
  const motionBasic = container.querySelector('[data-motion="basic"]');
  const motionSpring = container.querySelector('[data-motion="spring"]');
  const seqEls = [1, 2, 3].map((n) => container.querySelector(`[data-motion-seq="${n}"]`));

  const runMotionBasic = () => {
    if (!(motionBasic instanceof HTMLElement)) return;
    motionBasic.style.transition = 'transform 520ms ease-out';
    motionBasic.style.transform = 'translateX(48px)';
    setTimeout(() => (motionBasic.style.transform = 'translateX(0)'), 540);
  };

  const runMotionSpring = () => {
    if (!(motionSpring instanceof HTMLElement)) return;
    motionSpring.style.transition = 'transform 600ms cubic-bezier(0.68,-0.55,0.265,1.55)';
    motionSpring.style.transform = 'scale(1.25)';
    setTimeout(() => (motionSpring.style.transform = 'scale(1)'), 320);
  };

  const runSequence = async () => {
    const ids = seqEls.filter((x) => x instanceof HTMLElement);
    let i = 0;
    while (i < ids.length) {
      const el = ids[i];
      el.style.transition = 'all 220ms ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      await new Promise((r) => setTimeout(r, 180));
      i++;
    }
    setTimeout(() => {
      ids.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
      });
    }, 1200);
  };

  // Lottie
  const lottieAnims = {};
  const initLottie = () => {
    const els = container.querySelectorAll('[data-lottie]');
    if (!hasLottie()) {
      els.forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        el.innerHTML = `<div class="lottie-placeholder">Lottie</div>`;
      });
      toast('warning', 'Lottie 未載入，已顯示 placeholder。');
      return;
    }

    const make = (key, data, loop) => {
      const el = container.querySelector(`[data-lottie="${key}"]`);
      if (!(el instanceof HTMLElement)) return;
      if (lottieAnims[key]) lottieAnims[key].destroy();
      lottieAnims[key] = window.lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: loop !== false,
        autoplay: true,
        animationData: data,
      });
    };

    make('loading', getLoadingAnim(), true);
    make('success', getSuccessAnim(), false);
    make('error', getErrorAnim(), false);
  };

  initLottie();

  // Mo.js area
  const area = container.querySelector('[data-mojs-area]');
  let moBurst = null;

  const cssBurst = (x, y) => {
    if (!(area instanceof HTMLElement)) return;
    const colors = ['#A855F7', '#06B6D4', '#22C55E', '#F59E0B'];
    let i = 0;
    while (i < 8) {
      const p = document.createElement('div');
      p.className = 'css-particle';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.backgroundColor = colors[i % colors.length];
      p.style.setProperty('--angle', `${i * 45}deg`);
      // simple directional translate without trig (use rotate trick)
      p.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg) translateX(0)`;
      area.appendChild(p);
      setTimeout(() => p.remove(), 820);
      i++;
    }
  };

  const cssRipple = (x, y) => {
    if (!(area instanceof HTMLElement)) return;
    const r = document.createElement('div');
    r.className = 'css-ripple';
    r.style.left = `${x}px`;
    r.style.top = `${y}px`;
    area.appendChild(r);
    setTimeout(() => r.remove(), 820);
  };

  const cssHeart = (x, y) => {
    if (!(area instanceof HTMLElement)) return;
    const h = document.createElement('div');
    h.className = 'heart-burst';
    h.textContent = '❤️';
    h.style.left = `${x}px`;
    h.style.top = `${y}px`;
    area.appendChild(h);
    setTimeout(() => h.remove(), 950);
  };

  const initMojs = () => {
    if (!hasMojs() || !(area instanceof HTMLElement)) return;
    moBurst = new window.mojs.Burst({
      parent: area,
      left: 0,
      top: 0,
      radius: { 0: 90 },
      count: 10,
      children: {
        shape: 'circle',
        fill: ['#A855F7', '#06B6D4', '#22C55E', '#F59E0B', '#EF4444'],
        radius: { 10: 0 },
        duration: 1000,
        easing: 'cubic.out',
      },
    });
  };

  initMojs();

  const onClick = (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;

    const motionBtn = t.closest('[data-motion-action]');
    if (motionBtn instanceof HTMLElement) {
      const a = motionBtn.getAttribute('data-motion-action');
      if (a === 'basic') runMotionBasic();
      if (a === 'spring') runMotionSpring();
      if (a === 'sequence') runSequence();
      return;
    }

    const lBtn = t.closest('[data-lottie-action]');
    if (lBtn instanceof HTMLElement) {
      const action = lBtn.getAttribute('data-lottie-action');
      const target = lBtn.getAttribute('data-lottie-target');
      const anim = lottieAnims[target];
      if (!anim) return;
      if (action === 'play') anim.play();
      if (action === 'pause') anim.pause();
      if (action === 'stop') anim.stop();
      if (action === 'replay') {
        anim.stop();
        anim.play();
      }
      return;
    }

    const moBtn = t.closest('[data-mojs-action]');
    if (moBtn instanceof HTMLElement && area instanceof HTMLElement) {
      const rect = area.getBoundingClientRect();
      const x = rect.width / 2;
      const y = rect.height / 2;
      const a = moBtn.getAttribute('data-mojs-action');
      if (a === 'burst') {
        if (moBurst) moBurst.tune({ x, y }).replay();
        else cssBurst(x, y);
      }
      if (a === 'ripple') cssRipple(x, y);
      if (a === 'heart') cssHeart(x, y);
      return;
    }

    if (t.closest('[data-mojs-area]') && area instanceof HTMLElement) {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (moBurst) moBurst.tune({ x, y }).replay();
      else cssBurst(x, y);
    }
  };

  const onInput = (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.matches('[data-lottie-speed]')) {
      const v = t instanceof HTMLInputElement ? parseFloat(t.value) : 1;
      const label = container.querySelector('[data-lottie-speed-label]');
      if (label instanceof HTMLElement) label.textContent = `${v}x`;
      Object.values(lottieAnims).forEach((anim) => anim?.setSpeed?.(v));
    }
  };

  container.addEventListener('click', onClick);
  container.addEventListener('input', onInput);

  return () => {
    container.removeEventListener('click', onClick);
    container.removeEventListener('input', onInput);
    Object.values(lottieAnims).forEach((a) => a?.destroy?.());
    if (moBurst?.el?.remove) moBurst.el.remove();
  };
}


