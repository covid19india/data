# states_daily.json

## Description

This API gives the daily statistics for all states across confirmed, recovered and deceased categories.

## Structure

```json
{
 "states_daily": [
  {
   "an": "0",
   "ap": "1",
   "ar": "0",
   "as": "0",
   "br": "0",
   "ch": "0",
   "ct": "0",
   "date": "14-Mar-20",
   "dd": "0",
   "dl": "7",
   "dn": "0",
   "ga": "0",
   "gj": "0",
   "hp": "0",
   "hr": "14",
   "jh": "0",
   "jk": "2",
   "ka": "6",
   "kl": "19",
   "la": "0",
   "ld": "0",
   "mh": "14",
   "ml": "0",
   "mn": "0",
   "mp": "0",
   "mz": "0",
   "nl": "0",
   "or": "0",
   "pb": "1",
   "py": "0",
   "rj": "3",
   "sk": "0",
   "status": "Confirmed",
   "tg": "1",
   "tn": "1",
   "tr": "0",
   "tt": "81",
   "un": "0",
   "up": "12",
   "ut": "0",
   "wb": "0"
  },
  .
  .
  .
 ]
}
```

- The API gives an array of objects where each object contains the following:
  - stateCode : Gives the two letter state code for a state.
  - status : Represents the category - Hospitalized, Confirmed, Recovered
  - date: The date for which the object belongs.

- The values given in the value part for each state code gives the delta for that status for that state for that date.

## Usage and caveats

- The cateogry "tt" represents the total count for that date/status combination.
- The API does not consider Migrated category.
