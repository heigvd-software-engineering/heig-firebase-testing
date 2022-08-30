#!/bin/bash

firebase emulators:exec --only firestore "cd test && ./runTests.sh"
