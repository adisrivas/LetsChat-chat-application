const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

require('dotenv').config()
const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/db',
  { useNewUrlParser: true, useUnifiedTopology: true });
  
app.set('view engine', 'ejs');
app.set(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/v1', userRoutes);


app.get('*', (req,res) => {
    res.json({
        message: "This API does not exist"
    });
});


server.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});

module.exports = {
    app
};