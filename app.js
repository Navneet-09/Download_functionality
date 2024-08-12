const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const apiRoutes = require('./routes/fileRoutes')

app.use(bodyParser.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});