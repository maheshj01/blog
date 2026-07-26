import React from "react";

export default function ImageAndContent(props) {
    return <div
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.1rem",
            margin: "1rem 0",
        }}>
        <div> {props.content}</div>
        <div style={{ width: "2rem" }} />
        <img
            width={250}
            src={props.image}
        />
    </div>
};
