import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditeMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditeMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        isEditeMode
            ? <TextField value={title}
                         size={"small"}
                         autoFocus
                         onBlur={offEditeMode}
                         onChange={onChangeSetLocalTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
