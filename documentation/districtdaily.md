# districts_daily.json

## Description

This API provides a cumulative count of each district for the categories of C/R/D for each date.

## Structure

```json
{
  "districtsDaily": {
    "StateName": {
      "DistrictName": [
        {
          "active": totalActiveCount,
          "confirmed": totalConfirmedCount,
          "deceased": totalDeceasedCount,
          "recovered": totalRecoveredCount,
          "date": "yyyy-mm-dd"
        },
        .
        .
        .
      ],
    },
    .
    .
    .
  }
}
```

- This API provides an array objects for each district under each state, where each object corresponds to a specific date.
- DistrictName: This is the name of the district.
- active/confirmed/deceased/recovered : These are the cumulative values for that district upto that date.
- The logic of active is: Active = Confirmed - Recovered - Deceased - Migrated Others

## Usage and Caveats

- The objects do not provide Migrated Others values.
