CREATE DATABASE BookManagement;
use BookManagement;
create table if not exists Kho
(
    id             int auto_increment
        primary key,
    TenKho         varchar(100) null,
    MoTa           varchar(100) null,
    SLDeSach       int          null,
    SLSachTrongKho int          null
);

create table if not exists User
(
    id int auto_increment
        primary key,
    Username  varchar(50) not null,
    Password varchar(30) not null,
    Address varchar(50) null,
    DOB     date        null,
    Email   varchar(50) null,
    PhoneNumber varchar(10) null
);



create table if not exists NhaXuatBan
(
    id     int auto_increment
        primary key,
    TenNXB varchar(100) null
);
create table if not exists Role
(
    id  int primary key,
    name  varchar(50) not null
   
);
insert into Role(id, name) values(0,'admin'),(1,'user');
select * from Role;
create table if not exists UserRole
(
    User_id int null,
    Role_id int ,
	foreign key (User_id) references User(id),
	foreign key (Role_id) references Role(id)
);

create table if not exists TheLoai
(
    id         int auto_increment
        primary key,
    TenTheLoai varchar(100) null
);

create table if not exists TinhTrangSach
(
    id        int auto_increment
        primary key,
    TinhTrang varchar(100) null
);

create table if not exists Sach
(
    id           int auto_increment
        primary key,
    TenSach      varchar(100) null,
    MoTa         varchar(100) null,
    HinhAnh      blob         null,
    TinhTrang_id int          null,
    TheLoai_id   int          null,
    NXB_id       int          null,
    Kho_id       int          null,
    constraint sach_ibfk_1
        foreign key (TinhTrang_id) references TinhTrangSach (id),
    constraint sach_ibfk_2
        foreign key (TheLoai_id) references TheLoai(id),
    constraint sach_ibfk_3
        foreign key (NXB_id) references NhaXuatBan (id)

);

create table if not exists HoaDon
(
    id          int auto_increment
        primary key,
    MaHD       int  null,
    NgayDatHang date null,
    NXB_id      int  null,
    Sach_id     int  null,
    SLDatHang   int  null,
    constraint hoadon_ibfk_1
        foreign key (NXB_id) references NhaXuatBan (id)

);

create index NXB_id
    on HoaDon (NXB_id);

create index Sach_id
    on HoaDon (Sach_id);

create table if not exists PhieuNhap
(
    id          int auto_increment
        primary key,
    MaPN        int  null,
    NgayNhap    date null,
    HoaDon_Id   int  null,
    Sach_id     int  null,
    SLNhap      int  null,
    GiaNhapSach int  null,
    constraint phieunhap_ibfk_1
        foreign key (HoaDon_Id) references HoaDon (id),
    constraint phieunhap_ibfk_2
        foreign key (Sach_id) references Sach (id)
);

create index HoaDon_Id
    on PhieuNhap (HoaDon_Id);

create index Sach_id
    on PhieuNhap (Sach_id);

create table if not exists PhieuXuat
(
    id           int auto_increment
        primary key,
    MaPX         int  null,
    NgayXuat     date null,
    User_Id int  null,
    Sach_id      int  null,
    constraint phieuxuat_ibfk_1
    foreign key (User_Id) references User (id),
    constraint phieuxuat_ibfk_2
        foreign key (Sach_id) references Sach (id)
);

create index User_id
    on PhieuXuat (User_id);

create index Sach_id
    on PhieuXuat (Sach_id);

create index NXB_id
    on Sach (NXB_id);

create index kho_id
    on Sach (Kho_id);

create index TheLoai
    on Sach (TheLoai_id);

create index TinhTrang_id
    on Sach (TinhTrang_id);


create index Role_id
    on UserRole (Role_id);

create index User_id
    on UserRole (User_id);
    insert into nhaxuatban(TenNXB)
values	("Kim Dong"),
		("Thanh Nien"),
        ("Nha Nam"),
        ("Nhan Dan"),
        ("Phu Nu");
        
insert into TinhTrangSach(TinhTrang)
values	("New"),
		("Old");
        
insert into TheLoai(TenTheLoai)
values	("Khoa Hoc"),
		("Lich Su"),
        ("Dia Ly"),
        ("Van Hoc"),
        ("Truyen XXX");
        
insert into Kho(TenKho, MoTa, SLDeSach, SLSachTrongKho)
values	("Kho 1", "Mo ta 1", 5, 10),
		("Kho 2", "Mo ta 2", 10, 20),
        ("Kho 3", "Mo ta 3", 15, 30),
        ("Kho 4", "Mo ta 4", 20, 40),
		("Kho 5", "Mo ta 5", 25, 50);
        
insert into Sach(TenSach, MoTa, TinhTrang_id, TheLoai_id, NXB_id, Kho_id)
values	("50 Sac Thai", "Mo ta 1", 1, 1, 1, 1),
		("60 Sac Thai", "Mo ta 2", 1, 2, 2, 2),
        ("70 Sac Thai", "Mo ta 3", 2, 3, 3, 3),
        ("80 Sac Thai", "Mo ta 4", 2, 4, 4, 4),
        ("90 Sac Thai", "Mo ta 5", 1, 5, 5, 5);

insert into HoaDon(MaHD, NgayDatHang, NXB_id, Sach_id, SLDatHang)
values 	(1, "2022-07-22", 1, 1, 10),
		(2, "2022-07-23", 2, 2, 20),
        (3, "2022-07-24", 3, 3, 30),
        (4, "2022-07-25", 4, 4, 40),
        (5, "2022-07-26", 5, 5, 50);

insert into User(Username, PassWord,Address,Email,PhoneNumber)
values ('Admin','admin','Ha Noi','admin@gmail.com','0966987909');
insert into User(Username, PassWord,Address,Email,PhoneNumber)
values ('user','123456','Ha Noi','user@gmail.com','0987890543');

select * from User;
insert into UserRole(User_id, Role_id) value (1,0);
