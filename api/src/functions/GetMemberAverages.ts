import { app, input, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const sqlInput = input.generic({
  type: 'sql',
  commandText: `
    with seasons as (
      select top 5 SeasonCode
      from SeasonTable
      order by SeasonCode desc
    ),
    currentSeason as (
      select max(SeasonCode) as SeasonCode from seasons
    ),
    ranked as (
      select
        b.Id as BowlerId,
        b.Name,
        tt.SeasonCode,
        tt.Division,
        tt.TournamentNumber,
        tt.TournamentLocation,
        cast(tt.TournamentDetails as date) as TournamentDate,
        case
          when tr.Game7 is null then tr.Game1 + tr.Game2 + tr.Game3 + tr.Game4 + tr.Game5 + tr.Game6
          else tr.Game1 + tr.Game2 + tr.Game3 + tr.Game4 + tr.Game5 + tr.Game6 + tr.Game7 + tr.Game8
        end as total,
        case
          when tr.Game7 is null then 6
          else 8
        end as games,
        row_number() over (partition by b.Id order by cast(tt.TournamentDetails as date) desc) as rownum
      from seasons s
      join TournamentTable tt on s.SeasonCode = tt.SeasonCode
      join TournamentResults tr on tr.TournamentId = tt.Id
      join MasterList b on tr.BowlerId = b.Id
      where tr.IgnoreForAverage = 0
        and (@bowlerId is null or b.Id = @bowlerId)
    ),
    summary as (
      select
        BowlerId,
        Name,
        sum(total) as pinfall,
        sum(games) as games,
        round(cast(sum(total) as decimal(10, 1)) / nullif(sum(games), 0), 1) as average,
        count(rownum) as events
      from ranked
      where rownum <= 10
      group by BowlerId, Name
    )
    select
      s.*,
      isnull(msl.TeachingFlag, 0) as TeachingFlag,
      isnull(msl.SeniorFlag, 0) as SeniorFlag,
      isnull(msl.TournamentFlag, 0) as TournamentFlag
    from summary s
    cross join currentSeason cs
    left join MasterSeasonList msl
      on s.BowlerId = msl.BowlerId
      and msl.SeasonYear = cs.SeasonCode
    order by s.Name asc
  `,
  parameters: '@bowlerId={bowlerId}',
  commandType: 'Text',
  connectionStringSetting: 'SqlConnectionString'
});

export async function GetMemberAverages(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const rows = JSON.stringify(context.extraInputs.get(sqlInput));

  return {
    status: 200,
    body: rows
  };
};

app.http('GetMemberAverages', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'memberaverages/{bowlerId:int?}',
  extraInputs: [sqlInput],
  handler: GetMemberAverages,
});
