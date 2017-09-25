# itblooms-boilerplate

Use this organized structure to build a simple site.


## Requeriments
This project have some requeriments you need to meet in order to compile it. First of all, you need NodeJS in order to run javascript on the console, you can go to the [NodeJS](http://nodejs.rg) site and follow trough the installation process. After you get the `npm` command on the console, you need to install Gulp with the following command.

```
npm install -g gulp
```

Gulp is the one that will run all the compilation, watchers and others tasks.

## Install
In order to start using the project you need to clone it to your pc. You can download the the zip version from [here](#) or clone the project with the git command.
```
git clone https://github.com/shihab993/sass-boilerplate.git project-name

```
After you have it on you pc, you need to go in the console to the project folder and execute the following command to gather all the dependencies.
```
npm install
```
After the proccess finish you will have all you need to start coding.

## How to use
To start using it, the only thing you need to do is open the project on you code editor of choice and code. To compile and live preview all your changes you have some command that will help you. Here are the list of commands you should know.

Every command have to be executed on the root directory of the project using the gulp command like `gulp clean` or `gulp`

* **default**: Compile and watch for changes (For development)
* **clean**: Removes all the compiled files on ./app
* **scripts**: Compile the JavaScript files
* **sass**: Compile the Sass styles
* **images**: Copy the newer to the build folder
* **minify-custom**: minify custom.js files
* **merge-styles**: compack vendor css files
* **browsersync**: Start the browsersync server

If you are in development, the `gulp` command is the best choice for you. Go to the project folder in the console and execute `gulp default`, it will compile the project and start a server that will refresh every time you change something in the code. Gulp will be watching for changes and will tell you how to access the project from local and public url. Every browser that point to that url will be auto refreshed. As an extra feature for testing purpose any interaction on one browser will be reflected on any others. Try it on a phone, tablet and pc at the same time.

