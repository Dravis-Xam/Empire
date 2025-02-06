
import './App.css'
import Cart from './components/cart/Cart'
import Header from './components/header/Header'
import Profile from './components/header/Profile'
import SignIn from './components/header/SignIn'
import SignUp from './components/header/SignUp'

function App() {

  return (
    <>

      <Header />
      <SignIn />
      <SignUp />
      <Cart />
      <Profile />
    </>
  )
}

export default App
