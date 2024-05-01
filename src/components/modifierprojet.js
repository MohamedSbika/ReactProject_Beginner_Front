import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ModifierProjet = () => {
    const { id } = useParams(); 

    const [projet, setProjet] = useState({});
    const [taches, setTaches] = useState([]);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProjet = await axios.get(`http://localhost:3000/api/projets/${id}`);
                setProjet(responseProjet.data);

                const responseTaches = await axios.get('http://localhost:3000/api/taches');
                setTaches(responseTaches.data);

                const responseProduits = await axios.get('http://localhost:3000/api/posts');
                setProduits(responseProduits.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await axios.put(`http://localhost:3000/api/projets/${id}`, {
                nom: projet.nom,
                description: projet.description,
                taches: projet.taches.map(tache => tache._id), 
                produits: projet.produits.map(produit => produit._id) 
            });
            console.log('Projet mis à jour avec succès !');
            window.location.href = '/listeprojet';
        } catch (error) {
            console.error('Erreur lors de la mise à jour du projet :', error);
        }
    };

    return (
        <div className="container">
            <h1>Modifier Projet</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom :</label>
                    <input type="text" className="form-control" value={projet.nom || ''} onChange={(e) => setProjet({ ...projet, nom: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Description :</label>
                    <textarea className="form-control" value={projet.description || ''} onChange={(e) => setProjet({ ...projet, description: e.target.value })} required />
                </div>
                <div className="form-group">
                    <label>Sélectionner une tâche :</label>
                    <select
                        className="form-control"
                        value={projet.taches || []} 
                        onChange={(e) => setProjet({ ...projet, taches: [e.target.value] })} 
                        required
                    >
                        <option value="">Sélectionner une tâche</option>
                        {taches.map((tache) => (
                            <option key={tache._id} value={tache._id}>
                                {tache.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Sélectionner un produit :</label>
                    <select
                        className="form-control"
                        value={projet.produits || []} 
                        onChange={(e) => setProjet({ ...projet, produits: [e.target.value] })} 
                        required
                    >
                        <option value="">Sélectionner un produit</option>
                        {produits.map((produit) => (
                            <option key={produit._id} value={produit._id}>
                                {produit.cadre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Modifier Projet</button>
            </form>
        </div>
    );
};

export default ModifierProjet;
