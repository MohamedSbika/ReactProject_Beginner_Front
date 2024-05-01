import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const ListeProjet = () => { 
    const [projets, setProjets] = useState([]);
    const [reloadData, setReloadData] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/projets');
                if (response) {
                    setProjets(response.data);
                }
            } catch (error){
                console.error('Erreur lors de la récupération des projets :', error);
            }
        };
        fetchData();
    }, [reloadData]); 

    const DeleteProjet = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/projets/${id}`);
            setReloadData(!reloadData); 
        } catch (error){
            console.error('Erreur lors de la suppression du projet :', error);
        }
    };


    return (
        <div className="container">
            <div className="flex">
                <h1>Liste des projets</h1>
                <Link className="btn-primary" to='/projet/create'>Créer un projet</Link>
                <Link className="btn-primary" to='/produit'>les produits</Link>
                <Link className="btn-primary" to='/taches'>les taches</Link>
            </div>
            <div>
                {projets.map((projet) => ( 
                    <div key={projet._id} className="list-group-item">
                        <div>
                            <h3>Nom : {projet.nom}</h3>
                            <p>Description : {projet.description}</p>
                            <h4>Tâches :</h4>
                            <ul>
                                {projet.taches.map((tache) => (
                                    <li key={tache._id}>{tache.nom}</li>
                                ))}
                            </ul>
                            <h4>Produits :</h4>
                            <ul>
                                {projet.produits.map((produit) => (
                                    <li key={produit._id}>{produit.cadre}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => DeleteProjet(projet._id)}
                                className="btn-danger"
                            >
                                Supprimer
                            </button>

                        </div> 
                    </div> 
                ))}
            </div> 
        </div>
    );
};

export default ListeProjet;
