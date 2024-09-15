import React from "react"

const LandingPage = React.lazy(() => import("./components/LandingPage"))
const FileFolderSystem = React.lazy(() => import("./components/FileFolderSystem"))
const SignUp = React.lazy(() => import("./components/SignUp"))
const Login = React.lazy(() => import("./components/Login"))
const Dashboard = React.lazy(() => import("./components/Dashboard"))

export const WEB_PAGES = {
    LANDING_PAGE: LandingPage,
    FILE_FOLDER_SYSTEM: FileFolderSystem,
    SIGNUP: SignUp,
    LOGIN: Login,
    DASHBOARD: Dashboard,
}