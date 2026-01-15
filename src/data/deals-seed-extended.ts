// 滴灌通标的种子数据 - 扩展版（20个新增标的）
// DGT Intelligence Platform - Extended Deals Seed Data
// 基于滴灌通DRO（每日收入分成凭证）真实投资模式设计

/**
 * 扩展标的设计原则：
 * - 20个新增标的，补充更多行业细分
 * - 覆盖更多城市（二三线城市）
 * - 三种分成频率均衡分布（每日/每周/每月）
 * - 新增行业：医疗健康、教育培训、汽车服务、母婴、烘焙、洗衣、眼镜、口腔
 */

// ============================================
// 标的11：餐饮-烘焙甜点（苏州/每日分成）
// ============================================
export const deal_11_bakery = {
  id: "DGT-2026-011",
  company_name: "鲍师傅糕点（苏州观前街店）",
  credit_code: "91320508MA1NBABC11",
  industry: "catering",
  industry_sub: "烘焙甜点",
  status: "pending",
  region: "江苏",
  city: "苏州",
  district: "观前街商圈",
  
  main_business: `鲍师傅是中国新中式糕点领导品牌，以肉松小贝为爆款产品，门店常年排队。该门店位于苏州观前街核心位置，客流量大，日均销售额稳定在1.5-2万元。主打现烤现卖模式，产品新鲜度高，复购率达60%以上。`,
  
  funding_amount: 45,
  funding_purpose: "设备升级（20万）+ 装修改造（15万）+ 流动资金（10万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.07,
  cashflow_frequency: "daily",
  
  contact_name: "张经理",
  contact_phone: "13900000011",
  website: "https://baoshifu.com",
  submitted_date: "2026-01-11T09:00:00.000Z",
  
  project_documents: `【项目名称】鲍师傅苏州观前街店收入分成项目

【品牌介绍】
鲍师傅创立于2004年，是中国新中式糕点领导品牌。
- 全国门店数量：150+
- 核心产品：肉松小贝、凤梨酥、蛋黄酥
- 品牌定位：现烤中式糕点
- 平均客单价：45元
- 特点：常年排队、不接受加盟

【门店信息】
- 位置：苏州市姑苏区观前街（核心步行街）
- 面积：60平米（含后厨）
- 开业时间：2022年3月
- 租金：4.5万/月
- 员工：8人（2师傅+6店员）
- 营业时间：8:00-21:00

【经营数据（近12个月平均）】
- 日均销售额：1.8万元
- 月均营收：54万元
- 年营收：648万元
- 毛利率：52%
- 净利率：16%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：7%
3. 分成频率：T+1日结算
4. 账户管理：建设银行三方共管账户

【投资回报测算】
- 投资金额：45万元
- 年分成收入：648万 × 7% = 45.36万元
- 预期IRR：约25%

【风险提示】
1. 品牌风险：鲍师傅假冒店较多，需注意品牌维权
2. 竞争风险：泸溪河、詹记等品牌竞争
3. 原料风险：面粉、肉松等原料价格波动`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 45,
    investment_period_months: 24,
    revenue_share_ratio: 0.07,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 60, rent_monthly: 4.5, staff_count: 8 },
    revenue_data: { daily_revenue: 18000, monthly_revenue: 540000, annual_revenue: 6480000, gross_margin: 0.52, net_margin: 0.16 },
    investment_return: { annual_share_income: 453600, moic: 1.01, irr_estimate: 0.25 }
  }),
  
  result: "pending"
};

// ============================================
// 标的12：零售-母婴连锁（郑州/每日分成）
// ============================================
export const deal_12_baby = {
  id: "DGT-2026-012",
  company_name: "孩子王（郑州正弘城店）",
  credit_code: "91410100MA4LCDEF12",
  industry: "retail",
  industry_sub: "母婴用品",
  status: "pending",
  region: "河南",
  city: "郑州",
  district: "金水区正弘城",
  
  main_business: `孩子王是中国母婴零售行业龙头企业（已上市），提供一站式母婴购物及服务。该门店位于郑州正弘城购物中心，面积800平米，是区域旗舰店，提供奶粉、纸尿裤、童装、玩具及育儿服务。会员体系完善，会员消费占比90%以上。`,
  
  funding_amount: 150,
  funding_purpose: "门店升级（80万）+ 库存周转（50万）+ 服务区建设（20万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.04,
  cashflow_frequency: "daily",
  
  contact_name: "王店长",
  contact_phone: "13900000012",
  website: "https://www.haiziwang.com",
  submitted_date: "2026-01-11T10:00:00.000Z",
  
  project_documents: `【项目名称】孩子王郑州正弘城店收入分成项目

【品牌介绍】
孩子王创立于2009年，2021年A股上市，是中国母婴零售行业龙头。
- 全国门店数量：500+
- 覆盖城市：22个省份
- 单店平均面积：2500平米
- 品牌定位：一站式母婴生活服务
- 会员数量：6000万+

【门店信息】
- 位置：郑州市金水区正弘城3F
- 面积：800平米
- 开业时间：2021年6月
- 租金：15万/月
- 员工：18人（含育婴师4人）
- 营业时间：10:00-22:00

【经营数据（近12个月平均）】
- 日均销售额：8.5万元
- 月均营收：255万元
- 年营收：3060万元
- 毛利率：28%
- 净利率：6%

【收入分成机制】
1. 分成来源：门店全部营业收入（含服务收入）
2. 分成比例：4%
3. 分成频率：T+1日结算
4. 特点：母婴行业复购率高，客户生命周期长

【投资回报测算】
- 投资金额：150万元
- 年分成收入：3060万 × 4% = 122.4万元
- 预期IRR：约20%

【风险提示】
1. 人口风险：出生率下降影响母婴市场
2. 竞争风险：线上渠道分流
3. 库存风险：母婴产品保质期管理`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 150,
    investment_period_months: 36,
    revenue_share_ratio: 0.04,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 800, rent_monthly: 15, staff_count: 18 },
    revenue_data: { daily_revenue: 85000, monthly_revenue: 2550000, annual_revenue: 30600000, gross_margin: 0.28, net_margin: 0.06 },
    investment_return: { annual_share_income: 1224000, moic: 0.82, irr_estimate: 0.20 }
  }),
  
  result: "pending"
};

// ============================================
// 标的13：服务-口腔医疗（长沙/每周分成）
// ============================================
export const deal_13_dental = {
  id: "DGT-2026-013",
  company_name: "通策医疗口腔（长沙五一广场店）",
  credit_code: "91430100MA4MABCD13",
  industry: "service",
  industry_sub: "口腔医疗",
  status: "pending",
  region: "湖南",
  city: "长沙",
  district: "芙蓉区五一广场",
  
  main_business: `通策医疗是中国民营口腔医疗龙头企业（A股上市），专注于口腔种植、正畸、修复等高端口腔服务。该门店位于长沙五一广场商圈，配备进口牙椅12台，专业口腔医师8人，日均接诊量40-60人次。客单价高，复购周期长。`,
  
  funding_amount: 200,
  funding_purpose: "设备升级（100万）+ 装修改造（60万）+ 运营资金（40万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.08,
  cashflow_frequency: "weekly",
  
  contact_name: "陈院长",
  contact_phone: "13900000013",
  website: "https://www.tongce.com",
  submitted_date: "2026-01-11T11:00:00.000Z",
  
  project_documents: `【项目名称】通策医疗口腔长沙五一广场店收入分成项目

【品牌介绍】
通策医疗创立于2006年，A股上市公司，是中国民营口腔医疗龙头。
- 全国门店数量：100+
- 覆盖城市：浙江、江苏、湖南等
- 品牌定位：高端口腔医疗
- 平均客单价：3500元
- 核心业务：种植、正畸、修复

【门店信息】
- 位置：长沙市芙蓉区五一广场国金中心
- 面积：400平米
- 牙椅数量：12台
- 开业时间：2023年1月
- 租金：12万/月
- 员工：20人（含医师8人）
- 营业时间：9:00-21:00

【经营数据（近12个月平均）】
- 日均接诊：50人次
- 日均营收：5万元
- 月均营收：150万元
- 年营收：1800万元
- 毛利率：55%
- 净利率：18%

【收入分成机制】
1. 分成来源：门店全部医疗服务收入
2. 分成比例：8%
3. 分成频率：每周结算（周一）
4. 特点：口腔医疗客单价高、复购周期12-24个月

【投资回报测算】
- 投资金额：200万元
- 年分成收入：1800万 × 8% = 144万元
- 预期IRR：约18%

【风险提示】
1. 医疗风险：医疗纠纷可能影响声誉
2. 人才风险：医师流失影响客源
3. 政策风险：医疗行业监管趋严`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 200,
    investment_period_months: 36,
    revenue_share_ratio: 0.08,
    cashflow_frequency: "weekly",
    store_metrics: { area_sqm: 400, rent_monthly: 12, staff_count: 20, dental_chairs: 12 },
    revenue_data: { daily_patients: 50, daily_revenue: 50000, monthly_revenue: 1500000, annual_revenue: 18000000, gross_margin: 0.55, net_margin: 0.18 },
    investment_return: { annual_share_income: 1440000, moic: 0.72, irr_estimate: 0.18 }
  }),
  
  result: "pending"
};

// ============================================
// 标的14：服务-眼镜连锁（青岛/每周分成）
// ============================================
export const deal_14_optical = {
  id: "DGT-2026-014",
  company_name: "宝岛眼镜（青岛万象城店）",
  credit_code: "91370202MA3NDEFG14",
  industry: "service",
  industry_sub: "眼镜零售",
  status: "pending",
  region: "山东",
  city: "青岛",
  district: "市南区万象城",
  
  main_business: `宝岛眼镜是中国眼镜零售连锁龙头品牌，提供验光配镜、隐形眼镜、太阳镜等产品及服务。该门店位于青岛万象城购物中心，面积150平米，配备专业验光设备，日均配镜量25-35副。会员体系成熟，复购率高。`,
  
  funding_amount: 65,
  funding_purpose: "验光设备升级（30万）+ 库存（20万）+ 装修（15万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.09,
  cashflow_frequency: "weekly",
  
  contact_name: "林店长",
  contact_phone: "13900000014",
  website: "https://www.baodao.com.cn",
  submitted_date: "2026-01-11T14:00:00.000Z",
  
  project_documents: `【项目名称】宝岛眼镜青岛万象城店收入分成项目

【品牌介绍】
宝岛眼镜创立于1981年，是中国眼镜零售行业领导品牌。
- 全国门店数量：1200+
- 覆盖城市：全国300+城市
- 品牌定位：专业眼镜连锁
- 平均客单价：680元
- 核心业务：验光配镜、隐形眼镜

【门店信息】
- 位置：青岛市市南区万象城2F
- 面积：150平米
- 开业时间：2022年8月
- 租金：6.5万/月
- 员工：8人（含验光师3人）
- 营业时间：10:00-22:00

【经营数据（近12个月平均）】
- 日均配镜：30副
- 日均营收：2万元
- 月均营收：60万元
- 年营收：720万元
- 毛利率：60%
- 净利率：15%

【收入分成机制】
1. 分成来源：门店全部销售收入
2. 分成比例：9%
3. 分成频率：每周结算
4. 特点：眼镜行业毛利高、复购周期2-3年

【投资回报测算】
- 投资金额：65万元
- 年分成收入：720万 × 9% = 64.8万元
- 预期IRR：约24%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 65,
    investment_period_months: 24,
    revenue_share_ratio: 0.09,
    cashflow_frequency: "weekly",
    store_metrics: { area_sqm: 150, rent_monthly: 6.5, staff_count: 8 },
    revenue_data: { daily_sales: 30, daily_revenue: 20000, monthly_revenue: 600000, annual_revenue: 7200000, gross_margin: 0.60, net_margin: 0.15 },
    investment_return: { annual_share_income: 648000, moic: 1.00, irr_estimate: 0.24 }
  }),
  
  result: "pending"
};

// ============================================
// 标的15：服务-洗衣连锁（天津/每周分成）
// ============================================
export const deal_15_laundry = {
  id: "DGT-2026-015",
  company_name: "福奈特洗衣（天津滨江道店）",
  credit_code: "91120101MA05GHIJ15",
  industry: "service",
  industry_sub: "洗衣连锁",
  status: "pending",
  region: "天津",
  city: "天津",
  district: "和平区滨江道",
  
  main_business: `福奈特是中国高端洗衣连锁品牌，提供干洗、水洗、皮具护理、奢侈品护理等服务。该门店位于天津滨江道商圈，辐射周边高端住宅区，主打精细化服务，会员储值占比高，复购率稳定。`,
  
  funding_amount: 40,
  funding_purpose: "设备升级（20万）+ 装修（12万）+ 运营资金（8万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.12,
  cashflow_frequency: "weekly",
  
  contact_name: "赵店长",
  contact_phone: "13900000015",
  website: "https://www.fornet.com.cn",
  submitted_date: "2026-01-11T15:00:00.000Z",
  
  project_documents: `【项目名称】福奈特洗衣天津滨江道店收入分成项目

【品牌介绍】
福奈特创立于1997年，是中国高端洗衣连锁领导品牌。
- 全国门店数量：3000+
- 覆盖城市：全国200+城市
- 品牌定位：高端精细洗护
- 平均客单价：85元
- 核心业务：干洗、奢侈品护理

【门店信息】
- 位置：天津市和平区滨江道步行街
- 面积：80平米
- 开业时间：2021年5月
- 租金：3.5万/月
- 员工：5人
- 营业时间：8:00-21:00

【经营数据（近12个月平均）】
- 日均单量：60单
- 日均营收：5000元
- 月均营收：15万元
- 年营收：180万元
- 毛利率：55%
- 净利率：20%

【收入分成机制】
1. 分成来源：门店全部服务收入
2. 分成比例：12%
3. 分成频率：每周结算
4. 特点：洗衣行业现金流稳定、储值会员占比高

【投资回报测算】
- 投资金额：40万元
- 年分成收入：180万 × 12% = 21.6万元
- 预期IRR：约16%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 40,
    investment_period_months: 24,
    revenue_share_ratio: 0.12,
    cashflow_frequency: "weekly",
    store_metrics: { area_sqm: 80, rent_monthly: 3.5, staff_count: 5 },
    revenue_data: { daily_orders: 60, daily_revenue: 5000, monthly_revenue: 150000, annual_revenue: 1800000, gross_margin: 0.55, net_margin: 0.20 },
    investment_return: { annual_share_income: 216000, moic: 0.54, irr_estimate: 0.16 }
  }),
  
  result: "pending"
};

// ============================================
// 标的16：餐饮-咖啡连锁（厦门/每日分成）
// ============================================
export const deal_16_coffee = {
  id: "DGT-2026-016",
  company_name: "瑞幸咖啡（厦门中山路店）",
  credit_code: "91350203MA31KLMN16",
  industry: "catering",
  industry_sub: "咖啡连锁",
  status: "pending",
  region: "福建",
  city: "厦门",
  district: "思明区中山路",
  
  main_business: `瑞幸咖啡是中国最大的连锁咖啡品牌，以"高品质、高便利性、高性价比"为核心竞争力。该门店位于厦门中山路景区商圈，客流量大，日均杯量350-450杯。APP点单占比80%以上，运营效率高。`,
  
  funding_amount: 50,
  funding_purpose: "设备更新（25万）+ 装修升级（15万）+ 流动资金（10万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "daily",
  
  contact_name: "黄店长",
  contact_phone: "13900000016",
  website: "https://www.luckincoffee.com",
  submitted_date: "2026-01-12T09:00:00.000Z",
  
  project_documents: `【项目名称】瑞幸咖啡厦门中山路店收入分成项目

【品牌介绍】
瑞幸咖啡创立于2017年，是中国最大的连锁咖啡品牌。
- 全国门店数量：18000+
- 覆盖城市：全国300+城市
- 品牌定位：高性价比精品咖啡
- 平均客单价：18元
- 日均杯量（全国平均）：350杯

【门店信息】
- 位置：厦门市思明区中山路步行街
- 面积：45平米（快取店）
- 开业时间：2023年3月
- 租金：3.5万/月
- 员工：4人
- 营业时间：7:00-22:00

【经营数据（近12个月平均）】
- 日均杯量：400杯
- 日均营收：7200元
- 月均营收：21.6万元
- 年营收：259.2万元
- 毛利率：65%
- 净利率：15%

【收入分成机制】
1. 分成来源：门店全部销售收入
2. 分成比例：6%
3. 分成频率：T+1日结算
4. 特点：APP点单占比高、运营效率高、标准化程度高

【投资回报测算】
- 投资金额：50万元
- 年分成收入：259.2万 × 6% = 15.55万元
- 预期IRR：约18%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 50,
    investment_period_months: 24,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 45, rent_monthly: 3.5, staff_count: 4 },
    revenue_data: { daily_cups: 400, avg_price: 18, daily_revenue: 7200, monthly_revenue: 216000, annual_revenue: 2592000, gross_margin: 0.65, net_margin: 0.15 },
    investment_return: { annual_share_income: 155520, moic: 0.62, irr_estimate: 0.18 }
  }),
  
  result: "pending"
};

// ============================================
// 标的17：零售-药店连锁（合肥/每日分成）
// ============================================
export const deal_17_pharmacy = {
  id: "DGT-2026-017",
  company_name: "大参林药店（合肥政务区店）",
  credit_code: "91340100MA2NOPQR17",
  industry: "retail",
  industry_sub: "药店连锁",
  status: "pending",
  region: "安徽",
  city: "合肥",
  district: "政务区天鹅湖",
  
  main_business: `大参林是中国药店零售龙头企业（A股上市），提供处方药、OTC、保健品、医疗器械等产品及服务。该门店位于合肥政务区，周边为高端住宅区，医保定点药店，日均客流量200-300人次。`,
  
  funding_amount: 80,
  funding_purpose: "库存备货（50万）+ 装修升级（20万）+ 运营资金（10万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.05,
  cashflow_frequency: "daily",
  
  contact_name: "刘店长",
  contact_phone: "13900000017",
  website: "https://www.dslyy.com",
  submitted_date: "2026-01-12T10:00:00.000Z",
  
  project_documents: `【项目名称】大参林药店合肥政务区店收入分成项目

【品牌介绍】
大参林创立于1999年，A股上市公司，是中国药店零售龙头企业。
- 全国门店数量：12000+
- 覆盖省份：28个
- 品牌定位：社区健康管理中心
- 平均客单价：85元
- 会员数量：8000万+

【门店信息】
- 位置：合肥市政务区天鹅湖万达广场
- 面积：200平米
- 开业时间：2022年10月
- 租金：5万/月
- 员工：8人（含执业药师2人）
- 营业时间：8:00-22:00

【经营数据（近12个月平均）】
- 日均客流：250人次
- 日均营收：2.1万元
- 月均营收：63万元
- 年营收：756万元
- 毛利率：32%
- 净利率：8%

【收入分成机制】
1. 分成来源：门店全部销售收入（含医保刷卡）
2. 分成比例：5%
3. 分成频率：T+1日结算
4. 特点：药店刚需消费、客流稳定、医保定点

【投资回报测算】
- 投资金额：80万元
- 年分成收入：756万 × 5% = 37.8万元
- 预期IRR：约15%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 80,
    investment_period_months: 30,
    revenue_share_ratio: 0.05,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 200, rent_monthly: 5, staff_count: 8 },
    revenue_data: { daily_customers: 250, daily_revenue: 21000, monthly_revenue: 630000, annual_revenue: 7560000, gross_margin: 0.32, net_margin: 0.08 },
    investment_return: { annual_share_income: 378000, moic: 0.47, irr_estimate: 0.15 }
  }),
  
  result: "pending"
};

// ============================================
// 标的18：教育-早教中心（济南/每月分成）
// ============================================
export const deal_18_education = {
  id: "DGT-2026-018",
  company_name: "金宝贝早教（济南恒隆广场店）",
  credit_code: "91370100MA3QRSTU18",
  industry: "education",
  industry_sub: "早教培训",
  status: "pending",
  region: "山东",
  city: "济南",
  district: "历下区恒隆广场",
  
  main_business: `金宝贝是全球知名的早教品牌，提供0-5岁婴幼儿早期教育服务，包括育乐、音乐、艺术三大课程体系。该中心位于济南恒隆广场，面积500平米，会员家庭800+，课程预付费模式，现金流稳定。`,
  
  funding_amount: 120,
  funding_purpose: "教具更新（40万）+ 装修升级（50万）+ 运营资金（30万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.08,
  cashflow_frequency: "monthly",
  
  contact_name: "孙园长",
  contact_phone: "13900000018",
  website: "https://www.gymboree.com.cn",
  submitted_date: "2026-01-12T11:00:00.000Z",
  
  project_documents: `【项目名称】金宝贝早教济南恒隆广场店收入分成项目

【品牌介绍】
金宝贝（Gymboree）创立于1976年美国，是全球知名早教品牌。
- 中国门店数量：500+
- 覆盖城市：全国100+城市
- 品牌定位：高端早期教育
- 平均课包价格：18000元/60节
- 课程体系：育乐、音乐、艺术

【中心信息】
- 位置：济南市历下区恒隆广场4F
- 面积：500平米
- 开业时间：2021年9月
- 租金：12万/月
- 员工：15人（含早教师10人）
- 营业时间：9:00-20:00

【经营数据（近12个月平均）】
- 在读会员家庭：800+
- 月均新签：35单
- 月均营收：85万元
- 年营收：1020万元
- 毛利率：50%
- 净利率：12%

【收入分成机制】
1. 分成来源：课程销售收入（含续费）
2. 分成比例：8%
3. 分成频率：每月结算（次月5日）
4. 特点：预付费模式、会员粘性高、转介绍率高

【投资回报测算】
- 投资金额：120万元
- 年分成收入：1020万 × 8% = 81.6万元
- 预期IRR：约17%

【风险提示】
1. 政策风险：教育培训行业监管政策变化
2. 人口风险：出生率下降影响生源
3. 退费风险：预付费模式存在退费压力`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 120,
    investment_period_months: 36,
    revenue_share_ratio: 0.08,
    cashflow_frequency: "monthly",
    store_metrics: { area_sqm: 500, rent_monthly: 12, staff_count: 15 },
    revenue_data: { active_members: 800, monthly_new_sales: 35, monthly_revenue: 850000, annual_revenue: 10200000, gross_margin: 0.50, net_margin: 0.12 },
    investment_return: { annual_share_income: 816000, moic: 0.68, irr_estimate: 0.17 }
  }),
  
  result: "pending"
};

// ============================================
// 标的19：餐饮-烧烤连锁（沈阳/每月分成）
// ============================================
export const deal_19_bbq = {
  id: "DGT-2026-019",
  company_name: "木屋烧烤（沈阳中街店）",
  credit_code: "91210100MA0UVWXY19",
  industry: "catering",
  industry_sub: "烧烤连锁",
  status: "pending",
  region: "辽宁",
  city: "沈阳",
  district: "沈河区中街",
  
  main_business: `木屋烧烤是中国烧烤连锁品牌领导者，主打"深夜食堂"概念，产品包括烤串、小龙虾、精酿啤酒等。该门店位于沈阳中街商圈，面积280平米，日均客流150-200桌，夜间经济主力店铺。`,
  
  funding_amount: 100,
  funding_purpose: "设备升级（45万）+ 装修改造（35万）+ 流动资金（20万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.07,
  cashflow_frequency: "monthly",
  
  contact_name: "马经理",
  contact_phone: "13900000019",
  website: "https://www.muwubbq.com",
  submitted_date: "2026-01-12T14:00:00.000Z",
  
  project_documents: `【项目名称】木屋烧烤沈阳中街店收入分成项目

【品牌介绍】
木屋烧烤创立于2003年深圳，是中国烧烤连锁领导品牌。
- 全国门店数量：200+
- 覆盖城市：全国50+城市
- 品牌定位：年轻人的深夜食堂
- 平均客单价：95元
- 核心产品：烤串、小龙虾、精酿

【门店信息】
- 位置：沈阳市沈河区中街大悦城
- 面积：280平米
- 座位：120座
- 开业时间：2023年5月
- 租金：8万/月
- 员工：18人
- 营业时间：16:00-02:00

【经营数据（近12个月平均）】
- 日均桌数：85桌
- 日均营收：2.5万元
- 月均营收：75万元
- 年营收：900万元
- 毛利率：55%
- 净利率：14%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：7%
3. 分成频率：每月结算
4. 特点：夜间经济、啤酒消费带动客单价、年轻客群

【投资回报测算】
- 投资金额：100万元
- 年分成收入：900万 × 7% = 63万元
- 预期IRR：约19%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 100,
    investment_period_months: 30,
    revenue_share_ratio: 0.07,
    cashflow_frequency: "monthly",
    store_metrics: { area_sqm: 280, rent_monthly: 8, staff_count: 18, seats: 120 },
    revenue_data: { daily_tables: 85, daily_revenue: 25000, monthly_revenue: 750000, annual_revenue: 9000000, gross_margin: 0.55, net_margin: 0.14 },
    investment_return: { annual_share_income: 630000, moic: 0.63, irr_estimate: 0.19 }
  }),
  
  result: "pending"
};

// ============================================
// 标的20：零售-水果连锁（昆明/每日分成）
// ============================================
export const deal_20_fruit = {
  id: "DGT-2026-020",
  company_name: "百果园（昆明南屏街店）",
  credit_code: "91530100MA6PYZAB20",
  industry: "retail",
  industry_sub: "水果连锁",
  status: "pending",
  region: "云南",
  city: "昆明",
  district: "五华区南屏街",
  
  main_business: `百果园是中国最大的水果零售连锁品牌（港股上市），以"好吃是检验水果的唯一标准"为理念，建立了完善的水果品质分级体系。该门店位于昆明南屏街，云南水果资源丰富，门店主打本地特色水果+进口精品。`,
  
  funding_amount: 55,
  funding_purpose: "冷链设备（25万）+ 装修升级（18万）+ 流动资金（12万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "daily",
  
  contact_name: "杨店长",
  contact_phone: "13900000020",
  website: "https://www.pagoda.com.cn",
  submitted_date: "2026-01-12T15:00:00.000Z",
  
  project_documents: `【项目名称】百果园昆明南屏街店收入分成项目

【品牌介绍】
百果园创立于2001年，港股上市公司，是中国最大的水果零售连锁。
- 全国门店数量：5600+
- 覆盖城市：全国150+城市
- 品牌定位：高品质水果专卖
- 平均客单价：68元
- 会员数量：7000万+

【门店信息】
- 位置：昆明市五华区南屏街商圈
- 面积：80平米
- 开业时间：2022年6月
- 租金：3.2万/月
- 员工：5人
- 营业时间：7:00-23:00

【经营数据（近12个月平均）】
- 日均客流：180人次
- 日均营收：1.2万元
- 月均营收：36万元
- 年营收：432万元
- 毛利率：28%
- 净利率：8%

【收入分成机制】
1. 分成来源：门店全部销售收入
2. 分成比例：6%
3. 分成频率：T+1日结算
4. 特点：高频消费、复购率高、会员粘性强

【投资回报测算】
- 投资金额：55万元
- 年分成收入：432万 × 6% = 25.92万元
- 预期IRR：约14%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 55,
    investment_period_months: 24,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 80, rent_monthly: 3.2, staff_count: 5 },
    revenue_data: { daily_customers: 180, daily_revenue: 12000, monthly_revenue: 360000, annual_revenue: 4320000, gross_margin: 0.28, net_margin: 0.08 },
    investment_return: { annual_share_income: 259200, moic: 0.47, irr_estimate: 0.14 }
  }),
  
  result: "pending"
};

// ============================================
// 标的21：服务-汽车洗美（石家庄/每周分成）
// ============================================
export const deal_21_carwash = {
  id: "DGT-2026-021",
  company_name: "驰加汽车服务（石家庄万达店）",
  credit_code: "91130100MA07BCDE21",
  industry: "service",
  industry_sub: "汽车洗美",
  status: "pending",
  region: "河北",
  city: "石家庄",
  district: "裕华区万达广场",
  
  main_business: `驰加是米其林旗下的汽车服务连锁品牌，提供轮胎更换、汽车保养、洗车美容等一站式服务。该门店位于石家庄万达广场停车场出口，车流量大，日均服务车辆80-120台，会员储值体系成熟。`,
  
  funding_amount: 75,
  funding_purpose: "设备升级（35万）+ 装修改造（25万）+ 运营资金（15万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.10,
  cashflow_frequency: "weekly",
  
  contact_name: "周经理",
  contact_phone: "13900000021",
  website: "https://www.tyreplus.com.cn",
  submitted_date: "2026-01-13T09:00:00.000Z",
  
  project_documents: `【项目名称】驰加汽车服务石家庄万达店收入分成项目

【品牌介绍】
驰加是米其林旗下的汽车服务连锁品牌，创立于2002年。
- 全国门店数量：1800+
- 覆盖城市：全国260+城市
- 品牌定位：专业汽车服务
- 平均客单价：350元
- 核心业务：轮胎、保养、洗美

【门店信息】
- 位置：石家庄市裕华区万达广场停车场出口
- 面积：350平米（含工位6个）
- 开业时间：2022年3月
- 租金：4.5万/月
- 员工：10人（含技师6人）
- 营业时间：8:00-20:00

【经营数据（近12个月平均）】
- 日均服务车辆：100台
- 日均营收：1.8万元
- 月均营收：54万元
- 年营收：648万元
- 毛利率：45%
- 净利率：15%

【收入分成机制】
1. 分成来源：门店全部服务收入
2. 分成比例：10%
3. 分成频率：每周结算
4. 特点：汽车后市场刚需、米其林品牌背书

【投资回报测算】
- 投资金额：75万元
- 年分成收入：648万 × 10% = 64.8万元
- 预期IRR：约22%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 75,
    investment_period_months: 30,
    revenue_share_ratio: 0.10,
    cashflow_frequency: "weekly",
    store_metrics: { area_sqm: 350, rent_monthly: 4.5, staff_count: 10, service_bays: 6 },
    revenue_data: { daily_cars: 100, daily_revenue: 18000, monthly_revenue: 540000, annual_revenue: 6480000, gross_margin: 0.45, net_margin: 0.15 },
    investment_return: { annual_share_income: 648000, moic: 0.86, irr_estimate: 0.22 }
  }),
  
  result: "pending"
};

// ============================================
// 标的22：餐饮-面食连锁（兰州/每日分成）
// ============================================
export const deal_22_noodle = {
  id: "DGT-2026-022",
  company_name: "马子禄牛肉面（兰州正宁路店）",
  credit_code: "91620100MA72FGHI22",
  industry: "catering",
  industry_sub: "面食连锁",
  status: "pending",
  region: "甘肃",
  city: "兰州",
  district: "城关区正宁路",
  
  main_business: `马子禄是兰州牛肉面百年老字号，创立于1954年，是兰州牛肉面的标杆品牌。该门店位于兰州正宁路美食街，是游客必打卡店铺，日均出面1200-1500碗，排队是常态。`,
  
  funding_amount: 30,
  funding_purpose: "设备更新（12万）+ 装修改造（10万）+ 流动资金（8万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.08,
  cashflow_frequency: "daily",
  
  contact_name: "马经理",
  contact_phone: "13900000022",
  website: "https://www.mazilu.com",
  submitted_date: "2026-01-13T10:00:00.000Z",
  
  project_documents: `【项目名称】马子禄牛肉面兰州正宁路店收入分成项目

【品牌介绍】
马子禄创立于1954年，是兰州牛肉面百年老字号、非物质文化遗产。
- 全国门店数量：50+
- 品牌定位：正宗兰州牛肉面
- 平均客单价：22元
- 核心产品：牛肉面、牛肉、小菜
- 荣誉：央视纪录片《舌尖上的中国》推荐

【门店信息】
- 位置：兰州市城关区正宁路美食街
- 面积：150平米
- 座位：80座
- 开业时间：2018年（老店翻新）
- 租金：2.5万/月
- 员工：12人（含拉面师傅4人）
- 营业时间：6:00-21:00

【经营数据（近12个月平均）】
- 日均出面：1350碗
- 日均营收：2.97万元
- 月均营收：89.1万元
- 年营收：1069.2万元
- 毛利率：58%
- 净利率：22%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：8%
3. 分成频率：T+1日结算
4. 特点：老字号品牌、旅游流量大、客单价低但翻台高

【投资回报测算】
- 投资金额：30万元
- 年分成收入：1069.2万 × 8% = 85.54万元
- 预期IRR：约65%（高周转模式）`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 30,
    investment_period_months: 24,
    revenue_share_ratio: 0.08,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 150, rent_monthly: 2.5, staff_count: 12, seats: 80 },
    revenue_data: { daily_bowls: 1350, avg_price: 22, daily_revenue: 29700, monthly_revenue: 891000, annual_revenue: 10692000, gross_margin: 0.58, net_margin: 0.22 },
    investment_return: { annual_share_income: 855360, moic: 2.85, irr_estimate: 0.65 }
  }),
  
  result: "pending"
};

// ============================================
// 标的23：零售-零食连锁（长春/每日分成）
// ============================================
export const deal_23_snack = {
  id: "DGT-2026-023",
  company_name: "良品铺子（长春欧亚卖场店）",
  credit_code: "91220100MA0WJKLM23",
  industry: "retail",
  industry_sub: "零食连锁",
  status: "pending",
  region: "吉林",
  city: "长春",
  district: "朝阳区欧亚卖场",
  
  main_business: `良品铺子是中国高端零食领导品牌（A股上市），主打"高端零食"定位。该门店位于长春欧亚卖场（亚洲单体最大商场），客流量极大，主打礼盒装零食，客单价高。`,
  
  funding_amount: 48,
  funding_purpose: "库存备货（28万）+ 装修升级（12万）+ 运营资金（8万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.07,
  cashflow_frequency: "daily",
  
  contact_name: "吴店长",
  contact_phone: "13900000023",
  website: "https://www.lppz.com",
  submitted_date: "2026-01-13T11:00:00.000Z",
  
  project_documents: `【项目名称】良品铺子长春欧亚卖场店收入分成项目

【品牌介绍】
良品铺子创立于2006年，A股上市公司，是中国高端零食领导品牌。
- 全国门店数量：3000+
- 覆盖城市：全国200+城市
- 品牌定位：高端零食专家
- 平均客单价：85元
- SKU数量：1400+

【门店信息】
- 位置：长春市朝阳区欧亚卖场1F
- 面积：100平米
- 开业时间：2023年1月
- 租金：4.5万/月
- 员工：6人
- 营业时间：9:30-21:30

【经营数据（近12个月平均）】
- 日均客流：150人次
- 日均营收：1.3万元
- 月均营收：39万元
- 年营收：468万元
- 毛利率：38%
- 净利率：10%

【收入分成机制】
1. 分成来源：门店全部销售收入
2. 分成比例：7%
3. 分成频率：T+1日结算
4. 特点：礼盒装销售占比高、节假日爆发力强

【投资回报测算】
- 投资金额：48万元
- 年分成收入：468万 × 7% = 32.76万元
- 预期IRR：约18%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 48,
    investment_period_months: 24,
    revenue_share_ratio: 0.07,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 100, rent_monthly: 4.5, staff_count: 6 },
    revenue_data: { daily_customers: 150, daily_revenue: 13000, monthly_revenue: 390000, annual_revenue: 4680000, gross_margin: 0.38, net_margin: 0.10 },
    investment_return: { annual_share_income: 327600, moic: 0.68, irr_estimate: 0.18 }
  }),
  
  result: "pending"
};

// ============================================
// 标的24：服务-月子中心（无锡/每月分成）
// ============================================
export const deal_24_maternity = {
  id: "DGT-2026-024",
  company_name: "爱帝宫月子中心（无锡太湖新城店）",
  credit_code: "91320200MA1XNOPQ24",
  industry: "service",
  industry_sub: "月子中心",
  status: "pending",
  region: "江苏",
  city: "无锡",
  district: "滨湖区太湖新城",
  
  main_business: `爱帝宫是中国高端月子中心领导品牌（港股上市），提供产后康复、新生儿护理、营养膳食等一站式月子服务。该中心位于无锡太湖新城高端住宅区，配备28间套房，月入住率稳定在85%以上。`,
  
  funding_amount: 250,
  funding_purpose: "装修升级（120万）+ 设备更新（80万）+ 运营资金（50万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "monthly",
  
  contact_name: "钱院长",
  contact_phone: "13900000024",
  website: "https://www.aidigong.com",
  submitted_date: "2026-01-13T14:00:00.000Z",
  
  project_documents: `【项目名称】爱帝宫月子中心无锡太湖新城店收入分成项目

【品牌介绍】
爱帝宫创立于2007年，港股上市公司，是中国高端月子中心领导品牌。
- 全国门店数量：35+
- 覆盖城市：深圳、北京、上海、成都等一二线
- 品牌定位：高端月子护理
- 平均套餐价格：8.8万元/28天
- 核心服务：产后康复、新生儿护理、营养膳食

【中心信息】
- 位置：无锡市滨湖区太湖新城
- 面积：2500平米
- 房间数：28间套房
- 开业时间：2022年8月
- 租金：25万/月
- 员工：50人（含护士、营养师、康复师）

【经营数据（近12个月平均）】
- 入住率：85%
- 月均入住：24位产妇
- 月均营收：180万元
- 年营收：2160万元
- 毛利率：45%
- 净利率：12%

【收入分成机制】
1. 分成来源：月子套餐收入
2. 分成比例：6%
3. 分成频率：每月结算
4. 特点：高客单价、预付费模式、口碑传播强

【投资回报测算】
- 投资金额：250万元
- 年分成收入：2160万 × 6% = 129.6万元
- 预期IRR：约15%

【风险提示】
1. 人口风险：出生率下降影响客源
2. 服务风险：母婴安全是核心关注点
3. 竞争风险：月子中心市场竞争激烈`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 250,
    investment_period_months: 36,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "monthly",
    store_metrics: { area_sqm: 2500, rent_monthly: 25, staff_count: 50, rooms: 28 },
    revenue_data: { occupancy_rate: 0.85, monthly_guests: 24, avg_package_price: 88000, monthly_revenue: 1800000, annual_revenue: 21600000, gross_margin: 0.45, net_margin: 0.12 },
    investment_return: { annual_share_income: 1296000, moic: 0.52, irr_estimate: 0.15 }
  }),
  
  result: "pending"
};

// ============================================
// 标的25：餐饮-茶餐厅（东莞/每日分成）
// ============================================
export const deal_25_teahouse = {
  id: "DGT-2026-025",
  company_name: "太兴餐厅（东莞松山湖店）",
  credit_code: "91441900MA52RSTU25",
  industry: "catering",
  industry_sub: "茶餐厅",
  status: "pending",
  region: "广东",
  city: "东莞",
  district: "松山湖高新区",
  
  main_business: `太兴是香港知名茶餐厅品牌（港股上市），主打港式茶餐厅文化，提供烧味、茶点、港式奶茶等。该门店位于东莞松山湖华为园区附近，主要服务周边科技企业白领，日均客流稳定。`,
  
  funding_amount: 90,
  funding_purpose: "装修改造（45万）+ 设备升级（30万）+ 流动资金（15万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "daily",
  
  contact_name: "谭经理",
  contact_phone: "13900000025",
  website: "https://www.taixing.com",
  submitted_date: "2026-01-13T15:00:00.000Z",
  
  project_documents: `【项目名称】太兴餐厅东莞松山湖店收入分成项目

【品牌介绍】
太兴创立于1989年香港，港股上市公司，是香港知名茶餐厅品牌。
- 全国门店数量：200+（含香港）
- 品牌定位：正宗港式茶餐厅
- 平均客单价：65元
- 核心产品：烧味、茶点、港式奶茶

【门店信息】
- 位置：东莞市松山湖万科生活广场
- 面积：200平米
- 座位：100座
- 开业时间：2023年6月
- 租金：6万/月
- 员工：15人
- 营业时间：10:00-22:00

【经营数据（近12个月平均）】
- 日均客流：200人次
- 日均营收：1.3万元
- 月均营收：39万元
- 年营收：468万元
- 毛利率：55%
- 净利率：12%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：6%
3. 分成频率：T+1日结算
4. 特点：港式品牌溢价、白领客群稳定

【投资回报测算】
- 投资金额：90万元
- 年分成收入：468万 × 6% = 28.08万元
- 预期IRR：约12%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 90,
    investment_period_months: 30,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 200, rent_monthly: 6, staff_count: 15, seats: 100 },
    revenue_data: { daily_customers: 200, daily_revenue: 13000, monthly_revenue: 390000, annual_revenue: 4680000, gross_margin: 0.55, net_margin: 0.12 },
    investment_return: { annual_share_income: 280800, moic: 0.31, irr_estimate: 0.12 }
  }),
  
  result: "pending"
};

// ============================================
// 标的26：服务-瑜伽馆（佛山/每周分成）
// ============================================
export const deal_26_yoga = {
  id: "DGT-2026-026",
  company_name: "梵音瑜伽（佛山千灯湖店）",
  credit_code: "91440600MA4WVWXY26",
  industry: "service",
  industry_sub: "瑜伽健身",
  status: "pending",
  region: "广东",
  city: "佛山",
  district: "南海区千灯湖",
  
  main_business: `梵音瑜伽是中国高端瑜伽连锁品牌，专注于专业瑜伽教学，以"让更多人因瑜伽受益"为使命。该馆位于佛山千灯湖高端社区，配备专业瑜伽教室4间，会员1200+人，复购率高。`,
  
  funding_amount: 70,
  funding_purpose: "装修升级（35万）+ 设备更新（20万）+ 运营资金（15万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.11,
  cashflow_frequency: "weekly",
  
  contact_name: "李馆长",
  contact_phone: "13900000026",
  website: "https://www.fanyin.com",
  submitted_date: "2026-01-14T09:00:00.000Z",
  
  project_documents: `【项目名称】梵音瑜伽佛山千灯湖店收入分成项目

【品牌介绍】
梵音瑜伽创立于2002年，是中国高端瑜伽连锁领导品牌。
- 全国门店数量：80+
- 覆盖城市：北京、上海、广州、深圳等
- 品牌定位：专业高端瑜伽
- 年卡均价：12000元
- 核心课程：哈他瑜伽、流瑜伽、空中瑜伽

【场馆信息】
- 位置：佛山市南海区千灯湖保利洲际酒店旁
- 面积：450平米
- 教室：4间（含空中瑜伽教室）
- 开业时间：2022年5月
- 租金：5.5万/月
- 员工：12人（含瑜伽老师8人）
- 营业时间：7:00-22:00

【经营数据（近12个月平均）】
- 活跃会员：1200人
- 月均销售：45万元
- 年营收：540万元
- 毛利率：55%
- 净利率：18%

【收入分成机制】
1. 分成来源：会员卡销售+私教课收入
2. 分成比例：11%
3. 分成频率：每周结算
4. 特点：女性消费升级、会员粘性强

【投资回报测算】
- 投资金额：70万元
- 年分成收入：540万 × 11% = 59.4万元
- 预期IRR：约21%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 70,
    investment_period_months: 24,
    revenue_share_ratio: 0.11,
    cashflow_frequency: "weekly",
    store_metrics: { area_sqm: 450, rent_monthly: 5.5, staff_count: 12, studios: 4 },
    revenue_data: { active_members: 1200, monthly_revenue: 450000, annual_revenue: 5400000, gross_margin: 0.55, net_margin: 0.18 },
    investment_return: { annual_share_income: 594000, moic: 0.85, irr_estimate: 0.21 }
  }),
  
  result: "pending"
};

// ============================================
// 标的27：零售-家居用品（南宁/每日分成）
// ============================================
export const deal_27_home = {
  id: "DGT-2026-027",
  company_name: "名创优品（南宁万象城店）",
  credit_code: "91450100MA5NYZAB27",
  industry: "retail",
  industry_sub: "家居生活",
  status: "pending",
  region: "广西",
  city: "南宁",
  district: "青秀区万象城",
  
  main_business: `名创优品是全球知名的生活好物集合店品牌（港股、美股双上市），以"优质、创意、低价"为核心竞争力。该门店位于南宁万象城核心位置，面积180平米，SKU丰富，日均客流量高。`,
  
  funding_amount: 60,
  funding_purpose: "库存备货（35万）+ 装修升级（15万）+ 运营资金（10万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "daily",
  
  contact_name: "韦店长",
  contact_phone: "13900000027",
  website: "https://www.miniso.com",
  submitted_date: "2026-01-14T10:00:00.000Z",
  
  project_documents: `【项目名称】名创优品南宁万象城店收入分成项目

【品牌介绍】
名创优品创立于2013年，港股+美股双上市公司。
- 全球门店数量：5500+
- 覆盖国家：100+
- 品牌定位：生活好物集合店
- 平均客单价：35元
- SKU数量：8000+

【门店信息】
- 位置：南宁市青秀区万象城B1层
- 面积：180平米
- 开业时间：2023年3月
- 租金：7.5万/月
- 员工：8人
- 营业时间：10:00-22:00

【经营数据（近12个月平均）】
- 日均客流：350人次
- 日均营收：1.2万元
- 月均营收：36万元
- 年营收：432万元
- 毛利率：40%
- 净利率：10%

【收入分成机制】
1. 分成来源：门店全部销售收入
2. 分成比例：6%
3. 分成频率：T+1日结算
4. 特点：高频消费、IP联名产品带动销售

【投资回报测算】
- 投资金额：60万元
- 年分成收入：432万 × 6% = 25.92万元
- 预期IRR：约13%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 60,
    investment_period_months: 24,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "daily",
    store_metrics: { area_sqm: 180, rent_monthly: 7.5, staff_count: 8 },
    revenue_data: { daily_customers: 350, daily_revenue: 12000, monthly_revenue: 360000, annual_revenue: 4320000, gross_margin: 0.40, net_margin: 0.10 },
    investment_return: { annual_share_income: 259200, moic: 0.43, irr_estimate: 0.13 }
  }),
  
  result: "pending"
};

// ============================================
// 标的28：服务-宠物店（哈尔滨/每周分成）
// ============================================
export const deal_28_petshop = {
  id: "DGT-2026-028",
  company_name: "宠物家（哈尔滨中央大街店）",
  credit_code: "91230100MA19BCDE28",
  industry: "service",
  industry_sub: "宠物服务",
  status: "pending",
  region: "黑龙江",
  city: "哈尔滨",
  district: "道里区中央大街",
  
  main_business: `宠物家是中国连锁宠物店领导品牌，提供宠物用品销售、宠物美容、寄养等一站式服务。该门店位于哈尔滨中央大街商圈，面积200平米，服务周边高端社区宠物家庭。`,
  
  funding_amount: 50,
  funding_purpose: "美容设备（20万）+ 库存（18万）+ 装修（12万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.10,
  cashflow_frequency: "weekly",
  
  contact_name: "于店长",
  contact_phone: "13900000028",
  website: "https://www.petshome.com",
  submitted_date: "2026-01-14T11:00:00.000Z",
  
  project_documents: `【项目名称】宠物家哈尔滨中央大街店收入分成项目

【品牌介绍】
宠物家是中国连锁宠物店领导品牌，阿里巴巴投资。
- 全国门店数量：400+
- 覆盖城市：全国100+城市
- 品牌定位：一站式宠物服务
- 平均客单价：180元
- 核心业务：用品销售、美容、寄养

【门店信息】
- 位置：哈尔滨市道里区中央大街远大购物中心
- 面积：200平米
- 开业时间：2022年9月
- 租金：4万/月
- 员工：8人（含宠物美容师3人）
- 营业时间：9:00-21:00

【经营数据（近12个月平均）】
- 日均客流：80人次
- 日均营收：8500元
- 月均营收：25.5万元
- 年营收：306万元
- 毛利率：45%
- 净利率：15%

【收入分成机制】
1. 分成来源：全部销售及服务收入
2. 分成比例：10%
3. 分成频率：每周结算
4. 特点：宠物经济增长快、会员复购率高

【投资回报测算】
- 投资金额：50万元
- 年分成收入：306万 × 10% = 30.6万元
- 预期IRR：约19%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 50,
    investment_period_months: 24,
    revenue_share_ratio: 0.10,
    cashflow_frequency: "weekly",
    store_metrics: { area_sqm: 200, rent_monthly: 4, staff_count: 8 },
    revenue_data: { daily_customers: 80, daily_revenue: 8500, monthly_revenue: 255000, annual_revenue: 3060000, gross_margin: 0.45, net_margin: 0.15 },
    investment_return: { annual_share_income: 306000, moic: 0.61, irr_estimate: 0.19 }
  }),
  
  result: "pending"
};

// ============================================
// 标的29：餐饮-火锅（贵阳/每月分成）
// ============================================
export const deal_29_hotpot2 = {
  id: "DGT-2026-029",
  company_name: "巴奴毛肚火锅（贵阳花果园店）",
  credit_code: "91520100MA6QFGHI29",
  industry: "catering",
  industry_sub: "火锅连锁",
  status: "pending",
  region: "贵州",
  city: "贵阳",
  district: "南明区花果园",
  
  main_business: `巴奴是中国高端火锅连锁品牌，以"服务不过度，样样都讲究"为理念，主打毛肚火锅。该门店位于贵阳花果园超级综合体，面积450平米，周末排队常态化，客单价较高。`,
  
  funding_amount: 180,
  funding_purpose: "装修升级（90万）+ 设备更新（50万）+ 运营资金（40万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "monthly",
  
  contact_name: "田经理",
  contact_phone: "13900000029",
  website: "https://www.banu.com",
  submitted_date: "2026-01-14T14:00:00.000Z",
  
  project_documents: `【项目名称】巴奴毛肚火锅贵阳花果园店收入分成项目

【品牌介绍】
巴奴创立于2001年，是中国高端火锅连锁品牌。
- 全国门店数量：100+
- 覆盖城市：全国40+城市
- 品牌定位：高端毛肚火锅
- 平均客单价：145元
- 核心产品：毛肚、鲜鸭血、菌汤

【门店信息】
- 位置：贵阳市南明区花果园购物中心4F
- 面积：450平米
- 座位：180座
- 开业时间：2023年8月
- 租金：12万/月
- 员工：35人
- 营业时间：11:00-23:00

【经营数据（近12个月平均）】
- 日均翻台：3.8次
- 日均营收：4.2万元
- 月均营收：126万元
- 年营收：1512万元
- 毛利率：58%
- 净利率：14%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：6%
3. 分成频率：每月结算
4. 特点：高端火锅品牌溢价、翻台率高

【投资回报测算】
- 投资金额：180万元
- 年分成收入：1512万 × 6% = 90.72万元
- 预期IRR：约16%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 180,
    investment_period_months: 36,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "monthly",
    store_metrics: { area_sqm: 450, rent_monthly: 12, staff_count: 35, seats: 180 },
    revenue_data: { daily_turnover: 3.8, daily_revenue: 42000, monthly_revenue: 1260000, annual_revenue: 15120000, gross_margin: 0.58, net_margin: 0.14 },
    investment_return: { annual_share_income: 907200, moic: 0.50, irr_estimate: 0.16 }
  }),
  
  result: "pending"
};

// ============================================
// 标的30：文娱-剧本杀（武汉/每月分成）
// ============================================
export const deal_30_mystery = {
  id: "DGT-2026-030",
  company_name: "谜探剧本杀（武汉楚河汉街店）",
  credit_code: "91420100MA4XJKLM30",
  industry: "entertainment",
  industry_sub: "剧本娱乐",
  status: "pending",
  region: "湖北",
  city: "武汉",
  district: "武昌区楚河汉街",
  
  main_business: `谜探是华中地区知名的剧本杀连锁品牌，以沉浸式体验和原创剧本为核心竞争力。该门店位于武汉楚河汉街商圈，配备12个主题房间，年轻客群为主，周末满房率95%以上。`,
  
  funding_amount: 85,
  funding_purpose: "主题房间升级（45万）+ 剧本采购（20万）+ 运营资金（20万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.12,
  cashflow_frequency: "monthly",
  
  contact_name: "陈老板",
  contact_phone: "13900000030",
  website: "https://www.mitan.com",
  submitted_date: "2026-01-14T15:00:00.000Z",
  
  project_documents: `【项目名称】谜探剧本杀武汉楚河汉街店收入分成项目

【品牌介绍】
谜探创立于2019年，是华中地区知名剧本杀连锁品牌。
- 门店数量：15+
- 覆盖城市：武汉、长沙、南昌等
- 品牌定位：沉浸式推理娱乐
- 平均客单价：120元/人
- 核心优势：原创剧本、沉浸式场景

【门店信息】
- 位置：武汉市武昌区楚河汉街
- 面积：600平米
- 房间数：12间主题房
- 开业时间：2022年12月
- 租金：8万/月
- 员工：20人（含DM主持人12人）
- 营业时间：14:00-02:00

【经营数据（近12个月平均）】
- 日均场次：15场
- 日均营收：1.2万元
- 月均营收：36万元
- 年营收：432万元
- 毛利率：60%
- 净利率：20%

【收入分成机制】
1. 分成来源：门店全部消费收入
2. 分成比例：12%
3. 分成频率：每月结算
4. 特点：年轻消费群体、社交娱乐刚需

【投资回报测算】
- 投资金额：85万元
- 年分成收入：432万 × 12% = 51.84万元
- 预期IRR：约18%

【风险提示】
1. 行业风险：剧本杀行业竞争激烈
2. 内容风险：剧本更新频率要求高
3. 季节风险：学生假期是旺季`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 85,
    investment_period_months: 24,
    revenue_share_ratio: 0.12,
    cashflow_frequency: "monthly",
    store_metrics: { area_sqm: 600, rent_monthly: 8, staff_count: 20, rooms: 12 },
    revenue_data: { daily_sessions: 15, daily_revenue: 12000, monthly_revenue: 360000, annual_revenue: 4320000, gross_margin: 0.60, net_margin: 0.20 },
    investment_return: { annual_share_income: 518400, moic: 0.61, irr_estimate: 0.18 }
  }),
  
  result: "pending"
};

// ============================================
// 导出所有扩展标的
// ============================================
export const extendedDeals = [
  deal_11_bakery,     // 鲍师傅-苏州-每日
  deal_12_baby,       // 孩子王-郑州-每日
  deal_13_dental,     // 通策口腔-长沙-每周
  deal_14_optical,    // 宝岛眼镜-青岛-每周
  deal_15_laundry,    // 福奈特-天津-每周
  deal_16_coffee,     // 瑞幸咖啡-厦门-每日
  deal_17_pharmacy,   // 大参林-合肥-每日
  deal_18_education,  // 金宝贝-济南-每月
  deal_19_bbq,        // 木屋烧烤-沈阳-每月
  deal_20_fruit,      // 百果园-昆明-每日
  deal_21_carwash,    // 驰加-石家庄-每周
  deal_22_noodle,     // 马子禄-兰州-每日
  deal_23_snack,      // 良品铺子-长春-每日
  deal_24_maternity,  // 爱帝宫-无锡-每月
  deal_25_teahouse,   // 太兴-东莞-每日
  deal_26_yoga,       // 梵音瑜伽-佛山-每周
  deal_27_home,       // 名创优品-南宁-每日
  deal_28_petshop,    // 宠物家-哈尔滨-每周
  deal_29_hotpot2,    // 巴奴火锅-贵阳-每月
  deal_30_mystery     // 谜探剧本杀-武汉-每月
];

// ============================================
// 扩展标的摘要信息
// ============================================
export const extendedDealsSummary = [
  { id: "DGT-2026-011", name: "鲍师傅苏州观前街店", industry: "餐饮-烘焙", city: "苏州", amount: 45, share: "7%", frequency: "每日", irr: "25%" },
  { id: "DGT-2026-012", name: "孩子王郑州正弘城店", industry: "零售-母婴", city: "郑州", amount: 150, share: "4%", frequency: "每日", irr: "20%" },
  { id: "DGT-2026-013", name: "通策口腔长沙五一广场店", industry: "服务-口腔医疗", city: "长沙", amount: 200, share: "8%", frequency: "每周", irr: "18%" },
  { id: "DGT-2026-014", name: "宝岛眼镜青岛万象城店", industry: "服务-眼镜零售", city: "青岛", amount: 65, share: "9%", frequency: "每周", irr: "24%" },
  { id: "DGT-2026-015", name: "福奈特洗衣天津滨江道店", industry: "服务-洗衣", city: "天津", amount: 40, share: "12%", frequency: "每周", irr: "16%" },
  { id: "DGT-2026-016", name: "瑞幸咖啡厦门中山路店", industry: "餐饮-咖啡", city: "厦门", amount: 50, share: "6%", frequency: "每日", irr: "18%" },
  { id: "DGT-2026-017", name: "大参林药店合肥政务区店", industry: "零售-药店", city: "合肥", amount: 80, share: "5%", frequency: "每日", irr: "15%" },
  { id: "DGT-2026-018", name: "金宝贝早教济南恒隆店", industry: "教育-早教", city: "济南", amount: 120, share: "8%", frequency: "每月", irr: "17%" },
  { id: "DGT-2026-019", name: "木屋烧烤沈阳中街店", industry: "餐饮-烧烤", city: "沈阳", amount: 100, share: "7%", frequency: "每月", irr: "19%" },
  { id: "DGT-2026-020", name: "百果园昆明南屏街店", industry: "零售-水果", city: "昆明", amount: 55, share: "6%", frequency: "每日", irr: "14%" },
  { id: "DGT-2026-021", name: "驰加汽服石家庄万达店", industry: "服务-汽车洗美", city: "石家庄", amount: 75, share: "10%", frequency: "每周", irr: "22%" },
  { id: "DGT-2026-022", name: "马子禄牛肉面兰州正宁路店", industry: "餐饮-面食", city: "兰州", amount: 30, share: "8%", frequency: "每日", irr: "65%" },
  { id: "DGT-2026-023", name: "良品铺子长春欧亚店", industry: "零售-零食", city: "长春", amount: 48, share: "7%", frequency: "每日", irr: "18%" },
  { id: "DGT-2026-024", name: "爱帝宫月子中心无锡店", industry: "服务-月子中心", city: "无锡", amount: 250, share: "6%", frequency: "每月", irr: "15%" },
  { id: "DGT-2026-025", name: "太兴餐厅东莞松山湖店", industry: "餐饮-茶餐厅", city: "东莞", amount: 90, share: "6%", frequency: "每日", irr: "12%" },
  { id: "DGT-2026-026", name: "梵音瑜伽佛山千灯湖店", industry: "服务-瑜伽健身", city: "佛山", amount: 70, share: "11%", frequency: "每周", irr: "21%" },
  { id: "DGT-2026-027", name: "名创优品南宁万象城店", industry: "零售-家居生活", city: "南宁", amount: 60, share: "6%", frequency: "每日", irr: "13%" },
  { id: "DGT-2026-028", name: "宠物家哈尔滨中央大街店", industry: "服务-宠物", city: "哈尔滨", amount: 50, share: "10%", frequency: "每周", irr: "19%" },
  { id: "DGT-2026-029", name: "巴奴火锅贵阳花果园店", industry: "餐饮-火锅", city: "贵阳", amount: 180, share: "6%", frequency: "每月", irr: "16%" },
  { id: "DGT-2026-030", name: "谜探剧本杀武汉楚河汉街店", industry: "文娱-剧本娱乐", city: "武汉", amount: 85, share: "12%", frequency: "每月", irr: "18%" }
];
