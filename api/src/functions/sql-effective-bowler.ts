export const requestedEffectiveBowlerIdSql = (paramName: string): string => `
coalesce(
  (
    select top 1 CanonicalBowlerId
    from MasterList
    where ID = ${paramName}
      and CanonicalBowlerId is not null
  ),
  ${paramName}
)`;
