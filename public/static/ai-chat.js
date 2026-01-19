/**
 * AI客服聊天组件
 * 滴灌通智能投资平台 - 小滴AI助手
 */

class AIChatWidget {
  constructor() {
    this.isOpen = false
    this.isLoading = false
    this.history = []
    this.suggestions = []
    this.init()
  }

  init() {
    this.createWidget()
    this.bindEvents()
    this.loadSuggestions()
  }

  createWidget() {
    // 创建浮动按钮
    const floatBtn = document.createElement('div')
    floatBtn.id = 'ai-chat-float-btn'
    floatBtn.innerHTML = `
      <div class="ai-chat-btn-inner">
        <i class="fas fa-robot"></i>
        <span class="ai-chat-btn-badge" style="display:none;">1</span>
      </div>
    `
    document.body.appendChild(floatBtn)

    // 创建聊天窗口
    const chatWindow = document.createElement('div')
    chatWindow.id = 'ai-chat-window'
    chatWindow.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-header-left">
          <div class="ai-chat-avatar">
            <i class="fas fa-robot"></i>
          </div>
          <div class="ai-chat-header-info">
            <span class="ai-chat-name">小滴 AI 助手</span>
            <span class="ai-chat-status">
              <span class="ai-chat-status-dot"></span>
              在线
            </span>
          </div>
        </div>
        <div class="ai-chat-header-actions">
          <button class="ai-chat-clear-btn" title="清空对话">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button class="ai-chat-close-btn" title="关闭">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="ai-chat-messages" id="ai-chat-messages">
        <div class="ai-chat-welcome">
          <div class="ai-chat-welcome-icon">
            <i class="fas fa-hand-sparkles"></i>
          </div>
          <h3>您好！我是小滴</h3>
          <p>滴灌通智能投资平台的AI助手，有什么可以帮您的吗？</p>
        </div>
        <div class="ai-chat-suggestions" id="ai-chat-suggestions">
          <p class="ai-chat-suggestions-title">您可以问我：</p>
          <div class="ai-chat-suggestions-list"></div>
        </div>
      </div>
      <div class="ai-chat-input-area">
        <div class="ai-chat-input-wrapper">
          <textarea 
            id="ai-chat-input" 
            placeholder="输入您的问题..."
            rows="1"
          ></textarea>
          <button id="ai-chat-send" class="ai-chat-send-btn" disabled>
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        <div class="ai-chat-footer">
          <span>由 AI 提供支持 · </span>
          <a href="/agents" target="_blank">了解智能体</a>
        </div>
      </div>
    `
    document.body.appendChild(chatWindow)

    // 添加样式
    this.addStyles()
  }

  addStyles() {
    const style = document.createElement('style')
    style.textContent = `
      /* 浮动按钮 */
      #ai-chat-float-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        z-index: 9998;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #ai-chat-float-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
      }
      #ai-chat-float-btn.hidden {
        transform: scale(0);
        opacity: 0;
      }
      .ai-chat-btn-inner {
        color: white;
        font-size: 24px;
        position: relative;
      }
      .ai-chat-btn-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ef4444;
        color: white;
        font-size: 12px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* 聊天窗口 */
      #ai-chat-window {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 380px;
        height: 520px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        pointer-events: none;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      #ai-chat-window.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      /* 聊天头部 */
      .ai-chat-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: white;
      }
      .ai-chat-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .ai-chat-avatar {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }
      .ai-chat-header-info {
        display: flex;
        flex-direction: column;
      }
      .ai-chat-name {
        font-weight: 600;
        font-size: 15px;
      }
      .ai-chat-status {
        font-size: 12px;
        opacity: 0.9;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .ai-chat-status-dot {
        width: 8px;
        height: 8px;
        background: #4ade80;
        border-radius: 50%;
      }
      .ai-chat-header-actions {
        display: flex;
        gap: 8px;
      }
      .ai-chat-header-actions button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
      }
      .ai-chat-header-actions button:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* 消息区域 */
      .ai-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        background: #f8fafc;
      }
      .ai-chat-welcome {
        text-align: center;
        padding: 24px 16px;
      }
      .ai-chat-welcome-icon {
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        font-size: 28px;
        color: white;
      }
      .ai-chat-welcome h3 {
        margin: 0 0 8px;
        color: #1e293b;
        font-size: 18px;
      }
      .ai-chat-welcome p {
        margin: 0;
        color: #64748b;
        font-size: 14px;
      }

      /* 快捷问题 */
      .ai-chat-suggestions {
        margin-top: 16px;
      }
      .ai-chat-suggestions-title {
        font-size: 12px;
        color: #94a3b8;
        margin: 0 0 8px;
      }
      .ai-chat-suggestions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .ai-chat-suggestion-item {
        background: white;
        border: 1px solid #e2e8f0;
        padding: 8px 12px;
        border-radius: 16px;
        font-size: 13px;
        color: #475569;
        cursor: pointer;
        transition: all 0.2s;
      }
      .ai-chat-suggestion-item:hover {
        background: #667eea;
        color: white;
        border-color: #667eea;
      }

      /* 消息气泡 */
      .ai-chat-message {
        display: flex;
        margin-bottom: 16px;
        animation: fadeInUp 0.3s ease;
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .ai-chat-message.user {
        flex-direction: row-reverse;
      }
      .ai-chat-message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        flex-shrink: 0;
      }
      .ai-chat-message.user .ai-chat-message-avatar {
        background: #667eea;
        color: white;
      }
      .ai-chat-message.assistant .ai-chat-message-avatar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .ai-chat-message-content {
        max-width: 75%;
        margin: 0 8px;
      }
      .ai-chat-message-bubble {
        padding: 10px 14px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
      }
      .ai-chat-message.user .ai-chat-message-bubble {
        background: #667eea;
        color: white;
        border-bottom-right-radius: 4px;
      }
      .ai-chat-message.assistant .ai-chat-message-bubble {
        background: white;
        color: #1e293b;
        border-bottom-left-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      .ai-chat-message-time {
        font-size: 11px;
        color: #94a3b8;
        margin-top: 4px;
        text-align: right;
      }
      .ai-chat-message.user .ai-chat-message-time {
        text-align: right;
      }
      .ai-chat-message.assistant .ai-chat-message-time {
        text-align: left;
      }

      /* 加载动画 */
      .ai-chat-typing {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 12px 16px;
      }
      .ai-chat-typing-dot {
        width: 8px;
        height: 8px;
        background: #94a3b8;
        border-radius: 50%;
        animation: typingBounce 1.4s infinite ease-in-out;
      }
      .ai-chat-typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .ai-chat-typing-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes typingBounce {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }

      /* 输入区域 */
      .ai-chat-input-area {
        padding: 12px 16px;
        background: white;
        border-top: 1px solid #e2e8f0;
      }
      .ai-chat-input-wrapper {
        display: flex;
        gap: 8px;
        align-items: flex-end;
      }
      #ai-chat-input {
        flex: 1;
        border: 1px solid #e2e8f0;
        border-radius: 20px;
        padding: 10px 16px;
        font-size: 14px;
        resize: none;
        max-height: 100px;
        outline: none;
        transition: border-color 0.2s;
        font-family: inherit;
      }
      #ai-chat-input:focus {
        border-color: #667eea;
      }
      .ai-chat-send-btn {
        width: 40px;
        height: 40px;
        background: #667eea;
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ai-chat-send-btn:hover:not(:disabled) {
        background: #5a67d8;
        transform: scale(1.05);
      }
      .ai-chat-send-btn:disabled {
        background: #cbd5e1;
        cursor: not-allowed;
      }
      .ai-chat-footer {
        text-align: center;
        font-size: 11px;
        color: #94a3b8;
        margin-top: 8px;
      }
      .ai-chat-footer a {
        color: #667eea;
        text-decoration: none;
      }
      .ai-chat-footer a:hover {
        text-decoration: underline;
      }

      /* 移动端适配 */
      @media (max-width: 480px) {
        #ai-chat-window {
          width: 100%;
          height: 100%;
          bottom: 0;
          right: 0;
          border-radius: 0;
        }
        #ai-chat-float-btn {
          bottom: 16px;
          right: 16px;
        }
      }
    `
    document.head.appendChild(style)
  }

  bindEvents() {
    // 浮动按钮点击
    const floatBtn = document.getElementById('ai-chat-float-btn')
    floatBtn.addEventListener('click', () => this.toggle())

    // 关闭按钮
    const closeBtn = document.querySelector('.ai-chat-close-btn')
    closeBtn.addEventListener('click', () => this.close())

    // 清空按钮
    const clearBtn = document.querySelector('.ai-chat-clear-btn')
    clearBtn.addEventListener('click', () => this.clearChat())

    // 发送消息
    const sendBtn = document.getElementById('ai-chat-send')
    const input = document.getElementById('ai-chat-input')
    
    sendBtn.addEventListener('click', () => this.sendMessage())
    
    input.addEventListener('input', () => {
      sendBtn.disabled = !input.value.trim()
      this.autoResizeInput()
    })
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (input.value.trim()) {
          this.sendMessage()
        }
      }
    })
  }

  autoResizeInput() {
    const input = document.getElementById('ai-chat-input')
    input.style.height = 'auto'
    input.style.height = Math.min(input.scrollHeight, 100) + 'px'
  }

  toggle() {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.isOpen = true
    document.getElementById('ai-chat-window').classList.add('open')
    document.getElementById('ai-chat-float-btn').classList.add('hidden')
    document.getElementById('ai-chat-input').focus()
  }

  close() {
    this.isOpen = false
    document.getElementById('ai-chat-window').classList.remove('open')
    document.getElementById('ai-chat-float-btn').classList.remove('hidden')
  }

  async loadSuggestions() {
    try {
      const res = await fetch('/api/ai/chat/suggestions')
      const data = await res.json()
      if (data.success && data.data) {
        this.suggestions = data.data
        this.renderSuggestions()
      }
    } catch (e) {
      // 使用默认建议
      this.suggestions = [
        '平台是做什么的？',
        '如何提交投资标的？',
        '什么是DRO模式？',
        '如何查看投资回款？'
      ]
      this.renderSuggestions()
    }
  }

  renderSuggestions() {
    const container = document.querySelector('.ai-chat-suggestions-list')
    container.innerHTML = this.suggestions.slice(0, 4).map(s => 
      `<span class="ai-chat-suggestion-item">${s}</span>`
    ).join('')
    
    // 绑定点击事件
    container.querySelectorAll('.ai-chat-suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const text = item.textContent
        document.getElementById('ai-chat-input').value = text
        document.getElementById('ai-chat-send').disabled = false
        this.sendMessage()
      })
    })
  }

  async sendMessage() {
    const input = document.getElementById('ai-chat-input')
    const message = input.value.trim()
    if (!message || this.isLoading) return

    // 清空输入框
    input.value = ''
    input.style.height = 'auto'
    document.getElementById('ai-chat-send').disabled = true

    // 隐藏欢迎信息和建议
    const welcome = document.querySelector('.ai-chat-welcome')
    const suggestions = document.querySelector('.ai-chat-suggestions')
    if (welcome) welcome.style.display = 'none'
    if (suggestions) suggestions.style.display = 'none'

    // 添加用户消息
    this.addMessage('user', message)
    this.history.push({ role: 'user', content: message })

    // 显示加载状态
    this.showTyping()
    this.isLoading = true

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: this.history.slice(-20)
        })
      })
      
      const data = await res.json()
      this.hideTyping()
      
      if (data.success) {
        this.addMessage('assistant', data.data.reply)
        this.history.push({ role: 'assistant', content: data.data.reply })
      } else {
        const fallback = data.fallbackReply || '抱歉，服务暂时不可用，请稍后再试。'
        this.addMessage('assistant', fallback)
      }
    } catch (e) {
      this.hideTyping()
      this.addMessage('assistant', '网络连接失败，请检查网络后重试。')
    }

    this.isLoading = false
  }

  addMessage(role, content) {
    const container = document.getElementById('ai-chat-messages')
    const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    
    const msgEl = document.createElement('div')
    msgEl.className = `ai-chat-message ${role}`
    msgEl.innerHTML = `
      <div class="ai-chat-message-avatar">
        <i class="fas fa-${role === 'user' ? 'user' : 'robot'}"></i>
      </div>
      <div class="ai-chat-message-content">
        <div class="ai-chat-message-bubble">${this.formatMessage(content)}</div>
        <div class="ai-chat-message-time">${time}</div>
      </div>
    `
    container.appendChild(msgEl)
    container.scrollTop = container.scrollHeight
  }

  formatMessage(content) {
    // 简单格式化：转换换行符，转义HTML
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
  }

  showTyping() {
    const container = document.getElementById('ai-chat-messages')
    const typingEl = document.createElement('div')
    typingEl.id = 'ai-chat-typing'
    typingEl.className = 'ai-chat-message assistant'
    typingEl.innerHTML = `
      <div class="ai-chat-message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="ai-chat-message-content">
        <div class="ai-chat-message-bubble">
          <div class="ai-chat-typing">
            <div class="ai-chat-typing-dot"></div>
            <div class="ai-chat-typing-dot"></div>
            <div class="ai-chat-typing-dot"></div>
          </div>
        </div>
      </div>
    `
    container.appendChild(typingEl)
    container.scrollTop = container.scrollHeight
  }

  hideTyping() {
    const typing = document.getElementById('ai-chat-typing')
    if (typing) typing.remove()
  }

  clearChat() {
    this.history = []
    const container = document.getElementById('ai-chat-messages')
    container.innerHTML = `
      <div class="ai-chat-welcome">
        <div class="ai-chat-welcome-icon">
          <i class="fas fa-hand-sparkles"></i>
        </div>
        <h3>您好！我是小滴</h3>
        <p>滴灌通智能投资平台的AI助手，有什么可以帮您的吗？</p>
      </div>
      <div class="ai-chat-suggestions" id="ai-chat-suggestions">
        <p class="ai-chat-suggestions-title">您可以问我：</p>
        <div class="ai-chat-suggestions-list"></div>
      </div>
    `
    this.renderSuggestions()
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  window.aiChatWidget = new AIChatWidget()
})
