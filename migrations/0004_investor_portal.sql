-- 投资人门户数据库迁移
-- Investor Portal Database Migration

-- ============================================
-- 修改deals表：添加投资相关字段
-- ============================================
-- 注意: status 字段已存在，只需在应用层支持 'invested' 状态

-- 添加投资金额字段（实际投资金额，区别于融资需求金额）
ALTER TABLE deals ADD COLUMN invested_amount REAL DEFAULT 0;

-- 添加投资日期
ALTER TABLE deals ADD COLUMN invested_date DATETIME;

-- 添加回款周期类型 (daily/weekly/monthly)
ALTER TABLE deals ADD COLUMN cashflow_frequency TEXT DEFAULT 'monthly';

-- 添加累计回款总额
ALTER TABLE deals ADD COLUMN total_cashflow REAL DEFAULT 0;

-- 添加投资人ID关联（可选，用于多投资人场景）
ALTER TABLE deals ADD COLUMN investor_id TEXT;

-- 添加所在地区（用于统计）
ALTER TABLE deals ADD COLUMN region TEXT;

-- 添加所在城市
ALTER TABLE deals ADD COLUMN city TEXT;

-- ============================================
-- 表5: cashflow_records (回款记录表)
-- ============================================
CREATE TABLE IF NOT EXISTS cashflow_records (
  id TEXT PRIMARY KEY,                              -- 回款记录ID: CF-时间戳
  deal_id TEXT NOT NULL,                            -- 关联标的ID
  amount REAL NOT NULL,                             -- 回款金额(元)
  currency TEXT DEFAULT 'CNY',                      -- 货币类型
  period_type TEXT NOT NULL,                        -- 周期类型: daily/weekly/monthly
  period_start DATE NOT NULL,                       -- 周期开始日期
  period_end DATE NOT NULL,                         -- 周期结束日期
  payment_date DATE NOT NULL,                       -- 实际支付日期
  status TEXT DEFAULT 'paid',                       -- 状态: pending/paid/delayed
  notes TEXT,                                       -- 备注说明
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (deal_id) REFERENCES deals(id)
);

-- ============================================
-- 表6: transactions (交易记录表)
-- ============================================
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,                              -- 交易ID: TRX-时间戳
  deal_id TEXT NOT NULL,                            -- 关联标的ID
  investor_id TEXT,                                 -- 投资人ID
  transaction_type TEXT NOT NULL,                   -- 交易类型: invest/divest/transfer
  amount REAL NOT NULL,                             -- 交易金额
  currency TEXT DEFAULT 'CNY',                      -- 货币类型
  transaction_date DATE NOT NULL,                   -- 交易日期
  price_per_unit REAL,                              -- 单位价格(如适用)
  units REAL,                                       -- 份额数量(如适用)
  fee REAL DEFAULT 0,                               -- 手续费
  status TEXT DEFAULT 'completed',                  -- 状态: pending/completed/cancelled
  notes TEXT,                                       -- 备注
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (deal_id) REFERENCES deals(id)
);

-- ============================================
-- 表7: announcements (公告表)
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id TEXT PRIMARY KEY,                              -- 公告ID: ANN-时间戳
  title TEXT NOT NULL,                              -- 公告标题
  content TEXT NOT NULL,                            -- 公告内容
  category TEXT NOT NULL,                           -- 分类: platform/asset/distribution/policy
  priority TEXT DEFAULT 'normal',                   -- 优先级: urgent/high/normal/low
  target_deals TEXT,                                -- 相关标的ID列表(JSON数组)，null表示全平台
  publish_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- 发布日期
  expire_date DATETIME,                             -- 过期日期
  is_active INTEGER DEFAULT 1,                      -- 是否激活
  view_count INTEGER DEFAULT 0,                     -- 查看次数
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 表8: investors (投资人表)
-- ============================================
CREATE TABLE IF NOT EXISTS investors (
  id TEXT PRIMARY KEY,                              -- 投资人ID: INV-XXX
  name TEXT NOT NULL,                               -- 投资人名称/姓名
  type TEXT DEFAULT 'individual',                   -- 类型: individual/institution
  contact_email TEXT,                               -- 联系邮箱
  contact_phone TEXT,                               -- 联系电话
  total_invested REAL DEFAULT 0,                    -- 总投资金额
  total_return REAL DEFAULT 0,                      -- 总回报金额
  active_deals INTEGER DEFAULT 0,                   -- 活跃标的数量
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 索引优化
-- ============================================
CREATE INDEX IF NOT EXISTS idx_deals_status_invested ON deals(status) WHERE status = 'invested';
CREATE INDEX IF NOT EXISTS idx_deals_investor_id ON deals(investor_id);
CREATE INDEX IF NOT EXISTS idx_cashflow_deal_id ON cashflow_records(deal_id);
CREATE INDEX IF NOT EXISTS idx_cashflow_payment_date ON cashflow_records(payment_date);
CREATE INDEX IF NOT EXISTS idx_transactions_deal_id ON transactions(deal_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);
