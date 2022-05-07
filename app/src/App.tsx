import React, {useState} from 'react';
import {Todolist, TaskType} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"


function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: false},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "Redux", isDone: false}
  ])

  let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask (id: number) {
    let filteredTask = tasks.filter(t => t.id !== id)
    setTasks(filteredTask)
  }

  let taskForTodolist = tasks
  if (filter === "completed") {
    taskForTodolist = tasks.filter(t => t.isDone === true)
  }

  if (filter === "active") {
    taskForTodolist = tasks.filter(t => t.isDone === false)
  }

  function changeFilter (value: FilterValuesType) {
    setFilter(value)
  }

  return (
      <div className="App">
        <Todolist title="What to learn" tasks={taskForTodolist} removeTask={removeTask} changeFilter={changeFilter} />
      </div>
  )
}

export default App;