import React from 'react';

type ButtonType ={
    name: string
    callback: ()=>void
}

const Button =(props: ButtonType) => {
    const onClickHandler =()=>{
        props.callback()
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}
export default Button