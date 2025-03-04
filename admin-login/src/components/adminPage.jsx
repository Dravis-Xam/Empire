import React from 'react';

const AdminPage = () => {
    return (
        <div className="admin-container">
            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Settings</a></li>
                </ul>
            </aside>

            <main className="main-content">
                <header className="header">
                    <h1>Welcome, Admin</h1>
                    <div className="user-info">
                        <span>John Doe</span>
                        <img src="https://via.placeholder.com/40" alt="User Avatar" />
                    </div> 
                </header>

                <section className="content">
                    <div className="card">
                        <h3>Statistics</h3>
                        <p>Here are your latest stats.</p>
                    </div>
                    <div className="card">
                        <h3>Recent Activity</h3>
                        <p>Check out recent activities.</p>
                    </div>
                    <div className="card">
                        <h3>Notifications</h3>
                        <p>You have 3 new notifications.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminPage;