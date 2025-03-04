const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
var cors = require('cors')



const app = express();
const port = 5000;
app.use(cors())

app.use(express.json());

//Here we are setting these below paths for avaliable for api use
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`mern project listening on port http://localhost:${port}`);
});
