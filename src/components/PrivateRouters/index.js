import {Outlet, Navigate} from "react-router-dom";
import {getCookie} from "../../helpers/cookie";

function PrivateRouters () {
    const isLogin = getCookie("token");
    return (
        <>
            {isLogin ? (<Outlet />) : (<Navigate to="/login" />)}
        </>
    )
}

export default PrivateRouters;