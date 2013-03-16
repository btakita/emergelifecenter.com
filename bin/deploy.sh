#!/bin/bash

DEFAULT_BRANCH=master

BRANCH=${1:-$DEFAULT_BRANCH}
git push production $BRANCH
