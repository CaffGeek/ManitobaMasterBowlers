IF COL_LENGTH('dbo.MasterList', 'CanonicalBowlerId') IS NULL
BEGIN
    ALTER TABLE dbo.MasterList
    ADD CanonicalBowlerId INT NULL;
END;

IF NOT EXISTS (
    SELECT 1
    FROM sys.check_constraints
    WHERE name = 'CK_MasterList_CanonicalBowlerId_NotSelf'
)
BEGIN
    ALTER TABLE dbo.MasterList
    ADD CONSTRAINT CK_MasterList_CanonicalBowlerId_NotSelf
    CHECK (CanonicalBowlerId IS NULL OR CanonicalBowlerId <> ID);
END;

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_MasterList_CanonicalBowlerId'
      AND object_id = OBJECT_ID('dbo.MasterList')
)
BEGIN
    CREATE INDEX IX_MasterList_CanonicalBowlerId
        ON dbo.MasterList (CanonicalBowlerId);
END;
