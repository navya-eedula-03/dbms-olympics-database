\c olympics

INSERT into COUNTRY(country_name) values('Denmark');
INSERT into COUNTRY(country_name) values('Netherlands');
INSERT into COUNTRY(country_name) values('Australia');
INSERT into COUNTRY(country_name) values('Spain');
INSERT into COUNTRY(country_name) values('Phillipines');
INSERT into COUNTRY(country_name) values('USA');
INSERT into COUNTRY(country_name) values('India');
INSERT into COUNTRY(country_name) values('Finland');
INSERT into COUNTRY(country_name) values('Kenya');
INSERT into COUNTRY(country_name) values('Germany');
INSERT into COUNTRY(country_name) values('Great Britain');
INSERT into COUNTRY(country_name) values('Egypt');
INSERT into COUNTRY(country_name) values('Russia');


INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(1, 'Edgar Lindenau Aabye', 'M', 34, 90); --Basketball, 1996
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(2, 'Christine Jacoba Aaftink', 'F', 27, 81); --Freestyle, 2004
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(1, 'Sonia Blanco Bernal', 'F', 31, 68); --basketball, 1992
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(3, 'Adam Tony Forsyth', 'M', 23, 88); --boxing, 1996
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(4, 'Jaume Fort Mauri', 'M', 22, 83); --Freestyle, 1992
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(5,'Renato Rene Fortaleza','M',17,51); --boxing, 1988
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(6,'Joseph Cephis Joe Fortenberry','M',27,94); --basketball,1996
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(7,'Saina Nehwal','F',24,67); --single's badminton, double's badminton,2012, 2016
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(7,'PV Sindhu','F',21,70); --badminton
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(8,'Einar Ferdinand Aalto','M',26,65); --breastroke, Finland, 1996
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(8,'Arvo Ossian Aaltonen','M',22,68); --breastroke, Finland, 2000
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(2,'Stefan Remco Aartsen','M',21,74); --breastroke, Netherlands, 2000
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(9,'Paul Kipngetich Tanui','M',28, 90); --100M sprint and 4X100M relay, Kenya, 2016 (map it in the table competes -> same player in two sports)), 2004
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(6,'Lee Calhoun','M',28, 90); --110M Hurdles, USA, 1992 and 1996 (won gold medal in both years)
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(7,'Mary Kom','F',34,50); --2016,2020
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(7,'Neeraj Chopra','M',23,86); --Javelin Throw, 2020
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(10,'Johannes Vetter','M',26,84); --Javelin Throw, 2020, Germany
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(11,'Peter Heatly','M',24,43); --1996, Great Britain, Diving
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(12,'Sahar Helal','F',17, 43); --2002, Egypt, Synchronised Swimming
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(7,'Ravi Kumar','M',23,57); --wrestling 2020
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(13,'Zavur Uguev','M',25,57); --wrestling 2020, Russia (ROC) 
INSERT into PARTICIPANT(country_id,player_name,gender,age,weight) values(6,'Sarah Robles','F',30,80); --weightlifting 2008

INSERT into EVENT(event_name) values('Basketball');--1
INSERT into EVENT(event_name) values('Doubles Badminton');
INSERT into EVENT(event_name) values('Boxing');--3
INSERT into EVENT(event_name,world_record,record_holder_id) values('Freestyle Swimming',20.91,2);
INSERT into EVENT(event_name) values('Singles Badminton');--5
INSERT into EVENT(event_name,world_record,record_holder_id) values('Weight Lifting',223.00, 21);
INSERT into EVENT(event_name,world_record,record_holder_id) values('100m Sprint', 9.58,13);--7
INSERT into EVENT(event_name,world_record,record_holder_id) values('110m Hurdles',12.91,14);
INSERT into EVENT(event_name,world_record,record_holder_id) values('Javelin Throw',98.48,17);--9
INSERT into EVENT(event_name,world_record,record_holder_id) values('Diving',59.87,17);
INSERT into EVENT(event_name) values('Synchronised Swimming');--11
INSERT into EVENT(event_name) values('Wrestling');
INSERT into EVENT(event_name,world_record,record_holder_id) values('Breaststroke Swimming',138.95,10);--13
INSERT into EVENT(event_name,world_record,record_holder_id) values('4X100m Sprint',43.03,13);

INSERT into COMPETES values(1,1,1996,102);
INSERT into COMPETES values(2,4,2004,29.07);
INSERT into COMPETES values(2,2,2004);
INSERT into COMPETES values(3,1,1992,117);
INSERT into COMPETES values(4,3,1996);
INSERT into COMPETES values(5,4,1992,28.09);
INSERT into COMPETES values(6,3,1988);
INSERT into COMPETES values(7,1,1996,111);
INSERT into COMPETES values(8,5,2012);
INSERT into COMPETES values(8,5,2016);
INSERT into COMPETES values(8,2,2016);
INSERT into COMPETES values(9,5,2016);
INSERT into COMPETES values(9,5,2020);
INSERT into COMPETES values(10,13,1996,144.56);
INSERT into COMPETES values(11,13,2000,150.60);
INSERT into COMPETES values(12,13,2000,150.00);
INSERT into COMPETES values(13,7,2004,11.45);
INSERT into COMPETES values(13,7,2016,11.32);
INSERT into COMPETES values(13,14,2004,45.64);
INSERT into COMPETES values(13,14,2016,47.66);
INSERT into COMPETES values(14,8,1992,13.4);
INSERT into COMPETES values(14,8,1996,14.5);
INSERT into COMPETES values(15,3,2016);
INSERT into COMPETES values(15,3,2020);
INSERT into COMPETES values(16,9,2020,100.00);
INSERT into COMPETES values(17,9,2020,103.43);
INSERT into COMPETES values(18,10,1996,45.6);
INSERT into COMPETES values(19,11,2002,30.00);
INSERT into COMPETES values(20,2,2020);
INSERT into COMPETES values(21,9,2020,113.4);
INSERT into COMPETES values(21,9,2012,114.5);
INSERT into COMPETES values(22,6,2020,198.00);

--Track and Field,Swimming, Badminton,Boxing,Wrestling,Basketball,Weightlifting
INSERT into VENUE(venue_name,no_of_seats,type) values('Olympic Badminton Arena',300,'Badminton'); --Doubles, Singles
INSERT into VENUE(venue_name,no_of_seats,type) values('Panathinaiko Stadium',600,'Track And Field');-- Hurdles,Javeline,100m, 4X100m
INSERT into VENUE(venue_name,no_of_seats,type) values('Deodoro Aquatics Centre',500,'Swimming');--Sync Swimming,Free Style, Breaststroke,Diving
INSERT into VENUE(venue_name,no_of_seats,type) values('Peristeri Olympic Boxing Hall',200,'Boxing');
INSERT into VENUE(venue_name,no_of_seats,type) values('Vélodrome Dhiver',900,'Wrestling and Weightlifting');--Wrestling, Weightlifting
INSERT into VENUE(venue_name,no_of_seats,type) values('Madison Square Garden',350,'Basketball');

INSERT into HELD_AT values(1,5,'2012/01/01'); --singles badminton
INSERT into HELD_AT values(1,5,'2016/01/01');
INSERT into HELD_AT values(1,5,'2020/01/01');
INSERT into HELD_AT values(1,6,'2012/02/01');--doubles badminton
INSERT into HELD_AT values(1,6,'2016/02/01');
INSERT into HELD_AT values(2,8,'1992/01/01');--hurdles
INSERT into HELD_AT values(2,8,'1996/01/01');
INSERT into HELD_AT values(2,9,'2020/01/01');--javelin
INSERT into HELD_AT values(2,9,'2016/01/01'); --100m
INSERT into HELD_AT values(2,14,'2016/02/01'); --4X100m
INSERT into HELD_AT values(3,11,'2002/01/01'); --sync swimming
INSERT into HELD_AT values(3,4,'1992/01/01');--free-style
INSERT into HELD_AT values(3,4,'2004/01/01');
INSERT into HELD_AT values(3,13,'2000/01/01');--breaststroke
INSERT into HELD_AT values(3,13,'1996/01/01');
INSERT into HELD_AT values(3,10,'1996/02/01'); --diving

INSERT into AUDIENCE(venue_id,person_name,ticket_price,event_id,date) values(1,'John',700.00,5,'2016/01/01');
INSERT into AUDIENCE(venue_id,person_name,ticket_price,event_id,date) values(2,'Sarah',1200.00,9,'2020/01/01');
INSERT into AUDIENCE(venue_id,person_name,ticket_price,event_id,date) values(2,'Gambhir',450.00,8,'1996/01/01');
INSERT into AUDIENCE(venue_id,person_name,ticket_price,event_id,date) values(6,'Jackson',983.00,8,'1996/01/01');
INSERT into AUDIENCE(venue_id,person_name,ticket_price,event_id,date) values(5,'Jolly',1200.00,11,'2002/01/01');
INSERT into AUDIENCE(venue_id,person_name,ticket_price,event_id,date) values(3,'Jackson',700.00,13,'2000/01/01');
INSERT into AUDIENCE(venue_id,person_name,ticket_price,event_id,date) values(4,'John',1200.00,13,'1996/01/01');

INSERT into WINNER values(1,1, 1996,'Gold');
INSERT into WINNER values(2,2, 2004, 'Gold');
INSERT into WINNER values(5,4, 1992, 'Silver');
INSERT into WINNER values(7,1,1996,'Bronze');
INSERT into WINNER values(13,7,2016,'Gold');
INSERT into WINNER values(13,14,2016,'Gold');
INSERT into WINNER values(14,8,1992,'Gold');
INSERT into WINNER values(14,8,1996,'Gold');
INSERT into WINNER values(16,9,2020,'Gold');
INSERT into WINNER values(17,9,2020,'Silver');
INSERT into WINNER values(8,5,2016,'Silver');
INSERT into WINNER values(8,5,2012,'Bronze');
INSERT into WINNER values(9,5,2020,'Silver');

INSERT into PENALTY(player_id,event_id,year,type) values(7,1,1996,'Flagarant Foul');
INSERT into PENALTY(player_id,event_id,year,type) values(15,3,2016,'Headbutt');
INSERT into PENALTY(player_id,event_id,year,type) values(10,13,1996,'Foul Start');
INSERT into PENALTY(player_id,event_id,year,type) values(12,13,2000,'Foul Start');

INSERT into EQUIPMENT(event_id,cost,type) values(5,15000,'Rackets');
INSERT into EQUIPMENT(event_id,cost,type) values(5,18000,'Rackets');
INSERT into EQUIPMENT(event_id,cost,type) values(2,15000,'Rackets');
INSERT into EQUIPMENT(event_id,cost,type) values(6,50000,'Weights');
INSERT into EQUIPMENT(event_id,cost,type) values(9,32000,'Spear');


