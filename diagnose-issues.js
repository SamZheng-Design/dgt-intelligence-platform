import { allDeals } from './src/data/deals-seed-new.ts';

console.log('诊断原始50个标的中的数据问题:\n');

const issues = [];

for (const deal of allDeals) {
  const dealIssues = [];
  
  // 检查财务数据
  if (deal.financial_data) {
    const fd = typeof deal.financial_data === 'string' 
      ? JSON.parse(deal.financial_data) 
      : deal.financial_data;
    
    // 问题1: 缺少 investment_return
    if (!fd.investment_return) {
      dealIssues.push({
        field: 'financial_data.investment_return',
        issue: '缺少投资回报测算数据',
        currentFields: Object.keys(fd)
      });
    }
    
    // 问题2: 缺少 interest_alignment
    if (!fd.interest_alignment) {
      dealIssues.push({
        field: 'financial_data.interest_alignment',
        issue: '缺少利益一致性数据'
      });
    }
    
    // 问题3: 缺少 guarantee_mechanism
    if (!fd.guarantee_mechanism) {
      dealIssues.push({
        field: 'financial_data.guarantee_mechanism',
        issue: '缺少保障机制数据'
      });
    }
  }
  
  if (dealIssues.length > 0) {
    issues.push({
      id: deal.id,
      name: deal.company_name,
      industry: deal.industry,
      funding_amount: deal.funding_amount,
      revenue_share_ratio: deal.revenue_share_ratio,
      issues: dealIssues
    });
  }
}

// 按问题类型分组统计
const issueStats = {};
issues.forEach(d => {
  d.issues.forEach(i => {
    if (!issueStats[i.field]) {
      issueStats[i.field] = { count: 0, deals: [] };
    }
    issueStats[i.field].count++;
    issueStats[i.field].deals.push(d.id);
  });
});

console.log('问题统计:');
Object.entries(issueStats).forEach(([field, stat]) => {
  console.log(`\n${field}: ${stat.count}个标的`);
  if (stat.count <= 10) {
    console.log(`  标的ID: ${stat.deals.join(', ')}`);
  }
});

// 找出缺少 investment_return 的标的详情
console.log('\n\n缺少 investment_return 的标的详情:');
const missingIRR = issues.filter(d => 
  d.issues.some(i => i.field === 'financial_data.investment_return')
);

missingIRR.forEach(d => {
  console.log(`\n${d.id}: ${d.name}`);
  console.log(`  行业: ${d.industry}`);
  console.log(`  投资金额: ${d.funding_amount}万`);
  console.log(`  分成比例: ${typeof d.revenue_share_ratio === 'number' ? (d.revenue_share_ratio * 100).toFixed(1) + '%' : d.revenue_share_ratio}`);
  const issue = d.issues.find(i => i.field === 'financial_data.investment_return');
  if (issue?.currentFields) {
    console.log(`  现有字段: ${issue.currentFields.join(', ')}`);
  }
});

// 输出修复所需的数据
console.log('\n\n需要修复的标的ID列表:');
console.log(JSON.stringify(missingIRR.map(d => d.id)));
