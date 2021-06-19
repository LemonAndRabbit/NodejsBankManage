use test;


/* 围绕银行员工的一些关系 */
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
   部门名称                 varchar(20) not null  comment '',
   部门类型                 varchar(20) not null  comment '',
   部门经理身份证号          varchar(20),
   primary key (部门号)
);

create table 职工
(
   职工姓名                 varchar(20) not null  comment '',
   职工电话                 varchar(20) not null  comment '',
   职工家庭地址               varchar(50) not null  comment '',
   部门号                  varchar(20) not null  comment '',
   工作开始日期               date not null  comment '',
   职工身份证号               varchar(20) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   primary key (职工身份证号)
);

alter table 职工 add constraint FK_职工_职工从属于支行 foreign key (支行名字)
    references 支行 (支行名字) on delete restrict on update restrict;

alter table 职工 add constraint FK_职工属于部门关系 foreign key (部门号)
    references 部门 (部门号) on delete restrict on update restrict;

alter table 部门 add constraint FK_部门_部门经理领导部门 foreign key (部门经理身份证号)
    references 职工 (职工身份证号) on delete restrict on update restrict;
*/
/* 围绕账户的一些关系 */
/*
create table 银行账户
(
   户号                   varchar(20) not null  comment '',
   余额                   float not null  comment '',
   开户日期                 date not null  comment '',
   primary key (户号)
);

create table 支票账户
(
   户号                   varchar(20) not null  comment '',
   透支额                  float not null  comment '',
   primary key (户号)
);

create table 储蓄账户
(
   户号                   varchar(20) not null  comment '',
   利率                   float not null  comment '',
   货币类型                 varchar(20) not null  comment '',
   primary key (户号)
);

alter table 储蓄账户 add constraint FK_储蓄账户_对应银行账户 foreign key (户号)
      references 银行账户 (户号) on delete restrict on update restrict;

alter table 支票账户 add constraint FK_支票账户_对应银行账户 foreign key (户号)
      references 银行账户 (户号) on delete restrict on update restrict;
*/
/* 围绕客户的一些关系 */
/*
create table 客户
(
   客户身份证号               varchar(30) not null  comment '',
   贷款负责人身份证号               varchar(20)  comment '',
   银行账户负责人身份证号            varchar(20)  comment '',
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

alter table 客户 add constraint FK_客户_贷款负责人 foreign key (贷款负责人身份证号)
      references 职工 (职工身份证号) on delete restrict on update restrict;

alter table 客户 add constraint FK_客户_银行账户负责人 foreign key (银行账户负责人身份证号)
      references 职工 (职工身份证号) on delete restrict on update restrict;

alter table 联系人信息 add constraint FK_联系人信息对应客户 foreign key (客户身份证号)
      references 客户 (客户身份证号) on delete restrict on update restrict;
*/
/* 账户所有关系 */
/*
create table 客户拥有支票账户
(
   客户身份证号               varchar(30) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   户号                   varchar(20) not null  comment '',
   访问日期                date not null  comment '',
   primary key (客户身份证号, 支行名字)
);

create table 客户拥有储蓄账户
(
   客户身份证号               varchar(30) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   户号                   varchar(20) not null  comment '',
   访问日期                date not null  comment '',
   primary key (客户身份证号, 支行名字)
);
*/

/* 贷款相关关系 */
create table 贷款
(
   贷款额                  float not null  comment '',
   贷款号                  varchar(20) not null  comment '',
   支行名字                 varchar(20) not null  comment '',
   支付次数                 int not null  comment '',
   primary key (贷款号)
);

alter table 贷款 add constraint FK_贷款_贷款由支行发放 foreign key (支行名字)
      references 支行 (支行名字) on delete restrict on update restrict;

create table 款项
(
   贷款号                  varchar(20) not null  comment '',
   款项号                  varchar(20) not null  comment '',
   款项金额                 float not null  comment '',
   款项日期                 date not null  comment '',
   primary key (贷款号, 款项号)
);

alter table 款项 add constraint FK_款项_贷款内各次款项关系 foreign key (贷款号)
      references 贷款 (贷款号) on delete restrict on update restrict;

create table 贷款持有者关系
(
   贷款号                  varchar(20) not null  comment '',
   客户身份证号               varchar(30) not null  comment '',
   primary key (贷款号, 客户身份证号)
);

alter table 贷款持有者关系 add constraint FK_贷款持有者关系_贷款 foreign key (贷款号)
      references 贷款 (贷款号) on delete restrict on update restrict;

alter table 贷款持有者关系 add constraint FK_贷款持有者关系_客户 foreign key (客户身份证号)
      references 客户 (客户身份证号) on delete restrict on update restrict;