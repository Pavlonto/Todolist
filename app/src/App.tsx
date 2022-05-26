import React, {useState} from 'react';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type TasksTodolist = {
    [key: string]: TaskType[]
}
export type FilterValueType = "all" | "completed" | "active"


function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [tasksTodolist, setTasksTodolist] = useState<TasksTodolist>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Fruits", isDone: true},
            {id: v1(), title: "Water", isDone: false}
        ]
    })
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksTodolist[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksTodolist[todolistId] = newTasks
        setTasksTodolist({...tasksTodolist})
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksTodolist[todolistId]
        let filteredTask = tasks.filter(t => t.id !== id)
        tasksTodolist[todolistId] = filteredTask
        setTasksTodolist({...tasksTodolist})
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl)
        setTodolists(todolist)
        // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksTodolist[todolistId]
        tasksTodolist[todolistId] = tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasksTodolist({...tasksTodolist})
    }

    function changeTaskTitle(taskId: string, todolistId: string, newTitle: string,) {
        let tasks = tasksTodolist[todolistId]
        tasksTodolist[todolistId] = tasks.map(t => t.id === taskId ? {...t, title: newTitle} : t)
        setTasksTodolist({...tasksTodolist})
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {id: v1(), filter: "all", title: title}
        setTodolists([todolist, ...todolists])
        setTasksTodolist({...tasksTodolist, [todolist.id]: []})
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)

        delete tasksTodolist[todolistId]
        setTasksTodolist({...tasksTodolist})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        todolists = todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl)
        setTodolists([...todolists])
    }

    let mappedTodolist = todolists.map(tl => {
        let taskForTodolist = tasksTodolist[tl.id]
        if (tl.filter === "completed") {
            taskForTodolist = taskForTodolist.filter(t => t.isDone)
        }
        if (tl.filter === "active") {
            taskForTodolist = taskForTodolist.filter(t => !t.isDone)
        }

        return <Todolist key={tl.id} id={tl.id} title={tl.title} tasks={taskForTodolist} removeTask={removeTask}
                         changeFilter={changeFilter} addItem={addTask} changeStatus={changeStatus}
                         removeTodolist={removeTodolist} filter={tl.filter} changeTaskTitle={changeTaskTitle}
                         changeTodolistTitle={changeTodolistTitle}
        />
    })
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {mappedTodolist}
        </div>
    )
}

export default App