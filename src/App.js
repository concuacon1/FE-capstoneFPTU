import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import './index.css'
import Register from "./register/index"
import RegisterDesigner from "./register-designer/index"
import HomePage from "./homePage/index"
import ListProject from "./project/list-project"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register-designer" element={<RegisterDesigner />} />

        <Route path="/home-page" element={<HomePage />} />
        <Route path="/project-list" element={<ListProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
