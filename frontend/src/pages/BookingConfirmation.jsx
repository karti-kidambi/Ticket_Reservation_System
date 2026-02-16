import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { FaCheckCircle, FaPrint, FaDownload, FaBus, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaEnvelope, FaChair } from 'react-icons/fa';

const BookingConfirmation = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/bookings/${bookingId}`).then(res => { setBooking(res.data); setLoading(false); }).catch(() => setLoading(false));
    }, [bookingId]);

    const handlePrint = () => window.print();
    const handleDownload = () => {
        const content = document.getElementById('ticket-content');
        if (!content) return;
        const blob = new Blob([content.innerText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `ticket-${bookingId}.txt`; a.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="text-center py-20"><div className="inline-block w-8 h-8 border-2 border-[var(--tb-primary)] border-t-transparent rounded-full animate-spin"></div></div>;
    if (!booking) return <div className="text-center py-20 text-[var(--tb-text-muted)]">Booking not found.</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <FaCheckCircle className="text-5xl text-[var(--tb-success)] mx-auto animate-bounce" />
                <h1 className="text-2xl font-bold mt-4 text-white">Booking Confirmed!</h1>
                <p className="text-sm text-[var(--tb-text-muted)] mt-1">Your ticket has been booked successfully</p>
                <p className="text-xs text-[var(--tb-text-dim)] mt-1">Booking ID: <span className="font-mono font-bold text-[var(--tb-primary-light)]">{bookingId}</span></p>
            </div>

            <div id="ticket-content" className="bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)] overflow-hidden print:bg-white print:text-black">
                <div className="p-6 text-white" style={{ background: 'var(--tb-gradient-accent)' }}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold">{booking.trip?.route?.source} → {booking.trip?.route?.destination}</h2>
                            <p className="text-sm opacity-90">{booking.trip?.bus?.operatorName} • {booking.trip?.bus?.type}</p>
                        </div>
                        <div className="text-right"><p className="text-2xl font-bold">INR {booking.totalAmount || booking.trip?.price}</p></div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                            <FaBus className="text-[var(--tb-primary)] mt-0.5" />
                            <div><p className="text-xs text-[var(--tb-text-dim)]">Bus No</p><p className="font-semibold text-sm text-white">{booking.trip?.bus?.busNumber}</p></div>
                        </div>
                        <div className="flex items-start gap-2">
                            <FaChair className="text-[var(--tb-primary)] mt-0.5" />
                            <div><p className="text-xs text-[var(--tb-text-dim)]">Seat(s)</p><p className="font-semibold text-sm text-white">{booking.seatNumbers || booking.seatNumber}</p></div>
                        </div>
                        <div className="flex items-start gap-2">
                            <FaCalendarAlt className="text-[var(--tb-primary)] mt-0.5" />
                            <div><p className="text-xs text-[var(--tb-text-dim)]">Departure</p><p className="font-semibold text-sm text-white">{new Date(booking.trip?.departureTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p></div>
                        </div>
                        <div className="flex items-start gap-2">
                            <FaCalendarAlt className="text-[var(--tb-text-dim)] mt-0.5" />
                            <div><p className="text-xs text-[var(--tb-text-dim)]">Arrival</p><p className="font-semibold text-sm text-white">{new Date(booking.trip?.arrivalTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p></div>
                        </div>
                    </div>

                    {(booking.boardingPoint || booking.droppingPoint) && (
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--tb-border)]">
                            {booking.boardingPoint && (
                                <div className="flex items-start gap-2"><FaMapMarkerAlt className="text-[var(--tb-success)] mt-0.5" /><div><p className="text-xs text-[var(--tb-text-dim)]">Boarding</p><p className="font-semibold text-sm text-white">{booking.boardingPoint}</p></div></div>
                            )}
                            {booking.droppingPoint && (
                                <div className="flex items-start gap-2"><FaMapMarkerAlt className="text-[var(--tb-primary)] mt-0.5" /><div><p className="text-xs text-[var(--tb-text-dim)]">Dropping</p><p className="font-semibold text-sm text-white">{booking.droppingPoint}</p></div></div>
                            )}
                        </div>
                    )}

                    {(booking.passengerName || booking.email) && (
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--tb-border)]">
                            {booking.passengerName && (
                                <div className="flex items-start gap-2"><FaUser className="text-[var(--tb-primary)] mt-0.5" /><div><p className="text-xs text-[var(--tb-text-dim)]">Passenger</p><p className="font-semibold text-sm text-white">{booking.passengerName} {booking.passengerAge ? `(${booking.passengerAge}y, ${booking.passengerGender})` : ''}</p></div></div>
                            )}
                            {booking.email && (
                                <div className="flex items-start gap-2"><FaEnvelope className="text-[var(--tb-primary)] mt-0.5" /><div><p className="text-xs text-[var(--tb-text-dim)]">Email</p><p className="font-semibold text-sm text-white">{booking.email}</p></div></div>
                            )}
                        </div>
                    )}

                    <div className="pt-4 border-t border-dashed border-[var(--tb-border)] text-xs text-center text-[var(--tb-text-dim)]">
                        <p>Status: <span className="bg-[var(--tb-success-bg)] text-[var(--tb-success)] px-2 py-0.5 rounded-full font-semibold border border-[var(--tb-success)]/20">{booking.status}</span></p>
                        <p className="mt-1">Booked on: {new Date(booking.bookingDate).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 justify-center print:hidden">
                <button onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--tb-surface)] border border-[var(--tb-border)] rounded-xl font-semibold text-[var(--tb-text)] hover:border-[var(--tb-primary)]/30 hover:shadow-lg hover:shadow-[var(--tb-primary)]/5 transition-all">
                    <FaPrint /> Print Ticket
                </button>
                <button onClick={handleDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--tb-surface)] border border-[var(--tb-border)] rounded-xl font-semibold text-[var(--tb-text)] hover:border-[var(--tb-primary)]/30 hover:shadow-lg hover:shadow-[var(--tb-primary)]/5 transition-all">
                    <FaDownload /> Download Ticket
                </button>
            </div>
            <div className="flex gap-3 mt-4 justify-center print:hidden">
                <Link to="/my-bookings" className="text-[var(--tb-primary-light)] font-semibold text-sm hover:underline">View My Bookings →</Link>
                <span className="text-[var(--tb-border)]">|</span>
                <Link to="/" className="text-[var(--tb-primary-light)] font-semibold text-sm hover:underline">Book Another Trip →</Link>
            </div>
        </div>
    );
};

export default BookingConfirmation;
