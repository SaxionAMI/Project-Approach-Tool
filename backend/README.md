# ProjectApproachToolBackend

API for the Project Approach tool.

Before running the API run, npm install.

.env file contains the port and database connections

## For development:
Run the project npm run start (This will restart the server if files are changed)

## For deployment:
Use forever start server.js (This will keep the API running even if the current session is closed).

## Example .env file:

  PORT=8080
  DBURL='mongodb://localhost:27017/pat'
  
