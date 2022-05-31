import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addItem: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValueType
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    function changeTodolistTitle(newTitle: string) {
        props.changeTodolistTitle(props.id, newTitle)
    }
    function removeTodolist() {
        props.removeTodolist(props.id)
    }
    function addTask(title: string) {
        props.addItem(title, props.id)
    }

    const mappedTasks = props.tasks.map(t => {
        const onClickHandler = () => {
            props.removeTask(t.id, props.id)
        }
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, props.id, newValue)
        }

        return <li key={t.id}>
            <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
            <EditableSpan title={t.title} className={t.isDone ? "is-done" : ""}
                          onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}><Delete/></IconButton>

        </li>
    })

    return (
        <div className={"Todolist"}>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>{mappedTasks}</ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

