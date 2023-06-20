import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './container/Home';
import Header from './components/headerFooter/Header';
import ExchangeDetail from './components/homeComponents/ExchangeDetails';
import Footer from './components/headerFooter/Footer';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currency/:id" element={<ExchangeDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
