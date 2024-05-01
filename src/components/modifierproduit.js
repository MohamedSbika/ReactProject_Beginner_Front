import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ModifierProduit = () => {
    const [produit, setProduit] = useState({
        cadre: '',
        roue: 0,
        pedale: 0,
        guidon: 0,
        vises: 0,
        temps: 0
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
                if (response.data) {
                    setProduit(response.data);
                }
            } catch (error) {
                console.error('something went wrong', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduit({
            ...produit,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/posts/${id}`, produit);
            console.log('Product updated successfully!');
            window.location.href = '/produit';
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container">
            <h1>Modifier Produit</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom du cadre:</label>
                    <input type="text" className="form-control" name="cadre" value={produit.cadre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Roue:</label>
                    <input type="number" className="form-control" name="roue" value={produit.roue} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Pédale:</label>
                    <input type="number" className="form-control" name="pedale" value={produit.pedale} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Guidon:</label>
                    <input type="number" className="form-control" name="guidon" value={produit.guidon} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Vises:</label>
                    <input type="number" className="form-control" name="vises" value={produit.vises} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Temps:</label>
                    <input type="number" className="form-control" name="temps" value={produit.temps} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Modifier Produit</button>
            </form>
        </div>
    );
};

export default ModifierProduit;
