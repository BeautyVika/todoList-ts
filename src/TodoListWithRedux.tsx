import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType, TasksStateType, TodoListType} from "./AppWithRedux";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteOutlineTwoTone} from "@material-ui/icons";
import {AddItemForm} from "./component/AddItemForm";
import {TaskType} from "./TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todolists-reducer";

export type TodoListWithReduxPropsType = {
   todolist: TodoListType
}

const TodoListWithRedux: FC<TodoListWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const getTasksListItem = (t: TaskType )=> {

        const removeTask = () => dispatch(removeTaskAC(t.id, id))

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=>dispatch(changeTaskStatusAC(t.id,
            e.currentTarget.checked, id))

        const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(t.id, title, id))

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
    const tasksList = tasks.length
        ? <List style={{color: 'black'}}>{tasks.map(getTasksListItem)}</List>
        : <span>Your tasksList is empty :(</span>

    const addTask = (title: string) => dispatch(addTaskAC(title, id))

    const handlerCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodoListFilterAC(filter, id))
    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const removeTodoList = () => dispatch(RemoveTodoListAC(id))


    const changeTodoListTitle = (title: string) => dispatch(ChangeTodoListTitleAC(title, id))

    return (
        <div>
            <Typography variant={'h5'}
                        align={'center'}
                        style={{fontWeight: 'bold', marginBottom: '20px'}}
                        color={'primary'}>
                <EditableSpan title={title} changeTitle={changeTodoListTitle} />
                <IconButton onClick={removeTodoList} size={"small"} color={'secondary'}><DeleteOutlineTwoTone/></IconButton>
            </Typography>

            <AddItemForm addItem={addTask} />
            {tasksList}
            <div>
                <ButtonGroup variant={'contained'} size={"small"} fullWidth>
                    <Button
                        color={filter === "all" ? "secondary": "primary"}
                        style={{marginRight: '3px', fontSize: '0.7em'}}
                        onClick={handlerCreator("all")}
                    >All</Button>
                    <Button
                        color={filter === "active" ? "secondary": "primary"}
                        style={{marginRight: '3px', fontSize: '0.7em'}}
                        className={filter === "active" ? "active-btn btn": "btn"}
                        onClick={handlerCreator("active")}
                    >Active</Button>
                    <Button
                        color={filter === "completed" ? "secondary": "primary"}
                        className={filter === "completed" ? "active-btn": "btn"}
                        onClick={handlerCreator("completed")}
                        style={{ fontSize: '0.7em'}}
                    >Completed</Button>
                </ButtonGroup>

            </div>
        </div>
    );
}

export default TodoListWithRedux;