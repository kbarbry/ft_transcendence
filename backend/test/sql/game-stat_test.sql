DELETE FROM "public"."GameStat";
DELETE FROM "public"."User";

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

INSERT INTO 
"public"."User" 
VALUES 
('537d4ec6daffd64a2d4c', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
('f488e59aef615c5df6df', 'random url', 'bob.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
('4376f06677b65d3168d6', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
('df87734d323ac71c6efb', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
('ec178ef86d29197b6ffd', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
('e28d4ff1f6cd647fc171', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);

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

INSERT INTO 
"public"."GameStat" 
VALUES 
('537d4ec6daffd64a2d4c', '537d4ec6daffd64a2d4c', 'f488e59aef615c5df6df', 'Classic', 300, 1, 0, '2023-09-13 10:00:00'),
('f488e59aef615c5df6df', '537d4ec6daffd64a2d4c', '4376f06677b65d3168d6', 'Classic', 350, 10, 5, '2023-09-13 11:00:00'),
('4376f06677b65d3168d6', '4376f06677b65d3168d6', '537d4ec6daffd64a2d4c', 'Classic', 200, 20, 1, '2023-09-13 12:00:00'),
('df87734d323ac71c6efb', '4376f06677b65d3168d6', '537d4ec6daffd64a2d4c', 'Classic', 60, 5, 4, '2023-09-13 8:00:00'),
('ec178ef86d29197b6ffd', '537d4ec6daffd64a2d4c', 'ec178ef86d29197b6ffd', 'Special', 3600, 420, 69, '2023-09-13 7:30:00'),
('e28d4ff1f6cd647fc171', 'ec178ef86d29197b6ffd', 'e28d4ff1f6cd647fc171', 'Special', 500, 65, 40, '2023-09-13 7:45:00');
