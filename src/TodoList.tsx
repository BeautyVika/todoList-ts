import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: string) => void
    filterTasks: (filter: FilterType) => void
    addTask: (title: string)=> void
}
type TaskType ={
    id: string
    title: string
    isDone: boolean
}

const TodoList =(props: PropsType)=>{

    let [title, setTitle] = useState('')

    const onChangeHandler =(event: ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler =(event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === 'Enter'){
            addTaskHandler()
        }
    }
    const addTaskHandler =()=>{
        props.addTask(title)
        setTitle('')
    }
    const onAllClickHandler =()=>{
        props.filterTasks('all')
    }
    const onActiveClickHandler =()=>{
        props.filterTasks('active')
    }
    const onCompletedClickHandler =()=>{
        props.filterTasks('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    const onClickHandler =()=> props.removeTasks(el.id)

                    return (
                        <li key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList