import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import TodoList from "../TodoList";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListId: string
    filter: FilterValuesType
}
export type ActionTypeTodolists = RemoveTodoListAT | ChangeTodoListTitleAT | AddTodoListAT | ChangeTodoListFilterAT

const initialState: Array<TodoListType> = []
export const todolistsReducer = (todolists = initialState, action: ActionTypeTodolists) :  Array<TodoListType> => {
    switch(action.type){
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case 'ADD-TODOLIST':
            return [...todolists, {id: action.todoListId, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id: id})
export const ChangeTodoListTitleAC = (title: string, id: string) : ChangeTodoListTitleAT => ({type: "CHANGE-TODOLIST-TITLE", title: title, todoListId: id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: "ADD-TODOLIST", title: title, todoListId: v1()})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListId: id})