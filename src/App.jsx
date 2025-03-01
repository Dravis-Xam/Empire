// App.js
import './App.css';
import { useSelector } from 'react-redux';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Footer from './components/footer/Footer';
import Item from './components/item/Item';
import items from './modules/items.js';
import Cart from './components/cart/Cart.jsx'
import { Outlet } from 'react-router-dom';
import WhatsappChat from './components/whatsapplink/WhatsappChat.jsx';

function App() {
  const isCartVisible = useSelector((state) => state.visibility.isVisible);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Hero />
      {isCartVisible && <Cart />} {/* Render Cart if visible */}
      <section className="items-card-container">
        <h1 className='items-on-sale-title'>Items On Sale</h1>
        {
          items.map((item) => (
            <Item key={item.itemId} prop={item} />
          ))
        }
       <Outlet /> {/* Render nested routes here */}
      </section>
      <WhatsappChat />
      <Footer />
    </>
  );
}

export default App;