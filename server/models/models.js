const mongoose = require('mongoose');


// CHANGE the items below for BELT EXAM

const RentalSchema = new mongoose.Schema({
    address: {
        type: String,
        minlength: [
            10,
            'The address must be at least 10 Characters.'
        ]
    },
    imageUrl: {
        type: String,
        minlength: [
            10,
            'The image URL must be at least 10 Characters.'
        ]
    },
    newConstruction: {
        type: Boolean,
        default: true
    },
    propertyType: {
        type: String,
        required: [
            true,
            'You must specify the property type.'
        ]
    },
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