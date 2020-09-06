#!/bin/sh
ssh -tt -o StrictHostKeyChecking=no ceduardo@142.93.103.198 << EOF
 cd /root/maeve
 git pull
 npm install
 pm2 restart maeve
 exit
EOF