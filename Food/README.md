# Installing MongoDB (WSL2)

If running through the regular installation instructions from: https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-ubuntu/
don't seem to work, you may be facing an apt-key deprecation warning, or even the following issue on this Reddit post:
https://www.reddit.com/r/bashonubuntuonwindows/comments/137v7zv/help_installing_mongodb_on_wsl2/

The steps that worked for me were as follows:

1. Remove the old `mongodb-org-5.0.list` file from `/etc/apt/sources.list.d/`
2. Import the public key used by the MongoDB package management system: `wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -`
3. Create a list file for MongoDB: `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list`
4. `sudo nano /etc/init.d/mongod`
5. Paste contents of this file: https://raw.githubusercontent.com/mongodb/mongo/master/debian/init.d
6. Give permissions: `sudo chmod +x /etc/init.d/mongod`
7. Start the service: `sudo systemctl start mongod`
8. Check if it is running: `sudo systemctl status mongod`
9. Connect with: `mongosh`
10. Stop the service with: `sudo systemctl stop mongod`

# Unknown rule at @css(unknownAtRules)

This link helped with solving an unknown @tailwind rule error which occurred when adding base tailwind rules to my index.css file: https://github.com/tailwindlabs/tailwindcss/discussions/5258
