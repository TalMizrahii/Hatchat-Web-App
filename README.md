<h1 align="center">
  <br>
  <a href="https://github.com/TalMizrahii/AP2-Ex1"><img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png" alt="HTML" width="300"></a>
  <br>
  Advanced-Programming-2
  <br>
</h1>

<h4 align="center">This GitHub repository is for the second assignment given in Advanced Programming 2 course, Bar Ilan University.


<p align="center">
  <a href="#description">Description</a> •
  <a href="#implementation">Implementation</a> •
  <a href="#installing-and-executing">Installing And Executing</a> •
  <a href="#authors">Authors</a> 
</p>

## Description
  
*The final project seats in the "main" branch!*
  
This project is a web application developed using React. It is an extension of the web UI that was created in the first assignment. The application includes the same screens as in the previous assignment. The goal is to refactor the code and transform it into a React application composed of appropriate components.

The project focuses on implementing input validation and providing clear visual feedback to the user. The registration and login screens require input validation for all fields, with logical constraints on each field. For example, the password must be at least 8 characters long, include a combination of characters and letters, and so on. The user should receive visual indications when entering invalid values.

Additionally, the project implements image selection functionality on the registration screen and verifies the password. The user chooses an existing image from their computer for their profile picture. Proper registration allows the user's details to be saved in JavaScript (JS), so that entering the correct credentials will log the user into the application through the login screen. Access to the chat page is only granted to logged-in users, and attempting to access it without proper authentication displays the login screen.

Sensitive data, such as actual passwords for other websites or sensitive messages, should not be stored or handled in this application.
 

## Implementation

 The project consists of the following components:

1. Login screen
2. Registration screen
3. Chat room screen
  
  
The login screen allows existing users to log in and new users to navigate to the registration screen. It includes a form with fields for username, password, display name, and profile picture. The validation logic is applied to each field, and Bootstrap is used for styling the form.

  <img width="400" alt="rm1" src="https://user-images.githubusercontent.com/103560553/234780293-e618d743-7ac0-4805-a298-e5d668767660.PNG">

  
The registration screen is accessible via a link on the login form. It includes a registration form for new users. Bootstrap is used for styling, and the form adapts to different devices. The registration form includes input fields for username, password, display name, and profile picture. Similar to the login screen, the fields are validated, and appropriate visual feedback is provided.

The chat room screen displays recent conversations on the left panel and the selected conversation on the right panel. New messages can be composed and sent, and they will be displayed in the conversation history. The design of the chat room aims for simplicity, cleanliness, and ease of use.

 The registration page includes a registration form for new users and has a responsive design to ensure it looks great on all devices. This page uses Bootstrap CSS framework for the styling. The HTML structure for this page consists of a header, body and footer. The header contains the logo and the body contains the registration form. The footer contains a link to the login page and the copyright information.
  
<img width="400" alt="rm2" src="https://user-images.githubusercontent.com/103560553/234783338-8691a917-fed8-44a5-86be-e5060ddf356e.PNG">

The chat room contains a list of recent conversations, images of the contant and a date and time note about the last message made in this conveersation. The second part in the conversation is a the chat itself. It contains all messages in the conversation with the spesific contant. The image of the contant is located in the left upper part of the screen.
  
  <img width="400" alt="Capture" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/46412cf8-22df-466d-a163-9b432efbdfa9">

## Cool Featues
  

Enforcing password verification by ensuring the user enters the same password twice. Additionally, preventing the user from copying and pasting the password they entered.
  
 <img width="200" alt="1" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/2b496ddb-4061-445f-a5ac-c1a8ae1aac41">
<img float="right" width="200" alt="1" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/5d99088c-ce92-40e6-880f-34f30e9b0687">

  
  
Checking the password format in real-time and providing the user with feedback on the specific password requirements they need to fulfill. 
 
<img width="200" alt="2" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/448fbd76-beae-4599-b1db-2d4ec3738959">

  
  
Updating the contact list by placing the contact who sent the most recent message at the top. 

<img width="200" alt="3 1" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/087ba499-acf6-459c-bd0e-1774ca6e6b83">

  
  
Updating the timestamp of the last message and displaying a snippet of it within the contact entry in the list.
  
<img width="200" alt="4" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/433bcdb9-037c-437d-9306-6bbab6f07885">


 
## Installing And Executing
  
To clone and run this application, you'll need [Git](https://git-scm.com) installed on your computer. From your command line:

```bash
# Clone this repository.
$ git clone https://github.com/TalMizrahii/AP2-EX2

# Go into the repository.
$ cd AP2-EX2
  
# Go into the project folder.
$ cd hatchat
  
# Install the needed libraries.
$ npm install
  
# Start the program in your default browser.
$ npm start
```

## Authors
* [@Yuval Arbel](https://github.com/YuvalArbel1)
* [@Tal Mizrahi](https://github.com/TalMizrahii)
