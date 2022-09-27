import React from 'react';
import {FilterType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: number) => void
    filterTasks: (filter: FilterType) => void
}
type TaskType ={
    id: number
    title: string
    isDone: boolean
}

const TodoList =(props: PropsType)=>{
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
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