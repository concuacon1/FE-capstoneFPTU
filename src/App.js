import React from 'react';
import { BrowserRouter, Route, Routes ,Switch } from 'react-router-dom';
import './index.css'
import Register from "./register/index"
import RegisterDesigner from "./register-designer/index"
import HomePage from "./homePage/index"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register-designer" element={<RegisterDesigner />} />

        <Route path="/home-page" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
