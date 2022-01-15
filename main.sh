'''
Main script is responsible for generating all the api related data from various source files
such as google sheets and other sources. It eventually creates two set of data files including
minified version of the data

Bash script utilises both node.js scripts and python scripts for certain functionalities

Prerequisites:
main.sh requires executable permissions so ensure you have set the executable permission 755
using the below command
sudo chmod 755 main.sh

In order to commit the data back to the github repo, you will need a personal access token
that can be generated from github.com/settings/tokens

make a copy of the env files and add your personal token in the environment variables to be
used across the project
'''

#!/bin/bash

# Set the environment variables from the .env file using setenv.sh script
source setenv.sh
set -eu

# Setting the repo path and branche
repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

git config user.name "$GITHUB_ACTOR"
git config user.email "${GITHUB_ACTOR}@bots.github.com"

# Download all necessary files from repo branches in to code directory
if [ -d "${CODE_DIR}" ]; then
  echo "${CODE_DIR} directory exists"
else
  echo "Creating new directory named ${CODE_DIR}..."
  mkdir -p ${CODE_DIR} && cd $_
fi

git clone -b ${GH_PAGES_BRANCH} $repo_uri

# # Checkout gh pages branch
# git checkout "${GH_PAGES_BRANCH}"

if [ -d "${TEMP_DIR}" ]; then
  echo "tmp directory exists"
else
  echo "Creating new directory named ${TEMP_DIR}..."
  mkdir ${TEMP_DIR}
fi

# Copying files to respective folders
cp -r ./updatelog ./tmp
cp -r ./csv ./tmp
cp v4/min/data.min.json ./tmp/data-old.min.json
cp ./csv/latest/state_wise.csv ./tmp/state_wise_prev

# Checkout Main branch
git checkout "${MAIN_BRANCH}"

# Copying the documentation files to temporary folder
cp README.md tmp/
cp -r documentation/ tmp/

# Convert the google sheet data to csv using Node.js script
node src/sheets-to-csv.js

# Invoke the Python Parser 4 script to generate the json data for api calls
python3 src/parser_v4.py
python3 src/generate_activity_log.py
# node src/sanity_check.js # need rewrite with new json

# Switch to GH Pages Branch again
git checkout "${GH_PAGES_BRANCH}"

# Remove the old files from tmp directory
rm tmp/data-old.min.json
rm tmp/state_wise_prev

# Copy everything from tmp directory to root folder and remove tmp directory
cp -r tmp/* .
rm -r tmp/

# Add all the files to the repo and commit
git add .
set +e  # Grep succeeds with nonzero exit codes to show results.

# Commit the changes if there are new modifications or files.
if git status | grep 'new file\|modified'
then
    set -e
    git commit -am "data updated on - $(date)"
    git remote set-url "${ORIGIN_BRANCH}" "$repo_uri" # includes access token
    git push --force-with-lease "${ORIGIN_BRANCH}" "${GH_PAGES_BRANCH}"
else
    set -e
    echo "No changes since last run"
fi

echo "main.sh end"
