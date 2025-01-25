# Wordle in Arabic

## Brief Description 
Winter 2025 - Second Semester

In this project, we created a mobile application for the famous game 'Wordle' but in the arabic language. The goal of this game is that the user will have a N length of cells that will hold each letter in an anonymous word. The user has 6 tries to try and guess the word with hints provided by the color-changing cells.
This game is considered as an intermiediate puzzle, for all ages!


## Setup of The Project
This project was made possible using the programming language React Native for mobile developement and Andriod Studio for the virtual iOS and Andriod emmulator devices.

## Screen Structure

### About The Structure
The application has two main portols that contribute to the project. The first portol is a general platform that allows users to access the Game Screen easily without needing to login. The general platform has limitations for users such as the following:

* Limited Words in local database that are considered "easy to guess".
* No game points collection; no ranks to accomplish.
* Points are not saved.
* Limited hints available.

  On the other hand, there is a second platform that requires user authentication to be able to access. This has the advantages of what was limited before with the addition of:

  * Tab navigation that leads to two screens:
      * Leaderboard: which shows the highest point of all players 'globally'.
      * Account: the user's account, which shows the accomplished Rank Badges that he won from the points he gained while playing.
   
## Screens

#### App.js
This is the main container for all screens, the main goal of this file is to incorporate navigation for the General platforms' files: WelcomeScreen.js, GameScreen.js, RegisterScreen.js, LoginScreen.js, and between some of these file there is a Loading Animation that is in LoadingScreen.js.

#### WelcomeScreen.js

This is the first screen all users will see, it has the title "وردل" in different boxes that move for a nice affect of color. The first screen has three buttons for navigation that lead to GameScreen.js by clicking on "العب", LoginScreen.js by clicking on "الدخول", and RegisterScreen.js by clicking on "تسجيل جديد".

<img width="336" alt="image" src="https://github.com/user-attachments/assets/5d07d11a-cc06-411d-a039-fc7516e3bf1c" />


#### GameScreen.js

This screen is for the users that want to play without logging in. As previously mentioned, no points are saved for users, and there are limited words that will randomize for the player to enjoy. The words and their hints are saved in the GameContext However, there is a winning streak available. After 3 consecutive wins, the screen will show a fire animation in the color red. If the player wins 6 times consecutively, the color of the fire will become orange. And if they win 12 times without fail, a blue fire will appear. The goal of this animation is to engage the user to keep on pushing!

<img width="223" alt="image" src="https://github.com/user-attachments/assets/4f9dfc66-9de8-47b6-830a-e1c5c49ca474" />


#### LoginScreen.js & RegisterScreen.js

These screens are where the user can create a new account that will be saved in the Firebase Database to start the real fun. After the user creates the account and clicks "تسجيل", it will take them to the LoginScreen.js right away. Afterwards, the user logins in their info and it will trigger the LoadingScreen.js file for loading animation and the main page will appear which is the HomeScreen.js for registered users.

<img width="225" alt="image" src="https://github.com/user-attachments/assets/1d003547-3cbb-4b69-93ee-1e43151afadb" />
<img width="225" alt="image" src="https://github.com/user-attachments/assets/dd5cbbb3-3379-451f-93b7-a7389cd9c0cf" />


#### HomeScreen.js (Registered Users)

The Home screen has a simple layout with just the button "العب الان" that navigates to the GameSCreenwAccounts.js file. The HomeScreen.js is the main container for the regisetred users with Tab navigation for easy navivgation. The tabs lead to three Screens: The home screen itself, the Leaderboard.js, and the Account.js for a user's personal account information. 


#### GameScreenwAccounts.js (Registered Users)

This file has the same idea as the GameScreen with the addition of more words, a point saver, and more hints available to assist the player.

#### Leaderboard.js (Registered Users)

The Leaderboard screen displays a flatlist of players with their earned highest points to keep them competitive and engage more with the application. The top of the screen, only the three top players are displayed with their user profile picture. The first winner gets to have a crown badge displayer over the profile picture to enhance their victory. 

#### Account.js (Registered Users)

This screen displays the Rank badges that the user won from point collection.


### Additional Screens for The Logical Base of The Game

#### GameContext.js

This file keeps the updated points logic. 

#### utils.js

This file contains a list of the words that will be displayed for users to play with as well as the streaks code logic. 

## Future Work

This project has enhanced our skills for using React native. From the journey, we realized that the programming language has limited some of the capabilities that we wished we could have applied such as more public resources for User Interface designs. Additionally, we wish to work on linking the points that the user gains to the Rank Badge that he will accomplish and make it appear in the Account.js file legitmately. 

## Resources & Contributions











   
        


