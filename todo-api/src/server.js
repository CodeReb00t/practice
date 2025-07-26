const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { todoRoutes } = require('./routes/todoRoutes');
const { authRouter } = require('./routes/authRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json())



app.use('/api/todos', todoRoutes);


app.use('/api', authRouter);





connectDB();
app.us
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
})
app.get('/api', (req, res) => (
    res.json("Kshitij chakka h")
));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
})