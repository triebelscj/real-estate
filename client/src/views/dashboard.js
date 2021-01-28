import React, { useState, useEffect } from 'react' // 
// for making requests
import axios from 'axios'
import { Link, navigate } from '@reach/router';


const Dashboard = () => {
    const [rentals, setRentals] = useState(null);

    //allows us to create side effects
    useEffect(() => {
        axios.get('http://localhost:8000/api/rentals')//returns promise!
            .then(response => setRentals(response.data))
        // would have to response.data.allRentals if rental.controller.js had both allRentals: allRentals

    }, []);// empty array means run this only the first render

    function handleLike(index) {
        //send request to backend
        const rentalToUpdate = rentals[index];

        axios.post('http://localhost:8000/api/rentals/' + rentalToUpdate._id + '/likes')
            .then(response => {
                const updatedRental = response.data;

                const clonedRentals = rentals.slice();//avoid mutating the current array

                clonedRentals[index] = updatedRental;

                setRentals(clonedRentals);
            })
    }
    function handleDelete(id) {
        console.log('delete id was clicked', id);

        //send request to the backend
        axios.delete('http://localhost:8000/api/rentals/' + id)
            .then(() => {
                //removes it from the frontend list
                const filtered = rentals.filter(rental => rental._id !== id);
                setRentals(filtered);// tells React to re-render
                alert('Successfully deleted!');// dont have to do!!
            })
    }

    if (rentals === null) return 'Loading...';//conditional Rendering, returns a string. shows the user we're waiting

    return (
        <div className="dashboard">
            <div className="nav">
                <h1>Rentals</h1>
                <Link className="add-link" style={{ color: 'whitesmoke', textDecoration: 'none' }} to="/rentals/new">Add New</Link>
            </div>
            <div className="container">
                {rentals.map((rental, idx) => (
                    <div key={rental._id}>
                        <img style={{ borderRadius: '10px', boxShadow: '3px 6px 20px black', paddingBottom: '25px', marginBottom: '25px' }} src={rental.imageUrl} alt={rental.address} width="350" />
                        <p>{rental.address}</p>
                        <p><b>{rental.propertyType}</b></p>
                        {rental.newConstruction ? <p><b>New Construction</b></p> : null}
                        <p>{rental.likes} Likes</p>

                        <button onClick={() => navigate('/rentals/' + rental._id + '/edit')}>Edit</button>
                        <button onClick={() => handleLike(idx)}>Like</button>
                        <button onClick={() => handleDelete(rental._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )


}

export default Dashboard;


