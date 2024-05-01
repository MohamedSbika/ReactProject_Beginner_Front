import React, { useState, useEffect } from "react";
import axios from 'axios';

const CreateProjet = () => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [taches, setTaches] = useState([]);
    const [produits, setProduits] = useState([]);
    const [selectedTache, setSelectedTache] = useState('');
    const [selectedProduit, setSelectedProduit] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tachesResponse = await axios.get('http://localhost:3000/api/taches');
                setTaches(tachesResponse.data);
                const produitsResponse = await axios.get('http://localhost:3000/api/posts');
                setProduits(produitsResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await axios.post('http://localhost:3000/api/projets', {
                nom: nom,
                description: description,
                taches: [selectedTache],
                produits: [selectedProduit]
            });
            console.log('Projet créé avec succès !');
            window.location.href = '/listeprojet';
        } catch (error) {
            console.error('Erreur lors de la création du projet :', error);
        }
    };

    return (
        <div className="container">
            <h1>Créer un projet</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom :</label>
                    <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description :</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Sélectionner une tâche :</label>
                    <select className="form-control" onChange={(e) => {
                        taches?.map(tache=> {if (tache.nom === e.target.value) setSelectedTache(tache?.id)})
                    }} required>
                        <option value="">Sélectionner une tâche</option>
                        {taches.map((tache) => (
                            <option key={tache._id} value={tache._id}>{tache.nom}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Sélectionner un produit :</label>
                    <select className="form-control"     onChange={(e) => {
                        produits.map(prod=> {if(prod.cadre === e.target.value){
                            setSelectedProduit(prod?.id);
                        }})
                        }} required>
                        <option value="">Sélectionner un produit</option>
                        {produits.map((produit) => (
                            <option key={produit._id} value={produit._id}>{produit.cadre}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Créer Projet</button>
            </form>
        </div>
    );
};

export default CreateProjet;
