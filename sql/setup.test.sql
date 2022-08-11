-- Use this file to add dummy data during testing
-- This file is run after setup.sql only in a test environment
insert into github_users (username, email, avatar)
values
('bob', 'bob@example.com', 'bobs-avatar.png'),
('alice', 'alice@example.com', 'alices-avatar.png');

insert into posts (author_id, content)
values
(1, 'hey I''m Bob'),
(2, 'hi my name is Alice'),
(null, 'I deleted my account');
