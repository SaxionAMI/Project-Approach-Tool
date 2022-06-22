git pull origin development
cd backend/
npm install
cd ..
cd frontend/
npm install
npx ng build --prod
rm -rf /var/www/projectapproachtool/html
mv dist/PAT/* /var/www/projectapproachtool/html