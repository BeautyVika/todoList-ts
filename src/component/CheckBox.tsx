import React, {ChangeEvent} from 'react';

type PropsType = {
    checked: boolean
    callBack: (isDone: boolean) => void
}

export const CheckBox =(props: PropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return <input type="checkbox"
                   checked={props.checked}
                   onChange={onChangeHandler}/>

}