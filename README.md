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

This is the first screen all users will see, it has the title "وردل" in different boxes that move for a nice affect of color. The first screen has two buttons for navigation that lead to GameScreen.js, LoginScreen.js, and RegisterScreen.js.

<img width="235" alt="image" src="https://github.com/user-attachments/assets/a446c940-3842-4cf7-848e-68c94eb91726" />


#### GameScreen.js

This screen is for the users that want to play without logging in. As previously mentioned, no points are saved for users, and there are limited words that will randomize for the player to enjoy. However, there is a winning streak available. After 3 consecutive wins, the screen will show a fire animation in the color red. If the player wins 6 times consecutively, the color of the fire will become orange. And if they win 12 times without fail, a blue fire will appear. The goal of this animation is to engage the user to keep on pushing!




   
        


