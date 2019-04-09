# CSC473 Project
## Strategy Game Arena

* Team members: Nabhan Maswood, Hongjie Huang, Adam McKoy, Michael Richards, Runmin Lin

* Scrum master name： Runmin Lin

* Product owner name：Hongjie Huang

## Backend Setup
### Amplilfy and Appsync
In the terminal (have aws setup and logged on in your browser)
```
npm install -g @aws-amplify/cli
amplify configure
```
In the terminal navigate into the React Project directory and run
```
amplify init
```

### Firebase
* Sign into [Firebase](https://firebase.google.com/) using your Google account.
* Once signed in click on "Go to Console" and then create a new project. 
* Open your project and then under "Develop" create a realtime database. 
* Under database rules you have to set read and write to both "true" when you want the game to communicate with the database
* Next you have to create the following file name it "firebase-config.js" and add it to the folder src in the React Project. The information is retireved by adding an app on firebase console which you can do under "Project Overview" 
```
const fbConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };


export default fbConfig;
```

* With this file in the src directory the game should be able to connect and communciate with the database. 

