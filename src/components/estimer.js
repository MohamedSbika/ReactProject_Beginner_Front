import React, { useState, useEffect } from "react";
import axios from "axios";

const EstimationProduit = () => {
    const [cadres, setCadres] = useState([]);
    const [selectedCadre, setSelectedCadre] = useState("");
    const [nombreProduits, setNombreProduits] = useState(0);
    const [estimations, setEstimations] = useState(null);
    const [quantites, setQuantites] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                const data = response.data;
                setCadres(data.map(post => post.cadre)); 

                const quantitesData = {};
                data.forEach(post => {
                    quantitesData[post.cadre] = {
                        roue: post.roue,
                        pedale: post.pedale,
                        guidon: post.guidon,
                        vises: post.vises,
                        temps: post.temps
                    };
                });
                setQuantites(quantitesData);
            } catch (error) {
                console.error('Erreur lors de la récupération des cadres :', error);
            }
        };
        fetchData();
    }, []);

    const handleCadreChange = (e) => {
        setSelectedCadre(e.target.value);
    };

    const handleNombreProduitsChange = (e) => {
        setNombreProduits(Math.max(0, parseInt(e.target.value)));
    };

    const calculerEstimation = () => {
        if (selectedCadre && nombreProduits > 0) {
            const quantitesCadre = quantites[selectedCadre];
            const estimation = {
                roue: quantitesCadre.roue * nombreProduits,
                pedale: quantitesCadre.pedale * nombreProduits,
                guidon: quantitesCadre.guidon * nombreProduits,
                vises: quantitesCadre.vises * nombreProduits,
                temps: quantitesCadre.temps * nombreProduits
            };
            setEstimations(estimation);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Estimation de quantité de produits</h1>
            <div className="form-group">
                <label>Nombre de produits :</label>
                <input
                    type="number"
                    value={nombreProduits}
                    onChange={handleNombreProduitsChange}
                />
            </div>
            <div className="form-group">
                <label>Choisissez le type de cadre :</label>
                <select value={selectedCadre} onChange={handleCadreChange}>
                    <option value="">Sélectionnez un cadre</option>
                    {cadres.map(cadre => (
                        <option key={cadre} value={cadre}>{cadre}</option>
                    ))}
                </select>
            </div>
            <button className="custom-button" onClick={calculerEstimation}>
                Calculer l'estimation
            </button>

            {estimations && (
                <div>
                    <h2>Résultat de l'estimation :</h2>
                    <p>Quantité estimée de roues : {estimations.roue}</p>
                    <p>Quantité estimée de pédales : {estimations.pedale}</p>
                    <p>Quantité estimée de guidons : {estimations.guidon}</p>
                    <p>Quantité estimée de vises : {estimations.vises}</p>
                    <p>Temps estimé nécessaire : {estimations.temps} minutes = {Math.floor(estimations.temps / 60)} heures et {estimations.temps % 60} minutes</p>
                </div>
            )}
        </div>
    );
};

export default EstimationProduit;
