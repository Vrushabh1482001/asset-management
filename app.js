const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { isCelebrateError } = require("celebrate");
const path = require("path");
require("dotenv/config");
const PORT = process.env.PORT || 4000;


/* --------------------------------------------------  connect db  -------------------------------------------------- */
require("./src/db/conn");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require("./src/routes/index.routes"));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// /* -------------------------------------------------- Add Person  -------------------------------------------------- */
// app.use("/user", require("./src/routes/user.routes"));

// /* -------------------------------------------------- Add Person  -------------------------------------------------- */
// app.use("/vendor", require("./src/routes/vendor.routes"));

// /* -------------------------------------------------- Add Person  -------------------------------------------------- */
// app.use("/company", require("./src/routes/company.routes"));

// /* -------------------------------------------------- Add Person  -------------------------------------------------- */
// app.use("/item", require("./src/routes/item.routes"));

// /* -------------------------------------------------- Add Person  -------------------------------------------------- */
// app.use("/order", require("./src/routes/order.routes"));

/* --------------------------------------------------  404  -------------------------------------------------- */
// app.use("*", (req, res) => {
//   res.status(200).json({ message: "Not found", status: 404 });
// });

/* --------------------------------------------------  CELEBRATE ERROR HANDLING  -------------------------------------------------- */
app.use(
  (errorHandling = (err, req, res, next) => {
    if (isCelebrateError(err)) {
      const errorBody = err.details.get("body") || err.details.get("query");
      const {
        details: [errorDetails],
      } = errorBody;
      return res.send({
        status: 400,
        message: errorDetails.message,
      });
    }
    return next(err);
  })
);

/* --------------------------------------------------  APP LISTEN  -------------------------------------------------- */
app.listen(PORT, (req, res) => {
  console.log(`App running on ports ${PORT} 🚀🚀🚀🚀🚀`);
});
