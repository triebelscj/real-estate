const mongoose = require('mongoose');


// CHANGE DB FOR EXAM !!!!!!!!!!!!
mongoose.connect('mongodb://localhost/rental_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

    .then(() => console.log("DB connect established"))
    .catch(err => console.log("there was a screw up", err))