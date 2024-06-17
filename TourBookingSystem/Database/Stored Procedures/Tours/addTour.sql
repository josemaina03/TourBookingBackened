USE TOURBOOKING;
GO
CREATE OR ALTER PROCEDURE addTour
    @id VARCHAR(36),
    @name NVARCHAR(255),
    @description NVARCHAR(MAX),
    @price DECIMAL(10, 2),
    @duration INT
AS
BEGIN
    INSERT INTO Tours (id, name, description, price, duration)
    VALUES (@id, @name, @description, @price, @duration);
END;

