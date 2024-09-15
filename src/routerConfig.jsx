/* eslint-disable react-refresh/only-export-components */
import React from "react";

const LandingPage = React.lazy(() => import("./components/LandingPage"))
const FileFolderSystem = React.lazy(() => import("./components/FileFolderSystem"))
const SignUp = React.lazy(() => import("./components/SignUp"))
const Login = React.lazy(() => import("./components/Login"))
const Dashboard = React.lazy(() => import("./components/Dashboard"))


export const routes = [
    {
        routeType: "Public",
        path: "/",
        name: "Home",
        element: <LandingPage />
    }, {
        routeType: "Public",
        path: "/file-folder-system",
        name: "File Folder System",
        element: <FileFolderSystem />
    }, {
        routeType: "Public",
        path: "/signup",
        name: "Signup",
        element: <SignUp />
    }, {
        routeType: "Public",
        path: "/login",
        name: "Login",
        element: <Login />
    }, {
        routeType: "Private",
        path: "/dashboard",
        name: "Dashboard (Private Route)",
        element: <Dashboard />
    }
]