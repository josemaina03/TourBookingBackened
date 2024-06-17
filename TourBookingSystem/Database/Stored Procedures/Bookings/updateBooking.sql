USE TOURBOOKING;
GO
CREATE OR ALTER PROCEDURE updateBooking
    @id VARCHAR(36),
    @status NVARCHAR(50)
AS
BEGIN
    UPDATE Bookings
    SET status = @status
    WHERE id = @id;
END;
