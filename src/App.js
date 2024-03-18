import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AboutScreen from './about-screen/about_screen';
import AccountList from "./account-list/index";
import ChangePassword from "./change-password/index";
import CreateProject from "./create-project/index";
import DesignerList from './designer-list';
import EditPasswordOtp from './edit-password-otp';
import HomePage from "./homePage/index";
import './index.css';
import Login from "./login/index";
import ProjectServices from "./projects/project-services";
import ListProject from "./projects_category/list-project";
import ProjectValue from "./projects_category/project-value";
import RegisterCustomer from "./register-customer/index";
import RegisterDesigner from './register-designer/index';
import Register from "./register/index";
import StaffList from './staff-list';


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
        <Route path="/list-user-staff" element={<StaffList />} />
        <Route path="/list-user-designer" element={<DesignerList />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project-list" element={<ListProject />} />
        <Route path="/project/:project_id" element={<ProjectValue />} />
        <Route path="/service" element={<ProjectServices />} />
        <Route path="/about-screen" element={<AboutScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
