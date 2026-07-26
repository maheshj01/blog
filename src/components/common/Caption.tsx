import React from 'react';

interface CaptionProps {
    caption: string;
}

export default function Caption({ caption }: CaptionProps) {
    return (
        <p style={{ justifyContent: 'center', display: 'flex', color: '#636262', fontSize: '14px' }}>
            {`${caption}`}
        </p>
    );
}
