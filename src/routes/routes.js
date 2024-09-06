import LayoutDefault from "../layouts/layoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouters from "../components/PrivateRouters";
import Topic from "../pages/Topic";
import Quiz from "../pages/Quiz";
import Answers from "../pages/Answers";
import Result from "../pages/Result";
import Logout from "../pages/Logout";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/logout",
                element: <Logout />
            },
            {
                element: <PrivateRouters />,
                children: [
                    {
                        path: "/topic",
                        element: <Topic />
                    },
                    {
                        path: "/quiz/:id",
                        element: <Quiz />
                    },
                    {
                        path: "/answers",
                        element: <Answers />
                    },
                    {
                        path: "/result/:id",
                        element: <Result />
                    },
                ]
            }
        ]
    }
]

export default routes;