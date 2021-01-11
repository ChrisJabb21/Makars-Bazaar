const express = require("express");
const cors = require("cors");
const data = require("./data.js");
const app = express();
app.use(cors());

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, ()=> {
    console.log('Listening at http://localhost:5000');
    console.log('Nodemon used for live reload/restart backend app \ndue to file changes.');

});
