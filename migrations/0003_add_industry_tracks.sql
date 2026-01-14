-- 添加行业赛道表
CREATE TABLE IF NOT EXISTS industry_tracks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'fas fa-industry',
  icon_color TEXT DEFAULT '#6366F1',
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 插入默认赛道
INSERT OR IGNORE INTO industry_tracks (id, name, description, icon, icon_color) VALUES 
  ('light-asset', '轻资产', '演出、活动、IP授权等轻资产类投资', 'fas fa-feather', '#8B5CF6'),
  ('retail', '零售', '线下零售、便利店、专卖店等', 'fas fa-store', '#10B981'),
  ('catering', '餐饮', '餐厅、连锁餐饮、食品加工等', 'fas fa-utensils', '#F59E0B'),
  ('ecommerce', '电商', '电商平台、跨境电商、直播电商等', 'fas fa-shopping-cart', '#3B82F6'),
  ('education', '教育培训', '职业培训、技能教育、兴趣培训等', 'fas fa-graduation-cap', '#EC4899'),
  ('healthcare', '医疗健康', '诊所、健康管理、医疗服务等', 'fas fa-heartbeat', '#EF4444'),
  ('entertainment', '文娱', '影院、KTV、游戏娱乐等', 'fas fa-film', '#6366F1'),
  ('service', '生活服务', '美容美发、家政、维修等生活服务', 'fas fa-concierge-bell', '#14B8A6');

-- 为智能体添加行业关联字段（如果不存在）
-- 注意: SQLite不支持IF NOT EXISTS用于ALTER TABLE，所以我们需要处理已存在的情况
-- 这里通过创建新列来实现，如果列已存在会报错但不影响后续操作
