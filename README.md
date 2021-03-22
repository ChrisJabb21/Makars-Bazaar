# Makar's Bazaar 

Full-stack JS Ecommerce web app made with Vanilla JavaScript for the frontend, with NodeJS and MongoDB for the backend.

# Showcase 

| Images | 
| :-------------: | 
| <img width="60%" alt="screenshot of products storefront" src="frontend\images\sampleproductspreview.png"> |
| <img width="60%" alt="screenshot of shopping cart" src="frontend\images\Makar'sBazaarshoppingcartpreview.png">  |
| <img width="60%" alt="screenshot of order processing and progress bar component" src="frontend\images\MakarsBazaarplaceorder.png"> |

## Technologies used
---
- HTML/CSS
- JavaScript
    - Webpack
    - Babel
    - ESlint (code linter to help find code syntax problems faster and enforce best practices or code quality standards)
    - Prettier (code formatter)
- NodeJS
- Express
- MongoDB
    - Mongoose
- Paypal payment API integration [Click here](https://developer.paypal.com/developer/applications).

- JSON Web Token

--- 


## Features
 - Two parts of ecommerce app
    1. Store side of app with products to browse and purchase (user and guest)
    2. Admin dashboard section for adding, updating products and viewing all orders placed and ecommerce logistics. (if admin logged in) 
 - User account customization with login and registration
 - Shopping cart functionality  
 - Order History for each user with payment details and status.   
 - Progress indicator component for cart checkout steps
--- 
## Entire Project Structure 

Root directory contains package.json configuration needed to run the node backend. Frontend subdirectory has the package.json for running the frontend.

```
──root 
    ├──.gitignore
    ├──.babelrc
    ├──.eslintrc.js
    ├──.env
    ├──README.md
    ├─── package.json
    ├───backend/
    ├───frontend/
    └────node_modules/
```

## Frontend 
Directory layout displayed with the ``` tree ``` command in Linux/Unix or Windows command prompt in root project directory.
```
──frontend
    ├───node_modules
    └───src
        ├───images
        ├───components
        │   └─── Rating.js
        |        ...
        |
        ├───views
        │   ├─── HomeScreen.js
        │   ├─── ProductScreen.js
        │   └─── Error404Screen.js
        |        ...
        │
        ├─── index.js
        ├─── package.json
        ├─── index.html
        └─── styles.css
```
### Running Project Locally
- Do an npm install in root project and frontend directory
- Within frontend subdirectory and root project directory, run ```npm start``` in the terminal or command line.