import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTache = () => {
    const navigate = useNavigate();
    const [newTache, setNewTache] = useState({
    });

    const handleChange = (e) => {
        setNewTache({
            ...newTache,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/taches', newTache);
            navigate('/taches');
        } catch (error) {
            console.error('Erreur lors de la création de la tâche :', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Créer une nouvelle tâche</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom de la tâche</label>
                    <input
                        type="text"
                        name="nom"
                        value={newTache.nom}
                        onChange={handleChange}
                        required
                        placeholder="Entrer le nom de la tâche"
                    />
                </div>
                <div className="form-group">
                    <label>Description de la tâche</label>
                    <textarea
                        name="description"
                        value={newTache.description}
                        onChange={handleChange}
                        required
                        placeholder="Entrer la description de la tâche"
                    />
                </div>
                <div className="form-group">
                    <label>Date de début</label>
                    <input
                        type="date"
                        name="dateDebut"
                        value={newTache.dateDebut}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de fin</label>
                    <input
                        type="date"
                        name="dateFin"
                        value={newTache.dateFin}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Statut de la tâche</label>
                    <select
    name="statut"
    value={newTache.statut}
    onChange={handleChange}
    required
>
    <option key="En cours" value="En cours">En cours</option>
    <option key="Terminée" value="Terminée">Terminée</option>
    <option key="En attente" value="En attente">En attente</option>
</select>
                </div>
                <button className="custom-button" type="submit">
                    Créer la tâche
                </button>
            </form>
        </div>
    );
};

export default CreateTache;
