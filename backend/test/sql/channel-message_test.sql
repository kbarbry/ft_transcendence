INSERT INTO 
"public"."User" 
VALUES 
('au7d4ec6daffd64a2d4ca', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
('bu88e59aef615c5df6dfb', 'random url', 'bob.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
('cu76f06677b65d3168d6c', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
('du87734d323ac71c6efbd', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
('eu178ef86d29197b6ffde', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
('fu8d4ff1f6cd647fc171f', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);

--                                                                Table "public.Channel"
--   Column   |              Type              | Collation | Nullable |         Default          | Storage  | Compression | Stats target | Description
-- -----------+--------------------------------+-----------+----------+--------------------------+----------+-------------+--------------+-------------
--  id        | text                           |           | not null |                          | extended |             |              |
--  name      | text                           |           | not null |                          | extended |             |              |
--  avatarUrl | text                           |           |          |                          | extended |             |              |
--  topic     | text                           |           |          |                          | extended |             |              |
--  password  | text                           |           |          |                          | extended |             |              |
--  ownerId   | text                           |           | not null |                          | extended |             |              |
--  maxUsers  | integer                        |           | not null | 50                       | plain    |             |              |
--  type      | "EChannelType"                 |           | not null | 'Public'::"EChannelType" | plain    |             |              |
--  createdAt | timestamp(3) without time zone |           | not null | CURRENT_TIMESTAMP        | plain    |             |              |
-- Indexes:
--     "Channel_pkey" PRIMARY KEY, btree (id)
-- Foreign-key constraints:
--     "Channel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT
-- Referenced by:
--     TABLE ""ChannelMember"" CONSTRAINT "ChannelMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"(id) ON UPDATE CASCADE ON DELETE CASCADE
--     TABLE ""ChannelMessage"" CONSTRAINT "ChannelMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"(id) ON UPDATE CASCADE ON DELETE CASCADE

INSERT INTO
"public"."Channel"
VALUES
('ac7d4ec6daffd64a2d4ca', 'public one', 'avatar url', 'pubic things', null, 'au7d4ec6daffd64a2d4ca', 5, 'Public', '2023-09-13 11:30:42'),
('bc88e59aef615c5df6dfb', 'protected one', 'avatar url', 'protected things', null, 'bu88e59aef615c5df6dfb', 5, 'Private', '2023-09-13 11:30:42'),
('cc76f06677b65d3168d6c', 'private one', 'avatar url', 'private things', null, 'cu76f06677b65d3168d6c', 5, 'Protected', '2023-09-13 11:30:42');

--                                                         Table "public.ChannelMessage"
--   Column   |              Type              | Collation | Nullable |      Default      | Storage  | Compression | Stats target | Description
-- -----------+--------------------------------+-----------+----------+-------------------+----------+-------------+--------------+-------------
--  id        | text                           |           | not null |                   | extended |             |              |
--  senderId  | text                           |           | not null |                   | extended |             |              |
--  channelId | text                           |           | not null |                   | extended |             |              |
--  content   | text                           |           | not null |                   | extended |             |              |
--  createdAt | timestamp(3) without time zone |           | not null | CURRENT_TIMESTAMP | plain    |             |              |
-- Indexes:
--     "ChannelMessage_pkey" PRIMARY KEY, btree (id)
-- Foreign-key constraints:
--     "ChannelMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"(id) ON UPDATE CASCADE ON DELETE CASCADE
--     "ChannelMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT

INSERT INTO
"public"."ChannelMessage"
VALUES
('am7d4ec6daffd64a2d4ca', 'au7d4ec6daffd64a2d4ca', 'ac7d4ec6daffd64a2d4ca', 'Hello', '2023-09-13 11:30:42'),
('bm7d4ec6daffd64a2d4cb', 'bu88e59aef615c5df6dfb', 'ac7d4ec6daffd64a2d4ca', 'Hello you too', '2023-09-13 11:30:42'),
('cm7d4ec6daffd64a2d4cc', 'cu76f06677b65d3168d6c', 'ac7d4ec6daffd64a2d4ca', 'Hi lol', '2023-09-13 11:30:42');
