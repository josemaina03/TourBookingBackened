USE TOURBOOKING;
GO
CREATE OR ALTER PROCEDURE cancelBooking
    @id VARCHAR(36)
AS
BEGIN
    UPDATE Bookings
    SET status = 'Cancelled'
    WHERE id = @id;
END;
