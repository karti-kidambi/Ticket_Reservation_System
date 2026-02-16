import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { FaBus, FaClock, FaFilter, FaStar, FaChair } from 'react-icons/fa';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('departure');
    const [filters, setFilters] = useState({ busType: '', departureAfter: null, departureBefore: null, minPrice: '', maxPrice: '' });
    const [showFilters, setShowFilters] = useState(true);
    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    const fetchTrips = async (sort = sortBy, appliedFilters = filters) => {
        setLoading(true);
        try {
            const params = { source, destination, date, sortBy: sort };
            if (appliedFilters.busType) params.busType = appliedFilters.busType;
            if (appliedFilters.departureAfter !== null) params.departureAfter = appliedFilters.departureAfter;
            if (appliedFilters.departureBefore !== null) params.departureBefore = appliedFilters.departureBefore;
            if (appliedFilters.minPrice) params.minPrice = appliedFilters.minPrice;
            if (appliedFilters.maxPrice) params.maxPrice = appliedFilters.maxPrice;
            const response = await api.get('/trips/search', { params });
            setTrips(response.data);
        } catch (error) { console.error('Error fetching trips:', error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchTrips(); }, [source, destination, date]);
    const handleSort = (sort) => { setSortBy(sort); fetchTrips(sort, filters); };
    const handleFilterChange = (key, value) => { const nf = { ...filters, [key]: value }; setFilters(nf); fetchTrips(sortBy, nf); };
    const clearFilters = () => { const c = { busType: '', departureAfter: null, departureBefore: null, minPrice: '', maxPrice: '' }; setFilters(c); fetchTrips(sortBy, c); };
    const getDuration = (dep, arr) => { const d = new Date(arr) - new Date(dep); return `${Math.floor(d / 3600000)}h ${Math.floor((d % 3600000) / 60000)}m`; };
    const timeSlots = [
        { label: 'Before 6 AM', after: 0, before: 6 },
        { label: '6 AM – 12 PM', after: 6, before: 12 },
        { label: '12 PM – 6 PM', after: 12, before: 18 },
        { label: 'After 6 PM', after: 18, before: 24 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">{source} → {destination}</h2>
                    <p className="text-sm text-[var(--tb-text-muted)]">{trips.length} bus{trips.length !== 1 ? 'es' : ''} found for {date}</p>
                </div>
                <div className="flex items-center gap-3 text-sm flex-wrap">
                    <span className="text-[var(--tb-text-dim)]">Sort by</span>
                    {['departure', 'price', 'rating', 'duration'].map(s => (
                        <button key={s} onClick={() => handleSort(s)}
                            className={`px-3 py-2 rounded-lg border text-sm font-semibold transition-all capitalize
                            ${sortBy === s ? 'bg-[var(--tb-primary)] text-white border-[var(--tb-primary)] shadow-lg shadow-[var(--tb-primary)]/20' : 'border-[var(--tb-border)] bg-[var(--tb-surface)] text-[var(--tb-text-muted)] hover:border-[var(--tb-primary)]/50'}`}>
                            {s}
                        </button>
                    ))}
                    <button onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden px-3 py-2 rounded-lg border border-[var(--tb-border)] bg-[var(--tb-surface)] text-sm font-semibold text-[var(--tb-text-muted)] flex items-center gap-1">
                        <FaFilter className="text-xs" /> Filters
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                <aside className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
                    <div className="bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)] p-5 sticky top-28 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white">Filters</h3>
                            <button onClick={clearFilters} className="text-xs text-[var(--tb-primary-light)] font-semibold hover:text-[var(--tb-primary)]">Clear All</button>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-2 text-[var(--tb-text)]">Bus Type</h4>
                            {['AC Sleeper', 'AC Seater', 'Non-AC Seater'].map(type => (
                                <label key={type} className="flex items-center gap-2 text-sm text-[var(--tb-text-muted)] cursor-pointer py-1 hover:text-white transition-colors">
                                    <input type="radio" name="busType" checked={filters.busType === type}
                                        onChange={() => handleFilterChange('busType', filters.busType === type ? '' : type)}
                                        className="accent-[var(--tb-primary)]" />
                                    {type}
                                </label>
                            ))}
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-2 text-[var(--tb-text)]">Departure Time</h4>
                            {timeSlots.map(slot => (
                                <label key={slot.label} className="flex items-center gap-2 text-sm text-[var(--tb-text-muted)] cursor-pointer py-1 hover:text-white transition-colors">
                                    <input type="radio" name="departure"
                                        checked={filters.departureAfter === slot.after && filters.departureBefore === slot.before}
                                        onChange={() => {
                                            if (filters.departureAfter === slot.after && filters.departureBefore === slot.before) {
                                                handleFilterChange('departureAfter', null); handleFilterChange('departureBefore', null);
                                            } else { const nf = { ...filters, departureAfter: slot.after, departureBefore: slot.before }; setFilters(nf); fetchTrips(sortBy, nf); }
                                        }}
                                        className="accent-[var(--tb-primary)]" />
                                    {slot.label}
                                </label>
                            ))}
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-2 text-[var(--tb-text)]">Price Range</h4>
                            <div className="flex gap-2">
                                <input type="number" placeholder="Min" value={filters.minPrice}
                                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                    className="w-full px-2 py-1.5 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-lg text-sm text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] outline-none focus:border-[var(--tb-primary)]" />
                                <input type="number" placeholder="Max" value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                    className="w-full px-2 py-1.5 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-lg text-sm text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] outline-none focus:border-[var(--tb-primary)]" />
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex-1">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block w-8 h-8 border-2 border-[var(--tb-primary)] border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-[var(--tb-text-muted)]">Loading available buses...</p>
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="text-center py-20 bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)]">
                            <FaBus className="text-4xl text-[var(--tb-text-dim)] mx-auto mb-4" />
                            <p className="text-lg text-[var(--tb-text-muted)]">No buses found for this route on selected date.</p>
                            <button onClick={clearFilters} className="mt-3 text-[var(--tb-primary-light)] font-semibold text-sm">Clear Filters</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {trips.map((trip) => (
                                <div key={trip.id} className="bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)] hover:border-[var(--tb-primary)]/30 transition-all hover:shadow-lg hover:shadow-[var(--tb-primary)]/5">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <FaBus className="text-[var(--tb-primary)] text-xl" />
                                                <h3 className="text-xl font-bold text-white">{trip.bus.operatorName}</h3>
                                                <span className="bg-[var(--tb-primary-glow)] text-[var(--tb-primary-light)] text-xs px-2 py-1 rounded-full border border-[var(--tb-primary)]/20">{trip.bus.type}</span>
                                                {trip.bus.rating >= 4.5 && (
                                                    <span className="bg-[var(--tb-success-bg)] text-[var(--tb-success)] text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-[var(--tb-success)]/20"><FaStar className="text-[10px]" /> Top Rated</span>
                                                )}
                                            </div>
                                            <div className="text-xs text-[var(--tb-text-dim)] mb-2">
                                                Bus No: {trip.bus.busNumber} • <FaStar className="inline text-[var(--tb-gold)]" /> {trip.bus.rating}
                                            </div>
                                            <div className="text-xs text-[var(--tb-text-dim)] mb-3">Amenities: {trip.bus.amenities}</div>
                                            <div className="flex items-center gap-6 text-[var(--tb-text-muted)]">
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="text-[var(--tb-text-dim)]" />
                                                    <div>
                                                        <p className="font-semibold text-white">{new Date(trip.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                        <p className="text-xs">Departure</p>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-xs font-semibold text-[var(--tb-primary-light)]">{getDuration(trip.departureTime, trip.arrivalTime)}</div>
                                                    <div className="h-px w-16 bg-[var(--tb-border)] my-1"></div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="text-[var(--tb-text-dim)]" />
                                                    <div>
                                                        <p className="font-semibold text-white">{new Date(trip.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                        <p className="text-xs">Arrival</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-3">
                                            <div className="flex items-center gap-1">
                                                <FaChair className="text-[var(--tb-text-dim)] text-xs" />
                                                <span className="text-xs text-[var(--tb-text-muted)]">{trip.availableSeats || trip.bus.totalSeats} seats</span>
                                            </div>
                                            <div className="text-2xl font-bold text-white flex items-center gap-2">
                                                <span className="text-sm text-[var(--tb-text-dim)]">INR</span>
                                                {trip.price}
                                            </div>
                                            <button onClick={() => navigate(`/book/${trip.id}`)}
                                                className="px-6 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--tb-primary)]/20"
                                                style={{ background: 'var(--tb-gradient-accent)' }}>
                                                View Seats
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
