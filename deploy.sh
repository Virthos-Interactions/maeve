#!/bin/sh
ssh -tt -o StrictHostKeyChecking=no ec2-user@52.67.11.156 << EOF
 cd /home/ec2-user/maeve
 git pull
 npm install
 pm2 restart all
 exit
EOF