import React, { useEffect, useRef, useState } from 'react';
import styles from './reveal.module.css';

interface RevealProps {
    children: React.ReactNode;
    /** Stagger delay in milliseconds. */
    delay?: number;
    className?: string;
}

/**
 * Reveals its children with a smooth fade + slide-up the first time they
 * scroll into view. Dependency-free (IntersectionObserver + CSS) and
 * respects the user's prefers-reduced-motion setting.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReduced =
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${styles.reveal} ${visible ? styles.visible : ''} ${className ?? ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
