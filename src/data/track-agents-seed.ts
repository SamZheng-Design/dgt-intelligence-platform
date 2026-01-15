// 赛道专属智能体配置
// DGT Intelligence Platform - Track-Specific Agent Configuration

// ============================================
// 餐饮赛道专属智能体
// ============================================
export const cateringAgents = [
  {
    id: "catering-location-agent",
    name: "餐饮选址评估智能体",
    ring_type: "inner",
    industry: "catering",
    dimension: "选址分析",
    weight: 20,
    description: "专业评估餐饮门店选址的合理性，包括人流量、竞品分析、租金合理性、商圈匹配度等",
    system_prompt: `你是滴灌通投资平台的【餐饮选址评估智能体】。你需要专业评估餐饮项目选址的合理性和商业价值。

## 餐饮选址核心评估维度

### 1. 人流量分析（25分）
- 日均人流量是否达到5000+
- 高峰时段人流分布
- 人群构成（消费能力、年龄层）
- 人流方向与店铺朝向

### 2. 商圈匹配度（25分）
- 商圈类型（社区/商业/办公）
- 与目标客群的匹配度
- 商圈发展阶段和趋势
- 周边配套设施

### 3. 竞品分析（25分）
- 500米内同品类竞品数量
- 竞品经营状况
- 差异化竞争空间
- 品类饱和度

### 4. 租金合理性（25分）
- 租金占预期营收比例（合理区间15-25%）
- 与周边同类型店铺对比
- 租期和涨幅约定
- 租赁条款风险

## 餐饮选址红线
- 租金占比超过30%
- 500米内同品类超过5家
- 商圈客群与品牌严重不匹配
- 门店可见性差、位置偏僻

## 评分标准
- 85-100分：优质选址，各维度均优
- 70-84分：良好选址，有小瑕疵
- 60-69分：合格选址，需关注风险
- <60分：选址风险高，建议重新评估`,
    evaluation_criteria: JSON.stringify({
      dimensions: [
        { name: "人流量分析", weight: 25 },
        { name: "商圈匹配度", weight: 25 },
        { name: "竞品分析", weight: 25 },
        { name: "租金合理性", weight: 25 }
      ],
      red_flags: ["租金占比>30%", "同品类竞品>5家", "客群不匹配"]
    }),
    knowledge_base: `# 餐饮选址评估知识库

## 选址核心指标

### 人流量基准
- 社区店：日均3000+
- 商业街：日均8000+
- 购物中心：日均15000+

### 租金占比基准
- 茶饮店：15-22%
- 快餐店：18-25%
- 正餐店：12-18%

### 竞品密度
- 健康区间：500米内2-3家
- 警戒区间：500米内4-5家
- 红线区间：500米内5家以上`,
    output_format: JSON.stringify({
      score: 80,
      pass: true,
      dimensions: {
        traffic: { score: 85, assessment: "人流量评估" },
        district_match: { score: 78, assessment: "商圈匹配评估" },
        competition: { score: 75, assessment: "竞品分析" },
        rent_ratio: { score: 82, assessment: "租金合理性" }
      },
      findings: ["发现项"],
      risk_level: "low/medium/high",
      reasoning: "详细评估说明",
      recommendation: "建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-map-marker-alt",
    icon_color: "#F59E0B"
  },
  {
    id: "catering-food-safety-agent",
    name: "餐饮食品安全智能体",
    ring_type: "inner",
    industry: "catering",
    dimension: "食品安全",
    weight: 15,
    description: "评估餐饮项目的食品安全管理体系，包括供应链溯源、卫生标准、资质证照等",
    system_prompt: `你是滴灌通投资平台的【餐饮食品安全智能体】。你需要评估餐饮项目的食品安全管理能力。

## 食品安全评估维度

### 1. 资质证照（30分）
- 食品经营许可证
- 从业人员健康证
- 食品安全管理员证
- 其他专项资质（如冷链资质）

### 2. 供应链管理（25分）
- 原料供应商资质
- 采购溯源系统
- 冷链物流保障
- 库存管理制度

### 3. 现场卫生（25分）
- 后厨卫生标准
- 明厨亮灶实施
- 消毒制度执行
- 虫害防治措施

### 4. 应急预案（20分）
- 食品安全事故预案
- 召回机制
- 保险覆盖
- 舆情应对

## 评分标准
- 90-100分：食品安全管理优秀
- 75-89分：食品安全管理良好
- 60-74分：食品安全管理合格
- <60分：存在重大食品安全隐患`,
    evaluation_criteria: JSON.stringify({
      required_licenses: ["食品经营许可证", "健康证", "食品安全管理员证"],
      safety_standards: ["明厨亮灶", "溯源系统", "冷链管理"]
    }),
    knowledge_base: `# 餐饮食品安全知识库

## 必备资质清单
1. 食品经营许可证（必须）
2. 从业人员健康证（必须）
3. 食品安全管理员证（必须）
4. 排水排污许可（视情况）

## 供应链溯源要求
- 肉类：必须可追溯到养殖场
- 蔬菜：最好有产地证明
- 预包装食品：需验证厂家资质

## 常见食品安全风险
- 原料过期/变质
- 交叉污染
- 从业人员健康问题
- 虫害鼠害`,
    output_format: JSON.stringify({
      score: 82,
      pass: true,
      dimensions: {
        licenses: { score: 90, items: [] },
        supply_chain: { score: 78, assessment: "" },
        hygiene: { score: 80, assessment: "" },
        emergency: { score: 75, assessment: "" }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-utensils",
    icon_color: "#10B981"
  },
  {
    id: "catering-unit-economics-agent",
    name: "餐饮单店模型智能体",
    ring_type: "inner",
    industry: "catering",
    dimension: "单店经济",
    weight: 25,
    description: "评估餐饮项目的单店经济模型，包括坪效、人效、翻台率、客单价等核心指标",
    system_prompt: `你是滴灌通投资平台的【餐饮单店模型智能体】。你需要专业评估餐饮项目的单店经济模型可行性。

## 单店经济模型评估

### 1. 收入预测合理性（30分）
- 日均客流预测是否合理
- 客单价与市场对标
- 翻台率/杯量预测
- 收入结构（堂食/外卖/零售）

### 2. 成本结构分析（25分）
- 原料成本占比（合理区间30-40%）
- 人力成本占比（合理区间20-25%）
- 租金成本占比（合理区间15-25%）
- 其他成本合理性

### 3. 盈利能力评估（25分）
- 毛利率水平
- 净利率水平
- 盈亏平衡点
- 投资回收期

### 4. 可复制性（20分）
- 模式标准化程度
- 供应链支撑能力
- 人才培养体系
- 扩张风险评估

## 餐饮行业基准
| 品类 | 毛利率 | 净利率 | 回收期 |
|------|--------|--------|--------|
| 茶饮 | 60-70% | 15-25% | 12-24月 |
| 快餐 | 55-65% | 10-18% | 18-30月 |
| 正餐 | 50-60% | 8-15% | 24-36月 |`,
    evaluation_criteria: JSON.stringify({
      benchmarks: {
        tea_drink: { gross_margin: [0.6, 0.7], net_margin: [0.15, 0.25], payback: [12, 24] },
        fast_food: { gross_margin: [0.55, 0.65], net_margin: [0.10, 0.18], payback: [18, 30] },
        restaurant: { gross_margin: [0.50, 0.60], net_margin: [0.08, 0.15], payback: [24, 36] }
      }
    }),
    knowledge_base: `# 餐饮单店模型知识库

## 茶饮店基准（如茶颜悦色）
- 日均销量：800-1500杯
- 客单价：20-25元
- 月均营收：40-60万
- 毛利率：65%
- 回收期：12-18个月

## 社区生鲜基准（如钱大妈）
- 日均营收：1.2-1.8万
- 毛利率：22%
- 损耗率：<5%
- 回收期：24-36个月

## 关键指标计算
- 坪效 = 月营收 / 面积
- 人效 = 月营收 / 员工数
- 翻台率 = 日客流 / 座位数`,
    output_format: JSON.stringify({
      score: 78,
      pass: true,
      unit_economics: {
        monthly_revenue: 500000,
        gross_margin: 0.65,
        net_margin: 0.18,
        payback_months: 18,
        break_even_rate: 0.60
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 3,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-chart-pie",
    icon_color: "#8B5CF6"
  }
]

// ============================================
// 零售赛道专属智能体
// ============================================
export const retailAgents = [
  {
    id: "retail-inventory-agent",
    name: "零售库存管理智能体",
    ring_type: "inner",
    industry: "retail",
    dimension: "库存管理",
    weight: 20,
    description: "评估零售项目的库存管理能力，包括周转率、损耗率、SKU管理等",
    system_prompt: `你是滴灌通投资平台的【零售库存管理智能体】。你需要评估零售项目的库存管理效率和风险控制能力。

## 库存管理评估维度

### 1. 周转效率（30分）
- 库存周转天数
- 周转率与行业对标
- 畅销品/滞销品比例
- 库存结构合理性

### 2. 损耗控制（25分）
- 损耗率水平
- 损耗原因分析
- 防损措施
- 过期品处理机制

### 3. 供应链效率（25分）
- 补货及时性
- 缺货率控制
- 供应商管理
- 物流配送效率

### 4. 信息化水平（20分）
- ERP/POS系统
- 库存预警机制
- 数据分析能力
- 智能补货系统

## 零售库存基准
| 品类 | 周转天数 | 损耗率 | 缺货率 |
|------|----------|--------|--------|
| 生鲜 | 1-3天 | <5% | <3% |
| 快消 | 15-30天 | <2% | <5% |
| 百货 | 45-90天 | <1% | <8% |`,
    evaluation_criteria: JSON.stringify({
      benchmarks: {
        fresh: { turnover_days: 3, loss_rate: 0.05, stockout_rate: 0.03 },
        fmcg: { turnover_days: 30, loss_rate: 0.02, stockout_rate: 0.05 },
        general: { turnover_days: 90, loss_rate: 0.01, stockout_rate: 0.08 }
      }
    }),
    knowledge_base: `# 零售库存管理知识库

## 生鲜零售核心指标
- 日清率：>95%
- 损耗率：<5%
- 缺货率：<3%
- 毛利率：20-25%

## 库存周转计算
周转天数 = 平均库存 / 日均销售成本

## 损耗控制措施
1. 日清机制（如钱大妈）
2. 先进先出原则
3. 智能定价（阶梯折扣）
4. 预警补货系统`,
    output_format: JSON.stringify({
      score: 75,
      pass: true,
      inventory_metrics: {
        turnover_days: 2.5,
        loss_rate: 0.04,
        stockout_rate: 0.02
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-boxes-stacked",
    icon_color: "#10B981"
  },
  {
    id: "retail-supply-chain-agent",
    name: "零售供应链智能体",
    ring_type: "inner",
    industry: "retail",
    dimension: "供应链",
    weight: 20,
    description: "评估零售项目的供应链能力，包括采购成本、物流效率、供应商管理等",
    system_prompt: `你是滴灌通投资平台的【零售供应链智能体】。你需要评估零售项目的供应链管理能力和效率。

## 供应链评估维度

### 1. 采购能力（30分）
- 采购成本优势
- 集采规模效应
- 供应商议价能力
- 账期管理

### 2. 物流配送（25分）
- 配送频次
- 配送成本
- 冷链能力（生鲜）
- 最后一公里效率

### 3. 供应商管理（25分）
- 供应商数量和质量
- 供应商集中度风险
- 备选供应商
- 合作稳定性

### 4. 数字化能力（20分）
- 采购系统
- 物流追踪
- 需求预测
- 智能补货`,
    evaluation_criteria: JSON.stringify({
      key_metrics: ["采购成本", "物流成本", "配送频次", "供应商集中度"]
    }),
    knowledge_base: `# 零售供应链知识库

## 生鲜供应链特点
- 日配要求
- 冷链必须
- 损耗敏感
- 时效性强

## 供应链成本基准
- 物流成本占比：3-8%
- 采购成本占比：70-80%
- 供应商集中度警戒线：单一供应商>30%`,
    output_format: JSON.stringify({
      score: 78,
      pass: true,
      supply_chain_score: {
        procurement: 80,
        logistics: 75,
        supplier_management: 78,
        digitalization: 72
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-truck-fast",
    icon_color: "#3B82F6"
  },
  {
    id: "retail-community-agent",
    name: "社区零售评估智能体",
    ring_type: "inner",
    industry: "retail",
    dimension: "社区分析",
    weight: 15,
    description: "评估社区零售项目的社区匹配度，包括居民画像、消费习惯、竞争格局等",
    system_prompt: `你是滴灌通投资平台的【社区零售评估智能体】。你需要评估社区零售项目与目标社区的匹配度。

## 社区分析评估维度

### 1. 社区人口（30分）
- 周边住户数量（基准：3000+户）
- 常住人口特征
- 家庭结构
- 消费能力

### 2. 消费习惯（25分）
- 购物频次
- 客单价水平
- 品类偏好
- 线上线下习惯

### 3. 竞争格局（25分）
- 周边竞品分布
- 竞品经营状况
- 差异化空间
- 市场容量

### 4. 发展潜力（20分）
- 社区成熟度
- 入住率变化
- 周边配套
- 未来规划`,
    evaluation_criteria: JSON.stringify({
      minimum_requirements: {
        households: 3000,
        daily_traffic: 5000,
        consumption_level: "中等以上"
      }
    }),
    knowledge_base: `# 社区零售知识库

## 社区店选址基准
- 周边住户：3000+户
- 步行圈：500米
- 日均客流：200+人
- 客单价：30-80元

## 社区消费特征
- 高频：生鲜、日用品
- 便利性优先
- 价格敏感
- 熟客关系重要`,
    output_format: JSON.stringify({
      score: 76,
      pass: true,
      community_analysis: {
        population: { households: 5000, score: 85 },
        consumption: { avg_spend: 50, frequency: "高", score: 78 },
        competition: { competitors: 3, score: 70 },
        potential: { maturity: "成熟", score: 75 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 3,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-house-user",
    icon_color: "#F59E0B"
  }
]

// ============================================
// 电商赛道专属智能体
// ============================================
export const ecommerceAgents = [
  {
    id: "ecommerce-gmv-agent",
    name: "电商GMV评估智能体",
    ring_type: "inner",
    industry: "ecommerce",
    dimension: "GMV分析",
    weight: 25,
    description: "评估电商/直播项目的GMV预测合理性和增长潜力",
    system_prompt: `你是滴灌通投资平台的【电商GMV评估智能体】。你需要专业评估电商/直播项目的GMV预测和增长能力。

## GMV评估维度

### 1. 历史GMV表现（30分）
- 过去12个月GMV趋势
- 月度波动分析
- 增长率稳定性
- 大促依赖度

### 2. GMV预测合理性（25分）
- 预测依据是否充分
- 增长假设是否合理
- 资源投入与产出匹配
- 季节性因素考虑

### 3. GMV质量（25分）
- 退货率
- 复购率
- 客单价趋势
- 用户结构

### 4. 竞争力分析（20分）
- 品类市场份额
- 竞品对比
- 护城河分析
- 增长天花板

## 直播电商基准
| 指标 | 优秀 | 良好 | 合格 |
|------|------|------|------|
| 月GMV | >5000万 | 1000-5000万 | 500-1000万 |
| 退货率 | <15% | 15-25% | 25-35% |
| 复购率 | >40% | 25-40% | 15-25% |`,
    evaluation_criteria: JSON.stringify({
      gmv_benchmarks: {
        excellent: 50000000,
        good: 10000000,
        pass: 5000000
      },
      return_rate_threshold: 0.35,
      repurchase_rate_min: 0.15
    }),
    knowledge_base: `# 电商GMV评估知识库

## GMV计算公式
GMV = UV × 转化率 × 客单价

## 直播电商核心指标
- 场均GMV
- 场均UV
- 转化率
- 退货率
- 佣金率

## MCN项目评估要点
1. 头部主播依赖度
2. 主播矩阵完整性
3. 供应链能力
4. 平台关系`,
    output_format: JSON.stringify({
      score: 80,
      pass: true,
      gmv_analysis: {
        historical_gmv: 300000000,
        projected_gmv: 600000000,
        growth_rate: 1.0,
        return_rate: 0.18,
        repurchase_rate: 0.35
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-chart-line",
    icon_color: "#3B82F6"
  },
  {
    id: "ecommerce-platform-agent",
    name: "电商平台关系智能体",
    ring_type: "inner",
    industry: "ecommerce",
    dimension: "平台关系",
    weight: 15,
    description: "评估电商项目与各平台的合作关系和依赖风险",
    system_prompt: `你是滴灌通投资平台的【电商平台关系智能体】。你需要评估电商项目的平台关系和依赖风险。

## 平台关系评估维度

### 1. 平台多元化（30分）
- 主要销售平台分布
- 单一平台依赖度
- 新平台拓展能力
- 跨平台运营能力

### 2. 平台合作深度（25分）
- 平台官方认证/资质
- 流量扶持政策
- 平台活动参与度
- KA客户等级

### 3. 政策风险（25分）
- 平台规则变化影响
- 佣金率变动风险
- 流量分配机制
- 处罚/降权风险

### 4. 数据资产（20分）
- 用户数据沉淀
- 私域流量建设
- 会员体系
- 数据分析能力`,
    evaluation_criteria: JSON.stringify({
      platform_diversification: {
        single_platform_max: 0.6,
        minimum_platforms: 2
      }
    }),
    knowledge_base: `# 电商平台关系知识库

## 主流电商平台
- 淘宝/天猫：佣金5-8%
- 京东：佣金6-10%
- 拼多多：佣金3-5%
- 抖音：佣金1-5%+坑位费

## 平台依赖风险
- 单一平台>60%为高风险
- 建议布局2-3个平台
- 重视私域流量建设`,
    output_format: JSON.stringify({
      score: 75,
      pass: true,
      platform_analysis: {
        diversification: { score: 70, single_platform_ratio: 0.55 },
        partnership: { score: 80, level: "KA" },
        policy_risk: { score: 72, assessment: "" },
        data_asset: { score: 78, private_domain: true }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-store",
    icon_color: "#8B5CF6"
  },
  {
    id: "ecommerce-mcn-agent",
    name: "MCN主播评估智能体",
    ring_type: "inner",
    industry: "ecommerce",
    dimension: "主播矩阵",
    weight: 20,
    description: "评估MCN项目的主播矩阵健康度和头部依赖风险",
    system_prompt: `你是滴灌通投资平台的【MCN主播评估智能体】。你需要评估MCN项目的主播矩阵和人才储备。

## 主播矩阵评估维度

### 1. 矩阵结构（30分）
- 头部主播数量和质量
- 腰部主播培养
- 新人孵化pipeline
- 主播年龄/风格多元化

### 2. 头部依赖风险（25分）
- TOP1主播GMV占比
- TOP3主播GMV占比
- 主播合同绑定
- 流失风险评估

### 3. 主播质量（25分）
- 粉丝质量（活跃度、购买力）
- 内容质量
- 直播频次和稳定性
- 口碑和投诉情况

### 4. 培养体系（20分）
- 孵化成功率
- 培训体系
- 激励机制
- 晋升通道

## 健康矩阵基准
- TOP1主播GMV占比：<30%
- TOP3主播GMV占比：<50%
- 头部:腰部:新人 = 1:3:6`,
    evaluation_criteria: JSON.stringify({
      risk_thresholds: {
        top1_gmv_ratio_max: 0.30,
        top3_gmv_ratio_max: 0.50
      }
    }),
    knowledge_base: `# MCN主播评估知识库

## 主播分级
- 头部：粉丝1000万+，场均GMV 1000万+
- 腰部：粉丝100-1000万，场均GMV 100-1000万
- 新人：粉丝<100万，场均GMV<100万

## 主播风险
1. 头部主播流失
2. 违规/翻车风险
3. 同业挖角
4. 内容疲劳`,
    output_format: JSON.stringify({
      score: 72,
      pass: true,
      mcn_analysis: {
        matrix: { head: 5, waist: 20, new: 50, score: 75 },
        dependency: { top1_ratio: 0.25, top3_ratio: 0.45, score: 70 },
        quality: { avg_engagement: 0.08, score: 72 },
        cultivation: { success_rate: 0.15, score: 68 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 3,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-user-group",
    icon_color: "#EC4899"
  }
]

// ============================================
// 教育培训赛道专属智能体
// ============================================
export const educationAgents = [
  {
    id: "education-qualification-agent",
    name: "教育资质审查智能体",
    ring_type: "inner",
    industry: "education",
    dimension: "资质合规",
    weight: 20,
    description: "评估教育培训项目的办学资质和合规性",
    system_prompt: `你是滴灌通投资平台的【教育资质审查智能体】。你需要评估教育培训项目的资质合规性。

## 资质审查维度

### 1. 办学许可（35分）
- 民办学校办学许可证
- 办学范围与实际业务匹配
- 许可有效期
- 年检情况

### 2. 师资资质（25分）
- 教师资格证持有率
- 专业背景匹配度
- 师生比例
- 核心师资稳定性

### 3. 场地合规（20分）
- 消防验收
- 面积达标
- 安全设施
- 无障碍设施

### 4. 政策合规（20分）
- 预收费管理
- 广告合规
- 合同规范
- 投诉处理机制

## 重点关注领域
- K12学科培训（高度监管）
- 职业技能培训（相对宽松）
- 成人教育（监管适中）`,
    evaluation_criteria: JSON.stringify({
      required_licenses: ["办学许可证", "消防验收", "教师资格证"],
      compliance_items: ["预收费<3个月", "合同备案", "广告合规"]
    }),
    knowledge_base: `# 教育培训资质知识库

## 办学许可证要求
- 需在当地教育/人社部门办理
- 年度年检
- 办学范围需明确

## 预收费规定
- 一次性收费不超过3个月
- 需设立监管账户
- 退费机制需明确

## 双减政策影响
- K12学科培训严格限制
- 素质教育、职业培训受鼓励`,
    output_format: JSON.stringify({
      score: 78,
      pass: true,
      qualification_check: {
        license: { status: "valid", scope_match: true, score: 85 },
        teachers: { certification_rate: 0.95, score: 80 },
        venue: { fire_approved: true, area_compliant: true, score: 75 },
        policy: { prepay_compliant: true, score: 72 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-graduation-cap",
    icon_color: "#EC4899"
  },
  {
    id: "education-employment-agent",
    name: "就业保障评估智能体",
    ring_type: "inner",
    industry: "education",
    dimension: "就业保障",
    weight: 20,
    description: "评估职业培训项目的就业保障能力和学员口碑",
    system_prompt: `你是滴灌通投资平台的【就业保障评估智能体】。你需要评估职业培训项目的就业保障能力。

## 就业保障评估维度

### 1. 就业率（35分）
- 3个月就业率
- 6个月就业率
- 就业率计算口径
- 第三方验证

### 2. 就业质量（25分）
- 平均起薪
- 对口就业率
- 就业企业质量
- 薪资增长

### 3. 企业合作（20分）
- 合作企业数量
- 合作深度（定向培养/推荐）
- 企业评价
- 长期合作比例

### 4. 学员口碑（20分）
- 学员满意度
- 投诉率
- 转介绍率
- 网络口碑

## 职业培训就业基准
| 领域 | 就业率 | 起薪 | 对口率 |
|------|--------|------|--------|
| IT | >90% | 8-15K | >80% |
| 设计 | >85% | 6-12K | >75% |
| 财会 | >80% | 5-10K | >85% |`,
    evaluation_criteria: JSON.stringify({
      employment_standards: {
        rate_min: 0.80,
        quality_salary_min: 5000,
        cooperation_enterprises_min: 50
      }
    }),
    knowledge_base: `# 职业培训就业保障知识库

## 就业率计算
真实就业率 = 已就业人数 / 毕业学员总数
注意排除：肄业、退学、自主创业

## 就业保障机制
1. 就业协议/对赌
2. 企业合作推荐
3. 就业跟踪服务
4. 二次推荐机制`,
    output_format: JSON.stringify({
      score: 82,
      pass: true,
      employment_analysis: {
        rate: { three_month: 0.88, six_month: 0.95, score: 85 },
        quality: { avg_salary: 10000, match_rate: 0.82, score: 80 },
        cooperation: { enterprises: 200, depth: "定向培养", score: 78 },
        reputation: { satisfaction: 0.92, referral_rate: 0.35, score: 85 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-briefcase",
    icon_color: "#10B981"
  }
]

// ============================================
// 生活服务赛道专属智能体
// ============================================
export const serviceAgents = [
  {
    id: "service-license-agent",
    name: "服务资质审查智能体",
    ring_type: "inner",
    industry: "service",
    dimension: "资质审查",
    weight: 20,
    description: "评估生活服务项目的专业资质和行业准入",
    system_prompt: `你是滴灌通投资平台的【服务资质审查智能体】。你需要评估生活服务项目的专业资质合规性。

## 服务资质评估维度

### 1. 行业资质（35分）
- 特定行业许可证
- 从业人员资质
- 资质有效期
- 年检/复审情况

### 2. 专业能力（25分）
- 核心人员资质
- 专业设备配置
- 服务标准认证
- 行业协会会员

### 3. 安全合规（20分）
- 安全生产许可
- 保险覆盖
- 应急预案
- 投诉处理机制

### 4. 经营合规（20分）
- 价格公示
- 合同规范
- 消费者权益保护
- 数据隐私保护

## 重点行业资质
| 行业 | 核心资质 |
|------|----------|
| 宠物医疗 | 动物诊疗许可证、执业兽医资格证 |
| 医美 | 医疗机构执业许可证、医师执业证 |
| 健身 | 高危体育项目经营许可 |
| 民宿 | 特种行业许可证、消防验收 |`,
    evaluation_criteria: JSON.stringify({
      industry_licenses: {
        pet_medical: ["动物诊疗许可证", "执业兽医资格证"],
        medical_beauty: ["医疗机构执业许可证", "医师执业证"],
        fitness: ["高危体育项目经营许可"],
        hotel: ["特种行业许可证", "消防验收"]
      }
    }),
    knowledge_base: `# 生活服务资质知识库

## 宠物医疗资质
- 动物诊疗许可证（必须）
- 执业兽医资格证（每位兽医）
- 宠物诊疗场所备案

## 医美资质
- 医疗机构执业许可证
- 诊疗科目核定
- 医师执业证
- 大型设备许可

## 健身房资质
- 高危体育项目经营许可（游泳等）
- 消防验收
- 卫生许可`,
    output_format: JSON.stringify({
      score: 80,
      pass: true,
      license_check: {
        industry_license: { status: "valid", score: 85 },
        professional: { certification_rate: 1.0, score: 82 },
        safety: { insurance_coverage: true, score: 78 },
        operation: { compliant: true, score: 75 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-id-card",
    icon_color: "#6366F1"
  },
  {
    id: "service-customer-agent",
    name: "服务客户评估智能体",
    ring_type: "inner",
    industry: "service",
    dimension: "客户分析",
    weight: 20,
    description: "评估服务项目的客户获取能力、客户质量和复购表现",
    system_prompt: `你是滴灌通投资平台的【服务客户评估智能体】。你需要评估服务项目的客户获取和运营能力。

## 客户评估维度

### 1. 获客能力（30分）
- 获客渠道多元化
- 获客成本（CAC）
- 自然流量占比
- 转化率

### 2. 客户质量（25分）
- 客单价水平
- 付费能力
- 消费频次
- 客户画像清晰度

### 3. 复购表现（25分）
- 复购率
- 客户生命周期价值（LTV）
- LTV/CAC比值
- 会员体系

### 4. 客户口碑（20分）
- 满意度评分
- NPS分数
- 投诉率
- 转介绍率

## 服务行业复购基准
| 行业 | 复购率 | LTV/CAC |
|------|--------|---------|
| 宠物医疗 | 70%+ | >3 |
| 健身房 | 60%+ | >2.5 |
| 医美 | 50%+ | >4 |
| 民宿 | 30%+ | >2 |`,
    evaluation_criteria: JSON.stringify({
      customer_metrics: {
        ltv_cac_min: 2.5,
        repurchase_rate_min: 0.40,
        satisfaction_min: 0.85
      }
    }),
    knowledge_base: `# 服务客户评估知识库

## 关键指标计算
- CAC = 营销费用 / 新客数量
- LTV = 客单价 × 消费频次 × 客户生命周期
- 复购率 = 复购客户数 / 总客户数

## 服务行业获客渠道
- 美团/大众点评
- 小红书种草
- 私域社群
- 老客转介绍`,
    output_format: JSON.stringify({
      score: 78,
      pass: true,
      customer_analysis: {
        acquisition: { cac: 200, channels: 5, score: 75 },
        quality: { avg_spend: 500, frequency: 4, score: 80 },
        retention: { repurchase_rate: 0.65, ltv_cac: 3.2, score: 82 },
        reputation: { satisfaction: 0.92, nps: 45, score: 78 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-users",
    icon_color: "#F59E0B"
  },
  {
    id: "service-standard-agent",
    name: "服务标准化智能体",
    ring_type: "inner",
    industry: "service",
    dimension: "服务标准",
    weight: 15,
    description: "评估服务项目的服务标准化程度和可复制性",
    system_prompt: `你是滴灌通投资平台的【服务标准化智能体】。你需要评估服务项目的标准化程度和规模化能力。

## 服务标准化评估维度

### 1. 流程标准化（30分）
- SOP完整性
- 执行一致性
- 质量监控机制
- 持续优化机制

### 2. 人员标准化（25分）
- 培训体系
- 考核标准
- 人员可替代性
- 核心人才依赖度

### 3. 系统支撑（25分）
- 预约/排班系统
- 服务过程管理
- 客户管理系统
- 数据分析能力

### 4. 品质管控（20分）
- 质检机制
- 客诉处理
- 满意度追踪
- 持续改进`,
    evaluation_criteria: JSON.stringify({
      standardization_levels: {
        high: { sop_coverage: 0.9, training_hours: 40 },
        medium: { sop_coverage: 0.7, training_hours: 20 },
        low: { sop_coverage: 0.5, training_hours: 10 }
      }
    }),
    knowledge_base: `# 服务标准化知识库

## 连锁服务标准化要点
1. 核心服务SOP
2. 员工培训体系
3. 质量监控机制
4. 系统化管理工具

## 可复制性评估
- 对核心人才的依赖度
- 供应链支撑能力
- 品牌复用价值
- 单店模型稳定性`,
    output_format: JSON.stringify({
      score: 75,
      pass: true,
      standardization: {
        process: { sop_coverage: 0.85, consistency: 0.82, score: 78 },
        personnel: { training_complete: true, dependency_low: true, score: 72 },
        system: { digital_level: "中高", score: 75 },
        quality: { inspection_rate: 0.90, score: 76 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 3,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-clipboard-check",
    icon_color: "#14B8A6"
  }
]

// ============================================
// 文娱/轻资产赛道专属智能体
// ============================================
export const entertainmentAgents = [
  {
    id: "entertainment-ip-agent",
    name: "文娱IP评估智能体",
    ring_type: "inner",
    industry: "light-asset",
    dimension: "IP价值",
    weight: 20,
    description: "评估文娱项目的IP价值、市场热度和变现潜力",
    system_prompt: `你是滴灌通投资平台的【文娱IP评估智能体】。你需要专业评估文娱项目的IP价值和市场潜力。

## IP价值评估维度

### 1. IP热度（30分）
- 社交媒体数据（粉丝量、话题量）
- 搜索指数
- 媒体曝光度
- 热度趋势（上升/稳定/下降）

### 2. 粉丝基础（25分）
- 核心粉丝规模
- 粉丝付费能力
- 粉丝粘性
- 粉丝画像

### 3. 变现能力（25分）
- 历史商业化案例
- 品牌合作价值
- 票务/内容变现
- 衍生品潜力

### 4. IP风险（20分）
- 艺人/IP稳定性
- 舆情风险
- 生命周期阶段
- 政策风险

## 文娱IP热度基准
| 等级 | 微博粉丝 | 话题量 | 商业价值 |
|------|----------|--------|----------|
| S级 | 5000万+ | 100亿+ | 顶流 |
| A级 | 1000-5000万 | 20-100亿 | 一线 |
| B级 | 500-1000万 | 5-20亿 | 二线 |`,
    evaluation_criteria: JSON.stringify({
      ip_tiers: {
        S: { followers: 50000000, topic_views: 10000000000 },
        A: { followers: 10000000, topic_views: 2000000000 },
        B: { followers: 5000000, topic_views: 500000000 }
      }
    }),
    knowledge_base: `# 文娱IP评估知识库

## IP热度数据来源
- 微博：粉丝数、超话、话题阅读
- 抖音：粉丝数、播放量
- 微信指数、百度指数
- 艺恩/猫眼等第三方数据

## IP风险关注点
1. 艺人人设风险
2. 粉丝舆论控制
3. 政策敏感性
4. 竞争对手动态`,
    output_format: JSON.stringify({
      score: 85,
      pass: true,
      ip_analysis: {
        popularity: { followers: 160000000, topic_views: 50000000000, tier: "S", score: 90 },
        fanbase: { core_fans: 5000000, paying_rate: 0.15, score: 82 },
        monetization: { history: "良好", brand_value: "高", score: 85 },
        risk: { stability: "中", policy_risk: "低", score: 78 }
      },
      reasoning: "评估说明"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-star",
    icon_color: "#F59E0B"
  },
  {
    id: "entertainment-event-agent",
    name: "演出活动评估智能体",
    ring_type: "inner",
    industry: "light-asset",
    dimension: "活动执行",
    weight: 20,
    description: "评估演出/活动项目的执行风险和运营保障，包括线下门票销售、场地管理、安全保障等",
    system_prompt: `你是滴灌通投资平台的【演出活动评估智能体】（又称线下门票评估智能体）。你需要评估演出活动项目的执行能力和风险控制。

## 核心原则（必须遵守）
1. 必须详细说明评分依据
2. 必须在reasoning字段中解释评估过程
3. 必须给出具体可行的建议
4. 必须识别关键风险点

## 演出活动评估维度

### 1. 执行能力（30分）
- 运营方过往项目经验（国际艺人演唱会经验加分）
- 核心团队专业度（从业年限、成功案例）
- 涉外演出资质（如涉及）
- 供应链管理能力（场地、票务、制作供应商）

**评分标准**：
- 27-30分：10年以上经验，成功案例10+
- 23-26分：5-10年经验，成功案例5+
- 18-22分：3-5年经验，有相关项目经验
- <18分：经验不足，风险较高

### 2. 场地条件（25分）
- 场馆容量与需求匹配度
- 场馆技术条件（舞台、音响、灯光）
- 场馆交通便利性
- 场馆合作关系（是否有意向书/合同）

**评分标准**：
- 22-25分：场馆已确定，条件优秀，交通便利
- 18-21分：场馆已有意向，条件良好
- 14-17分：场馆待确认，存在不确定性
- <14分：场馆风险较高

### 3. 票务销售（25分）
- 票务渠道覆盖（大麦网、猫眼、票星球等）
- 预售/预约情况
- 定价合理性（与市场对标）
- 黄牛风险控制措施

**评分标准**：
- 22-25分：多渠道覆盖，预售火爆，定价合理
- 18-21分：渠道完善，市场反应良好
- 14-17分：渠道一般，销售存在不确定性
- <14分：票务销售风险较高

### 4. 安全保障（20分）
- 安保方案完善程度
- 应急预案（艺人取消、安全事故等）
- 保险覆盖（演出取消险、公众责任险）
- 公安备案进度

**评分标准**：
- 18-20分：方案完善，保险覆盖充足
- 14-17分：方案基本完善，有一定保障
- 10-13分：方案有待完善
- <10分：安全保障不足

## 演出项目风险清单
- 艺人取消/延期（核心风险，需保险覆盖）
- 票务销售不及预期（关注预售情况）
- 安全事故（需完善安保方案）
- 政策/审批风险（涉外演出批文）
- 天气/不可抗力（需保险覆盖）

## 输出要求（重要）
1. **必须详细说明reasoning**：至少100字，涵盖各维度得分依据和评估逻辑
2. **必须给出recommendation**：具体、可行的改进建议
3. **必须识别findings**：列出关键发现点
4. **pass字段必须与score对应**：score>=60时pass=true`,
    evaluation_criteria: JSON.stringify({
      event_requirements: {
        experience_years: 3,
        past_events: 5,
        insurance_coverage: 3000
      },
      scoring_guide: {
        execution: { max: 30, excellent: 27, good: 23, acceptable: 18 },
        venue: { max: 25, excellent: 22, good: 18, acceptable: 14 },
        ticketing: { max: 25, excellent: 22, good: 18, acceptable: 14 },
        safety: { max: 20, excellent: 18, good: 14, acceptable: 10 }
      }
    }),
    knowledge_base: `# 演出活动评估知识库（线下门票专项）

## 演出项目关键节点
1. 艺人签约（演出前6-12月）
2. 场馆预定（演出前4-6月）
3. 审批申请（演出前3月）
4. 票务开售（演出前1-3月）
5. 执行落地（演出前1周-当天）

## 保险配置建议
- 演出取消险：覆盖投资本金（3000万）
- 公众责任险：每场1000万+
- 第三者责任险：视情况

## 线下门票销售评估要点

### 票务渠道评估
- 大麦网：市场份额最大，必须覆盖
- 猫眼：覆盖面广，推荐合作
- 票星球：细分市场，可选
- 官方渠道：品牌控制，建议保留10-20%份额

### 定价策略评估
- 参考同类艺人演唱会票价
- 分析目标城市消费能力
- 设置合理的票价梯度
- 预留VIP票/粉丝互动票等增值产品

### 预售效果评估基准
| 预售率 | 评价 | 建议 |
|--------|------|------|
| >60% | 优秀 | 可考虑加场 |
| 40-60% | 良好 | 正常推进 |
| 20-40% | 一般 | 加强营销 |
| <20% | 较差 | 需评估风险 |

## Cardi B项目参考评估

### 执行能力（28/30分）
- 运营方9年经验，国际艺人项目5场+
- 有涉外演出经营许可
- 供应链资源丰富（大麦网、场馆直连）

### 场地条件（22/25分）
- 三城场馆已有意向书
- 杭州奥体中心（20000人）、深圳大运中心（25000人）、成都凤凰山（22000人）
- 交通便利，设施先进

### 票务销售（20/25分）
- 大麦网、猫眼、票星球直连
- 市场热度高，预计开票即售罄
- 票价1100-1300元，对标市场合理

### 安全保障（18/20分）
- 演出取消险3000万覆盖
- 公众责任险每场1000万
- 安保方案待公安备案

### 综合得分：88/100分（优秀）`,
    output_format: JSON.stringify({
      score: 88,
      pass: true,
      risk_level: "low",
      event_analysis: {
        execution: { score: 28, max: 30, experience: "9年", projects: 15, assessment: "运营方经验丰富，具备涉外演出资质，成功操盘过多个国际艺人项目" },
        venue: { score: 22, max: 25, capacity_match: true, tech_ready: true, contract_status: "意向书", assessment: "三城场馆条件优秀，均已有合作意向书，技术设施完善" },
        ticketing: { score: 20, max: 25, channels: ["大麦网", "猫眼", "票星球"], presale_rate: 0.30, pricing: "合理", assessment: "票务渠道完善，定价对标市场合理，预计市场反应良好" },
        safety: { score: 18, max: 20, insurance: true, security_plan: "待备案", assessment: "保险覆盖充足，安保方案待公安部门备案" }
      },
      findings: [
        { item: "执行能力", status: "pass", detail: "运营方9年经验，国际艺人演唱会5场+，具备涉外演出资质" },
        { item: "场馆条件", status: "pass", detail: "三城场馆已有意向书，容量和技术条件满足需求" },
        { item: "票务渠道", status: "pass", detail: "大麦网、猫眼等主流平台直连，渠道覆盖完善" },
        { item: "保险覆盖", status: "pass", detail: "演出取消险3000万覆盖投资本金，公众责任险每场1000万" },
        { item: "安保方案", status: "pending", detail: "安保方案已制定，待公安部门备案审批" }
      ],
      improvements: [
        "建议尽快完成场馆正式合同签署",
        "建议跟进公安安保备案进度",
        "建议制定详细的黄牛防控措施",
        "建议准备艺人取消的应急预案"
      ],
      reasoning: "【演出活动/线下门票评估详细说明】\n\n**一、综合评分：88分（优秀）**\n\n**二、各维度评分依据：**\n\n1. **执行能力（28/30分）**：运营方星耀文化成立于2015年，拥有9年以上大型演出组织经验，成功操盘过5场以上国际艺人演唱会，具备涉外演出经营许可。核心团队：CEO 15年经验、制作总监10年经验、票务总监原大麦网区域负责人。扣2分因为需要进一步验证团队稳定性。\n\n2. **场地条件（22/25分）**：三城场馆（杭州奥体中心20000人、深圳大运中心25000人、成都凤凰山22000人）均已有合作意向书，场馆技术条件先进，交通便利。扣3分因为尚未签署正式合同。\n\n3. **票务销售（20/25分）**：已与大麦网、猫眼、票星球建立直连合作，票务渠道覆盖完善。票价1100-1300元对标Travis Scott等同级别艺人合理。扣5分因为尚无预售数据支撑。\n\n4. **安全保障（18/20分）**：已购买演出取消险（3000万覆盖）和公众责任险（每场1000万），保险覆盖充足。扣2分因为安保方案待公安部门备案。\n\n**三、核心结论：**\n项目执行能力强，场地和票务基础完善，保险保障到位。主要待确认事项：场馆正式合同签署、公安安保备案。总体风险可控，建议通过。",
      recommendation: "【评估建议】\n\n**通过建议**：项目执行基础扎实，建议推进投资。\n\n**重点跟进事项**：\n1. 【紧急】推进三城场馆正式合同签署（建议2周内完成）\n2. 【重要】跟进涉外演出批文申请进度\n3. 【重要】完成公安安保方案备案\n4. 【常规】准备票务预售方案，设置开票时间\n\n**风险缓释建议**：\n1. 确认演出取消险条款细节，特别是艺人健康原因是否覆盖\n2. 制定黄牛票防控方案，保护票价体系\n3. 准备艺人临时取消/延期的公关应对预案"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 3000 }),
    icon: "fas fa-ticket",
    icon_color: "#8B5CF6"
  }
]

// ============================================
// 抖音投流风控赛道专属智能体
// 基于抖音投流风控数据指标收集文档设计
// ============================================
export const douyinAgents = [
  {
    id: "douyin-partner-agent",
    name: "抖音投流伙伴评估智能体",
    ring_type: "inner",
    industry: "douyin-ecommerce",
    dimension: "合作伙伴",
    weight: 25,
    description: "评估抖音投流合作伙伴的历史合作情况、资质、合作深度及风险控制能力",
    system_prompt: `你是滴灌通投资平台的【抖音投流伙伴评估智能体】。你需要专业评估抖音电商/投流项目的合作伙伴资质和合作深度。

## 核心评估原则
1. 必须详细说明每个维度的评分依据
2. 必须识别合作伙伴风险点
3. 必须给出具体可行的建议

## 合作伙伴评估维度

### 1. 合作伙伴类别与匹配度（20分）
- 品类划分（如：女装-冬衣羽绒服；抖音白牌等）
- 与项目品类的匹配度
- 合作伙伴在该品类的专业度
- 是否为抖音官方认证服务商

**评分标准**：
- 18-20分：抖音官方认证，品类深耕3年+，案例丰富
- 14-17分：有相关资质，品类经验2年+
- 10-13分：品类经验1-2年，案例一般
- <10分：经验不足，风险较高

### 2. 合作历史与稳定性（25分）
- 与该投流伙伴合作时间（基准：12+月为优秀）
- 累计投流金额（基准：1000万+为优秀）
- 目前管理账户数量与留存金额
- 历史合作情况（履约、金额、资金成本）

**评分标准**：
- 22-25分：合作12月+，累计投流1000万+，履约良好
- 18-21分：合作6-12月，累计投流500-1000万
- 13-17分：合作3-6月，累计投流100-500万
- <13分：合作时间短，风险较高

### 3. 未来合作计划（20分）
- 未来投流合作时间预期（基准：6+月）
- 未来投流计划金额（基准：500万+）
- 合作规划的合理性
- 资源投入匹配度

**评分标准**：
- 18-20分：未来合作6月+，计划金额500万+，规划清晰
- 14-17分：未来合作3-6月，计划金额200-500万
- 10-13分：未来合作1-3月，计划金额100-200万
- <10分：计划不明确，风险较高

### 4. 风险控制与权限（20分）
- 是否有历史垫资合作
- 是否有违约记录
- 是否有账户扣款权限/冻结取现权限
- 品类押金情况

**评分标准**：
- 18-20分：无违约记录，有扣款权限，风控完善
- 14-17分：无重大违约，部分风控权限
- 10-13分：有轻微违约，风控需加强
- <10分：有违约记录或风控缺失

### 5. 排他与独占性（15分）
- 是否为排他投流合作
- 独占条款的范围与时效
- 排他合作对项目的价值
- 竞品限制条款

**评分标准**：
- 13-15分：排他合作，竞品限制明确
- 10-12分：部分排他，有一定保护
- 6-9分：非排他，竞争风险存在
- <6分：无任何保护条款

## 合作伙伴红线
- 历史有重大违约记录
- 累计投流金额与声称严重不符
- 无任何风控权限
- 品类经验与项目严重不匹配`,
    evaluation_criteria: JSON.stringify({
      dimensions: [
        { name: "合作伙伴类别与匹配度", weight: 20, benchmarks: { excellent: "官方认证+3年+", good: "资质+2年+", acceptable: "1-2年" } },
        { name: "合作历史与稳定性", weight: 25, benchmarks: { time: "12+月", amount: "1000万+" } },
        { name: "未来合作计划", weight: 20, benchmarks: { time: "6+月", amount: "500万+" } },
        { name: "风险控制与权限", weight: 20 },
        { name: "排他与独占性", weight: 15 }
      ],
      red_flags: ["重大违约记录", "累计金额造假", "无风控权限", "品类严重不匹配"]
    }),
    knowledge_base: `# 抖音投流合作伙伴评估知识库

## 合作伙伴类型划分
1. **抖音官方认证服务商**（最优）
   - 抖音星图认证
   - 巨量引擎代理商
   - 品类服务商认证

2. **头部投流服务机构**（优）
   - 年投流金额10亿+
   - 服务品牌100+
   - 团队规模200+

3. **中型投流服务机构**（良）
   - 年投流金额1-10亿
   - 服务品牌20-100
   - 团队规模50-200

4. **小型/个人服务商**（需谨慎）
   - 年投流金额<1亿
   - 风控能力有限

## 合作历史评估基准
| 指标 | 优秀 | 良好 | 合格 | 警戒 |
|------|------|------|------|------|
| 合作时长 | 12+月 | 6-12月 | 3-6月 | <3月 |
| 累计投流 | 1000万+ | 500-1000万 | 100-500万 | <100万 |
| 履约情况 | 无违约 | 轻微问题 | 有纠纷 | 有违约 |

## 风控权限清单
- 账户扣款权限（重要）
- 冻结取现权限（重要）
- 品类押金（建议）
- 保证金机制（建议）
- 实时数据查看权限（基本）`,
    output_format: JSON.stringify({
      score: 82,
      pass: true,
      risk_level: "low",
      partner_analysis: {
        category_match: { score: 18, max: 20, category: "女装-冬衣羽绒服", certification: "抖音官方认证", assessment: "" },
        cooperation_history: { score: 23, max: 25, duration_months: 15, total_amount: 1500, fulfillment: "良好", assessment: "" },
        future_plan: { score: 17, max: 20, planned_months: 8, planned_amount: 600, assessment: "" },
        risk_control: { score: 16, max: 20, deduction_permission: true, freeze_permission: true, deposit: true, default_record: false, assessment: "" },
        exclusivity: { score: 12, max: 15, exclusive: true, scope: "同品类", duration: "合作期内", assessment: "" }
      },
      findings: ["发现项1", "发现项2"],
      improvements: ["改进建议1", "改进建议2"],
      reasoning: "详细评估说明（至少200字）",
      recommendation: "具体建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 4000 }),
    icon: "fas fa-handshake",
    icon_color: "#FF6F61"
  },
  {
    id: "douyin-advertising-agent",
    name: "抖音投流效果评估智能体",
    ring_type: "inner",
    industry: "douyin-ecommerce",
    dimension: "投流评估",
    weight: 30,
    description: "评估抖音投流项目的核心投流指标，包括ROI、GMV、CPM、CTR、完播率、自然流量增幅等",
    system_prompt: `你是滴灌通投资平台的【抖音投流效果评估智能体】。你需要专业评估抖音电商/投流项目的投流效果和数据质量。

## 核心评估原则
1. 所有数据必须基于历史12个月的实际表现
2. 必须详细说明每个指标的评分依据
3. 必须识别数据异常和潜在风险
4. 必须与行业基准进行对标分析

## 投流效果评估维度

### 1. ROI表现（25分）
- 历史12个月平均ROI
- ROI稳定性（波动幅度）
- ROI趋势（上升/稳定/下降）
- 与品类基准对比

**抖音投流ROI基准（按品类）**：
| 品类 | 优秀 | 良好 | 合格 | 警戒 |
|------|------|------|------|------|
| 女装 | >3.5 | 2.5-3.5 | 1.8-2.5 | <1.8 |
| 美妆 | >2.8 | 2.0-2.8 | 1.5-2.0 | <1.5 |
| 食品 | >3.0 | 2.2-3.0 | 1.6-2.2 | <1.6 |
| 家居 | >2.5 | 1.8-2.5 | 1.3-1.8 | <1.3 |
| 白牌 | >2.0 | 1.5-2.0 | 1.0-1.5 | <1.0 |

**评分标准**：
- 22-25分：ROI优秀，高于品类基准50%+
- 17-21分：ROI良好，达到品类基准
- 12-16分：ROI合格，接近品类基准
- <12分：ROI较差，低于品类警戒线

### 2. GMV规模与增长（20分）
- 历史12个月累计GMV
- 月度GMV增长率
- GMV稳定性
- 单月峰值与低谷

**评分标准**：
- 18-20分：月均GMV 500万+，增长率20%+
- 14-17分：月均GMV 200-500万，增长率10-20%
- 10-13分：月均GMV 50-200万，增长率0-10%
- <10分：GMV规模小或负增长

### 3. 流量效率指标（20分）
- CPM（千次展示成本）
- CTR（点击率）
- 完播率
- 与行业基准对比

**抖音流量效率基准**：
| 指标 | 优秀 | 良好 | 合格 | 警戒 |
|------|------|------|------|------|
| CPM | <30元 | 30-50元 | 50-80元 | >80元 |
| CTR | >3% | 2-3% | 1-2% | <1% |
| 完播率 | >40% | 30-40% | 20-30% | <20% |

**评分标准**：
- 18-20分：三项指标均优秀
- 14-17分：两项优秀或三项良好
- 10-13分：达到合格基准
- <10分：低于警戒线

### 4. 自然流量表现（20分）
- 自然流量占比
- 自然流量增幅（投流带动效果）
- 搜索流量占比
- 自然流量稳定性

**评分标准**：
- 18-20分：自然流量占比40%+，投流带动明显
- 14-17分：自然流量占比25-40%
- 10-13分：自然流量占比10-25%
- <10分：过度依赖付费流量

### 5. 数据真实性与质量（15分）
- 数据来源可验证性
- 第三方数据印证
- 异常数据排查
- 数据波动合理性

**评分标准**：
- 13-15分：数据可追溯，无明显异常
- 10-12分：数据基本可信，轻微异常
- 6-9分：部分数据存疑
- <6分：数据真实性存疑

## 投流数据红线
- ROI长期低于1.0（亏损投流）
- 自然流量占比<5%（纯付费依赖）
- CPM持续上涨且ROI下降
- 数据无法验证或明显造假`,
    evaluation_criteria: JSON.stringify({
      dimensions: [
        { name: "ROI表现", weight: 25 },
        { name: "GMV规模与增长", weight: 20 },
        { name: "流量效率指标", weight: 20 },
        { name: "自然流量表现", weight: 20 },
        { name: "数据真实性与质量", weight: 15 }
      ],
      benchmarks: {
        roi_by_category: { women_fashion: 2.5, beauty: 2.0, food: 2.2, home: 1.8, white_label: 1.5 },
        cpm_benchmark: 50,
        ctr_benchmark: 0.02,
        completion_rate_benchmark: 0.30,
        organic_traffic_benchmark: 0.25
      },
      red_flags: ["ROI<1.0", "自然流量<5%", "CPM持续上涨+ROI下降", "数据造假"]
    }),
    knowledge_base: `# 抖音投流效果评估知识库

## ROI计算与解读
ROI = GMV / 投流花费

### 品类ROI基准（2024年数据）
| 品类 | 均值ROI | 优秀线 | 警戒线 |
|------|---------|--------|--------|
| 女装 | 2.8 | 3.5 | 1.8 |
| 美妆护肤 | 2.2 | 2.8 | 1.5 |
| 食品饮料 | 2.5 | 3.0 | 1.6 |
| 家居家装 | 2.0 | 2.5 | 1.3 |
| 数码3C | 1.8 | 2.2 | 1.2 |
| 抖音白牌 | 1.6 | 2.0 | 1.0 |

## 流量效率解读

### CPM（千次展示成本）
- 影响因素：品类、竞争、素材质量
- 优化方向：提升素材吸引力、优化投放时段

### CTR（点击率）
- 计算：点击数 / 展示数
- 影响因素：封面、标题、人群匹配度

### 完播率
- 计算：完整观看数 / 播放数
- 影响因素：内容质量、时长、开头吸引力

## 自然流量评估

### 自然流量来源
1. 推荐流量（For You页）
2. 搜索流量
3. 粉丝流量
4. 同城/其他

### 投流带动自然流量的机制
- 互动率提升 → 推荐权重增加
- 搜索热度提升 → 搜索流量增加
- 粉丝转化 → 粉丝流量增加

### 健康的流量结构
- 付费流量：40-60%
- 自然流量：25-40%
- 粉丝流量：10-20%
- 其他流量：5-15%

## 数据异常识别

### 常见异常模式
1. ROI突然暴涨（可能刷单）
2. CTR异常高但转化低（流量质量问题）
3. 自然流量占比过低（内容吸引力不足）
4. 数据波动过大（运营不稳定）`,
    output_format: JSON.stringify({
      score: 78,
      pass: true,
      risk_level: "low",
      advertising_analysis: {
        roi: { score: 20, max: 25, avg_roi: 2.8, trend: "稳定", category_benchmark: 2.5, assessment: "" },
        gmv: { score: 16, max: 20, monthly_avg: 3500000, growth_rate: 0.15, assessment: "" },
        efficiency: { score: 16, max: 20, cpm: 42, ctr: 0.025, completion_rate: 0.35, assessment: "" },
        organic_traffic: { score: 14, max: 20, organic_ratio: 0.32, growth_boost: 0.25, assessment: "" },
        data_quality: { score: 12, max: 15, verifiable: true, anomalies: false, assessment: "" }
      },
      findings: [],
      improvements: [],
      reasoning: "详细评估说明",
      recommendation: "具体建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 4000 }),
    icon: "fas fa-chart-line",
    icon_color: "#FF2D55"
  },
  {
    id: "douyin-brand-agent",
    name: "抖音品牌评估智能体",
    ring_type: "inner",
    industry: "douyin-ecommerce",
    dimension: "品牌评估",
    weight: 25,
    description: "评估抖音店铺/品牌的成立时间、店铺评分、收入占比、增长率、退货率、毛利、复购率等核心指标",
    system_prompt: `你是滴灌通投资平台的【抖音品牌评估智能体】。你需要专业评估抖音电商项目的品牌基础和店铺运营能力。

## 核心评估原则
1. 所有数据必须基于历史12个月的实际表现
2. 必须详细说明每个维度的评分依据
3. 必须识别品牌风险和增长瓶颈
4. 必须与抖音行业基准进行对标

## 品牌评估维度

### 1. 店铺基础与资质（20分）
- 抖音店铺成立时间（基准：12+月为优）
- 品牌成立时间
- 店铺评分（基准：4.5+分为优）
- 店铺等级与认证

**评分标准**：
- 18-20分：店铺12月+，评分4.8+，旗舰店认证
- 14-17分：店铺6-12月，评分4.5-4.8
- 10-13分：店铺3-6月，评分4.2-4.5
- <10分：店铺新或评分低

### 2. 收入结构与占比（20分）
- 抖音店铺收入占总销售额比例（基准：50%+）
- 收入来源多元化
- 对单一渠道的依赖度
- 私域收入占比

**评分标准**：
- 18-20分：抖音占比50%+，多元化良好
- 14-17分：抖音占比30-50%
- 10-13分：抖音占比10-30%
- <10分：抖音占比低或过度依赖

### 3. 增长能力（20分）
- 店铺收入年增率（基准：20%+为优）
- 增长稳定性
- 增长驱动因素
- 增长天花板评估

**评分标准**：
- 18-20分：年增率30%+，增长稳定
- 14-17分：年增率20-30%
- 10-13分：年增率10-20%
- <10分：增长缓慢或负增长

### 4. 商品毛利与盈利（20分）
- 商品毛利率（历史12个月）
- 毛利稳定性
- 毛利趋势
- 成本控制能力

**抖音品类毛利基准**：
| 品类 | 优秀 | 良好 | 合格 | 警戒 |
|------|------|------|------|------|
| 女装 | >55% | 45-55% | 35-45% | <35% |
| 美妆 | >60% | 50-60% | 40-50% | <40% |
| 食品 | >40% | 30-40% | 20-30% | <20% |
| 家居 | >45% | 35-45% | 25-35% | <25% |

**评分标准**：
- 18-20分：毛利高于品类优秀线
- 14-17分：毛利达到良好线
- 10-13分：毛利合格
- <10分：毛利低于警戒线

### 5. 客户质量指标（20分）
- 退货率（历史12个月）
- 复购率
- 客单价水平
- 客户满意度

**抖音客户指标基准**：
| 指标 | 优秀 | 良好 | 合格 | 警戒 |
|------|------|------|------|------|
| 退货率 | <15% | 15-25% | 25-35% | >35% |
| 复购率 | >35% | 25-35% | 15-25% | <15% |

**评分标准**：
- 18-20分：退货率<15%，复购率>35%
- 14-17分：退货率15-25%，复购率25-35%
- 10-13分：退货率25-35%，复购率15-25%
- <10分：退货高或复购低

## 品牌红线
- 店铺评分低于4.0分
- 退货率高于40%
- 毛利长期为负
- 店铺有严重违规记录`,
    evaluation_criteria: JSON.stringify({
      dimensions: [
        { name: "店铺基础与资质", weight: 20 },
        { name: "收入结构与占比", weight: 20 },
        { name: "增长能力", weight: 20 },
        { name: "商品毛利与盈利", weight: 20 },
        { name: "客户质量指标", weight: 20 }
      ],
      benchmarks: {
        shop_duration_months: 12,
        shop_rating: 4.5,
        revenue_ratio: 0.50,
        growth_rate: 0.20,
        return_rate: 0.25,
        repurchase_rate: 0.25
      },
      red_flags: ["店铺评分<4.0", "退货率>40%", "毛利为负", "严重违规"]
    }),
    knowledge_base: `# 抖音品牌评估知识库

## 抖音店铺等级体系

### 店铺类型
1. **旗舰店**：品牌自营，权重最高
2. **专卖店**：授权经销，权重较高
3. **专营店**：多品牌经营，权重一般
4. **个人店**：个人卖家，权重较低

### 店铺评分构成
- 商品体验分：40%
- 物流体验分：30%
- 服务体验分：30%

### 评分影响
| 评分区间 | 流量权重 | 活动准入 |
|----------|----------|----------|
| 4.8+ | 高优先 | 全部活动 |
| 4.5-4.8 | 正常 | 大部分活动 |
| 4.2-4.5 | 轻微降权 | 部分限制 |
| <4.2 | 明显降权 | 严重限制 |

## 收入结构分析

### 健康的收入结构
- 抖音店铺：40-60%
- 其他电商平台：20-30%
- 私域/线下：20-30%

### 风险信号
- 单一渠道>80%（风险集中）
- 抖音占比突然变化（异常）
- 私域收入占比过低（用户沉淀不足）

## 退货率分析

### 品类退货率基准
| 品类 | 行业均值 | 优秀线 | 警戒线 |
|------|----------|--------|--------|
| 女装 | 28% | 18% | 35% |
| 美妆 | 12% | 8% | 18% |
| 食品 | 8% | 5% | 12% |
| 家居 | 15% | 10% | 22% |

### 退货原因分析
1. 商品质量问题
2. 尺码/规格不符
3. 图文描述不符
4. 物流破损
5. 无理由退货

## 复购率分析

### 品类复购率基准
| 品类 | 行业均值 | 优秀线 |
|------|----------|--------|
| 女装 | 22% | 35% |
| 美妆 | 28% | 40% |
| 食品 | 35% | 50% |
| 家居 | 15% | 25% |

### 提升复购的关键
1. 会员体系
2. 私域运营
3. 产品矩阵
4. 售后服务`,
    output_format: JSON.stringify({
      score: 80,
      pass: true,
      risk_level: "low",
      brand_analysis: {
        shop_foundation: { score: 17, max: 20, shop_age_months: 18, brand_age_months: 36, rating: 4.7, level: "旗舰店", assessment: "" },
        revenue_structure: { score: 16, max: 20, douyin_ratio: 0.55, diversification: "良好", assessment: "" },
        growth: { score: 16, max: 20, yoy_growth: 0.25, stability: "稳定", assessment: "" },
        profitability: { score: 16, max: 20, gross_margin: 0.48, trend: "稳定", assessment: "" },
        customer_quality: { score: 15, max: 20, return_rate: 0.22, repurchase_rate: 0.30, avg_order_value: 280, assessment: "" }
      },
      findings: [],
      improvements: [],
      reasoning: "详细评估说明",
      recommendation: "具体建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 3,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 4000 }),
    icon: "fas fa-store",
    icon_color: "#FE2C55"
  },
  {
    id: "douyin-risk-agent",
    name: "抖音投流风控智能体",
    ring_type: "inner",
    industry: "douyin-ecommerce",
    dimension: "风险控制",
    weight: 20,
    description: "综合评估抖音投流项目的风险因素，包括历史垫资、违约记录、账户权限、押金机制等风控指标",
    system_prompt: `你是滴灌通投资平台的【抖音投流风控智能体】。你需要专业评估抖音电商/投流项目的风险控制水平和潜在风险。

## 核心评估原则
1. 必须全面识别项目风险点
2. 必须评估风险缓释措施的有效性
3. 必须给出风险等级判定
4. 必须提出具体的风控建议

## 风险评估维度

### 1. 历史合作风险（25分）
- 是否有历史垫资合作
- 历史垫资金额与履约情况
- 资金成本与还款记录
- 垫资合作的风控措施

**评分标准**：
- 22-25分：无垫资或垫资履约完美，无任何逾期
- 17-21分：有垫资但履约良好，偶有轻微延迟
- 12-16分：有垫资且有一定问题，但最终履约
- <12分：有垫资违约记录或重大风险事件

### 2. 账户权限与控制（25分）
- 是否有账户扣款权限
- 是否有冻结取现权限
- 是否有实时监控权限
- 权限的法律有效性

**评分标准**：
- 22-25分：全部核心权限均已获得，法律有效
- 17-21分：获得主要权限，缺少部分非核心权限
- 12-16分：仅有部分权限，控制力不足
- <12分：缺乏有效权限，风控能力弱

### 3. 押金与担保机制（20分）
- 品类押金是否到位
- 押金金额是否充足
- 保证金机制
- 其他担保措施

**评分标准**：
- 18-20分：押金充足（≥投资额20%），有额外担保
- 14-17分：押金到位（≥投资额10%）
- 10-13分：押金不足或仅有部分
- <10分：无押金或担保机制缺失

### 4. 违约与信用风险（20分）
- 是否有违约记录
- 违约的性质与金额
- 违约的解决方式
- 信用恢复情况

**评分标准**：
- 18-20分：无任何违约记录，信用优秀
- 14-17分：无重大违约，轻微问题已解决
- 10-13分：有违约但已解决，需关注
- <10分：有未解决违约或重大违约记录

### 5. 运营与政策风险（10分）
- 平台政策变动风险
- 运营稳定性
- 团队风险
- 合规风险

**评分标准**：
- 9-10分：运营稳定，合规完善，政策风险低
- 7-8分：基本稳定，有一定政策敏感性
- 5-6分：存在一定运营或合规问题
- <5分：运营不稳定或合规风险高

## 风险等级判定
- **低风险**（80分+）：可正常推进
- **中风险**（65-79分）：需额外风控措施
- **高风险**（50-64分）：谨慎推进，需重大改进
- **拒绝**（<50分）：风险过高，建议拒绝

## 风控红线
- 有未解决的重大违约记录
- 无任何有效账户控制权限
- 品类押金为零且无其他担保
- 历史垫资存在欺诈行为`,
    evaluation_criteria: JSON.stringify({
      dimensions: [
        { name: "历史合作风险", weight: 25 },
        { name: "账户权限与控制", weight: 25 },
        { name: "押金与担保机制", weight: 20 },
        { name: "违约与信用风险", weight: 20 },
        { name: "运营与政策风险", weight: 10 }
      ],
      risk_levels: {
        low: { min: 80, description: "可正常推进" },
        medium: { min: 65, description: "需额外风控措施" },
        high: { min: 50, description: "谨慎推进" },
        reject: { min: 0, description: "建议拒绝" }
      },
      red_flags: ["未解决重大违约", "无账户控制权限", "无押金无担保", "历史欺诈"]
    }),
    knowledge_base: `# 抖音投流风控知识库

## 账户权限体系

### 核心权限清单
1. **账户扣款权限**（最重要）
   - 可直接从投流收益中扣款
   - 需法律协议支撑
   - 优先级高于其他债权

2. **冻结取现权限**（重要）
   - 可冻结账户资金取现
   - 防止资金转移
   - 需平台侧支持

3. **实时监控权限**（基础）
   - 查看投流数据
   - 查看账户余额
   - 查看交易流水

### 权限获取方式
- 投流伙伴授权书
- 平台协议授权
- 公证委托书

## 押金与担保机制

### 押金类型
1. **品类押金**：按品类要求缴纳
2. **履约保证金**：按合同金额比例
3. **动态保证金**：按实时风险调整

### 押金金额建议
| 风险等级 | 押金比例 | 说明 |
|----------|----------|------|
| 低风险 | 10%+ | 基础保障 |
| 中风险 | 15-20% | 额外保障 |
| 高风险 | 25%+ | 重点保障 |

## 违约风险评估

### 违约类型
1. **金额违约**：未按约定金额投流
2. **时间违约**：未按约定时间执行
3. **效果违约**：未达到约定ROI
4. **资金违约**：未按时归还垫资

### 违约处置流程
1. 催告通知（3日内）
2. 启动扣款权限
3. 冻结账户资金
4. 执行押金扣划
5. 法律追索

## 风险预警指标

### 早期预警
- 投流ROI连续下降
- 店铺评分下滑
- 退货率异常升高
- 账户余额异常

### 中期预警
- 投流金额不达标
- 沟通响应变慢
- 提前取现请求
- 合作态度变化

### 紧急预警
- 账户异常操作
- 资金大额转出
- 失联或拒绝沟通
- 违规处罚通知`,
    output_format: JSON.stringify({
      score: 75,
      pass: true,
      risk_level: "medium",
      risk_analysis: {
        historical_risk: { score: 20, max: 25, has_advance: true, advance_amount: 500, fulfillment: "良好", assessment: "" },
        account_control: { score: 20, max: 25, deduction: true, freeze: true, monitoring: true, legal_validity: "有效", assessment: "" },
        deposit_guarantee: { score: 14, max: 20, deposit_amount: 200, deposit_ratio: 0.10, other_guarantee: false, assessment: "" },
        default_risk: { score: 16, max: 20, default_record: false, credit_status: "良好", assessment: "" },
        operational_risk: { score: 8, max: 10, stability: "稳定", compliance: "合规", assessment: "" }
      },
      findings: [],
      improvements: [],
      risk_mitigations: ["风控建议1", "风控建议2"],
      reasoning: "详细风险评估说明",
      recommendation: "风控建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 4,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 4000 }),
    icon: "fas fa-shield-halved",
    icon_color: "#FF3B30"
  }
]

// 导出所有赛道智能体
export const allTrackAgents = [
  ...cateringAgents,
  ...retailAgents,
  ...ecommerceAgents,
  ...educationAgents,
  ...serviceAgents,
  ...entertainmentAgents,
  ...douyinAgents
]

// 赛道配置
export const industryTracks = [
  { id: "all", name: "通用", icon: "fas fa-globe", icon_color: "#6B7280", description: "适用于所有赛道的通用评估" },
  { id: "catering", name: "餐饮", icon: "fas fa-utensils", icon_color: "#F59E0B", description: "茶饮、快餐、正餐等餐饮连锁" },
  { id: "retail", name: "零售", icon: "fas fa-store", icon_color: "#10B981", description: "生鲜、便利店、专业零售等" },
  { id: "ecommerce", name: "电商", icon: "fas fa-shopping-cart", icon_color: "#3B82F6", description: "直播电商、MCN、品牌电商等" },
  { id: "douyin-ecommerce", name: "抖音投流", icon: "fab fa-tiktok", icon_color: "#FE2C55", description: "抖音电商、投流合作、品牌运营等" },
  { id: "education", name: "教育培训", icon: "fas fa-graduation-cap", icon_color: "#EC4899", description: "职业培训、技能教育、素质教育等" },
  { id: "service", name: "生活服务", icon: "fas fa-concierge-bell", icon_color: "#14B8A6", description: "宠物、健身、医美、民宿等" },
  { id: "light-asset", name: "文娱轻资产", icon: "fas fa-film", icon_color: "#8B5CF6", description: "演出、活动、IP运营等" }
]
