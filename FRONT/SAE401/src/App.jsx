import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Analyse from './pages/Analyse';
import Carte from './pages/carte';
import GraphCreation from './pages/graphCreation';
import Comparaison from './pages/Comparaison';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Analyse />} /> {/* page par défault */}
          <Route path="/carte" element={<Carte />} />
          <Route path="/Comparaison" element={<Comparaison />} />
          <Route path="/graphCreation" element={<GraphCreation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
