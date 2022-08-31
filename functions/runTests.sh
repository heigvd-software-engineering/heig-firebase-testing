#!/bin/bash

echo "Building project"
npm run build

echo "Running tests"
export LOCAL_FIREBASE_STATE="test"
export LOCAL_FIREBASE_PROJECT="demo-heig-firebase-testing"
export FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
firebase emulators:exec --project="$LOCAL_FIREBASE_PROJECT" "npm test"
