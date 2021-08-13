# state_test_data.json

## Description

This API gives the daily auxillary data for states wherever it is available.

## Structure

```json
"states_tested_data": [
  {
   "coronaenquirycalls": "",
   "cumulativepeopleinquarantine": "",
   "negative": "1210",
   "numcallsstatehelpline": "",
   "numicubeds": "",
   "numisolationbeds": "50",
   "numventilators": "",
   "peopleinicu": "",
   "peopleonventilators": "",
   "populationncp2019projection": "397000",
   "positive": "12",
   "source1": "https://t.me/indiacovid/2550",
   "source2": "",
   "state": "Andaman and Nicobar Islands",
   "tagpeopleinquarantine": "",
   "tagtotaltested": "Samples Sent",
   ~~"testpositivityrate": "0.86%"~~,
   ~~"testspermillion": "3534"~~,
   ~~"testsperpositivecase": "117"~~,
   ~~"testsperthousand": "3.53"~~,
   "totaln95masks": "",
   "totalpeoplecurrentlyinquarantine": "",
   "totalpeoplereleasedfromquarantine": "",
   "totalppe": "",
   "totaltested": "1403",
   "unconfirmed": "181",
   "updatedon": "17/04/2020"
  },
  .
  .
  .
]
```

- updatedon: This provides the data on which the testing report was announced by the relevant authority.
- tagtotaltested: This provides what is the significance of the totaltested values. Not all the numbers are actual tested numbers. As of now, this can have 4 values: samplessent, tested, reportsreceived and samplescollected.
- totaltested: This gives the number as given in the report for the tagtotaltested category.
- unconfirmed: This is the number as given in the report for those tests that aren't confirmed yet (mostly reports aren't received).
- source1/2: This provides the link for the report.
- state: provides the name of the state for which the report belongs.
- Rest of the fields are self explanatory. The values for these are populated whenever the report contains values for those fields. Else they are kept blank.

## Usage and caveats

- The values in postive, negative columns need to be consumed with caution. Many a times the testing reports are separate from actual daily bulletins given by states. This means the number of positives and negatives declared in the testing bulletin might not match with the state daily bulletin. This is mostly due to timing issue of the two bulletins.
- The populationncp2019projection value is derived from [this report](https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf).
