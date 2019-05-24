# CSC473 Project
# Strategy Arena Game

* Team members: Nabhan Maswood, Hongjie Huang, Adam McKoy, Michael Richards, Runmin Lin

* Scrum master： Runmin Lin

* Product owner：Hongjie Huang

# Game Information
SAG is a HTML5 web-based game using Phaser3.  In the multiplayer mode, the player will enter a game lobby waiting for other players to join, and the room owner can start the game regardless of whether there are 4 players or not. After a countdown of 5, the game will start, and each player will try to destroy all enemy towers while protecting their own tower in order to win. Players can drag different units to the map to help them, and fight for the center sword for strong ability. The player character can respawn when their health points are below 0, but they will lose the game if their towers are destroyed. Try to be the last player standing and defeat all enemies! See tutorial page of the game for more details. Our goal of the project is to create an easy-accessed web-based game using what we learned, and can be enjoyed by a small group of peoples.

# Documentation
1. JSDocs<br /> https://ryanlinrm.github.io/CSC473Project/
1. Project Structure<br /> https://github.com/RyanLinrm/CSC473Project/wiki/Project-Structure
1. AWS in Project<br /> https://github.com/RyanLinrm/CSC473Project/wiki/Amazon-Web-Services-Part-of-This-Project
1. Firebase in Project: 
    * Why Firebase?<br /> https://github.com/RyanLinrm/CSC473Project/wiki/Why-firebase%3F
    * Firebase and Multiplayer<br /> https://github.com/RyanLinrm/CSC473Project/wiki/Firebase-DB-and-Multiplayer

# Deployed Site
* https://dev.d39k5usv8gv0fp.amplifyapp.com/
* Game can be played as an guest user without sign in, but having an account will be recommended since sign-in user can access the leaderboard and have the status and data stored. 
* To register an account, the passowrd rules are minimum length of 8, capital letter and special symbol are required, the verification will go through email that one uses to sign up.

# How to run the game:
1. Clone or download our repo <br />```git clone https://github.com/RyanLinrm/CSC473Project```
1. Install all the dependencies <br />```npm install```
1. Setup backend following the instruction<br /> https://github.com/RyanLinrm/CSC473Project/wiki/Backend-Development-Setup-(Amplify,-Appsync-and-Firebase)
1. run the app<br /> ```npm start```

# How to run the test:<br />
```npm test```

# Copyright Disclaimer
* We do NOT own the sprite sheets/assets,sound/music files nor the images we used throughout the development of the project. 
* This project and the website that we deployed are only for study purposes for CSC473 class in The City College of New York.
* All rights belong to it's rightful owner/owners. 
* No copyright infringement intended. Any files that violated the rights of the owner/owners wll be removed if needed.
