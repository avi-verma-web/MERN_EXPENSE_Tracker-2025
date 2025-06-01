import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HeroSection from './Components/Home/HomePage'
import PublicNavbar from './Components/Navbar/PublicNavbar'
import LoginForm from './Components/Users/Login'
import RegistrationForm from './Components/Users/Register'
import PrivateNavbar from './Components/Navbar/PrivateNavbar'
import AddCategory from "./Components/Category/AddCategory"
import CategoriesList from "./Components/Category/CategoriesList"

import { useSelector } from 'react-redux'
import UpdateCategory from './Components/Category/UpdateCategory'
import TransactionForm from './Components/Transactions/TransactionForm'
import Dashboard from './Components/Users/Dashboard'
import UserProfile from './Components/Users/UserProfile'

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      {user ? <PrivateNavbar></PrivateNavbar> : <PublicNavbar></PublicNavbar>}
      <Routes>
        <Route path='/' element={<HeroSection></HeroSection>}></Route>
        <Route path='/login' element={<LoginForm></LoginForm>}></Route>
        <Route path='/register' element={<RegistrationForm></RegistrationForm>}></Route>
        <Route path='/add-category' element={<AddCategory></AddCategory>}></Route>
        <Route path='/categories' element={<CategoriesList></CategoriesList>}></Route>
        <Route path='/update-category/:id' element={<UpdateCategory></UpdateCategory>}></Route>
        <Route path='/add-transaction' element={<TransactionForm></TransactionForm>}></Route>
        <Route path='/update-transaction/:id' element={<TransactionForm></TransactionForm>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
