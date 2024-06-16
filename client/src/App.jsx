import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import Form from './pages/form';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/:formType" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
