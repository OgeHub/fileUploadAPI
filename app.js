const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

const app = express();

const filesFolder = "./files";

if (!fs.existsSync(filesFolder)) {
  fs.mkdirSync(filesFolder);
}

app.post("/fileUpload", async (req, res) => {
  // Create instance of form
  const form = formidable({
    multiples: true,
    uploadDir: filesFolder,
    allowEmptyFiles: false,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024
  });

  // Parsing
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log("Error parsing the files");
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err
      });
    }
  });

  return res.json({
    message: "File uploaded successfully"
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
