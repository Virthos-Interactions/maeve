#!/bin/sh
ssh -tt -o StrictHostKeyChecking=no ec2-user@54.233.127.10 << EOF
 cd /home/ec2-user/maeve
 git pull
 npm install
 pm2 restart all
 exit
EOF