import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import EditStudent from './components/editStudent/EditStudent';
import Home from './components/home/Home';
import Navigation from './components/navigation/Navigation';
import NotFound from './components/notfound/NotFound';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editStudent/:id" element={<EditStudent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
