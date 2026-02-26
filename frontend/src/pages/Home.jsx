import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaBusAlt, FaCalendarAlt, FaExchangeAlt, FaMapMarkerAlt, FaShieldAlt, FaStar, FaTicketAlt, FaRoute } from 'react-icons/fa';
import api from '../api';

const Home = () => {
    const navigate = useNavigate();
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destSuggestions, setDestSuggestions] = useState([]);
    const [showSourceDrop, setShowSourceDrop] = useState(false);
    const [showDestDrop, setShowDestDrop] = useState(false);
    const [popularRoutes, setPopularRoutes] = useState([]);
    const sourceRef = useRef(null);
    const destRef = useRef(null);

    useEffect(() => {
        api.get('/trips/popular-routes').then(res => setPopularRoutes(res.data)).catch(() => { });
    }, []);

    const fetchCities = async (query, setter, showSetter) => {
        if (query.length < 1) { showSetter(false); return; }
        try {
            const res = await api.get('/trips/cities', { params: { q: query } });
            setter(res.data);
            showSetter(res.data.length > 0);
        } catch { showSetter(false); }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (source && destination && date) {
            navigate(`/search?source=${source}&destination=${destination}&date=${date}`);
        }
    };

    const swapCities = () => {
        setSource(destination);
        setDestination(source);
    };

    const handleRouteClick = (src, dest) => {
        setSource(src);
        setDestination(dest);
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
        navigate(`/search?source=${src}&destination=${dest}&date=${today}`);
    };

    return (
        <div>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0" style={{ background: 'var(--tb-gradient-hero)' }}></div>
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#6366f1] opacity-[0.07] blur-3xl"></div>
                <div className="absolute -bottom-48 -left-32 w-[500px] h-[500px] rounded-full bg-[#8b5cf6] opacity-[0.06] blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--tb-primary-glow)] border border-[var(--tb-border)] text-sm font-semibold text-[var(--tb-primary-light)]">
                                <FaTicketAlt /> Exclusive festive offers available
                            </div>
                            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight text-white">
                                Book bus tickets in minutes with <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--tb-gradient-accent)' }}>live seat selection</span>
                            </h1>
                            <p className="mt-4 text-lg text-[var(--tb-text-muted)] max-w-xl">
                                TicketBook brings you trusted operators, transparent fares, and safe journeys across the country.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 bg-[var(--tb-surface)] px-4 py-3 rounded-xl border border-[var(--tb-border)]">
                                    <FaShieldAlt className="text-[var(--tb-primary)]" />
                                    <div>
                                        <div className="text-sm font-semibold text-white">Verified Partners</div>
                                        <div className="text-xs text-[var(--tb-text-dim)]">Trusted bus operators</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-[var(--tb-surface)] px-4 py-3 rounded-xl border border-[var(--tb-border)]">
                                    <FaStar className="text-[var(--tb-gold)]" />
                                    <div>
                                        <div className="text-sm font-semibold text-white">Rated 4.7+</div>
                                        <div className="text-xs text-[var(--tb-text-dim)]">Happy travelers</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--tb-surface)] rounded-3xl shadow-2xl shadow-black/20 p-6 md:p-8 border border-[var(--tb-border)]">
                            <h2 className="text-xl font-bold text-white mb-6">Search buses</h2>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="relative" ref={sourceRef}>
                                    <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">From</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-3 text-[var(--tb-primary)]" />
                                        <input type="text" placeholder="Source city"
                                            className="w-full pl-10 pr-4 py-3 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] focus:ring-2 focus:ring-[var(--tb-primary-glow)] focus:border-[var(--tb-primary)] outline-none transition-all"
                                            value={source}
                                            onChange={(e) => { setSource(e.target.value); fetchCities(e.target.value, setSourceSuggestions, setShowSourceDrop); }}
                                            onFocus={() => source && sourceSuggestions.length > 0 && setShowSourceDrop(true)}
                                            onBlur={() => setTimeout(() => setShowSourceDrop(false), 200)}
                                            required
                                        />
                                    </div>
                                    {showSourceDrop && (
                                        <div className="absolute z-20 w-full bg-[var(--tb-surface-elevated)] border border-[var(--tb-border)] rounded-xl mt-1 shadow-lg shadow-black/30 max-h-48 overflow-y-auto">
                                            {sourceSuggestions.map(city => (
                                                <div key={city} className="px-4 py-2 hover:bg-[var(--tb-primary-glow)] cursor-pointer text-sm text-[var(--tb-text)]"
                                                    onMouseDown={() => { setSource(city); setShowSourceDrop(false); }}>
                                                    <FaMapMarkerAlt className="inline mr-2 text-[var(--tb-primary)] text-xs" />{city}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-center -my-1">
                                    <button type="button" onClick={swapCities}
                                        className="p-2 rounded-full bg-[var(--tb-primary-glow)] text-[var(--tb-primary-light)] hover:bg-[var(--tb-primary)] hover:text-white transition-all border border-[var(--tb-border)]">
                                        <FaExchangeAlt className="rotate-90" />
                                    </button>
                                </div>

                                <div className="relative" ref={destRef}>
                                    <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">To</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-3 text-[var(--tb-primary)]" />
                                        <input type="text" placeholder="Destination city"
                                            className="w-full pl-10 pr-4 py-3 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] focus:ring-2 focus:ring-[var(--tb-primary-glow)] focus:border-[var(--tb-primary)] outline-none transition-all"
                                            value={destination}
                                            onChange={(e) => { setDestination(e.target.value); fetchCities(e.target.value, setDestSuggestions, setShowDestDrop); }}
                                            onFocus={() => destination && destSuggestions.length > 0 && setShowDestDrop(true)}
                                            onBlur={() => setTimeout(() => setShowDestDrop(false), 200)}
                                            required
                                        />
                                    </div>
                                    {showDestDrop && (
                                        <div className="absolute z-20 w-full bg-[var(--tb-surface-elevated)] border border-[var(--tb-border)] rounded-xl mt-1 shadow-lg shadow-black/30 max-h-48 overflow-y-auto">
                                            {destSuggestions.map(city => (
                                                <div key={city} className="px-4 py-2 hover:bg-[var(--tb-primary-glow)] cursor-pointer text-sm text-[var(--tb-text)]"
                                                    onMouseDown={() => { setDestination(city); setShowDestDrop(false); }}>
                                                    <FaMapMarkerAlt className="inline mr-2 text-[var(--tb-primary)] text-xs" />{city}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">Date of journey</label>
                                        <div className="relative">
                                            <FaCalendarAlt className="absolute left-3 top-3 text-[var(--tb-primary)]" />
                                            <input type="date"
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-[var(--tb-text)] focus:ring-2 focus:ring-[var(--tb-primary-glow)] focus:border-[var(--tb-primary)] outline-none transition-all"
                                                value={date} onChange={(e) => setDate(e.target.value)} required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[var(--tb-text-muted)] mb-2">Return <span className="text-xs font-normal">(optional)</span></label>
                                        <div className="relative">
                                            <FaCalendarAlt className="absolute left-3 top-3 text-[var(--tb-text-dim)]" />
                                            <input type="date"
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-[var(--tb-text)] focus:ring-2 focus:ring-[var(--tb-primary-glow)] focus:border-[var(--tb-primary)] outline-none transition-all"
                                                value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit"
                                    className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-[var(--tb-primary)]/20"
                                    style={{ background: 'var(--tb-gradient-accent)' }}>
                                    Search Buses <FaArrowRight />
                                </button>
                            </form>
                            <div className="mt-6 flex items-center justify-between text-xs text-[var(--tb-text-dim)]">
                                <span className="flex items-center gap-2"><FaBusAlt /> 2,000+ routes</span>
                                <span>Zero booking fees today</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Live seat availability', desc: 'See seats in real time and book instantly without delays.' },
                        { title: 'Transparent fares', desc: 'No hidden charges. What you see is what you pay.' },
                        { title: '24/7 support', desc: 'Our team is ready to help you from booking to boarding.' },
                    ].map(f => (
                        <div key={f.title} className="bg-[var(--tb-surface)] rounded-2xl p-6 border border-[var(--tb-border)] hover:border-[var(--tb-primary)]/30 transition-all hover:shadow-lg hover:shadow-[var(--tb-primary)]/5">
                            <h3 className="text-lg font-semibold mb-2 text-white">{f.title}</h3>
                            <p className="text-sm text-[var(--tb-text-muted)]">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-[var(--tb-surface)] rounded-3xl border border-[var(--tb-border)] p-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <FaRoute className="text-[var(--tb-primary)]" /> Popular routes
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                        {popularRoutes.length > 0 ? popularRoutes.map((route) => (
                            <button key={`${route.source}-${route.destination}`}
                                onClick={() => handleRouteClick(route.source, route.destination)}
                                className="px-4 py-2 rounded-full bg-[var(--tb-primary-glow)] text-[var(--tb-primary-light)] font-semibold hover:bg-[var(--tb-primary)] hover:text-white transition-all border border-[var(--tb-border)] cursor-pointer">
                                {route.source} → {route.destination}
                            </button>
                        )) : ['Mumbai → Pune', 'Delhi → Agra', 'Chennai → Bangalore', 'Hyderabad → Vijayawada', 'Ahmedabad → Udaipur', 'Bangalore → Mysore'].map((route) => (
                            <span key={route} className="px-4 py-2 rounded-full bg-[var(--tb-primary-glow)] text-[var(--tb-primary-light)] font-semibold border border-[var(--tb-border)]">{route}</span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
