# 滴灌通智能体筛选系统 - 数据规范

**版本**: 1.0.0  
**更新日期**: 2026-01-19

---

## 1. 金额单位规范

### 1.1 存储单位（数据库/种子数据）

| 字段名 | 存储单位 | 说明 |
|--------|---------|------|
| `funding_amount` | **万元** | 融资需求金额 |
| `invested_amount` | **元** | 实际投资金额 |
| `total_cashflow` | **元** | 累计回款总额 |
| `cashflow_records.amount` | **元** | 单笔回款金额 |
| `transactions.amount` | **元** | 交易金额 |
| `financial_data.investment_amount` | **万元** | 与funding_amount一致 |
| `financial_data.revenue_data.*_revenue` | **元** | 营收数据（日/月/年） |
| `financial_data.store_metrics.rent_monthly` | **万元** | 月租金 |
| `financial_data.guarantee_mechanism.deposit` | **万元** | 保证金 |

### 1.2 转换规则

```javascript
// 万元 → 元
amountInYuan = amountInWanYuan * 10000

// 元 → 万元
amountInWanYuan = amountInYuan / 10000

// 显示格式化
formatMoney(amount, unit) {
  if (unit === 'yuan') {
    if (amount >= 100000000) return (amount / 100000000).toFixed(2) + '亿元'
    if (amount >= 10000) return (amount / 10000).toFixed(2) + '万元'
    return amount.toFixed(2) + '元'
  }
  if (unit === 'wan') {
    if (amount >= 10000) return (amount / 10000).toFixed(2) + '亿元'
    return amount.toFixed(2) + '万元'
  }
}
```

### 1.3 API响应规范

API响应中的金额字段统一包含 `_unit` 后缀说明：

```json
{
  "success": true,
  "data": {
    "funding_amount": 35,
    "funding_amount_unit": "万元",
    "invested_amount": 350000,
    "invested_amount_unit": "元",
    "total_cashflow": 245000,
    "total_cashflow_unit": "元"
  },
  "meta": {
    "currency": "CNY",
    "amount_notes": {
      "funding_amount": "万元",
      "invested_amount": "元",
      "total_cashflow": "元"
    }
  }
}
```

---

## 2. 标的字段规范

### 2.1 核心字段（必填）

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `id` | string | 标的ID | "DGT-2026-001" |
| `company_name` | string | 企业名称 | "蜜雪冰城（深圳南山店）" |
| `industry` | string | 行业代码 | "catering" |
| `status` | string | 状态 | "pending" |
| `funding_amount` | number | 融资金额（万元） | 35 |
| `revenue_share_ratio` | number | 分成比例 | 0.08 |
| `cashflow_frequency` | string | 回款频率 | "daily" |
| `region` | string | 地区 | "广东" |
| `city` | string | 城市 | "深圳" |

### 2.2 扩展字段（选填）

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `industry_sub` | string | 子行业 | "茶饮连锁" |
| `district` | string | 区域 | "南山区科技园" |
| `credit_code` | string | 统一社会信用代码 | "91440300MA5N7ABC01" |
| `investment_period_months` | number | 投资期限（月） | 24 |
| `funding_purpose` | string | 资金用途 | "门店升级" |

### 2.3 投后字段（已投资标的）

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `invested_amount` | number | 实际投资（元） | 350000 |
| `invested_date` | string | 投资日期 | "2025-03-15" |
| `total_cashflow` | number | 累计回款（元） | 245000 |
| `investor_id` | string | 投资人ID | "INV-DGT-001" |

---

## 3. financial_data 结构规范

```typescript
interface FinancialData {
  // 项目基本信息
  project_type: "store_operation" | "event" | "investment";
  investment_amount: number;        // 万元
  investment_amount_unit: "万元";   // 单位标注
  investment_period_months: number;
  revenue_share_ratio: number;      // 0-1之间
  cashflow_frequency: "daily" | "weekly" | "monthly";
  
  // 门店指标
  store_metrics: {
    area_sqm: number;              // 平方米
    seats?: number;                // 座位数
    rent_monthly: number;          // 万元
    rent_monthly_unit: "万元";
    staff_count: number;
    operating_hours: string;
    opening_date?: string;
  };
  
  // 营收数据（统一使用元）
  revenue_data: {
    daily_revenue: number;         // 元
    monthly_revenue: number;       // 元
    annual_revenue: number;        // 元
    revenue_unit: "元";            // 单位标注
    gross_margin: number;          // 0-1
    net_margin: number;            // 0-1
  };
  
  // 投资回报（统一使用元）
  investment_return: {
    annual_share_income: number;   // 元
    total_period_income: number;   // 元
    income_unit: "元";
    moic: number;                  // 回本倍数
    irr_estimate: number;          // 预期IRR 0-1
  };
  
  // 保障机制
  guarantee_mechanism: {
    deposit: number;               // 万元
    deposit_unit: "万元";
    minimum_monthly_share: number; // 元
    minimum_share_unit: "元";
    data_transparency: string;
    account_type: string;
  };
  
  // 利益一致性
  interest_alignment: {
    investor_share: number;        // 投资方分成比例
    operator_share: number;        // 运营方分成比例
    operator_investment?: number;  // 运营方投入（万元）
    subordination?: string;        // 劣后安排
  };
}
```

---

## 4. 行业代码规范

| 代码 | 名称 | 说明 |
|------|------|------|
| `catering` | 餐饮 | 茶饮、快餐、正餐、烧烤等 |
| `retail` | 零售 | 便利店、母婴、生鲜、服装等 |
| `service` | 生活服务 | 宠物、健身、美容、汽车等 |
| `ecommerce` | 电商 | MCN、直播电商等 |
| `douyin-ecommerce` | 抖音投流 | 抖音电商、投流合作 |
| `education` | 教育培训 | 职业培训、技能教育 |
| `light-asset` | 文娱轻资产 | 演出、活动、IP运营 |
| `entertainment` | 文娱 | KTV、娱乐等 |
| `healthcare` | 医疗健康 | 口腔、医美、康养等 |
| `new-energy` | 新能源 | 充电桩、光伏等 |

---

## 5. 状态代码规范

### 5.1 标的状态

| 代码 | 名称 | 说明 |
|------|------|------|
| `pending` | 待处理 | 新提交，等待评估 |
| `outer` | 外环筛选中 | 正在进行外环评估 |
| `evaluation` | 评估中 | 正在进行中环评估 |
| `review` | 待审核 | 评估完成，等待人工审核 |
| `completed` | 已完成 | 评估流程完成 |
| `rejected` | 已拒绝 | 未通过评估 |
| `invested` | 已投资 | 已完成投资 |

### 5.2 回款状态

| 代码 | 名称 | 说明 |
|------|------|------|
| `paid` | 已支付 | 已完成回款 |
| `pending` | 待支付 | 等待支付 |
| `delayed` | 延迟 | 支付延迟 |

---

## 6. 数据验证规则

### 6.1 金额验证

```javascript
// 融资金额：1-10000万元
funding_amount >= 1 && funding_amount <= 10000

// 分成比例：1%-50%
revenue_share_ratio >= 0.01 && revenue_share_ratio <= 0.50

// 投资期限：6-60个月
investment_period_months >= 6 && investment_period_months <= 60
```

### 6.2 IRR验证

```javascript
// IRR通常在10%-60%之间
irr_estimate >= 0.10 && irr_estimate <= 0.60
```

---

## 7. 前端显示规范

### 7.1 金额格式化函数

```javascript
/**
 * 格式化金额显示
 * @param {number} amount - 金额
 * @param {string} inputUnit - 输入单位 'yuan'=元, 'wan'=万元
 * @param {boolean} showUnit - 是否显示单位
 */
function formatAmount(amount, inputUnit = 'yuan', showUnit = true) {
  if (amount === null || amount === undefined) return '-';
  
  // 统一转为元
  let amountInYuan = inputUnit === 'wan' ? amount * 10000 : amount;
  
  let display, unit;
  if (amountInYuan >= 100000000) {
    display = (amountInYuan / 100000000).toFixed(2);
    unit = '亿';
  } else if (amountInYuan >= 10000) {
    display = (amountInYuan / 10000).toFixed(2);
    unit = '万';
  } else {
    display = amountInYuan.toFixed(2);
    unit = '';
  }
  
  // 移除末尾的.00
  display = display.replace(/\.00$/, '');
  
  return showUnit ? `¥${display}${unit}` : display;
}

// 示例
formatAmount(350000, 'yuan')     // "¥35万"
formatAmount(35, 'wan')          // "¥35万"
formatAmount(143500000, 'yuan')  // "¥1.44亿"
formatAmount(8500, 'yuan')       // "¥8500"
```

### 7.2 比例格式化

```javascript
function formatPercent(ratio, decimals = 1) {
  return (ratio * 100).toFixed(decimals) + '%';
}

// 示例
formatPercent(0.08)   // "8.0%"
formatPercent(0.185)  // "18.5%"
```

---

## 8. API单位标注规范（v1.1.0新增）

### 8.1 标准响应结构

所有涉及金额的API响应都应包含 `_units` 字段：

```json
{
  "success": true,
  "data": {
    "_units": {
      "currency": "CNY",
      "amountUnit": "元",
      "note": "所有金额字段均为人民币元（CNY）"
    },
    "totalInvested": 143500000,
    "totalCashflow": 25486640.61,
    "formatted": {
      "totalInvested_wan": "14350.00 万元",
      "totalCashflow_wan": "2548.66 万元"
    }
  }
}
```

### 8.2 已实现的API端点

| 端点 | `_units` | `formatted` | 说明 |
|------|----------|-------------|------|
| `/api/cashflow-stats` | ✅ | ✅ | 回款统计概览 |
| `/api/deals/:id/cashflows` | ✅ | ✅ | 单个标的回款详情 |
| `/api/platform-summary` | ✅ | ✅ | 平台汇总统计 |
| `/api/investor/stats` | ✅ | ✅ | 投资人统计 |

---

## 9. 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| 1.0.0 | 2026-01-19 | 初始版本，定义数据规范 |
| 1.1.0 | 2026-01-19 | 新增API单位标注规范，所有金额API添加 `_units` 和 `formatted` 字段 |
