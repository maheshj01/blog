import React from 'react';

interface HeadlineProps {
    align?: React.CSSProperties['textAlign'];
    text?: string;
    size?: React.CSSProperties['fontSize'];
    weight?: React.CSSProperties['fontWeight'];
    style?: React.CSSProperties['fontStyle'];
}

export default function Headline(props: HeadlineProps) {
    const align = props.align ?? 'start';
    const text = props.text ?? 'Headline';
    const size = props.size ?? '1.5rem';
    const weight = props.weight ?? 'bold';
    const style = props.style ?? 'normal';
    return (
        <div style={{ textAlign: align, fontSize: size, fontWeight: weight, fontStyle: style }}>
            {text}
        </div>
    );
}
