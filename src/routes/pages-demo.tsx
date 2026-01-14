// Demo演示页面 - demo.html
export const demoPageContent = `
<!-- 页面标题 -->
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">Cardi B 演唱会项目演示</h1>
    <p class="text-gray-500">完整展示多智能体评估流程 · <span class="text-primary-600">含详细推理过程</span></p>
  </div>
  <div class="flex space-x-2">
    <button onclick="toggleExplanationMode()" id="btn-explain" class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition">
      <i class="fas fa-lightbulb mr-2"></i><span id="explain-text">显示解释</span>
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
          <span class="ml-2 text-xs text-gray-500">串行执行，任一不通过即终止</span>
        </h3>
        <span id="outer-status" class="text-sm text-gray-500">等待开始</span>
      </div>
      
      <!-- 外环流程说明 -->
      <div id="outer-explanation" class="mb-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100 hidden">
        <div class="flex items-start space-x-2">
          <i class="fas fa-info-circle text-red-500 mt-0.5"></i>
          <div class="text-sm text-gray-700">
            <p class="font-medium text-red-700 mb-1">外环筛选机制说明</p>
            <p>外环是"一票否决"机制，包含3个智能体依次检查：</p>
            <ul class="mt-1 space-y-0.5 text-gray-600">
              <li>• <b>负面清单</b>：检查是否涉及禁止投资领域（博彩、传销等）</li>
              <li>• <b>触达审核</b>：验证提交材料完整性（企业信息、财务数据等）</li>
              <li>• <b>利益一致性</b>：初步检查分配机制是否合理</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div id="outer-agents" class="space-y-3">
        <!-- 智能体卡片将动态加载 -->
      </div>
      
      <!-- 外环详细推理展示区 -->
      <div id="outer-reasoning-panel" class="mt-4 hidden">
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium text-gray-700 flex items-center">
              <i class="fas fa-brain text-purple-500 mr-2"></i>
              智能体推理过程
            </h4>
            <button onclick="toggleOuterReasoning()" class="text-xs text-primary-600 hover:text-primary-800">
              <span id="outer-toggle-text">收起</span> <i class="fas fa-chevron-up" id="outer-toggle-icon"></i>
            </button>
          </div>
          <div id="outer-reasoning-content" class="space-y-3">
            <!-- 推理详情动态加载 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 中环评估 -->
    <div id="inner-section" class="bg-white rounded-xl card-shadow p-6 opacity-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-bullseye text-blue-500 mr-2"></i>
          中环评估
          <span class="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">加权评分</span>
          <span class="ml-2 text-xs text-gray-500">并行执行，多维度深度分析</span>
        </h3>
        <span id="inner-status" class="text-sm text-gray-500">等待外环完成</span>
      </div>
      
      <!-- 中环流程说明 -->
      <div id="inner-explanation" class="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hidden">
        <div class="flex items-start space-x-2">
          <i class="fas fa-info-circle text-blue-500 mt-0.5"></i>
          <div class="text-sm text-gray-700">
            <p class="font-medium text-blue-700 mb-1">中环评估机制说明</p>
            <p>中环是"加权评分"机制，6个智能体并行评估后加权汇总：</p>
            <ul class="mt-1 grid grid-cols-2 gap-1 text-gray-600">
              <li>• <b>财务健康</b>（25%）</li>
              <li>• <b>运营能力</b>（20%）</li>
              <li>• <b>法律合规</b>（15%）</li>
              <li>• <b>风险控制</b>（15%）</li>
              <li>• <b>利益一致</b>（10%）</li>
              <li>• <b>经济测算</b>（10%）</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div id="inner-agents" class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- 智能体卡片将动态加载 -->
      </div>
      
      <!-- 中环详细推理展示区 -->
      <div id="inner-reasoning-panel" class="mt-4 hidden">
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-medium text-gray-700 flex items-center">
              <i class="fas fa-microscope text-blue-500 mr-2"></i>
              深度评估详情
            </h4>
            <div class="flex items-center space-x-3">
              <select id="inner-agent-filter" onchange="filterInnerReasoning()" class="text-xs border rounded px-2 py-1">
                <option value="all">全部维度</option>
                <option value="financial-health-agent">财务健康</option>
                <option value="operational-capability-agent">运营能力</option>
                <option value="legal-compliance-agent">法律合规</option>
                <option value="risk-control-agent">风险控制</option>
                <option value="interest-deep-agent">利益一致</option>
                <option value="economic-calculation-agent">经济测算</option>
              </select>
              <button onclick="toggleInnerReasoning()" class="text-xs text-primary-600 hover:text-primary-800">
                <span id="inner-toggle-text">收起</span> <i class="fas fa-chevron-up" id="inner-toggle-icon"></i>
              </button>
            </div>
          </div>
          <div id="inner-reasoning-content" class="space-y-3">
            <!-- 推理详情动态加载 -->
          </div>
        </div>
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
      <div id="rec-container" class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
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
              <h4 class="font-medium mb-2"><i class="fas fa-thumbs-up mr-1"></i>核心优势</h4>
              <ul id="rec-strengths" class="text-sm space-y-1 opacity-90"></ul>
            </div>
            <div>
              <h4 class="font-medium mb-2"><i class="fas fa-exclamation-triangle mr-1"></i>关注风险</h4>
              <ul id="rec-risks" class="text-sm space-y-1 opacity-90"></ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 评估过程总结 -->
      <div id="evaluation-summary" class="mt-4 bg-white rounded-xl card-shadow p-6">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-clipboard-list text-indigo-500 mr-2"></i>
          评估过程总结
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="p-3 bg-red-50 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-red-700">外环筛选</span>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded" id="summary-outer-status">3/3 通过</span>
            </div>
            <p class="text-xs text-gray-600" id="summary-outer-detail">负面清单、触达审核、利益一致性初筛全部通过</p>
          </div>
          <div class="p-3 bg-blue-50 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-blue-700">中环评估</span>
              <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded" id="summary-inner-status">6 维度</span>
            </div>
            <p class="text-xs text-gray-600" id="summary-inner-detail">6个维度深度评估完成，加权计算综合得分</p>
          </div>
          <div class="p-3 bg-purple-50 rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-purple-700">综合评定</span>
              <span class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded" id="summary-total-time">--</span>
            </div>
            <p class="text-xs text-gray-600" id="summary-total-detail">综合评分加权汇总，生成投资建议</p>
          </div>
        </div>
        
        <!-- 详细时间线 -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <p class="text-xs font-medium text-gray-600 mb-3">评估时间线</p>
          <div id="evaluation-timeline" class="space-y-2">
            <!-- 时间线动态生成 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  let demoAgents = [];
  let radarChart = null;
  let isRunning = false;
  let showExplanations = true;  // 默认显示解释
  let outerReasoningData = [];  // 外环推理数据
  let innerReasoningData = [];  // 中环推理数据
  let outerReasoningExpanded = true;
  let innerReasoningExpanded = true;
  
  // 切换解释模式
  function toggleExplanationMode() {
    showExplanations = !showExplanations;
    const btn = document.getElementById('btn-explain');
    const text = document.getElementById('explain-text');
    
    if (showExplanations) {
      btn.className = 'px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition';
      text.textContent = '显示解释';
      document.getElementById('outer-explanation')?.classList.remove('hidden');
      document.getElementById('inner-explanation')?.classList.remove('hidden');
      if (outerReasoningData.length > 0) {
        document.getElementById('outer-reasoning-panel')?.classList.remove('hidden');
      }
      if (innerReasoningData.length > 0) {
        document.getElementById('inner-reasoning-panel')?.classList.remove('hidden');
      }
    } else {
      btn.className = 'px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition';
      text.textContent = '隐藏解释';
      document.getElementById('outer-explanation')?.classList.add('hidden');
      document.getElementById('inner-explanation')?.classList.add('hidden');
      document.getElementById('outer-reasoning-panel')?.classList.add('hidden');
      document.getElementById('inner-reasoning-panel')?.classList.add('hidden');
    }
  }
  
  // 切换外环推理展开/折叠
  function toggleOuterReasoning() {
    outerReasoningExpanded = !outerReasoningExpanded;
    const content = document.getElementById('outer-reasoning-content');
    const text = document.getElementById('outer-toggle-text');
    const icon = document.getElementById('outer-toggle-icon');
    
    if (outerReasoningExpanded) {
      content.classList.remove('hidden');
      text.textContent = '收起';
      icon.className = 'fas fa-chevron-up';
    } else {
      content.classList.add('hidden');
      text.textContent = '展开';
      icon.className = 'fas fa-chevron-down';
    }
  }
  
  // 切换中环推理展开/折叠
  function toggleInnerReasoning() {
    innerReasoningExpanded = !innerReasoningExpanded;
    const content = document.getElementById('inner-reasoning-content');
    const text = document.getElementById('inner-toggle-text');
    const icon = document.getElementById('inner-toggle-icon');
    
    if (innerReasoningExpanded) {
      content.classList.remove('hidden');
      text.textContent = '收起';
      icon.className = 'fas fa-chevron-up';
    } else {
      content.classList.add('hidden');
      text.textContent = '展开';
      icon.className = 'fas fa-chevron-down';
    }
  }
  
  // 筛选中环推理
  function filterInnerReasoning() {
    const filter = document.getElementById('inner-agent-filter').value;
    renderInnerReasoningPanel(filter);
  }
  
  // 渲染外环推理面板
  function renderOuterReasoningPanel() {
    const container = document.getElementById('outer-reasoning-content');
    if (!container || outerReasoningData.length === 0) return;
    
    container.innerHTML = outerReasoningData.map((item, idx) => {
      const agent = demoAgents.find(a => a.id === item.agentId);
      const passClass = item.pass ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50';
      const statusIcon = item.pass ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500';
      const statusText = item.pass ? '通过' : '未通过';
      
      // 解析findings
      let findingsHtml = '';
      if (item.result?.findings && item.result.findings.length > 0) {
        findingsHtml = '<div class="mt-2"><p class="text-xs font-medium text-gray-600 mb-1">关键发现：</p><ul class="text-xs text-gray-600 space-y-0.5">' + 
          item.result.findings.slice(0, 5).map(f => '<li class="flex items-start"><i class="fas fa-caret-right text-gray-400 mr-1 mt-0.5"></i>' + escapeHtml(f) + '</li>').join('') + 
          '</ul></div>';
      }
      
      // 风险等级标签
      let riskBadge = '';
      if (item.result?.risk_level) {
        const riskColors = { low: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-700', high: 'bg-red-100 text-red-700' };
        const riskLabels = { low: '低风险', medium: '中风险', high: '高风险' };
        riskBadge = '<span class="ml-2 px-2 py-0.5 text-xs rounded ' + (riskColors[item.result.risk_level] || riskColors.medium) + '">' + (riskLabels[item.result.risk_level] || '中风险') + '</span>';
      }
      
      return \`
        <div class="border rounded-lg p-3 \${passClass} transition-all duration-300">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 rounded flex items-center justify-center" style="background: \${agent?.icon_color}20">
                <i class="\${agent?.icon} text-xs" style="color: \${agent?.icon_color}"></i>
              </div>
              <span class="font-medium text-sm">\${agent?.name || item.agentId}</span>
              \${riskBadge}
            </div>
            <div class="flex items-center space-x-2">
              <span class="font-mono font-bold text-sm">\${item.result?.score || 0}分</span>
              <i class="fas \${statusIcon}"></i>
            </div>
          </div>
          <div class="text-sm text-gray-700 leading-relaxed">
            <p class="font-medium text-gray-800 mb-1"><i class="fas fa-lightbulb text-yellow-500 mr-1"></i>推理依据：</p>
            <p class="text-gray-600 text-xs">\${escapeHtml(item.result?.reasoning || '无详细说明')}</p>
          </div>
          \${findingsHtml}
          <div class="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span><i class="fas fa-clock mr-1"></i>耗时 \${item.executionTime}ms</span>
            <span class="flex items-center"><i class="fas \${statusIcon} mr-1"></i>\${statusText} | 阈值 \${agent?.pass_threshold || 60}分</span>
          </div>
        </div>
      \`;
    }).join('');
    
    // 显示面板
    if (showExplanations) {
      document.getElementById('outer-reasoning-panel')?.classList.remove('hidden');
    }
  }
  
  // 渲染中环推理面板
  function renderInnerReasoningPanel(filter = 'all') {
    const container = document.getElementById('inner-reasoning-content');
    if (!container || innerReasoningData.length === 0) return;
    
    const filteredData = filter === 'all' ? innerReasoningData : innerReasoningData.filter(d => d.agentId === filter);
    
    container.innerHTML = filteredData.map((item, idx) => {
      const agent = demoAgents.find(a => a.id === item.agentId);
      const score = item.result?.score || 0;
      const scoreColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-blue-600' : 'text-red-600';
      const scoreBg = score >= 80 ? 'bg-green-50 border-green-200' : score >= 60 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200';
      
      // 解析详细分数
      let subScoresHtml = '';
      if (item.result?.scores) {
        subScoresHtml = '<div class="mt-2 grid grid-cols-2 gap-1">' + 
          Object.entries(item.result.scores).map(([key, val]) => 
            '<div class="flex justify-between text-xs"><span class="text-gray-500">' + formatScoreKey(key) + '</span><span class="font-mono">' + val + '</span></div>'
          ).join('') + '</div>';
      }
      
      // 解析发现
      let findingsHtml = '';
      if (item.result?.findings && item.result.findings.length > 0) {
        findingsHtml = '<div class="mt-2"><p class="text-xs font-medium text-gray-600 mb-1">🔍 深度发现：</p><ul class="text-xs text-gray-600 space-y-0.5">' + 
          item.result.findings.slice(0, 5).map(f => '<li class="flex items-start"><i class="fas fa-check text-green-400 mr-1 mt-0.5 text-xs"></i>' + escapeHtml(f) + '</li>').join('') + 
          '</ul></div>';
      }
      
      // 风险点
      let risksHtml = '';
      if (item.result?.risk_points && item.result.risk_points.length > 0) {
        risksHtml = '<div class="mt-2"><p class="text-xs font-medium text-gray-600 mb-1">⚠️ 风险关注：</p><ul class="text-xs text-gray-600 space-y-0.5">' + 
          item.result.risk_points.slice(0, 3).map(r => '<li class="flex items-start"><i class="fas fa-exclamation-triangle text-orange-400 mr-1 mt-0.5 text-xs"></i>' + escapeHtml(r) + '</li>').join('') + 
          '</ul></div>';
      }
      
      // 建议
      let suggestionHtml = '';
      if (item.result?.suggestion || item.result?.recommendation) {
        suggestionHtml = '<div class="mt-2 p-2 bg-gray-100 rounded text-xs"><i class="fas fa-lightbulb text-yellow-500 mr-1"></i><b>建议：</b>' + 
          escapeHtml(item.result?.suggestion || item.result?.recommendation) + '</div>';
      }
      
      return \`
        <div class="border rounded-lg p-3 \${scoreBg} transition-all duration-300" data-agent-id="\${item.agentId}">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background: \${agent?.icon_color}30">
                <i class="\${agent?.icon}" style="color: \${agent?.icon_color}"></i>
              </div>
              <div>
                <span class="font-medium text-sm">\${agent?.dimension || agent?.name || item.agentId}</span>
                <p class="text-xs text-gray-500">权重 \${agent?.weight || 0}%</p>
              </div>
            </div>
            <div class="text-right">
              <div class="font-mono font-bold text-xl \${scoreColor}">\${score}</div>
              <div class="text-xs text-gray-500">/ 100分</div>
            </div>
          </div>
          
          <!-- 评分进度条 -->
          <div class="w-full h-2 bg-gray-200 rounded-full mb-3">
            <div class="h-full rounded-full transition-all duration-500 \${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-blue-500' : 'bg-red-500'}" style="width: \${score}%"></div>
          </div>
          
          <div class="text-sm text-gray-700 leading-relaxed">
            <p class="text-gray-600 text-xs">\${escapeHtml(item.result?.reasoning || '无详细说明')}</p>
          </div>
          
          \${subScoresHtml}
          \${findingsHtml}
          \${risksHtml}
          \${suggestionHtml}
          
          <div class="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
            <span><i class="fas fa-clock mr-1"></i>耗时 \${item.executionTime}ms</span>
            <span>贡献加权分: \${(score * (agent?.weight || 0) / 100).toFixed(1)}分</span>
          </div>
        </div>
      \`;
    }).join('');
    
    // 显示面板
    if (showExplanations) {
      document.getElementById('inner-reasoning-panel')?.classList.remove('hidden');
    }
  }
  
  // 辅助函数：转义HTML
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // 辅助函数：格式化分数key
  function formatScoreKey(key) {
    const keyMap = {
      'profitability': '盈利能力',
      'cash_flow': '现金流',
      'debt_ratio': '负债率',
      'experience': '经验',
      'team': '团队',
      'compliance': '合规性',
      'contracts': '合同',
      'market_risk': '市场风险',
      'operational_risk': '运营风险'
    };
    return keyMap[key] || key;
  }

  // 加载智能体
  async function loadDemoAgents() {
    try {
      const { data } = await apiCall('/api/agents');
      demoAgents = data;
      renderAgentCards();
    } catch (e) {}
  }

  // 渲染智能体卡片
  function renderAgentCards() {
    const outerAgents = demoAgents.filter(a => a.ring_type === 'outer');
    const innerAgents = demoAgents.filter(a => a.ring_type === 'inner' && a.id !== 'comprehensive-scoring-agent');

    document.getElementById('outer-agents').innerHTML = outerAgents.map(agent => \`
      <div id="agent-\${agent.id}" class="agent-card flex flex-col p-4 bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-md" onclick="scrollToAgentReasoning('\${agent.id}', 'outer')">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-medium">\${agent.name}</h4>
              <p class="text-xs text-gray-500">\${agent.dimension}</p>
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
          </div>
        </div>
        <!-- 简短摘要区 -->
        <div id="summary-\${agent.id}" class="mt-2 pt-2 border-t border-gray-200 hidden">
          <p class="text-xs text-gray-600 line-clamp-2"></p>
          <span class="text-xs text-primary-500 hover:text-primary-700 mt-1 inline-block">
            <i class="fas fa-chevron-down mr-1"></i>查看完整分析
          </span>
        </div>
      </div>
    \`).join('');

    document.getElementById('inner-agents').innerHTML = innerAgents.map(agent => \`
      <div id="agent-\${agent.id}" class="agent-card flex flex-col p-3 bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-md" onclick="scrollToAgentReasoning('\${agent.id}', 'inner')">
        <div class="flex items-center justify-between">
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
          </div>
        </div>
        <!-- 简短摘要区 -->
        <div id="summary-\${agent.id}" class="mt-2 pt-2 border-t border-gray-200 hidden">
          <p class="text-xs text-gray-600 line-clamp-2"></p>
          <span class="text-xs text-primary-500 hover:text-primary-700 mt-1 inline-block">
            <i class="fas fa-eye mr-1"></i>详情
          </span>
        </div>
      </div>
    \`).join('');
    
    // 显示外环说明（默认显示）
    if (showExplanations) {
      document.getElementById('outer-explanation')?.classList.remove('hidden');
    }
  }
  
  // 滚动到对应智能体的推理详情
  function scrollToAgentReasoning(agentId, ringType) {
    const data = ringType === 'outer' ? outerReasoningData : innerReasoningData;
    if (data.length === 0) return;
    
    if (ringType === 'inner') {
      // 设置筛选器
      document.getElementById('inner-agent-filter').value = agentId;
      filterInnerReasoning();
    }
    
    // 确保面板展开
    const panel = document.getElementById(ringType + '-reasoning-panel');
    if (panel) {
      panel.classList.remove('hidden');
      if (ringType === 'outer') {
        outerReasoningExpanded = true;
        document.getElementById('outer-reasoning-content')?.classList.remove('hidden');
      } else {
        innerReasoningExpanded = true;
        document.getElementById('inner-reasoning-content')?.classList.remove('hidden');
      }
      
      // 滚动到面板
      setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }
  
  // 更新智能体简短摘要
  function updateAgentSummary(agentId, reasoning) {
    const summaryEl = document.getElementById('summary-' + agentId);
    if (summaryEl && reasoning) {
      const p = summaryEl.querySelector('p');
      if (p) {
        // 截取前80个字符作为摘要
        p.textContent = reasoning.length > 80 ? reasoning.substring(0, 80) + '...' : reasoning;
      }
      summaryEl.classList.remove('hidden');
    }
  }

  // 更新智能体状态
  function updateAgentStatus(agentId, status, score = null) {
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
    } else if (status === 'pass') {
      statusEl.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-green-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      if (progressEl) progressEl.querySelector('div').style.width = '100%';
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-green-600';
      }
    } else if (status === 'fail') {
      statusEl.innerHTML = '<i class="fas fa-times text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-red-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-red-600';
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
    
    // 重置推理数据
    outerReasoningData = [];
    innerReasoningData = [];
    
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-start').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>评估中...';
    document.getElementById('overall-status').textContent = '正在评估...';
    document.getElementById('recommendation-section').classList.add('hidden');
    document.getElementById('outer-reasoning-panel')?.classList.add('hidden');
    document.getElementById('inner-reasoning-panel')?.classList.add('hidden');

    try {
      // 步骤2：外环筛选
      updateStep(2, 'active');
      document.getElementById('outer-section').classList.remove('opacity-50');
      document.getElementById('outer-status').textContent = '执行中...';
      document.getElementById('outer-status').className = 'text-sm text-primary-600';
      
      // 显示外环说明
      if (showExplanations) {
        document.getElementById('outer-explanation')?.classList.remove('hidden');
      }

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
        const reasoning = response.data.result?.reasoning || '';
        
        // 保存推理数据
        outerReasoningData.push({
          agentId: agentId,
          agentName: response.data.agentName,
          pass: pass,
          result: response.data.result,
          executionTime: response.data.executionTime
        });
        
        // 渲染外环推理面板
        renderOuterReasoningPanel();
        
        // 更新智能体摘要
        updateAgentSummary(agentId, reasoning);
        
        updateAgentStatus(agentId, pass ? 'pass' : 'fail', score);
        
        if (!pass) {
          document.getElementById('outer-status').textContent = '未通过';
          document.getElementById('outer-status').className = 'text-sm text-red-600';
          updateStep(2, 'error');
          document.getElementById('overall-status').textContent = '外环筛选未通过';
          showToast('外环筛选未通过：' + reasoning, 'error');
          return;
        }
      }

      document.getElementById('outer-status').textContent = '全部通过 ✓';
      document.getElementById('outer-status').className = 'text-sm text-green-600 font-medium';
      updateStep(2, 'complete');

      // 步骤3：中环评估
      updateStep(3, 'active');
      document.getElementById('inner-section').classList.remove('opacity-50');
      document.getElementById('inner-status').textContent = '并行评估中...';
      document.getElementById('inner-status').className = 'text-sm text-primary-600';
      
      // 显示中环说明
      if (showExplanations) {
        document.getElementById('inner-explanation')?.classList.remove('hidden');
      }

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
        const reasoning = r.result?.reasoning || '';
        scores[r.agentId] = score;
        
        // 保存中环推理数据
        innerReasoningData.push({
          agentId: r.agentId,
          agentName: r.agentName,
          pass: r.pass,
          result: r.result,
          executionTime: r.executionTime
        });
        
        // 更新智能体摘要
        updateAgentSummary(r.agentId, reasoning);
        
        updateAgentStatus(r.agentId, r.pass ? 'pass' : 'fail', score);
      });
      
      // 渲染中环推理面板
      renderInnerReasoningPanel();

      document.getElementById('inner-status').textContent = '评估完成 ✓';
      document.getElementById('inner-status').className = 'text-sm text-green-600 font-medium';
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
        <div class="text-center mb-4">
          <div class="text-5xl font-bold text-\${gradeColor}-600 mb-2">\${finalScore}</div>
          <div class="text-2xl font-bold text-\${gradeColor}-500">\${grade}级</div>
          <p class="text-gray-500 mt-2">\${grade === 'A' ? '强烈推荐投资' : grade === 'B+' ? '推荐投资' : grade === 'B' ? '可以投资' : '谨慎投资'}</p>
        </div>
        
        <!-- 详细评分公式说明 -->
        <div class="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 mb-4">
          <p class="text-xs font-medium text-indigo-700 mb-2">
            <i class="fas fa-calculator mr-1"></i>加权评分计算过程
          </p>
          <div class="text-xs text-gray-600 space-y-1">
            \${Object.entries(scores).map(([id, score]) => {
              const agent = demoAgents.find(a => a.id === id);
              const weight = agent?.weight || 0;
              const contribution = (score * weight / 100).toFixed(1);
              return \`<div class="flex justify-between items-center">
                <span>\${agent?.dimension || id} × \${weight}%</span>
                <span class="font-mono">\${score} × 0.\${String(weight).padStart(2, '0')} = <b>\${contribution}</b></span>
              </div>\`;
            }).join('')}
            <div class="border-t border-indigo-200 pt-1 mt-1 flex justify-between font-medium text-indigo-700">
              <span>总计（加权平均）</span>
              <span class="font-mono">\${finalScore} 分</span>
            </div>
          </div>
        </div>
        
        <!-- 维度得分排名 -->
        <div class="space-y-2">
          <p class="text-xs font-medium text-gray-600 mb-2">各维度得分排名</p>
          \${Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .map(([id, score], idx) => {
              const agent = demoAgents.find(a => a.id === id);
              const barColor = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-blue-500' : 'bg-red-500';
              const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';
              return \`
                <div class="flex items-center space-x-2">
                  <span class="w-4 text-center">\${medal || (idx + 1)}</span>
                  <span class="text-xs text-gray-600 w-16 truncate">\${agent?.dimension || id}</span>
                  <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div class="\${barColor} h-full transition-all duration-500" style="width: \${score}%"></div>
                  </div>
                  <span class="font-mono text-xs font-medium w-8 text-right">\${score}</span>
                </div>
              \`;
            }).join('')}
        </div>
      \`;

      document.getElementById('final-status').textContent = '评分完成';
      document.getElementById('final-status').className = 'text-sm text-green-600';
      updateStep(4, 'complete');

      // 显示投资建议
      const recSection = document.getElementById('recommendation-section');
      recSection.classList.remove('hidden');
      document.getElementById('rec-container').className = \`bg-gradient-to-r from-\${gradeColor}-500 to-\${gradeColor === 'green' ? 'emerald' : gradeColor}-600 rounded-xl p-6 text-white\`;
      
      document.getElementById('rec-title').textContent = grade === 'A' || grade === 'B+' ? '✅ 建议投资' : grade === 'B' ? '⚠️ 可考虑投资' : '❌ 建议谨慎';
      document.getElementById('rec-detail').textContent = 'Cardi B 2026中国巡演项目整体评估良好，IRR预期35%，回收期5个月，符合投资标准。';
      document.getElementById('rec-score').textContent = finalScore;
      document.getElementById('rec-grade').textContent = grade + '级';
      
      // 从推理数据中提取优势和风险
      const strengths = [];
      const risks = [];
      
      innerReasoningData.forEach(item => {
        if (item.result?.findings) {
          item.result.findings.slice(0, 2).forEach(f => strengths.push(f));
        }
        if (item.result?.risk_points) {
          item.result.risk_points.slice(0, 1).forEach(r => risks.push(r));
        }
      });
      
      // 默认优势
      if (strengths.length === 0) {
        strengths.push('首次中国巡演，市场稀缺性强');
        strengths.push('三城联动分散风险');
        strengths.push('运营方经验丰富');
      }
      
      // 默认风险
      if (risks.length === 0) {
        risks.push('艺人取消风险需关注');
        risks.push('票房预测依赖市场反应');
        risks.push('涉外审批进度需跟踪');
      }
      
      document.getElementById('rec-strengths').innerHTML = strengths.slice(0, 4).map(s => 
        '<li>• ' + escapeHtml(s) + '</li>'
      ).join('');
      
      document.getElementById('rec-risks').innerHTML = risks.slice(0, 4).map(r => 
        '<li>• ' + escapeHtml(r) + '</li>'
      ).join('');
      
      // 更新评估总结
      const totalTime = outerReasoningData.reduce((sum, d) => sum + d.executionTime, 0) + 
                       innerReasoningData.reduce((sum, d) => sum + d.executionTime, 0);
      
      document.getElementById('summary-outer-status').textContent = outerReasoningData.filter(d => d.pass).length + '/' + outerReasoningData.length + ' 通过';
      document.getElementById('summary-outer-detail').textContent = outerReasoningData.map(d => {
        const agent = demoAgents.find(a => a.id === d.agentId);
        return (agent?.dimension || d.agentId) + (d.pass ? '✓' : '✗');
      }).join('、');
      
      const avgInnerScore = Math.round(innerReasoningData.reduce((sum, d) => sum + (d.result?.score || 0), 0) / innerReasoningData.length);
      document.getElementById('summary-inner-status').textContent = '均分 ' + avgInnerScore;
      document.getElementById('summary-inner-detail').textContent = '最高分: ' + 
        Math.max(...innerReasoningData.map(d => d.result?.score || 0)) + '分 | 最低分: ' + 
        Math.min(...innerReasoningData.map(d => d.result?.score || 0)) + '分';
      
      document.getElementById('summary-total-time').textContent = (totalTime / 1000).toFixed(1) + 's';
      document.getElementById('summary-total-detail').textContent = '综合得分 ' + finalScore + '分，' + 
        (grade === 'A' ? '强烈推荐' : grade === 'B+' ? '推荐投资' : grade === 'B' ? '可以投资' : '谨慎投资');
      
      // 生成时间线
      const timeline = [];
      outerReasoningData.forEach((d, idx) => {
        const agent = demoAgents.find(a => a.id === d.agentId);
        timeline.push({
          time: d.executionTime,
          name: agent?.name || d.agentId,
          type: 'outer',
          pass: d.pass,
          score: d.result?.score
        });
      });
      innerReasoningData.forEach((d, idx) => {
        const agent = demoAgents.find(a => a.id === d.agentId);
        timeline.push({
          time: d.executionTime,
          name: agent?.dimension || d.agentId,
          type: 'inner',
          pass: d.pass,
          score: d.result?.score
        });
      });
      
      document.getElementById('evaluation-timeline').innerHTML = timeline.map((t, idx) => {
        const typeColor = t.type === 'outer' ? 'red' : 'blue';
        const statusIcon = t.pass ? 'fa-check text-green-500' : 'fa-times text-red-500';
        return \`
          <div class="flex items-center space-x-3 text-xs">
            <span class="w-6 h-6 rounded-full bg-\${typeColor}-100 text-\${typeColor}-600 flex items-center justify-center font-mono">\${idx + 1}</span>
            <span class="flex-1 text-gray-700">\${t.name}</span>
            <span class="font-mono text-gray-500">\${t.time}ms</span>
            <span class="font-mono font-bold">\${t.score}分</span>
            <i class="fas \${statusIcon}"></i>
          </div>
        \`;
      }).join('');

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
    // 重置数据
    outerReasoningData = [];
    innerReasoningData = [];
    isRunning = false;
    
    // 重新加载页面
    location.reload();
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadDemoAgents, 500);
  });
</script>
`
