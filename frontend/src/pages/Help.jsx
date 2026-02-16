import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaHeadset, FaEnvelope, FaPhone, FaShieldAlt, FaBus } from 'react-icons/fa';

const faqs = [
    { q: 'How do I book a bus ticket?', a: 'Simply search for your route on the homepage, select a bus, choose your seats, fill in passenger details, and confirm your booking. You will receive a confirmation with your ticket details.' },
    { q: 'Can I cancel my booking?', a: 'Yes. Go to "My Bookings" or "Cancel Ticket" from the navigation menu. Enter your booking ID and follow the cancellation process. Refund policies depend on the operator and cancellation time.' },
    { q: 'How do I select boarding and dropping points?', a: 'During seat selection, you will see dropdown menus for available boarding and dropping points. Choose the one closest to your location.' },
    { q: 'Is it possible to select multiple seats?', a: 'Yes, you can select up to 6 seats in a single booking. The fare will be calculated based on the number of seats selected.' },
    { q: 'How can I apply a coupon code?', a: 'On the seat selection page, you will find a "Apply Coupon" section. Enter a valid coupon code and click Apply. The discount will be reflected in your booking summary.' },
    { q: 'Can I track my bus in real time?', a: 'Yes! Navigate to "Track Bus" from the menu and enter your Trip ID. You will see the current status and estimated arrival time.' },
    { q: 'What payment methods are accepted?', a: 'We are currently integrating payment gateways. Bookings are confirmed directly for now. Payment integration with UPI, credit/debit cards, and net banking is coming soon.' },
    { q: 'How do I print or download my ticket?', a: 'After booking, you will be redirected to a confirmation page where you can print or download your ticket. You can also find the option in "My Bookings".' },
    { q: 'What if I lose my ticket?', a: 'Your booking details are always available in "My Bookings" when you are logged in. You can re-print or re-download your ticket anytime.' },
    { q: 'How do I contact support?', a: 'You can reach us via the contact details listed on this page. We are available 24/7 to help you with any queries.' },
];

const Help = () => {
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <FaHeadset className="text-4xl text-[var(--tb-primary)] mx-auto mb-3" />
                <h1 className="text-3xl font-bold text-white">Help & Support</h1>
                <p className="text-sm text-[var(--tb-text-muted)] mt-2">Find answers to frequently asked questions or contact our support team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {[
                    { icon: FaPhone, title: 'Call Us', main: '+91 1800 123 4567', sub: '24/7 Toll Free' },
                    { icon: FaEnvelope, title: 'Email Us', main: 'support@ticketbook.com', sub: 'Response within 24 hours' },
                    { icon: FaHeadset, title: 'Live Chat', main: 'Chat with our agents', sub: 'Available 9 AM – 10 PM' },
                ].map(c => (
                    <div key={c.title} className="bg-[var(--tb-surface)] p-6 rounded-2xl border border-[var(--tb-border)] text-center hover:border-[var(--tb-primary)]/30 hover:shadow-lg hover:shadow-[var(--tb-primary)]/5 transition-all">
                        <c.icon className="text-2xl text-[var(--tb-primary)] mx-auto mb-3" />
                        <h3 className="font-semibold mb-1 text-white">{c.title}</h3>
                        <p className="text-sm text-[var(--tb-text-muted)]">{c.main}</p>
                        <p className="text-xs text-[var(--tb-text-dim)]">{c.sub}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-[var(--tb-surface)] rounded-xl border border-[var(--tb-border)] overflow-hidden">
                        <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[var(--tb-primary-glow)] transition-colors">
                            <span className="font-semibold text-sm text-[var(--tb-text)]">{faq.q}</span>
                            {openIdx === i ? <FaChevronUp className="text-[var(--tb-primary)] text-xs" /> : <FaChevronDown className="text-[var(--tb-text-dim)] text-xs" />}
                        </button>
                        {openIdx === i && <div className="px-6 pb-4 text-sm text-[var(--tb-text-muted)] leading-relaxed">{faq.a}</div>}
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)] p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"><FaShieldAlt className="text-[var(--tb-primary)]" /> Safety Information</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-[var(--tb-text-muted)]">
                    <li>All buses are regularly inspected and maintained to safety standards.</li>
                    <li>Drivers are verified and trained professionals with valid licenses.</li>
                    <li>GPS tracking is available on supported buses for real-time monitoring.</li>
                    <li>Emergency helpline available 24/7 during your journey.</li>
                    <li>First-aid kits available on all AC buses.</li>
                </ul>
            </div>

            <div className="mt-6 bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)] p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white"><FaBus className="text-[var(--tb-primary)]" /> Travel Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-[var(--tb-text-muted)]">
                    <li>Reach the boarding point at least 15 minutes before departure.</li>
                    <li>Carry a valid photo ID during your journey.</li>
                    <li>Keep your booking confirmation or ticket handy (printed or on your phone).</li>
                    <li>For overnight journeys, carry a light blanket if booking a non-AC bus.</li>
                    <li>Book in advance during festivals and holidays for best prices.</li>
                </ul>
            </div>
        </div>
    );
};

export default Help;
