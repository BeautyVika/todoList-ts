import React, {ChangeEvent, useState} from 'react';
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
    const addTaskHandler =()=>{
        props.addTask(title)
        setTitle('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={(event) =>{
                           if(event.key === 'Enter'){
                               addTaskHandler()
                           }
                       }}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={()=>props.removeTasks(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.filterTasks('all')}>All</button>
                <button onClick={() => props.filterTasks('active')}>Active</button>
                <button onClick={() => props.filterTasks('completed')}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList