// App.js
import './App.css';
import { useSelector } from 'react-redux';
import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Item from './components/item/Item';
import Profile from './components/Profile/Profile';
import items from './modules/items';
import Hero from './components/hero/Hero';
import Footer from './components/footer/Footer';

function App() {
  const isCartVisible = useSelector((state) => state.visibility.isVisible);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Hero />
      {isCartVisible && <Cart />}
      {isAuthenticated && <Profile />}
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