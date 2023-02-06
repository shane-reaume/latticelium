# Introduction to Latticelium

Latticelium is designed for managing json files with a Web or Electron user interface.

### API
Latticelium-API consists of a RESTful API that performs CRUD updates to a mongodb database on the backend using express + mongoose. 

After starting the API server, all CRUD actions can be performed against your MongoDB database. 

### UI
We have included a static UI to send HTTP requests to your RESTful API using Axios XMLHttpRequests via the browser.
![UI Screenshot](https://github.com/shane-reaume/latticelium/blob/master/ui/images/ui_screenshot.jpg?raw=true)

### Desktop App
This project also includes an Electron build to combine the API and UI in one simple desktop application, with Windows, MacOS and linux builds.

### jsonsets Collection
This MongoDB Collection is designed to manage json data with a title and description as the first of many collections I plan to build out in this project. 

---

# Prerequisites

### Nodejs

This project depends on node.js ( using v18.14.0 LTS at the time of writing this ) and has all the included libraries in the two package.json files for client and server along with the build/run scripts.

### MongoDB

You can have a local instance of MongoDB running, setup remotely or both.

#### Install MongoDB and add Admin

After testing with a basic MongoDB in localhost, you can also create a remote instance by adding the extra security and admin.

1. go to https://www.mongodb.com and find install steps for your OS
2. follow install steps
3. access Mongo Shell and create Admin user, follow security steps for your version of MongoDB and environment
4. Create your Admin user ( change user_name to your choice )
   1. example creating the user...
   2. ```
      db.createUser(
         {
            user: "user_name",
            pwd: passwordPrompt(),
            roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
         }
      )
      ```
   3. In Mongo Shell, enter `use jsonsets` to generate the empty Collection you will be using
   4. `exit` to leave Mongo Shell
5. Here is an example of how I established access on my Ubuntu Server, but you will likely have do some research as MongoDB has many ways to wire up your database properly depending on the environment and versions used.
   1. `sudo vim /etc/mongod.conf` to add your IP as ip_of_mongo_server and add security enabled
         1. ```
            net:
               port: 27017
               bindIp: 127.0.0.1,ip_of_mongo_server
            ```
         2. ```
            security:
               authorization: enabled
            ```
         3. `sudo systemctl restart mongod`

NOTE: I have found you can also create out-of-the-box MongoDB servers without any experience using DigitalOcean, Azure or AWS at a little higher cost if having trouble configuring your connections and security.

#### Add Mongo credentials to Latticelium
1. copy `credDB.json.SAMPLE` to `credDB.json`
2. add user and pass 
   1. *note: this is so we don't store the user/pass in the repo*
3. set USE_CRED to true 
   1. note: turned off in case you are using local DB to toggle production on/off for testing. This does not use a user/pass for local, so you would need to refactor path in the `api/app/config/db.config` if anything different setup locally. 
4. replace `127.0.0.1:27017` in `credDB.json` with your `ip` or `domain` of your MongoDB Server. Include port number unless changed or not needed.

---

# Build All

`npm run build_all` - this builds all the UI (+ electron) and API node_modules.

This installs all your npm dependencies.

---

# Start Server & open static UI

`npm start`

This starts your RESTful API server and opens the local static UI in your default browser.

# Electron

#### Run Electron app

`npm run start_electron` - if all goes well you should see the Electron app open locally, running off the index.js file as your client side application.

This script automatically starts the RESTful API server as well and makes the database connection.

#### Build an Electron Desktop app with executable file
1. `npm run dist_win` Windows .exe
2. `npm run dist_mac` MacOS
3. `npm run dist_linux` Linux

These scripts will generate an executable that you can run anytime or even share. Do some deeper investigations if looking to establish security as this is more of a proof of concept.

### Build and Start API only
1. `cd api`
2. `npm run build_api`
3. `npm start` ( available on port 8080 )

### Run UI locally
1. Make sure the API is running to establish connection
2. Manual Option
    - manually open `index.html` located at `/ui/index.html` in your browser
3. Auto Option
    - from the root directory `npm run open`