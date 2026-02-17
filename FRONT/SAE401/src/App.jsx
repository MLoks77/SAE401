import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Analyse from './pages/Analyse';
import Carte from './pages/carte';
import GraphCreation from './pages/graphCreation';
import GridCompar from './pages/gridCompar';

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Analyse />} />
          <Route path="/carte" element={<Carte />} />
          <Route path="/gridCompar" element={<GridCompar />} />
          <Route path="/graphCreation" element={<GraphCreation />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
