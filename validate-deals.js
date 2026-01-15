// 数据验证脚本 - 验证100个标的数据的完整性和合理性

import { allDeals as originalDeals, dealsSummary as originalSummary } from './src/data/deals-seed-new.ts';
import { completeDeals, completeDealsSummary } from './src/data/deals-seed-complete.ts';

// 智能体需要的关键字段
const requiredFields = {
  // 基本信息（外环-负面清单/触达智能体）
  basic: [
    'id', 'company_name', 'industry', 'region', 'city',
    'contact_name', 'contact_phone', 'website'
  ],
  
  // 投资信息（外环-利益一致性/中环-经济性测算）
  investment: [
    'funding_amount', 'revenue_share_ratio', 'cashflow_frequency'
  ],
  
  // 项目文档（外环-触达智能体）
  documents: ['project_documents'],
  
  // 财务数据（中环-财务健康度）
  financial: ['financial_data']
};

// 利益一致性所需的六维度数据
const interestAlignmentFields = [
  'revenue_pool',       // Q1: 收入来源与分配池
  'income_linkage',     // Q2: 收益挂钩机制
  'subordination',      // Q3: 劣后分配机制
  'operator_investment', // Q4: 运营方资金投入
  'risk_bearing',       // Q5: 风险承担机制
  'transparency'        // Q6: 信息透明度
];

// 财务数据所需字段
const financialDataFields = {
  store_metrics: ['store_area', 'daily_revenue', 'monthly_revenue', 'annual_revenue'],
  revenue_data: ['gross_margin', 'net_margin', 'cost_structure'],
  investment_return: ['annual_share_income', 'total_period_income', 'moic', 'irr_estimate'],
  guarantee_mechanism: ['deposit', 'minimum_monthly_share', 'data_transparency'],
  interest_alignment: ['operator_investment', 'subordination', 'risk_reserve']
};

// 行业与智能体对应关系
const industryAgentMapping = {
  'catering': ['catering-location-agent', 'catering-food-safety-agent', 'catering-unit-economics-agent'],
  'retail': ['retail-inventory-agent', 'retail-supply-chain-agent', 'retail-community-agent'],
  'service': ['service-license-agent', 'service-customer-agent', 'service-standard-agent'],
  'education': ['education-qualification-agent', 'education-employment-agent'],
  'entertainment': ['entertainment-ip-agent', 'entertainment-event-agent'],
  'ecommerce': ['ecommerce-gmv-agent', 'ecommerce-platform-agent', 'ecommerce-mcn-agent'],
  'douyin-ecommerce': ['douyin-partner-agent', 'douyin-advertising-agent', 'douyin-brand-agent', 'douyin-risk-agent']
};

function validateDeal(deal, dealType) {
  const issues = [];
  const warnings = [];
  
  // 1. 检查基本信息
  for (const field of requiredFields.basic) {
    if (!deal[field]) {
      issues.push(`缺少基本字段: ${field}`);
    }
  }
  
  // 2. 检查投资信息
  for (const field of requiredFields.investment) {
    if (deal[field] === undefined || deal[field] === null) {
      issues.push(`缺少投资字段: ${field}`);
    }
  }
  
  // 3. 验证投资金额合理性
  if (deal.funding_amount) {
    if (deal.funding_amount < 10 || deal.funding_amount > 5000) {
      warnings.push(`投资金额异常: ${deal.funding_amount}万元（合理范围10-5000万）`);
    }
  }
  
  // 4. 验证分成比例合理性
  if (deal.revenue_share_ratio) {
    const ratio = typeof deal.revenue_share_ratio === 'string' 
      ? parseFloat(deal.revenue_share_ratio) 
      : deal.revenue_share_ratio;
    if (ratio < 0.01 || ratio > 0.70) {
      warnings.push(`分成比例异常: ${(ratio * 100).toFixed(1)}%（合理范围1%-70%）`);
    }
  }
  
  // 5. 检查现金流频率
  const validFrequencies = ['daily', 'weekly', 'monthly', '每日', '每周', '每月'];
  if (deal.cashflow_frequency && !validFrequencies.includes(deal.cashflow_frequency.toLowerCase())) {
    warnings.push(`现金流频率异常: ${deal.cashflow_frequency}`);
  }
  
  // 6. 检查项目文档（针对完整标的）
  if (dealType === 'complete') {
    if (!deal.project_documents || Object.keys(deal.project_documents).length < 3) {
      issues.push('项目文档不完整（需要至少3个文档类别）');
    }
  }
  
  // 7. 检查财务数据
  if (deal.financial_data) {
    const fd = typeof deal.financial_data === 'string' 
      ? JSON.parse(deal.financial_data) 
      : deal.financial_data;
    
    // 检查投资回报测算
    if (!fd.investment_return) {
      issues.push('缺少投资回报测算数据');
    } else {
      if (!fd.investment_return.irr_estimate && !fd.investment_return.irr) {
        warnings.push('缺少IRR预估');
      }
      if (!fd.investment_return.moic) {
        warnings.push('缺少MOIC');
      }
    }
    
    // 检查利益一致性数据
    if (!fd.interest_alignment) {
      if (dealType === 'complete') {
        issues.push('缺少利益一致性数据');
      } else {
        warnings.push('缺少利益一致性数据（建议补充）');
      }
    }
    
    // 检查保障机制
    if (!fd.guarantee_mechanism) {
      warnings.push('缺少保障机制数据');
    }
  } else {
    issues.push('缺少财务数据');
  }
  
  // 8. 检查行业是否有对应智能体
  const industry = deal.industry?.split('-')[0] || deal.industry;
  if (industry && !industryAgentMapping[industry] && !['light-asset'].includes(industry)) {
    warnings.push(`行业 ${industry} 暂无专属赛道智能体`);
  }
  
  return { issues, warnings };
}

function analyzeDataset(deals, name, dealType) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`数据集: ${name}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`总数量: ${deals.length}`);
  
  const stats = {
    total: deals.length,
    valid: 0,
    hasIssues: 0,
    hasWarnings: 0,
    issues: {},
    warnings: {},
    industries: {},
    regions: {},
    frequencies: {},
    amountRange: { min: Infinity, max: -Infinity },
    shareRange: { min: Infinity, max: -Infinity },
    irrRange: { min: Infinity, max: -Infinity }
  };
  
  for (const deal of deals) {
    const { issues, warnings } = validateDeal(deal, dealType);
    
    if (issues.length === 0) {
      stats.valid++;
    } else {
      stats.hasIssues++;
      issues.forEach(issue => {
        stats.issues[issue] = (stats.issues[issue] || 0) + 1;
      });
    }
    
    if (warnings.length > 0) {
      stats.hasWarnings++;
      warnings.forEach(warning => {
        stats.warnings[warning] = (stats.warnings[warning] || 0) + 1;
      });
    }
    
    // 统计行业分布
    const industry = deal.industry?.split('-')[0] || deal.industry || 'unknown';
    stats.industries[industry] = (stats.industries[industry] || 0) + 1;
    
    // 统计地区分布
    const region = deal.region || 'unknown';
    stats.regions[region] = (stats.regions[region] || 0) + 1;
    
    // 统计现金流频率分布
    const freq = deal.cashflow_frequency || 'unknown';
    stats.frequencies[freq] = (stats.frequencies[freq] || 0) + 1;
    
    // 统计金额范围
    if (deal.funding_amount) {
      stats.amountRange.min = Math.min(stats.amountRange.min, deal.funding_amount);
      stats.amountRange.max = Math.max(stats.amountRange.max, deal.funding_amount);
    }
    
    // 统计分成比例范围
    if (deal.revenue_share_ratio) {
      const ratio = typeof deal.revenue_share_ratio === 'string' 
        ? parseFloat(deal.revenue_share_ratio) 
        : deal.revenue_share_ratio;
      stats.shareRange.min = Math.min(stats.shareRange.min, ratio);
      stats.shareRange.max = Math.max(stats.shareRange.max, ratio);
    }
    
    // 统计IRR范围
    if (deal.financial_data) {
      const fd = typeof deal.financial_data === 'string' 
        ? JSON.parse(deal.financial_data) 
        : deal.financial_data;
      const irr = fd?.investment_return?.irr_estimate || fd?.investment_return?.irr;
      if (irr) {
        stats.irrRange.min = Math.min(stats.irrRange.min, irr);
        stats.irrRange.max = Math.max(stats.irrRange.max, irr);
      }
    }
  }
  
  // 输出统计结果
  console.log(`\n📊 数据完整性统计:`);
  console.log(`  ✅ 完全有效: ${stats.valid}/${stats.total} (${(stats.valid/stats.total*100).toFixed(1)}%)`);
  console.log(`  ⚠️ 有问题: ${stats.hasIssues}/${stats.total}`);
  console.log(`  ℹ️ 有警告: ${stats.hasWarnings}/${stats.total}`);
  
  console.log(`\n🏭 行业分布:`);
  Object.entries(stats.industries)
    .sort((a, b) => b[1] - a[1])
    .forEach(([industry, count]) => {
      const hasAgent = industryAgentMapping[industry] ? '✅' : '⚠️';
      console.log(`  ${hasAgent} ${industry}: ${count}个`);
    });
  
  console.log(`\n🌍 地区分布 (Top 10):`);
  Object.entries(stats.regions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([region, count]) => {
      console.log(`  ${region}: ${count}个`);
    });
  
  console.log(`\n💰 投资金额范围: ${stats.amountRange.min}万 - ${stats.amountRange.max}万`);
  console.log(`📈 分成比例范围: ${(stats.shareRange.min*100).toFixed(1)}% - ${(stats.shareRange.max*100).toFixed(1)}%`);
  console.log(`📊 IRR范围: ${(stats.irrRange.min*100).toFixed(1)}% - ${(stats.irrRange.max*100).toFixed(1)}%`);
  
  console.log(`\n⏱️ 现金流频率分布:`);
  Object.entries(stats.frequencies)
    .sort((a, b) => b[1] - a[1])
    .forEach(([freq, count]) => {
      console.log(`  ${freq}: ${count}个`);
    });
  
  if (Object.keys(stats.issues).length > 0) {
    console.log(`\n❌ 问题汇总:`);
    Object.entries(stats.issues)
      .sort((a, b) => b[1] - a[1])
      .forEach(([issue, count]) => {
        console.log(`  ${issue}: ${count}个标的`);
      });
  }
  
  if (Object.keys(stats.warnings).length > 0) {
    console.log(`\n⚠️ 警告汇总 (Top 10):`);
    Object.entries(stats.warnings)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([warning, count]) => {
        console.log(`  ${warning}: ${count}个标的`);
      });
  }
  
  return stats;
}

// 验证智能体评估能力
function checkAgentReadiness(deal) {
  const readiness = {
    outer_ring: {
      'negative-list-agent': { ready: false, missing: [] },
      'touch-agent': { ready: false, missing: [] },
      'interest-alignment-agent': { ready: false, missing: [] }
    },
    inner_ring: {
      'financial-health-agent': { ready: false, missing: [] },
      'operational-capability-agent': { ready: false, missing: [] },
      'legal-compliance-agent': { ready: false, missing: [] },
      'risk-control-agent': { ready: false, missing: [] },
      'interest-deep-agent': { ready: false, missing: [] },
      'economic-calculation-agent': { ready: false, missing: [] },
      'comprehensive-scoring-agent': { ready: false, missing: [] }
    }
  };
  
  // 负面清单智能体 - 需要基本业务信息
  if (deal.industry && deal.company_name) {
    readiness.outer_ring['negative-list-agent'].ready = true;
  } else {
    if (!deal.industry) readiness.outer_ring['negative-list-agent'].missing.push('industry');
    if (!deal.company_name) readiness.outer_ring['negative-list-agent'].missing.push('company_name');
  }
  
  // 触达智能体 - 需要基本信息、文档、财务数据
  const touchRequired = ['company_name', 'contact_name', 'project_documents', 'financial_data'];
  const touchMissing = touchRequired.filter(f => !deal[f]);
  readiness.outer_ring['touch-agent'].ready = touchMissing.length === 0;
  readiness.outer_ring['touch-agent'].missing = touchMissing;
  
  // 利益一致性智能体 - 需要财务数据中的利益一致性字段
  const fd = typeof deal.financial_data === 'string' 
    ? JSON.parse(deal.financial_data || '{}') 
    : (deal.financial_data || {});
  if (fd.interest_alignment && fd.guarantee_mechanism) {
    readiness.outer_ring['interest-alignment-agent'].ready = true;
  } else {
    if (!fd.interest_alignment) readiness.outer_ring['interest-alignment-agent'].missing.push('interest_alignment');
    if (!fd.guarantee_mechanism) readiness.outer_ring['interest-alignment-agent'].missing.push('guarantee_mechanism');
  }
  
  // 财务健康度智能体
  if (fd.revenue_data && fd.investment_return) {
    readiness.inner_ring['financial-health-agent'].ready = true;
  } else {
    if (!fd.revenue_data) readiness.inner_ring['financial-health-agent'].missing.push('revenue_data');
    if (!fd.investment_return) readiness.inner_ring['financial-health-agent'].missing.push('investment_return');
  }
  
  // 经济性测算智能体
  if (fd.investment_return?.irr_estimate || fd.investment_return?.irr) {
    readiness.inner_ring['economic-calculation-agent'].ready = true;
  } else {
    readiness.inner_ring['economic-calculation-agent'].missing.push('irr_estimate');
  }
  
  // 其他中环智能体基本只需要有完整的基本信息和财务数据
  const basicReady = deal.company_name && deal.industry && deal.financial_data;
  ['operational-capability-agent', 'legal-compliance-agent', 'risk-control-agent', 
   'interest-deep-agent', 'comprehensive-scoring-agent'].forEach(agent => {
    readiness.inner_ring[agent].ready = basicReady;
    if (!basicReady) {
      if (!deal.company_name) readiness.inner_ring[agent].missing.push('company_name');
      if (!deal.industry) readiness.inner_ring[agent].missing.push('industry');
      if (!deal.financial_data) readiness.inner_ring[agent].missing.push('financial_data');
    }
  });
  
  return readiness;
}

function analyzeAgentReadiness(deals, name) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`智能体评估就绪度分析: ${name}`);
  console.log(`${'='.repeat(60)}`);
  
  const summary = {
    outer_ring: {},
    inner_ring: {}
  };
  
  // 初始化
  const agents = [
    'negative-list-agent', 'touch-agent', 'interest-alignment-agent',
    'financial-health-agent', 'operational-capability-agent', 'legal-compliance-agent',
    'risk-control-agent', 'interest-deep-agent', 'economic-calculation-agent', 
    'comprehensive-scoring-agent'
  ];
  agents.forEach(agent => {
    if (agent.includes('negative') || agent.includes('touch') || agent.includes('interest-alignment')) {
      summary.outer_ring[agent] = { ready: 0, total: deals.length };
    } else {
      summary.inner_ring[agent] = { ready: 0, total: deals.length };
    }
  });
  
  for (const deal of deals) {
    const readiness = checkAgentReadiness(deal);
    
    Object.entries(readiness.outer_ring).forEach(([agent, status]) => {
      if (status.ready) summary.outer_ring[agent].ready++;
    });
    
    Object.entries(readiness.inner_ring).forEach(([agent, status]) => {
      if (status.ready) summary.inner_ring[agent].ready++;
    });
  }
  
  console.log(`\n🔵 外环智能体就绪度:`);
  Object.entries(summary.outer_ring).forEach(([agent, { ready, total }]) => {
    const pct = (ready / total * 100).toFixed(1);
    const status = ready === total ? '✅' : (ready > total * 0.8 ? '⚠️' : '❌');
    console.log(`  ${status} ${agent}: ${ready}/${total} (${pct}%)`);
  });
  
  console.log(`\n🟢 中环智能体就绪度:`);
  Object.entries(summary.inner_ring).forEach(([agent, { ready, total }]) => {
    const pct = (ready / total * 100).toFixed(1);
    const status = ready === total ? '✅' : (ready > total * 0.8 ? '⚠️' : '❌');
    console.log(`  ${status} ${agent}: ${ready}/${total} (${pct}%)`);
  });
  
  return summary;
}

// 主程序
console.log('🔍 滴灌通标的数据验证报告');
console.log('生成时间:', new Date().toISOString());
console.log(`\n总标的数量: ${originalDeals.length + completeDeals.length} (原始${originalDeals.length} + 完整${completeDeals.length})`);

// 验证原始50个标的
const originalStats = analyzeDataset(originalDeals, '原始标的（50个）', 'original');
const originalReadiness = analyzeAgentReadiness(originalDeals, '原始标的');

// 验证完整50个标的
const completeStats = analyzeDataset(completeDeals, '完整标的（50个）', 'complete');
const completeReadiness = analyzeAgentReadiness(completeDeals, '完整标的');

// 综合评估
console.log(`\n${'='.repeat(60)}`);
console.log('📋 综合评估结论');
console.log(`${'='.repeat(60)}`);

const totalDeals = originalDeals.length + completeDeals.length;
const totalValid = originalStats.valid + completeStats.valid;
const validPct = (totalValid / totalDeals * 100).toFixed(1);

console.log(`\n✅ 数据完整性: ${totalValid}/${totalDeals} (${validPct}%)`);
console.log(`📊 行业覆盖: ${new Set([...Object.keys(originalStats.industries), ...Object.keys(completeStats.industries)]).size}个行业`);
console.log(`🌍 地区覆盖: ${new Set([...Object.keys(originalStats.regions), ...Object.keys(completeStats.regions)]).size}个地区`);

// 评估漏斗可用性
const canPassOuterRing = completeStats.valid; // 完整标的可通过外环
const canPassInnerRing = completeReadiness.inner_ring['financial-health-agent'].ready;

console.log(`\n🎯 评估漏斗可用性:`);
console.log(`  外环通过率: ${(canPassOuterRing / totalDeals * 100).toFixed(1)}%`);
console.log(`  中环就绪率: ${(canPassInnerRing / totalDeals * 100).toFixed(1)}%`);

// 建议
console.log(`\n💡 建议:`);
if (validPct < 80) {
  console.log(`  1. 建议补充缺失字段以提高数据完整性`);
}
if (Object.keys(originalStats.issues).length > 0) {
  console.log(`  2. 原始标的存在${Object.keys(originalStats.issues).length}类问题，建议修复`);
}
if (completeStats.valid === completeDeals.length) {
  console.log(`  3. 完整标的数据质量良好，可直接用于评估漏斗测试`);
}
