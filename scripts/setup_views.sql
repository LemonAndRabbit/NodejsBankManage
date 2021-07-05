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

/* link */
drop view if exists all_link_info;

create view all_link_info as
select 客户身份证号, 支行名字, 户号, '客户拥有支票账户' as 账户类型
from 客户拥有支票账户
union
select 客户身份证号, 支行名字, 户号, '客户拥有储蓄账户' as 账户类型
from 客户拥有储蓄账户;

/* stat */
drop view if exists bank_account_info;

create view bank_account_info as
select 开户日期, 余额, 客户拥有储蓄账户.户号 as 户号, 支行名字, 0 as type, 客户身份证号
from all_account_info, 客户拥有储蓄账户
where 客户拥有储蓄账户.户号 = all_account_info.户号
union
select 开户日期, 余额, 客户拥有支票账户.户号, 支行名字, 1 as type, 客户身份证号
from all_account_info, 客户拥有支票账户
where 客户拥有支票账户.户号 = all_account_info.户号;

drop view if exists dis_bank_account_info;

create view dis_bank_account_info as
select distinct 开户日期, 余额, 户号, 支行名字, type
from bank_account_info;


drop view if exists bank_loan_info;

create view bank_loan_info as
select 支行名字, 款项.贷款号 as 贷款号, 款项.款项号 as 款项号, 款项日期, 款项金额, 客户身份证号
from 贷款持有者关系, 贷款, 款项
where 贷款持有者关系.贷款号 = 贷款.贷款号 and 贷款.贷款号 = 款项.贷款号;

drop view if exists dis_bank_loan_info;

create view dis_bank_loan_info as
select distinct 支行名字, 贷款号, 款项号, 款项日期, 款项金额
from bank_loan_info;