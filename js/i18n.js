/**
 * NexusAI Glassmorphism 2026 - i18n
 * 語言系統（中/英文切換）
 */

const LANG_KEY = 'nexusai-lang';
const LANGUAGES = {
  ZH: 'zh-TW',
  EN: 'en',
};

let isLangClickDelegated = false;

// 翻譯資料
const translations = {
  'zh-TW': {
    // 語言
    'language.zhTw': '繁中',
    'language.en': 'EN',
    // 導航
    'nav.home': '首頁',
    'nav.features': '功能',
    'nav.pricing': '方案',
    'nav.about': '關於',
    'nav.contact': '聯繫',
    'nav.dashboard': '儀表板',
    'nav.projects': '專案',
    'nav.jsShowcase': 'JS 展示',
    'nav.dataTable': '資料表',
    'nav.kanban': '看板',
    'nav.calendar': '日曆',
    'nav.notifications': '通知',
    'nav.profile': '個人檔案',
    'nav.settings': '設定',
    'nav.settings.general': '一般',
    'nav.settings.billing': '帳務',
    'nav.settings.security': '安全',

    // 按鈕
    'btn.getStarted': '立即開始',
    'btn.learnMore': '了解更多',
    'btn.signIn': '登入',
    'btn.signUp': '註冊',
    'btn.save': '儲存',
    'btn.cancel': '取消',
    'btn.submit': '提交',
    'btn.viewAll': '查看全部',
    'btn.add': '新增',
    'btn.create': '建立',
    'btn.update': '更新',
    'btn.close': '關閉',

    // 頁面標題
    'page.dashboard': '儀表板',
    'page.projects': '專案管理',
    'page.jsShowcase': 'JavaScript 展示',
    'page.dataTable': '資料表格',
    'page.kanban': '看板',
    'page.calendar': '日曆',
    'page.notifications': '通知中心',
    'page.profile': '個人檔案',
    'page.settings': '設定',

    // JS Showcase
    'jsShowcase.title': 'JavaScript 功能展示',
    'jsShowcase.subtitle': '探索現代 Web 技術與 JavaScript 功能示範',
    'jsShowcase.tab.animations': '🎬 動畫效果',
    'jsShowcase.tab.webApis': '🌐 Web API',
    'jsShowcase.tab.interactions': '⚙️ 互動功能',
    'jsShowcase.tab.esFeatures': '⚡ ES 特性',
    'jsShowcase.tab.charts': '📊 數據可視化',
    'jsShowcase.tab.animationsExtended': '🎬 擴展動畫',
    'jsShowcase.tab.canvasDrawing': '🎨 繪圖工具',
    'jsShowcase.tab.worker': '⚡ 多線程',
    'jsShowcase.tab.pwa': '📱 PWA',
    'jsShowcase.tab.websocket': '🔌 WebSocket',
    'jsShowcase.tab.webgl': '🎮 3D 效果',
    'jsShowcase.panel.loadingTitle': '載入中...',
    'jsShowcase.panel.loadingDesc': '正在初始化此分頁內容。',

    // 通用
    'common.loading': '載入中...',
    'common.noData': '暫無資料',
    'common.search': '搜尋',
    'common.filter': '篩選',
    'common.sort': '排序',
    'common.edit': '編輯',
    'common.delete': '刪除',
    'common.confirm': '確認',
    'common.status.completed': '完成',
    'common.status.inProgress': '處理中',
    'common.status.failed': '失敗',
    'common.moreOptions': '更多選項',

    // Hero 區塊
    'hero.title': '打造未來的數位體驗',
    'hero.subtitle': '運用 Glassmorphism 設計語言，創造令人驚艷的使用者介面',

    // Dashboard
    'dashboard.title': '儀表板',
    'dashboard.kpi.totalRevenue': '總營收',
    'dashboard.kpi.activeUsers': '活躍用戶',
    'dashboard.kpi.totalOrders': '總訂單',
    'dashboard.kpi.conversionRate': '轉換率',
    'dashboard.chart.revenue': '營收趨勢',
    'dashboard.chart.sales': '銷售分析',
    'dashboard.chart.market': '市場份額',
    'dashboard.activity.title': '最新活動',
    'dashboard.activity.user': '用戶',
    'dashboard.activity.action': '動作',
    'dashboard.activity.time': '時間',
    'dashboard.activity.status': '狀態',
    'dashboard.welcome': '歡迎回來！以下是您的業務概覽。',
    'dashboard.vsLastMonth': '較上月',
    'dashboard.range.7d': '過去 7 天',
    'dashboard.range.30d': '過去 30 天',
    'dashboard.range.90d': '過去 90 天',
    'dashboard.badge.thisMonth': '本月',
    'dashboard.badge.lastMonth': '上月',
    'dashboard.market.productA': '產品 A',
    'dashboard.market.productB': '產品 B',
    'dashboard.market.productC': '產品 C',
    'dashboard.time.2mAgo': '2 分鐘前',
    'dashboard.time.15mAgo': '15 分鐘前',
    'dashboard.time.1hAgo': '1 小時前',
    'dashboard.time.3hAgo': '3 小時前',
    'dashboard.time.5hAgo': '5 小時前',
    'dashboard.activity.action.createProject': '建立新專案',
    'dashboard.activity.action.uploadFile': '上傳檔案',
    'dashboard.activity.action.updateSettings': '更新設定',
    'dashboard.activity.action.completeTask': '完成任務',
    'dashboard.activity.action.sendReport': '發送報告',

    // Dashboard（部分頁面使用較短 key）
    'kpi.totalUsers': '總用戶數',
    'kpi.totalRevenue': '總營收',
    'kpi.activeUsers': '活躍用戶',
    'kpi.conversionRate': '轉換率',

    // Landing Page 功能特色
    'features.badge': '核心功能',
    'features.title': '強大的功能特色',
    'features.subtitle': '運用最新技術打造卓越體驗',
    'features.ai.title': 'AI 驅動',
    'features.ai.description': '智能演算法自動優化您的工作流程，提升 300% 效率',
    'features.ai.desc': '智能演算法自動優化您的工作流程，提升 300% 效率',
    'features.sync.title': '即時同步',
    'features.sync.description': '跨裝置即時同步，隨時隨地存取您的資料',
    'features.analytics.title': '深度分析',
    'features.analytics.description': '視覺化儀表板，洞察關鍵業務指標',
    'features.analytics.desc': '視覺化儀表板，洞察關鍵業務指標',
    'features.cloud.title': '雲端整合',
    'features.cloud.desc': '無縫連接各種雲端服務',
    'features.security.title': '企業級安全',
    'features.security.description': '256-bit AES 加密，符合 GDPR 與 SOC 2 標準',
    'features.security.desc': '256-bit AES 加密，符合 GDPR 與 SOC 2 標準',
    'features.collaboration.title': '團隊協作',
    'features.collaboration.description': '即時協作編輯，團隊溝通零距離',
    'features.api.title': 'API 整合',
    'features.api.description': '開放 API 與您現有工具無縫整合',
    'features.api.desc': '開放 API 與您現有工具無縫整合',
    'features.support.title': '24/7 支援',
    'features.support.desc': '全天候專業技術支援',

    // Landing Page 產品展示
    'products.badge': '產品展示',
    'products.title': '一站式解決方案',
    'products.subtitle': '整合所有您需要的工具與功能',
    'products.dashboard.title': '智能儀表板',
    'products.dashboard.description': '即時監控所有關鍵指標，一目了然掌握業務動態',
    'products.analytics.title': '數據分析',
    'products.analytics.description': '深度洞察業務數據',
    'products.team.title': '團隊協作',
    'products.team.description': '無縫團隊溝通協作',
    'products.automation.title': '智能自動化',
    'products.automation.description': '自動化重複性工作，專注於創造價值',
    'products.security.title': '安全防護',
    'products.security.description': '企業級安全保障',

    // Landing Page 統計
    'stats.users': '活躍用戶',
    'stats.projects': '完成專案',
    'stats.countries': '服務國家',
    'stats.satisfaction': '客戶滿意度',

    // 定價方案
    'pricing.badge': '方案定價',
    'pricing.title': '選擇最適合您的方案',
    'pricing.subtitle': '靈活的定價方案，滿足不同需求',
    'pricing.perMonth': '/月',
    'pricing.getStarted': '開始使用',
    'pricing.popular': '最受歡迎',
    'pricing.free.name': '免費版',
    'pricing.free.price': '免費',
    'pricing.free.badge': '免費方案',
    'pricing.free.description': '適合個人用戶與小型專案',
    'pricing.free.desc': '適合個人用戶與小型專案',
    'pricing.free.feature1': '最多 3 個專案',
    'pricing.free.feature2': '5GB 儲存空間',
    'pricing.free.feature3': '基礎功能',
    'pricing.free.feature4': '社群支援',
    'pricing.pro.name': '專業版',
    'pricing.pro.price': 'NT$299/月',
    'pricing.pro.badge': '專業方案',
    'pricing.pro.description': '適合成長中的團隊與企業',
    'pricing.pro.desc': '適合成長中的團隊與企業',
    'pricing.pro.feature1': '無限專案',
    'pricing.pro.feature2': '100GB 儲存空間',
    'pricing.pro.feature3': '進階功能',
    'pricing.pro.feature4': '優先支援',
    'pricing.pro.feature5': 'API 存取',
    'pricing.enterprise.name': '企業版',
    'pricing.enterprise.price': '聯繫我們',
    'pricing.enterprise.badge': '企業方案',
    'pricing.custom': '客製化',
    'pricing.enterprise.description': '適合大型企業與組織',
    'pricing.enterprise.desc': '適合大型企業與組織',
    'pricing.enterprise.feature1': '無限一切',
    'pricing.enterprise.feature2': '專屬儲存空間',
    'pricing.enterprise.feature3': '客製化功能',
    'pricing.enterprise.feature4': '24/7 專屬支援',
    'pricing.enterprise.feature5': 'SLA 保證',
    'pricing.contactSales': '聯繫業務',
    'pricing.feature.users': '用戶數',
    'pricing.feature.storage': '儲存空間',
    'pricing.feature.support': '支援服務',
    'pricing.cta': '開始使用',

    // Landing Page 客戶評價
    'testimonials.badge': '客戶評價',
    'testimonials.title': '客戶怎麼說',
    'testimonials.subtitle': '全球企業信賴的選擇',
    'testimonials.1.content': '"NexusAI 徹底改變了我們的工作流程，團隊生產力提升了 300%。介面設計優雅，功能強大且易於使用。"',
    'testimonials.1.name': 'Sarah Johnson',
    'testimonials.1.role': '產品總監, TechCorp',
    'testimonials.2.content': '"極致的用戶體驗和強大的分析功能，幫助我們做出更明智的決策。客服團隊也非常專業。"',
    'testimonials.2.name': 'Michael Chen',
    'testimonials.2.role': '執行長, StartupX',
    'testimonials.3.content': '"從小型團隊到企業級應用，NexusAI 都能完美適應。安全性和可靠性讓我們非常放心。"',
    'testimonials.3.name': 'Emily Rodriguez',
    'testimonials.3.role': '技術長, EnterpriseHub',

    // Landing Page CTA
    'cta.title': '準備好開始了嗎？',
    'cta.subtitle': '加入全球 50,000+ 企業，立即體驗 NexusAI 的強大功能',
    'cta.startFree': '免費開始',
    'cta.scheduleDemo': '預約展示',
    'cta.benefit1': '無需信用卡',
    'cta.benefit2': '14 天免費試用',
    'cta.benefit3': '隨時取消',

    // 設定頁面
    'settings.general.title': '一般設定',
    'settings.general.language': '語言',
    'settings.general.timezone': '時區',
    'settings.general.notifications': '通知偏好',
    'settings.security.title': '安全設定',
    'settings.security.password': '變更密碼',
    'settings.security.twoFactor': '兩步驟驗證',
    'settings.security.sessions': '登入裝置',
    'settings.billing.title': '帳單設定',
    'settings.billing.plan': '目前方案',
    'settings.billing.payment': '付款方式',
    'settings.billing.history': '帳單記錄',

    // 通知
    'notifications.title': '通知中心',
    'notifications.subtitle': '管理您的所有通知訊息',
    'notifications.empty': '目前沒有新通知',
    'notifications.markAllRead': '全部標為已讀',
    'notifications.all': '全部',
    'notifications.unread': '未讀',
    'notifications.read': '已讀',
    'notifications.action.markRead': '標記為已讀',
    'notifications.action.delete': '刪除',
    'notifications.types.info': '資訊',
    'notifications.types.success': '成功',
    'notifications.types.warning': '警告',
    'notifications.types.error': '錯誤',
    'notifications.time.5mAgo': '5 分鐘前',
    'notifications.time.1hAgo': '1 小時前',
    'notifications.time.2hAgo': '2 小時前',
    'notifications.time.3hAgo': '3 小時前',
    'notifications.time.5hAgo': '5 小時前',
    'notifications.time.yesterday': '昨天',
    'notifications.time.2dAgo': '2 天前',
    'notifications.time.3dAgo': '3 天前',
    'notifications.time.1wAgo': '1 週前',
    'notifications.time.2wAgo': '2 週前',
    'notifications.time.1moAgo': '1 個月前',
    'notifications.time.2moAgo': '2 個月前',
    'notifications.item.systemUpdate.title': '系統更新通知',
    'notifications.item.systemUpdate.desc': 'NexusAI 平台將於今晚 23:00 進行系統維護，預計維護時間 2 小時。',
    'notifications.item.deploySuccess.title': '專案部署成功',
    'notifications.item.deploySuccess.desc': '您的專案 "NexusAI Dashboard" 已成功部署到生產環境。',
    'notifications.item.apiQuota.title': 'API 配額即將用盡',
    'notifications.item.apiQuota.desc': '您本月的 API 調用次數已使用 85%，請注意配額管理。',
    'notifications.item.buildFailed.title': '建置失敗',
    'notifications.item.buildFailed.desc': '專案 "API Gateway" 建置失敗，請檢查錯誤日誌。',
    'notifications.item.newMember.title': '新成員加入',
    'notifications.item.newMember.desc': 'Alice Chen 已加入您的團隊 "Frontend Team"。',
    'notifications.item.backup.title': '備份完成',
    'notifications.item.backup.desc': '資料庫備份已成功完成，備份檔案大小：2.3 GB。',
    'notifications.item.billing.title': '帳單已產生',
    'notifications.item.billing.desc': '您的 12 月帳單已產生，金額：NT$ 12,500。',
    'notifications.item.cert.title': '憑證即將過期',
    'notifications.item.cert.desc': 'SSL 憑證將於 30 天後過期，請及時更新。',
    'notifications.item.securityScan.title': '安全掃描完成',
    'notifications.item.securityScan.desc': '系統安全掃描已完成，未發現安全漏洞。',
    'notifications.item.systemUpgrade.title': '系統升級通知',
    'notifications.item.systemUpgrade.desc': 'NexusAI 已升級至 v2.5.0，新增多項功能。',
    'notifications.item.accountVerified.title': '帳號驗證成功',
    'notifications.item.accountVerified.desc': '您的帳號已成功通過兩步驟驗證。',
    'notifications.item.welcome.title': '歡迎加入 NexusAI',
    'notifications.item.welcome.desc': '感謝您註冊 NexusAI 平台，開始您的 AI 開發之旅！',

    // 專案管理
    'projects.title': '專案管理',
    'projects.new': '新增專案',
    'projects.subtitle': '管理您的所有專案，追蹤進度與協作。',
    'projects.btn.newProject': '新建專案',
    'projects.searchPlaceholder': '搜尋專案...',
    'projects.filter.allStatus': '所有狀態',
    'projects.status.active': '進行中',
    'projects.status.completed': '已完成',
    'projects.status.pending': '待處理',
    'projects.status.archived': '已封存',
    'projects.status.planned': '計劃中',
    'projects.members': '成員',
    'projects.deadline': '截止日期',
    'projects.progress': '進度',
    'projects.sort.recent': '最近更新',
    'projects.sort.name': '專案名稱',
    'projects.sort.progress': '進度',
    'projects.view.grid': '網格視圖',
    'projects.view.list': '列表視圖',
    'projects.updated.1h': '1 小時前更新',
    'projects.updated.2h': '2 小時前更新',
    'projects.updated.4h': '4 小時前更新',
    'projects.updated.5h': '5 小時前更新',
    'projects.updated.1d': '1 天前更新',
    'projects.updated.3d': '3 天前更新',
    'projects.card1.title': 'NexusAI 儀表板',
    'projects.card1.desc': '構建全新的企業級儀表板系統，整合數據分析與視覺化功能。',
    'projects.card2.title': 'API 閘道器',
    'projects.card2.desc': '微服務架構的 API 閘道器，支援認證、限流與監控功能。',
    'projects.card3.title': '行動 App 改版',
    'projects.card3.desc': '重新設計移動應用程式介面，提升使用者體驗與視覺效果。',
    'projects.card4.title': '電商平台',
    'projects.card4.desc': '全功能電商平台開發，包含購物車、支付整合及訂單管理。',
    'projects.card5.title': '數據分析套件',
    'projects.card5.desc': '企業級數據分析工具套件，提供即時數據處理與視覺化。',
    'projects.card6.title': '雲端基礎架構',
    'projects.card6.desc': '雲端基礎架構建置與優化，包含自動化部署與監控系統。',
    'projects.alert.newProjectWip': '新建專案功能開發中...',

    // 看板
    'kanban.title': '看板',
    'kanban.columns.todo': '待辦',
    'kanban.columns.inProgress': '進行中',
    'kanban.columns.review': '審核中',
    'kanban.columns.done': '已完成',
    'kanban.addTask': '新增任務',
    'kanban.moveTask': '移動任務',
    'kanban.pageTitle': '專案看板',
    'kanban.searchPlaceholder': '搜尋任務...',
    'kanban.filter.allMembers': '所有成員',
    'kanban.addCard': '+ 新增卡片',
    'kanban.columns.archived': '已封存',
    'kanban.tag.feature': '功能',
    'kanban.tag.bug': '錯誤',
    'kanban.tag.enhancement': '改善',
    'kanban.tag.docs': '文件',
    'kanban.prompt.taskTitle': '輸入任務標題：',
    'kanban.newTask.desc': '新任務',
    'kanban.card.todo1.title': '設計新的登入頁面',
    'kanban.card.todo1.desc': '根據最新的設計規範重新設計登入介面',
    'kanban.card.todo2.title': '修復資料表排序問題',
    'kanban.card.todo2.desc': '點擊表頭排序時偶爾會失敗',
    'kanban.card.todo3.title': '更新 API 文檔',
    'kanban.card.todo3.desc': '補充新增的 API 端點說明',
    'kanban.card.todo4.title': '優化搜尋效能',
    'kanban.card.todo4.desc': '大量資料時搜尋速度較慢',
    'kanban.card.todo5.title': '新增深色模式切換',
    'kanban.card.todo5.desc': '實作全站深色模式',
    'kanban.card.inProgress1.title': '實作拖放功能',
    'kanban.card.inProgress1.desc': '開發看板的拖放排序功能',
    'kanban.card.inProgress2.title': '整合 i18n 系統',
    'kanban.card.inProgress2.desc': '實作多語言支援',
    'kanban.card.inProgress3.title': '撰寫單元測試',
    'kanban.card.inProgress3.desc': '為核心功能增加測試覆蓋率',
    'kanban.card.done1.title': '建立 Glassmorphism 樣式系統',
    'kanban.card.done1.desc': '完成毛玻璃設計系統',
    'kanban.card.done2.title': '設計響應式導航列',
    'kanban.card.done2.desc': 'RWD 導航元件',
    'kanban.card.done3.title': '實作主題切換',
    'kanban.card.done3.desc': '淺色/深色模式切換',
    'kanban.card.done4.title': '建立設計規範文檔',
    'kanban.card.done4.desc': '完整的設計系統說明',
    'kanban.card.archived1.title': '研究競品分析',
    'kanban.card.archived1.desc': '分析市場上類似產品',
    'kanban.card.archived2.title': '初版原型設計',
    'kanban.card.archived2.desc': '早期設計概念',

    // 日曆
    'calendar.title': '日曆',
    'calendar.today': '今天',
    'calendar.week': '週',
    'calendar.month': '月',
    'calendar.addEvent': '新增活動',
    'calendar.noEvents': '此日無活動',
    'calendar.subtitle': '管理您的日程安排與重要事件。',
    'calendar.nav.prevMonth': '上個月',
    'calendar.nav.nextMonth': '下個月',
    'calendar.day': '日',
    'calendar.weekday.sun': '日',
    'calendar.weekday.mon': '一',
    'calendar.weekday.tue': '二',
    'calendar.weekday.wed': '三',
    'calendar.weekday.thu': '四',
    'calendar.weekday.fri': '五',
    'calendar.weekday.sat': '六',
    'calendar.upcoming.title': '即將到來的事件',
    'calendar.month.dec': '12月',
    'calendar.location.meetingRoomA': '會議室 A',
    'calendar.location.online': '線上會議',
    'calendar.location.hqMainMeeting': '總部大會議室',
    'calendar.event.teamWeekly': '團隊週會',
    'calendar.event.designReview': '產品設計評審',
    'calendar.event.milestoneReview': '專案里程碑檢討',
    'calendar.event.christmas': '聖誕節',
    'calendar.alert.addEventWip': '新增事件功能開發中...',

    // 個人檔案
    'profile.title': '個人檔案',
    'profile.name': '姓名',
    'profile.email': '電子郵件',
    'profile.role': '角色',
    'profile.bio': '自我介紹',
    'profile.avatar': '頭像',
    'profile.save': '儲存變更',
    'profile.subtitle': '管理您的個人資訊與帳戶設定。',
    'profile.avatarAlt': '用戶頭像',
    'profile.editAvatar': '編輯頭像',
    'profile.btn.edit': '編輯資料',
    'profile.section.personalInfo': '個人資訊',
    'profile.form.firstName.label': '名字',
    'profile.form.firstName.placeholder': '請輸入名字',
    'profile.form.lastName.label': '姓氏',
    'profile.form.lastName.placeholder': '請輸入姓氏',
    'profile.form.phone.label': '聯絡電話',
    'profile.form.jobTitle.label': '職稱',
    'profile.form.jobTitle.placeholder': '請輸入職稱',
    'profile.form.company.label': '公司',
    'profile.form.company.placeholder': '請輸入公司名稱',
    'profile.form.location.label': '地點',
    'profile.form.location.placeholder': '城市, 國家',
    'profile.form.bio.label': '個人簡介',
    'profile.form.bio.placeholder': '簡短介紹您自己...',
    'profile.form.social.label': '社群連結',
    'profile.user.name': '王大明',
    'profile.user.jobTitle': '資深產品設計師',
    'profile.user.location': '台北, 台灣',
    'profile.value.firstName': '大明',
    'profile.value.lastName': '王',
    'profile.value.jobTitle': '資深產品設計師',
    'profile.value.location': '台北, 台灣',
    'profile.value.bio': '熱愛設計與創新，致力於打造優質的使用者體驗。擁有 8 年以上的產品設計經驗，專注於 UI/UX 設計、設計系統建構與使用者研究。',
    'profile.stats.title': '統計資料',
    'profile.stats.completedProjects': '完成專案',
    'profile.stats.teamMembers': '團隊成員',
    'profile.activity.title': '最近活動',
    'profile.activity.createProject': '建立新專案',
    'profile.activity.uploadDesign': '上傳設計檔案',
    'profile.activity.completeReview': '完成任務審核',
    'profile.activity.replyTeam': '回覆團隊留言',
    'profile.activity.joinTeam': '加入新團隊',
    'profile.time.2hAgo': '2 小時前',
    'profile.time.5hAgo': '5 小時前',
    'profile.time.1dAgo': '1 天前',
    'profile.time.2dAgo': '2 天前',
    'profile.time.3dAgo': '3 天前',
    'profile.alert.saved': '個人資料已儲存！',
    'profile.confirm.cancel': '確定要取消變更嗎？未儲存的內容將會遺失。',
    'profile.alert.avatarWip': '頭像上傳功能開發中...',

    // 錯誤訊息
    'error.notFound': '頁面不存在',
    'error.unauthorized': '未授權存取',
    'error.serverError': '伺服器錯誤',
    'error.tryAgain': '請稍後重試',

    // 頁腳
    'footer.copyright': '© 2026 NexusAI. 保留所有權利。',
    'footer.tagline': '打造未來的數位體驗',
    'footer.links.product': '產品',
    'footer.links.company': '公司',
    'footer.links.resources': '資源',
    'footer.links.legal': '法律',
    'footer.product.features': '功能',
    'footer.product.pricing': '定價',
    'footer.product.integrations': '整合',
    'footer.product.changelog': '更新日誌',
    'footer.company.about': '關於我們',
    'footer.company.blog': '部落格',
    'footer.company.careers': '職缺',
    'footer.company.contact': '聯繫我們',
    'footer.resources.docs': '文檔',
    'footer.resources.api': 'API 參考',
    'footer.resources.community': '社群',
    'footer.resources.support': '支援',
    'footer.legal.privacy': '隱私政策',
    'footer.legal.terms': '服務條款',
    'footer.legal.cookies': 'Cookie 政策',
    'footer.settings.theme': '主題',

    // Sidebar（ARIA）
    'sidebar.aria.label': '側邊導航',
    'sidebar.mobile.openMenu': '開啟選單',
    'sidebar.mobile.closeMenu': '關閉選單',
    'sidebar.collapse.collapse': '收合側邊欄',
    'sidebar.collapse.expand': '展開側邊欄',
  },

  en: {
    // Language
    'language.zhTw': '繁中',
    'language.en': 'EN',
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.jsShowcase': 'JS Showcase',
    'nav.dataTable': 'Data Table',
    'nav.kanban': 'Kanban',
    'nav.calendar': 'Calendar',
    'nav.notifications': 'Notifications',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.settings.general': 'General',
    'nav.settings.billing': 'Billing',
    'nav.settings.security': 'Security',

    // Buttons
    'btn.getStarted': 'Get Started',
    'btn.learnMore': 'Learn More',
    'btn.signIn': 'Sign In',
    'btn.signUp': 'Sign Up',
    'btn.save': 'Save',
    'btn.cancel': 'Cancel',
    'btn.submit': 'Submit',
    'btn.viewAll': 'View All',
    'btn.add': 'Add',
    'btn.create': 'Create',
    'btn.update': 'Update',
    'btn.close': 'Close',

    // Page titles
    'page.dashboard': 'Dashboard',
    'page.projects': 'Project Management',
    'page.jsShowcase': 'JavaScript Showcase',
    'page.dataTable': 'Data Table',
    'page.kanban': 'Kanban Board',
    'page.calendar': 'Calendar',
    'page.notifications': 'Notification Center',
    'page.profile': 'Profile',
    'page.settings': 'Settings',

    // JS Showcase
    'jsShowcase.title': 'JavaScript Showcase',
    'jsShowcase.subtitle': 'Explore modern Web capabilities and JavaScript demos.',
    'jsShowcase.tab.animations': '🎬 Animations',
    'jsShowcase.tab.webApis': '🌐 Web APIs',
    'jsShowcase.tab.interactions': '⚙️ Interactions',
    'jsShowcase.tab.esFeatures': '⚡ ES Features',
    'jsShowcase.tab.charts': '📊 Charts',
    'jsShowcase.tab.animationsExtended': '🎬 More Animations',
    'jsShowcase.tab.canvasDrawing': '🎨 Canvas Drawing',
    'jsShowcase.tab.worker': '⚡ Workers',
    'jsShowcase.tab.pwa': '📱 PWA',
    'jsShowcase.tab.websocket': '🔌 WebSocket',
    'jsShowcase.tab.webgl': '🎮 3D',
    'jsShowcase.panel.loadingTitle': 'Loading...',
    'jsShowcase.panel.loadingDesc': 'Initializing this tab...',

    // Common
    'common.loading': 'Loading...',
    'common.noData': 'No data available',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.status.completed': 'Completed',
    'common.status.inProgress': 'In progress',
    'common.status.failed': 'Failed',
    'common.moreOptions': 'More options',

    // Hero section
    'hero.title': 'Build the Future of Digital Experience',
    'hero.subtitle': 'Create stunning user interfaces with Glassmorphism design language',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.kpi.totalRevenue': 'Total Revenue',
    'dashboard.kpi.activeUsers': 'Active Users',
    'dashboard.kpi.totalOrders': 'Total Orders',
    'dashboard.kpi.conversionRate': 'Conversion Rate',
    'dashboard.chart.revenue': 'Revenue Trend',
    'dashboard.chart.sales': 'Sales Analysis',
    'dashboard.chart.market': 'Market Share',
    'dashboard.activity.title': 'Recent Activity',
    'dashboard.activity.user': 'User',
    'dashboard.activity.action': 'Action',
    'dashboard.activity.time': 'Time',
    'dashboard.activity.status': 'Status',
    'dashboard.welcome': 'Welcome back! Here is your business overview.',
    'dashboard.vsLastMonth': 'vs last month',
    'dashboard.range.7d': 'Last 7 days',
    'dashboard.range.30d': 'Last 30 days',
    'dashboard.range.90d': 'Last 90 days',
    'dashboard.badge.thisMonth': 'This month',
    'dashboard.badge.lastMonth': 'Last month',
    'dashboard.market.productA': 'Product A',
    'dashboard.market.productB': 'Product B',
    'dashboard.market.productC': 'Product C',
    'dashboard.time.2mAgo': '2 minutes ago',
    'dashboard.time.15mAgo': '15 minutes ago',
    'dashboard.time.1hAgo': '1 hour ago',
    'dashboard.time.3hAgo': '3 hours ago',
    'dashboard.time.5hAgo': '5 hours ago',
    'dashboard.activity.action.createProject': 'Created a new project',
    'dashboard.activity.action.uploadFile': 'Uploaded a file',
    'dashboard.activity.action.updateSettings': 'Updated settings',
    'dashboard.activity.action.completeTask': 'Completed a task',
    'dashboard.activity.action.sendReport': 'Sent a report',

    // Dashboard (short keys used by some pages)
    'kpi.totalUsers': 'Total Users',
    'kpi.totalRevenue': 'Total Revenue',
    'kpi.activeUsers': 'Active Users',
    'kpi.conversionRate': 'Conversion Rate',

    // Landing Page Features
    'features.badge': 'Core Features',
    'features.title': 'Powerful Features',
    'features.subtitle': 'Built with modern tech to deliver an outstanding experience',
    'features.ai.title': 'AI Powered',
    'features.ai.description': 'Smart algorithms optimize your workflow automatically, boosting efficiency by 300%',
    'features.ai.desc': 'Smart algorithms optimize your workflow automatically, boosting efficiency by 300%',
    'features.sync.title': 'Real-time Sync',
    'features.sync.description': 'Sync across devices instantly, access your data anytime, anywhere',
    'features.analytics.title': 'Deep Analytics',
    'features.analytics.description': 'Visual dashboards that surface the metrics that matter',
    'features.analytics.desc': 'Visual dashboards that surface the metrics that matter',
    'features.cloud.title': 'Cloud Integration',
    'features.cloud.desc': 'Seamlessly connect with various cloud services',
    'features.security.title': 'Enterprise Security',
    'features.security.description': '256-bit AES encryption, compliant with GDPR and SOC 2',
    'features.security.desc': '256-bit AES encryption, compliant with GDPR and SOC 2',
    'features.collaboration.title': 'Team Collaboration',
    'features.collaboration.description': 'Collaborate in real time and keep your team in sync',
    'features.api.title': 'API Integration',
    'features.api.description': 'Open API that integrates seamlessly with your existing tools',
    'features.api.desc': 'Open API that integrates seamlessly with your existing tools',
    'features.support.title': '24/7 Support',
    'features.support.desc': 'Round-the-clock professional technical support',

    // Landing Page Products
    'products.badge': 'Product Showcase',
    'products.title': 'All-in-One Solution',
    'products.subtitle': 'Everything you need, integrated into one platform',
    'products.dashboard.title': 'Smart Dashboard',
    'products.dashboard.description': 'Monitor key metrics in real time and stay on top of your business',
    'products.analytics.title': 'Analytics',
    'products.analytics.description': 'Deep insights into your business data',
    'products.team.title': 'Teamwork',
    'products.team.description': 'Seamless collaboration for your team',
    'products.automation.title': 'Automation',
    'products.automation.description': 'Automate repetitive work and focus on value',
    'products.security.title': 'Security',
    'products.security.description': 'Enterprise-grade protection',

    // Landing Page Stats
    'stats.users': 'Active Users',
    'stats.projects': 'Completed Projects',
    'stats.countries': 'Countries Served',
    'stats.satisfaction': 'Customer Satisfaction',

    // Pricing
    'pricing.badge': 'Pricing',
    'pricing.title': 'Choose a Plan',
    'pricing.subtitle': 'Flexible plans for teams of every size',
    'pricing.perMonth': '/mo',
    'pricing.getStarted': 'Get Started',
    'pricing.popular': 'Most Popular',
    'pricing.free.name': 'Free',
    'pricing.free.price': 'Free',
    'pricing.free.badge': 'Free Plan',
    'pricing.free.description': 'For individuals and small projects',
    'pricing.free.desc': 'For individuals and small projects',
    'pricing.free.feature1': 'Up to 3 projects',
    'pricing.free.feature2': '5GB storage',
    'pricing.free.feature3': 'Core features',
    'pricing.free.feature4': 'Community support',
    'pricing.pro.name': 'Pro',
    'pricing.pro.price': '$9.99/mo',
    'pricing.pro.badge': 'Pro Plan',
    'pricing.pro.description': 'For growing teams and businesses',
    'pricing.pro.desc': 'For growing teams and businesses',
    'pricing.pro.feature1': 'Unlimited projects',
    'pricing.pro.feature2': '100GB storage',
    'pricing.pro.feature3': 'Advanced features',
    'pricing.pro.feature4': 'Priority support',
    'pricing.pro.feature5': 'API access',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.price': 'Contact Us',
    'pricing.enterprise.badge': 'Enterprise',
    'pricing.custom': 'Custom',
    'pricing.enterprise.description': 'For large organizations and enterprises',
    'pricing.enterprise.desc': 'For large organizations and enterprises',
    'pricing.enterprise.feature1': 'Unlimited everything',
    'pricing.enterprise.feature2': 'Dedicated storage',
    'pricing.enterprise.feature3': 'Custom features',
    'pricing.enterprise.feature4': '24/7 dedicated support',
    'pricing.enterprise.feature5': 'SLA guarantee',
    'pricing.contactSales': 'Contact Sales',
    'pricing.feature.users': 'Users',
    'pricing.feature.storage': 'Storage',
    'pricing.feature.support': 'Support',
    'pricing.cta': 'Get Started',

    // Landing Page Testimonials
    'testimonials.badge': 'Testimonials',
    'testimonials.title': 'What Customers Say',
    'testimonials.subtitle': 'Trusted by teams worldwide',
    'testimonials.1.content': '"NexusAI transformed our workflow—productivity jumped by 300%. The interface is elegant, powerful, and easy to use."',
    'testimonials.1.name': 'Sarah Johnson',
    'testimonials.1.role': 'Product Director, TechCorp',
    'testimonials.2.content': '"An exceptional UX combined with powerful analytics helped us make smarter decisions. Support is also highly professional."',
    'testimonials.2.name': 'Michael Chen',
    'testimonials.2.role': 'CEO, StartupX',
    'testimonials.3.content': '"From small teams to enterprise deployments, NexusAI fits perfectly. The security and reliability give us real peace of mind."',
    'testimonials.3.name': 'Emily Rodriguez',
    'testimonials.3.role': 'CTO, EnterpriseHub',

    // Landing Page CTA
    'cta.title': 'Ready to get started?',
    'cta.subtitle': 'Join 50,000+ teams worldwide and experience NexusAI today',
    'cta.startFree': 'Start Free',
    'cta.scheduleDemo': 'Schedule a Demo',
    'cta.benefit1': 'No credit card required',
    'cta.benefit2': '14-day free trial',
    'cta.benefit3': 'Cancel anytime',

    // Settings
    'settings.general.title': 'General Settings',
    'settings.general.language': 'Language',
    'settings.general.timezone': 'Timezone',
    'settings.general.notifications': 'Notification Preferences',
    'settings.security.title': 'Security Settings',
    'settings.security.password': 'Change Password',
    'settings.security.twoFactor': 'Two-Factor Authentication',
    'settings.security.sessions': 'Active Sessions',
    'settings.billing.title': 'Billing Settings',
    'settings.billing.plan': 'Current Plan',
    'settings.billing.payment': 'Payment Method',
    'settings.billing.history': 'Billing History',

    // Notifications
    'notifications.title': 'Notification Center',
    'notifications.subtitle': 'Manage all your notifications',
    'notifications.empty': 'No new notifications',
    'notifications.markAllRead': 'Mark all as read',
    'notifications.all': 'All',
    'notifications.unread': 'Unread',
    'notifications.read': 'Read',
    'notifications.action.markRead': 'Mark as read',
    'notifications.action.delete': 'Delete',
    'notifications.types.info': 'Info',
    'notifications.types.success': 'Success',
    'notifications.types.warning': 'Warning',
    'notifications.types.error': 'Error',
    'notifications.time.5mAgo': '5 minutes ago',
    'notifications.time.1hAgo': '1 hour ago',
    'notifications.time.2hAgo': '2 hours ago',
    'notifications.time.3hAgo': '3 hours ago',
    'notifications.time.5hAgo': '5 hours ago',
    'notifications.time.yesterday': 'Yesterday',
    'notifications.time.2dAgo': '2 days ago',
    'notifications.time.3dAgo': '3 days ago',
    'notifications.time.1wAgo': '1 week ago',
    'notifications.time.2wAgo': '2 weeks ago',
    'notifications.time.1moAgo': '1 month ago',
    'notifications.time.2moAgo': '2 months ago',
    'notifications.item.systemUpdate.title': 'System update',
    'notifications.item.systemUpdate.desc': 'NexusAI will undergo maintenance tonight at 23:00 for approximately 2 hours.',
    'notifications.item.deploySuccess.title': 'Deployment succeeded',
    'notifications.item.deploySuccess.desc': 'Your project \"NexusAI Dashboard\" has been deployed to production successfully.',
    'notifications.item.apiQuota.title': 'API quota running low',
    'notifications.item.apiQuota.desc': 'You have used 85% of your monthly API calls. Please monitor your quota.',
    'notifications.item.buildFailed.title': 'Build failed',
    'notifications.item.buildFailed.desc': 'Project \"API Gateway\" build failed. Please check the error logs.',
    'notifications.item.newMember.title': 'New member joined',
    'notifications.item.newMember.desc': 'Alice Chen joined your team \"Frontend Team\".',
    'notifications.item.backup.title': 'Backup completed',
    'notifications.item.backup.desc': 'Database backup completed successfully. Backup size: 2.3 GB.',
    'notifications.item.billing.title': 'Invoice generated',
    'notifications.item.billing.desc': 'Your December invoice is ready. Amount: NT$ 12,500.',
    'notifications.item.cert.title': 'Certificate expiring soon',
    'notifications.item.cert.desc': 'Your SSL certificate will expire in 30 days. Please renew it in time.',
    'notifications.item.securityScan.title': 'Security scan completed',
    'notifications.item.securityScan.desc': 'Security scan completed. No vulnerabilities found.',
    'notifications.item.systemUpgrade.title': 'System upgrade',
    'notifications.item.systemUpgrade.desc': 'NexusAI upgraded to v2.5.0 with new features.',
    'notifications.item.accountVerified.title': 'Account verified',
    'notifications.item.accountVerified.desc': 'Your account has successfully passed two-factor verification.',
    'notifications.item.welcome.title': 'Welcome to NexusAI',
    'notifications.item.welcome.desc': 'Thanks for signing up for NexusAI. Start your AI development journey!',

    // Projects
    'projects.title': 'Project Management',
    'projects.new': 'New Project',
    'projects.subtitle': 'Manage all your projects, track progress, and collaborate with your team.',
    'projects.btn.newProject': 'New Project',
    'projects.searchPlaceholder': 'Search projects...',
    'projects.filter.allStatus': 'All statuses',
    'projects.status.active': 'In Progress',
    'projects.status.completed': 'Completed',
    'projects.status.pending': 'Pending',
    'projects.status.archived': 'Archived',
    'projects.status.planned': 'Planned',
    'projects.members': 'Members',
    'projects.deadline': 'Deadline',
    'projects.progress': 'Progress',
    'projects.sort.recent': 'Recently updated',
    'projects.sort.name': 'Project name',
    'projects.sort.progress': 'Progress',
    'projects.view.grid': 'Grid view',
    'projects.view.list': 'List view',
    'projects.updated.1h': 'Updated 1 hour ago',
    'projects.updated.2h': 'Updated 2 hours ago',
    'projects.updated.4h': 'Updated 4 hours ago',
    'projects.updated.5h': 'Updated 5 hours ago',
    'projects.updated.1d': 'Updated 1 day ago',
    'projects.updated.3d': 'Updated 3 days ago',
    'projects.card1.title': 'NexusAI Dashboard',
    'projects.card1.desc': 'Building a new enterprise dashboard system with analytics and visualization.',
    'projects.card2.title': 'API Gateway',
    'projects.card2.desc': 'A microservices API gateway supporting auth, rate limiting, and monitoring.',
    'projects.card3.title': 'Mobile App Redesign',
    'projects.card3.desc': 'Redesigning the mobile app UI to improve UX and visuals.',
    'projects.card4.title': 'E-Commerce Platform',
    'projects.card4.desc': 'Developing a full e-commerce platform with cart, payments, and order management.',
    'projects.card5.title': 'Data Analytics Suite',
    'projects.card5.desc': 'An enterprise analytics toolkit for real-time processing and visualization.',
    'projects.card6.title': 'Cloud Infrastructure',
    'projects.card6.desc': 'Cloud infrastructure build-out and optimization with automated deploy and monitoring.',
    'projects.alert.newProjectWip': 'New project feature is under development...',

    // Kanban
    'kanban.title': 'Kanban Board',
    'kanban.columns.todo': 'To Do',
    'kanban.columns.inProgress': 'In Progress',
    'kanban.columns.review': 'In Review',
    'kanban.columns.done': 'Done',
    'kanban.addTask': 'Add Task',
    'kanban.moveTask': 'Move Task',
    'kanban.pageTitle': 'Project Board',
    'kanban.searchPlaceholder': 'Search tasks...',
    'kanban.filter.allMembers': 'All members',
    'kanban.addCard': '+ Add card',
    'kanban.columns.archived': 'Archived',
    'kanban.tag.feature': 'Feature',
    'kanban.tag.bug': 'Bug',
    'kanban.tag.enhancement': 'Enhancement',
    'kanban.tag.docs': 'Docs',
    'kanban.prompt.taskTitle': 'Enter task title:',
    'kanban.newTask.desc': 'New task',
    'kanban.card.todo1.title': 'Design a new login page',
    'kanban.card.todo1.desc': 'Redesign the login UI based on the latest design guidelines',
    'kanban.card.todo2.title': 'Fix table sorting issue',
    'kanban.card.todo2.desc': 'Sorting sometimes fails when clicking the table header',
    'kanban.card.todo3.title': 'Update API docs',
    'kanban.card.todo3.desc': 'Add documentation for newly added API endpoints',
    'kanban.card.todo4.title': 'Optimize search performance',
    'kanban.card.todo4.desc': 'Search is slow when there is a lot of data',
    'kanban.card.todo5.title': 'Add dark mode toggle',
    'kanban.card.todo5.desc': 'Implement dark mode across the site',
    'kanban.card.inProgress1.title': 'Implement drag & drop',
    'kanban.card.inProgress1.desc': 'Build drag-and-drop reordering for the board',
    'kanban.card.inProgress2.title': 'Integrate i18n system',
    'kanban.card.inProgress2.desc': 'Add multi-language support',
    'kanban.card.inProgress3.title': 'Write unit tests',
    'kanban.card.inProgress3.desc': 'Increase test coverage for core features',
    'kanban.card.done1.title': 'Build Glassmorphism style system',
    'kanban.card.done1.desc': 'Complete the frosted-glass design system',
    'kanban.card.done2.title': 'Design responsive navbar',
    'kanban.card.done2.desc': 'Responsive navigation component',
    'kanban.card.done3.title': 'Implement theme toggle',
    'kanban.card.done3.desc': 'Light/Dark theme switching',
    'kanban.card.done4.title': 'Create design spec docs',
    'kanban.card.done4.desc': 'Complete design system documentation',
    'kanban.card.archived1.title': 'Competitor research',
    'kanban.card.archived1.desc': 'Analyze similar products in the market',
    'kanban.card.archived2.title': 'Initial prototype design',
    'kanban.card.archived2.desc': 'Early design concepts',

    // Calendar
    'calendar.title': 'Calendar',
    'calendar.today': 'Today',
    'calendar.week': 'Week',
    'calendar.month': 'Month',
    'calendar.addEvent': 'Add Event',
    'calendar.noEvents': 'No events for this day',
    'calendar.subtitle': 'Manage your schedule and important events.',
    'calendar.nav.prevMonth': 'Previous month',
    'calendar.nav.nextMonth': 'Next month',
    'calendar.day': 'Day',
    'calendar.weekday.sun': 'Sun',
    'calendar.weekday.mon': 'Mon',
    'calendar.weekday.tue': 'Tue',
    'calendar.weekday.wed': 'Wed',
    'calendar.weekday.thu': 'Thu',
    'calendar.weekday.fri': 'Fri',
    'calendar.weekday.sat': 'Sat',
    'calendar.upcoming.title': 'Upcoming events',
    'calendar.month.dec': 'Dec',
    'calendar.location.meetingRoomA': 'Meeting Room A',
    'calendar.location.online': 'Online meeting',
    'calendar.location.hqMainMeeting': 'HQ main meeting room',
    'calendar.event.teamWeekly': 'Team weekly',
    'calendar.event.designReview': 'Product design review',
    'calendar.event.milestoneReview': 'Project milestone review',
    'calendar.event.christmas': 'Christmas',
    'calendar.alert.addEventWip': 'Add event feature is under development...',

    // Profile
    'profile.title': 'Profile',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.role': 'Role',
    'profile.bio': 'Bio',
    'profile.avatar': 'Avatar',
    'profile.save': 'Save Changes',
    'profile.subtitle': 'Manage your personal information and account settings.',
    'profile.avatarAlt': 'User avatar',
    'profile.editAvatar': 'Edit avatar',
    'profile.btn.edit': 'Edit profile',
    'profile.section.personalInfo': 'Personal Information',
    'profile.form.firstName.label': 'First name',
    'profile.form.firstName.placeholder': 'Enter your first name',
    'profile.form.lastName.label': 'Last name',
    'profile.form.lastName.placeholder': 'Enter your last name',
    'profile.form.phone.label': 'Phone',
    'profile.form.jobTitle.label': 'Job title',
    'profile.form.jobTitle.placeholder': 'Enter your job title',
    'profile.form.company.label': 'Company',
    'profile.form.company.placeholder': 'Enter your company name',
    'profile.form.location.label': 'Location',
    'profile.form.location.placeholder': 'City, Country',
    'profile.form.bio.label': 'Bio',
    'profile.form.bio.placeholder': 'Tell us a little about yourself...',
    'profile.form.social.label': 'Social links',
    'profile.user.name': 'Daming Wang',
    'profile.user.jobTitle': 'Senior Product Designer',
    'profile.user.location': 'Taipei, Taiwan',
    'profile.value.firstName': 'Daming',
    'profile.value.lastName': 'Wang',
    'profile.value.jobTitle': 'Senior Product Designer',
    'profile.value.location': 'Taipei, Taiwan',
    'profile.value.bio': 'Passionate about design and innovation, I focus on creating great user experiences. With 8+ years of product design experience, I specialize in UI/UX, design systems, and user research.',
    'profile.stats.title': 'Stats',
    'profile.stats.completedProjects': 'Completed projects',
    'profile.stats.teamMembers': 'Team members',
    'profile.activity.title': 'Recent activity',
    'profile.activity.createProject': 'Created a new project',
    'profile.activity.uploadDesign': 'Uploaded design files',
    'profile.activity.completeReview': 'Completed task review',
    'profile.activity.replyTeam': 'Replied to team messages',
    'profile.activity.joinTeam': 'Joined a new team',
    'profile.time.2hAgo': '2 hours ago',
    'profile.time.5hAgo': '5 hours ago',
    'profile.time.1dAgo': '1 day ago',
    'profile.time.2dAgo': '2 days ago',
    'profile.time.3dAgo': '3 days ago',
    'profile.alert.saved': 'Profile saved!',
    'profile.confirm.cancel': 'Discard changes? Unsaved edits will be lost.',
    'profile.alert.avatarWip': 'Avatar upload is under development...',

    // Error messages
    'error.notFound': 'Page Not Found',
    'error.unauthorized': 'Unauthorized Access',
    'error.serverError': 'Server Error',
    'error.tryAgain': 'Please try again later',

    // Footer
    'footer.copyright': '© 2026 NexusAI. All rights reserved.',
    'footer.tagline': 'Build the future of digital experience',
    'footer.links.product': 'Product',
    'footer.links.company': 'Company',
    'footer.links.resources': 'Resources',
    'footer.links.legal': 'Legal',
    'footer.product.features': 'Features',
    'footer.product.pricing': 'Pricing',
    'footer.product.integrations': 'Integrations',
    'footer.product.changelog': 'Changelog',
    'footer.company.about': 'About',
    'footer.company.blog': 'Blog',
    'footer.company.careers': 'Careers',
    'footer.company.contact': 'Contact',
    'footer.resources.docs': 'Docs',
    'footer.resources.api': 'API Reference',
    'footer.resources.community': 'Community',
    'footer.resources.support': 'Support',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.terms': 'Terms of Service',
    'footer.legal.cookies': 'Cookie Policy',
    'footer.settings.theme': 'Theme',

    // Sidebar (ARIA)
    'sidebar.aria.label': 'Sidebar navigation',
    'sidebar.mobile.openMenu': 'Open menu',
    'sidebar.mobile.closeMenu': 'Close menu',
    'sidebar.collapse.collapse': 'Collapse sidebar',
    'sidebar.collapse.expand': 'Expand sidebar',
  },
};

// 取得瀏覽器語言
function getBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.startsWith('zh') ? LANGUAGES.ZH : LANGUAGES.EN;
}

// 取得儲存的語言設定
function getSavedLanguage() {
  return localStorage.getItem(LANG_KEY) || getBrowserLanguage();
}

// 當前語言
let currentLanguage = getSavedLanguage();

// 取得翻譯文字
function t(key, params = {}) {
  const text = translations[currentLanguage]?.[key] || translations[LANGUAGES.EN]?.[key] || key;

  // 替換參數 {{param}}
  return text.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => params[paramKey] || '');
}

// 切換語言
function toggleLanguage() {
  const newLang = currentLanguage === LANGUAGES.ZH ? LANGUAGES.EN : LANGUAGES.ZH;
  setLanguage(newLang);
  return newLang;
}

// 設定語言
function setLanguage(lang) {
  if (!Object.values(LANGUAGES).includes(lang)) {
    console.warn(`Invalid language: ${lang}`);
    return;
  }

  currentLanguage = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.setAttribute('lang', lang);

  // 更新所有有 data-lang 屬性的元素
  updatePageTranslations();

  // 派發語言變更事件
  window.dispatchEvent(
    new CustomEvent('languagechange', {
      detail: { language: lang },
    })
  );
}

// 更新頁面翻譯
function updatePageTranslations() {
  document.querySelectorAll('[data-lang]').forEach((el) => {
    const key = el.getAttribute('data-lang');
    const translated = t(key);
    if (translated !== key) {
      el.textContent = translated;
    }
  });

  // 相容舊版屬性：data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated !== key) {
      el.textContent = translated;
    }
  });

  // 更新 value（input/textarea/select 等）
  document.querySelectorAll('[data-lang-value]').forEach((el) => {
    const key = el.getAttribute('data-lang-value');
    const translated = t(key);
    if (translated !== key && 'value' in el) {
      el.value = translated;
    }
  });

  document.querySelectorAll('[data-i18n-value]').forEach((el) => {
    const key = el.getAttribute('data-i18n-value');
    const translated = t(key);
    if (translated !== key && 'value' in el) {
      el.value = translated;
    }
  });

  // 更新 placeholder
  document.querySelectorAll('[data-lang-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-lang-placeholder');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('placeholder', translated);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('placeholder', translated);
    }
  });

  // 更新 aria-label
  document.querySelectorAll('[data-lang-aria]').forEach((el) => {
    const key = el.getAttribute('data-lang-aria');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('aria-label', translated);
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('aria-label', translated);
    }
  });

  // 更新 alt（圖片替代文字）
  document.querySelectorAll('[data-lang-alt]').forEach((el) => {
    const key = el.getAttribute('data-lang-alt');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('alt', translated);
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('alt', translated);
    }
  });

  // 更新 title（提示文字）
  document.querySelectorAll('[data-lang-title]').forEach((el) => {
    const key = el.getAttribute('data-lang-title');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('title', translated);
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    const translated = t(key);
    if (translated !== key) {
      el.setAttribute('title', translated);
    }
  });
}

// 更新語言切換按鈕 UI
function updateLanguageToggleUI() {
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    const display = btn.querySelector('[data-lang-display]');
    if (display) {
      display.textContent = currentLanguage === LANGUAGES.ZH ? '中' : 'EN';
    }

    btn.setAttribute(
      'aria-label',
      currentLanguage === LANGUAGES.ZH ? '切換為英文' : 'Switch to Chinese'
    );
  });
}

/**
 * 重新同步語言相關控制項（給動態插入 DOM 使用）
 */
function refreshLanguageControls() {
  updatePageTranslations();
  updateLanguageToggleUI();
}

// 初始化語言系統
function initI18n() {
  // 設定初始語言
  setLanguage(currentLanguage);

  // 使用事件委派，確保動態插入的按鈕也會生效
  if (!isLangClickDelegated) {
    document.addEventListener('click', (e) => {
      const btn = e.target?.closest?.('[data-lang-toggle]');
      if (!btn) return;

      toggleLanguage();
      refreshLanguageControls();
    });
    isLangClickDelegated = true;
  }

  refreshLanguageControls();
}

// 取得當前語言
function getCurrentLanguage() {
  return currentLanguage;
}

// 導出
export {
  LANGUAGES,
  initI18n,
  t,
  toggleLanguage,
  setLanguage,
  getCurrentLanguage,
  updatePageTranslations,
  refreshLanguageControls,
};
