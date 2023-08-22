drop database olympics;
create database olympics;

\c olympics


CREATE TABLE 	COUNTRY
 (	country_id SERIAL NOT NULL PRIMARY KEY,
	country_name VARCHAR(30) NOT NULL, 

	UNIQUE (country_name));


CREATE TABLE 	PARTICIPANT
 (	player_id SERIAL NOT NULL ,
	country_id INT NOT NULL ,
	player_name VARCHAR(50) NOT NULL,
	gender VARCHAR(1) , 
	age INT CHECK (age > 16), 
	weight INT,
	
	PRIMARY KEY (player_id),
	FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id)    );

CREATE TABLE 	EVENT
 (	event_id SERIAL NOT NULL ,
	event_name VARCHAR(30) NOT NULL, 
	world_record DECIMAL(5,2) DEFAULT NULL,
	record_holder_id INT DEFAULT NULL,

	UNIQUE (event_name) ,
	PRIMARY KEY (event_id),    
	FOREIGN KEY (record_holder_id) REFERENCES PARTICIPANT(player_id)  );


CREATE TABLE 	VENUE
 (	venue_id SERIAL NOT NULL ,
	venue_name VARCHAR(30) NOT NULL ,
	no_of_seats INT,
	type VARCHAR(30),

	UNIQUE (venue_name) ,
	PRIMARY KEY (venue_id)       );   

 CREATE TABLE 	COMPETES
 (	player_id SERIAL NOT NULL ,
	event_id INT NOT NULL ,
	year INT NOT NULL,
	score DECIMAL(5,2) DEFAULT NULL,

	PRIMARY KEY (player_id, event_id, year),
	FOREIGN KEY (player_id) REFERENCES PARTICIPANT(player_id), 
	FOREIGN KEY (event_id) REFERENCES EVENT(event_id)    );

CREATE TABLE 	HELD_AT
 (	venue_id SERIAL NOT NULL ,
	event_id INT NOT NULL ,
	date DATE NOT NULL , 

	--UNIQUE (date) ,
	PRIMARY KEY (event_id, venue_id, date),
	FOREIGN KEY (event_id) REFERENCES EVENT(event_id), 
    FOREIGN KEY (venue_id) REFERENCES VENUE(venue_id)     );


CREATE TABLE 	WINNER
 ( player_id SERIAL NOT NULL ,
	event_id INT NOT NULL,
	year INT NOT NULL, 
	medal VARCHAR(7),

	PRIMARY KEY (player_id, event_id, year),
	FOREIGN KEY (player_id,event_id,year) REFERENCES COMPETES(player_id,event_id,year));



CREATE TABLE 	PENALTY
 (	penalty_id SERIAL NOT NULL ,
	player_id INT NOT NULL ,
	event_id INT NOT NULL,
	year INT NOT NULL,
	type VARCHAR(40),

	PRIMARY KEY (penalty_id),
	FOREIGN KEY (player_id,event_id,year) REFERENCES COMPETES(player_id,event_id,year)       );

CREATE TABLE 	EQUIPMENT
	( equip_id SERIAL NOT NULL ,
	event_id INT NOT NULL,
	cost INT ,	
	type VARCHAR(10),

	PRIMARY KEY (equip_id),
	FOREIGN KEY (event_id) REFERENCES EVENT(event_id)       );


CREATE TABLE 	AUDIENCE
 (	ticket_id SERIAL NOT NULL ,
	venue_id INT NOT NULL ,
	person_name VARCHAR(30) NOT NULL,
	ticket_price DECIMAL(6,2) NOT NULL,
	event_id INT NOT NULL,
	date DATE NOT NULL,  

	PRIMARY KEY (ticket_id),
	FOREIGN KEY (venue_id,event_id,date) REFERENCES HELD_AT(venue_id,event_id,date)       );

-- 	--On delete cascade using ALTER
-- ALTER TABLE winner
-- DROP CONSTRAINT winner_event_id_fkey,   
-- ADD CONSTRAINT c1 FOREIGN KEY (player_id,event_id,year)
-- REFERENCES COMPETES (player_id,event_id,year) ON DELETE CASCADE;


ALTER TABLE winner
DROP CONSTRAINT winner_player_id_event_id_year_fkey,   
ADD CONSTRAINT c1 FOREIGN KEY (player_id,event_id,year)
REFERENCES COMPETES (player_id,event_id,year) ON DELETE CASCADE;


ALTER TABLE penalty
DROP CONSTRAINT penalty_player_id_event_id_year_fkey,   
ADD CONSTRAINT c2 FOREIGN KEY (player_id)
REFERENCES PARTICIPANT (player_id) ON DELETE CASCADE;


ALTER TABLE audience
DROP CONSTRAINT audience_venue_id_event_id_date_fkey,   
ADD CONSTRAINT c3 FOREIGN KEY (venue_id)
REFERENCES VENUE (venue_id) ON DELETE CASCADE;


ALTER TABLE equipment
DROP CONSTRAINT equipment_event_id_fkey,   
ADD CONSTRAINT c4 FOREIGN KEY (event_id)
REFERENCES EVENT (event_id) ON DELETE CASCADE;

ALTER TABLE held_at
DROP CONSTRAINT held_at_event_id_fkey,   
ADD CONSTRAINT c4 FOREIGN KEY (event_id)
REFERENCES EVENT (event_id) ON DELETE CASCADE;

ALTER TABLE held_at
DROP CONSTRAINT held_at_venue_id_fkey,   
ADD CONSTRAINT c5 FOREIGN KEY (venue_id)
REFERENCES VENUE (venue_id) ON DELETE CASCADE;





