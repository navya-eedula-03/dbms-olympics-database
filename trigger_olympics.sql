\c olympics

CREATE FUNCTION cancel_ticket()
	RETURNS trigger as $$
	BEGIN
		UPDATE venue
		SET no_of_seats = no_of_seats + 1
        WHERE venue_id = NEW.venue_id;
		RETURN NEW;
	END;
	$$
	LANGUAGE 'plpgsql';

CREATE FUNCTION book_ticket()
	RETURNS trigger as $$
	BEGIN
		UPDATE venue
		SET no_of_seats = no_of_seats - 1
		--WHERE dept_id = NEW.dept_id;
        WHERE venue_id = NEW.venue_id;
		RETURN NEW;
	END;
	$$
	LANGUAGE 'plpgsql';

-- Creating triggers

CREATE TRIGGER cancelTicket
	AFTER INSERT ON audience
	FOR EACH ROW
	EXECUTE PROCEDURE cancel_ticket();

CREATE TRIGGER bookTicket
	BEFORE DELETE ON audience
	FOR EACH ROW
	EXECUTE PROCEDURE book_ticket();

