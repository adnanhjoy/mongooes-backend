const express = require('express');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const router = require('./router');
const app = express();
dotenv.config()
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());

// db connect
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lesson1');
        console.log('DB is Connected');
    } catch (error) {
        console.log('DB is not Connected');
        console.log(error.message)
    }
}

app.use('/api', router)


//call database
connectDB();

//root route
app.get('/', (req, res) => {
    res.send('Server is Connected');
});

app.listen(port, () => {
    console.log(`Server Runnig Port ${port}`);
})