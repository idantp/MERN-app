// import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/api')

// init express app
const app = express();
// To run the app on the oracle port if port 80 is not available
const PORT = process.env.PORT || 8080;

const MONGODB_URI = 'mongodb+srv://mernAdmin:mern123admin@merndb.gkso1.mongodb.net/mernDB?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI || 'mongodb://localhost/mern_app',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

// a listener that tells us whether the connection to mongoDB is succeeded or not
mongoose.connection.on('connected', ()=>{
    console.log('MONGOOSE IS CONNECTED!!!');
});

// Data Parser
app.use(express.json());
// extends = false because object that were sent are not very nested
app.use(express.urlencoded({extended: false}));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));