import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList'

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const removeTasks = (taskId: number) => {
        let filteredTasks = tasks.filter(el => el.id !== taskId)
        setTasks(filteredTasks)
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
        console.log(filter)
    }

    return (
        <div className="App">
           <TodoList title='What to learn1'
                     tasks={tasksForTodoList}
                     removeTasks={removeTasks}
                     filterTasks={filterTasks}/>
        </div>
    );
}


export default App;
