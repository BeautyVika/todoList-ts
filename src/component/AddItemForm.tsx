import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import Add from '@material-ui/icons/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle !== ""){
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addItem()

    return(
        <div>
            <TextField variant={"outlined"}
                       size={"small"}
                       label={'Title'}
                       value={title}
                       error={error}
                       helperText={error && 'Title is required!'}
                       onChange={onChangeSetLocalTitle}
                       onKeyDown={onEnterDownAddItem}/>
            <IconButton color={'primary'} onClick={addItem}><Add/></IconButton>

        </div>
    )
}