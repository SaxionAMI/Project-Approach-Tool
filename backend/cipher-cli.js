/**
 * A custom CLI script to use the ciphering mechanism that is used by the back-end app.
 * This tool can be used to (for example) change the default "admin" account by changing the email address.
 * 
 * How to use: 
 * pre.     configure the CRYPTOSECRET environment variable in the app's .env file.
 * 1.       open a terminal window in VS Code.
 * 2.       execute the command "npm run cipher-cli".
 * 3.       follow the instructions in the script.
 */

dotenv = require("dotenv");
dotenv.config();

const readline = require("readline");
const cipherModule = require("./cipherModule.js");
const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function cipher() {
    cli.question("Please enter the text to cipher.\r\n", function(input) {
        const ciphered = cipherModule.cipherText(input);
        cli.write("The ciphered text is: \r\n" + ciphered);
        process.exit(0);
    });
}

function decipher() {
    cli.question("Please enter the text to decipher.\r\n", function(input) {
        const deciphered = cipherModule.decipherText(input);
        cli.write("The deciphered text is: \r\n" + deciphered);
        process.exit(0);
    });
}

cli.question("Cipher (C) or decipher (D)?\r\n", function(answer) {
    if (answer.toLowerCase() == 'cipher' || answer.toLowerCase() == 'c') {
        cipher();
    }
    else if (answer.toLowerCase() == 'decipher' || answer.toLowerCase() == 'd') {
        decipher();
    }
});

cli.on("close", function() {
    console.log("\nHave a nice day.");
    process.exit(0);
});
