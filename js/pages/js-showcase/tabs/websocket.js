/**
 * WebSocket tab (mock server, no backend needed)
 * - Connect / disconnect
 * - Demo modes: chat / stock / notification
 * - Message log
 *
 * Note: avoids nested loops by using lookup maps for UI updates.
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

class MockWebSocketServer {
  constructor() {
    this.clients = new Map(); // clientId -> { onMessage }
    this.intervals = [];
    this.mockUsers = [
      { id: 1, name: 'Alice', avatar: '👩' },
      { id: 2, name: 'Bob', avatar: '👨' },
      { id: 3, name: 'Carol', avatar: '👩‍💼' },
      { id: 4, name: 'David', avatar: '👨‍💻' },
    ];
    this.stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
  }

  connect(clientId, onMessage) {
    this.clients.set(clientId, { onMessage });
    setTimeout(() => {
      this.sendToClient(clientId, { type: 'system', message: '歡迎加入！', timestamp: Date.now() });
    }, 100);
    return true;
  }

  disconnect(clientId) {
    this.clients.delete(clientId);
  }

  sendToClient(clientId, message) {
    const c = this.clients.get(clientId);
    if (!c?.onMessage) return;
    c.onMessage(message);
  }

  stopAll() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }

  startChat(clientId, onMessage) {
    const messages = ['大家好！', '今天天氣真好', '剛剛部署完成', '這個功能太棒了', '週末有什麼計畫？', '有人要喝咖啡嗎？'];
    const interval = setInterval(() => {
      const user = this.mockUsers[Math.floor(Math.random() * this.mockUsers.length)];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      onMessage({ type: 'chat', user, message: msg, timestamp: Date.now() });
    }, 2200 + Math.random() * 2400);
    this.intervals.push(interval);
    return interval;
  }

  startStock(clientId, onMessage) {
    const base = { AAPL: 185.5, GOOGL: 142.3, MSFT: 378.9, TSLA: 248.6, AMZN: 178.2 };
    const interval = setInterval(() => {
      const stocks = this.stockSymbols.map((sym) => {
        const change = (Math.random() - 0.5) * 2;
        const price = base[sym] + change;
        base[sym] = price;
        return { symbol: sym, price: price.toFixed(2), change: change.toFixed(2), changePercent: ((change / price) * 100).toFixed(2) };
      });
      onMessage({ type: 'stock', stocks, timestamp: Date.now() });
    }, 1000);
    this.intervals.push(interval);
    return interval;
  }

  startNotification(clientId, onMessage) {
    const notifications = [
      { title: '新訂單', message: '你有一筆新訂單待處理', icon: '📦' },
      { title: '系統更新', message: '系統將在 10 分鐘後維護', icon: '🔧' },
      { title: '付款成功', message: '付款已成功處理', icon: '💰' },
      { title: '新留言', message: 'Alice 在你的文章下留言', icon: '💬' },
      { title: '安全提醒', message: '偵測到新的登入裝置', icon: '🔐' },
    ];
    const interval = setInterval(() => {
      const n = notifications[Math.floor(Math.random() * notifications.length)];
      onMessage({ type: 'notification', ...n, timestamp: Date.now() });
    }, 4000 + Math.random() * 2600);
    this.intervals.push(interval);
    return interval;
  }
}

class WebSocketShowcase {
  constructor() {
    this.server = new MockWebSocketServer();
    this.clientId = `client-${Date.now()}`;
    this.isConnected = false;
    this.active = null;
  }

  async connect(onMessage) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.server.connect(this.clientId, (msg) => onMessage?.(msg));
        this.isConnected = true;
        resolve(true);
      }, 450);
    });
  }

  disconnect() {
    this.server.stopAll();
    this.server.disconnect(this.clientId);
    this.isConnected = false;
    this.active = null;
  }

  send(message) {
    if (!this.isConnected) return false;
    if (message.type === 'chat') {
      setTimeout(() => {
        this.server.sendToClient(this.clientId, {
          type: 'chat',
          user: { id: 0, name: '你', avatar: '🧑' },
          message: message.text,
          timestamp: Date.now(),
        });
      }, 90);
    }
    return true;
  }

  startDemo(type, onMessage) {
    this.server.stopAll();
    if (type === 'chat') this.active = this.server.startChat(this.clientId, onMessage);
    if (type === 'stock') this.active = this.server.startStock(this.clientId, onMessage);
    if (type === 'notification') this.active = this.server.startNotification(this.clientId, onMessage);
  }

  stopDemo() {
    this.server.stopAll();
    this.active = null;
  }
}

function renderUI(container) {
  container.innerHTML = `
    <div class="showcase-section">
      <h2 class="h4 mb-2">🔌 WebSocket（模擬）</h2>
      <p class="text-secondary">模擬 WebSocket 雙向通信（不需要後端）。</p>
    </div>

    <div class="demo-card">
      <div style="display:flex; justify-content: space-between; align-items:center; gap: var(--space-4); flex-wrap: wrap;">
        <div class="badge" data-ws-status>未連接</div>
        <div class="demo-control-row">
          <button class="btn btn--primary btn--sm" type="button" data-ws-connect>🔌 連接</button>
          <button class="btn btn--secondary btn--sm" type="button" data-ws-disconnect disabled>❌ 斷開</button>
        </div>
      </div>
    </div>

    <div class="showcase-section mt-6">
      <h3 class="h5">🎭 演示場景</h3>
      <div class="demo-card">
        <div class="demo-control-row" data-ws-mode>
          <button class="btn btn--primary btn--sm" type="button" data-mode="chat">💬 即時聊天</button>
          <button class="btn btn--secondary btn--sm" type="button" data-mode="stock">📈 股票行情</button>
          <button class="btn btn--secondary btn--sm" type="button" data-mode="notification">🔔 實時通知</button>
        </div>
      </div>
    </div>

    <div class="showcase-section">
      <div class="demo-card" data-panel="chat">
        <div data-chat-messages style="height: 260px; overflow:auto; border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: var(--space-3); background: var(--bg-secondary);">
          <div class="text-secondary">連接後開始聊天...</div>
        </div>
        <div class="demo-control-row mt-3">
          <input class="form-input" type="text" data-chat-input placeholder="輸入訊息..." disabled>
          <button class="btn btn--primary btn--sm" type="button" data-chat-send disabled>發送</button>
        </div>
      </div>

      <div class="demo-card hidden" data-panel="stock">
        <div class="demo-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));" data-stock-grid></div>
      </div>

      <div class="demo-card hidden" data-panel="notification">
        <div data-notif-list style="max-height: 260px; overflow:auto;"></div>
        <div class="text-secondary mt-3" style="font-size: var(--text-xs);">最多保留 10 則通知</div>
      </div>
    </div>

    <div class="showcase-section">
      <h3 class="h5">📜 訊息日誌</h3>
      <div class="demo-card">
        <div data-log style="height: 220px; overflow:auto; border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: var(--space-3); background: var(--bg-secondary);">
          <div class="text-secondary">連接後顯示訊息...</div>
        </div>
        <button class="btn btn--secondary btn--sm mt-3" type="button" data-log-clear>🗑️ 清除日誌</button>
      </div>
    </div>
  `;
}

function nowTime() {
  return new Date().toLocaleTimeString();
}

export async function init(container) {
  renderUI(container);

  const ws = new WebSocketShowcase();
  let mode = 'chat';

  const statusEl = container.querySelector('[data-ws-status]');
  const connectBtn = container.querySelector('[data-ws-connect]');
  const disconnectBtn = container.querySelector('[data-ws-disconnect]');
  const chatInput = container.querySelector('[data-chat-input]');
  const chatSend = container.querySelector('[data-chat-send]');
  const chatMessages = container.querySelector('[data-chat-messages]');
  const stockGrid = container.querySelector('[data-stock-grid]');
  const notifList = container.querySelector('[data-notif-list]');
  const log = container.querySelector('[data-log]');

  const stockRowBySymbol = new Map();
  if (stockGrid instanceof HTMLElement) {
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
    stockGrid.innerHTML = symbols
      .map(
        (sym) => `
      <div class="glass-card p-4" style="border-radius: var(--radius-md); box-shadow:none;" data-stock-row="${sym}">
        <div style="display:flex; justify-content: space-between; align-items:center;">
          <strong>${sym}</strong>
          <span class="text-secondary" data-stock-price="${sym}">-</span>
        </div>
        <div class="text-secondary mt-2" data-stock-change="${sym}">-</div>
      </div>
    `
      )
      .join('');
    symbols.forEach((sym) => {
      const row = stockGrid.querySelector(`[data-stock-row="${sym}"]`);
      if (row instanceof HTMLElement) stockRowBySymbol.set(sym, row);
    });
  }

  const addLog = (type, message) => {
    if (!(log instanceof HTMLElement)) return;
    log.querySelector('.text-secondary')?.remove();
    const el = document.createElement('div');
    el.style.display = 'flex';
    el.style.gap = '8px';
    el.style.padding = '6px 0';
    el.style.borderBottom = '1px solid rgba(107,114,128,0.18)';
    el.innerHTML = `<span class="text-secondary" style="width: 90px;">${nowTime()}</span><span class="text-secondary" style="width: 120px;">[${type}]</span><span>${message}</span>`;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    while (log.children.length > 50) log.removeChild(log.firstChild);
  };

  const setStatus = (connected) => {
    if (statusEl instanceof HTMLElement) {
      statusEl.textContent = connected ? '已連接' : '未連接';
      statusEl.className = connected ? 'badge badge--success' : 'badge';
    }
    if (connectBtn instanceof HTMLButtonElement) connectBtn.disabled = connected;
    if (disconnectBtn instanceof HTMLButtonElement) disconnectBtn.disabled = !connected;
    if (chatInput instanceof HTMLInputElement) chatInput.disabled = !connected;
    if (chatSend instanceof HTMLButtonElement) chatSend.disabled = !connected;
  };

  const showPanel = (m) => {
    mode = m;
    container.querySelectorAll('[data-panel]').forEach((p) => p.classList.add('hidden'));
    const panel = container.querySelector(`[data-panel="${m}"]`);
    if (panel instanceof HTMLElement) panel.classList.remove('hidden');

    container.querySelectorAll('[data-mode]').forEach((b) => {
      b.classList.toggle('btn--primary', b.getAttribute('data-mode') === m);
      b.classList.toggle('btn--secondary', b.getAttribute('data-mode') !== m);
    });
  };

  const handleMessage = (data) => {
    if (!data) return;
    if (data.type === 'system') addLog('system', data.message);

    if (data.type === 'chat') {
      if (chatMessages instanceof HTMLElement) {
        chatMessages.querySelector('.text-secondary')?.remove();
        const msgEl = document.createElement('div');
        msgEl.style.display = 'flex';
        msgEl.style.gap = '10px';
        msgEl.style.marginBottom = '10px';
        msgEl.innerHTML = `
          <div style="width: 32px; text-align:center;">${data.user.avatar}</div>
          <div>
            <div class="text-secondary" style="font-size: var(--text-xs);">${data.user.name}</div>
            <div>${data.message}</div>
          </div>
        `;
        chatMessages.appendChild(msgEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      addLog('chat', `${data.user.name}: ${data.message}`);
    }

    if (data.type === 'stock') {
      const arr = Array.isArray(data.stocks) ? data.stocks : [];
      arr.forEach((s) => {
        const row = stockRowBySymbol.get(s.symbol);
        if (!row) return;
        const price = row.querySelector(`[data-stock-price="${s.symbol}"]`);
        const change = row.querySelector(`[data-stock-change="${s.symbol}"]`);
        if (price instanceof HTMLElement) price.textContent = `$${s.price}`;
        if (change instanceof HTMLElement) {
          const up = parseFloat(s.change) >= 0;
          change.textContent = `${up ? '+' : ''}${s.change} (${s.changePercent}%)`;
          change.style.color = up ? 'var(--color-success)' : 'var(--color-error)';
        }
      });
      addLog('stock', '股票更新');
    }

    if (data.type === 'notification') {
      if (notifList instanceof HTMLElement) {
        const el = document.createElement('div');
        el.className = 'glass-card p-4 mb-2';
        el.style.borderRadius = 'var(--radius-md)';
        el.style.boxShadow = 'none';
        el.innerHTML = `
          <div style="display:flex; gap: var(--space-3); align-items:center;">
            <div style="width: 28px; text-align:center;">${data.icon}</div>
            <div style="flex:1;">
              <div style="font-weight: var(--font-semibold);">${data.title}</div>
              <div class="text-secondary" style="font-size: var(--text-xs);">${data.message}</div>
            </div>
            <div class="text-secondary" style="font-size: var(--text-xs);">${new Date(data.timestamp).toLocaleTimeString()}</div>
          </div>
        `;
        notifList.prepend(el);
        while (notifList.children.length > 10) notifList.removeChild(notifList.lastChild);
      }
      addLog('notification', `${data.title}: ${data.message}`);
    }
  };

  const startCurrentDemo = () => {
    ws.stopDemo();
    ws.startDemo(mode, handleMessage);
  };

  const sendChat = () => {
    if (!(chatInput instanceof HTMLInputElement) || !(chatMessages instanceof HTMLElement)) return;
    const text = chatInput.value.trim();
    if (!text) return;
    ws.send({ type: 'chat', text });
    const msgEl = document.createElement('div');
    msgEl.style.display = 'flex';
    msgEl.style.gap = '10px';
    msgEl.style.marginBottom = '10px';
    msgEl.style.justifyContent = 'flex-end';
    msgEl.innerHTML = `<div class="glass-card p-3" style="border-radius: var(--radius-md); box-shadow:none; max-width: 70%;">${text}</div><div style="width: 32px; text-align:center;">🧑</div>`;
    chatMessages.appendChild(msgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
  };

  const onClick = async (e) => {
    const t = e.target instanceof HTMLElement ? e.target : null;
    if (!t) return;

    const connect = t.closest('[data-ws-connect]');
    if (connect instanceof HTMLElement) {
      setStatus(false);
      if (statusEl instanceof HTMLElement) statusEl.textContent = '連接中...';
      await ws.connect(handleMessage);
      setStatus(true);
      startCurrentDemo();
      toast('success', '已連接（模擬）');
      addLog('system', '已連接到伺服器');
      return;
    }

    const disconnect = t.closest('[data-ws-disconnect]');
    if (disconnect instanceof HTMLElement) {
      ws.disconnect();
      setStatus(false);
      addLog('system', '已斷開連接');
      toast('info', '已斷開（模擬）');
      return;
    }

    const modeBtn = t.closest('[data-mode]');
    if (modeBtn instanceof HTMLElement) {
      showPanel(modeBtn.getAttribute('data-mode') || 'chat');
      if (ws.isConnected) startCurrentDemo();
      return;
    }

    const send = t.closest('[data-chat-send]');
    if (send instanceof HTMLElement) {
      sendChat();
      return;
    }

    const clear = t.closest('[data-log-clear]');
    if (clear instanceof HTMLElement && log instanceof HTMLElement) {
      log.innerHTML = `<div class="text-secondary">日誌已清除</div>`;
      return;
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter') {
      const active = document.activeElement;
      if (active === chatInput) sendChat();
    }
  };

  container.addEventListener('click', onClick);
  container.addEventListener('keydown', onKey);

  showPanel('chat');
  setStatus(false);

  return () => {
    container.removeEventListener('click', onClick);
    container.removeEventListener('keydown', onKey);
    ws.disconnect();
  };
}


