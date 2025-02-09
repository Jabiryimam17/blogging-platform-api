const express = require("express");

const app = express();

router = require("./routes/router")

app.use(express.json());
app.use(router);



app.listen(3000);
