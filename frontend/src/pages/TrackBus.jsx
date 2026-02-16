import React, { useState } from 'react';
import api from '../api';
import { FaSatelliteDish, FaClock, FaMapMarkedAlt } from 'react-icons/fa';

const TrackBus = () => {
    const [tripId, setTripId] = useState('');
    const [tracking, setTracking] = useState(null);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        setError('');
        setTracking(null);
        try {
            const res = await api.get(`/trips/${tripId}/track`);
            setTracking(res.data);
        } catch {
            setError('Could not fetch tracking info. Please check the Trip ID.');
        }
    };

    return (
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <FaSatelliteDish className="text-4xl text-[var(--tb-primary)] mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-white">Track Your Bus</h2>
                <p className="text-sm text-[var(--tb-text-muted)] mt-1">Enter your Trip ID to get live tracking updates</p>
            </div>
            <form onSubmit={handleTrack} className="bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)] space-y-4">
                <div className="relative">
                    <FaMapMarkedAlt className="absolute left-3 top-3 text-[var(--tb-text-dim)]" />
                    <input type="text" value={tripId} onChange={e => setTripId(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] focus:ring-2 focus:ring-[var(--tb-primary-glow)] focus:border-[var(--tb-primary)] outline-none transition-all"
                        placeholder="Enter Trip ID" required />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:shadow-[var(--tb-primary)]/20"
                    style={{ background: 'var(--tb-gradient-accent)' }}>Track Bus</button>
            </form>

            {error && <div className="mt-4 bg-[var(--tb-danger-bg)] text-[var(--tb-danger)] px-4 py-3 rounded-xl text-sm border border-[var(--tb-danger)]/20">{error}</div>}

            {tracking && (
                <div className="mt-6 bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)] space-y-4">
                    <h3 className="font-bold text-white mb-2">Tracking Info</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[var(--tb-text-muted)]">Status</span>
                            <span className="bg-[var(--tb-success-bg)] text-[var(--tb-success)] px-3 py-1 rounded-full font-semibold text-xs border border-[var(--tb-success)]/20">{tracking.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[var(--tb-text-muted)] flex items-center gap-1"><FaClock /> ETA</span>
                            <span className="font-semibold text-white">{tracking.etaMinutes} minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[var(--tb-text-muted)]">Last Updated</span>
                            <span className="text-[var(--tb-text-dim)] text-xs">{tracking.lastUpdated}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackBus;
