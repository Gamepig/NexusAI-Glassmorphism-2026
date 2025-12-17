/**
 * NexusAI Glassmorphism 2026 - Lucide Icons
 * 統一的 Lucide Icons 初始化模組
 * 使用本地 vendor 檔案（適用 GitHub Pages）
 *
 * 注意：
 * - Lucide 的 ESM 版本（dist/esm）會再 import 大量 icons 模組，若未完整帶入會造成大量 404
 * - 為了避免引入整包 icons 目錄，這裡改用 UMD 單檔（dist/umd/lucide.min.js）並在需要時載入
 */

let lucideLoadPromise = null;

function ensureLucideLoaded() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    return Promise.resolve();
  }

  if (lucideLoadPromise) return lucideLoadPromise;

  lucideLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-lucide-vendor]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Lucide vendor script')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.dataset.lucideVendor = 'true';
    script.src = new URL('./vendor/lucide/lucide.min.js', import.meta.url).href;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Lucide vendor script'));
    document.head.appendChild(script);
  });

  return lucideLoadPromise;
}

/**
 * 初始化 Lucide Icons
 * @param {HTMLElement|Document} container - 要掃描的容器，預設為整個文檔
 */
export async function initIcons(container) {
  try {
    void container; // 保留參數以符合既有呼叫點
    await ensureLucideLoaded();

    if (!window.lucide || typeof window.lucide.createIcons !== 'function') {
      console.warn('Lucide is not available after loading vendor script');
      return;
    }

    // UMD 版本會自帶 icons，直接 createIcons 即可
    window.lucide.createIcons();
  } catch (error) {
    console.warn('Failed to create icons:', error);
  }
}

/**
 * 重新初始化圖標（用於動態內容）
 */
export async function refreshIcons(container) {
  await initIcons(container);
}

