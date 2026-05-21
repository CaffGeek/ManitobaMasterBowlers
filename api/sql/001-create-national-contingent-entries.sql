CREATE TABLE dbo.NationalContingentEntries (
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    SeasonCode VARCHAR(4) NOT NULL,
    GroupKey VARCHAR(40) NOT NULL,
    Division VARCHAR(15) NOT NULL,
    Gender VARCHAR(1) NULL,
    EntryType VARCHAR(10) NOT NULL,
    Position INT NOT NULL,
    BowlerId INT NOT NULL,
    UpdatedAt DATETIME2 NOT NULL CONSTRAINT DF_NationalContingentEntries_UpdatedAt DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_NationalContingentEntries_Slot UNIQUE (SeasonCode, GroupKey, EntryType, Position)
);
