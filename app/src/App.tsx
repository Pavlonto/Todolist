import React, {useState} from 'react';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let NewTasks = [newTask, ...tasks]
        setTasks(NewTasks)
    }

    function removeTask(id: string) {
        let filteredTask = tasks.filter(t => t.id !== id)
        setTasks(filteredTask)
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let taskForTodolist = tasks
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone)
    }

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;