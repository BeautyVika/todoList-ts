import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList'
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ])

    const removeTasks = (taskId: string) => {
        let filteredTasks = tasks.filter(el => el.id !== taskId)
        setTasks(filteredTasks)
    }
    const addTask =(title: string) => {
        let newTask = { id: v1(), title: title, isDone: true }
        setTasks([newTask, ...tasks])
    }

    let [filter, setFilter] = useState<FilterType>('all')

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(el => el.isDone)
    }
    const filterTasks = (value: FilterType)=>{
        setFilter(value)
    }

    return (
        <div className="App">
           <TodoList title='What to learn1'
                     tasks={tasksForTodoList}
                     removeTasks={removeTasks}
                     filterTasks={filterTasks}
                     addTask={addTask}/>
        </div>
    );
}


export default App;
