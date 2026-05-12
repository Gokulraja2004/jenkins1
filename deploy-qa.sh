#!/bin/bash

HOST=$1
USER=$2
PASS=$3

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$HOST "

docker pull gokulraja0803/react-app:latest &&

docker stop react-qa-container || true &&
docker rm react-qa-container || true &&

docker run -d \
--name react-qa-container \
-p 3000:80 \
gokulraja0803/react-app:latest
"