create user audience_member with password 'audience_member' createdb;
create user judge with password 'judge' createdb;
create user player with password 'player' createdb;
create user IOC with password 'IOC' createdb;

--grant select ON ALL TABLES IN SCHEMA public TO audience_member;
GRANT pg_read_all_data TO audience_member;

grant select ON participant, penalty, winner to judge;
grant update(penalty_id,type) on penalty to judge;
grant select on event, venue, held_at, equipment to player;
grant select, insert, update on equipment to IOC;

-- on command line 
-- login as user and run this command from that user
psql -U audience_member -d olympics
select * from participant,event;

-- inside psql olympics of pstgres user
revoke select on winner from judge;
select * from winner;