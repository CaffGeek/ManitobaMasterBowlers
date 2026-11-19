import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
    type: 'sql',
    commandText: `select 
            t.Id,
            t.TournamentId,
            t.BowlerId,
            b.Name as Bowler,
            b.Gender as Gender,
            coalesce(b.CanonicalBowlerId, b.ID) as EffectiveBowlerId,
            canonical.Name as EffectiveBowler,
            canonical.Gender as EffectiveGender,
            cast(case when exists (
                select 1
                from MasterSeasonList as seasonList
                join MasterList as seasonBowler
                    on seasonBowler.ID = seasonList.BowlerId
                where seasonList.SeasonYear = tournament.SeasonCode
                    and coalesce(seasonBowler.CanonicalBowlerId, seasonBowler.ID)
                        = coalesce(b.CanonicalBowlerId, b.ID)
                    and (
                        (lower(ltrim(rtrim(tournament.Division))) = 'tournament'
                            and isnull(seasonList.TournamentFlag, 0) = 1)
                        or (lower(ltrim(rtrim(tournament.Division))) = 'teaching'
                            and isnull(seasonList.TeachingFlag, 0) = 1)
                        or (lower(ltrim(rtrim(tournament.Division))) in ('senior', 'seniors')
                            and isnull(seasonList.SeniorFlag, 0) = 1)
                    )
            ) then 1 else 0 end as bit) as IsEligibleForDivision,
            t.Game1,
            t.Game2,
            t.Game3,
            t.Game4,
            t.Game5,
            t.Game6,
            t.Game7,
            t.Game8,
            t.BowlerAverage as Average,
            ISNULL(t.IgnoreForAverage, 0) as IgnoreForAverage,
            ISNULL(t.WonStars, 0) as WonStars
        from TournamentResults t
        join MasterList as b
            on t.BowlerId = b.ID
        join MasterList as canonical
            on canonical.ID = coalesce(b.CanonicalBowlerId, b.ID)
        join TournamentTable as tournament
            on tournament.ID = t.TournamentId
        where t.TournamentId = @id or t.TournamentId = ISNULL(@id, t.TournamentId)`,
    parameters: '@id={id}',
    commandType: 'Text',
    connectionStringSetting: 'SqlConnectionString'
})

export async function GetTournamentResults(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const tournamentresults = JSON.stringify(context.extraInputs.get(sqlInput));

    return {
        status: 200,
        body: tournamentresults
    };
};

app.http('GetTournamentResults', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'tournamentresults/{id:int?}',
    extraInputs: [sqlInput],
    handler: GetTournamentResults,
});
