import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType ={
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error-message' : ''}/>

            <button onClick={addTaskHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}

export default AddItemForm