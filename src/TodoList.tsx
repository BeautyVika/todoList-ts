import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";
import Button from "./components/Button";

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
    const onChangeFilter = (filter: FilterType) => {
        props.filterTasks(filter)
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
                {/*<button onClick={() => onChangeFilter('all')}>All</button>*/}
                {/*<button onClick={() => onChangeFilter('active')}>Active</button>*/}
                {/*<button onClick={() => onChangeFilter('completed')}>Completed</button>*/}
                <Button name={'All'} callback={() => onChangeFilter('all')}/>
                <Button name={'Active'} callback={() => onChangeFilter('active')}/>
                <Button name={'Completed'} callback={() => onChangeFilter('completed')}/>
            </div>
        </div>
    )
}
export default TodoList