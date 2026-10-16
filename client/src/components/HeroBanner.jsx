import React from 'react';

function HeroBanner() {
    return (
        <section className="hero-banner position-relative overflow-hidden">
            <img
                src="/images/hero-match.webp"
                alt="Table tennis match"
                className="hero-banner__img"
            />
        </section>
    );
}

export { HeroBanner };