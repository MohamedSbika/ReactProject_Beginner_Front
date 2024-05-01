import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const EstimationProjet = () => {
    const [cadres, setCadres] = useState([]);
    const [selectedCadre, setSelectedCadre] = useState("");
    const [quantitesEstimees, setQuantitesEstimees] = useState({}); 
    const [estimations, setEstimations] = useState(null); 
    const [quantites, setQuantites] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                const data = response.data;
                setCadres(data.map(post => post.cadre));

                const initialQuantitesEstimees = {};
                const initialQuantites = {};
                data.forEach(post => {
                    initialQuantitesEstimees[post.cadre] = 0;
                    initialQuantites[post.cadre] = {
                        roue: post.roue,
                        pedale: post.pedale,
                        guidon: post.guidon,
                        vises: post.vises,
                        temps: post.temps
                    };
                });
                setQuantitesEstimees(initialQuantitesEstimees);
                setQuantites(initialQuantites);
            } catch (error) {
                console.error('Erreur lors de la récupération des cadres :', error);
            }
        };
        fetchData();
    }, []);

    const handleCadreChange = (e) => {
        setSelectedCadre(e.target.value);
    };

    const handleQuantiteChange = (cadre, e) => {
        const value = Math.max(0, parseInt(e.target.value));
        setQuantitesEstimees(prevQuantites => ({
            ...prevQuantites,
            [cadre]: value
        }));
    };

    const calculerEstimation = () => {
        const totalEstimation = {};
        cadres.forEach(cadre => {
            totalEstimation[cadre] = {
                roue: quantites[cadre].roue * quantitesEstimees[cadre],
                pedale: quantites[cadre].pedale * quantitesEstimees[cadre],
                guidon: quantites[cadre].guidon * quantitesEstimees[cadre],
                vises: quantites[cadre].vises * quantitesEstimees[cadre],
                temps: quantites[cadre].temps * quantitesEstimees[cadre]
            };
        });
        setEstimations(totalEstimation);
    };

    const handleClick = () => {
        calculerEstimation();
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Estimation de projet</h1>

            {cadres.map(cadre => (
                <div className="form-group" key={cadre}>
                    <label>Quantité estimée pour {cadre} :</label>
                    <input
                        type="number"
                        value={quantitesEstimees[cadre] || 0}
                        onChange={(e) => handleQuantiteChange(cadre, e)}
                    />
                </div>
            ))}
            <button className="custom-button" onClick={handleClick}>
                Calculer l'estimation
            </button>

            {estimations && (
                <div>
                    <h2>Résultat de l'estimation :</h2>
                    {cadres.map(cadre => (
                        <div key={cadre}>
                            <h3>{cadre} :</h3>
                            <p>Quantité estimée de roues : {estimations[cadre].roue}</p>
                            <p>Quantité estimée de pédales : {estimations[cadre].pedale}</p>
                            <p>Quantité estimée de guidons : {estimations[cadre].guidon}</p>
                            <p>Quantité estimée de vises : {estimations[cadre].vises}</p>
                            <p>Temps estimé nécessaire : {estimations[cadre].temps} minutes = {Math.floor(estimations[cadre].temps / 60)} heures et {estimations[cadre].temps % 60} minutes</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EstimationProjet;
