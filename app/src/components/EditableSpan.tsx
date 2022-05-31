import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    className?: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    let [title, setTitle] = useState("")
    let [editMode, setEditMode] = useState(false)

    function activateEditMode() {
        setEditMode(true)
        setTitle(props.title)
    }
    function activateViewMode() {
        setEditMode(false)
        props.onChange(title)
    }
    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} variant={"standard"} onBlur={activateViewMode} autoFocus onChange={onChangeHandler}/>
        : <span onDoubleClick={activateEditMode} className={props.className}>{props.title}</span>
}