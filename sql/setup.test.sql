-- Use this file to add dummy data during testing
-- This file is run after setup.sql only in a test environment
insert into github_users (username, email, avatar)
values
('bob', 'bob@example.com', 'https://www.placecage.com/140/100'),
('alice', 'alice@example.com', 'https://www.placecage.com/g/140/100');

insert into posts (author_id, content)
values
(1, 'hey I''m Bob'),
(2, 'hi my name is Alice'),
(null, 'I deleted my account');
