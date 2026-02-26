import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { FaMapMarkerAlt, FaTags } from 'react-icons/fa';

const COUPON_CODES = {
    'WELCOME100': { discount: 100, type: 'flat', label: 'INR 100 off' },
    'WEEKEND15': { discount: 15, type: 'percent', label: '15% off' },
    'NIGHT50': { discount: 50, type: 'flat', label: 'INR 50 off' },
    'SMARTBUS10': { discount: 10, type: 'percent', label: '10% off' },
};

const BookSeat = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [boardingPoint, setBoardingPoint] = useState('');
    const [droppingPoint, setDroppingPoint] = useState('');
    const [passengerName, setPassengerName] = useState('');
    const [passengerAge, setPassengerAge] = useState('');
    const [passengerGender, setPassengerGender] = useState('');
    const [email, setEmail] = useState('');
    const [coupon, setCoupon] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponMsg, setCouponMsg] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const [tripResponse, seatsResponse] = await Promise.all([
                    api.get(`/trips/${tripId}`),
                    api.get(`/bookings/trip/${tripId}/seats`)
                ]);
                setTrip(tripResponse.data);
                setBookedSeats(Array.isArray(seatsResponse.data) ? seatsResponse.data : []);
                if (tripResponse.data.boardingPoints) setBoardingPoint(tripResponse.data.boardingPoints.split(',')[0].trim());
                if (tripResponse.data.droppingPoints) setDroppingPoint(tripResponse.data.droppingPoints.split(',')[0].trim());
            } catch (err) { console.error(err); } finally { setLoading(false); }
        };
        fetchTrip();
    }, [tripId]);

    const toggleSeat = (seatNum) => {
        if (bookedSeats.includes(seatNum)) return;
        if (selectedSeats.includes(seatNum)) setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
        else if (selectedSeats.length < 6) setSelectedSeats([...selectedSeats, seatNum]);
    };

    const applyCoupon = () => {
        const c = COUPON_CODES[coupon.toUpperCase()];
        if (c) { setAppliedCoupon({ code: coupon.toUpperCase(), ...c }); setCouponMsg(`Coupon applied! ${c.label}`); }
        else { setAppliedCoupon(null); setCouponMsg('Invalid coupon code.'); }
    };
    const removeCoupon = () => { setAppliedCoupon(null); setCoupon(''); setCouponMsg(''); };

    const baseFare = trip ? trip.price * selectedSeats.length : 0;
    const discount = appliedCoupon
        ? appliedCoupon.type === 'flat' ? Math.min(appliedCoupon.discount, baseFare) : Math.round(baseFare * appliedCoupon.discount / 100)
        : 0;
    const totalAmount = baseFare - discount;

    const handleBook = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) { navigate('/login'); return; }
        if (selectedSeats.length === 0 || !passengerName || !email) return;
        try {
            const res = await api.post('/bookings', {
                userId: user.id, tripId, seatNumbers: selectedSeats.join(','),
                passengerName, passengerAge: passengerAge ? parseInt(passengerAge) : null,
                passengerGender, email, boardingPoint, droppingPoint, totalAmount
            });
            navigate(`/booking-confirmation/${res.data.id}`);
        } catch { alert('Booking failed. Please try again.'); }
    };

    const renderSeats = () => {
        if (!trip) return null;
        const seats = [];
        for (let i = 1; i <= trip.bus.totalSeats; i++) {
            const isBooked = bookedSeats.includes(i);
            const isSelected = selectedSeats.includes(i);
            seats.push(
                <div key={i} onClick={() => toggleSeat(i)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all border text-sm font-medium
                    ${isBooked ? 'bg-[var(--tb-border)] cursor-not-allowed border-[var(--tb-border)] text-[var(--tb-text-dim)]' :
                            isSelected ? 'text-white border-[var(--tb-primary)] scale-105 shadow-lg shadow-[var(--tb-primary)]/20' :
                                'bg-[var(--tb-bg)] border-[var(--tb-border)] hover:border-[var(--tb-primary)]/50 text-[var(--tb-text-muted)]'}`}
                    style={isSelected ? { background: 'var(--tb-gradient-accent)' } : {}}>
                    {i}
                </div>
            );
        }
        return seats;
    };

    if (loading) return <div className="text-center py-16"><div className="inline-block w-8 h-8 border-2 border-[var(--tb-primary)] border-t-transparent rounded-full animate-spin"></div></div>;
    if (!trip) return <div className="text-center py-16 text-[var(--tb-text-muted)]">Trip not found.</div>;

    const boardingOptions = trip.boardingPoints ? trip.boardingPoints.split(',').map(s => s.trim()) : [];
    const droppingOptions = trip.droppingPoints ? trip.droppingPoints.split(',').map(s => s.trim()) : [];

    const inputClass = "w-full px-3 py-2 bg-[var(--tb-bg)] border border-[var(--tb-border)] rounded-xl text-sm text-[var(--tb-text)] placeholder-[var(--tb-text-dim)] outline-none focus:border-[var(--tb-primary)] transition-colors";

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl font-bold mb-2 text-center text-white">Select your seats</h2>
            <p className="text-center text-sm text-[var(--tb-text-muted)] mb-8">You can select up to 6 seats</p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-[var(--tb-surface)] p-8 rounded-2xl border border-[var(--tb-border)]">
                    <div className="mb-6 flex flex-wrap gap-4 text-sm justify-center text-[var(--tb-text-muted)]">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 border border-[var(--tb-border)] rounded bg-[var(--tb-bg)]"></div> Available</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ background: 'var(--tb-gradient-accent)' }}></div> Selected</div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[var(--tb-border)]"></div> Booked</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 max-w-[240px] mx-auto">
                        {renderSeats()}
                    </div>

                    {(boardingOptions.length > 0 || droppingOptions.length > 0) && (
                        <div className="mt-8 pt-6 border-t border-[var(--tb-border)] grid grid-cols-1 md:grid-cols-2 gap-4">
                            {boardingOptions.length > 0 && (
                                <div>
                                    <label className="text-sm font-semibold text-[var(--tb-text)] flex items-center gap-1 mb-2">
                                        <FaMapMarkerAlt className="text-[var(--tb-success)] text-xs" /> Boarding Point
                                    </label>
                                    <select value={boardingPoint} onChange={e => setBoardingPoint(e.target.value)} className={inputClass}>
                                        {boardingOptions.map(bp => <option key={bp} value={bp}>{bp}</option>)}
                                    </select>
                                </div>
                            )}
                            {droppingOptions.length > 0 && (
                                <div>
                                    <label className="text-sm font-semibold text-[var(--tb-text)] flex items-center gap-1 mb-2">
                                        <FaMapMarkerAlt className="text-[var(--tb-primary)] text-xs" /> Dropping Point
                                    </label>
                                    <select value={droppingPoint} onChange={e => setDroppingPoint(e.target.value)} className={inputClass}>
                                        {droppingOptions.map(dp => <option key={dp} value={dp}>{dp}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-96 space-y-6">
                    <div className="bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)]">
                        <h3 className="text-lg font-bold mb-4 border-b border-[var(--tb-border)] pb-2 text-white">Passenger Details</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Full Name *" value={passengerName} onChange={e => setPassengerName(e.target.value)} className={inputClass} required />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" placeholder="Age" value={passengerAge} onChange={e => setPassengerAge(e.target.value)} className={inputClass} />
                                <select value={passengerGender} onChange={e => setPassengerGender(e.target.value)} className={inputClass}>
                                    <option value="">Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <input type="email" placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} required />
                        </div>
                    </div>

                    <div className="bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)]">
                        <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-white"><FaTags className="text-[var(--tb-primary)]" /> Apply Coupon</h3>
                        {appliedCoupon ? (
                            <div className="flex items-center justify-between bg-[var(--tb-success-bg)] px-3 py-2 rounded-lg text-sm border border-[var(--tb-success)]/20">
                                <span className="text-[var(--tb-success)] font-semibold">{appliedCoupon.code} — {appliedCoupon.label}</span>
                                <button onClick={removeCoupon} className="text-[var(--tb-danger)] font-semibold text-xs">Remove</button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input type="text" placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value)}
                                    className={`${inputClass} flex-1 uppercase`} />
                                <button onClick={applyCoupon} className="px-3 py-2 text-white rounded-lg text-sm font-semibold transition-all"
                                    style={{ background: 'var(--tb-gradient-accent)' }}>Apply</button>
                            </div>
                        )}
                        {couponMsg && !appliedCoupon && <p className="text-xs text-[var(--tb-danger)] mt-1">{couponMsg}</p>}
                    </div>

                    <div className="bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)]">
                        <h3 className="text-lg font-bold mb-4 border-b border-[var(--tb-border)] pb-2 text-white">Booking Summary</h3>
                        <div className="space-y-3 text-[var(--tb-text-muted)] text-sm">
                            <p className="flex justify-between"><span>Operator:</span> <span className="font-semibold text-white">{trip.bus.operatorName}</span></p>
                            <p className="flex justify-between"><span>Bus No:</span> <span className="font-semibold text-white">{trip.bus.busNumber}</span></p>
                            <p className="flex justify-between"><span>Type:</span> <span className="font-semibold text-white">{trip.bus.type}</span></p>
                            <p className="flex justify-between"><span>Seats:</span> <span className="font-semibold text-[var(--tb-primary-light)]">{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</span></p>
                            {boardingPoint && <p className="flex justify-between"><span>Boarding:</span> <span className="font-semibold text-white">{boardingPoint}</span></p>}
                            {droppingPoint && <p className="flex justify-between"><span>Dropping:</span> <span className="font-semibold text-white">{droppingPoint}</span></p>}
                            <div className="border-t border-[var(--tb-border)] pt-3 space-y-1.5">
                                <p className="flex justify-between"><span>Base fare ({selectedSeats.length} × INR {trip.price}):</span> <span className="font-semibold text-white">INR {baseFare}</span></p>
                                {discount > 0 && <p className="flex justify-between text-[var(--tb-success)]"><span>Discount:</span> <span className="font-semibold">- INR {discount}</span></p>}
                                <p className="flex justify-between text-base font-bold text-white"><span>Total:</span> <span>INR {totalAmount}</span></p>
                            </div>
                        </div>
                        <button disabled={selectedSeats.length === 0 || !passengerName || !email} onClick={handleBook}
                            className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all
                            ${(selectedSeats.length === 0 || !passengerName || !email) ? 'bg-[var(--tb-border)] cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[var(--tb-primary)]/20'}`}
                            style={(selectedSeats.length > 0 && passengerName && email) ? { background: 'var(--tb-gradient-accent)' } : {}}>
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookSeat;
