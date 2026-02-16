import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaBars, FaBusAlt, FaHeadset, FaInstagram, FaTimes, FaTwitter, FaYoutube, FaGithub } from 'react-icons/fa';

const Layout = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => { localStorage.removeItem('user'); navigate('/login'); };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/offers', label: 'Offers' },
        { to: '/my-bookings', label: 'My Bookings' },
        { to: '/cancel-ticket', label: 'Cancel Ticket' },
        { to: '/track-bus', label: 'Track Bus' },
        { to: '/help', label: 'Help' },
    ];

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--tb-bg)' }}>
            {/* Header */}
            <header className="bg-[var(--tb-surface)]/80 backdrop-blur-xl border-b border-[var(--tb-border)] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-[var(--tb-primary-light)]">
                        <FaBusAlt /> TicketBook
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[var(--tb-text-muted)]">
                        {navLinks.map(l => (
                            <Link key={l.to} to={l.to} className="hover:text-[var(--tb-primary-light)] transition-colors">{l.label}</Link>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <span className="text-sm text-[var(--tb-text-muted)]">Hi, <strong className="text-white">{user.name}</strong></span>
                                <button onClick={handleLogout} className="text-sm text-[var(--tb-primary-light)] font-semibold hover:text-[var(--tb-primary)] transition-colors">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-semibold text-[var(--tb-text-muted)] hover:text-white transition-colors">Login</Link>
                                <Link to="/register" className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[var(--tb-primary)]/20"
                                    style={{ background: 'var(--tb-gradient-accent)' }}>Register</Link>
                            </>
                        )}
                    </div>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl text-[var(--tb-text)]">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                {menuOpen && (
                    <div className="md:hidden border-t border-[var(--tb-border)] bg-[var(--tb-surface)] px-4 py-4 space-y-3">
                        {navLinks.map(l => (
                            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
                                className="block text-sm font-semibold text-[var(--tb-text-muted)] py-2 hover:text-white transition-colors">{l.label}</Link>
                        ))}
                        <hr className="border-[var(--tb-border)]" />
                        {user ? (
                            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-sm text-[var(--tb-primary-light)] font-semibold">Logout ({user.name})</button>
                        ) : (
                            <div className="flex gap-3">
                                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[var(--tb-text-muted)]">Login</Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-[var(--tb-primary-light)]">Register</Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            <main className="flex-1"><Outlet /></main>

            {/* Footer */}
            <footer className="bg-[#0c1222] border-t border-[var(--tb-border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--tb-text-dim)]">Popular Routes</h4>
                            <ul className="space-y-2 text-sm text-[var(--tb-text-dim)]">
                                {['Mumbai – Pune', 'Delhi – Agra', 'Bangalore – Mysore', 'Chennai – Bangalore', 'Hyderabad – Vijayawada', 'Mumbai – Goa'].map(r => (
                                    <li key={r}><span className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors">{r}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--tb-text-dim)]">Bus Operators</h4>
                            <ul className="space-y-2 text-sm text-[var(--tb-text-dim)]">
                                {['Orange Travels', 'VRL Travels', 'SRS Travels', 'IntrCity SmartBus', 'KPN Travels', 'Deccan Travels'].map(o => (
                                    <li key={o}><span className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors">{o}</span></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--tb-text-dim)]">About TicketBook</h4>
                            <ul className="space-y-2 text-sm text-[var(--tb-text-dim)]">
                                <li><Link to="/help" className="hover:text-[var(--tb-primary-light)] transition-colors">Help & FAQ</Link></li>
                                <li><span className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors">About Us</span></li>
                                <li><span className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors">Terms & Conditions</span></li>
                                <li><span className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors">Privacy Policy</span></li>
                                <li><span className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors">Blog</span></li>
                                <li><span className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors">Careers</span></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-[var(--tb-text-dim)]">Connect</h4>
                            <div className="flex gap-4 text-xl text-[var(--tb-text-dim)] mb-4">
                                <FaTwitter className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors" />
                                <FaInstagram className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors" />
                                <FaYoutube className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors" />
                                <FaGithub className="hover:text-[var(--tb-primary-light)] cursor-pointer transition-colors" />
                            </div>
                            <p className="text-sm text-[var(--tb-text-dim)] flex items-center gap-2"><FaHeadset className="text-[var(--tb-primary)]" /> 24/7 Support</p>
                            <p className="text-xs text-[var(--tb-text-dim)] mt-1">+91 1800 123 4567</p>
                        </div>
                    </div>
                    <div className="border-t border-[var(--tb-border)] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
                        <p className="text-xs text-[var(--tb-text-dim)]">© 2026 TicketBook. All rights reserved.</p>
                        <p className="text-xs text-[var(--tb-text-dim)] flex items-center gap-1"><FaBusAlt className="text-[var(--tb-primary)]" /> India's leading bus booking platform</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
