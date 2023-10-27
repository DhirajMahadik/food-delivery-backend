create database food_app ;

create table users (
	id int primary key auto_increment,
    name varchar(60),
    phone varchar(10),
    email varchar(60),
    password varchar(1000)
);

create table orders (
	user_id int ,
	order_id varchar(255) primary key,
    payment_id varchar(255),
    foreign key(user_id) references users(id)
);