#!/bin/bash

echo "Test rules"
firebase emulators:exec --only firestore "cd test && ./runTests.sh"
