IF OBJECT_ID('dbo.Sponsors', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Sponsors (
        Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        Name NVARCHAR(150) NOT NULL,
        WebsiteUrl NVARCHAR(500) NULL,
        DefaultLogoUrl NVARCHAR(1000) NULL,
        Notes NVARCHAR(MAX) NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_Sponsors_IsActive DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Sponsors_CreatedAt DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NOT NULL CONSTRAINT DF_Sponsors_UpdatedAt DEFAULT SYSUTCDATETIME()
    );
END;

IF OBJECT_ID('dbo.SponsorAds', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SponsorAds (
        Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        SponsorId INT NOT NULL,
        Name NVARCHAR(150) NOT NULL,
        ContentHtml NVARCHAR(MAX) NOT NULL,
        StartDate DATETIME2 NULL,
        EndDate DATETIME2 NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_SponsorAds_IsActive DEFAULT 1,
        Priority INT NOT NULL CONSTRAINT DF_SponsorAds_Priority DEFAULT 0,
        RotationSeconds INT NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_SponsorAds_CreatedAt DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NOT NULL CONSTRAINT DF_SponsorAds_UpdatedAt DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_SponsorAds_Sponsors FOREIGN KEY (SponsorId)
            REFERENCES dbo.Sponsors(Id) ON DELETE CASCADE,
        CONSTRAINT CK_SponsorAds_DateRange CHECK (StartDate IS NULL OR EndDate IS NULL OR EndDate >= StartDate),
        CONSTRAINT CK_SponsorAds_RotationSeconds CHECK (RotationSeconds IS NULL OR RotationSeconds BETWEEN 3 AND 300)
    );
END;

IF OBJECT_ID('dbo.SponsorAdPlacements', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.SponsorAdPlacements (
        Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        SponsorAdId INT NOT NULL,
        Location VARCHAR(10) NOT NULL,
        PageMatchType VARCHAR(10) NOT NULL,
        PageValue NVARCHAR(300) NULL,
        SortOrder INT NOT NULL CONSTRAINT DF_SponsorAdPlacements_SortOrder DEFAULT 0,
        CONSTRAINT FK_SponsorAdPlacements_SponsorAds FOREIGN KEY (SponsorAdId)
            REFERENCES dbo.SponsorAds(Id) ON DELETE CASCADE,
        CONSTRAINT CK_SponsorAdPlacements_Location CHECK (Location IN ('Top', 'Bottom', 'Left', 'Right', 'Overlay')),
        CONSTRAINT CK_SponsorAdPlacements_PageMatchType CHECK (PageMatchType IN ('All', 'Exact', 'Prefix', 'Sitemap')),
        CONSTRAINT CK_SponsorAdPlacements_PageValue CHECK (
            PageMatchType = 'All'
            OR (PageValue IS NOT NULL AND NULLIF(LTRIM(RTRIM(PageValue)), '') IS NOT NULL)
        )
    );

    CREATE INDEX IX_SponsorAdPlacements_SponsorAdId
        ON dbo.SponsorAdPlacements(SponsorAdId);
END;

IF NOT EXISTS (
    SELECT 1 FROM sys.indexes
    WHERE name = 'IX_SponsorAds_ActiveDates'
      AND object_id = OBJECT_ID('dbo.SponsorAds')
)
BEGIN
    CREATE INDEX IX_SponsorAds_ActiveDates
        ON dbo.SponsorAds(IsActive, StartDate, EndDate, Priority);
END;
