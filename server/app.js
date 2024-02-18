const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
require('./db/conn');
const cors = require('cors');
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(require('./routes/auth'));
app.use(require('./routes/blog'));
app.use(require('./routes/recipiroute'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;