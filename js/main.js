/**
 * NexusAI Glassmorphism 2026 - Main
 * 主程式：初始化、共用元件載入
 */

// 元件載入器
async function loadComponent(selector, componentModule) {
  const container = document.querySelector(selector);
  if (!container) return null;

  try {
    const module = await import(componentModule);
    if (module.render) {
      module.render(container);
    }
    return module;
  } catch (error) {
    console.error(`Failed to load component: ${componentModule}`, error);
    return null;
  }
}

// 滾動觸發動畫
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el);
  });
}

// 計數器動畫
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = Math.floor(start + (target - start) * easeProgress);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// 初始化計數器
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.counter, 10);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// 平滑滾動到錨點
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// 外部連結處理
function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// DOM Ready 初始化
document.addEventListener('DOMContentLoaded', async () => {
  // 1. 載入主題系統
  const { initTheme } = await import('./theme.js');
  initTheme();

  // 2. 載入語言系統
  const { initI18n } = await import('./i18n.js');
  initI18n();

  // 3. 載入共用元件
  // Landing Page
  if (document.querySelector('#navbar-container')) {
    await loadComponent('#navbar-container', './components/navbar.js');
  }

  if (document.querySelector('#footer-container')) {
    await loadComponent('#footer-container', './components/footer.js');
  }

  // 內頁（有側邊欄）
  if (document.querySelector('#sidebar-container')) {
    await loadComponent('#sidebar-container', './components/sidebar.js');
  }

  // 4. 初始化動畫
  initScrollAnimations();
  initCounters();

  // 5. 初始化連結處理
  initSmoothScroll();
  initExternalLinks();

  // 6. 移除載入遮罩
  document.body.classList.add('loaded');

  console.log('NexusAI Glassmorphism 2026 initialized');
});

// 導出給全域使用
window.NexusAI = {
  loadComponent,
  animateCounter,
};
