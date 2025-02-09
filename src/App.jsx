import './App.css';
import { useSelector } from 'react-redux'; 
import Cart from './components/cart/Cart.jsx';
import Header from './components/header/Header';
import Item from './components/item/Item.jsx';
import Profile from './components/Profile/Profile.jsx';
import SignIn from './components/SignIn|signup/SignIn';
import SignUp from './components/SignIn|signup/SignUp';
import items from './modules/items.jsx';
import Hero from './components/hero/Hero.jsx';

function App() {
    const isCartVisible = useSelector((state) => state.visibility.isVisible);
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    return (
        <>
            <Header />
            <Hero />
            {!isSignedIn && <SignIn />}
            {!isSignedIn && <SignUp />}
            {isCartVisible && <Cart />}
            {isSignedIn && <Profile />}
            <section className="items-card-container">
                {items.map((e) => (
                    <Item key={e.id} prop={e} />
                ))}
            </section>
        </>
    );
}

export default App;