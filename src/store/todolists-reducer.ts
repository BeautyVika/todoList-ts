import {FilterValuesType, TodoListType} from "../App";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}
type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListId: string
    filter: FilterValuesType
}
type ActionType = RemoveTodoListAT | ChangeTodoListTitleAT | AddTodoListAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType) :  Array<TodoListType> => {
    switch(action.type){
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.todoListId)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todoListId: id})
export const ChangeTodoListTitleAC = (title: string, id: string) : ChangeTodoListTitleAT => ({type: "CHANGE-TODOLIST-TITLE", title: title, todoListId: id})
export const AddTodoListAC = (title: string, id: string): AddTodoListAT => ({type: "ADD-TODOLIST", title: title, todoListId: id})
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListId: id})