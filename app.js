const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { isCelebrateError } = require("celebrate");
require("dotenv/config");
const PORT = process.env.PORT || 4000;

// const { Client } = require('whatsapp-web.js');
// const qrCode = require('qrcode');
// const client = new Client();

// client.on('qr', async (qr) => {
//   // Generate a QR code and send it as a response
//   try {
//     const qrDataURL = await generateQRCode(qr);
//     res.send(`<img src="${qrDataURL}" alt="WhatsApp QR Code">`);
//   } catch (error) {
//     console.error('Error generating QR code:', error);
//     res.status(500).send('Error generating QR code');
//   }
// });

// client.on('ready', () => {
//   console.log('WhatsApp client is ready');
// });

// client.initialize();

// async function sendWhatsAppMessage(phoneNumber, message) {
//   const chat = await client.getChatById(phoneNumber);
//   await chat.sendMessage(message);
// }

// const orderCompleted = true; // Replace with your actual logic
// if (orderCompleted) {
//   const clientPhoneNumber = '7069182001'; // Replace with client's WhatsApp number
//   const message = 'Your order is complete! Thank you for shopping with us.';
//   sendWhatsAppMessage(clientPhoneNumber, message);
// }

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

/* --------------------------------------------------  start  -------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Welcome to this Api....");
});

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
app.use("/user", require("./src/routes/user.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
app.use("/vendor", require("./src/routes/vendor.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
app.use("/company", require("./src/routes/company.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
app.use("/item", require("./src/routes/item.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
app.use("/order", require("./src/routes/order.routes"));

/* --------------------------------------------------  404  -------------------------------------------------- */
app.use("*", (req, res) => {
  res.status(200).json({ message: "Not found", status: 404 });
});

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
