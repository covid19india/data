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

make a copy of the env.example file and add your personal token in the environment variables to be
used across the project and renamed the file to .env
'''
#!/usr/bin/env bash
source log4bash.sh

# Set the environment variables from the .env file using setenv.sh script
source setenv.sh
set -eu

# Set to dev branch by default
active_branch=dev

if [ "${MODE}" == 'prod' ]; then
  echo "Production mode: Be careful with this mode."
  active_branch=${MAIN_BRANCH}
else
  echo "Developer mode: You can play around."
  active_branch=${DEV_BRANCH}
fi

# Setting the repo path and branche
repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

# Download all necessary files from repo branches in to code directory
if [ -d "${CODE_DIR}" ]; then
  echo "${CODE_DIR} directory exists"
  cd ${CODE_DIR}
else
  echo "Creating new directory named ${CODE_DIR}..."
  mkdir -p ${CODE_DIR} && cd $_
fi

# Chekout repo branches in respective folders
if [ -d "${GH_PAGES_BRANCH}" ]; 
then
  cd ${GH_PAGES_BRANCH}
  git checkout ${GH_PAGES_BRANCH}
  cd ..
else
  git clone --depth 1 -b ${GH_PAGES_BRANCH} $repo_uri ${GH_PAGES_BRANCH}
fi


if [ -d "${active_branch}" ]; 
then
  cd $active_branch
  git checkout $active_branch
  cd ..
else
  git clone --depth 1 -b $active_branch $repo_uri $active_branch
fi

if [ -d "${TEMP_DIR}" ]; then
  echo "${TEMP_DIR} directory exists"
else
  echo "Creating new directory named ${TEMP_DIR}..."
  mkdir ${TEMP_DIR}
fi

# Verify the existence of the directory
if [ -d "${GH_PAGES_BRANCH}" ]; then
  echo "${GH_PAGES_BRANCH} directory exists"
  # Copying files to respective folders
  cp -r ${GH_PAGES_BRANCH}/updatelog ${TEMP_DIR}
  cp -r ${GH_PAGES_BRANCH}/csv ${TEMP_DIR}
  cp ${GH_PAGES_BRANCH}/v4/min/data.min.json ${TEMP_DIR}/data-old.min.json
  cp ${GH_PAGES_BRANCH}/csv/latest/state_wise.csv ${TEMP_DIR}/state_wise_prev
else
  echo "${GH_PAGES_BRANCH} not found. Exiting..."
fi

# Verify the existence of the directory
if [ -d "$active_branch" ]; then
  echo "$active_branch directory exists"
  # Copying files to respective folders
  cp ./$active_branch/README.md ${TEMP_DIR}/
  cp -r ./$active_branch/documentation/ ${TEMP_DIR}/
else
  echo "$active_branch not found. Exiting..."
fi

# Convert the google sheet data to csv using Node.js script
node ./$active_branch/src/sheets-to-csv.js

# Invoke the Python Parser 4 script to generate the json data for api calls
python3 ./$active_branch/src/parser_v4.py
python3 ./$active_branch/src/generate_activity_log.py
# node src/sanity_check.js # need rewrite with new json

# Remove the old files from tmp directory
rm ${TEMP_DIR}/data-old.min.json
rm ${TEMP_DIR}/state_wise_prev

# # Copy everything from tmp directory to root folder and remove tmp directory
cp -r ${TEMP_DIR}/* ${GH_PAGES_BRANCH}
rm -r ${TEMP_DIR}

cd ${GH_PAGES_BRANCH}

if [ "${MODE}" == 'prod' ]; then
  # Housekeeping  
  git config user.name "$GITHUB_ACTOR"
  git config user.email "${GITHUB_ACTOR}@bots.github.com"
  # Add all the files to the repo and commit
  git add .
  set +e  # Grep succeeds with nonzero exit codes to show results.
else
  git config --global user.name "${GITHUB_NAME}"
  git config --global user.email "${GITHUB_ACTOR}"
  echo "Dev mode: So not committing..."
fi

# Commit the changes if there are new modifications or files.
if git status | grep 'new file\|modified'
then
  echo "Prod mode: Committing all changes"
  git commit -am "data updated on - $(date)"
  git remote set-url "${ORIGIN_BRANCH}" "$repo_uri" # includes access token
  git push --force-with-lease "${ORIGIN_BRANCH}" "${GH_PAGES_BRANCH}"
  rm -rf ../../${CODE_DIR}/
fi



echo "Script successfully completed"
