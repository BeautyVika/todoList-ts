import { TasksStateType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType =  ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType =  ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType =  ReturnType<typeof changeTaskTitleAC>

export type ActionTypeTasks = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
                 | AddTodoListAT | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionTypeTasks): TasksStateType => {
    switch(action.type){
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter((t) => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        case 'CHANGE-TASK-STATUS':
            return {...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...el, isDone: action.newTaskStatus} : el)}
        case 'CHANGE-TASK-TITLE':
            return {...state,
            [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...el, title: action.title} : el)}
        case 'ADD-TODOLIST':
            return {...state,
                [action.todoListId]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: 'REMOVE-TASK', taskId, todoListId} as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {type: 'ADD-TASK', title, todoListId} as const
}
export const changeTaskStatusAC = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, newTaskStatus, todoListId} as const
}
export const changeTaskTitleAC = (taskId: string, title:string, todoListId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId} as const
}