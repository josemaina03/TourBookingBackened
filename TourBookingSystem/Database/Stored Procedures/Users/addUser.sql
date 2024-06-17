USE TOURBOOKING;
GO
CREATE OR ALTER PROCEDURE addUser
    @id VARCHAR(36),
    @name NVARCHAR(255),
    @Email NVARCHAR(255),
    @password NVARCHAR(255),
    @isAdmin INT,
    @isDeleted INT,
    @isEmailSent INT
AS
BEGIN
    INSERT INTO Users (id, name, email, password, isAdmin, isDeleted, isEmailSent)
    VALUES (@id, @name, @Email, @password, @isAdmin, @isDeleted, @isEmailSent);
END;
