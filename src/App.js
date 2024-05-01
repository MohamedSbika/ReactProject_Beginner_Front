import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Produit from './components/produit';
import CreateProduit from './components/Createproduit';
import EstimationProduit from './components/estimer';
import EstimationProjet from './components/projet';
import ModifierProduit from './components/modifierproduit';
import ListeProjet from './components/ListeProjet';
import CreateProjet from './components/createprojet';
import Taches from './components/taches';
import ModifierTache from './components/modifiertache';
import CreateTache from './components/createtache';
import ModifierProjet from './components/modifierprojet';
import BasicExample from './components/Nav';
import Login from './auth/login';
import Register from './auth/register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BasicExample/>
        <Routes>
          <Route path='/produit' element={<Produit />} />
          <Route path='/produit/create' element={<CreateProduit />} />
          <Route path='/estimation' element={<EstimationProduit />} />
          <Route path='/projet' element={<EstimationProjet />} />
          <Route path='/produit/modifier/:id' element={<ModifierProduit />} />
          <Route path='/listeprojet' element={<ListeProjet />} />
          <Route path='/projet/create' element={<CreateProjet />} />
          <Route path='/taches' element={<Taches />} />
          <Route path='/tache/modifier/:id' element={<ModifierTache />} />
          <Route path='/createtache' element={<CreateTache />} />
          <Route path='/projet/modifier/:id' element={<ModifierProjet />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
