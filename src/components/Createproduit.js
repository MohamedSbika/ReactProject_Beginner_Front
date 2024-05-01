import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './createproduit.css';

const CreateProduit = () => {
    const navigate = useNavigate();
    const [newProduit, setNewProduit] = useState({});

    const handleChange = (e) => {
        setNewProduit({
            ...newProduit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/posts', newProduit);
            navigate('/produit');
        } catch (error){
            console.error('error creating produit',error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">create produit</h1>
            <div className="form-froup">
                <div className="form-control">
                    <label> cadre </label>
                    <input
                    type="text"
                    name="cadre"
                    onChange={handleChange}
                    required
                    placeholder="enter name"
                     />
                </div>
                <div className="form-control">
                    <label> roue </label>
                    <input
                    type="number"
                    name="roue"
                    onChange={handleChange}
                    required
                    placeholder="entrer le nombre des roues"
                     />
                </div> <div className="form-control">
                    <label> pedale </label>
                    <input
                    type="number"
                    name="pedale"
                    onChange={handleChange}
                    required
                    placeholder="entrer le nombre de pedales"
                     />
                </div> <div className="form-control">
                    <label> guidon </label>
                    <input
                    type="number"
                    name="guidon"
                    onChange={handleChange}
                    required
                    placeholder="entrer le nombre de guidons "
                     />
                </div>
                </div> <div className="form-control">
                    <label> vises </label>
                    <input
                    type="number"
                    name="vises"
                    onChange={handleChange}
                    required
                    placeholder="entrer le nombre de vises "
                     />
                </div>
                <div className="form-control">
                    <label> temps </label>
                    <input
                    type="number"
                    name="temps"
                    onChange={handleChange}
                    required
                    placeholder="entrer temps necessaire en minutes "
                     />
                </div>
                <button className="custom-button" type="submit" onClick={handleSubmit}>
                    create produit 

                </button>
                

            </div>
    
    );


};
export default CreateProduit ;