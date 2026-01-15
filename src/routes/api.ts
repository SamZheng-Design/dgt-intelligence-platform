import { Hono } from 'hono'
import OpenAI from 'openai'
import { agentsSeed } from '../data/agents-seed'
import { cardiBDeal, workflowConfig, allDeals } from '../data/deals-seed'
import { allTrackAgents, industryTracks } from '../data/track-agents-seed'

type Bindings = {
  DB: D1Database
  OPENAI_API_KEY: string
  OPENAI_BASE_URL: string
}

// OpenAI配置 - 从环境变量或Cloudflare secrets读取
const getOpenAIClient = (env: Bindings) => {
  // 优先使用环境变量，然后使用Cloudflare bindings
  const apiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY
  const baseURL = env.OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://www.genspark.ai/api/llm_proxy/v1'
  
  return new OpenAI({
    apiKey,
    baseURL,
  })
}

const api = new Hono<{ Bindings: Bindings }>()

// ============================================
// 辅助函数：从部分JSON或原始文本中提取字段
// ============================================
function extractFieldsFromPartialJSON(jsonStr: string, rawResponse: string): any {
  const text = jsonStr || rawResponse || ''
  
  // 提取pass字段
  const passMatch = text.match(/"pass"\s*:\s*(true|false)/i)
  const pass = passMatch ? passMatch[1].toLowerCase() === 'true' : false
  
  // 提取score字段
  const scoreMatch = text.match(/"score"\s*:\s*(\d+)/)
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0
  
  // 提取risk_level字段
  const riskMatch = text.match(/"risk_level"\s*:\s*"([^"]*)"/)
  const riskLevel = riskMatch ? riskMatch[1] : 'medium'
  
  // 更智能地提取reasoning - 支持多行和特殊字符
  let reasoning = ''
  const reasoningPatterns = [
    /"reasoning"\s*:\s*"([\s\S]*?)(?:"|$)/,
    /"rationale"\s*:\s*"([\s\S]*?)(?:"|$)/,
    /"assessment"\s*:\s*"([\s\S]*?)(?:"|$)/,
    /"analysis"\s*:\s*"([\s\S]*?)(?:"|$)/,
    /"summary"\s*:\s*"([\s\S]*?)(?:"|$)/
  ]
  
  for (const pattern of reasoningPatterns) {
    const match = text.match(pattern)
    if (match && match[1] && match[1].length > reasoning.length) {
      reasoning = match[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
    }
  }
  
  // 如果还是没有reasoning，尝试从原始响应中提取有意义的内容
  if (!reasoning && rawResponse) {
    // 移除JSON标记，提取纯文本内容
    let cleanText = rawResponse
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/\{[\s\S]*?\}/g, '') // 移除JSON对象
      .trim()
    
    if (cleanText.length > 20) {
      reasoning = cleanText.substring(0, 2000)
    } else {
      // 如果清理后文本太短，直接使用原始响应的前2000字符
      reasoning = rawResponse.substring(0, 2000)
    }
  }
  
  // 提取recommendation
  let recommendation = ''
  const recPatterns = [
    /"recommendation"\s*:\s*"([\s\S]*?)(?:"|$)/,
    /"suggestion"\s*:\s*"([\s\S]*?)(?:"|$)/,
    /"advice"\s*:\s*"([\s\S]*?)(?:"|$)/
  ]
  
  for (const pattern of recPatterns) {
    const match = text.match(pattern)
    if (match && match[1] && match[1].length > recommendation.length) {
      recommendation = match[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
    }
  }
  
  // 提取findings数组
  let findings: string[] = []
  const findingsMatch = text.match(/"findings"\s*:\s*\[([\s\S]*?)\]/)
  if (findingsMatch) {
    const findingsStr = findingsMatch[1]
    const items = findingsStr.match(/"([^"]+)"/g)
    if (items) {
      findings = items.map(item => item.replace(/"/g, ''))
    }
  }
  
  // 提取improvements（改进建议）
  let improvements: string[] = []
  const improvementsMatch = text.match(/"improvements"\s*:\s*\[([\s\S]*?)\]/)
  if (improvementsMatch) {
    const improvementsStr = improvementsMatch[1]
    const items = improvementsStr.match(/"([^"]+)"/g)
    if (items) {
      improvements = items.map(item => item.replace(/"/g, ''))
    }
  }
  
  // 提取missing_materials（缺失材料）
  let missingMaterials: string[] = []
  const missingMatch = text.match(/"missing_materials"\s*:\s*\[([\s\S]*?)\]/)
  if (missingMatch) {
    const missingStr = missingMatch[1]
    const items = missingStr.match(/"([^"]+)"/g)
    if (items) {
      missingMaterials = items.map(item => item.replace(/"/g, ''))
    }
  }
  
  return {
    pass,
    score,
    reasoning: reasoning || '评估已完成，请查看完整报告获取详情',
    risk_level: riskLevel,
    findings,
    recommendation: recommendation || '',
    improvements,
    missing_materials: missingMaterials,
    _partial_parse: true,
    _raw_response: rawResponse
  }
}

// 调试端点 - 检查环境变量
api.get('/debug-env', (c) => {
  const hasApiKey = !!c.env.OPENAI_API_KEY
  const hasBaseUrl = !!c.env.OPENAI_BASE_URL
  const apiKeyPrefix = c.env.OPENAI_API_KEY ? c.env.OPENAI_API_KEY.substring(0, 5) + '...' : 'NOT_SET'
  const baseUrl = c.env.OPENAI_BASE_URL || 'NOT_SET'
  
  return c.json({
    hasApiKey,
    hasBaseUrl,
    apiKeyPrefix,
    baseUrl
  })
})

// ============================================
// 数据库初始化和种子数据
// ============================================
api.post('/init-db', async (c) => {
  const db = c.env.DB
  const force = c.req.query('force') === 'true'  // 强制重新初始化
  
  try {
    // 检查agents表是否有数据
    const existingAgents = await db.prepare('SELECT COUNT(*) as count FROM agents').first<{count: number}>()
    
    if (existingAgents && existingAgents.count > 0 && !force) {
      return c.json({ success: true, message: '数据库已初始化', agents: existingAgents.count })
    }
    
    // 如果强制重新初始化，先清空数据（注意顺序，先删除有外键依赖的表）
    if (force) {
      await db.prepare('DELETE FROM evaluation_logs').run()  // 先删除有外键的表
      await db.prepare('DELETE FROM workflow').run()
      await db.prepare('DELETE FROM deals').run()
      await db.prepare('DELETE FROM agents').run()
    }
    
    // 插入通用智能体种子数据
    for (const agent of agentsSeed) {
      await db.prepare(`
        INSERT INTO agents (id, name, ring_type, industry, dimension, weight, description, 
          system_prompt, evaluation_criteria, knowledge_base, knowledge_files, output_format, 
          pass_threshold, is_enabled, execution_order, model_config, icon, icon_color)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        agent.id, agent.name, agent.ring_type, agent.industry, agent.dimension, agent.weight,
        agent.description, agent.system_prompt, agent.evaluation_criteria, agent.knowledge_base,
        JSON.stringify([]), agent.output_format, agent.pass_threshold, agent.is_enabled,
        agent.execution_order, agent.model_config, agent.icon, agent.icon_color
      ).run()
    }
    
    // 插入赛道专属智能体
    let trackAgentOrder = 10  // 从10开始，避免与通用智能体冲突
    for (const agent of allTrackAgents) {
      await db.prepare(`
        INSERT INTO agents (id, name, ring_type, industry, dimension, weight, description, 
          system_prompt, evaluation_criteria, knowledge_base, knowledge_files, output_format, 
          pass_threshold, is_enabled, execution_order, model_config, icon, icon_color)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        agent.id, agent.name, agent.ring_type, agent.industry, agent.dimension, agent.weight,
        agent.description, agent.system_prompt, agent.evaluation_criteria, agent.knowledge_base,
        JSON.stringify([]), agent.output_format, agent.pass_threshold, agent.is_enabled,
        trackAgentOrder++, agent.model_config, agent.icon, agent.icon_color
      ).run()
    }
    
    // 插入所有标的数据（包括Cardi B和新增的各赛道标的）
    for (const deal of allDeals) {
      try {
        await db.prepare(`
          INSERT INTO deals (id, company_name, credit_code, industry, status, main_business,
            funding_amount, contact_name, contact_phone, website, submitted_date, project_documents,
            financial_data, result)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          deal.id, deal.company_name, deal.credit_code || '', deal.industry,
          deal.status || 'pending', deal.main_business, deal.funding_amount,
          deal.contact_name || '', deal.contact_phone || '', deal.website || '',
          deal.submitted_date || new Date().toISOString(), deal.project_documents || '',
          typeof deal.financial_data === 'string' ? deal.financial_data : JSON.stringify(deal.financial_data),
          deal.result || 'pending'
        ).run()
      } catch (e: any) {
        console.error(`插入标的 ${deal.id} 失败:`, e.message)
      }
    }
    
    // 插入工作流配置
    await db.prepare(`
      INSERT INTO workflow (id, name, version, status, outer_agents, inner_agents,
        scoring_formula, pass_criteria, execution_mode, execution_count, success_rate, avg_duration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      workflowConfig.id, workflowConfig.name, workflowConfig.version, workflowConfig.status,
      workflowConfig.outer_agents, workflowConfig.inner_agents, workflowConfig.scoring_formula,
      workflowConfig.pass_criteria, workflowConfig.execution_mode, workflowConfig.execution_count,
      workflowConfig.success_rate, workflowConfig.avg_duration
    ).run()
    
    return c.json({ 
      success: true, 
      message: '数据库初始化成功', 
      stats: {
        agents: agentsSeed.length + allTrackAgents.length,
        trackAgents: allTrackAgents.length,
        deals: allDeals.length,
        tracks: industryTracks.length
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 智能体 CRUD API
// ============================================

// 获取所有智能体
api.get('/agents', async (c) => {
  const db = c.env.DB
  const ringType = c.req.query('ring_type')
  
  try {
    let query = 'SELECT * FROM agents ORDER BY ring_type, execution_order'
    if (ringType) {
      query = 'SELECT * FROM agents WHERE ring_type = ? ORDER BY execution_order'
    }
    
    const result = ringType 
      ? await db.prepare(query).bind(ringType).all()
      : await db.prepare(query).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 获取单个智能体
api.get('/agents/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    const agent = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(id).first()
    if (!agent) {
      return c.json({ success: false, error: '智能体不存在' }, 404)
    }
    return c.json({ success: true, data: agent })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 更新智能体
api.patch('/agents/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const updates = await c.req.json()
  
  try {
    // 构建动态更新语句
    const fields = Object.keys(updates)
    const setClause = fields.map(f => `${f} = ?`).join(', ')
    const values = [...Object.values(updates), new Date().toISOString(), id]
    
    await db.prepare(`UPDATE agents SET ${setClause}, updated_at = ? WHERE id = ?`).bind(...values).run()
    
    const updated = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(id).first()
    return c.json({ success: true, data: updated, message: '智能体配置已更新' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 创建新智能体
api.post('/agents', async (c) => {
  const db = c.env.DB
  const agent = await c.req.json()
  
  try {
    // 检查ID是否已存在
    const existing = await db.prepare('SELECT id FROM agents WHERE id = ?').bind(agent.id).first()
    if (existing) {
      return c.json({ success: false, error: '智能体ID已存在' }, 400)
    }
    
    // 获取最大执行顺序
    const maxOrder = await db.prepare(
      'SELECT MAX(execution_order) as max_order FROM agents WHERE ring_type = ?'
    ).bind(agent.ring_type).first<{max_order: number}>()
    const newOrder = (maxOrder?.max_order || 0) + 1
    
    await db.prepare(`
      INSERT INTO agents (id, name, ring_type, industry, dimension, weight, description, 
        system_prompt, evaluation_criteria, knowledge_base, output_format, 
        pass_threshold, is_enabled, execution_order, model_config, icon, icon_color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
    `).bind(
      agent.id,
      agent.name,
      agent.ring_type,
      agent.industry || 'all',
      agent.dimension || '自定义',
      agent.weight || 0,
      agent.description || '',
      agent.system_prompt || '',
      agent.evaluation_criteria || '{}',
      agent.knowledge_base || '',
      agent.output_format || '{}',
      agent.pass_threshold || 60,
      newOrder,
      agent.model_config || JSON.stringify({ model: 'gpt-5-mini', temperature: 0.2, max_tokens: 2000 }),
      agent.icon || 'fas fa-robot',
      agent.icon_color || '#6366F1'
    ).run()
    
    const created = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(agent.id).first()
    return c.json({ success: true, data: created, message: '智能体创建成功' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 删除智能体
api.delete('/agents/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    // 检查是否为内置智能体（可选：保护内置智能体）
    const builtInAgents = [
      'negative-list-agent', 'touch-agent', 'interest-alignment-agent',
      'financial-health-agent', 'operational-capability-agent', 'legal-compliance-agent',
      'risk-control-agent', 'interest-deep-agent', 'economic-calculation-agent', 'comprehensive-scoring-agent'
    ]
    
    // 如果需要保护内置智能体，取消下面的注释
    // if (builtInAgents.includes(id)) {
    //   return c.json({ success: false, error: '内置智能体不能删除' }, 400)
    // }
    
    await db.prepare('DELETE FROM agents WHERE id = ?').bind(id).run()
    return c.json({ success: true, message: '智能体已删除' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 行业赛道 API
// ============================================

// 获取所有赛道
api.get('/tracks', async (c) => {
  // 直接返回预定义的赛道配置，包含完整信息
  return c.json({ success: true, data: industryTracks })
})

// 获取特定赛道的智能体
api.get('/tracks/:trackId/agents', async (c) => {
  const db = c.env.DB
  const trackId = c.req.param('trackId')
  
  try {
    // 获取该赛道专属智能体 + 通用智能体
    const result = await db.prepare(`
      SELECT * FROM agents 
      WHERE ring_type = 'inner' AND (industry = ? OR industry = 'all')
      ORDER BY industry DESC, execution_order
    `).bind(trackId).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 创建新赛道
api.post('/tracks', async (c) => {
  const db = c.env.DB
  const track = await c.req.json()
  
  try {
    await db.prepare(`
      INSERT INTO industry_tracks (id, name, description, icon, icon_color)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      track.id,
      track.name,
      track.description || '',
      track.icon || 'fas fa-industry',
      track.icon_color || '#6366F1'
    ).run()
    
    return c.json({ success: true, message: '赛道创建成功' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 标的 CRUD API
// ============================================

// 获取所有标的
api.get('/deals', async (c) => {
  const db = c.env.DB
  const status = c.req.query('status')
  const industry = c.req.query('industry')
  
  try {
    let query = 'SELECT * FROM deals ORDER BY submitted_date DESC'
    let params: string[] = []
    
    if (status || industry) {
      const conditions: string[] = []
      if (status) {
        conditions.push('status = ?')
        params.push(status)
      }
      if (industry) {
        conditions.push('industry = ?')
        params.push(industry)
      }
      query = `SELECT * FROM deals WHERE ${conditions.join(' AND ')} ORDER BY submitted_date DESC`
    }
    
    const result = params.length > 0
      ? await db.prepare(query).bind(...params).all()
      : await db.prepare(query).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 获取单个标的
api.get('/deals/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    const deal = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(id).first()
    if (!deal) {
      return c.json({ success: false, error: '标的不存在' }, 404)
    }
    return c.json({ success: true, data: deal })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 创建新标的
api.post('/deals', async (c) => {
  const db = c.env.DB
  const deal = await c.req.json()
  
  try {
    // 生成ID
    const year = new Date().getFullYear()
    const count = await db.prepare('SELECT COUNT(*) as c FROM deals WHERE id LIKE ?').bind(`DGT-${year}-%`).first<{c: number}>()
    const newId = `DGT-${year}-${String((count?.c || 0) + 1).padStart(4, '0')}`
    
    // 处理上传文件信息 - 转换为supplementary_materials格式存储
    let supplementaryMaterials = '[]'
    if (deal.uploaded_files && Array.isArray(deal.uploaded_files) && deal.uploaded_files.length > 0) {
      const materials = deal.uploaded_files.map((f: any, idx: number) => ({
        id: `MAT-${Date.now()}-${idx}`,
        name: f.name,
        category: f.type?.includes('pdf') ? '商业计划书' : 
                  f.type?.includes('image') ? '图片资料' : 
                  f.type?.includes('excel') || f.type?.includes('sheet') ? '财务报表' : '其他材料',
        size: f.size,
        type: f.type,
        uploadedAt: new Date().toISOString()
      }))
      supplementaryMaterials = JSON.stringify(materials)
    }
    
    await db.prepare(`
      INSERT INTO deals (id, company_name, credit_code, industry, status, main_business,
        funding_amount, contact_name, contact_phone, website, project_documents, financial_data, 
        supplementary_materials, result)
      VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).bind(
      newId, deal.company_name, deal.credit_code, deal.industry, deal.main_business,
      deal.funding_amount, deal.contact_name, deal.contact_phone, deal.website,
      deal.project_documents, deal.financial_data, supplementaryMaterials
    ).run()
    
    const created = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(newId).first()
    return c.json({ success: true, data: created, message: '标的创建成功' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 更新标的
api.patch('/deals/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const updates = await c.req.json()
  
  try {
    const fields = Object.keys(updates)
    const setClause = fields.map(f => `${f} = ?`).join(', ')
    const values = [...Object.values(updates), new Date().toISOString(), id]
    
    await db.prepare(`UPDATE deals SET ${setClause}, updated_at = ? WHERE id = ?`).bind(...values).run()
    
    const updated = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(id).first()
    return c.json({ success: true, data: updated })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 材料上传 API
// ============================================

// 获取标的的补充材料列表
api.get('/deals/:id/materials', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    const deal = await db.prepare('SELECT supplementary_materials FROM deals WHERE id = ?').bind(id).first<any>()
    if (!deal) {
      return c.json({ success: false, error: '标的不存在' }, 404)
    }
    
    let materials = []
    if (deal.supplementary_materials) {
      try {
        materials = JSON.parse(deal.supplementary_materials)
      } catch (e) {
        materials = []
      }
    }
    
    return c.json({ success: true, data: materials })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 上传补充材料（文件信息）
api.post('/deals/:id/materials', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    // 获取上传的材料信息
    const { materials } = await c.req.json()
    // materials格式: [{ name: '材料名称', category: '分类', content: '内容/描述', uploadedAt: 'ISO时间' }]
    
    if (!materials || !Array.isArray(materials)) {
      return c.json({ success: false, error: '材料格式不正确' }, 400)
    }
    
    // 获取现有材料
    const deal = await db.prepare('SELECT supplementary_materials, project_documents FROM deals WHERE id = ?').bind(id).first<any>()
    if (!deal) {
      return c.json({ success: false, error: '标的不存在' }, 404)
    }
    
    let existingMaterials = []
    if (deal.supplementary_materials) {
      try {
        existingMaterials = JSON.parse(deal.supplementary_materials)
      } catch (e) {
        existingMaterials = []
      }
    }
    
    // 合并新材料
    const newMaterials = materials.map((m: any) => ({
      id: `MAT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: m.name,
      category: m.category || '其他',
      content: m.content || '',
      uploadedAt: m.uploadedAt || new Date().toISOString(),
      status: 'uploaded'
    }))
    
    const allMaterials = [...existingMaterials, ...newMaterials]
    
    // 将材料内容追加到项目文档中
    let projectDocs = deal.project_documents || ''
    const materialsSummary = newMaterials.map((m: any) => 
      `\n\n【补充材料：${m.name}】\n分类：${m.category}\n上传时间：${m.uploadedAt}\n内容：\n${m.content}`
    ).join('')
    
    projectDocs += `\n\n=====================================\n【补充材料上传记录 - ${new Date().toLocaleString('zh-CN')}】\n=====================================` + materialsSummary
    
    // 更新数据库
    await db.prepare(`
      UPDATE deals 
      SET supplementary_materials = ?, project_documents = ?, updated_at = ?
      WHERE id = ?
    `).bind(
      JSON.stringify(allMaterials),
      projectDocs,
      new Date().toISOString(),
      id
    ).run()
    
    return c.json({ 
      success: true, 
      data: allMaterials,
      message: `成功上传 ${newMaterials.length} 份材料`
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 删除补充材料
api.delete('/deals/:id/materials/:materialId', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const materialId = c.req.param('materialId')
  
  try {
    const deal = await db.prepare('SELECT supplementary_materials FROM deals WHERE id = ?').bind(id).first<any>()
    if (!deal) {
      return c.json({ success: false, error: '标的不存在' }, 404)
    }
    
    let materials = []
    if (deal.supplementary_materials) {
      try {
        materials = JSON.parse(deal.supplementary_materials)
      } catch (e) {
        materials = []
      }
    }
    
    // 过滤掉要删除的材料
    const filteredMaterials = materials.filter((m: any) => m.id !== materialId)
    
    await db.prepare(`
      UPDATE deals SET supplementary_materials = ?, updated_at = ? WHERE id = ?
    `).bind(
      JSON.stringify(filteredMaterials),
      new Date().toISOString(),
      id
    ).run()
    
    return c.json({ success: true, data: filteredMaterials, message: '材料已删除' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 工作流 API
// ============================================

api.get('/workflow', async (c) => {
  const db = c.env.DB
  
  try {
    const workflow = await db.prepare('SELECT * FROM workflow WHERE status = ?').bind('active').first()
    return c.json({ success: true, data: workflow })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 评估日志 API
// ============================================

api.get('/evaluation-logs/:dealId', async (c) => {
  const db = c.env.DB
  const dealId = c.req.param('dealId')
  
  try {
    const logs = await db.prepare('SELECT * FROM evaluation_logs WHERE deal_id = ? ORDER BY executed_at')
      .bind(dealId).all()
    return c.json({ success: true, data: logs.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// AI 调用 API - 核心功能
// ============================================

api.post('/ai/evaluate', async (c) => {
  const { agentId, dealId, testMode = false, testInput = null } = await c.req.json()
  const db = c.env.DB
  
  try {
    // 获取智能体配置
    const agent = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(agentId).first<any>()
    if (!agent) {
      return c.json({ success: false, error: '智能体不存在' }, 404)
    }
    
    // 获取标的数据（测试模式下可选）
    let dealData = testInput
    if (!testMode && dealId) {
      const deal = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(dealId).first<any>()
      if (!deal) {
        return c.json({ success: false, error: '标的不存在' }, 404)
      }
      
      // 解析财务数据
      let financialData = null
      try {
        financialData = deal.financial_data ? JSON.parse(deal.financial_data) : null
      } catch (e) {
        financialData = null
      }
      
      // 精简数据，避免Prompt过长
      dealData = {
        deal_id: deal.id,
        company_name: deal.company_name,
        industry: deal.industry,
        main_business: deal.main_business,
        funding_amount: deal.funding_amount,
        // 截取项目文档的关键部分（前3000字符）
        project_summary: deal.project_documents ? deal.project_documents.substring(0, 3000) : '',
        // 只保留财务数据的关键指标
        financial_highlights: financialData ? {
          investment_amount: financialData.investment_amount,
          revenue_forecast: financialData.revenue_forecast?.total,
          cost_total: financialData.cost_structure?.total,
          irr_estimate: financialData.profit_distribution?.investor_return?.irr_estimate,
          payback_months: financialData.profit_distribution?.investor_return?.payback_months,
          roi: financialData.profit_distribution?.investor_return?.roi
        } : null
      }
    }
    
    // 构建完整Prompt
    const fullPrompt = `
${agent.system_prompt}

## 知识库参考
${agent.knowledge_base}

## 评估标准
${agent.evaluation_criteria}

## 输出格式要求
请严格按照以下JSON格式输出，确保返回有效的JSON：
${agent.output_format}

## 待评估数据
${JSON.stringify(dealData, null, 2)}

请开始评估，直接输出JSON结果：
`
    
    // 调用OpenAI API
    const modelConfig = JSON.parse(agent.model_config)
    const client = getOpenAIClient(c.env)
    
    const startTime = Date.now()
    
    let completion
    let aiResponse = ''
    try {
      completion = await client.chat.completions.create({
        model: modelConfig.model || 'gpt-5',
        messages: [
          { role: 'system', content: agent.system_prompt },
          { role: 'user', content: fullPrompt }
        ],
        temperature: modelConfig.temperature || 0.2,
        max_tokens: modelConfig.max_tokens || 4000,
      })
      aiResponse = completion.choices[0]?.message?.content || ''
    } catch (apiError: any) {
      console.error('OpenAI API调用失败:', apiError.message)
      return c.json({
        success: false,
        error: 'AI服务调用失败: ' + apiError.message,
        details: {
          status: apiError.status,
          code: apiError.code,
          type: apiError.type
        }
      }, 500)
    }
    
    const executionTime = Date.now() - startTime
    
    // 解析AI返回的JSON
    let result
    let rawResponse = aiResponse // 保留原始响应
    try {
      // 尝试提取JSON - 更健壮的解析
      let jsonStr = aiResponse
      
      // 移除markdown代码块标记
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '')
      
      // 尝试找到JSON对象
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        jsonStr = jsonMatch[0]
        
        // 尝试修复截断的JSON
        try {
          result = JSON.parse(jsonStr)
        } catch (e) {
          // 如果解析失败，尝试修复常见问题
          let fixedJson = jsonStr
          
          // 统计括号，尝试闭合
          const openBraces = (fixedJson.match(/\{/g) || []).length
          const closeBraces = (fixedJson.match(/\}/g) || []).length
          const openBrackets = (fixedJson.match(/\[/g) || []).length
          const closeBrackets = (fixedJson.match(/\]/g) || []).length
          
          // 如果在字符串中间截断，先闭合字符串
          const lastQuote = fixedJson.lastIndexOf('"')
          const colonAfterQuote = fixedJson.indexOf(':', lastQuote)
          if (colonAfterQuote === -1 && lastQuote > fixedJson.lastIndexOf(':')) {
            fixedJson = fixedJson.substring(0, lastQuote + 1)
          }
          
          // 补全括号
          for (let i = 0; i < openBrackets - closeBrackets; i++) {
            fixedJson += ']'
          }
          for (let i = 0; i < openBraces - closeBraces; i++) {
            fixedJson += '}'
          }
          
          try {
            result = JSON.parse(fixedJson)
          } catch (e2) {
            // 最后尝试：使用更智能的字段提取
            result = extractFieldsFromPartialJSON(jsonStr, rawResponse)
          }
        }
      } else {
        // 没有找到JSON对象，尝试直接从原文提取
        result = extractFieldsFromPartialJSON('', rawResponse)
      }
    } catch (parseError: any) {
      // 即使解析失败，也尝试提取有用信息
      result = extractFieldsFromPartialJSON('', rawResponse)
    }
    
    // 确保result有值
    if (!result) {
      result = {
        pass: false,
        score: 0,
        reasoning: rawResponse || '无法获取评估结果',
        risk_level: 'medium',
        findings: [],
        recommendation: '请检查AI服务状态',
        _raw_response: rawResponse
      }
    }
    
    // 始终附加原始响应，方便前端展示完整内容
    result._raw_response = rawResponse
    
    // 非测试模式下保存评估日志
    if (!testMode && dealId) {
      const logId = `LOG-${Date.now()}`
      await db.prepare(`
        INSERT INTO evaluation_logs (id, deal_id, agent_id, agent_name, ring_type,
          input_data, output_result, score, pass_status, reasoning, execution_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        logId, dealId, agentId, agent.name, agent.ring_type,
        JSON.stringify(dealData), JSON.stringify(result),
        result.score || 0, result.pass ? 1 : 0, result.reasoning || '',
        executionTime
      ).run()
    }
    
    // 确保reasoning字段存在（从result中提取或使用默认值）
    const finalResult = {
      ...result,
      reasoning: result.reasoning || result.rationale || result.assessment || '详见评估结果'
    }
    
    return c.json({
      success: true,
      data: {
        agentId,
        agentName: agent.name,
        ringType: agent.ring_type,
        result: finalResult,
        executionTime,
        pass: result.pass !== undefined ? result.pass : (result.score >= agent.pass_threshold)
      }
    })
    
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 执行完整评估流程
api.post('/ai/evaluate-deal', async (c) => {
  const { dealId } = await c.req.json()
  const db = c.env.DB
  
  try {
    // 获取工作流配置
    const workflow = await db.prepare('SELECT * FROM workflow WHERE status = ?').bind('active').first<any>()
    if (!workflow) {
      return c.json({ success: false, error: '无可用工作流' }, 404)
    }
    
    const outerAgents = JSON.parse(workflow.outer_agents)
    const innerAgents = JSON.parse(workflow.inner_agents).filter((id: string) => id !== 'comprehensive-scoring-agent')
    
    const results: any = { outer: [], inner: [], final: null }
    
    // 更新标的状态
    await db.prepare('UPDATE deals SET status = ? WHERE id = ?').bind('outer', dealId).run()
    
    // 外环串行执行
    for (const agentId of outerAgents) {
      const response = await c.env.AI_INTERNAL?.fetch(new Request('http://internal/api/ai/evaluate', {
        method: 'POST',
        body: JSON.stringify({ agentId, dealId })
      }))
      
      // 直接调用评估函数
      const evalResult = await evaluateWithAgent(c, db, agentId, dealId)
      
      results.outer.push(evalResult)
      
      if (!evalResult.pass) {
        await db.prepare('UPDATE deals SET status = ?, result = ? WHERE id = ?')
          .bind('rejected', 'reject', dealId).run()
        return c.json({
          success: true,
          stage: 'outer',
          rejected: true,
          rejectAgent: agentId,
          results
        })
      }
    }
    
    // 更新状态为中环评估
    await db.prepare('UPDATE deals SET status = ? WHERE id = ?').bind('evaluation', dealId).run()
    
    // 中环并行执行
    const innerPromises = innerAgents.map((agentId: string) => 
      evaluateWithAgent(c, db, agentId, dealId)
    )
    
    results.inner = await Promise.all(innerPromises)
    
    // 计算加权评分
    const agentsMap: any = {}
    const agents = await db.prepare('SELECT * FROM agents WHERE ring_type = ?').bind('inner').all()
    agents.results?.forEach((a: any) => { agentsMap[a.id] = a })
    
    let weightedSum = 0
    let totalWeight = 0
    const scores: any = {}
    
    results.inner.forEach((r: any) => {
      const agent = agentsMap[r.agentId]
      if (agent) {
        scores[r.agentId] = r.result.score
        weightedSum += r.result.score * (agent.weight / 100)
        totalWeight += agent.weight / 100
      }
    })
    
    const normalizedScore = totalWeight > 0 ? weightedSum / totalWeight : 0
    
    // 综合评分智能体
    const comprehensiveResult = await evaluateWithAgent(c, db, 'comprehensive-scoring-agent', dealId, {
      dimension_scores: scores,
      weighted_score: normalizedScore,
      individual_results: results.inner
    })
    
    const finalScore = Math.round(normalizedScore * 100) / 100
    
    // 确定评级
    let grade = 'D'
    if (finalScore >= 85) grade = 'A'
    else if (finalScore >= 75) grade = 'B+'
    else if (finalScore >= 65) grade = 'B'
    else if (finalScore >= 60) grade = 'C'
    
    results.final = {
      score: finalScore,
      grade,
      details: comprehensiveResult.result
    }
    
    // 更新标的
    await db.prepare(`
      UPDATE deals SET 
        status = 'review',
        total_score = ?,
        score_financial = ?,
        score_operational = ?,
        score_legal = ?,
        score_risk = ?,
        score_interest = ?,
        score_economic = ?,
        evaluation_details = ?,
        final_recommendation = ?,
        result = ?,
        updated_at = ?
      WHERE id = ?
    `).bind(
      finalScore,
      scores['financial-health-agent'] || 0,
      scores['operational-capability-agent'] || 0,
      scores['legal-compliance-agent'] || 0,
      scores['risk-control-agent'] || 0,
      scores['interest-deep-agent'] || 0,
      scores['economic-calculation-agent'] || 0,
      JSON.stringify(results),
      comprehensiveResult.result?.recommendation_detail || '',
      finalScore >= 65 ? 'pass' : 'reject',
      new Date().toISOString(),
      dealId
    ).run()
    
    return c.json({ success: true, results })
    
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 辅助函数：执行单个智能体评估
async function evaluateWithAgent(c: any, db: D1Database, agentId: string, dealId: string, extraData?: any) {
  const agent = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(agentId).first<any>()
  if (!agent) throw new Error(`智能体 ${agentId} 不存在`)
  
  const deal = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(dealId).first<any>()
  if (!deal) throw new Error(`标的 ${dealId} 不存在`)
  
  const dealData = {
    deal_info: deal,
    project_documents: deal.project_documents,
    financial_data: deal.financial_data ? JSON.parse(deal.financial_data) : null,
    ...extraData
  }
  
  const fullPrompt = `
${agent.system_prompt}

## 知识库参考
${agent.knowledge_base}

## 评估标准
${agent.evaluation_criteria}

## 输出格式要求
请严格按照以下JSON格式输出：
${agent.output_format}

## 待评估数据
${JSON.stringify(dealData, null, 2)}

请开始评估，直接输出JSON结果：
`
  
  const modelConfig = JSON.parse(agent.model_config)
  const client = getOpenAIClient(c.env)
  
  const startTime = Date.now()
  
  const completion = await client.chat.completions.create({
    model: modelConfig.model || 'gpt-5',
    messages: [
      { role: 'system', content: agent.system_prompt },
      { role: 'user', content: fullPrompt }
    ],
    temperature: modelConfig.temperature || 0.2,
    max_tokens: modelConfig.max_tokens || 2000,
  })
  
  const executionTime = Date.now() - startTime
  const aiResponse = completion.choices[0]?.message?.content || ''
  
  let result
  try {
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[0])
    } else {
      throw new Error('无法从AI响应中提取JSON')
    }
  } catch (e) {
    result = { score: 0, pass: false, error: 'JSON解析失败', raw: aiResponse }
  }
  
  // 保存日志
  const logId = `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  await db.prepare(`
    INSERT INTO evaluation_logs (id, deal_id, agent_id, agent_name, ring_type,
      input_data, output_result, score, pass_status, reasoning, execution_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    logId, dealId, agentId, agent.name, agent.ring_type,
    JSON.stringify(dealData), JSON.stringify(result),
    result.score || 0, result.pass ? 1 : 0, result.reasoning || '',
    executionTime
  ).run()
  
  return {
    agentId,
    agentName: agent.name,
    ringType: agent.ring_type,
    result,
    executionTime,
    pass: result.pass !== undefined ? result.pass : (result.score >= agent.pass_threshold)
  }
}

// ============================================
// 统计数据 API
// ============================================

api.get('/stats', async (c) => {
  const db = c.env.DB
  
  try {
    const totalDeals = await db.prepare('SELECT COUNT(*) as count FROM deals').first<{count: number}>()
    const passedDeals = await db.prepare("SELECT COUNT(*) as count FROM deals WHERE result = 'pass'").first<{count: number}>()
    const pendingDeals = await db.prepare("SELECT COUNT(*) as count FROM deals WHERE status IN ('pending', 'outer', 'evaluation')").first<{count: number}>()
    const rejectedDeals = await db.prepare("SELECT COUNT(*) as count FROM deals WHERE result = 'reject'").first<{count: number}>()
    const totalAgents = await db.prepare('SELECT COUNT(*) as count FROM agents WHERE is_enabled = 1').first<{count: number}>()
    
    return c.json({
      success: true,
      data: {
        totalDeals: totalDeals?.count || 0,
        passedDeals: passedDeals?.count || 0,
        pendingDeals: pendingDeals?.count || 0,
        rejectedDeals: rejectedDeals?.count || 0,
        totalAgents: totalAgents?.count || 0,
        automationRate: 95
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default api
