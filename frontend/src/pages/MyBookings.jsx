import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaChair, FaMapMarkerAlt, FaUser, FaPrint, FaCalendarAlt } from 'react-icons/fa';

const statusSteps = ['BOOKED', 'TRAVELING', 'COMPLETED'];

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        api.get(`/bookings/user/${user.id}`).then(res => { setBookings(res.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const handleCancel = async (id) => {
        try { await api.patch(`/bookings/${id}/cancel`); setBookings(bs => bs.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b)); } catch { }
    };

    if (loading) return <div className="text-center py-20"><div className="inline-block w-8 h-8 border-2 border-[var(--tb-primary)] border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl font-bold mb-6 text-white">My Bookings</h2>
            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)]">
                    <FaBus className="text-4xl text-[var(--tb-text-dim)] mx-auto mb-3" />
                    <p className="text-[var(--tb-text-muted)]">No bookings yet.</p>
                    <button onClick={() => navigate('/')} className="mt-3 text-[var(--tb-primary-light)] font-semibold text-sm">Book a bus →</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((b) => (
                        <div key={b.id} className="bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)] overflow-hidden hover:border-[var(--tb-primary)]/20 transition-all">
                            <div className={`px-6 py-3 text-sm font-semibold ${b.status === 'CANCELLED' ? 'bg-[var(--tb-danger-bg)] text-[var(--tb-danger)]' : 'bg-[var(--tb-success-bg)] text-[var(--tb-success)]'}`}>
                                Booking #{b.id} — {b.status}
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2 text-lg font-bold text-white">
                                            <FaBus className="text-[var(--tb-primary)]" />
                                            {b.trip?.route?.source} → {b.trip?.route?.destination}
                                        </div>
                                        <p className="text-sm text-[var(--tb-text-muted)]">{b.trip?.bus?.operatorName} • {b.trip?.bus?.type} • {b.trip?.bus?.busNumber}</p>
                                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--tb-text-muted)]">
                                            <span className="flex items-center gap-1"><FaCalendarAlt className="text-xs" /> {new Date(b.trip?.departureTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                            <span className="flex items-center gap-1"><FaChair className="text-xs" /> Seat(s): <strong className="text-white">{b.seatNumbers || b.seatNumber}</strong></span>
                                        </div>
                                        {b.passengerName && (
                                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--tb-text-muted)]">
                                                <span className="flex items-center gap-1"><FaUser className="text-xs" /> {b.passengerName} {b.passengerAge ? `(${b.passengerAge}y)` : ''}</span>
                                                {b.email && <span className="text-xs text-[var(--tb-text-dim)]">{b.email}</span>}
                                            </div>
                                        )}
                                        {(b.boardingPoint || b.droppingPoint) && (
                                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--tb-text-muted)]">
                                                {b.boardingPoint && <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-[var(--tb-success)] text-xs" /> Board: {b.boardingPoint}</span>}
                                                {b.droppingPoint && <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-[var(--tb-primary)] text-xs" /> Drop: {b.droppingPoint}</span>}
                                            </div>
                                        )}
                                        {b.status !== 'CANCELLED' && (
                                            <div className="flex items-center gap-1 mt-2 text-xs">
                                                {statusSteps.map((step, i) => (
                                                    <React.Fragment key={step}>
                                                        <div className={`px-2 py-1 rounded-full ${i <= statusSteps.indexOf(b.status === 'BOOKED' ? 'BOOKED' : b.status) ? 'text-white' : 'bg-[var(--tb-border)] text-[var(--tb-text-dim)]'}`}
                                                            style={i <= statusSteps.indexOf(b.status === 'BOOKED' ? 'BOOKED' : b.status) ? { background: 'var(--tb-gradient-accent)' } : {}}>
                                                            {step}
                                                        </div>
                                                        {i < statusSteps.length - 1 && <div className="w-6 h-px bg-[var(--tb-border)]"></div>}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <p className="text-xl font-bold text-white">INR {b.totalAmount || b.trip?.price}</p>
                                        <div className="flex gap-2">
                                            <button onClick={() => navigate(`/booking-confirmation/${b.id}`)} className="flex items-center gap-1 px-3 py-1.5 bg-[var(--tb-surface)] border border-[var(--tb-border)] rounded-lg text-xs font-semibold text-[var(--tb-text-muted)] hover:border-[var(--tb-primary)]/30 transition-all">
                                                <FaPrint className="text-xs" /> View Ticket
                                            </button>
                                            {b.status === 'BOOKED' && (
                                                <button onClick={() => handleCancel(b.id)} className="px-3 py-1.5 bg-[var(--tb-surface)] border border-[var(--tb-border)] text-[var(--tb-danger)] rounded-lg text-xs font-semibold hover:bg-[var(--tb-danger-bg)] transition-all">
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
