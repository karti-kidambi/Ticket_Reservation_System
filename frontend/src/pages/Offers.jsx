import React, { useEffect, useState } from 'react';
import api from '../api';
import { FaTags, FaPercent } from 'react-icons/fa';

const Offers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/offers').then(res => { setOffers(res.data); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-20"><div className="inline-block w-8 h-8 border-2 border-[var(--tb-primary)] border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-10">
                <FaTags className="text-4xl text-[var(--tb-primary)] mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-white">Offers & Deals</h2>
                <p className="text-sm text-[var(--tb-text-muted)] mt-1">Grab the best deals on bus tickets</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer, i) => (
                    <div key={i} className="bg-[var(--tb-surface)] rounded-2xl border border-[var(--tb-border)] p-6 hover:border-[var(--tb-primary)]/30 hover:shadow-lg hover:shadow-[var(--tb-primary)]/5 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: 'var(--tb-gradient-accent)' }}>
                                <FaPercent className="text-sm" />
                            </div>
                            <div className="font-mono text-sm font-bold text-[var(--tb-primary-light)] bg-[var(--tb-primary-glow)] px-3 py-1 rounded-full border border-[var(--tb-primary)]/20">
                                {offer.code}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--tb-primary-light)] transition-colors">{offer.title}</h3>
                        <p className="text-sm text-[var(--tb-text-muted)]">{offer.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Offers;
