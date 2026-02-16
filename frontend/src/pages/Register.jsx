import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBusAlt } from 'react-icons/fa';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', form);
            navigate('/login');
        } catch {
            setError('Registration failed. Email may already be in use.');
        }
    };

    const inputClass = "w-full pl-10 pr-4 py-3 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] focus:ring-2 focus:ring-[var(--tb-primary-glow)] focus:border-[var(--tb-primary)] outline-none transition-all";

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <FaBusAlt className="text-3xl text-[var(--tb-primary)] mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-white">Create account</h2>
                    <p className="text-sm text-[var(--tb-text-muted)] mt-1">Join TicketBook and start booking</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-[var(--tb-surface)] p-8 rounded-2xl border border-[var(--tb-border)] space-y-5">
                    {error && <div className="bg-[var(--tb-danger-bg)] text-[var(--tb-danger)] px-4 py-2 rounded-lg text-sm border border-[var(--tb-danger)]/20">{error}</div>}
                    <div>
                        <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">Full Name</label>
                        <div className="relative"><FaUser className="absolute left-3 top-3 text-[var(--tb-text-dim)]" /><input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="John Doe" required /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">Email</label>
                        <div className="relative"><FaEnvelope className="absolute left-3 top-3 text-[var(--tb-text-dim)]" /><input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" required /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">Phone</label>
                        <div className="relative"><FaPhone className="absolute left-3 top-3 text-[var(--tb-text-dim)]" /><input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+91 98765 43210" required /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">Password</label>
                        <div className="relative"><FaLock className="absolute left-3 top-3 text-[var(--tb-text-dim)]" /><input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} placeholder="••••••••" required /></div>
                    </div>
                    <button type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--tb-primary)]/20"
                        style={{ background: 'var(--tb-gradient-accent)' }}>
                        Create Account
                    </button>
                    <p className="text-center text-sm text-[var(--tb-text-muted)]">
                        Already have an account? <Link to="/login" className="text-[var(--tb-primary-light)] font-semibold hover:underline">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
