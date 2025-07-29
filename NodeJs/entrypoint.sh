#!/bin/sh

# Đợi MySQL sẵn sàng
npx wait-on tcp:mysql:3306

# Chỉ chạy migrate & init nếu là lần đầu
if [ ! -f ".migrated" ]; then
  echo "Migrating database..."
  cd src
  npx sequelize-cli db:migrate
  echo "Initializing admin..."
  node initAdmin.js
  cd ..
  touch .migrated
fi

# Khởi động app
npm start
