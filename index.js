const express = require('express');
const cors = require('cors');

// starting express
const app = express();
app.use(express.json());
app.use(cors());

// routers
const post = require('./routes/api/post')
app.use('/api/custdata', post)
const post1 = require('./routes/api/post1')
app.use('/api/purchdata', post1)


// starting server
const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Server started on port : ${port}`));




