USE TOURBOOKING;

CREATE TABLE Bookings (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    tourId VARCHAR(36) NOT NULL,
    hotelId VARCHAR(36) NOT NULL,
    bookingDate DATETIME DEFAULT GETDATE(),
    status NVARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (tourId) REFERENCES Tours(id),
    FOREIGN KEY (hotelId) REFERENCES Hotels(id)
);
