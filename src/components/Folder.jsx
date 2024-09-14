/* eslint-disable */

import { useState } from "react"

export default function Folder({ name, children }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ marginLeft: "10px" }}>
            <p onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>📁{name}</p>

            {open && children.map((newI, i) => newI.type === "folder" ? <Folder key={name + i} name={newI.name} children={newI.children} /> : <File key={name + i} name={newI.name} />)}</div>
    )
}