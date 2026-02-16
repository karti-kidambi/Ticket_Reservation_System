import React, { useState } from 'react';
import api from '../api';
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

const CancelTicket = () => {
    const [bookingId, setBookingId] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleCancel = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(false);
        try {
            await api.patch(`/bookings/${bookingId}/cancel`);
            setMessage('Ticket cancelled successfully.');
            setSuccess(true);
        } catch {
            setMessage('Cancellation failed. Please check the Booking ID.');
            setSuccess(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <FaTimesCircle className="text-4xl text-[var(--tb-danger)] mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-white">Cancel Ticket</h2>
                <p className="text-sm text-[var(--tb-text-muted)] mt-1">Enter your Booking ID to cancel your reservation</p>
            </div>
            <form onSubmit={handleCancel} className="bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)] space-y-4">
                <input type="text" value={bookingId} onChange={e => setBookingId(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] focus:ring-2 focus:ring-[var(--tb-primary-glow)] focus:border-[var(--tb-primary)] outline-none transition-all"
                    placeholder="Enter Booking ID" required />
                <button type="submit"
                    className="w-full py-3 rounded-xl font-semibold text-white bg-[var(--tb-danger)] hover:bg-[#dc2626] transition-all hover:shadow-lg hover:shadow-[var(--tb-danger)]/20">
                    Cancel Booking
                </button>
            </form>

            {message && (
                <div className={`mt-4 px-4 py-3 rounded-xl text-sm border flex items-center gap-2
                    ${success ? 'bg-[var(--tb-success-bg)] text-[var(--tb-success)] border-[var(--tb-success)]/20' : 'bg-[var(--tb-danger-bg)] text-[var(--tb-danger)] border-[var(--tb-danger)]/20'}`}>
                    {success ? <FaCheckCircle /> : <FaTimesCircle />} {message}
                </div>
            )}
        </div>
    );
};

export default CancelTicket;
