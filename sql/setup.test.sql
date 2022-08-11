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
    author_id bigint,
    content varchar(255) not null,
    foreign key(author_id) references github_users(id) on delete set null
);

insert into github_users (username, email, avatar)
values
('bob', 'bob@example.com', 'bobs-avatar.png'),
('alice', 'alice@example.com', 'alices-avatar.png');

insert into posts (author_id, content)
values
(1, 'hey I''m Bob'),
(2, 'hi my name is Alice'),
(null, 'I deleted my account');
