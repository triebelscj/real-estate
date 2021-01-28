const express = require('express');
const cors = require('cors');
const app = express();

require('./config/config');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ exteneded: true }))

require('./routes/routes')(app);

app.listen(8000, () => {
    console.log('you are now listening at port 8000!')
})