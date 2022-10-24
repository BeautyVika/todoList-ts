import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import Button from "./components/Button";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
    title: string
    todoListId: string
    filter: FilterType
    tasks: Array<TaskType>
    removeTodoList: (todoListId: string) => void
    addTask: (title: string,  todoListId: string) => void
    removeTasks: (taskId: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    changeTodoListFilter: (filter: FilterType, todoListId: string) => void
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
    changeTasksStatus: (newId: string, newIsDone: boolean, todoListId: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: PropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const onChangeFilter = (filter: FilterType) => {
        props.changeTodoListFilter(filter, props.todoListId)
    }

    const mapTasks = props.tasks.map((el) => {
        const onClickHandler = () => props.removeTasks(el.id, props.todoListId)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(el.id, e.currentTarget.checked, props.todoListId)
        }
        const changeTaskTitle = ( title: string) => {
            props.changeTaskTitle(el.id, props.todoListId, title)
        }
        return (
            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={el.isDone}
                    onChange={onChangeHandler}/>
                {/*<span>{el.title}</span>*/}
                <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
                <button onClick={onClickHandler}>X</button>
            </li>
        )
    })
    const all = props.filter === 'all' ? 'active-filter' : ''
    const active = props.filter === 'active' ? 'active-filter' : ''
    const completed = props.filter === 'completed' ? 'active-filter' : ''

    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.todoListId, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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