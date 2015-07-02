[![Codacy Badge](https://www.codacy.com/project/badge/ccb6841212d9454ca08df11c127527f0)](https://www.codacy.com/app/gorgekara/Task1)

# Requirements
To run the application there are some requirements which should be met:
- MongoDB running on port 27017 (can be changed in /config/connections.js)
- Node.js and NPM for installing required packages

# Installation
Installation of the application can be done by running ```npm install``` (or ```sudo npm install```). MongoDB should be installed as well - [here is how](http://docs.mongodb.org/manual/installation/). To start the application after installation just run ```sails lift``` in the terminal. If you want to debug then it's best to use [node-inspector](https://github.com/node-inspector/node-inspector) and start the application by running ```node-debug app.js```.

# Configuration
Almost all configuration options for this application can be located in the /config folder. Here you can configure the CSRF token, DB connections (for development/production), HTTP server options, logs, routes, policies (middleware), localization, session etc. Grunt tasks which compile LESS, append JS and CSS files to the layout from the assets folder are located in the /tasks folder. By default running ```sails lift``` will start the application in debug mode and will not merge all JS/CSS files. To start the app in production mode run ```sails lift --prod``` in the terminal.

# Deployment
In production environment instead of using ```sails lift``` you should use [forever](https://github.com/nodejitsu/forever) or [PM2](https://github.com/Unitech/pm2). You can install them by running:
- ```sudo npm install -g forever```
- ```sudo npm install pm2 -g --unsafe-perm```

After they are installed start the server with (depending on which you are using):
- ```forever start app.js --prod```
- ```pm2 start app.js -x -- --prod```

# Used libraries
### Front-end
- jQuery 2.1.4
- Bootstrap 3.3.4
- DataTables.js 1.10.7
- LESS CSS pre-processor
- Glyphicons

### Back-end
- Grunt
- EJS (Embedded JavaScript Templates)
- Moment for formatting dates
- sails-mongo adapter for connecting the application ORM to MongoDB

# ER Diagram
![image](http://s10.postimg.org/infhfpvnd/Untitled_drawing.png)

# About the framework
You can check out Sails.js here: [http://sailsjs.org/](http://sailsjs.org/)