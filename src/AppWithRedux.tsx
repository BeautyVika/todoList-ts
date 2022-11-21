import React from 'react';
import './App.css';
import  {TaskType} from "./TodoList";
import {AddItemForm} from "./component/AddItemForm";
import {AppBar, Button, Container, IconButton, Paper, Toolbar, Typography, Grid} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodoListAC} from "./store/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import TodoListWithRedux from "./TodoListWithRedux";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }


    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper variant={"outlined"}
                       style={{width: '300px', padding: '20px'}}>
                    <TodoListWithRedux
                        todolist={tl}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
