USE TOURBOOKING;
GO
CREATE OR ALTER PROCEDURE updateHotel
    @id VARCHAR(36),
    @name NVARCHAR(255),
    @location NVARCHAR(255),
    @price DECIMAL(10, 2)
AS
BEGIN
    UPDATE Hotels
    SET name = @name, location = @location, price = @price, updatedAt = GETDATE()
    WHERE id = @id;
END;

