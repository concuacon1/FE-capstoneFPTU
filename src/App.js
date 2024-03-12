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
import AccountList from "./account-list/index";
import CreateProject from "./create-project/index"
import ListProject from "./projects_category/list-project"
import ProjectValue from "./projects_category/project-value"
import ProjectServices from "./projects/project-services"
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
        <Route path="/list-user-admin" element={<AccountList />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project-list" element={<ListProject />} />
        <Route path="/project/:project_id" element={<ProjectValue />} />
        <Route path="/service" element={<ProjectServices />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
