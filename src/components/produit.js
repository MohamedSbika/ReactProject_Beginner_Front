import React, { useState, useEffect ,useRef } from "react";
import axios from 'axios'
import './produit.css'
import { Link } from "react-router-dom";

const Produit = () => { 
    const [produits, setProduits] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts')
                if (response) {
                    setProduits(response.data)
                }
            } catch (error){
                console.error('something went wrong', error);
            }
        };
        fetchData();
    }, [])

    const DeleteProduit = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${id}`);
            // Mettre à jour les produits après la suppression
            const response = await axios.get('http://localhost:3000/api/posts');
            setDeleteMsg(true)
            inputRef.current.scrollIntoView({ behavior:'smooth'});
            setProduits(response.data);
        } catch (error){
            console.error('something went wrong!!!!!', error);
        }
    };

    return (
        <div className="container" ref={inputRef}>
            <div className="flex">
                <h1>Liste des produits </h1>
                <Link className="btn-primary" to='/produit/create'>Créer un produit</Link>
                <Link className="btn-primary" to='/taches'>liste des taches</Link>
                <Link className="btn-primary" to='/listeprojet'>listes des projet</Link>
                <Link className="btn-primary" to='/estimation'>estimer</Link>

            </div>
            {deleteMsg && 
                <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                    Le produit est supprimé avec succès
                </div>
            }
            <div>
                {produits.map((produit) => ( 
                    <div key={produit.id} className="list-group-item">
                        <div>
                            <h3>Nom : {produit.cadre}</h3>
                            <p>Roue : {produit.roue} </p>
                            <p>Pédale : {produit.pedale} </p>
                            <p>Guidon : {produit.guidon} </p>
                            <p>Vises : {produit.vises} </p>
                            <p>Temps : {produit.temps} </p>
                            <button
                                onClick={() => DeleteProduit(produit.id)}
                                className="btn-danger"
                            >
                                Supprimer
                            </button>
                            <Link to={`/produit/modifier/${produit.id}`} className="btn-primary">
                                Modifier
                            </Link>
                        </div> 
                    </div> 
                ))}
            </div> 
        </div>
    )
}

export default Produit;
