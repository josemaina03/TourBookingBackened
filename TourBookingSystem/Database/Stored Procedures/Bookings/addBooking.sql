USE TOURBOOKING;
GO
CREATE OR ALTER PROCEDURE addBooking
    @id VARCHAR(36),
    @userId VARCHAR(36),
    @tourId VARCHAR(36),
    @hotelId VARCHAR(36)
AS
BEGIN
    DECLARE @bookingDate DATETIME = GETDATE();  -- Set booking date to current date and time

    INSERT INTO Bookings (id, userId, tourId, hotelId, bookingDate)
    VALUES (@id, @userId, @tourId, @hotelId, @bookingDate);
END;
