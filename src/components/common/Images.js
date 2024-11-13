import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

export default function Images(props) {
    return <div
        style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
        }}
    >
        {Array.from({ length: props.length }, (_, i) => (
            <img
                key={`image${i}`}
                src={useBaseUrl(props[`image${i + 1}`])}
                width={i == props.largeIndex ? "80%" : "400px"}
                // height="300px"
                alt={`Image ${i + 1}`}
            />
        ))}
    </div>
};