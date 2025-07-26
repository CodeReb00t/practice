const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { todoRoutes } = require('./routes/todoRoutes');
const { authRouter } = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api', authRouter);

app.get('/api', (req, res) => (
    res.json("Welcome !")
));

// Use the custom error handler
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
})