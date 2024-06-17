USE TOURBOOKING;

GO
CREATE PROCEDURE updateEmailSent(
    @email VARCHAR(255)
)

AS
BEGIN
    UPDATE users
    SET isEmailSent = 1
    WHERE email = @email;
END

GO;