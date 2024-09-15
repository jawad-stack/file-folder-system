import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <button className="card" onClick={() => navigate("/file-folder-system")}>File Folder System</button>
            <button className="card" onClick={() => navigate("/signup")}>Firebase Auth</button>
        </>
    )
}

export default LandingPage