import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
   <Router basename="/wa9et_store">
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}

export default App;