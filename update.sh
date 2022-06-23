git pull origin development
cd backend/
npm install
cd ..
cd frontend/
npm install
npx ng build --prod
sudo rm -rf /var/www/projectapproachtool/html/*
sudo mv dist/PAT/* /var/www/projectapproachtool/html

