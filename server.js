const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const config = require("config");
const app = express();

//BodyParser Middleware
app.use(express.json());

//DB Config
const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log(e));

//Use routes
app.use("/api/items", require("./routes/api/items.api"));
app.use("/api/users", require("./routes/api/users.api"));
app.use("/api/auth", require("./routes/api/auth.api"));
//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
