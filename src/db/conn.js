const mongoose = require("mongoose");

//require models & connect to db  ----------
const db = mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfully with DB...");
  })
  .catch((err) => {
    console.log(err);
  });
