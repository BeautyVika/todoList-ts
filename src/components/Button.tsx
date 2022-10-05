import React from 'react';

type ButtonType ={
    name: string
    callback: ()=>void
    className: string
}

const Button =(props: ButtonType) => {
    const onClickHandler =()=>{
        props.callback()
    }
    return (
        <button className={props.className} onClick={onClickHandler}>{props.name}</button>
    )
}
export default Button