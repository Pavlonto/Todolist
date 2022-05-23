import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [tasksObj, setTasksObj] = useState({
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

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasksObj({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTask = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTask
        setTasksObj({...tasksObj})
    }


    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function removeTodolist(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)

        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "What to learn", filter: "active"},
        {id: todolistID2, title: "What to buy", filter: "completed"}
    ])

    return (
        <div className="App">
            {todolists.map(tl => {

                let taskForTodolist = tasksObj[tl.id]
                if (tl.filter === "completed") {
                    taskForTodolist = taskForTodolist.filter(t => t.isDone)
                }

                if (tl.filter === "active") {
                    taskForTodolist = taskForTodolist.filter(t => !t.isDone)
                }

                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    filter={tl.filter}
                />
            })}


        </div>
    )
}

export default App;