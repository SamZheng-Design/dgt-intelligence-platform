#!/usr/bin/env node
/**
 * 修复原始50个标的缺失字段的脚本
 * 为扩展标的和创新标的添加 interest_alignment 和 guarantee_mechanism 字段
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取并更新扩展标的文件
function updateExtendedDeals() {
  const filePath = path.join(__dirname, 'src/data/deals-seed-extended.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 匹配每个标的的 financial_data 并添加缺失字段
  const dealPattern = /export const (deal_\d+_\w+) = \{[\s\S]*?result: "pending"\n\};/g;
  
  let matches = content.match(dealPattern);
  if (!matches) {
    console.log('  ⚠️ 未找到扩展标的');
    return;
  }
  
  console.log(`  📋 找到 ${matches.length} 个扩展标的`);
  
  // 为每个标的添加 interest_alignment 和 guarantee_mechanism
  let updatedCount = 0;
  
  matches.forEach(match => {
    // 检查是否已有 interest_alignment
    if (match.includes('interest_alignment')) {
      return; // 已存在，跳过
    }
    
    // 提取 investment_return 部分并在其后添加新字段
    const investmentReturnPattern = /(investment_return:\s*\{[^}]+\})\s*\}\s*\)/;
    
    if (investmentReturnPattern.test(match)) {
      // 提取标的信息来生成合理的数据
      const idMatch = match.match(/id:\s*"(DGT-2026-\d+)"/);
      const shareMatch = match.match(/revenue_share_ratio:\s*([\d.]+)/);
      const periodMatch = match.match(/investment_period_months:\s*(\d+)/);
      const amountMatch = match.match(/investment_amount:\s*(\d+)/);
      const monthlyRevenueMatch = match.match(/monthly_revenue:\s*(\d+)/);
      
      const shareRatio = shareMatch ? parseFloat(shareMatch[1]) : 0.05;
      const period = periodMatch ? parseInt(periodMatch[1]) : 24;
      const amount = amountMatch ? parseInt(amountMatch[1]) : 50;
      const monthlyRevenue = monthlyRevenueMatch ? parseInt(monthlyRevenueMatch[1]) : 100000;
      
      const interestAlignment = {
        investor_share: shareRatio,
        operator_share: parseFloat((1 - shareRatio).toFixed(2)),
        minimum_guarantee: period >= 24,
        minimum_guarantee_amount: period >= 24 ? Math.round(monthlyRevenue * shareRatio * 0.7) : null,
        performance_bonus: period >= 30 ? { threshold: 50, bonus_rate: 0.01 } : null,
        lock_up_period_months: Math.min(Math.round(period / 2), 18),
        exit_mechanism: period >= 36 ? "提前3个月告知，按剩余月份×月均分成80%补偿" : "到期自动结束"
      };
      
      const guaranteeMechanism = {
        deposit: Math.round(amount * 0.1),
        minimum_monthly_share: Math.round(monthlyRevenue * shareRatio * 0.7),
        data_transparency: "系统实时同步",
        account_type: "三方共管账户"
      };
      
      // 构建新的字段字符串（注意这里需要处理JSON格式）
      const newFieldsStr = `,\n    interest_alignment: ${JSON.stringify(interestAlignment)},\n    guarantee_mechanism: ${JSON.stringify(guaranteeMechanism)}`;
      
      const newMatch = match.replace(investmentReturnPattern, `$1${newFieldsStr} })`);
      content = content.replace(match, newMatch);
      updatedCount++;
      
      if (idMatch) {
        console.log(`    ✅ 更新 ${idMatch[1]}`);
      }
    }
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ 扩展标的更新完成，共更新 ${updatedCount} 个标的`);
}

// 读取并更新创新标的文件
function updateInnovativeDeals() {
  const filePath = path.join(__dirname, 'src/data/deals-seed-innovative.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  const dealPattern = /export const (deal_\d+_\w+) = \{[\s\S]*?result: "pending"\n\};/g;
  
  let matches = content.match(dealPattern);
  if (!matches) {
    console.log('  ⚠️ 未找到创新标的');
    return;
  }
  
  console.log(`  📋 找到 ${matches.length} 个创新标的`);
  
  let updatedCount = 0;
  
  matches.forEach(match => {
    if (match.includes('interest_alignment')) {
      return;
    }
    
    const investmentReturnPattern = /(investment_return:\s*\{[^}]+\})\s*\}\s*\)/;
    
    if (investmentReturnPattern.test(match)) {
      const idMatch = match.match(/id:\s*"(DGT-2026-\d+)"/);
      const shareMatch = match.match(/revenue_share_ratio:\s*([\d.]+)/);
      const periodMatch = match.match(/investment_period_months:\s*(\d+)/);
      const amountMatch = match.match(/investment_amount:\s*(\d+)/);
      
      // 创新标的的收入数据字段名可能不同
      const totalRevenueMatch = match.match(/total_revenue:\s*(\d+)/);
      const expectedGmvMatch = match.match(/expected_gmv:\s*(\d+)/);
      const annualRevenueMatch = match.match(/annual_revenue:\s*(\d+)/);
      
      const shareRatio = shareMatch ? parseFloat(shareMatch[1]) : 0.05;
      const period = periodMatch ? parseInt(periodMatch[1]) : 12;
      const amount = amountMatch ? parseInt(amountMatch[1]) : 100;
      
      // 根据不同类型的创新标的使用不同的收入基数
      let monthlyRevenue = 100000;
      if (totalRevenueMatch) {
        monthlyRevenue = Math.round(parseInt(totalRevenueMatch[1]) / period);
      } else if (expectedGmvMatch) {
        monthlyRevenue = Math.round(parseInt(expectedGmvMatch[1]) / period);
      } else if (annualRevenueMatch) {
        monthlyRevenue = Math.round(parseInt(annualRevenueMatch[1]) / 12);
      }
      
      const interestAlignment = {
        investor_share: shareRatio,
        operator_share: parseFloat((1 - shareRatio).toFixed(2)),
        minimum_guarantee: period >= 12,
        minimum_guarantee_amount: period >= 12 ? Math.round(monthlyRevenue * shareRatio * 0.6) : null,
        performance_bonus: period >= 24 ? { threshold: 40, bonus_rate: 0.02 } : null,
        lock_up_period_months: Math.min(Math.round(period / 2), 12),
        exit_mechanism: "项目到期自动结束，提前终止按比例补偿"
      };
      
      const guaranteeMechanism = {
        deposit: Math.round(amount * 0.08),
        minimum_monthly_share: Math.round(monthlyRevenue * shareRatio * 0.6),
        data_transparency: "平台API实时同步",
        account_type: "三方共管账户"
      };
      
      const newFieldsStr = `,\n    interest_alignment: ${JSON.stringify(interestAlignment)},\n    guarantee_mechanism: ${JSON.stringify(guaranteeMechanism)}`;
      
      const newMatch = match.replace(investmentReturnPattern, `$1${newFieldsStr} })`);
      content = content.replace(match, newMatch);
      updatedCount++;
      
      if (idMatch) {
        console.log(`    ✅ 更新 ${idMatch[1]}`);
      }
    }
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ 创新标的更新完成，共更新 ${updatedCount} 个标的`);
}

// 主函数
async function main() {
  console.log('🔧 开始修复原始50个标的缺失字段...\n');
  
  console.log('📂 1. 更新扩展标的 (deals-seed-extended.ts)...');
  try {
    updateExtendedDeals();
  } catch (e) {
    console.error('  ❌ 更新扩展标的失败:', e.message);
  }
  
  console.log('\n📂 2. 更新创新标的 (deals-seed-innovative.ts)...');
  try {
    updateInnovativeDeals();
  } catch (e) {
    console.error('  ❌ 更新创新标的失败:', e.message);
  }
  
  console.log('\n✅ 修复完成！');
}

main();
