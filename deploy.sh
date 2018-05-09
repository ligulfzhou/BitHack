cd API
rsync -azP --exclude='__pycache__' --exclude='test.log' . aws:/home/ubuntu/source/bithacker

ssh aws << EOF

svc restart bithacker:bithacker-9000
svc restart bithacker:bithacker-9001
svc restart bithacker:bithacker-9002
svc restart bithacker:bithacker-9003

EOF

