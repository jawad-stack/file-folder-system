/* eslint-disable */
import { useState } from "react"
import File from "../components/File"

export default function Folder({ name, children }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ marginLeft: "20px" }}>
            <p onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>📁{name}</p>

            {open && children.map((newI, i, key) => newI.type === "folder" ? <Folder key={name + i} name={newI.name} children={newI.children} /> : <File key={name + i} name={newI.name} />)}</div>
    )
}