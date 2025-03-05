import React, { useState } from 'react';
import TransactionRow from './TransactionRow'

const AdminPage = () => {
    const [isManageVisible, setIsManageVisible] = useState(false);

    // State to manage the current status
    const [status, setStatus] = useState("Delivered");
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        itemId: 0, // Will be auto-generated
        details: {
            ram: '',
            i_storage: '',
            p_speed: '',
            i_resolution: '',
            b_life: '',
            b_capacity: '',
            look: '',
            image: '',
        },
        quantity: 0,
        brand: '',
    });

    const transactions = [
        { id: 1, customer: "John Doe", items: "Oppo", amount: "$100", initialStatus: "Pending" },
        { id: 2, customer: "Jane Smith", items: "Iphone", amount: "$200", initialStatus: "In Delivery" },
        { id: 3, customer: "Alice Johnson", items: "Iphone", amount: "$150", initialStatus: "Delivered" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('details.')) {
            const detailField = name.split('.')[1];
            setProduct({
                ...product,
                details: {
                    ...product.details,
                    [detailField]: value,
                },
            });
        } else {
            setProduct({
                ...product,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic client-side validation
        if (!product.name || !product.price || !product.brand) {
            alert('Please fill in all required fields.');
            return;
        }
    
        if (isLoading) return; // Prevent multiple submissions
    
        setIsLoading(true);
    
        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
    
            if (!response.ok) {
                const errorText = await response.text(); // Log the raw response
                console.error('Server error:', errorText);
                throw new Error('Failed to add product');
            }
    
            const newProduct = await response.json();
            console.log('Product added successfully:', newProduct);
            alert('Product added successfully!');
    
            // Reset the form
            setProduct({
                name: '',
                price: 0,
                itemId: 0,
                details: {
                    ram: '',
                    i_storage: '',
                    p_speed: '',
                    i_resolution: '',
                    b_life: '',
                    b_capacity: '',
                    look: '',
                    image: '',
                },
                quantity: 0,
                brand: '',
            });
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus); // Update the status
        setIsManageVisible(false); // Hide the manage buttons popup
    };

    return (
        <div className="admin-container">
            <button className={`hamburger ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>Admin Panel</h2>
                <ul>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'dashboard' ? 'active' : ''}
                            onClick={() => setActiveTab('dashboard')}
                        >
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'transactions' ? 'active' : ''}
                            onClick={() => setActiveTab('transactions')}
                        >
                            Transactions & Deliveries
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'products' ? 'active' : ''}
                            onClick={() => setActiveTab('products')}
                        >
                            Manage Products
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={activeTab === 'reports' ? 'active' : ''}
                            onClick={() => setActiveTab('reports')}
                        >
                            Reports & Issues
                        </a>
                    </li>
                </ul>
            </aside>

            <main className="main-content">
                <header className="header">
                    <h1>Welcome, Admin</h1>
                    <div className="user-info">
                        <span>John Doe</span>
                        <img src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" style={{height: "30px", width: "30px"}} alt="User Avatar" />
                    </div>
                </header>

                <section className="content">
                    {activeTab === 'dashboard' && (
                        <>
                            <div className="card">
                                <h3>Statistics</h3>
                                <p>Here are your latest stats.</p>
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <span className="stat-value">1,234</span>
                                        <span className="stat-label">Total Sales</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">567</span>
                                        <span className="stat-label">New Orders</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-value">89%</span>
                                        <span className="stat-label">Customer Satisfaction</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <h3>Recent Activity</h3>
                                <ul className="activity-list">
                                    <li>Order #1234 was delivered.</li>
                                    <li>New product added: Product X.</li>
                                    <li>Customer complaint resolved.</li>
                                </ul>
                            </div>
                            <div className="card">
                                <h3>Notifications</h3>
                                <ul className="notification-list">
                                    <li>You have 3 new orders.</li>
                                    <li>Low stock alert for Product Y.</li>
                                    <li>New customer registered.</li>
                                </ul>
                            </div>
                        </>
                    )}

                    {activeTab === 'transactions' && (
                        <div className="card">
                            <h3>Transactions & Deliveries</h3>
                            <table className="transactions-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <TransactionRow
                                        key={transaction.id}
                                        id={transaction.id}
                                        customer={transaction.customer}
                                        items={transaction.items}
                                        amount={transaction.amount}
                                        initialStatus={transaction.initialStatus}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="card">
                            <h3>Manage Products</h3>
                            <form className="product-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Product Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={product.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ram">RAM</label>
                                    <input
                                        type="text"
                                        id="ram"
                                        name="details.ram"
                                        value={product.details.ram}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="i_storage">Internal Storage</label>
                                    <input
                                        type="text"
                                        id="i_storage"
                                        name="details.i_storage"
                                        value={product.details.i_storage}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="p_speed">Processor Speed</label>
                                    <input
                                        type="text"
                                        id="p_speed"
                                        name="details.p_speed"
                                        value={product.details.p_speed}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="i_resolution">Image Resolution</label>
                                    <input
                                        type="text"
                                        id="i_resolution"
                                        name="details.i_resolution"
                                        value={product.details.i_resolution}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="b_life">Battery Life</label>
                                    <input
                                        type="text"
                                        id="b_life"
                                        name="details.b_life"
                                        value={product.details.b_life}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="b_capacity">Battery Capacity</label>
                                    <input
                                        type="text"
                                        id="b_capacity"
                                        name="details.b_capacity"
                                        value={product.details.b_capacity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="look">Look</label>
                                    <input
                                        type="text"
                                        id="look"
                                        name="details.look"
                                        value={product.details.look}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image URL</label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="details.image"
                                        value={product.details.image}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={product.brand}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-button">Add Product</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'reports' && (
                        <div className="card">
                            <h3>Reports & Issues</h3>
                            <div className="reports-grid">
                                <div className="report-item">
                                    <h4>Customer Complaints</h4>
                                    <ul>
                                        <li>Delayed delivery for Order #1234.</li>
                                        <li>Defective product received.</li>
                                    </ul>
                                </div>
                                <div className="report-item">
                                    <h4>System Reports</h4>
                                    <ul>
                                        <li>Low stock for Product X.</li>
                                        <li>High traffic on the website.</li>
                                    </ul>
                                </div>
                                <div className="report-item">
                                    <h4>Resolved Issues</h4>
                                    <ul>
                                        <li>Refund processed for Order #5678.</li>
                                        <li>Product Y restocked.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminPage;