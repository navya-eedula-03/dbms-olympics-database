drop database olympics;
create database olympics;

\c olympics

CREATE TABLE 	EVENT
 (	event_id int NOT NULL  ,
	event_name VARCHAR(30) NOT NULL, 

	UNIQUE (event_name) ,
	PRIMARY KEY (event_id)     );

CREATE TABLE 	COUNTRY
 (	country_id INT NOT NULL ,
	country_name VARCHAR(15) NOT NULL, 

	UNIQUE (country_name) ,
	PRIMARY KEY (country_id)       );

CREATE TABLE 	PARTICIPANT
 (	player_id INT NOT NULL ,
	country_id INT NOT NULL ,
	player_name VARCHAR(50) NOT NULL,
	gender VARCHAR(1) , 
	age INT, 
	weight INT,
	
	PRIMARY KEY (player_id),
	FOREIGN KEY (country_id) REFERENCES COUNTRY(country_id)    );

CREATE TABLE 	VENUE
 (	venue_id INT NOT NULL ,
	venue_name VARCHAR(30) NOT NULL ,
	no_of_events INT,
	type VARCHAR(30),

	UNIQUE (venue_name) ,
	PRIMARY KEY (venue_id)       );    

CREATE TABLE 	WINNER
 ( player_id INT NOT NULL ,
	event_id INT NOT NULL,
	year INT NOT NULL, 
	medal VARCHAR(7),

	PRIMARY KEY (player_id, event_id, year),
	FOREIGN KEY (event_id) REFERENCES EVENT(event_id)       );



CREATE TABLE 	PENALTY
 (	penalty_id INT NOT NULL ,
	player_id INT NOT NULL ,
	event_id INT NOT NULL,
	type VARCHAR(10),

	PRIMARY KEY (penalty_id),
	FOREIGN KEY (player_id) REFERENCES PARTICIPANT(player_id)       );

CREATE TABLE 	EQUIPMENT
	( equip_id INT NOT NULL ,
	event_id INT NOT NULL,
	year INT NOT NULL ,	
	cost INT ,	
	type VARCHAR(10),

	PRIMARY KEY (equip_id),
	FOREIGN KEY (year) REFERENCES EVENT(event_id)       );


CREATE TABLE 	AUDIENCE
 (	ticket_id INT NOT NULL ,
	venue_id INT NOT NULL ,
	person_name VARCHAR(30) NOT NULL,
	ticket_price DECIMAL(6,2) NOT NULL,
	event_name VARCHAR(30) NOT NULL, 

	UNIQUE (event_name) ,
	PRIMARY KEY (ticket_id),
	FOREIGN KEY (venue_id) REFERENCES VENUE(venue_id)       );

CREATE TABLE 	JUDGE
 (	judge_id INT NOT NULL ,
	event_id INT NOT NULL,
	experience INT,
	score DECIMAL(3,2) NOT NULL,


	PRIMARY KEY (judge_id),
	FOREIGN KEY (event_id) REFERENCES EVENT(event_id)       );

CREATE TABLE 	HELD_AT
 (	venue_id INT NOT NULL ,
	event_id INT NOT NULL ,
	date DATE NOT NULL , 

	--UNIQUE (date) ,
	PRIMARY KEY (event_id, venue_id, date),
	FOREIGN KEY (event_id) REFERENCES EVENT(event_id), 
    FOREIGN KEY (venue_id) REFERENCES VENUE(venue_id)     );

CREATE TABLE 	COMPETES
 (	player_id INT NOT NULL ,
	event_id INT NOT NULL ,
	year INT NOT NULL,

	PRIMARY KEY (player_id, event_id, year),
	FOREIGN KEY (player_id) REFERENCES PARTICIPANT(player_id), 
	FOREIGN KEY (event_id) REFERENCES EVENT(event_id)     );
