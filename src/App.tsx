import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList'
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";

export type FilterType = 'all' | 'active' | 'completed'
type TodoListsType = {
    id: string
    title: string
    filter: FilterType
}
type TasksStateType ={
    [todoListId: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    let [tasks, setTasks] = useState<TasksStateType> ({
        [todoListId_1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false }
        ],
        [todoListId_2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Fish", isDone: true },
            { id: v1(), title: "Beer", isDone: false },
            { id: v1(), title: "Cake", isDone: false },
            { id: v1(), title: "Bananas", isDone: false }
        ]
    })

    const removeTasks = (taskId: string, todoListId: string) => {
        // const copyTasks ={...tasks}
        // copyTasks[todoListId]= copyTasks[todoListId].filter(tl=>tl.id !== taskId)
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(tl => tl.id !== taskId)})
    }
    const addTask =(title: string, todoListId: string) => {
        let newTask: TaskType = { id: v1(), title: title, isDone: false }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTasksStatus = (newId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks,
                       [todoListId]: tasks[todoListId].map(el => el.id === newId ? {...el, isDone: newIsDone} : el)})
    }
    const changeTodoListFilter = (filter: FilterType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter:filter} : tl))
    }
    const getFilteredTasks = (t:Array<TaskType>, f: FilterType) => {
        let tasksForTodoList = t
        if (f === 'active') {
            tasksForTodoList = t.filter(el => !el.isDone)
        }
        if (f === 'completed') {
            tasksForTodoList = t.filter(el => el.isDone)
        }
        return tasksForTodoList
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const changeTaskTitle = (taskId: string, todoListId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: title} : el)
        })
    }
     const changeTodoListTitle = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
     }
    const todoListComponent = todoLists.map((tl) => {

        return <TodoList key={tl.id}
                         title= {tl.title}
                         todoListId={tl.id}
                         filter={tl.filter}
                         removeTasks={removeTasks}
                         addTask={addTask}
                         removeTodoList={removeTodoList}
                         changeTasksStatus={changeTasksStatus}
                         changeTaskTitle={changeTaskTitle}
                         changeTodoListTitle={changeTodoListTitle}
                         changeTodoListFilter={changeTodoListFilter}
                         tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                         />
    })
    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        let newTodoList: TodoListsType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponent}
        </div>
    );
}


export default App;
