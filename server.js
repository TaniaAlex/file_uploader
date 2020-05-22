const express = require("express");
require("colors");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const fileUpload = require("express-fileupload");

const app = express();

// initialize fileUpload
app.use(fileUpload());
const PORT = process.env.PORT || 5000;

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
app.listen(PORT, () =>
  console.log(
    `[server.js]: Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `
      .yellow
  )
);
