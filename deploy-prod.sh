

sshpass -p "$PASS" scp -o StrictHostKeyChecking=no -r dist/* $USER@$HOST:/home/ubuntu/prod-app

sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $USER@$HOST "
    sudo rm -rf /var/www/html/* &&
    sudo cp -r /home/ubuntu/prod-app/* /var/www/html/ &&
    sudo systemctl restart nginx
"