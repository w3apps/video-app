# video-app

## Requirements
- node v6.10.x (tested with 6.10.2 on Win10).

## Installation
- clone the repository;
- go to the project folder;
- from a terminal run `npm install` - this will install all the project dependencies;
- after the installation is complete run `npm run start` - this will start a dev-server that will serve the application on `http://localhost:8080` and will also watch for any file changes (if running on Windows, the terminal window may require Administrator permissions);
- if you can't run the app on port `8080`, you can open the `./webpack.config.js` file and change `server.listen(8080);` to use the port that you want. 

