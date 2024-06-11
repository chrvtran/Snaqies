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

### Tips for First Run
- Use `npx expo go` instead of `npm start`
- Install Expo using `npm install expo`
- Fix package dependency and version issues with `npm install -legacy-peer-deps`
- Run `npm audit fix` and `npm audit fix --force`

## Bugs
- WARN  Possible Unhandled Promise Rejection (id: 0): Error: Another photo capture is already being processed. Await the first call.
    - Some input time or optimizing issue not important for right now
<br><br>

## File Information
- App.js
    - Creates the Navigation Bar on the bottom of the Page to traverse through the main programs of the App
<br><br>

### Screens
- CameraOpen.js
    - The Camera Screen allows user to take/upload photos to create their Snaq post
- Home.js
    - The Home Screen lists all of the Snaqs and is the default screen
- Location.js
    - The Map Screen allows users to use their current location or search for a location to include with their Snaq post
- Post.js
    - The Post Screen appears after clicking on a Snaq on the Home Screen to reveal the Snaq post and reviews
- Price.js
    - The Price Screen lets users choose a price range for their Snaq review
- Profile.js
    - (empty)
- Rating.js
    - The Rating Screen lets users rate their Snaq experience out of 5 stars
- Review.js
    - (empty)
- Saved.js
    - (empty)
- Setting.js
    - (empty)
- Testing.js
    - The Testing Screen is used by developers
 
 ### Assets
- alert.js
    - Creates a Pop-Up component upon pressing X on the camera screen to discard/save taken photos or return to the camera screen
- button.js
    - Creates a Flat Button component with given the Text and Function on Press
- review.js
    - Creates a component that contains the review data
- slideItem.js
    - Creates a component for images
- slider.js
    - Creates a horizontally sliding list of images that snaps
- snaq.js
    - Creates the Snaq component on the home screen  that acts like a thumbnail for the Post Screen
<br><br>

### Contributors
# Christopher Tran
September 13, 2024 - Present

Role: Project Manager, Product Designer, & Developer

# Aaron Cheng
September 13, 2024 - April 24, 2024

Role: Product Designer & Developer

# Eric Wu
September 13, 2024 - Present

Role: Developer

# Kevin Chiu
September 16, 2024 - January 17, 2024

Role: Developer

# Emily Chen
October 9, 2024 - January 17, 2024

Role: UI/UX Researcher

# Andrew Chun
November 27, 2024 - Present

Role: Developer

# Ben Rao
January 3, 2024 - Present

Role: Developer

# Ivan Liu
May 3, 2024 - Present

Role: Developer
