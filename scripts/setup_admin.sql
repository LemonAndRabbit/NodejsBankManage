create table admin_table
(
	username 	Varchar(20) unique not null,
	ID		Int,
    password	Varchar(20) not null,
    primary key (ID)
);

insert into admin_table Values("root", 1, "admin");