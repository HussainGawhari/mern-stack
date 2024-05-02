import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Project from './pages/Project';
import Header from './components/Header';
import FooterComponent from './components/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';




export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/sign-in' element = {<SignIn />} />
        <Route path = '/sign-up' element = {<SignUp />} />
        <Route path = '/about' element = {<About/>} />
        <Route path = '/dashboard' element = {<Dashboard/>} />
        <Route path = '/project' element = {<Project/>} />
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
  )
}


