--    Column   |       Type       | Collation | Nullable |        Default         | Storage  | Compression | Stats target | Description
-- ------------+------------------+-----------+----------+------------------------+----------+-------------+--------------+-------------
--  id         | text             |           | not null |                        | extended |             |              |
--  avatarUrl  | text             |           | not null |                        | extended |             |              |
--  mail       | text             |           | not null |                        | extended |             |              |
--  username   | text             |           | not null |                        | extended |             |              |
--  password   | text             |           |          |                        | extended |             |              |
--  googleId   | text             |           |          |                        | extended |             |              |
--  school42Id | text             |           |          |                        | extended |             |              |
--  doubleA    | boolean          |           | not null | false                  | plain    |             |              |
--  status     | "EStatus"        |           | not null | 'Online'::"EStatus"    | plain    |             |              |
--  languages  | "ELanguage"      |           | not null | 'English'::"ELanguage" | plain    |             |              |
--  level      | double precision |           | not null |                        | plain    |             |              |

DELETE FROM "public"."User";
INSERT INTO 
"public"."User" 
VALUES 
('51d43c2', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
('807e588', 'random url', 'bob.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
('4ee771a', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
('3fc7224', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
('a5cfce0', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
('f568b3a', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);

--                                                            Table "public.GameStat"
--    Column    |              Type              | Collation | Nullable |      Default      | Storage  | Compression | Stats target | Description
-- -------------+--------------------------------+-----------+----------+-------------------+----------+-------------+--------------+-------------
--  id          | text                           |           | not null |                   | extended |             |              |
--  winnerId    | text                           |           | not null |                   | extended |             |              |
--  looserId    | text                           |           | not null |                   | extended |             |              |
--  type        | "EGameType"                    |           | not null |                   | plain    |             |              |
--  timePlayed  | integer                        |           | not null |                   | plain    |             |              |
--  scoreWinner | integer                        |           | not null |                   | plain    |             |              |
--  scoreLoser  | integer                        |           | not null |                   | plain    |             |              |
--  createdAt   | timestamp(3) without time zone |           | not null | CURRENT_TIMESTAMP | plain    |             |              |
-- Indexes:
--     "GameStat_pkey" PRIMARY KEY, btree (id)
-- Foreign-key constraints:
--     "GameStat_looserId_fkey" FOREIGN KEY ("looserId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT
--     "GameStat_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"(id) ON UPDATE CASCADE ON DELETE RESTRICT

DELETE FROM "public"."GameStat";
INSERT INTO 
"public"."GameStat" 
VALUES 
('51d43c2', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
('807e588', 'random url', 'bob.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
('4ee771a', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
('3fc7224', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
('a5cfce0', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
('f568b3a', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);
