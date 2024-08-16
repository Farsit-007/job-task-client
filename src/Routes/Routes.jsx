import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children : [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
        ]
    },
]);

export default router;