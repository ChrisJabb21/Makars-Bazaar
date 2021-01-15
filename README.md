# JS Ecommerce app 

Full-stack Ecommerce web app made with Vanilla JavaScript for the frontend, with NodeJS and MongoDB for the backend. 

Root directory contains package.json configuration needed to run the node backend. Frontend subdirectory has the package.json for running the frontend.

## Technologies used
---
- HTML/CSS
- JavaScript
    - Webpack
    - Babel
    - ESlint (code linter to help find code syntax problems faster)
- NodeJS
- MongoDB
--- 


## Entire Project Structure 
```
──root 
    ├──.gitignore
    ├──.babelrc
    ├──.eslintrc.js
    ├──README.md
    ├─── package.json
    ├───backend/
    ├───frontend/
    └────node_modules/
```

# Frontend
## Project Structure 
Directory layout displayed with the ``` tree ``` in Linux and/or Windows command prompt in root project directory.

```
──frontend
    ├───node_modules
    └───src
        ├───images
        ├───components
        │   └─── Rating.js
        |
        ├───views
        │   ├─── HomeScreen.js
        │   ├─── ProductScreen.js
        │   └─── Error404Screen.js
        │
        ├─── index.js
        ├─── data.js
        ├─── package.json
        ├─── index.html
        └─── styles.css
```
### Running Project Locally
- Do an npm install in root project and frontend directory
- Within frontend subdirectory and root project directory, run ```npm start``` in the terminal or command line.