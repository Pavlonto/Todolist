import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test('correct todolist should be removed', () => {
    let todolistID_1 = v1()
    let todolistID_2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID_2)
})

test('correct todolists should be added', () => {
    let todolistID_1 = v1()
    let todolistID_2 = v1()
    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test('correct todolists should change its name', () => {
    let todolistID_1 = v1()
    let todolistID_2 = v1()
    let newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"}
    ]

    const action = ChangeTodolistTitleAC(todolistID_2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistID_1 = v1()
    let todolistID_2 = v1()
    let newFilter: FilterValueType = "completed"

    const startState: TodolistType[] = [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"}
    ]

    const action = ChangeTodolistFilterAC(todolistID_2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})