/* eslint-disable */

import { useLocation, useNavigate } from "react-router-dom"
import { routes } from "../routerConfig"

const ComponentWithHeaderAndSidebar = ({ children }) => {
    debugger;
    const location = useLocation();
    console.log(location)

    const navigate = useNavigate();
    return (
        <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "30%" }}>
                {routes.map((item) => <p style={{ height: "30px", background: location.pathname === item.path ? "red" : "none", marginBottom: "5px", padding: "15px", cursor: "pointer" }} key={item.path} onClick={() => navigate(item.path)}>{item.name}</p>)}
            </div>
            <div style={{ width: "70%", margin: "10px" }}>
                {children}
            </div>
        </div>
    )
}

export default ComponentWithHeaderAndSidebar