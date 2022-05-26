import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type ItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: ItemFormType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle !== "") {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTaskTitle !== "" && e.key === "Enter") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        }
        if (newTaskTitle === "" && e.key === "Enter") {
            setError("Title is required")
        }
    }

    return <div>
        <input
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyUp={onKeyUpHandler}
            className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}