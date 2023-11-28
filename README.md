# Snaqies

## About the Project
Ever wanted to remember what foods and restaurants you tried before? Try using Snaqies! This app is designed to make logging your food adventures easy, aesthetic, and memorable. Don't forget where you had the best ramen of your life. Take a picture, write a review, and tag a location so that you can remember your experiences and share them with your friends. Organize your food thoughts into one convenient app!

## Running the Expo App
### Prerequisites
- Install `Expo Go` on your mobile device. Making changes in your IDE will make live updates to Expo Go
- Alternatively, you can install `Expo Go` on a desktop emulator
- Install the necessary *dependencies* under `expo_app\package.json` with `npm install` *`dependency`*

### Running via Terminal
1. `cd` to your local repo and then into `expo_app`
2. Run `npx expo start` or `npm start`
3. Open your mobile camera and scan the QR that pops up in terminal
    - See hotkeys in the terminal for more options
4. Shake your phone or press the screen with three-fingers to bring up an additional overlay
5. Press the keys `Ctrl + c` to stop the server

## Notes: App vs Web
- React Native app intentionally automatically resizes a sourced image if there is no style dimension provided, EXCEPT for browsers which resize to 0x0

## Bugs
- WARN  Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead
    - We are not using "cancelled" in CameraOpen.js
- WARN  Possible Unhandled Promise Rejection (id: 0): Error: Another photo capture is already being processed. Await the first call.
    - Some input time or optimizing issue not important for right now
