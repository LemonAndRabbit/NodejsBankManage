use test;

insert into 贷款 VALUES(5000, '0l01', '一支行', 5);

insert into 贷款 VALUES(10000, '0l02', '总行', 1);

insert into 贷款 VALUES(2000, '0L03', '一支行', 4);

insert into 款项 VALUES('0l01', '01', 1000, '2020-10-30');

insert into 款项 VALUES('0l02', '01', 10000, '2018-01-01');

insert into 贷款持有者关系 VALUES('0l01', '0x101');

insert into 贷款持有者关系 VALUES('0l01', '0x102');

insert into 贷款持有者关系 VALUES('0l02', '0X099');

insert into 贷款持有者关系 VALUES('0L03', '10000');