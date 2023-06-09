import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './container/Home';
import ExchangeDetail from './components/homeComponents/ExchangeDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currency/:id" element={<ExchangeDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
