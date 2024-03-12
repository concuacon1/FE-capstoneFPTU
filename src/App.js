import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import './index.css'
import Register from "./register/index"
import RegisterCustomer from "./register-customer/index"
import HomePage from "./homePage/index"
import RegisterDesigner from './register-designer/index'
import EditPasswordOtp from './edit-password-otp'
import ChangePassword from "./change-password/index"
import Login from "./login/index"
import 'react-toastify/dist/ReactToastify.css';
import ListProject from "./projects/list-project"
import ProjectValue from "./projects/project-value"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register-customer" element={<RegisterCustomer />} />
        <Route path="/register-designer" element={<RegisterDesigner />} />
        <Route path="/edit-password" element={<ChangePassword />} />
        <Route path="/edit-password-otp" element={<EditPasswordOtp />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project-list" element={<ListProject />} />
        <Route path="/project/:project_id" element={<ProjectValue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
