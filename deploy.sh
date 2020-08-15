#!/bin/sh
ssh -tt -o StrictHostKeyChecking=no root@142.93.103.198 << EOF
 cd /home/ceduardo/maeve
 git pull
 npm install
 pm2 restart maeve
 exit
EOF