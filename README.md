# Snaqies

## About the Project
Can't remember what foods and restaurants you tried before? Try using Snaqies! This app is designed to make logging your food adventures easy, aesthetic, and memorable. Don't forget where you’ve been! Take a picture, write a review, and tag a location. Organize your food thoughts into one convenient app.  
<br><br>
## Running the Expo App
### Prerequisites
- Install `Expo Go` on your mobile device. Making changes in your IDE will make live updates to Expo Go
- Alternatively, you can install `Expo Go` on a desktop emulator
- Install the necessary *dependencies* under `expo_app\package.json` with `npm install` *`dependency`*
<br><br>
### Running via Terminal
1. `cd` to your local repo and then into `expo_app`
2. Run `npx expo start` or `npm start`
3. Open your mobile camera and scan the QR that pops up in terminal
    - See hotkeys in the terminal for more options
4. Shake your phone or press the screen with three-fingers to bring up an additional overlay
5. Press the keys `Ctrl + c` to stop the server
<br><br>
## Bugs
- WARN  Possible Unhandled Promise Rejection (id: 0): Error: Another photo capture is already being processed. Await the first call.
    - Some input time or optimizing issue not important for right now
<br><br>
## File Information
### Assets
- alert.js
    - Creates a Pop Up componenet upon pressing X on the camera screen to discard/save taken photos or return back to the camera screen
- button.js
    - Creates a Flat Button component with given the Text and Function on Press
- review.js
    - Creates a component that has the review's tags, comments, rating, price and photos
- slideItem.js
    - Creates a component for Images
- slider.js
    - Creates a sliding List of Images for the taken photos from the camera screen
- snaq.js
    - Creates a Icon/Post component for the reviews showcasing the Restaurant's Name and Photo and pressable to showcase more information like Date, Address and other photos
### Screens
- App.js
    - Creates the Navigation Bar on the bottom of the Page to traverse through the main programs of the App
- CameraOpen.js
    - Creates the Camera Screen with the ability to take/save photos to and from the camera roll or asynchronous storage system on the app, and remove/clear photos from the Photo List that's shown on the bottom of the page. 
- Home.js
    - Creates the Scrollable Home Screen with the Snaq Icons/Posts
- Location.js
    - Creates a Map Screen with the ability to search locations or use your current location for each Post
- Post.js
    - Creates a Post Screen after clicking on the Snaq Icon to reveal more general information of the restaurant, comments and photos
- Price.js
    - Creates a Price Screen to choose a price range for the eateries in the restuarant
- Profile.js
    - Creates a Profile Page for the User
- Rating.js
    - Creates a Rating Screen to rate the resturant out of 5 Stars
- Review.js
    - Create a Review Screen
- Saved.js
    - Creates a Saved Screen
- Setting.js
    - Creates a Settings Page for the User
- Testing.js
    - Creates a Testing Page for Developers to Test WIP Programs


  
<br><br>
### Contributors
# Aaron Cheng

# Andrew Chun

# Ben Rao

# Christopher Tran

# Emily Chen

# Eric Wu

# Kevin Chiu

# Ivan Liu
