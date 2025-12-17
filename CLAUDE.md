# NexusAI Glassmorphism 2026

## Project Overview

**類型**: 純 HTML/CSS/JavaScript 靜態網站
**目標**: 將舊版 Demo-site 重新設計為 Glassmorphism 風格，淺色主題為主

### 技術棧
- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, backdrop-filter)
- Vanilla JavaScript (ES2024+)
- 外部庫: Chart.js, Anime.js, GSAP, Three.js, Lucide Icons

---

## Core Principles

### 1. 共用模組原則（最重要）

> **所有可共用的功能，只製作一個共用模組，避免修改時要修改所有頁面**

#### 必須共用的模組
| 模組 | 檔案 | 說明 |
|------|------|------|
| 導航列 | `js/components/navbar.js` | 頂部導航，所有頁面共用 |
| 側邊欄 | `js/components/sidebar.js` | 側邊欄選單，所有內頁共用 |
| 頁腳 | `js/components/footer.js` | 頁腳，Landing Page 使用 |
| 主題系統 | `js/theme.js` | 深淺色切換 |
| 語言系統 | `js/i18n.js` | 中英文切換 |
| Toast 通知 | `js/components/toast.js` | 全域通知元件 |
| Modal 對話框 | `js/components/modal.js` | 全域對話框 |

#### 共用模組實作方式
```javascript
// 在 main.js 中載入共用元件
document.addEventListener('DOMContentLoaded', () => {
  // 載入導航列
  loadComponent('#navbar-container', '/js/components/navbar.js');
  // 載入側邊欄（僅內頁）
  if (document.querySelector('#sidebar-container')) {
    loadComponent('#sidebar-container', '/js/components/sidebar.js');
  }
});
```

### 2. 設計原則
- **Glassmorphism**: 玻璃擬態效果，模糊 10-30px，透明度 10-30%
- **淺色優先**: 預設淺色主題，支援深色切換
- **響應式設計**: Mobile First，支援 640/768/1024/1280px 斷點
- **無障礙**: WCAG 2.1 AA，對比度 ≥ 4.5:1

---

## Directory Structure

```
nexus-Glassmorphism/
├── index.html                 # Landing Page
├── css/
│   ├── design-tokens.css      # 設計令牌
│   ├── glassmorphism.css      # 玻璃效果
│   ├── typography.css         # 字體系統
│   ├── layout.css             # 佈局系統
│   ├── components.css         # 組件樣式
│   ├── animations.css         # 動效
│   └── responsive.css         # 響應式
├── js/
│   ├── main.js                # 主程式、元件載入
│   ├── theme.js               # 主題系統
│   ├── i18n.js                # 語言系統
│   ├── utils.js               # 工具函數
│   └── components/            # 共用元件
│       ├── navbar.js
│       ├── sidebar.js
│       ├── footer.js
│       ├── toast.js
│       └── modal.js
├── pages/                     # 內頁（12 頁）
├── assets/images/
├── docs/                      # 設計文檔
└── Tasks/                     # 任務追蹤
```

---

## Frequently Used Commands

```bash
# 開發伺服器（任選一）
python3 -m http.server 8080
npx serve .
npx live-server

# Git 操作
git add . && git commit -m "feat: ..."
git status
```

---

## Code Style Guidelines

### HTML
- 語義化標籤（header, nav, main, section, footer）
- ARIA 屬性（aria-label, role）
- data-lang 屬性用於多語言

### CSS
- 使用 CSS Variables（設計令牌）
- BEM 命名（block__element--modifier）
- Mobile First 響應式

### JavaScript
- ES2024+ 語法
- 模組化（export/import 或 IIFE）
- 事件委派優先

---

## Key Patterns

### 玻璃效果
```css
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
}
```

### 共用元件載入
```javascript
async function loadComponent(selector, componentPath) {
  const container = document.querySelector(selector);
  if (!container) return;
  const module = await import(componentPath);
  module.render(container);
}
```

---

## Design Documents

- [開發計劃](./docs/開發計劃.md) - 21 步驟開發流程
- [功能清單](./docs/功能清單.md) - 完整功能列表
- [設計指南](./docs/設計指南.md) - 設計系統規範

---

## Task Tracking

- [初始化步驟](./Tasks/初始化步驟.md) - 專案初始化檢查清單
- [開發任務](./Tasks/開發任務.md) - 細分到每頁的開發任務

---

*建立日期: 2025-12-17*
