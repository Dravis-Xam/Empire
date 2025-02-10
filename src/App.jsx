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
import Footer from './components/footer/Footer.jsx';

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
                <h1 className='items-on-sale-title'>Items On Sale</h1>
                {items.map((e, index) => (
                    <Item key={index} prop={e} />
                ))}
            </section>
            <Footer />
        </>
    );
}

export default App;