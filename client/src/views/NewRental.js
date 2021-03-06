import { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';



function NewRental() {
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [newConstruction, setNewConstruction] = useState(true);
    const [propertyType, setPropertyType] = useState('');
    const [errors, setErrors] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();


        axios.post('http://localhost:8000/api/rentals/new', {
            address,
            imageUrl,
            newConstruction,
            propertyType
        })
            .then(() => navigate('/rentals'))
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div className="form-container">
            <div className="new-wrapper">
                {errors.map((err, idx) => <p key={idx} style={{ color: 'red' }}>{err}</p>)}
                <h1>Add a Rental</h1>


                {/* NEW RENTAL FORM START */}
                <form onSubmit={handleSubmit}>
                    <div className="feild">
                        <label>Address</label>
                        <input value={address} onChange={event => setAddress(event.target.value)} />
                    </div>

                    <div className="feild">
                        <label>Image URL</label>
                        <input value={imageUrl} onChange={event => setImageUrl(event.target.value)} />
                    </div>

                    <div className="feild">
                        <label>
                            <input
                                type="checkbox"
                                checked={newConstruction}
                                onChange={event => setNewConstruction(event.target.checked)} />
                        New Consrtuction</label>
                    </div>

                    <div className="feild">
                        <label>Property Type</label>
                        <select value={propertyType} onChange={event => setPropertyType(event.target.value)}>
                            <option>Please select</option>
                            <option value="Single Family" >Single Family</option>
                            <option value="Apartment" >Apartment</option>
                            <option value="Condo" >Condo</option>
                        </select>
                    </div>

                    <button className="clicker">Submit</button>
                </form>

            </div>
        </div>
    )
}

export default NewRental;