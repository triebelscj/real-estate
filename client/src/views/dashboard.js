import React, { useState, useEffect } from 'react' // 
// for making requests
import axios from 'axios'
import { Link, navigate } from '@reach/router';


const Dashboard = () => {
    const [rentals, setRentals] = useState(null);


    useEffect(() => {
        axios.get('http://localhost:8000/api/rentals')
            .then(response => setRentals(response.data))
    }, []);

    function handleLike(index) {
        const rentalToUpdate = rentals[index];

        axios.post('http://localhost:8000/api/rentals/' + rentalToUpdate._id + '/likes')
            .then(response => {
                const updatedRental = response.data;
                const clonedRentals = rentals.slice();
                clonedRentals[index] = updatedRental;
                setRentals(clonedRentals);
            })
    }
    function handleDelete(id) {
        console.log('Bitch got Deleted', id);

        axios.delete('http://localhost:8000/api/rentals/' + id)
            .then(() => {
                const filtered = rentals.filter(rental => rental._id !== id);
                setRentals(filtered);
                alert('Successfully deleted!');
            })
    }

    if (rentals === null) return 'Loading...';

    return (
        <div className="dashboard">
            <div className="nav">
                <h1>Rentals</h1>
                <Link className="add-link" style={{ color: 'whitesmoke', textDecoration: 'none' }} to="/rentals/new">Add New</Link>
            </div>
            <div className="container">

                {rentals.map((rental, idx) => (
                    <div className="dash-butt" key={rental._id}>
                        <img style={{ borderRadius: '10px', boxShadow: '3px 6px 20px black', paddingBottom: '25px', marginBottom: '25px' }} src={rental.imageUrl} alt={rental.address} width="350" />

                        <p>{rental.address}</p>

                        <p><b>{rental.propertyType}</b></p>

                        {rental.newConstruction ? <p><b>New Construction</b></p> : null}

                        <p>{rental.likes} Likes</p>



                        {/* --------BUTTONSSSSSSSSS--------- */}

                        <button className="yellow" onClick={() => navigate('/rentals/' + rental._id + '/edit')}>Edit</button>

                        <button className="green" style={{ textDecoration: "none" }} onClick={() => handleLike(idx)}><Link style={{ textDecoration: "none", color: 'black' }} to={`/rentals/${rental._id}`}>Like</Link></button>

                        <button className="red" onClick={() => handleDelete(rental._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )


}

export default Dashboard;


