#!/bin/bash

HOST=$1
USER=$2
PASS=$3

sshpass -p "$PASS" scp -o StrictHostKeyChecking=no react-app.tar $USER@$HOST:/home/ubuntu

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$HOST "

    docker stop react-dev-container || true &&
    docker rm react-dev-container || true &&

    docker rmi react-app || true &&

    docker load < /home/ubuntu/react-app.tar &&

    docker run -d \
    --name react-dev-container \
    -p 3000:80 \
    react-app
"