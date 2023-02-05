# Introduction to Latticelium
Lattice consists of an API server that communicates with a mongodb database. You can manage this via a UI or you can fire up both API and UI with Electron.

# jsonsets
This MongoDB Collection is designed to manage json data with a title and description.

### Build
1. this project depends on node.js ( using v18.7.0 at the time of writing this )
2. `npm run build_all` ( this builds the electron and API node_modules )

### Install MongoDB on Ubuntu Server and add Admin
1. go to https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
2. follow install steps while SSH'ed into your Ubuntu Server
3. When done with setup, enter `mongosh` // to access Mongo Shell
4. Create your Admin user ( change user_name to your choice )
   1. ```db.createUser(
      {
      user: "user_name",
      pwd: passwordPrompt(),
      roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
      }
      )```
   2. When done `Enter` then add your password you save for later.
5. In Mongo Shell, enter `use jsonsets` to generate the Collection you will be using
   1. `exit` to leave Mongo Shell
   2. `sudo vim /etc/mongod.conf` to add your IP as ip_of_mongo_server and add security enabled
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
6. Add the user and pass to your credDB.json file in the next steps 

### Add Mongo credentials to Latticelium
1. copy `credDB.json.SAMPLE` to `credDB.json`
2. add user and pass //note: this is so we don't store the user/pass in the repo
3. set USE_CRED to true //turned off in case you are using local DB to toggle production on/off for testing
4. replace `127.0.0.1:27017` in `credDB.json` with your `ip` or `domain` of your MongoDB Server. Include same port number unless you changed it.

### Run Electron app
1. `npm start` ( if all goes well you should see the Electron app open locally )

This is the easiest as it automatically starts the api as well and makes the database connection.

### Build an Electron .exe
1. `npm run dist_win` ( need to run while in Windows )

### Run only API without Electron locally
1. `cd api`
2. `npm start` ( available on port 8080 )

### Run UI locally
1. Make sure the API is running in above steps
2. Option 1
    - open `index.html` located at `/ui/index.html` in your browser
3. Option 2
    - from the root directory `npm run ui_local`
4. go to `http://127.0.0.1:3031` or `http://localhost:3031`