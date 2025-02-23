require('dotenv').config();

const dashbrdRoutes = require('./routes/dashbrd_routes');

const express = require('express');
const app = express();

app.use(express.json());


app.use((req, res, next), () => {
    console.log(req.path, req.method);
    next();
})

app.use('/', dashbrdRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening at port:", process.env.PORT);
})