import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import './App.css';

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
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValueType
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTaskTitle !== "" && e.key === "Enter") {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle("")
        }
        if (newTaskTitle === "" && e.key === "Enter") {
            setError("Title is required")
        }
    }

    const addTask = () => {
        if (newTaskTitle !== "") {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    function removeTodolist() {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {

                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id}>
                            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                            <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    }
                )
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )

}