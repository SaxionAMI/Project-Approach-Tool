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

## Fixed admin account
The systeme ensures that there is always at least one admin account. Note that the current solution was made out of pure necessity and could use some refactoring.
To change the admin account, you first need access to an email address that you can grant "admin" privileges. You also need access to the back-end .env file.
It is recommended to do this prior to deploying, from within your IDE. To change the admin account, follow the steps below:

  1. make sure that the CRYPTOSECRET has been set up in the .env file. If you don't have an env file, create one based on the .env.template file in the back-end root.
  2. get the email address of the soon-to-be admin user, e.g. "j.doe@turbomail.com"
  3. run the cipher-cli script from within a terminal window.
  4. choose "cipher"
  5. enter the email address from step 2.
  6. copy the ciphered output.
  7. paste the ciphered output in the .env file, at TEACHER_EMAIL (e.g. TEACHER_EMAIL=1234......789)


