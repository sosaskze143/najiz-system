const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/request');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// رفع الملفات
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

app.use('/auth', authRoutes);
app.use('/request', requestRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
