import React, { ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./component/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {DeleteOutlineTwoTone} from "@material-ui/icons";


type TodoListPropsType = {
    title: string
    todoListId: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, todoListId: string, title: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList = (props: TodoListPropsType) => {

    const getTasksListItem = (t: TaskType )=> {

        const removeTask = () => props.removeTask(t.id, props.todoListId)

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=>props.changeTaskStatus(t.id,
                                                                    e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListId)
        }
        return (
            <ListItem
                key={t.id}
                className={t.isDone ? "isDone" : "notIsDone"}
                style={{padding: '0px', justifyContent: 'space-between', textDecoration: t.isDone ? 'line-through' : 'none'}}>
                <Checkbox onChange={changeTaskStatus}
                          checked={t.isDone}
                          color={"primary"}
                          size={"small"}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask} size={"small"} color={'secondary'}><DeleteOutlineTwoTone/></IconButton>
            </ListItem>
        )
    }
    const tasksList = props.tasks.length
        ? <List>{props.tasks.map(getTasksListItem)}</List>
        : <span>Your tasksList is empty :(</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

    const removeTodoList = () => props.removeTodoList(props.todoListId)

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }

    return (
        <div>
            <Typography variant={'h5'}
                        align={'center'}
                        style={{fontWeight: 'bold', marginBottom: '20px'}}
                        color={'primary'}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <IconButton onClick={removeTodoList} size={"small"} color={'secondary'}><DeleteOutlineTwoTone/></IconButton>
            </Typography>

           <AddItemForm addItem={addTask} />
                {tasksList}
            <div>
                <ButtonGroup variant={'contained'} size={"small"} fullWidth>
                    <Button
                        color={props.filter === "all" ? "secondary": "primary"}
                        style={{marginRight: '3px', fontSize: '0.7em'}}
                        onClick={handlerCreator("all")}
                    >All</Button>
                    <Button
                        color={props.filter === "active" ? "secondary": "primary"}
                        style={{marginRight: '3px', fontSize: '0.7em'}}
                        className={props.filter === "active" ? "active-btn btn": "btn"}
                        onClick={handlerCreator("active")}
                    >Active</Button>
                    <Button
                        color={props.filter === "completed" ? "secondary": "primary"}
                        className={props.filter === "completed" ? "active-btn": "btn"}
                        onClick={handlerCreator("completed")}
                        style={{ fontSize: '0.7em'}}
                    >Completed</Button>
                </ButtonGroup>

            </div>
        </div>
    );
};
export default TodoList;