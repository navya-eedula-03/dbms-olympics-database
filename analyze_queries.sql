--non-nested
explain analyze
select distinct player_id,player_name from participant as p, winner as w 
where w.medal = 'Gold' 
and p.player_id=w.player_id;

--nested
explain analyze
select distinct player_id,player_name from participant 
where player_id in (
select player_id from winner 
where medal = 'Gold');

-- select countries that have won gold

-- non-nested 
explain analyze
select distinct c.country_id, c.country_name from country as c, participant as p, winner as w 
where w.medal = 'Gold'and 
c.country_id = p.country_id and
p.player_id = w.player_id;

--

-- nested
explain analyze
select distinct country_id, country_name from country where country_id in (
select p.country_id from participant as p 
inner join winner as w 
on p.player_id = w.player_id 
where w.medal = 'Gold');