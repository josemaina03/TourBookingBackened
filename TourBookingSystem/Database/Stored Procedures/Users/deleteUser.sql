USE TOURBOOKING;
GO
CREATE OR ALTER PROCEDURE deleteUser
    @id VARCHAR(36)
AS
BEGIN
    UPDATE Users
    SET isDeleted = 1, updatedAt = GETDATE()
    WHERE id = @id;
END;

