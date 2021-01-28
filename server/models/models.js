const mongoose = require('mongoose');




// CHANGE the items below for BELT EXAM

const RentalSchema = new mongoose.Schema({
    address: { type: String },
    imageUrl: { type: String },
    newConstruction: { type: Boolean },
    propertyType: { type: String },
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });




// DO IT LIKE THIS FOREVER
const Rental = mongoose.model("Rental", RentalSchema);
module.exports = Rental;


// Try it this way if it doesn't work.
// module.exports.Rental = mongoose.model("Rental", RentalSchema);