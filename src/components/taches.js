import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import './taches.css';
import { Link } from 'react-router-dom';

const Taches = () => {
    const [taches, setTaches] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tachesResponse = await axios.get('http://localhost:3000/api/taches');
                setTaches(tachesResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des tâches :', error);
            }
        };
        fetchData();
    }, []);

    const DeleteTache = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/taches/${id}`);
            const response = await axios.get('http://localhost:3000/api/taches');
            setDeleteMsg(true);
            setTaches(response.data);
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche :', error);
        }
    };
    

    return (
        <div className="container">
            <h1>Liste des Tâches</h1>
            <Link className="btn-primary" to='/createtache'>Créer une tache</Link>
            <Link className="btn-primary" to='/produit'>liste des produit</Link>
            <Link className="btn-primary" to='/listeprojet'>listes des projet</Link>
            {deleteMsg && 
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                    Le produit est supprimé avec succès
                </div>
            }
            <div className="flex">
                <ul>
                    {taches.map((tache) => (
                        <li key={tache._id} className="list-group-item">
                            <h5>{tache.nom}</h5>
                            <p>{tache.description}</p>
                            <p>Date de début : {tache.dateDebut}</p>
                            <p>Date de fin : {tache.dateFin}</p>
                            <p>Statut : {tache.statut}</p>
                            <button
                                onClick={() => DeleteTache(tache.id)}
                                className="btn-danger"
                            >
                                Supprimer
                            </button>
                            <Link to={`/tache/modifier/${tache.id}`} className="btn-primary">
                                Modifier
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Taches;
