/* eslint-disable react/no-children-prop */
import { fileSystem } from "./assets/filesystem";
import { File } from "./components/File";
import Folder from "./components/Folder";

export default function App() {

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
  );
}
