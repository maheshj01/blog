import React from "react";

function Headline(props) {
  // Created a text with alignment start, center, end
  const align = props.align ? props.align : "start";
  const text = props.text ? props.text : "Headline";
  // const color = props.color ? props.color : "black";
  const size = props.size ? props.size : "1.5rem";
  const weight = props.weight ? props.weight : "bold";
  const style = props.style ? props.style : "normal";

  return (
    <div
      style={{
        textAlign: align,
        fontSize: size,
        fontWeight: weight,
        fontStyle: style,
      }}
    >
      {text}
    </div>
  );
}

export default Headline;
