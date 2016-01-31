#!/bin/bash
export AWS_BUCKET="callout-imgs"
source amazon_keys.txt
source mongodb.txt
source twitter.txt
node server/server.js
