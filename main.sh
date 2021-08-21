#!/bin/bash
echo "main.sh start"
set -eu

repo_uri="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
remote_name="origin"
main_branch="main"
gh_pages_branch="gh-pages"


git config user.name "$GITHUB_ACTOR"
git config user.email "${GITHUB_ACTOR}@bots.github.com"


git checkout "$gh_pages_branch"

mkdir tmp

cp -r ./updatelog ./tmp
cp -r ./csv ./tmp
cp v4/min/data.min.json ./tmp/data-old.min.json
cp ./csv/latest/state_wise.csv ./tmp/state_wise_prev


git checkout "$main_branch"


cp README.md tmp/
cp -r documentation/ tmp/

node src/sheets-to-csv.js

python3 src/parser_v4.py
python3 src/generate_activity_log.py
# node src/sanity_check.js # need rewrite with new json


git checkout "$gh_pages_branch"

rm tmp/data-old.min.json
rm tmp/state_wise_prev

cp -r tmp/* .
rm -r tmp/


git add .
set +e  # Grep succeeds with nonzero exit codes to show results.

if git status | grep 'new file\|modified'
then
    set -e
    git commit -am "data updated on - $(date)"
    git remote set-url "$remote_name" "$repo_uri" # includes access token
    git push --force-with-lease "$remote_name" "$gh_pages_branch"
else
    set -e
    echo "No changes since last run"
fi

echo "main.sh end"