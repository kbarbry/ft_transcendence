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
('537d4ec6daffd64a2d4c', 'random url', 'alfred@42.fr', 'Ally', 'oui', null, null, false, 'Online', 'English', 1),
('f488e59aef615c5df6df', 'random url', 'bob.fr', 'Bobby', 'Babby', null, null, false, 'Online', 'English', 1),
('4376f06677b65d3168d6', 'random url', 'charlie@42.fr', 'Chacha', 'oui', null, null, false, 'Invisble', 'French', 12),
('df87734d323ac71c6efb', 'random url', 'david@42.fr', 'dav', 'oui', null, null, false, 'Invisble', 'French', 12),
('ec178ef86d29197b6ffd', 'random url', 'evan@42.fr', 'evee', 'oui', null, null, false, 'Idle', 'Spanish', 36),
('e28d4ff1f6cd647fc171', 'random url', 'frank@42.fr', 'punisher', 'oui', null, null, false, 'DoNotDisturb', 'Spanish', 9000);