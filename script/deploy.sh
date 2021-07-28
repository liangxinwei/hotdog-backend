#!/bin/bash

# --------------------------------------------------------------------
# note:
# this file should be execute by runing `npm run deolpy` in the project root dir,
# or the `scp` command could not work as expected
# --------------------------------------------------------------------

branch=$(git rev-parse --abbrev-ref HEAD)
remoteIP="root@111.229.70.117"
remotePath="/data/hotdog_backend"

echo -e "Start deploying branch \033[33m$branch\033[0m."

# step 0: check for uncommitted changes
git status
if [[ ! (-z $(git status -s)) ]];
then
  echo -e "\033[31m !! Stash or commit your changes first. \033[0m"
  exit 1
fi

# step 1: push current branch to remote
echo 'Pushing branch to remote ...'
git push || exit 1

# step 2: push current branch to remote
if [[ ! (-f ./script/production.js) ]];
then
  echo -e "\033[31m There is no file ./script/production.js. \033[0m"
  exit 1
fi

# step 3: upload assets
npm run build
cp -r src/public dist
  echo -e "\033[32m copy dir src/public to dist successfully. \033[0m"
scp ./package.json "$remoteIP:$remotePath" || exit 1
  echo -e "\033[32m upload file package.json successfully. \033[0m"
scp -r ./dist/ "$remoteIP:$remotePath" || exit 1
  echo -e "\033[32m upload dir dist successfully. \033[0m"
scp ./script/production.js "$remoteIP:$remotePath/dist/config" || exit 1
  echo -e "\033[32m upload file production.js successfully. \033[0m"

# step 4: start serve
# here is local file, also you can execute server file such as `ssh $remoteIP "/data/scripts/hotdog_backend.start.sh"`
ssh $remoteIP -C "/bin/bash" < "script/hotdog_backend.start.sh"
