import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HeroSection from './Components/Home/HomePage'
import PublicNavbar from './Components/Navbar/PublicNavbar'
import LoginForm from './Components/Users/Login'
import RegistrationForm from './Components/Users/Register'


function App() {
  return (
    <BrowserRouter>
      <PublicNavbar></PublicNavbar>
      <Routes>
        <Route path='/' element={<HeroSection></HeroSection>}></Route>
        <Route path='/login' element={<LoginForm></LoginForm>}></Route>
        <Route path='/register' element={<RegistrationForm></RegistrationForm>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
