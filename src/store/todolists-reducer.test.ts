import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'}
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test ('correct change todolist title', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(newTodolistTitle, todolistId2))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodoListTitle = 'New TodoList'

    const endState = todolistsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed"

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})

