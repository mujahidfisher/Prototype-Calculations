const express = require("express");
const multer = require("multer");
const ExcelJS = require("exceljs");
const cors = require("cors");
const PORT = 3000;

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.static("./static"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1); // Assuming only one sheet
    const rows = worksheet.getSheetValues();

    const data = rows.map(row => {
      const rowData = {};
      row.forEach((cellValue, index) => {
        rowData[`column_${index + 1}`] = cellValue;
      });
      return rowData;
    });

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}🌹`);
});
