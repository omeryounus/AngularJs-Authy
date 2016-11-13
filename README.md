# AngularJs-Authy
This is simple AngularJS sign up and signin web application using Twilio Authy Onetouch and SoftToken and is ready to install the Angular framework and a bunch of development and testing tools.

Getting Started

To get you started you can simply clone the AngularJs-Authy repository and install the dependencies:

Prerequisites

You need git to clone the AngularJs-Authy repository. You can get git from http://git-scm.com/.

You must have node.js and its package manager (npm) installed. You can get them from http://nodejs.org/.

Clone the AngularJs-Authy repository using git:

git clone https://github.com/omeryounus/AngularJs-Authy.git
cd angularjs-authy

We can simply do:

npm start

Behind the scenes this will call 'npm install' to install all the dependencies in package.json

    node_modules - contains the npm packages for the tools we need

Now browse to the app at http://localhost:3000.

Directory Layout

    api/                 --> all the web APIs for server side
    public/              --> all of the source files for the frontend side
    css/app.css           --> default stylesheet
    controller/           --> all app specific controller
    services/             --> all app specific services
    views/                --> the views template and logic
    app.js                --> main application module
    index.html            --> app layout file (the main html template file of the app)

    package.json         --> all npm package manager
    server.js            --> express framwork web APIs 
    karma.conf.js        --> config file for running unit tests with Karma

Testing

Running Unit Tests
Unit test is written in Jasmine, which can run with the Karma Test Runner.There is Karma configuration file to run them.

    the configuration is found at karma.conf.js
    the unit tests are found next to the code they are testing and are named as ..._spec.js.

The easiest way to run the unit test is to use the supplied npm script:

    npm test

You can also start the karma test using karma cli commands:

    karma start


