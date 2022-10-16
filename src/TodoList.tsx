import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";
import Button from "./components/Button";

type PropsType = {
    title: string
    todoListId: string
    filter: FilterType
    tasks: Array<TaskType>
    removeTasks: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTasksStatus: (newId: string, newIsDone: boolean, todoListId: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: PropsType) => {

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
            props.addTask(title.trim(), props.todoListId)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeFilter = (filter: FilterType) => {
        props.changeTodoListFilter(filter, props.todoListId)
    }
    const mapTasks = props.tasks.map((el) => {
        const onClickHandler = () => props.removeTasks(el.id, props.todoListId)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(el.id, e.currentTarget.checked, props.todoListId)
        }
        return (
            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={el.isDone}
                    onChange={onChangeHandler}/>
                <span>{el.title}</span>
                <button onClick={onClickHandler}>X</button>
            </li>
        )
    })
    const all = props.filter === 'all' ? 'active-filter' : ''
    const active = props.filter === 'active' ? 'active-filter' : ''
    const completed = props.filter === 'completed' ? 'active-filter' : ''

    const removeTodoList = () => props.removeTodoList(props.todoListId)

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error-message' : ''}/>

                <button onClick={addTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {mapTasks}
            </ul>
            <div>

                <Button className={all} name={'All'} callback={() => onChangeFilter('all')}/>
                <Button className={active} name={'Active'} callback={() => onChangeFilter('active')}/>
                <Button className={completed} name={'Completed'} callback={() => onChangeFilter('completed')}/>
            </div>
        </div>
    )
}
export default TodoList