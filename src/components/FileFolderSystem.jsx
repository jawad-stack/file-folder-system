/* eslint-disable */
import { fileSystem } from "../assets/filesystem"
import File from "./File"
import Folder from "./Folder"

const FileFolderSystem = () => {
    return (
        <div>
            <h1>File Folder System</h1>
            {fileSystem.map((item, i) => {
                if (item.type === "file") {
                    return <File name={item.name} key={item.name + i} />
                } else {
                    return <Folder name={item.name} children={item.children} key={item.name + i} />
                }
            })}
        </div>
    )
}

export default FileFolderSystem