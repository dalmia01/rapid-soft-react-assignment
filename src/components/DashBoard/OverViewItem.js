import React from 'react';


const OverViewItem = (props) =>{
    return (
        <div className={'card-item '+ props.classNameText} style={{background:`${props.color}`}}>
            <i className={`fa ${props.iconName}`}></i>
            <span> {props.itemName && <span>{props.itemName} : </span> } {props.itemText}</span>
        </div>
    )
}

export default OverViewItem