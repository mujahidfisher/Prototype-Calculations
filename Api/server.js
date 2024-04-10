const express = require('express');
const multer  = require('multer');
const xlsx = require('xlsx');
const PORT = 3000

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.static("./static"));

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Read the uploaded file
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming only one sheet
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Send the data back to the frontend
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}🌹`);
});