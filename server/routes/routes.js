const RentalController = require('../controllers/controllers');

module.exports = function (app) {
    app.get('/api', RentalController.index);

    app.post('/api/rentals/new', RentalController.createRental);
    app.get('/api/rentals/:id', RentalController.findOneRental);

    // THIS ONE IS PLURAL -- "RENTALS"
    app.get('/api/rentals', RentalController.findAllRentals);


    app.put('/api/rentals/:id', RentalController.updateRental);

    app.delete('/api/rentals/:id', RentalController.deleteRental);
}