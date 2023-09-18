const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const playerRoutes = require('./routes/route');

const app = express();

app.use(bodyParser.json({extented: false}));
app.use(cors());
app.use(playerRoutes);

app.listen(1500,()=>{
    console.log('connected to backend');
})