<h1 align="center">
  <br>
  <a href="https://github.com/TalMizrahii/AP2-Ex1"><img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png" alt="HTML" width="300"></a>
  <br>
  Advanced-Programming-2
  <br>
</h1>

<h4 align="center">Hatchat is a web-based chat application designed for online communication, developed as a project for the Advanced Programming course at Bar-Ilan University.


<p align="center">
  <a href="#description">Description</a> •
  <a href="#implementation">Implementation</a> •
  <a href="#installing-and-executing">Installing And Executing</a> •
  <a href="#authors">Authors</a> 
</p>

## Description
  
*The final project seats in the "main" branch!*
  
This project is a web application developed using [React](https://react.dev/) and [nodeJS](https://nodejs.org/en).
 
The chat application is divided into two parts: the server-side, implemented in Node.js and utilizing [mongoDB](https://www.mongodb.com/), and the client-side, implemented using HTML, CSS, JavaScript, and React.
 
  ## The Client
  
  In the client side, the user is browsing to the client's index page, which is the login screen of the app.
  
  <img width="400" alt="rm1" src="https://user-images.githubusercontent.com/103560553/234780293-e618d743-7ac0-4805-a298-e5d668767660.PNG">


 If he is not registerd, he can click on the "Register" Button on the buttom of the screen to brows to the register screen. It includes a registration form for new users. [Bootstrap](https://getbootstrap.com/) is used for styling, and the form adapts to different devices. The registration form includes input fields for username, password, display name, and profile picture. Similar to the login screen, the fields are validated, and appropriate visual feedback is provided.

<img width="400" alt="rm2" src="https://user-images.githubusercontent.com/103560553/234783338-8691a917-fed8-44a5-86be-e5060ddf356e.PNG">
  <img width="200" alt="1" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/2b496ddb-4061-445f-a5ac-c1a8ae1aac41">
<img width="200" alt="2" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/448fbd76-beae-4599-b1db-2d4ec3738959">

  
  The chat screen contains a list of recent conversations, images of the contant and a date and time note about the last message made in this conveersation. The second part in the conversation is a the chat itself. It contains all messages in the conversation with the spesific contant. The image of the contant is located in the left upper part of the screen. If the user had privious converssations, they will be presented to him there.

<img width="400" alt="Capture" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/46412cf8-22df-466d-a163-9b432efbdfa9">

  When adding a new user, the app is updating the contact list by placing the contact who sent the most recent message at the top, and setting the timestamp of the last message and displaying a snippet of it within the contact entry in the list.
  
<img width="200" alt="3 1" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/087ba499-acf6-459c-bd0e-1774ca6e6b83">
<img width="200" alt="4" src="https://github.com/TalMizrahii/AP2-EX2/assets/103560553/433bcdb9-037c-437d-9306-6bbab6f07885">
  

## Implementation

 

## Cool Featues
  

 
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
