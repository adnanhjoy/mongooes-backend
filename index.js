const express = require('express');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const productRouter = require('./router/productRouter');
const categoryRouter = require('./router/categoryRouter');
const cartRouter = require('./router/cartRouter');
const app = express();
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

//router

app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', cartRouter);


app.post('/jwt', (req, res) => {
    const token = jwt.sign({
        data: 'adnan@gmail.com'
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    res.send(token)
    console.log(token)
})

//call database
connectDB();

//root route
app.get('/', (req, res) => {
    res.send('Server is Connected');
});

app.listen(port, () => {
    console.log(`Server Runnig Port ${port}`);
})