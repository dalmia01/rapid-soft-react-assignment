import React from "react";

const Button = (props) => {
    const {btnClickHandler,iconName,btnText,color,inColor,outLineInColor} = props
    return (
        <button onClick={btnClickHandler} style={{background:`${color}`,color:`${inColor ? inColor : outLineInColor}`,border:`1px solid ${outLineInColor}`}}>
            {iconName && <i className={`fa ${iconName}`}></i>}
            {btnText && <span> {btnText}</span>}
        </button>
    );
};

export default Button