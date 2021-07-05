use test;

alter table U2客户拥有支票账户 
   drop foreign key FK_U2客户拥有支票_客户拥有支票账户关_客户;

alter table U2客户拥有支票账户 
   drop foreign key FK_U2客户拥有支票_支票账户属于支行关_支行;

alter table U2客户拥有支票账户 
   drop foreign key FK_U2客户拥有支票_支票账户拥有者关系_支票账户;

alter table U客户拥有储蓄账户 
   drop foreign key FK_U客户拥有储蓄账_储蓄账户属于支行关_支行;

alter table U客户拥有储蓄账户 
   drop foreign key FK_U客户拥有储蓄账_储蓄账户拥有者关系_储蓄账户;

alter table U客户拥有储蓄账户 
   drop foreign key FK_U客户拥有储蓄账_客户拥有账户关系_客户;

alter table 储蓄账户 
   drop foreign key FK_储蓄账户_账户类型_银行账户;

alter table 客户 
   drop foreign key FK_客户_贷款负责人_职工;

alter table 客户 
   drop foreign key FK_客户_银行账户负责人_职工;

alter table 支票账户 
   drop foreign key FK_支票账户_账户类型2_银行账户;

alter table 普通员工 
   drop foreign key FK_普通员工_普通员工属于部门关_部门;

alter table 普通员工 
   drop foreign key FK_普通员工_职工类型2_职工;

alter table 款项 
   drop foreign key FK_款项_贷款内各次款项关系_贷款;

alter table 职工 
   drop foreign key FK_职工_职工从属于支行_支行;

alter table 联系人信息 
   drop foreign key FK_联系人信息_联系人与客户关系_客户;

alter table 贷款 
   drop foreign key FK_贷款_贷款由支行发放_支行;

alter table 贷款持有者关系 
   drop foreign key FK_贷款持有者关系_贷款持有者关系_贷款;

alter table 贷款持有者关系 
   drop foreign key FK_贷款持有者关系_贷款持有者关系2_客户;

alter table 部门 
   drop foreign key FK_部门_部门经理领导部门关_部门经理;

alter table 部门经理 
   drop foreign key FK_部门经理_职工类型_职工;

alter table 部门经理 
   drop foreign key FK_部门经理_部门经理领导部门关_部门;


alter table U2客户拥有支票账户 
   drop foreign key FK_U2客户拥有支票_客户拥有支票账户关_客户;

alter table U2客户拥有支票账户 
   drop foreign key FK_U2客户拥有支票_支票账户拥有者关系_支票账户;

alter table U2客户拥有支票账户 
   drop foreign key FK_U2客户拥有支票_支票账户属于支行关_支行;

drop table if exists U2客户拥有支票账户;


alter table U客户拥有储蓄账户 
   drop foreign key FK_U客户拥有储蓄账_客户拥有账户关系_客户;

alter table U客户拥有储蓄账户 
   drop foreign key FK_U客户拥有储蓄账_储蓄账户拥有者关系_储蓄账户;

alter table U客户拥有储蓄账户 
   drop foreign key FK_U客户拥有储蓄账_储蓄账户属于支行关_支行;

drop table if exists U客户拥有储蓄账户;


alter table 储蓄账户 
   drop foreign key FK_储蓄账户_账户类型_银行账户;

drop table if exists 储蓄账户;


alter table 客户 
   drop foreign key FK_客户_贷款负责人_职工;

alter table 客户 
   drop foreign key FK_客户_银行账户负责人_职工;

drop table if exists 客户;


alter table 支票账户 
   drop foreign key FK_支票账户_账户类型2_银行账户;

drop table if exists 支票账户;

drop table if exists 支行;


alter table 普通员工 
   drop foreign key FK_普通员工_普通员工属于部门关_部门;

alter table 普通员工 
   drop foreign key FK_普通员工_职工类型2_职工;

drop table if exists 普通员工;


alter table 款项 
   drop foreign key FK_款项_贷款内各次款项关系_贷款;

drop table if exists 款项;


alter table 职工 
   drop foreign key FK_职工_职工从属于支行_支行;

drop table if exists 职工;


alter table 联系人信息 
   drop foreign key FK_联系人信息_联系人与客户关系_客户;

drop table if exists 联系人信息;


alter table 贷款 
   drop foreign key FK_贷款_贷款由支行发放_支行;

drop table if exists 贷款;


alter table 贷款持有者关系 
   drop foreign key FK_贷款持有者关系_贷款持有者关系_贷款;

alter table 贷款持有者关系 
   drop foreign key FK_贷款持有者关系_贷款持有者关系2_客户;

drop table if exists 贷款持有者关系;


alter table 部门 
   drop foreign key FK_部门_部门经理领导部门关_部门经理;

drop table if exists 部门;


alter table 部门经理 
   drop foreign key FK_部门经理_部门经理领导部门关_部门;

alter table 部门经理 
   drop foreign key FK_部门经理_职工类型_职工;

drop table if exists 部门经理;

drop table if exists 银行账户;

/*

create table 银行账户
(
   户号                   varchar(20) not null  comment '',
   余额                   double not null  comment '',
   开户日期                 date not null  comment '',
   primary key (户号)
);

create table 储蓄账户
(
   户号                   varchar(20) not null  comment '',
   余额                   double not null  comment '',
   开户日期                 date not null  comment '',
   利率                   float not null  comment '',
   货币类型                 varchar(20) not null  comment '',
   primary key (户号)
);

create table 支票账户
(
   户号                   varchar(20) not null  comment '',
   余额                   double not null  comment '',
   开户日期                 date not null  comment '',
   透支额                  float not null  comment '',
   primary key (户号)
);
*/
/*
create table 客户
(
   客户身份证号               varchar(30) not null  comment '',
   职工身份证号               varchar(20)  comment '',
   职工_职工身份证号            varchar(20)  comment '',
   客户联系电话               varchar(20) not null  comment '',
   客户家庭住址               varchar(20) not null  comment '',
   客户姓名                 varchar(20) not null  comment '',
   primary key (客户身份证号)
);

create table 联系人信息
(
   客户身份证号               varchar(30) not null  comment '',
   联系人姓名                varchar(20) not null  comment '',
   联系人手机号               varchar(20) not null  comment '',
   联系人关系                varchar(20) not null  comment '',
   联系人email             varchar(20) not null  comment '',
   primary key (客户身份证号)
);

create table U2客户拥有支票账户
(
   客户身份证号               varchar(30) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   户号                   varchar(20) not null  comment '',
   U2访问日期               date not null  comment '',
   primary key (客户身份证号, 支行名字)
);

create table U客户拥有储蓄账户
(
   客户身份证号               varchar(30) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   户号                   varchar(20) not null  comment '',
   U访问日期                date not null  comment '',
   primary key (客户身份证号, 支行名字)
);
*/

/*
create table 支行
(
   城市                   varchar(20) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   总资产                  float not null  comment '',
   primary key (支行名字)
);

create table 部门
(
   部门号                  varchar(20) not null  comment '',
   职工身份证号               varchar(20)  comment '',
   部门名称                 varchar(20) not null  comment '',
   部门类型                 varchar(20) not null  comment '',
   primary key (部门号)
);

create table 职工
(
   职工姓名                 varchar(20) not null  comment '',
   职工电话                 varchar(20) not null  comment '',
   职工家庭地址               varchar(50) not null  comment '',
   工作开始日期               date not null  comment '',
   职工身份证号               varchar(20) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   primary key (职工身份证号)
);

create table 部门经理
(
   职工身份证号               varchar(20) not null  comment '',
   部门号                  varchar(20) not null  comment '',
   职工姓名                 varchar(20) not null  comment '',
   职工电话                 varchar(20) not null  comment '',
   职工家庭地址               varchar(50) not null  comment '',
   工作开始日期               date not null  comment '',
   支行名字                 varchar(20)  comment '',
   primary key (职工身份证号)
);

create table 普通员工
(
   职工身份证号               varchar(20) not null  comment '',
   部门号                  varchar(20) not null  comment '',
   职工姓名                 varchar(20) not null  comment '',
   职工电话                 varchar(20) not null  comment '',
   职工家庭地址               varchar(50) not null  comment '',
   工作开始日期               date not null  comment '',
   支行名字                 varchar(20)  comment '',
   primary key (职工身份证号)
);
*/
/*
create table 贷款
(
   贷款额                  float not null  comment '',
   贷款号                  varchar(20) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   支付次数                 int not null  comment '',
   primary key (贷款号)
);

create table 款项
(
   贷款号                  varchar(20) not null  comment '',
   款项号                  varchar(20) not null  comment '',
   款项金额                 float not null  comment '',
   款项日期                 date not null  comment '',
   primary key (贷款号, 款项号)
);

create table 贷款持有者关系
(
   贷款号                  varchar(20) not null  comment '',
   客户身份证号               varchar(30) not null  comment '',
   primary key (贷款号, 客户身份证号)
);
*/
alter table U2客户拥有支票账户 add constraint FK_U2客户拥有支票_客户拥有支票账户关_客户 foreign key (客户身份证号)
      references 客户 (客户身份证号) on delete restrict on update restrict;

alter table U2客户拥有支票账户 add constraint FK_U2客户拥有支票_支票账户属于支行关_支行 foreign key (支行名字)
      references 支行 (支行名字) on delete restrict on update restrict;

alter table U2客户拥有支票账户 add constraint FK_U2客户拥有支票_支票账户拥有者关系_支票账户 foreign key (户号)
      references 支票账户 (户号) on delete restrict on update restrict;

alter table U客户拥有储蓄账户 add constraint FK_U客户拥有储蓄账_储蓄账户属于支行关_支行 foreign key (支行名字)
      references 支行 (支行名字) on delete restrict on update restrict;

alter table U客户拥有储蓄账户 add constraint FK_U客户拥有储蓄账_储蓄账户拥有者关系_储蓄账户 foreign key (户号)
      references 储蓄账户 (户号) on delete restrict on update restrict;

alter table U客户拥有储蓄账户 add constraint FK_U客户拥有储蓄账_客户拥有账户关系_客户 foreign key (客户身份证号)
      references 客户 (客户身份证号) on delete restrict on update restrict;

/*
alter table 客户 add constraint FK_客户_贷款负责人_职工 foreign key (职工_职工身份证号)
      references 职工 (职工身份证号) on delete restrict on update restrict;

alter table 客户 add constraint FK_客户_银行账户负责人_职工 foreign key (职工身份证号)
      references 职工 (职工身份证号) on delete restrict on update restrict;
*/
/*
alter table 储蓄账户 add constraint FK_储蓄账户_账户类型_银行账户 foreign key (户号)
      references 银行账户 (户号) on delete restrict on update restrict;

alter table 支票账户 add constraint FK_支票账户_账户类型2_银行账户 foreign key (户号)
      references 银行账户 (户号) on delete restrict on update restrict;
*/
/*
alter table 普通员工 add constraint FK_普通员工_普通员工属于部门关_部门 foreign key (部门号)
      references 部门 (部门号) on delete restrict on update restrict;

alter table 普通员工 add constraint FK_普通员工_职工类型2_职工 foreign key (职工身份证号)
      references 职工 (职工身份证号) on delete restrict on update restrict;
*/
/*
alter table 款项 add constraint FK_款项_贷款内各次款项关系_贷款 foreign key (贷款号)
      references 贷款 (贷款号) on delete restrict on update restrict;
*/
/*
alter table 职工 add constraint FK_职工_职工从属于支行_支行 foreign key (支行名字)
      references 支行 (支行名字) on delete restrict on update restrict;
*/
/*
alter table 联系人信息 add constraint FK_联系人信息_联系人与客户关系_客户 foreign key (客户身份证号)
      references 客户 (客户身份证号) on delete restrict on update restrict;
*/
/*
alter table 贷款 add constraint FK_贷款_贷款由支行发放_支行 foreign key (支行名字)
      references 支行 (支行名字) on delete restrict on update restrict;

alter table 贷款持有者关系 add constraint FK_贷款持有者关系_贷款持有者关系_贷款 foreign key (贷款号)
      references 贷款 (贷款号) on delete restrict on update restrict;

alter table 贷款持有者关系 add constraint FK_贷款持有者关系_贷款持有者关系2_客户 foreign key (客户身份证号)
      references 客户 (客户身份证号) on delete restrict on update restrict;
*/
/*
alter table 部门 add constraint FK_部门_部门经理领导部门关_部门经理 foreign key (职工身份证号)
      references 部门经理 (职工身份证号) on delete restrict on update restrict;

alter table 部门经理 add constraint FK_部门经理_职工类型_职工 foreign key (职工身份证号)
      references 职工 (职工身份证号) on delete restrict on update restrict;

alter table 部门经理 add constraint FK_部门经理_部门经理领导部门关_部门 foreign key (部门号)
      references 部门 (部门号) on delete restrict on update restrict;
*/
