IF COL_LENGTH('dbo.NationalContingentEntries', 'Finish') IS NULL
BEGIN
    ALTER TABLE dbo.NationalContingentEntries
    ADD Finish INT NULL;
END;
ELSE IF EXISTS (
    SELECT 1
    FROM sys.columns c
    JOIN sys.objects o ON o.object_id = c.object_id
    WHERE o.name = 'NationalContingentEntries'
      AND SCHEMA_NAME(o.schema_id) = 'dbo'
      AND c.name = 'Finish'
      AND TYPE_NAME(c.user_type_id) <> 'int'
)
BEGIN
    ALTER TABLE dbo.NationalContingentEntries
    ALTER COLUMN Finish INT NULL;
END;
