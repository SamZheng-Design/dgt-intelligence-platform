import { allDeals } from './src/data/deals-seed-new.ts';

console.log('检查原始50个标的中缺少投资回报测算数据的标的:\n');

let issueCount = 0;
for (const deal of allDeals) {
  if (deal.financial_data) {
    const fd = typeof deal.financial_data === 'string' 
      ? JSON.parse(deal.financial_data) 
      : deal.financial_data;
    
    if (!fd.investment_return) {
      issueCount++;
      console.log(`${deal.id}: ${deal.company_name}`);
      console.log(`  行业: ${deal.industry}`);
      console.log(`  金额: ${deal.funding_amount}万`);
      console.log(`  财务数据字段: ${Object.keys(fd).join(', ')}`);
      console.log('');
    }
  }
}

console.log(`\n共 ${issueCount} 个标的缺少 investment_return 数据`);

// 检查一个有效标的的财务数据结构作为参考
console.log('\n参考有效标的的财务数据结构:');
const validDeal = allDeals.find(d => {
  const fd = typeof d.financial_data === 'string' 
    ? JSON.parse(d.financial_data) 
    : d.financial_data;
  return fd?.investment_return;
});

if (validDeal) {
  const fd = typeof validDeal.financial_data === 'string' 
    ? JSON.parse(validDeal.financial_data) 
    : validDeal.financial_data;
  console.log(`标的: ${validDeal.id} - ${validDeal.company_name}`);
  console.log('investment_return 结构:', JSON.stringify(fd.investment_return, null, 2));
}
