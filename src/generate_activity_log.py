#!/usr/bin/env python3

import csv
import logging
import sys
from datetime import datetime
from pathlib import Path
import json
import time

ROOT_DIR = Path("tmp")
CSV_DIR = ROOT_DIR / "csv" / "latest"
STATE_WISE = ROOT_DIR / "csv" / "latest" / "state_wise.csv"
STATE_WISE_PREV = ROOT_DIR / "state_wise_prev"

# Set logging level
logging.basicConfig(stream=sys.stdout, format="%(message)s", level=logging.INFO)

data = dict()

total = dict()


if __name__ == "__main__":
    logging.info("generate_activity_log.py start")
    with open(STATE_WISE_PREV) as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["State"] not in data:
                if row["State"] == "Total":
                    pass
                else:
                    data[row["State"]] = {
                        "prev": {
                            "Confirmed": int(row["Confirmed"]),
                            "Recovered": int(row["Recovered"]),
                            "Deaths": int(row["Deaths"]),
                        },
                        "new": {
                            "Confirmed": 0,
                            "Recovered": 0,
                            "Deaths": 0,
                        },
                        "code": row["State_code"]
                    }
    with open(STATE_WISE) as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["State"] == "Total":
                total["Confirmed"] = row["Confirmed"]
                total["Recovered"] = row["Recovered"]
                total["Deaths"] = row["Deaths"]
                total["DeltaConfirmed"] = row["Delta_Confirmed"]
                total["DeltaRecovered"] = row["Delta_Recovered"]
                total["DeltaDeaths"] = row["Delta_Deaths"]
                continue
            if row["State"] not in data:
                logging.error("New state?")
                logging.error(row["State"])

            data[row["State"]]["new"]["Confirmed"] = int(row["Confirmed"])
            data[row["State"]]["new"]["Recovered"] = int(row["Recovered"])
            data[row["State"]]["new"]["Deaths"] = int(row["Deaths"])

    logging.info("Done------")

    longtext = ""
    updatelogtxt = ""
    # calc diff
    for state in data:
        tmptext = ""
        # logging.info(state)
        deltaConfirmed = (
            data[state]["new"]["Confirmed"] - data[state]["prev"]["Confirmed"]
        )
        deltaRecovered = (
            data[state]["new"]["Recovered"] - data[state]["prev"]["Recovered"]
        )
        deltaDeaths = data[state]["new"]["Deaths"] - data[state]["prev"]["Deaths"]

        if deltaConfirmed or deltaRecovered or deltaDeaths:
            # logging.info(state)
            if deltaConfirmed > 0:
                tmptext += str(deltaConfirmed) + " new confirmed cases\n"
            if deltaRecovered > 0:
                tmptext += str(deltaRecovered) + " new recoveries\n"
            if deltaDeaths > 0:
                tmptext += str(deltaDeaths) + " new deaths\n"
            longtext += "(#"+data[state]["code"]+") *" + state + ":*\n" + tmptext + "\n"
            updatelogtxt += "" + state + ":\n" + tmptext + "\n"
    if updatelogtxt:
        # logging.info(json.dumps(data, indent=3))
        current_time = datetime.now().strftime("%Y %b %d, %I:%M %p IST")
        longtext = "_" + current_time + "_\n\n" + longtext
        longtext += f"""```
 Total Cases: (↑{total["DeltaConfirmed"]}) {total["Confirmed"]}
 Recovered  : (↑{total["DeltaRecovered"]}) {total["Recovered"]}
 Deaths     : (↑{total["DeltaDeaths"]}) {total["Deaths"]}```

www.covid19india.org"""
        logging.info("generate updatelog/log.json")
        logging.info(longtext)
        with open("/tmp/apidata_iumessage", "a") as the_file:
            the_file.write(longtext)

        # logging.info(updatelogtxt)
        with open("./tmp/updatelog/log.json", "r") as f:
            data = json.load(f)
        with open("./tmp/updatelog/log.json", "w") as f:
            data.pop(0)
            timestamp = time.time()
            new_entry = {"update": updatelogtxt, "timestamp": int(timestamp)}
            data.append(new_entry)
            f.write(json.dumps(data, indent=3))

    else:
        logging.info("No delta changes")
    logging.info("generate_activity_log.py end")
