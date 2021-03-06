import { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';



function EditRental(props) {
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [newConstruction, setNewConstruction] = useState(false);
    const [propertyType, setPropertyType] = useState('');

    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8000/api/rentals/' + props.id)
            .then(response => {
                const { address, imageUrl, newConstruction, propertyType } = response.data;
                setAddress(address);
                setImageUrl(imageUrl);
                setNewConstruction(newConstruction);
                setPropertyType(propertyType);
                setLoaded(true);
            })
    }, []);



    function handleSubmit(event) {
        event.preventDefault();
        console.log('default prevented!');
        setErrors([]);
        console.log(address, imageUrl, newConstruction, propertyType);

        axios.put('http://localhost:8000/api/rentals/' + props.id, {
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

    if (!loaded) return 'Loading...';

    return (
        <div>
            {errors.map((err, idx) => <p key={idx} style={{ color: 'red' }}>{err}</p>)}
            <h1>Edit a Rental</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address</label>
                    <input value={address} onChange={event => setAddress(event.target.value)} />
                </div>
                <div>
                    <label>Image URL</label>
                    <input value={imageUrl} onChange={event => setImageUrl(event.target.value)} />
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={newConstruction} onChange={event => setNewConstruction(event.target.checked)} />
                        New Consrtuction</label>
                </div>
                <div>
                    <label>Property Type</label>
                    <select value={propertyType} onChange={event => setPropertyType(event.target.value)}>
                        <option>Please select</option>
                        <option value="Single Family" >Single Family</option>
                        <option value="Apartment" >Apartment</option>
                        <option value="Condo" >Condo</option>
                    </select>
                </div>
                <button>Submit !</button>
            </form>
        </div>
    )
}

export default EditRental;