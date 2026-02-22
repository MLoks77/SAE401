import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Analyse from './pages/Analyse';
import Carte from './pages/carte';
import GraphCreation from './pages/graphCreation';
import GridCompar from './pages/gridCompar';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Analyse />} /> {/* page par défault */}
          <Route path="/carte" element={<Carte />} />
          <Route path="/gridCompar" element={<GridCompar />} />
          <Route path="/graphCreation" element={<GraphCreation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
