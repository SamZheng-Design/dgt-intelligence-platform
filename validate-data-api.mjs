#!/usr/bin/env node
/**
 * 通过API验证数据完整性的脚本
 */

const API_BASE = 'http://localhost:3000';

// 必需字段定义
// 注意：investment_period_months 和 revenue_share_ratio 可以在顶级或 financial_data 中
const REQUIRED_FIELDS = {
  basic: ['id', 'company_name', 'industry', 'funding_amount', 'cashflow_frequency'],
  basicOptional: ['region', 'city'], // 可选但建议有
  financialOrTop: ['investment_period_months', 'revenue_share_ratio'], // 可以在顶级或 financial_data 中
  financial: ['financial_data'],
  evaluation: ['investment_return', 'interest_alignment', 'guarantee_mechanism']
};

async function fetchJSON(url) {
  const response = await fetch(url);
  return response.json();
}

async function validateDeals() {
  console.log('🔍 滴灌通标的数据完整性验证报告\n');
  console.log('=' .repeat(60) + '\n');
  
  // 获取所有标的
  const dealsResponse = await fetchJSON(`${API_BASE}/api/deals`);
  if (!dealsResponse.success) {
    console.error('❌ 无法获取标的数据');
    return;
  }
  
  const deals = dealsResponse.data;
  console.log(`📊 总标的数量: ${deals.length}\n`);
  
  // 统计变量
  const stats = {
    total: deals.length,
    valid: 0,
    invalid: 0,
    issues: [],
    missingFields: {},
    bySource: {
      original: { total: 0, valid: 0, issues: [] },
      complete: { total: 0, valid: 0, issues: [] }
    }
  };
  
  // 字段统计
  const fieldStats = {
    funding_amount: 0,
    investment_period_months: 0,
    revenue_share_ratio: 0,
    cashflow_frequency: 0,
    financial_data: 0,
    investment_return: 0,
    interest_alignment: 0,
    guarantee_mechanism: 0
  };
  
  // 验证每个标的
  for (const deal of deals) {
    const issues = [];
    const isComplete = deal.id.includes('-C');
    const source = isComplete ? 'complete' : 'original';
    
    stats.bySource[source].total++;
    
    // 检查基础字段
    for (const field of REQUIRED_FIELDS.basic) {
      if (deal[field] === undefined || deal[field] === null || deal[field] === '') {
        issues.push(`缺少 ${field}`);
        stats.missingFields[field] = (stats.missingFields[field] || 0) + 1;
      } else {
        fieldStats[field] = (fieldStats[field] || 0) + 1;
      }
    }
    
    // 解析 financial_data 供后续检查
    let financialData = {};
    try {
      financialData = typeof deal.financial_data === 'string' 
        ? JSON.parse(deal.financial_data) 
        : deal.financial_data || {};
    } catch (e) {
      // 解析失败
    }
    
    // 检查可在顶级或 financial_data 中的字段
    for (const field of REQUIRED_FIELDS.financialOrTop) {
      const topValue = deal[field];
      const fdValue = financialData[field];
      if ((topValue === undefined || topValue === null) && (fdValue === undefined || fdValue === null)) {
        issues.push(`缺少 ${field}（顶级和financial_data中都没有）`);
        stats.missingFields[field] = (stats.missingFields[field] || 0) + 1;
      } else {
        fieldStats[field] = (fieldStats[field] || 0) + 1;
      }
    }
    
    // 检查financial_data字段
    if (deal.financial_data) {
      fieldStats.financial_data++;
      
      // 检查关键评估字段（使用前面已解析的 financialData）
      if (financialData.investment_return) {
        fieldStats.investment_return++;
      } else {
        issues.push('缺少 investment_return');
      }
      
      if (financialData.interest_alignment) {
        fieldStats.interest_alignment++;
      } else {
        issues.push('缺少 interest_alignment');
      }
      
      if (financialData.guarantee_mechanism) {
        fieldStats.guarantee_mechanism++;
      } else {
        issues.push('缺少 guarantee_mechanism');
      }
    } else {
      issues.push('缺少 financial_data');
    }
    
    // 记录结果
    if (issues.length === 0) {
      stats.valid++;
      stats.bySource[source].valid++;
    } else {
      stats.invalid++;
      stats.issues.push({ id: deal.id, company: deal.company_name, issues });
      stats.bySource[source].issues.push({ id: deal.id, issues });
    }
  }
  
  // 输出报告
  console.log('📈 数据完整性统计\n');
  console.log(`  总标的数: ${stats.total}`);
  console.log(`  ✅ 完全有效: ${stats.valid} (${(stats.valid/stats.total*100).toFixed(1)}%)`);
  console.log(`  ❌ 存在问题: ${stats.invalid} (${(stats.invalid/stats.total*100).toFixed(1)}%)`);
  
  console.log('\n📊 分类统计:');
  console.log(`  原始标的 (DGT-2026-xxx): ${stats.bySource.original.total}`);
  console.log(`    - 完全有效: ${stats.bySource.original.valid}`);
  console.log(`    - 存在问题: ${stats.bySource.original.issues.length}`);
  console.log(`  完整标的 (DGT-2026-Cxxx): ${stats.bySource.complete.total}`);
  console.log(`    - 完全有效: ${stats.bySource.complete.valid}`);
  console.log(`    - 存在问题: ${stats.bySource.complete.issues.length}`);
  
  console.log('\n📋 字段覆盖率:');
  console.log(`  funding_amount: ${fieldStats.funding_amount}/${stats.total} (${(fieldStats.funding_amount/stats.total*100).toFixed(0)}%)`);
  console.log(`  investment_period_months: ${fieldStats.investment_period_months}/${stats.total} (${(fieldStats.investment_period_months/stats.total*100).toFixed(0)}%)`);
  console.log(`  revenue_share_ratio: ${fieldStats.revenue_share_ratio}/${stats.total} (${(fieldStats.revenue_share_ratio/stats.total*100).toFixed(0)}%)`);
  console.log(`  cashflow_frequency: ${fieldStats.cashflow_frequency}/${stats.total} (${(fieldStats.cashflow_frequency/stats.total*100).toFixed(0)}%)`);
  console.log(`  financial_data: ${fieldStats.financial_data}/${stats.total} (${(fieldStats.financial_data/stats.total*100).toFixed(0)}%)`);
  console.log(`  investment_return: ${fieldStats.investment_return}/${stats.total} (${(fieldStats.investment_return/stats.total*100).toFixed(0)}%)`);
  console.log(`  interest_alignment: ${fieldStats.interest_alignment}/${stats.total} (${(fieldStats.interest_alignment/stats.total*100).toFixed(0)}%)`);
  console.log(`  guarantee_mechanism: ${fieldStats.guarantee_mechanism}/${stats.total} (${(fieldStats.guarantee_mechanism/stats.total*100).toFixed(0)}%)`);
  
  // 如果有问题，输出详细信息
  if (stats.issues.length > 0) {
    console.log('\n⚠️ 存在问题的标的:\n');
    for (const item of stats.issues.slice(0, 10)) {
      console.log(`  ${item.id}: ${item.company}`);
      for (const issue of item.issues) {
        console.log(`    - ${issue}`);
      }
    }
    if (stats.issues.length > 10) {
      console.log(`  ... 还有 ${stats.issues.length - 10} 个标的存在问题`);
    }
  }
  
  // 智能体就绪度评估
  console.log('\n🤖 智能体就绪度评估:');
  console.log('\n  外环智能体:');
  console.log(`    negative-list-agent (负面清单): ${stats.total}/${stats.total} ✅`);
  console.log(`    touch-agent (材料完整性): ${fieldStats.financial_data}/${stats.total} ${fieldStats.financial_data === stats.total ? '✅' : '⚠️'}`);
  console.log(`    interest-alignment-agent (利益一致性): ${fieldStats.interest_alignment}/${stats.total} ${fieldStats.interest_alignment === stats.total ? '✅' : '⚠️'}`);
  
  console.log('\n  中环智能体:');
  console.log(`    financial-health-agent (财务健康度): ${fieldStats.investment_return}/${stats.total} ${fieldStats.investment_return === stats.total ? '✅' : '⚠️'}`);
  console.log(`    economic-calculation-agent (经济性测算): ${fieldStats.investment_return}/${stats.total} ${fieldStats.investment_return === stats.total ? '✅' : '⚠️'}`);
  
  // 结论
  console.log('\n' + '=' .repeat(60));
  console.log('\n📝 验证结论:\n');
  
  if (stats.invalid === 0) {
    console.log('  ✅ 所有100个标的数据完整，可以进行漏斗评估测试！');
  } else {
    console.log(`  ⚠️ 仍有 ${stats.invalid} 个标的存在数据问题，需要进一步修复。`);
  }
  
  return stats;
}

// 运行验证
validateDeals().catch(console.error);
