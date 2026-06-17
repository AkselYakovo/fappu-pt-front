<h1 align="center">Fappu's Price Tracker <small>(Front)</small></h1>

<h3 font="bold" align="center">Stack Used:</p>

<div align="center">
  <span>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="45px" height="45px"/>
  </span>
  <span>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" width="45px" height="45px"/>
  </span>
  <span>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" width="45px" height="45px"/>
  </span>
  <span>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-original.svg" width="45px" height="45px"/>
  </span>
</div>

## What is this project?
This repo is the front-end codebase part of [Fappu's Price Tracker (Back)](). The whole project is intended
to act as a platform where scrapped data from certain websites is parsed, transformed & stored to posteriorly
be presented in a good-looking, succint way.

### Other tools:
- **NPM**
- **ESLint**
- **Prop-Types**
- **React Router**

## Functioning

### Environment variables
In order for the front-end to work properly, you must ensure first to create a `.env` file before doing anything else.
Inside of this file there must exists a `VITE_BACKEND_ADDRESS` variable whose value must be a valid URI address.
This address will be controlled by the back-end part of the project.

### Installing Dependencies
Use the following command to install the dependencies:
```Bash
fappu-front-dir/:~$ npm install
```

### Running it
To execute the front-end use the following command:

```Bash
fappu-front-dir/:~$ npm run dev
```

Once finished you'll be able to access the front-end at `http:localhost:5173`

**IMPORTANT:** The server over the back-end must be also running! Otherwise no websites will be displayed
