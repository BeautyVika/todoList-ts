import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editeMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const activateEditeMode = () => {
        setEditMode(true)
    }
    const activateVieMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editeMode
        ? <input value={title}
                 onBlur={activateVieMode}
                 autoFocus
                 onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditeMode}>{props.title}</span>
}
export default EditableSpan