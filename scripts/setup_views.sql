use test;

/* account */
drop view if exists all_account_info;

create view all_account_info as
select 银行账户.户号 as 户号, 余额, 开户日期, '储蓄账户' as 账户类型, 利率, 货币类型, null as 透支额
from 银行账户, 储蓄账户
where 银行账户.户号 = 储蓄账户.户号
union
select 银行账户.户号 as 户号, 余额, 开户日期, '支票账户' as 账户类型, null as 利率, null as 货币类型, 透支额
from 银行账户, 支票账户
where 银行账户.户号 = 支票账户.户号;

/* loan */
drop view if exists all_loan_info;

create view all_loan_info as
select 贷款额, 贷款.贷款号, 支行名字, 支付次数 as 应支付次数, ifnull(款项统计.已支付次数, 0) as 已支付次数,
       ifnull(款项统计.已支付金额, 0) as 已支付金额,
       if(isnull(款项统计.已支付次数), '未支付', if(款项统计.已支付次数 = 贷款.支付次数, '支付完成', '部分支付')) as 支付状态
from 贷款 left outer join (select sum(1) as 已支付次数,sum(款项金额) as 已支付金额, 贷款号
    from 款项
    group by 贷款号) 款项统计
on 贷款.贷款号 = 款项统计.贷款号;