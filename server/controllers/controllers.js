
const Rental = require('../models/models');



// C R U D   Methods
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    })
}

// Gets All Rentals   !!!!!! PLURAL !!!!!!!
module.exports.findAllRentals = (req, res) => {
    Rental.find()
        .then(allRentals => res.json(allRentals))
        .catch(err => res.status(400).json(err));
}


// Creating NEW Rental
module.exports.createRental = (req, res) => {
    Rental.create(req.body)
        .then(newProperty => res.json(newProperty))
        .catch(err => res.status(400).json(err));
}


// ONE specific Rental
module.exports.findOneRental = (req, res) => {
    Rental.findOne({ _id: req.params.id })
        .then(oneRental => res.json(oneRental))
        .catch(err => res.status(400).json(err));
}


// Updates Rental by ID 
module.exports.updateRental = (req, res) => {
    Rental.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updatedRental => res.json(updatedRental))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
}


// Deleting Rental by ID
module.exports.deleteRental = (req, res) => {
    Rental.deleteOne({ _id: req.params.id })
        .then(deleteRental => res.json(deleteRental))
        .catch(err => res.status(400).json(err));
}