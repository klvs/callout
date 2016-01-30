#!/bin/bash
export AWS_BUCKET="callout-imgs"
source amazon_keys.txt
node server/server.js
