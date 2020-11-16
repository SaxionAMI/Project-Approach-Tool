# ProjectApproachToolBackend

API for the Project Approach tool.

Before running the API run, npm install.

## .env file:

|  .env variable |                                                                 Description                                                                 |
|:-------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------:|
|         PORT        |                                                      this is the port number for the server                                                      |
|        DBURL        |                                                             this is the database url                                                             |
|     CRYPTOSECRET    |                              this is the secret for the encrypting of personal data. <br /> HAS TO BE 32 CHARACTERS LONG!                              |
|     MAILSERVICE     | this is the service used for for the invite mails.    <br/> <a href="https://nodemailer.com/smtp/well-known/">Click here for all available services<a> |
|     MAILACCOUNT     |                                         the mail account used by the service to log into the mail account                                        |
|       MAILPASS      |                                           the password used by the service to log into the mail account                                          |
|       JWTTOKEN      |                                                    A JWT token used for the inviting of users                                                    |
|       INVITEURL     |                                                         this is the url to the invite api                                                        |
|      REDIRECTURL    |                                               this is the url to redirect to when the invite is accepted                                         |

## For development:
Run the project npm run start (This will restart the server if files are changed)

## For deployment:
Use forever start server.js (This will keep the API running even if the current session is closed).


