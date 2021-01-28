import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Detail = props => {
    const [rental, setRental] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/rentals/' + props.id)
            .then(res => {
                setRental(res.data)
            })
            .catch(err => console.log(err));
    }, [props.id])


    return (
        <div className="detail-wrapper">
            <h1>{rental.address}</h1>
            <div className="details">
                <img src={rental.imageUrl} alt={rental.address} />
                <div className="content">
                    <h2>Address: <span>{rental.address}</span></h2>
                    <h2>New Construction:  <span>{rental.newConstruction ? "Yes" : "No"}</span></h2>
                    <h2>Property Type: <span>{rental.propertyType}</span></h2>
                </div>
            </div>
        </div>
    )

}

export default Detail;