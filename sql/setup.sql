-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
drop table if exists posts;
drop table if exists github_users;

create table github_users (
    id bigint generated always as identity primary key,
    username varchar(255) not null unique,
    email varchar(320),
    avatar text
);

create table posts (
    id bigint generated always as identity primary key,
    created_at timestamp with time zone not null default now(),
    author_id bigint,
    content varchar(255) not null,
    foreign key(author_id) references github_users(id) on delete set null
);
