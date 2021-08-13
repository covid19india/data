# state_district_wise.json

## Description

This API gives the district level details of states that includes the totals for all categories and the deltas for **the current day**.

## Structure

```json
{
  "State Name": {
    "districtData": {
      "DistrictName": {
        "notes": "Any notes to indicate special cases for districts",
        "active": totalActiveCases,
        "confirmed": totalConfirmedCases,
        "deceased": totalDeceasedCases,
        "recovered": totalRecoveredCases,
        "delta": {
          "confirmed": newCasesForToday,
          "deceased": newDeceasedForToday,
          "recovered": newRecoveredForToday
        }
      }
    },
    "statecode": "twoLetterStateCode"
  },
  .
  .
  .
}
```

The values for delta and totals are per district per state combination.

## Usage and caveats

- Active numbers are calculated as Active = Confirmed - Recovered - Deceased - Migrated Others. This applies to both delta and total counts.
- The values for all the districts of a state need to be consumed along with the "Unknown" district if there exists one. These are the cases for which the district details are not available as of now.
- There are possibilities of the numbers for districts going negative. This can happen in multiple scenarios
  - Deltas could go negative if the state buleltins show lesser cumulative count for categories from one day to the next.
  - There is a remote possibility of total active count going negative if the state announced recoveries/deceased for a district but does not provided updated cumulative confirmed count.
- The district names are the ones given in state bulletins. So sometimes the district names might have values like "Other State", "BSF Camp" et al. These are due to the states categorising cases into those broad categories.
- The values of delta reset to 0 for all districts once a new case gets reported anytime after 7am IST the next day.
