// Demo演示页面 - demo.html
export const demoPageContent = `
<!-- 页面标题 -->
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">Cardi B 演唱会项目演示</h1>
    <p class="text-gray-500">完整展示多智能体评估流程（含详细推理过程）</p>
  </div>
  <div class="flex space-x-2">
    <button onclick="toggleAllDetails()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-eye mr-2"></i><span id="toggle-all-text">展开全部</span>
    </button>
    <button onclick="resetDemo()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-redo mr-2"></i>重置
    </button>
    <button onclick="startDemo()" id="btn-start" class="px-6 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition">
      <i class="fas fa-play mr-2"></i>开始评估
    </button>
  </div>
</div>

<!-- 步骤指示器 -->
<div class="bg-white rounded-xl p-6 card-shadow mb-6">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div id="step-1" class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">1</div>
        <span class="font-medium text-primary-600">项目材料</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-1"></div>
      <div id="step-2" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">2</div>
        <span class="font-medium text-gray-600">外环筛选</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-2"></div>
      <div id="step-3" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">3</div>
        <span class="font-medium text-gray-600">中环评估</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-3"></div>
      <div id="step-4" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">4</div>
        <span class="font-medium text-gray-600">综合评分</span>
      </div>
    </div>
    <div id="overall-status" class="text-sm text-gray-500">
      准备就绪
    </div>
  </div>
</div>

<!-- 主内容区 -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <!-- 左侧：项目信息 -->
  <div class="lg:col-span-1">
    <div class="bg-white rounded-xl card-shadow overflow-hidden sticky top-24">
      <div class="gradient-bg p-4 text-white">
        <div class="flex items-center space-x-3">
          <img src="https://i.pravatar.cc/60?img=47" class="w-12 h-12 rounded-full border-2 border-white">
          <div>
            <h3 class="font-bold">Cardi B</h3>
            <p class="text-sm opacity-80">2026中国巡演</p>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">运营方</span>
            <span class="font-medium">星耀文化传媒</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">行业</span>
            <span class="font-medium">轻资产/演出</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">融资金额</span>
            <span class="font-medium text-primary-600">3,000万</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">预期IRR</span>
            <span class="font-medium text-green-600">35%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">巡演城市</span>
            <span class="font-medium">杭州/深圳/成都</span>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t">
          <h4 class="font-medium mb-2">财务预测</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">预计收入</span>
              <span>7,680万</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预计成本</span>
              <span>5,500万</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预计利润</span>
              <span class="text-green-600">2,180万</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 右侧：评估过程 -->
  <div class="lg:col-span-2 space-y-6">
    <!-- 外环筛选 -->
    <div id="outer-section" class="bg-white rounded-xl card-shadow p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-circle-notch text-red-500 mr-2"></i>
          外环筛选
          <span class="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">一票否决</span>
        </h3>
        <span id="outer-status" class="text-sm text-gray-500">等待开始</span>
      </div>
      
      <!-- 外环说明 -->
      <div class="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-800">
        <i class="fas fa-info-circle mr-2"></i>
        外环采用<strong>串行执行</strong>，每个智能体必须通过才能进入下一步，任何一个不通过则<strong>一票否决</strong>
      </div>
      
      <div id="outer-agents" class="space-y-4">
        <!-- 智能体卡片将动态加载 -->
      </div>
    </div>

    <!-- 中环评估 -->
    <div id="inner-section" class="bg-white rounded-xl card-shadow p-6 opacity-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-bullseye text-blue-500 mr-2"></i>
          中环评估
          <span class="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">加权评分</span>
        </h3>
        <span id="inner-status" class="text-sm text-gray-500">等待外环完成</span>
      </div>
      
      <!-- 中环说明 -->
      <div class="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
        <i class="fas fa-info-circle mr-2"></i>
        中环采用<strong>并行执行</strong>，多个智能体同时评估，按权重计算加权评分
      </div>
      
      <div id="inner-agents" class="space-y-4">
        <!-- 智能体卡片将动态加载 -->
      </div>
    </div>

    <!-- 综合评分 -->
    <div id="final-section" class="bg-white rounded-xl card-shadow p-6 opacity-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-ranking-star text-purple-500 mr-2"></i>
          综合评分
        </h3>
        <span id="final-status" class="text-sm text-gray-500">等待评估完成</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 雷达图 -->
        <div>
          <canvas id="radar-chart" width="300" height="300"></canvas>
        </div>
        
        <!-- 评分详情 -->
        <div id="final-details" class="space-y-4">
          <div class="text-center py-8 text-gray-400">
            <i class="fas fa-chart-pie text-4xl mb-2"></i>
            <p>评估完成后显示结果</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 投资建议 -->
    <div id="recommendation-section" class="hidden">
      <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold mb-2" id="rec-title">投资建议</h3>
            <p id="rec-detail" class="opacity-90"></p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold" id="rec-score">--</div>
            <div class="text-sm opacity-80" id="rec-grade">评级</div>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-white/20">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium mb-2">核心优势</h4>
              <ul id="rec-strengths" class="text-sm space-y-1 opacity-90"></ul>
            </div>
            <div>
              <h4 class="font-medium mb-2">关注风险</h4>
              <ul id="rec-risks" class="text-sm space-y-1 opacity-90"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 评估详情弹窗 -->
<div id="detail-modal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden">
    <div class="p-4 border-b flex items-center justify-between">
      <h3 id="modal-title" class="font-bold text-lg">评估详情</h3>
      <button onclick="closeDetailModal()" class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
        <i class="fas fa-times text-gray-500"></i>
      </button>
    </div>
    <div id="modal-content" class="p-6 overflow-y-auto max-h-[70vh]">
      <!-- 内容动态填充 -->
    </div>
  </div>
</div>

<script>
  let demoAgents = [];
  let radarChart = null;
  let isRunning = false;
  let allExpanded = false;
  let evaluationResults = {}; // 存储所有评估结果

  // 加载智能体
  async function loadDemoAgents() {
    try {
      const { data } = await apiCall('/api/agents');
      demoAgents = data;
      renderAgentCards();
    } catch (e) {}
  }

  // 渲染智能体卡片 - 包含详情展示区域
  function renderAgentCards() {
    const outerAgents = demoAgents.filter(a => a.ring_type === 'outer');
    const innerAgents = demoAgents.filter(a => a.ring_type === 'inner' && a.id !== 'comprehensive-scoring-agent');

    document.getElementById('outer-agents').innerHTML = outerAgents.map((agent, index) => \`
      <div id="agent-\${agent.id}" class="border rounded-lg overflow-hidden transition-all duration-300">
        <!-- 智能体主卡片 -->
        <div class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100" onclick="toggleAgentDetail('\${agent.id}')">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-medium">\${agent.name}</h4>
              <p class="text-xs text-gray-500">\${agent.dimension} · 阈值 \${agent.pass_threshold}分</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div id="progress-\${agent.id}" class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden hidden">
              <div class="h-full bg-primary-500 transition-all duration-1000" style="width: 0%"></div>
            </div>
            <span id="score-\${agent.id}" class="font-mono text-lg font-bold text-gray-400">--</span>
            <span id="status-\${agent.id}" class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-minus text-gray-400 text-xs"></i>
            </span>
            <i id="expand-icon-\${agent.id}" class="fas fa-chevron-down text-gray-400 text-sm transition-transform"></i>
          </div>
        </div>
        
        <!-- 智能体评估详情（默认隐藏） -->
        <div id="detail-\${agent.id}" class="hidden border-t bg-white">
          <div class="p-4 space-y-4">
            <!-- 执行步骤 -->
            <div id="steps-\${agent.id}" class="space-y-2">
              <div class="flex items-center space-x-2 text-gray-400 text-sm">
                <i class="fas fa-hourglass-start"></i>
                <span>等待执行...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`).join('');

    document.getElementById('inner-agents').innerHTML = innerAgents.map(agent => \`
      <div id="agent-\${agent.id}" class="border rounded-lg overflow-hidden transition-all duration-300">
        <!-- 智能体主卡片 -->
        <div class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100" onclick="toggleAgentDetail('\${agent.id}')">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon} text-sm" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-medium text-sm">\${agent.name.replace('智能体', '')}</h4>
              <p class="text-xs text-gray-500">权重 \${agent.weight}%</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span id="score-\${agent.id}" class="font-mono font-bold text-gray-400">--</span>
            <span id="status-\${agent.id}" class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-minus text-gray-400 text-xs"></i>
            </span>
            <i id="expand-icon-\${agent.id}" class="fas fa-chevron-down text-gray-400 text-xs transition-transform"></i>
          </div>
        </div>
        
        <!-- 智能体评估详情（默认隐藏） -->
        <div id="detail-\${agent.id}" class="hidden border-t bg-white">
          <div class="p-3 space-y-3">
            <!-- 执行步骤 -->
            <div id="steps-\${agent.id}" class="space-y-2">
              <div class="flex items-center space-x-2 text-gray-400 text-sm">
                <i class="fas fa-hourglass-start"></i>
                <span>等待执行...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }

  // 切换智能体详情展示
  function toggleAgentDetail(agentId) {
    const detailEl = document.getElementById(\`detail-\${agentId}\`);
    const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
    
    if (detailEl.classList.contains('hidden')) {
      detailEl.classList.remove('hidden');
      expandIcon.classList.add('rotate-180');
    } else {
      detailEl.classList.add('hidden');
      expandIcon.classList.remove('rotate-180');
    }
  }

  // 展开/收起全部详情
  function toggleAllDetails() {
    allExpanded = !allExpanded;
    const allDetails = document.querySelectorAll('[id^="detail-"]');
    const allIcons = document.querySelectorAll('[id^="expand-icon-"]');
    
    allDetails.forEach(el => {
      if (allExpanded) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
    
    allIcons.forEach(icon => {
      if (allExpanded) {
        icon.classList.add('rotate-180');
      } else {
        icon.classList.remove('rotate-180');
      }
    });
    
    document.getElementById('toggle-all-text').textContent = allExpanded ? '收起全部' : '展开全部';
  }

  // 更新评估步骤显示
  function updateAgentSteps(agentId, status, result = null, agent = null) {
    const stepsEl = document.getElementById(\`steps-\${agentId}\`);
    if (!stepsEl) return;

    const agentInfo = agent || demoAgents.find(a => a.id === agentId);
    const isOuter = agentInfo?.ring_type === 'outer';
    
    if (status === 'running') {
      stepsEl.innerHTML = \`
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fas fa-spinner fa-spin text-primary-500 text-xs"></i>
            </div>
            <div>
              <p class="font-medium text-primary-700">正在执行评估...</p>
              <p class="text-sm text-gray-500 mt-1">AI智能体正在分析项目材料</p>
            </div>
          </div>
          
          <div class="ml-9 space-y-2 text-sm text-gray-500">
            <div class="flex items-center space-x-2">
              <i class="fas fa-circle-notch fa-spin text-xs"></i>
              <span>读取项目基础信息...</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-circle-notch fa-spin text-xs"></i>
              <span>分析\${agentInfo?.dimension || '维度'}数据...</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-circle-notch fa-spin text-xs"></i>
              <span>生成评估结论...</span>
            </div>
          </div>
        </div>
      \`;
    } else if (status === 'pass' || status === 'fail') {
      const isPassed = status === 'pass';
      const reasoning = result?.reasoning || result?.rationale || '暂无详细说明';
      const findings = result?.findings || [];
      const riskLevel = result?.risk_level || 'medium';
      const recommendation = result?.recommendation || '';
      const score = result?.score || 0;
      
      // 格式化风险等级显示
      const riskLevelMap = {
        low: { text: '低风险', color: 'green', icon: 'shield-alt' },
        medium: { text: '中风险', color: 'yellow', icon: 'exclamation-triangle' },
        high: { text: '高风险', color: 'red', icon: 'exclamation-circle' }
      };
      const riskInfo = riskLevelMap[riskLevel] || riskLevelMap.medium;
      
      stepsEl.innerHTML = \`
        <div class="space-y-4">
          <!-- 评估结果概览 -->
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full \${isPassed ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fas \${isPassed ? 'fa-check text-green-500' : 'fa-times text-red-500'} text-xs"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="font-medium \${isPassed ? 'text-green-700' : 'text-red-700'}">
                  \${isPassed ? '✓ 评估通过' : '✗ 评估未通过'}
                </p>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-0.5 rounded text-xs bg-\${riskInfo.color}-100 text-\${riskInfo.color}-700">
                    <i class="fas fa-\${riskInfo.icon} mr-1"></i>\${riskInfo.text}
                  </span>
                  <span class="font-mono font-bold \${isPassed ? 'text-green-600' : 'text-red-600'}">\${score}分</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 核心判断逻辑 -->
          <div class="ml-9 space-y-3">
            <!-- 推理过程 -->
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <i class="fas fa-brain text-purple-500"></i>
                <span class="font-medium text-sm text-gray-700">AI推理过程</span>
              </div>
              <div class="text-sm text-gray-600 leading-relaxed reasoning-content">
                \${formatReasoning(reasoning)}
              </div>
            </div>
            
            \${findings.length > 0 ? \`
            <!-- 检查发现 -->
            <div class="bg-\${isPassed ? 'green' : 'amber'}-50 rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <i class="fas fa-search text-\${isPassed ? 'green' : 'amber'}-500"></i>
                <span class="font-medium text-sm text-gray-700">检查发现</span>
              </div>
              <ul class="space-y-1 text-sm">
                \${findings.slice(0, 5).map(f => \`
                  <li class="flex items-start space-x-2">
                    <i class="fas fa-\${isPassed ? 'check' : 'exclamation'}-circle text-\${isPassed ? 'green' : 'amber'}-500 mt-0.5 text-xs"></i>
                    <span class="text-gray-600">\${f}</span>
                  </li>
                \`).join('')}
                \${findings.length > 5 ? \`<li class="text-gray-400 text-xs ml-4">...还有 \${findings.length - 5} 项</li>\` : ''}
              </ul>
            </div>
            \` : ''}
            
            \${recommendation ? \`
            <!-- 建议 -->
            <div class="bg-blue-50 rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <i class="fas fa-lightbulb text-blue-500"></i>
                <span class="font-medium text-sm text-gray-700">评估建议</span>
              </div>
              <p class="text-sm text-gray-600">\${recommendation}</p>
            </div>
            \` : ''}
          </div>
          
          <!-- 查看完整报告按钮 -->
          <div class="ml-9 pt-2">
            <button onclick="showFullReport('\${agentId}')" class="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
              <i class="fas fa-file-alt"></i>
              <span>查看完整评估报告</span>
              <i class="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      \`;
    }
  }

  // 格式化推理内容（处理长文本）
  function formatReasoning(reasoning) {
    if (!reasoning) return '暂无详细说明';
    
    // 限制显示长度，超过的部分截断
    const maxLength = 500;
    let formatted = reasoning;
    
    // 处理换行
    formatted = formatted.replace(/\\n/g, '<br>');
    
    if (formatted.length > maxLength) {
      formatted = formatted.substring(0, maxLength) + '...';
    }
    
    return formatted;
  }

  // 显示完整评估报告
  function showFullReport(agentId) {
    const result = evaluationResults[agentId];
    const agent = demoAgents.find(a => a.id === agentId);
    
    if (!result || !agent) {
      showToast('暂无评估结果', 'error');
      return;
    }
    
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const isPassed = result.pass;
    const score = result.result?.score || 0;
    const reasoning = result.result?.reasoning || result.result?.rationale || '暂无详细说明';
    const findings = result.result?.findings || [];
    const riskLevel = result.result?.risk_level || 'medium';
    const recommendation = result.result?.recommendation || '';
    const executionTime = result.executionTime || 0;
    
    modalTitle.innerHTML = \`
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background: \${agent.icon_color}20">
          <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
        </div>
        <span>\${agent.name} - 评估报告</span>
      </div>
    \`;
    
    modalContent.innerHTML = \`
      <div class="space-y-6">
        <!-- 评估概览 -->
        <div class="flex items-center justify-between p-4 rounded-lg \${isPassed ? 'bg-green-50' : 'bg-red-50'}">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full \${isPassed ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center">
              <i class="fas \${isPassed ? 'fa-check' : 'fa-times'} text-xl \${isPassed ? 'text-green-500' : 'text-red-500'}"></i>
            </div>
            <div>
              <p class="font-bold text-lg \${isPassed ? 'text-green-700' : 'text-red-700'}">
                \${isPassed ? '评估通过' : '评估未通过'}
              </p>
              <p class="text-sm text-gray-500">执行耗时: \${(executionTime / 1000).toFixed(1)}秒</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold \${isPassed ? 'text-green-600' : 'text-red-600'}">\${score}</div>
            <div class="text-sm text-gray-500">阈值: \${agent.pass_threshold}分</div>
          </div>
        </div>
        
        <!-- 智能体信息 -->
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="font-medium mb-3 flex items-center">
            <i class="fas fa-robot text-gray-400 mr-2"></i>
            智能体信息
          </h4>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span class="text-gray-500">评估维度:</span>
              <span class="ml-2 font-medium">\${agent.dimension}</span>
            </div>
            <div>
              <span class="text-gray-500">所属环节:</span>
              <span class="ml-2 font-medium">\${agent.ring_type === 'outer' ? '外环筛选' : '中环评估'}</span>
            </div>
            <div>
              <span class="text-gray-500">权重:</span>
              <span class="ml-2 font-medium">\${agent.weight}%</span>
            </div>
            <div>
              <span class="text-gray-500">风险等级:</span>
              <span class="ml-2 font-medium">\${riskLevel === 'low' ? '低' : riskLevel === 'high' ? '高' : '中'}</span>
            </div>
          </div>
        </div>
        
        <!-- 详细推理过程 -->
        <div class="bg-purple-50 rounded-lg p-4">
          <h4 class="font-medium mb-3 flex items-center">
            <i class="fas fa-brain text-purple-500 mr-2"></i>
            AI推理过程
          </h4>
          <div class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            \${reasoning}
          </div>
        </div>
        
        \${findings.length > 0 ? \`
        <!-- 检查发现 -->
        <div class="bg-amber-50 rounded-lg p-4">
          <h4 class="font-medium mb-3 flex items-center">
            <i class="fas fa-search text-amber-500 mr-2"></i>
            检查发现 (\${findings.length}项)
          </h4>
          <ul class="space-y-2 text-sm">
            \${findings.map((f, i) => \`
              <li class="flex items-start space-x-2">
                <span class="w-5 h-5 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs flex-shrink-0">\${i + 1}</span>
                <span class="text-gray-700">\${f}</span>
              </li>
            \`).join('')}
          </ul>
        </div>
        \` : ''}
        
        \${recommendation ? \`
        <!-- 评估建议 -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h4 class="font-medium mb-3 flex items-center">
            <i class="fas fa-lightbulb text-blue-500 mr-2"></i>
            评估建议
          </h4>
          <p class="text-sm text-gray-700">\${recommendation}</p>
        </div>
        \` : ''}
        
        <!-- 原始返回数据 -->
        <div class="border rounded-lg p-4">
          <h4 class="font-medium mb-3 flex items-center cursor-pointer" onclick="toggleRawData()">
            <i class="fas fa-code text-gray-400 mr-2"></i>
            原始返回数据
            <i id="raw-data-icon" class="fas fa-chevron-down ml-auto text-gray-400 text-sm"></i>
          </h4>
          <div id="raw-data-content" class="hidden">
            <pre class="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">\${JSON.stringify(result.result, null, 2)}</pre>
          </div>
        </div>
      </div>
    \`;
    
    modal.classList.remove('hidden');
  }

  // 切换原始数据显示
  function toggleRawData() {
    const content = document.getElementById('raw-data-content');
    const icon = document.getElementById('raw-data-icon');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  }

  // 关闭详情弹窗
  function closeDetailModal() {
    document.getElementById('detail-modal').classList.add('hidden');
  }

  // 更新智能体状态
  function updateAgentStatus(agentId, status, score = null, result = null) {
    const statusEl = document.getElementById(\`status-\${agentId}\`);
    const scoreEl = document.getElementById(\`score-\${agentId}\`);
    const progressEl = document.getElementById(\`progress-\${agentId}\`);
    const cardEl = document.getElementById(\`agent-\${agentId}\`);

    if (status === 'running') {
      statusEl.innerHTML = '<i class="fas fa-spinner fa-spin text-primary-500 text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center';
      cardEl?.classList.add('ring-2', 'ring-primary-300');
      if (progressEl) {
        progressEl.classList.remove('hidden');
        progressEl.querySelector('div').style.width = '30%';
        setTimeout(() => progressEl.querySelector('div').style.width = '70%', 500);
      }
      // 更新步骤显示
      updateAgentSteps(agentId, 'running');
    } else if (status === 'pass') {
      statusEl.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-green-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      cardEl?.classList.add('border-green-300');
      if (progressEl) progressEl.querySelector('div').style.width = '100%';
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-green-600';
      }
      // 更新步骤显示
      updateAgentSteps(agentId, 'pass', result);
      // 自动展开详情
      const detailEl = document.getElementById(\`detail-\${agentId}\`);
      const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
      if (detailEl) {
        detailEl.classList.remove('hidden');
        expandIcon?.classList.add('rotate-180');
      }
    } else if (status === 'fail') {
      statusEl.innerHTML = '<i class="fas fa-times text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-red-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      cardEl?.classList.add('border-red-300');
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-red-600';
      }
      // 更新步骤显示
      updateAgentSteps(agentId, 'fail', result);
      // 自动展开详情
      const detailEl = document.getElementById(\`detail-\${agentId}\`);
      const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
      if (detailEl) {
        detailEl.classList.remove('hidden');
        expandIcon?.classList.add('rotate-180');
      }
    }
  }

  // 更新步骤状态
  function updateStep(step, status) {
    const stepEl = document.getElementById(\`step-\${step}\`);
    const lineEl = document.getElementById(\`line-\${step - 1}\`);
    
    if (status === 'active') {
      stepEl.classList.remove('opacity-50');
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold';
      if (lineEl) lineEl.className = 'w-16 h-0.5 bg-primary-500';
    } else if (status === 'complete') {
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold';
      stepEl.querySelector('div').innerHTML = '<i class="fas fa-check"></i>';
    } else if (status === 'error') {
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold';
      stepEl.querySelector('div').innerHTML = '<i class="fas fa-times"></i>';
    }
  }

  // 开始演示
  async function startDemo() {
    if (isRunning) return;
    isRunning = true;
    evaluationResults = {}; // 清空之前的结果
    
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-start').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>评估中...';
    document.getElementById('overall-status').textContent = '正在评估...';
    document.getElementById('recommendation-section').classList.add('hidden');

    try {
      // 步骤2：外环筛选
      updateStep(2, 'active');
      document.getElementById('outer-section').classList.remove('opacity-50');
      document.getElementById('outer-status').textContent = '执行中...';
      document.getElementById('outer-status').className = 'text-sm text-primary-600';

      const outerAgents = ['negative-list-agent', 'touch-agent', 'interest-alignment-agent'];
      
      for (const agentId of outerAgents) {
        updateAgentStatus(agentId, 'running');
        
        const response = await apiCall('/api/ai/evaluate', {
          method: 'POST',
          body: JSON.stringify({
            agentId: agentId,
            dealId: 'DGT-2026-CARDIB'
          })
        });
        
        await sleep(500);
        
        const pass = response.data.pass;
        const score = response.data.result?.score || 0;
        const result = response.data.result;
        
        // 存储评估结果
        evaluationResults[agentId] = response.data;
        
        updateAgentStatus(agentId, pass ? 'pass' : 'fail', score, result);
        
        if (!pass) {
          document.getElementById('outer-status').textContent = '未通过';
          document.getElementById('outer-status').className = 'text-sm text-red-600';
          updateStep(2, 'error');
          document.getElementById('overall-status').textContent = '外环筛选未通过';
          showToast('外环筛选未通过：' + (response.data.result?.reasoning || ''), 'error');
          return;
        }
      }

      document.getElementById('outer-status').textContent = '全部通过';
      document.getElementById('outer-status').className = 'text-sm text-green-600';
      updateStep(2, 'complete');

      // 步骤3：中环评估
      updateStep(3, 'active');
      document.getElementById('inner-section').classList.remove('opacity-50');
      document.getElementById('inner-status').textContent = '并行评估中...';
      document.getElementById('inner-status').className = 'text-sm text-primary-600';

      const innerAgentIds = ['financial-health-agent', 'operational-capability-agent', 'legal-compliance-agent', 
                            'risk-control-agent', 'interest-deep-agent', 'economic-calculation-agent'];
      
      innerAgentIds.forEach(id => updateAgentStatus(id, 'running'));

      const innerResults = await Promise.all(innerAgentIds.map(async agentId => {
        const response = await apiCall('/api/ai/evaluate', {
          method: 'POST',
          body: JSON.stringify({
            agentId: agentId,
            dealId: 'DGT-2026-CARDIB'
          })
        });
        return { agentId, ...response.data };
      }));

      const scores = {};
      innerResults.forEach(r => {
        const score = r.result?.score || 0;
        scores[r.agentId] = score;
        // 存储评估结果
        evaluationResults[r.agentId] = r;
        updateAgentStatus(r.agentId, r.pass ? 'pass' : 'fail', score, r.result);
      });

      document.getElementById('inner-status').textContent = '评估完成';
      document.getElementById('inner-status').className = 'text-sm text-green-600';
      updateStep(3, 'complete');

      // 步骤4：综合评分
      updateStep(4, 'active');
      document.getElementById('final-section').classList.remove('opacity-50');
      document.getElementById('final-status').textContent = '计算中...';
      document.getElementById('final-status').className = 'text-sm text-primary-600';

      // 计算加权评分
      const weights = {
        'financial-health-agent': 25,
        'operational-capability-agent': 20,
        'legal-compliance-agent': 15,
        'risk-control-agent': 15,
        'interest-deep-agent': 10,
        'economic-calculation-agent': 10
      };

      let weightedSum = 0;
      let totalWeight = 0;
      Object.keys(weights).forEach(id => {
        weightedSum += (scores[id] || 0) * weights[id];
        totalWeight += weights[id];
      });

      const finalScore = Math.round(weightedSum / totalWeight * 10) / 10;
      
      // 确定评级
      let grade = 'D';
      let gradeColor = 'red';
      if (finalScore >= 85) { grade = 'A'; gradeColor = 'green'; }
      else if (finalScore >= 75) { grade = 'B+'; gradeColor = 'emerald'; }
      else if (finalScore >= 65) { grade = 'B'; gradeColor = 'blue'; }
      else if (finalScore >= 60) { grade = 'C'; gradeColor = 'yellow'; }

      // 更新雷达图
      updateRadarChart(scores);

      // 更新评分详情
      document.getElementById('final-details').innerHTML = \`
        <div class="text-center">
          <div class="text-5xl font-bold text-\${gradeColor}-600 mb-2">\${finalScore}</div>
          <div class="text-2xl font-bold text-\${gradeColor}-500">\${grade}级</div>
          <p class="text-gray-500 mt-2">\${grade === 'A' ? '强烈推荐投资' : grade === 'B+' ? '推荐投资' : grade === 'B' ? '可以投资' : '谨慎投资'}</p>
        </div>
        <div class="space-y-2 mt-4">
          \${Object.entries(scores).map(([id, score]) => {
            const agent = demoAgents.find(a => a.id === id);
            return \`
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">\${agent?.dimension || id}</span>
                <span class="font-mono font-medium">\${score}</span>
              </div>
            \`;
          }).join('')}
        </div>
        
        <!-- 加权公式说明 -->
        <div class="mt-4 pt-4 border-t">
          <p class="text-xs text-gray-500 mb-2">
            <i class="fas fa-calculator mr-1"></i>
            加权计算公式
          </p>
          <div class="text-xs text-gray-400 space-y-1">
            \${Object.entries(weights).map(([id, weight]) => {
              const agent = demoAgents.find(a => a.id === id);
              return \`<div>\${agent?.dimension || id}: \${scores[id] || 0} × \${weight}%</div>\`;
            }).join('')}
            <div class="font-medium text-gray-600 mt-2">= \${finalScore} 分</div>
          </div>
        </div>
      \`;

      document.getElementById('final-status').textContent = '评分完成';
      document.getElementById('final-status').className = 'text-sm text-green-600';
      updateStep(4, 'complete');

      // 显示投资建议
      const recSection = document.getElementById('recommendation-section');
      recSection.classList.remove('hidden');
      recSection.querySelector('.bg-gradient-to-r').className = \`bg-gradient-to-r from-\${gradeColor}-500 to-\${gradeColor === 'green' ? 'emerald' : gradeColor}-600 rounded-xl p-6 text-white\`;
      
      document.getElementById('rec-title').textContent = grade === 'A' || grade === 'B+' ? '✅ 建议投资' : grade === 'B' ? '⚠️ 可考虑投资' : '❌ 建议谨慎';
      document.getElementById('rec-detail').textContent = 'Cardi B 2026中国巡演项目整体评估良好，IRR预期35%，回收期5个月，符合投资标准。';
      document.getElementById('rec-score').textContent = finalScore;
      document.getElementById('rec-grade').textContent = grade + '级';
      
      // 从评估结果中提取优势和风险
      const strengths = [];
      const risks = [];
      
      Object.values(evaluationResults).forEach((r) => {
        if (r.result?.findings) {
          r.result.findings.forEach(f => {
            if (f.includes('优') || f.includes('强') || f.includes('好') || f.includes('完善') || f.includes('齐全')) {
              strengths.push(f);
            } else if (f.includes('风险') || f.includes('缺') || f.includes('不足') || f.includes('需要') || f.includes('关注')) {
              risks.push(f);
            }
          });
        }
      });
      
      document.getElementById('rec-strengths').innerHTML = (strengths.length > 0 ? strengths.slice(0, 3) : [
        '首次中国巡演，市场稀缺性强',
        '三城联动分散风险',
        '运营方经验丰富'
      ]).map(s => \`<li>• \${s.substring(0, 30)}\${s.length > 30 ? '...' : ''}</li>\`).join('');
      
      document.getElementById('rec-risks').innerHTML = (risks.length > 0 ? risks.slice(0, 3) : [
        '艺人取消风险需关注',
        '票房预测依赖市场反应',
        '涉外审批进度需跟踪'
      ]).map(r => \`<li>• \${r.substring(0, 30)}\${r.length > 30 ? '...' : ''}</li>\`).join('');

      document.getElementById('overall-status').textContent = '评估完成';
      showToast('评估完成！综合评分：' + finalScore + '分', 'success');

    } catch (error) {
      showToast('评估过程出错：' + error.message, 'error');
      document.getElementById('overall-status').textContent = '评估出错';
    } finally {
      isRunning = false;
      document.getElementById('btn-start').disabled = false;
      document.getElementById('btn-start').innerHTML = '<i class="fas fa-play mr-2"></i>重新评估';
    }
  }

  // 更新雷达图
  function updateRadarChart(scores) {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    
    if (radarChart) {
      radarChart.destroy();
    }

    const labels = ['财务健康', '运营能力', '法律合规', '风险控制', '利益一致', '经济性'];
    const data = [
      scores['financial-health-agent'] || 0,
      scores['operational-capability-agent'] || 0,
      scores['legal-compliance-agent'] || 0,
      scores['risk-control-agent'] || 0,
      scores['interest-deep-agent'] || 0,
      scores['economic-calculation-agent'] || 0
    ];

    radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '评分',
          data: data,
          fill: true,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)',
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(99, 102, 241)'
        }]
      },
      options: {
        elements: {
          line: { borderWidth: 2 }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // 重置演示
  function resetDemo() {
    location.reload();
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ESC关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
    }
  });

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadDemoAgents, 500);
  });
</script>
`
