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
import AuthRoute from './Components/AuthRoute/AuthRoute'

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      {user ? <PrivateNavbar></PrivateNavbar> : <PublicNavbar></PublicNavbar>}
      <Routes>
        <Route path='/' element={<HeroSection></HeroSection>}></Route>
        <Route path='/login' element={<AuthRoute requiresAuth={false}>
          <LoginForm></LoginForm>
        </AuthRoute>}></Route>
        <Route path='/register' element={<AuthRoute requiresAuth={false}>
          <RegistrationForm></RegistrationForm>
        </AuthRoute>}></Route>
        <Route path='/add-category' element={<AuthRoute>
          <AddCategory></AddCategory>
        </AuthRoute>}></Route>
        <Route path='/categories' element={<AuthRoute>
          <CategoriesList></CategoriesList>
        </AuthRoute>}></Route>
        <Route path='/update-category/:id' element={<AuthRoute>
          <UpdateCategory></UpdateCategory>
        </AuthRoute>}></Route>
        <Route path='/add-transaction' element={<AuthRoute>
          <TransactionForm></TransactionForm>
        </AuthRoute>}></Route>
        <Route path='/update-transaction/:id' element={<AuthRoute>
          <TransactionForm></TransactionForm>
        </AuthRoute>}></Route>
        <Route path='/dashboard' element={<AuthRoute>
          <Dashboard></Dashboard>
        </AuthRoute>}></Route>
        <Route path='/profile' element={<AuthRoute>
          <UserProfile></UserProfile>
        </AuthRoute>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
