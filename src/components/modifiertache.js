import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './modifiertache.css'


const Modifiertache = () => {
    const [tache, setTache] = useState({
        nom: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        statut: '',
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/taches/${id}`);
                if (response.data) {
                    setTache(response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la tâche :', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTache({
            ...tache,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/taches/${id}`, tache);
            console.log('Tâche mise à jour avec succès !');
            window.location.href = '/taches'; 
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la tâche :', error);
        }
    };

    return (
        <div className="container">
            <h1>Modifier Tâche</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom de la tâche:</label>
                    <input type="text" className="form-control" name="nom" value={tache.nom} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description de la tâche:</label>
                    <textarea className="form-control" name="description" value={tache.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Date de début:</label>
                    <input type="date" className="form-control" name="dateDebut" value={tache.dateDebut.slice(0, 10)} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Date de fin:</label>
                    <input type="date" className="form-control" name="dateFin" value={tache.dateFin.slice(0, 10)} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Statut de la tâche:</label>
                    <select name="statut" className="form-control" value={tache.statut} onChange={handleChange} required>
                        <option value="En cours">En cours</option>
                        <option value="Terminée">Terminée</option>
                        <option value="En attente">En attente</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Modifier Tâche</button>
            </form>
        </div>
    );
};

export default Modifiertache;
